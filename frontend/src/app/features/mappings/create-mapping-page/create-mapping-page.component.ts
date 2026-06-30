import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import {
  MappingCreateRequest,
  MappingCreateResponse,
  MappingSourceType,
  MappingTargetType
} from '../../../core/models/mapping.models';
import { MappingApiService } from '../../../core/services/mapping-api.service';
import { SelectableOptionCardComponent } from '../../../shared/selectable-option-card/selectable-option-card.component';

interface SelectableOption<TValue extends string> {
  label: string;
  description: string;
  value: TValue;
}

@Component({
  selector: 'app-create-mapping-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectableOptionCardComponent],
  templateUrl: './create-mapping-page.component.html',
  styleUrl: './create-mapping-page.component.css'
})
export class CreateMappingPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly mappingApi = inject(MappingApiService);
  private readonly router = inject(Router);

  protected readonly sourceOptions: SelectableOption<MappingSourceType>[] = [
    { label: 'Excel', description: 'Kolonlu dosya verisi', value: 'excel' },
    { label: 'JSON', description: 'API veya dosya datası', value: 'json' },
    { label: 'XML', description: 'Kurumsal XML yapısı', value: 'xml' },
    { label: 'API', description: 'Endpoint üzerinden veri al', value: 'api' },
    { label: 'Database', description: 'Tablo veya SQL verisi', value: 'database' },
    { label: 'Manuel', description: 'Alanları elle tanımla', value: 'manual' }
  ];

  protected readonly targetOptions: SelectableOption<MappingTargetType>[] = [
    { label: 'JSON', description: 'JSON çıktı üret', value: 'json' },
    { label: 'XML', description: 'XML çıktı üret', value: 'xml' },
    { label: 'API', description: 'Hedef sisteme gönder', value: 'api' },
    { label: 'Database', description: 'Tabloya yaz', value: 'database' },
    { label: 'Dosya', description: 'Dosya çıktısı üret', value: 'file' }
  ];

  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    description: [''],
    sourceType: ['', [Validators.required]],
    targetType: ['', [Validators.required]]
  });

  protected isSubmitting = false;
  protected successMessage = '';
  protected errorMessage = '';
  protected createdMapping?: MappingCreateResponse;

  protected get nameInvalid(): boolean {
    const control = this.form.controls.name;
    return control.invalid && (control.dirty || control.touched);
  }

  protected get sourceInvalid(): boolean {
    const control = this.form.controls.sourceType;
    return control.invalid && (control.dirty || control.touched);
  }

  protected get targetInvalid(): boolean {
    const control = this.form.controls.targetType;
    return control.invalid && (control.dirty || control.touched);
  }

  protected selectSourceType(value: string): void {
    this.form.controls.sourceType.setValue(value);
    this.form.controls.sourceType.markAsTouched();
    this.form.controls.sourceType.updateValueAndValidity();
  }

  protected selectTargetType(value: string): void {
    this.form.controls.targetType.setValue(value);
    this.form.controls.targetType.markAsTouched();
    this.form.controls.targetType.updateValueAndValidity();
  }

  protected onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.createdMapping = undefined;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const request: MappingCreateRequest = {
      name: value.name.trim(),
      description: value.description.trim() || undefined,
      sourceType: value.sourceType as MappingSourceType,
      targetType: value.targetType as MappingTargetType
    };

    this.isSubmitting = true;
    this.mappingApi.createMapping(request)
      .pipe(finalize(() => {
        this.isSubmitting = false;
      }))
      .subscribe({
        next: (response) => {
          this.createdMapping = response;
          this.successMessage = `Mapping taslağı başarıyla oluşturuldu. Id: ${response.id}`;
          void this.router.navigate(['/mappings', response.id, 'source']);
        },
        error: (error: unknown) => {
          this.errorMessage = this.getErrorMessage(error);
        }
      });
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
