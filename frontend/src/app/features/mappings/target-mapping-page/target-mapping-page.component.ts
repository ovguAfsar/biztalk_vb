import { CommonModule, Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, switchMap } from 'rxjs';

import {
  MappingDefinition,
  MappingDetailsResponse,
  MappingTargetType,
  SaveTargetSchemaRequest,
  SaveTargetSchemaResponse,
  SourceField,
  SourceFieldType,
  TargetField
} from '../../../core/models/mapping.models';
import { MappingApiService } from '../../../core/services/mapping-api.service';

interface TargetTypeCopy {
  title: string;
  description: string;
  targetNamePlaceholder: string;
  badgeLabel: string;
}

type TargetFieldForm = FormGroup<{
  name: FormControl<string>;
  displayName: FormControl<string>;
  type: FormControl<SourceFieldType | ''>;
  required: FormControl<boolean>;
  sampleValue: FormControl<string>;
  sourceFieldName: FormControl<string>;
}>;

const targetTypeCopy: Record<MappingTargetType, TargetTypeCopy> = {
  json: {
    title: 'JSON Hedef Alanlarını Tanımla',
    description: 'Oluşturulacak JSON çıktısındaki alanları burada tanımlayın.',
    targetNamePlaceholder: 'Örn: Masraf JSON Çıktısı',
    badgeLabel: 'JSON'
  },
  xml: {
    title: 'XML Hedef Alanlarını Tanımla',
    description: 'Oluşturulacak XML çıktısındaki alanları burada tanımlayın.',
    targetNamePlaceholder: 'Örn: Masraf XML Çıktısı',
    badgeLabel: 'XML'
  },
  api: {
    title: 'API Hedef Alanlarını Tanımla',
    description: 'Hedef API’nin beklediği request alanlarını burada tanımlayın.',
    targetNamePlaceholder: 'Örn: Muhasebe API Hedefi',
    badgeLabel: 'API'
  },
  database: {
    title: 'Database Hedef Alanlarını Tanımla',
    description: 'Verinin yazılacağı tablo kolonlarını burada tanımlayın.',
    targetNamePlaceholder: 'Örn: Masraf Tablosu',
    badgeLabel: 'Database'
  },
  file: {
    title: 'Dosya Hedef Alanlarını Tanımla',
    description: 'Oluşturulacak dosya çıktısındaki alanları burada tanımlayın.',
    targetNamePlaceholder: 'Örn: Masraf Dosya Çıktısı',
    badgeLabel: 'Dosya'
  }
};

function uniqueFieldNamesValidator(control: AbstractControl): ValidationErrors | null {
  const fields = control as FormArray<TargetFieldForm>;
  const names = fields.controls
    .map(field => field.controls.name.value.trim().toLowerCase())
    .filter(Boolean);

  return new Set(names).size === names.length ? null : { duplicateFieldNames: true };
}

