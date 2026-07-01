import { CommonModule } from '@angular/common';
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
import { finalize } from 'rxjs';

import {
  MappingDetailsResponse,
  MappingSourceType,
  SaveSourceSchemaRequest,
  SaveSourceSchemaResponse,
  SourceFieldType
} from '../../../core/models/mapping.models';
import { MappingApiService } from '../../../core/services/mapping-api.service';
import { SourceFieldImport, readSourceFile } from './source-file-reader';

interface SourceTypeCopy {
  title: string;
  description: string;
  sourceNamePlaceholder: string;
  badgeLabel: string;
}

type SourceFieldForm = FormGroup<{
  name: FormControl<string>;
  displayName: FormControl<string>;
  type: FormControl<SourceFieldType | ''>;
  required: FormControl<boolean>;
  sampleValue: FormControl<string>;
  sourceColumn: FormControl<string>;
  sourceHeader: FormControl<string>;
}>;

const sourceTypeCopy: Record<MappingSourceType, SourceTypeCopy> = {
  file: {
    title: 'Kaynak Dosyasını Yükle',
    description: 'Excel, CSV, JSON veya XML dosyanızı yükleyin. Format dosya uzantısından otomatik algılanır.',
    sourceNamePlaceholder: 'Örn: Masraf Kaynak Dosyası',
    badgeLabel: 'Dosya'
  },
  excel: {
    title: 'Excel Kaynak Alanlarını Tanımla',
    description: 'Excel dosyanızdaki kolonları burada tanımlayın. Bu alanlar daha sonra hedef alanlarla eşleştirilecek.',
    sourceNamePlaceholder: 'Örn: Masraf Excel Kaynağı',
    badgeLabel: 'Excel'
  },
  json: {
    title: 'JSON Kaynak Alanlarını Tanımla',
    description: 'JSON verinizdeki alanları burada tanımlayın. Bu alanlar mapping ekranında kullanılacak.',
    sourceNamePlaceholder: 'Örn: Masraf JSON Response',
    badgeLabel: 'JSON'
  },
  xml: {
    title: 'XML Kaynak Alanlarını Tanımla',
    description: 'XML yapınızdaki alanları burada tanımlayın.',
    sourceNamePlaceholder: 'Örn: Masraf XML Kaynağı',
    badgeLabel: 'XML'
  },
  api: {
    title: 'API Kaynak Alanlarını Tanımla',
    description: 'API’den dönen response alanlarını burada tanımlayın.',
    sourceNamePlaceholder: 'Örn: Masraf API Response',
    badgeLabel: 'API'
  },
  database: {
    title: 'Database Kaynak Alanlarını Tanımla',
    description: 'Tablo veya sorgu sonucunda gelen kolonları burada tanımlayın.',
    sourceNamePlaceholder: 'Örn: Masraf Database Kaynağı',
    badgeLabel: 'Database'
  },
  manual: {
    title: 'Manuel Kaynak Alanlarını Tanımla',
    description: 'Kaynak alanları elle oluşturarak mapping sürecine devam edin.',
    sourceNamePlaceholder: 'Örn: Manuel Kaynak Alanları',
    badgeLabel: 'Manuel'
  }
};

function uniqueFieldNamesValidator(control: AbstractControl): ValidationErrors | null {
  const fields = control as FormArray<SourceFieldForm>;
  const names = fields.controls
    .map(field => field.controls.name.value.trim().toLowerCase())
    .filter(Boolean);

  return new Set(names).size === names.length ? null : { duplicateFieldNames: true };
}

