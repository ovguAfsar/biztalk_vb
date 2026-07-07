import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap, finalize, of, switchMap } from 'rxjs';

import {
  MappingCreateRequest,
  MappingCreateResponse,
  MappingDetailsResponse,
  MappingSourceType,
  MappingStatus,
  MappingTargetType,
  SaveSourceSchemaRequest,
  SourceField
} from '../../../core/models/mapping.models';
import { MappingApiService } from '../../../core/services/mapping-api.service';
import { WizardStepperComponent } from '../../../shared/wizard-stepper/wizard-stepper.component';
import { createDefaultTargetSchemaRequest } from '../default-target-schema';
import { SourceFieldImport, readSourceFile } from '../source-mapping-page/source-file-reader';

@Component({
  selector: 'app-create-mapping-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, WizardStepperComponent],
  templateUrl: './create-mapping-page.component.html',
  styleUrl: './create-mapping-page.component.css'
})
export class CreateMappingPageComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly mappingApi = inject(MappingApiService);
  private readonly router = inject(Router);
  private readonly changeDetector = inject(ChangeDetectorRef);

  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    sourceType: ['file', [Validators.required]]
  });

  protected isSubmitting = false;
  protected successMessage = '';
  protected errorMessage = '';
  protected sourceFileName = '';
  protected sourceFileError = '';
  protected detectedSourceType: MappingSourceType | '' = '';
  protected sourceFields: SourceField[] = [];
  protected createdMapping?: MappingCreateResponse;
  protected isSourceDragActive = false;
  protected mappings: MappingDetailsResponse[] = [];
  protected selectedMapping?: MappingDetailsResponse;
  protected isMappingsLoading = false;
  protected mappingsError = '';

  ngOnInit(): void {
    this.loadMappings();
  }

  protected get nameInvalid(): boolean {
    const control = this.form.controls.name;
    return control.invalid && (control.dirty || control.touched);
  }

  protected get descriptionInvalid(): boolean {
    const control = this.form.controls.description;
    return control.invalid && (control.dirty || control.touched);
  }

  protected get hasSourceFile(): boolean {
    return this.sourceFields.length > 0 && Boolean(this.detectedSourceType);
  }

  protected get canContinue(): boolean {
    return this.form.valid && this.hasSourceFile && !this.isSubmitting;
  }

  protected get isEditingMapping(): boolean {
    return Boolean(this.selectedMapping);
  }

  protected get detectedSourceTypeLabel(): string {
    switch (this.detectedSourceType) {
      case 'excel':
        return 'Excel';
      case 'txt':
        return 'TXT';
      case 'json':
        return 'JSON';
      case 'xml':
        return 'XML';
      default:
        return this.detectedSourceType ? this.detectedSourceType.toUpperCase() : '';
    }
  }

  protected getStatusLabel(status: MappingStatus): string {
    return status === 'completed' ? 'Tamamlandı' : 'Taslak';
  }

  protected selectMapping(mapping: MappingDetailsResponse): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.sourceFileError = '';
    this.mappingsError = '';
    this.isMappingsLoading = true;

    this.mappingApi.getMappingById(mapping.id)
      .pipe(finalize(() => {
        this.isMappingsLoading = false;
      }))
      .subscribe({
        next: (details) => {
          this.applySelectedMapping(details);
        },
        error: (error: unknown) => {
          this.mappingsError = this.getErrorMessage(error);
        }
      });
  }

  protected startNewMapping(): void {
    this.selectedMapping = undefined;
    this.createdMapping = undefined;
    this.successMessage = '';
    this.errorMessage = '';
    this.sourceFileError = '';
    this.form.reset({
      name: '',
      description: '',
      sourceType: 'file'
    });
    this.sourceFileName = '';
    this.detectedSourceType = '';
    this.sourceFields = [];
  }

  protected async onSourceFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    await this.importSourceFile(file);
    input.value = '';
  }

  protected onSourceFileDragOver(event: DragEvent): void {
    if (this.isSubmitting) {
      return;
    }

    event.preventDefault();
    this.isSourceDragActive = true;
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
  }

  protected onSourceFileDragLeave(event: DragEvent): void {
    const currentTarget = event.currentTarget as HTMLElement | null;
    const nextTarget = event.relatedTarget as Node | null;
    if (currentTarget && nextTarget && currentTarget.contains(nextTarget)) {
      return;
    }

    this.isSourceDragActive = false;
  }

  protected async onSourceFileDropped(event: DragEvent): Promise<void> {
    event.preventDefault();
    this.isSourceDragActive = false;

    if (this.isSubmitting) {
      return;
    }

    const file = event.dataTransfer?.files?.[0];
    if (!file) {
      return;
    }

    await this.importSourceFile(file);
  }

  private async importSourceFile(file: File): Promise<void> {
    this.sourceFileName = file.name;
    this.sourceFileError = '';
    this.errorMessage = '';
    this.successMessage = '';
    this.detectedSourceType = '';
    this.sourceFields = [];

    try {
      const result = await readSourceFile(file, 'file');
      this.detectedSourceType = result.format;
      this.sourceFields = this.toSourceFields(result.fields);
    } catch (error: unknown) {
      this.sourceFileName = '';
      this.detectedSourceType = '';
      this.sourceFields = [];
      this.sourceFileError = error instanceof Error ? error.message : 'Dosya okunamadı.';
    } finally {
      this.changeDetector.detectChanges();
    }
  }

  protected onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.createdMapping = undefined;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.hasSourceFile) {
      this.sourceFileError = 'Kaynak dosyası seçin. Desteklenen formatlar: .xlsx, .xls, .csv, .txt';
      return;
    }

    const value = this.form.getRawValue();
    const request: MappingCreateRequest = {
      name: value.name.trim(),
      description: value.description.trim() || undefined,
      sourceType: this.detectedSourceType as MappingSourceType,
      targetType: 'json' as MappingTargetType
    };
    const sourceRequest: SaveSourceSchemaRequest = {
      sourceName: this.getFileBaseName(this.sourceFileName),
      sourceType: this.isDetectedFileSourceType(this.detectedSourceType) ? this.detectedSourceType : undefined,
      fields: this.sourceFields
    };
    let mappingId = this.selectedMapping?.id ?? '';
    const metadataRequest = this.selectedMapping
      ? this.mappingApi.updateMapping(this.selectedMapping.id, { ...request, status: this.selectedMapping.status })
      : this.mappingApi.createMapping(request);

    this.isSubmitting = true;
    metadataRequest
      .pipe(switchMap((response) => {
        this.createdMapping = response;
        mappingId = response.id;
        return this.mappingApi.saveSourceSchema(response.id, sourceRequest);
      }))
      .pipe(concatMap(() => this.selectedMapping?.targetSchema
        ? of(null)
        : this.mappingApi.saveTargetSchema(mappingId, createDefaultTargetSchemaRequest())))
      .pipe(finalize(() => {
        this.isSubmitting = false;
      }))
      .subscribe({
        next: () => {
          this.successMessage = this.selectedMapping
            ? 'Mapping güncellendi.'
            : 'Mapping taslağı, kaynak dosyası ve varsayılan JSON hedefi kaydedildi.';
          void this.router.navigate(['/mappings', mappingId, 'map']);
        },
        error: (error: unknown) => {
          this.errorMessage = this.getErrorMessage(error);
        }
      });
  }

  private loadMappings(): void {
    this.isMappingsLoading = true;
    this.mappingsError = '';

    this.mappingApi.getMappings()
      .pipe(finalize(() => {
        this.isMappingsLoading = false;
      }))
      .subscribe({
        next: (mappings) => {
          this.mappings = mappings;
        },
        error: (error: unknown) => {
          this.mappingsError = this.getErrorMessage(error);
        }
      });
  }

  private applySelectedMapping(mapping: MappingDetailsResponse): void {
    this.selectedMapping = mapping;
    this.form.patchValue({
      name: mapping.name,
      description: mapping.description ?? '',
      sourceType: mapping.sourceType
    });

    this.sourceFileName = mapping.sourceSchema?.sourceName ?? '';
    this.detectedSourceType = mapping.sourceSchema ? mapping.sourceType : '';
    this.sourceFields = mapping.sourceSchema?.fields ?? [];
  }

  private toSourceFields(importedFields: SourceFieldImport[]): SourceField[] {
    const usedFieldNames = new Set<string>();

    return importedFields.map(field => ({
      name: this.createUniqueFieldName(field.displayName, field.sourcePath, usedFieldNames),
      displayName: field.displayName,
      type: field.type,
      required: false,
      sampleValue: field.sampleValue || undefined
    }));
  }

  private createUniqueFieldName(displayName: string, sourcePath: string, usedFieldNames: Set<string>): string {
    const baseName = this.toFieldName(displayName || sourcePath) || 'field';
    let candidate = baseName;
    let suffix = 2;

    while (usedFieldNames.has(candidate.toLowerCase())) {
      candidate = `${baseName}${suffix}`;
      suffix += 1;
    }

    usedFieldNames.add(candidate.toLowerCase());
    return candidate;
  }

  private toFieldName(value: string): string {
    const asciiValue = value
      .replace(/[Çç]/g, 'c')
      .replace(/[Ğğ]/g, 'g')
      .replace(/[İIı]/g, 'i')
      .replace(/[Öö]/g, 'o')
      .replace(/[Şş]/g, 's')
      .replace(/[Üü]/g, 'u')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const words = asciiValue
      .replace(/[^A-Za-z0-9]+/g, ' ')
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (words.length === 0) {
      return '';
    }

    const [firstWord, ...remainingWords] = words;
    const fieldName = [
      firstWord.charAt(0).toLowerCase() + firstWord.slice(1),
      ...remainingWords.map(word => word.charAt(0).toUpperCase() + word.slice(1))
    ].join('');

    return /^\d/.test(fieldName) ? `field${fieldName}` : fieldName;
  }

  private getFileBaseName(fileName: string): string {
    return fileName.replace(/\.[^/.]+$/, '') || fileName;
  }

  private isDetectedFileSourceType(value: MappingSourceType | ''): value is 'excel' | 'txt' {
    return value === 'excel' || value === 'txt';
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const validationErrors = error.error?.errors as Record<string, string[]> | undefined;
      const validationMessage = validationErrors
        ? Object.values(validationErrors).flat().join(' ')
        : '';

      return validationMessage || error.error?.title || 'Mapping taslağı oluşturulamadı.';
    }

    return 'Mapping taslağı oluşturulamadı.';
  }
}