@Component({
  selector: 'app-target-mapping-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './target-mapping-page.component.html',
  styleUrl: './target-mapping-page.component.css'
})
export class TargetMappingPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly mappingApi = inject(MappingApiService);
  private readonly changeDetector = inject(ChangeDetectorRef);

  protected readonly fieldTypeOptions: SourceFieldType[] = ['text', 'number', 'date', 'boolean', 'object', 'array'];
  protected readonly form = new FormGroup({
    targetName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    fields: new FormArray<TargetFieldForm>([], {
      validators: [Validators.minLength(1), uniqueFieldNamesValidator]
    })
  });

  protected mappingId = '';
  protected mapping?: MappingDetailsResponse;
  protected isLoading = true;
  protected isSaving = false;
  protected loadError = '';
  protected saveError = '';
  protected successMessage = '';
  protected savedTargetSchema?: SaveTargetSchemaResponse;

  ngOnInit(): void {
    const mappingId = this.route.snapshot.paramMap.get('mappingId');
    if (!mappingId) {
      this.isLoading = false;
      this.loadError = 'Mapping id bulunamadı.';
      return;
    }

    this.mappingId = mappingId;
    this.loadMapping(mappingId);
  }

  protected get fields(): FormArray<TargetFieldForm> {
    return this.form.controls.fields;
  }

  protected get sourceFields(): SourceField[] {
    return this.mapping?.sourceSchema?.fields ?? [];
  }

  protected get targetNameInvalid(): boolean {
    const control = this.form.controls.targetName;
    return control.invalid && (control.dirty || control.touched);
  }

  protected get hasDuplicateFieldNames(): boolean {
    return this.fields.hasError('duplicateFieldNames') && (this.fields.dirty || this.fields.touched);
  }

  protected get targetCopy(): TargetTypeCopy {
    return targetTypeCopy[this.mapping?.targetType ?? 'json'];
  }

  protected get targetFieldNameLabel(): string {
    switch (this.mapping?.targetType) {
      case 'json':
        return 'JSON Alanı';
      case 'xml':
        return 'XML Alanı';
      case 'api':
        return 'API Alanı';
      case 'database':
        return 'Kolon Adı';
      case 'file':
        return 'Dosya Alanı';
      default:
        return 'Alan Adı';
    }
  }

  protected addField(): void {
    this.fields.push(this.createFieldForm());
    this.fields.markAsDirty();
    this.fields.updateValueAndValidity();
  }

  protected addTargetFieldFromSource(sourceField: SourceField): void {
    this.fields.push(this.createFieldForm({
      name: this.createUniqueTargetFieldName(sourceField.name),
      displayName: sourceField.displayName ?? '',
      type: sourceField.type,
      required: sourceField.required,
      sampleValue: sourceField.sampleValue ?? '',
      sourceFieldName: sourceField.name
    }));
    this.form.markAsDirty();
    this.fields.markAsDirty();
    this.fields.updateValueAndValidity();
  }

  protected addAllSourceFieldsToTarget(): void {
    this.sourceFields.forEach(sourceField => {
      this.addTargetFieldFromSource(sourceField);
    });
  }

  protected getSourceFieldLabel(sourceField: SourceField): string {
    return sourceField.displayName ? `${sourceField.displayName} (${sourceField.name})` : sourceField.name;
  }

  protected removeField(index: number): void {
    if (this.fields.length <= 1) {
      return;
    }

    this.fields.removeAt(index);
    this.fields.markAsDirty();
    this.fields.updateValueAndValidity();
  }

  protected fieldNameInvalid(index: number): boolean {
    const control = this.fields.at(index).controls.name;
    return control.invalid && (control.dirty || control.touched);
  }

  protected fieldTypeInvalid(index: number): boolean {
    const control = this.fields.at(index).controls.type;
    return control.invalid && (control.dirty || control.touched);
  }

  protected goBack(): void {
    if (this.mappingId) {
      void this.router.navigate(['/mappings', this.mappingId, 'source']);
      return;
    }

    if (window.history.length > 1) {
      this.location.back();
      return;
    }

    void this.router.navigate(['/mappings/create']);
  }

  protected onSubmit(): void {
    this.successMessage = '';
    this.saveError = '';
    this.savedTargetSchema = undefined;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.fields.updateValueAndValidity();
      return;
    }

    const value = this.form.getRawValue();
    const request: SaveTargetSchemaRequest = {
      targetName: value.targetName.trim(),
      fields: value.fields.map(field => ({
        name: field.name.trim(),
        displayName: field.displayName.trim() || undefined,
        type: field.type as SourceFieldType,
        required: field.required,
        sampleValue: field.sampleValue.trim() || undefined
      }))
    };
    const mappingDefinitions = this.createAutoMappings(value.fields);

    this.isSaving = true;
    this.mappingApi.saveTargetSchema(this.mappingId, request)
      .pipe(switchMap((response) => {
        this.savedTargetSchema = response;
        return this.mappingApi.saveMappings(this.mappingId, { mappings: mappingDefinitions });
      }))
      .pipe(finalize(() => {
        this.isSaving = false;
      }))
      .subscribe({
        next: () => {
          this.successMessage = 'Hedef veri şeması ve otomatik eşleştirmeler kaydedildi.';
          void this.router.navigate(['/mappings', this.mappingId, 'map']);
        },
        error: (error: unknown) => {
          this.saveError = this.getErrorMessage(error, 'Hedef veri şeması veya eşleştirmeler kaydedilemedi.');
        }
      });
  }

  private loadMapping(mappingId: string): void {
    this.isLoading = true;
    this.loadError = '';

    this.mappingApi.getMappingById(mappingId)
      .pipe(finalize(() => {
        this.isLoading = false;
        this.changeDetector.detectChanges();
      }))
      .subscribe({
        next: (mapping) => {
          this.mapping = mapping;

          if (!mapping.sourceSchema) {
            this.loadError = 'Önce kaynak veri tanımlanmalıdır.';
            this.changeDetector.detectChanges();
            return;
          }

          if (mapping.targetSchema) {
            this.populateTargetSchema(mapping.targetSchema.targetName, mapping.targetSchema.fields);
          }

          this.changeDetector.detectChanges();
        },
        error: (error: unknown) => {
          this.loadError = this.getErrorMessage(error, 'Mapping bilgisi alınamadı.');
          this.changeDetector.detectChanges();
        }
      });
  }

  private populateTargetSchema(targetName: string, fields: TargetField[]): void {
    this.form.controls.targetName.setValue(targetName);
    this.fields.clear();

    fields.forEach(field => {
      this.fields.push(this.createFieldForm({
        ...field,
        sourceFieldName: this.getMatchingSourceFieldName(field.name)
      }));
    });

    if (this.fields.length === 0) {
      this.addField();
    }

    this.form.markAsPristine();
    this.fields.updateValueAndValidity();
  }

  private createFieldForm(initial: Partial<TargetField & { sourceFieldName: string }> = {}): TargetFieldForm {
    return new FormGroup({
      name: new FormControl(initial.name ?? '', { nonNullable: true, validators: [Validators.required] }),
      displayName: new FormControl(initial.displayName ?? '', { nonNullable: true }),
      type: new FormControl<SourceFieldType | ''>(initial.type ?? 'text', { nonNullable: true, validators: [Validators.required] }),
      required: new FormControl(initial.required ?? false, { nonNullable: true }),
      sampleValue: new FormControl(initial.sampleValue ?? '', { nonNullable: true }),
      sourceFieldName: new FormControl(initial.sourceFieldName ?? '', { nonNullable: true })
    });
  }

  private createAutoMappings(fields: Array<{ name: string; sourceFieldName: string }>): MappingDefinition[] {
    return fields
      .map(field => ({
        sourceField: field.sourceFieldName.trim() || this.getMatchingSourceFieldName(field.name),
        targetField: field.name.trim(),
        transformType: 'direct' as const
      }))
      .filter(mapping => mapping.sourceField && mapping.targetField);
  }

  private getMatchingSourceFieldName(targetFieldName: string): string {
    const normalizedTargetFieldName = targetFieldName.trim().toLowerCase();
    return this.sourceFields.find(sourceField => sourceField.name.toLowerCase() === normalizedTargetFieldName)?.name ?? '';
  }

  private createUniqueTargetFieldName(sourceFieldName: string): string {
    const existingNames = new Set(
      this.fields.controls
        .map(field => field.controls.name.value.trim().toLowerCase())
        .filter(Boolean)
    );
    const baseName = sourceFieldName.trim() || 'field';
    let candidate = baseName;
    let suffix = 2;

    while (existingNames.has(candidate.toLowerCase())) {
      candidate = `${baseName}${suffix}`;
      suffix += 1;
    }

    return candidate;
  }

  private getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof HttpErrorResponse) {
      const validationErrors = error.error?.errors as Record<string, string[]> | undefined;
      const validationMessage = validationErrors
        ? Object.values(validationErrors).flat().join(' ')
        : '';

      return validationMessage || error.error?.title || fallback;
    }

    return fallback;
  }
}