@Component({
  selector: 'app-source-mapping-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './source-mapping-page.component.html',
  styleUrl: './source-mapping-page.component.css'
})
export class SourceMappingPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly mappingApi = inject(MappingApiService);
  private readonly changeDetector = inject(ChangeDetectorRef);

  protected readonly fieldTypeOptions: SourceFieldType[] = ['text', 'number', 'date', 'boolean', 'object', 'array'];
  protected readonly form = new FormGroup({
    sourceName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    fields: new FormArray<SourceFieldForm>([], {
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
  protected savedSourceSchema?: SaveSourceSchemaResponse;
  protected sourceFileName = '';
  protected fileImportError = '';
  protected isFileParsing = false;
  protected detectedSourceType: MappingSourceType | '' = '';

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

  protected get fields(): FormArray<SourceFieldForm> {
    return this.form.controls.fields;
  }

  protected get sourceNameInvalid(): boolean {
    const control = this.form.controls.sourceName;
    return control.invalid && (control.dirty || control.touched);
  }

  protected get hasDuplicateFieldNames(): boolean {
    return this.fields.hasError('duplicateFieldNames') && (this.fields.dirty || this.fields.touched);
  }

  protected get isExcelSource(): boolean {
    return this.currentSourceType === 'excel';
  }

  protected get isFileSource(): boolean {
    return ['file', 'excel', 'json', 'xml'].includes(this.mapping?.sourceType ?? '');
  }

  protected get hasImportedFields(): boolean {
    return this.isFileSource && Boolean(this.sourceFileName) && this.fields.length > 0;
  }

  protected get showFieldsSection(): boolean {
    return !this.isFileSource || this.hasImportedFields;
  }

  protected get sourceCopy(): SourceTypeCopy {
    return sourceTypeCopy[this.currentSourceType];
  }

  protected get acceptedFileExtensions(): string {
    switch (this.mapping?.sourceType) {
      case 'file':
        return '.xlsx,.csv,.xls,.json,.xml';
      case 'excel':
        return '.xlsx,.csv,.xls';
      case 'json':
        return '.json';
      case 'xml':
        return '.xml';
      default:
        return '';
    }
  }

  protected get sourceFileTitle(): string {
    return `${this.sourceCopy.badgeLabel} Dosyası`;
  }

  protected get sourceFileDescription(): string {
    switch (this.mapping?.sourceType) {
      case 'file':
        return 'Excel, CSV, JSON veya XML dosyası seçin; format otomatik algılanacak.';
      case 'excel':
        return 'Dosya seçildiğinde kolonlar burada tek tek tanımlanacak.';
      case 'json':
        return 'Dosya seçildiğinde JSON alanları burada tek tek tanımlanacak.';
      case 'xml':
        return 'Dosya seçildiğinde XML elementleri burada tek tek tanımlanacak.';
      default:
        return 'Dosya seçildiğinde alanlar burada tek tek tanımlanacak.';
    }
  }

  protected get importCountLabel(): string {
    return this.isExcelSource ? 'kolon bulundu' : 'alan bulundu';
  }

  protected get fieldsSectionTitle(): string {
    return this.isExcelSource ? 'Kolon Listesi' : 'Alan Listesi';
  }

  protected get addFieldButtonLabel(): string {
    return this.isExcelSource ? '+ Kolon Ekle' : '+ Alan Ekle';
  }

  protected get fieldNameLabel(): string {
    return this.isExcelSource ? 'Kolonun Sistem Adı' : 'Alan Adı';
  }

  protected get displayNameLabel(): string {
    return this.isExcelSource ? 'Kolon Açıklaması' : 'Görünen Ad';
  }

  protected get currentSourceType(): MappingSourceType {
    return this.detectedSourceType || this.mapping?.sourceType || 'manual';
  }

  protected get detectedSourceTypeLabel(): string {
    if (!this.detectedSourceType) {
      return '';
    }

    return sourceTypeCopy[this.detectedSourceType].badgeLabel;
  }

  protected addField(): void {
    this.fields.push(this.createFieldForm());
    this.fields.markAsDirty();
    this.fields.updateValueAndValidity();
  }

  protected removeField(index: number): void {
    if (this.fields.length <= 1) {
      return;
    }

    this.fields.removeAt(index);
    this.fields.markAsDirty();
    this.fields.updateValueAndValidity();
  }

  protected async onSourceFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.sourceFileName = file.name;
    this.fileImportError = '';
    this.detectedSourceType = '';
    this.successMessage = '';
    this.saveError = '';
    this.savedSourceSchema = undefined;
    this.isFileParsing = true;
    this.fields.clear();
    this.fields.updateValueAndValidity();

    try {
      const result = await readSourceFile(file, this.mapping?.sourceType ?? 'manual');
      this.detectedSourceType = result.format;
      this.setImportedFields(result.fields);

      if (!this.form.controls.sourceName.value.trim()) {
        this.form.controls.sourceName.setValue(this.getFileBaseName(file.name));
      }
    } catch (error: unknown) {
      this.sourceFileName = '';
      this.fileImportError = error instanceof Error ? error.message : 'Dosya okunamadı.';
      this.detectedSourceType = '';
      this.fields.markAsTouched();
      this.fields.updateValueAndValidity();
    } finally {
      this.isFileParsing = false;
      input.value = '';
      this.changeDetector.detectChanges();
    }
  }

  protected getImportedFieldMeta(index: number): string {
    const field = this.fields.at(index);
    const sourcePath = field.controls.sourceColumn.value;

    if (!sourcePath) {
      return '';
    }

    if (this.isExcelSource) {
      return `Kolon ${sourcePath} · ${field.controls.sourceHeader.value}`;
    }

    return `${this.sourceCopy.badgeLabel} path · ${sourcePath}`;
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
    void this.router.navigate(['/mappings/create']);
  }

  protected onSubmit(): void {
    this.successMessage = '';
    this.saveError = '';
    this.savedSourceSchema = undefined;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.fields.updateValueAndValidity();
      return;
    }

    const value = this.form.getRawValue();
    const request: SaveSourceSchemaRequest = {
      sourceName: value.sourceName.trim(),
      sourceType: this.detectedSourceType || undefined,
      fields: value.fields.map(field => ({
        name: field.name.trim(),
        displayName: field.displayName.trim() || undefined,
        type: field.type as SourceFieldType,
        required: field.required,
        sampleValue: field.sampleValue.trim() || undefined
      }))
    };

    this.isSaving = true;
    this.mappingApi.saveSourceSchema(this.mappingId, request)
      .pipe(finalize(() => {
        this.isSaving = false;
      }))
      .subscribe({
        next: (response) => {
          this.savedSourceSchema = response;
          if (this.mapping) {
            this.mapping = {
              ...this.mapping,
              sourceType: response.sourceType,
              sourceSchema: {
                sourceName: response.sourceName,
                fields: response.fields
              },
              updatedAt: response.updatedAt
            };
          }
          this.successMessage = 'Kaynak veri şeması başarıyla kaydedildi.';
          void this.router.navigate(['/mappings', this.mappingId, 'target']);
        },
        error: (error: unknown) => {
          this.saveError = this.getErrorMessage(error, 'Kaynak veri şeması kaydedilemedi.');
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
          if (this.fields.length === 0 && !['file', 'excel', 'json', 'xml'].includes(mapping.sourceType)) {
            this.addField();
            this.fields.markAsPristine();
          }
          this.changeDetector.detectChanges();
        },
        error: (error: unknown) => {
          this.loadError = this.getErrorMessage(error, 'Mapping bilgisi alınamadı.');
          this.changeDetector.detectChanges();
        }
      });
  }

  private setImportedFields(importedFields: SourceFieldImport[]): void {
    const usedFieldNames = new Set<string>();

    this.fields.clear();
    importedFields.forEach(field => {
      const fieldName = this.createUniqueFieldName(field.displayName, field.sourcePath, usedFieldNames);
      this.fields.push(this.createFieldForm({
        name: fieldName,
        displayName: field.displayName,
        type: field.type,
        sampleValue: field.sampleValue,
        sourceColumn: field.sourcePath,
        sourceHeader: field.displayName
      }));
    });
    this.fields.markAsDirty();
    this.fields.updateValueAndValidity();
  }

  private createFieldForm(initial: Partial<{
    name: string;
    displayName: string;
    type: SourceFieldType | '';
    required: boolean;
    sampleValue: string;
    sourceColumn: string;
    sourceHeader: string;
  }> = {}): SourceFieldForm {
    return new FormGroup({
      name: new FormControl(initial.name ?? '', { nonNullable: true, validators: [Validators.required] }),
      displayName: new FormControl(initial.displayName ?? '', { nonNullable: true }),
      type: new FormControl<SourceFieldType | ''>(initial.type ?? 'text', { nonNullable: true, validators: [Validators.required] }),
      required: new FormControl(initial.required ?? false, { nonNullable: true }),
      sampleValue: new FormControl(initial.sampleValue ?? '', { nonNullable: true }),
      sourceColumn: new FormControl(initial.sourceColumn ?? '', { nonNullable: true }),
      sourceHeader: new FormControl(initial.sourceHeader ?? '', { nonNullable: true })
    });
  }

  private createUniqueFieldName(header: string, column: string, usedFieldNames: Set<string>): string {
    const fallback = `kolon ${column}`;
    const baseName = this.toFieldName(header || fallback) || this.toFieldName(fallback);
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
