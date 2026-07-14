import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, HostListener, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, finalize, of, switchMap } from 'rxjs';

import {
  MappingCreateRequest,
  MappingCreateResponse,
  MappingDetailsResponse,
  MappingPatternType,
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
  private readonly route = inject(ActivatedRoute);
  private readonly changeDetector = inject(ChangeDetectorRef);

  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    patternType: ['' as MappingPatternType, [Validators.required]],
    mtvSubeKodu: [''],
    mtvKurumKodu: [''],
    mtvDosyaTarihi: [''],
    mtvKurumHesapNo: [''],
    tosSubeKodu: [''],
    tosKurumKodu: [''],
    tosDosyaTarihi: [''],
    tosKurumHesapNo: [''],
    sourceType: ['file', [Validators.required]]
  });

  protected isSubmitting = false;
  protected successMessage = '';
  protected errorMessage = '';
  protected sourceFileName = '';
  protected sourceFileError = '';
  protected detectedSourceType: MappingSourceType | '' = '';
  protected sourceFields: SourceField[] = [];
  protected sourceRecords: Record<string, string>[] = [];
  protected createdMapping?: MappingCreateResponse;
  protected isSourceDragActive = false;
  protected mappings: MappingDetailsResponse[] = [];
  protected selectedMapping?: MappingDetailsResponse;
  protected isMappingsLoading = false;
  protected mappingsError = '';
  protected isMappingsPanelOpen = false;
  protected mappingSearchTerm = '';
  protected selectedPatternFilter: MappingPatternType | 'all' = 'all';
  protected isExitDialogOpen = false;
  protected isSourceDirty = false;
  private allowNavigation = false;
  private exitDecisionResolver?: (canLeave: boolean) => void;
  protected readonly patternTypeGroups: Array<{
    label?: string;
    options: Array<{ value: MappingPatternType; label: string }>;
  }> = [
    { options: [{ value: 'maas', label: 'Maaş' }, { value: 'tos', label: 'TÖS' }] },
    {
      label: 'Vergi',
      options: [
        { value: 'vergi_mtv', label: 'MTV' },
        { value: 'vergi_gumruk', label: 'Gümrük Vergisi' },
        { value: 'vergi_toplu', label: 'Toplu Vergi' }
      ]
    }
  ];

  ngOnInit(): void {
    const mappingId = this.route.snapshot.paramMap.get('mappingId');
    if (mappingId) {
      this.loadMappingForEditing(mappingId);
    }
  }

  protected get nameInvalid(): boolean {
    const control = this.form.controls.name;
    return control.invalid && (control.dirty || control.touched);
  }

  protected get descriptionInvalid(): boolean {
    const control = this.form.controls.description;
    return control.invalid && (control.dirty || control.touched);
  }

  protected get patternTypeInvalid(): boolean {
    const control = this.form.controls.patternType;
    return control.invalid && (control.dirty || control.touched);
  }

  protected get isVergiPattern(): boolean {
    return this.form.controls.patternType.value.startsWith('vergi_')
      || this.form.controls.patternType.value === 'mtv';
  }

  protected get mtvHeaderInvalid(): boolean {
    return this.isVergiPattern && !this.isMtvHeaderValid();
  }

  protected get isTosPattern(): boolean {
    return this.form.controls.patternType.value === 'tos';
  }

  protected get tosHeaderInvalid(): boolean {
    return this.isTosPattern && !this.isTosHeaderValid();
  }

  protected get tosVariantLabel(): string {
    return this.isFixedWidthRawSource
      ? 'TÖS Satır Bazlı Kaynak Hesap No'
      : 'TÖS Geniş 100 Açıklamalı AAD';
  }

  protected get hasSourceFile(): boolean {
    return Boolean(this.detectedSourceType)
      && (this.sourceFields.length > 0 || this.sourceRecords.length > 0);
  }

  protected get isFixedWidthRawSource(): boolean {
    return this.detectedSourceType === 'txt'
      && this.sourceFields.length === 0
      && this.sourceRecords.length > 0
      && this.sourceRecords.every(record => typeof record['line'] === 'string');
  }

  protected get sourceFileMeta(): string {
    if (!this.hasSourceFile) {
      return '';
    }

    if (this.isFixedWidthRawSource) {
      return `${this.sourceFileName} · ${this.sourceRecords.length} sabit genişlikli satır · ${this.detectedSourceTypeLabel}`;
    }

    return `${this.sourceFileName} · ${this.sourceFields.length} alan · ${this.detectedSourceTypeLabel}`;
  }

  protected get canContinue(): boolean {
    return this.form.valid
      && !this.mtvHeaderInvalid
      && !this.tosHeaderInvalid
      && this.hasSourceFile
      && !this.isSubmitting;
  }

  protected get hasUnsavedChanges(): boolean {
    return this.form.dirty || this.isSourceDirty;
  }

  protected get isEditingMapping(): boolean {
    return Boolean(this.selectedMapping);
  }

  protected get filteredMappings(): MappingDetailsResponse[] {
    const searchTerm = this.mappingSearchTerm.trim().toLowerCase();
    return this.mappings.filter(mapping => {
      if (!searchTerm) {
        return true;
      }

      const searchableText = [
        mapping.name,
        mapping.description ?? '',
        this.getPatternTypeLabel(mapping.patternType),
        this.getStatusLabel(mapping.status),
        mapping.status,
        mapping.createdAt,
        mapping.updatedAt
      ].join(' ').toLowerCase();

      return searchableText.includes(searchTerm);
    });
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
    return status === 'completed' ? 'Tamamlandı' : 'Devam Ediyor';
  }

  protected getPatternTypeLabel(patternType: MappingPatternType): string {
    const normalizedPatternType = patternType === 'mtv' ? 'vergi_mtv' : patternType;
    return this.patternTypeGroups
      .flatMap(group => group.options)
      .find(option => option.value === normalizedPatternType)?.label ?? normalizedPatternType;
  }

  protected toggleMappingsPanel(): void {
    this.isMappingsPanelOpen = !this.isMappingsPanelOpen;
  }

  protected updateMappingSearchTerm(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.mappingSearchTerm = input.value;
  }

  protected updatePatternFilter(patternType: MappingPatternType | 'all'): void {
    this.selectedPatternFilter = patternType;
    this.loadMappings();
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
          this.isMappingsPanelOpen = false;
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
      patternType: '' as MappingPatternType,
      mtvSubeKodu: '',
      mtvKurumKodu: '',
      mtvDosyaTarihi: this.getTodayAsYYYYMMDD(),
      mtvKurumHesapNo: '',
      tosSubeKodu: '',
      tosKurumKodu: '',
      tosDosyaTarihi: this.getTodayAsYYYYMMDD(),
      tosKurumHesapNo: '',
      sourceType: 'file'
    });
    this.sourceFileName = '';
    this.detectedSourceType = '';
    this.sourceFields = [];
    this.sourceRecords = [];
    this.isMappingsPanelOpen = false;
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
    this.sourceRecords = [];

    try {
      const result = await readSourceFile(file, 'file');
      this.detectedSourceType = result.format;
      const importedSource = this.toSourceImport(result.fields, result.records);
      this.sourceFields = importedSource.fields;
      this.sourceRecords = importedSource.records;
      this.isSourceDirty = true;
    } catch (error: unknown) {
      this.sourceFileName = '';
      this.detectedSourceType = '';
      this.sourceFields = [];
      this.sourceRecords = [];
      this.sourceFileError = error instanceof Error ? error.message : 'Dosya okunamadı.';
    } finally {
      this.changeDetector.detectChanges();
    }
  }

  protected onSubmit(): void {
    this.saveMapping(true, false);
  }

  protected saveAsDraft(): void {
    this.saveMapping(false, true);
  }

  private saveMapping(navigateAfterSave: boolean, forceDraft: boolean, afterSave?: () => void): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.createdMapping = undefined;
    const desiredStatus: MappingStatus = forceDraft
      ? 'draft'
      : this.hasUnsavedChanges
        ? 'draft'
        : this.selectedMapping?.status ?? 'draft';
    const isNewMapping = !this.selectedMapping;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.mtvHeaderInvalid) {
      this.errorMessage = 'Vergi Header bilgileri eksiksiz ve doğru formatta girilmelidir.';
      return;
    }

    if (this.tosHeaderInvalid) {
      this.errorMessage = 'TÖS Header bilgileri eksiksiz ve doğru formatta girilmelidir.';
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
      targetType: 'json' as MappingTargetType,
      patternType: value.patternType,
      patternSettings: this.isVergiPattern
        ? {
            mtvHeader: {
              subeKodu: value.mtvSubeKodu.trim(),
              kurumKodu: value.mtvKurumKodu.trim(),
              dosyaTarihi: value.mtvDosyaTarihi.trim(),
              kurumHesapNo: value.mtvKurumHesapNo.trim()
            }
          }
        : this.isTosPattern
          ? {
              tosHeader: {
                subeKodu: value.tosSubeKodu.trim(),
                kurumKodu: value.tosKurumKodu.trim(),
                dosyaTarihi: value.tosDosyaTarihi.trim(),
                kurumHesapNo: value.tosKurumHesapNo.trim()
              }
            }
        : undefined
    };
    const sourceRequest: SaveSourceSchemaRequest = {
      sourceName: this.getFileBaseName(this.sourceFileName),
      sourceType: this.isDetectedFileSourceType(this.detectedSourceType) ? this.detectedSourceType : undefined,
      fields: this.sourceFields,
      records: this.sourceRecords
    };
    let mappingId = this.selectedMapping?.id ?? '';
    const metadataRequest = this.selectedMapping
      ? this.mappingApi.updateMapping(this.selectedMapping.id, {
          ...request,
          status: desiredStatus
        })
      : this.mappingApi.createMapping(request).pipe(
          switchMap(createdMapping => this.mappingApi.updateMapping(createdMapping.id, {
            ...request,
            status: desiredStatus
          }))
        );

    this.isSubmitting = true;
    metadataRequest
      .pipe(switchMap((response) => {
        this.createdMapping = response;
        mappingId = response.id;
        return this.mappingApi.saveSourceSchema(response.id, sourceRequest);
      }))
      .pipe(concatMap(() => this.selectedMapping?.targetSchema
        ? of(null)
        : this.mappingApi.saveTargetSchema(
            mappingId,
            createDefaultTargetSchemaRequest(value.patternType, this.isFixedWidthRawSource)
          )))
      .pipe(finalize(() => {
        this.isSubmitting = false;
      }))
      .subscribe({
        next: () => {
          if (this.createdMapping) {
            this.selectedMapping = {
              ...this.createdMapping,
              status: desiredStatus
            };
          }
          this.form.markAsPristine();
          this.isSourceDirty = false;
          this.successMessage = forceDraft
            ? 'Mapping kaydedildi. Daha sonra devam edebilirsiniz.'
            : this.selectedMapping
              ? 'Mapping güncellendi.'
              : 'Mapping taslağı, kaynak dosyası ve hedef şeması kaydedildi.';
          afterSave?.();
          if (navigateAfterSave) {
            this.allowNavigation = true;
            void this.router.navigate(['/mappings', mappingId, 'map'], {
              queryParams: isNewMapping ? { new: 'true' } : undefined
            });
          }
        },
        error: (error: unknown) => {
          this.errorMessage = this.getErrorMessage(error);
        }
      });
  }

  canLeavePage(): boolean | Promise<boolean> {
    if (this.allowNavigation || !this.hasUnsavedChanges || this.isSubmitting) {
      return true;
    }

    this.isExitDialogOpen = true;
    return new Promise<boolean>(resolve => {
      this.exitDecisionResolver = resolve;
    });
  }

  protected saveDraftAndLeave(): void {
    if (!this.canContinue) {
      this.errorMessage = 'Taslak kaydetmek için zorunlu alanları doldurun ve kaynak dosyasını seçin.';
      this.closeExitDialog(false);
      return;
    }

    this.saveMapping(false, true, () => {
      this.allowNavigation = true;
      this.closeExitDialog(true);
    });
  }

  protected discardChangesAndLeave(): void {
    this.allowNavigation = true;
    this.closeExitDialog(true);
  }

  protected stayOnPage(): void {
    this.closeExitDialog(false);
  }

  @HostListener('window:beforeunload', ['$event'])
  protected warnBeforeBrowserUnload(event: BeforeUnloadEvent): void {
    if (!this.allowNavigation && this.hasUnsavedChanges) {
      event.preventDefault();
    }
  }

  private closeExitDialog(canLeave: boolean): void {
    this.isExitDialogOpen = false;
    const resolver = this.exitDecisionResolver;
    this.exitDecisionResolver = undefined;
    resolver?.(canLeave);
  }

  private loadMappings(): void {
    this.isMappingsLoading = true;
    this.mappingsError = '';

    const patternType = this.selectedPatternFilter === 'all' ? undefined : this.selectedPatternFilter;
    this.mappingApi.getMappings(patternType)
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

  private loadMappingForEditing(mappingId: string): void {
    this.isMappingsLoading = true;
    this.errorMessage = '';
    this.mappingApi.getMappingById(mappingId)
      .pipe(finalize(() => {
        this.isMappingsLoading = false;
      }))
      .subscribe({
        next: (mapping) => {
          this.applySelectedMapping(mapping);
        },
        error: (error: unknown) => {
          this.errorMessage = this.getErrorMessage(error);
        }
      });
  }

  private applySelectedMapping(mapping: MappingDetailsResponse): void {
    const patternType = mapping.patternType === 'mtv' ? 'vergi_mtv' : mapping.patternType;
    this.selectedMapping = mapping;
    this.form.patchValue({
      name: mapping.name,
      description: mapping.description ?? '',
      patternType,
      mtvSubeKodu: mapping.patternSettings?.mtvHeader?.subeKodu ?? '',
      mtvKurumKodu: mapping.patternSettings?.mtvHeader?.kurumKodu ?? '',
      mtvDosyaTarihi: mapping.patternSettings?.mtvHeader?.dosyaTarihi ?? this.getTodayAsYYYYMMDD(),
      mtvKurumHesapNo: mapping.patternSettings?.mtvHeader?.kurumHesapNo ?? '',
      tosSubeKodu: mapping.patternSettings?.tosHeader?.subeKodu ?? '',
      tosKurumKodu: mapping.patternSettings?.tosHeader?.kurumKodu ?? '',
      tosDosyaTarihi: mapping.patternSettings?.tosHeader?.dosyaTarihi ?? this.getTodayAsYYYYMMDD(),
      tosKurumHesapNo: mapping.patternSettings?.tosHeader?.kurumHesapNo ?? '',
      sourceType: mapping.sourceType
    });

    this.sourceFileName = mapping.sourceSchema?.sourceName ?? '';
    this.detectedSourceType = mapping.sourceSchema ? mapping.sourceType : '';
    this.sourceFields = mapping.sourceSchema?.fields ?? [];
    this.sourceRecords = mapping.sourceSchema?.records ?? [];
    this.form.markAsPristine();
    this.isSourceDirty = false;
  }

  private toSourceFields(importedFields: SourceFieldImport[], usedFieldNames = new Set<string>()): SourceField[] {
    return importedFields.map(field => ({
      name: this.createUniqueFieldName(field.displayName, field.sourcePath, usedFieldNames),
      displayName: field.displayName,
      type: field.type,
      required: false,
      sampleValue: field.sampleValue || undefined
    }));
  }

  private toSourceImport(
    importedFields: SourceFieldImport[],
    importedRecords: Record<string, string>[]
  ): { fields: SourceField[]; records: Record<string, string>[] } {
    if (importedFields.length === 0) {
      return { fields: [], records: importedRecords };
    }

    const usedFieldNames = new Set<string>();
    const sourceKeyToFieldName = new Map<string, string>();
    const fields = importedFields.map(field => {
      const name = this.createUniqueFieldName(field.displayName, field.sourcePath, usedFieldNames);
      sourceKeyToFieldName.set(field.sourcePath, name);
      sourceKeyToFieldName.set(field.displayName, name);

      return {
        name,
        displayName: field.displayName,
        type: field.type,
        required: false,
        sampleValue: field.sampleValue || undefined
      };
    });
    const records = importedRecords.map(record => {
      return Array.from(sourceKeyToFieldName.entries()).reduce<Record<string, string>>((mappedRecord, [sourceKey, fieldName]) => {
        if (Object.prototype.hasOwnProperty.call(record, sourceKey)) {
          mappedRecord[fieldName] = record[sourceKey] ?? '';
        }

        return mappedRecord;
      }, {});
    });

    return { fields, records };
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

  private isMtvHeaderValid(): boolean {
    const value = this.form.getRawValue();
    return /^\d{5}$/.test(value.mtvSubeKodu.trim())
      && /^\d{5}$/.test(value.mtvKurumKodu.trim())
      && /^\d{8}$/.test(value.mtvDosyaTarihi.trim())
      && /^\d{17}$/.test(value.mtvKurumHesapNo.trim());
  }

  private isTosHeaderValid(): boolean {
    const value = this.form.getRawValue();
    return /^\d{5}$/.test(value.tosSubeKodu.trim())
      && /^\d{5}$/.test(value.tosKurumKodu.trim())
      && /^\d{8}$/.test(value.tosDosyaTarihi.trim())
      && /^[A-Za-z0-9]{26}$/.test(value.tosKurumHesapNo.trim());
  }

  private getTodayAsYYYYMMDD(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
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
