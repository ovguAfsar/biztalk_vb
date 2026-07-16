import { CommonModule, Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import {
  MappingDetailsResponse,
  SourceField,
  TestMappingResponse
} from '../../../core/models/mapping.models';
import { MappingApiService } from '../../../core/services/mapping-api.service';
import { WizardStepperComponent } from '../../../shared/wizard-stepper/wizard-stepper.component';

@Component({
  selector: 'app-mapping-test-page',
  standalone: true,
  imports: [CommonModule, FormsModule, WizardStepperComponent],
  templateUrl: './mapping-test-page.component.html',
  styleUrl: './mapping-test-page.component.css'
})
export class MappingTestPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly mappingApi = inject(MappingApiService);
  private readonly changeDetector = inject(ChangeDetectorRef);

  protected mappingId = '';
  protected mapping?: MappingDetailsResponse;
  protected inputJson = '';
  protected outputJson = '';
  protected warnings: string[] = [];
  protected errors: string[] = [];
  protected isLoading = true;
  protected isRunning = false;
  protected loadError = '';
  protected successMessage = '';
  protected noticeMessage = '';
  protected hasSuccessfulRun = false;
  protected showTestResultModal = false;
  protected showCompletionModal = false;
  protected showNewMappingConfirmModal = false;
  protected isCompleting = false;

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

  protected runMapping(): void {
    this.successMessage = '';
    this.noticeMessage = '';
    this.hasSuccessfulRun = false;
    this.errors = [];
    this.warnings = [];

    const parsedInput = this.parseInputJson();
    if (!parsedInput) {
      return;
    }

    this.isRunning = true;
    this.mappingApi.testMapping(this.mappingId, { input: parsedInput })
      .pipe(finalize(() => {
        this.isRunning = false;
        this.changeDetector.detectChanges();
      }))
      .subscribe({
        next: (response) => this.applyTestResponse(response),
        error: (error: unknown) => {
          this.hasSuccessfulRun = false;
          this.errors = [this.getErrorMessage(error, 'Mapping testi çalıştırılamadı.')];
          this.showTestResultModal = true;
          this.changeDetector.detectChanges();
        }
      });
  }

  protected goBack(): void {
    if (this.mappingId) {
      void this.router.navigate(['/mappings', this.mappingId, 'map']);
      return;
    }

    if (window.history.length > 1) {
      this.location.back();
      return;
    }

    void this.router.navigate(['/mappings/create']);
  }

  protected continueNext(): void {
    this.successMessage = '';

    if (!this.hasSuccessfulRun) {
      this.noticeMessage = 'Devam etmeden önce Mapping’i Çalıştır ile test sonucunu oluşturun.';
      return;
    }

    if (!this.mapping) {
      this.noticeMessage = 'Mapping bilgisi bulunamadı.';
      return;
    }

    this.noticeMessage = '';
    this.isCompleting = true;
    this.mappingApi.updateMapping(this.mappingId, {
      name: this.mapping.name,
      description: this.mapping.description,
      institution: this.mapping.institution,
      sourceType: this.mapping.sourceType,
      targetType: this.mapping.targetType,
      patternType: this.mapping.patternType,
      patternSettings: this.mapping.patternSettings,
      status: 'completed'
    })
      .pipe(finalize(() => {
        this.isCompleting = false;
        this.changeDetector.detectChanges();
      }))
      .subscribe({
        next: (mapping) => {
          this.mapping = mapping;
          this.showTestResultModal = false;
          this.showCompletionModal = true;
          this.changeDetector.detectChanges();
        },
        error: (error: unknown) => {
          this.noticeMessage = this.getErrorMessage(error, 'Mapping durumu tamamlandı olarak güncellenemedi.');
          this.changeDetector.detectChanges();
        }
      });
  }

  protected closeTestResultModal(): void {
    this.showTestResultModal = false;
  }

  protected closeCompletionModal(): void {
    this.showCompletionModal = false;
  }

  protected openNewMappingConfirmModal(): void {
    this.showNewMappingConfirmModal = true;
  }

  protected closeNewMappingConfirmModal(): void {
    this.showNewMappingConfirmModal = false;
  }

  protected goToNewMapping(): void {
    this.showCompletionModal = false;
    this.showNewMappingConfirmModal = false;
    void this.router.navigate(['/mappings/create']);
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
          this.validateMappingForTest(mapping);

          if (!this.loadError) {
            this.inputJson = JSON.stringify(this.createSampleInput(mapping.sourceSchema!.fields, mapping.sourceSchema!.records), null, 2);
            this.outputJson = JSON.stringify([], null, 2);
          }

          this.changeDetector.detectChanges();
        },
        error: (error: unknown) => {
          this.loadError = this.getErrorMessage(error, 'Mapping bilgisi alınamadı.');
          this.changeDetector.detectChanges();
        }
      });
  }

  private validateMappingForTest(mapping: MappingDetailsResponse): void {
    if (!mapping.sourceSchema) {
      this.loadError = 'Önce kaynak veri tanımlanmalıdır.';
      return;
    }

    if (!mapping.targetSchema) {
      this.loadError = 'Önce hedef veri tanımlanmalıdır.';
      return;
    }

    if (!mapping.mappingDefinitions || mapping.mappingDefinitions.length === 0) {
      this.loadError = 'Önce alan eşleştirmesi yapılmalıdır.';
    }
  }

  private createSampleInput(
    fields: SourceField[],
    records?: Record<string, string>[]
  ): Record<string, unknown> | Record<string, unknown>[] {
    if (records && records.length > 0) {
      return records;
    }

    return fields.reduce<Record<string, unknown>>((sampleInput, field) => {
      sampleInput[field.name] = this.createSampleValue(field);
      return sampleInput;
    }, {});
  }

  private createSampleValue(field: SourceField): unknown {
    if (field.sampleValue) {
      return this.parseSampleValue(field.sampleValue, field.type);
    }

    switch (field.type) {
      case 'number':
        return 0;
      case 'date':
        return '2026-06-26';
      case 'boolean':
        return false;
      case 'object':
        return {};
      case 'array':
        return [];
      case 'text':
      default:
        return '';
    }
  }

  private parseSampleValue(sampleValue: string, type: string): unknown {
    switch (type) {
      case 'number': {
        const parsedNumber = Number(sampleValue);
        return Number.isNaN(parsedNumber) ? 0 : parsedNumber;
      }
      case 'boolean':
        return sampleValue.toLowerCase() === 'true';
      case 'object':
      case 'array':
        try {
          return JSON.parse(sampleValue) as unknown;
        } catch {
          return type === 'array' ? [] : {};
        }
      default:
        return sampleValue;
    }
  }

  private parseInputJson(): Record<string, unknown> | Record<string, unknown>[] | null {
    try {
      const parsedInput = JSON.parse(this.inputJson) as unknown;

      if (this.isPlainObject(parsedInput)) {
        return parsedInput;
      }

      if (Array.isArray(parsedInput)
        && parsedInput.length > 0
        && parsedInput.every(item => this.isPlainObject(item))) {
        return parsedInput;
      }

      if (Array.isArray(parsedInput)) {
        this.errors = ['Input JSON boş olmayan bir object listesi olmalıdır.'];
        return null;
      }

      this.errors = ['Input JSON bir object veya object listesi olmalıdır.'];
      return null;
    } catch {
      this.errors = ['Input JSON geçerli değil. Lütfen formatı kontrol edin.'];
      return null;
    }
  }

  private applyTestResponse(response: TestMappingResponse): void {
    this.outputJson = JSON.stringify(response.output, null, 2);
    this.warnings = response.warnings;
    this.errors = response.errors;
    this.hasSuccessfulRun = response.errors.length === 0;
    this.noticeMessage = '';
    this.successMessage = this.hasSuccessfulRun ? 'Mapping başarıyla çalıştırıldı.' : '';
    this.showTestResultModal = true;
    this.changeDetector.detectChanges();
  }

  private isPlainObject(value: unknown): value is Record<string, unknown> {
    return value !== null && !Array.isArray(value) && typeof value === 'object';
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
