import { CommonModule, Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { MappingDetailsResponse, MappingOutputResponse } from '../../../core/models/mapping.models';
import { MappingApiService } from '../../../core/services/mapping-api.service';
import { WizardStepperComponent } from '../../../shared/wizard-stepper/wizard-stepper.component';

interface OutputNavigationState {
  output?: unknown;
  generatedAt?: string;
}

@Component({
  selector: 'app-mapping-output-page',
  standalone: true,
  imports: [CommonModule, WizardStepperComponent],
  templateUrl: './mapping-output-page.component.html',
  styleUrl: './mapping-output-page.component.css'
})
export class MappingOutputPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly mappingApi = inject(MappingApiService);
  private readonly changeDetector = inject(ChangeDetectorRef);

  protected mappingId = '';
  protected mapping?: MappingDetailsResponse;
  protected output?: unknown;
  protected outputJson = '';
  protected generatedAt = '';
  protected isLoading = true;
  protected isSaving = false;
  protected loadError = '';
  protected feedbackMessage = '';
  protected feedbackType: 'success' | 'info' | 'error' = 'success';

  ngOnInit(): void {
    this.mappingId = this.route.snapshot.paramMap.get('mappingId') ?? '';
    const state = window.history.state as OutputNavigationState;
    if (Object.prototype.hasOwnProperty.call(state, 'output') && state.generatedAt) {
      this.output = state.output;
      this.outputJson = JSON.stringify(state.output, null, 2);
      this.generatedAt = state.generatedAt;
    } else {
      this.loadError = 'Önizlenecek çıktı bulunamadı. Mapping’i yeniden çalıştırın.';
    }

    if (!this.mappingId) {
      this.isLoading = false;
      this.loadError = 'Mapping id bulunamadı.';
      return;
    }

    this.mappingApi.getMappingById(this.mappingId)
      .pipe(finalize(() => {
        this.isLoading = false;
        this.changeDetector.detectChanges();
      }))
      .subscribe({
        next: mapping => {
          this.mapping = mapping;
          this.changeDetector.detectChanges();
        },
        error: error => {
          this.loadError = this.getErrorMessage(error, 'Mapping bilgisi alınamadı.');
          this.changeDetector.detectChanges();
        }
      });
  }

  protected save(): void {
    if (this.output === undefined || !this.generatedAt || this.isSaving) return;

    this.isSaving = true;
    this.feedbackMessage = '';
    this.mappingApi.saveMappingOutput(this.mappingId, {
      output: this.output,
      generatedAt: this.generatedAt
    }).pipe(finalize(() => {
      this.isSaving = false;
      this.changeDetector.detectChanges();
    })).subscribe({
      next: response => this.showSaveResult(response),
      error: error => {
        this.feedbackType = 'error';
        this.feedbackMessage = this.getErrorMessage(error, 'Çıktı kaydedilemedi. Lütfen tekrar deneyin.');
        this.changeDetector.detectChanges();
      }
    });
  }

  protected goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
      return;
    }
    void this.router.navigate(['/mappings', this.mappingId, 'test']);
  }

  protected returnToTest(): void {
    void this.router.navigate(['/mappings', this.mappingId, 'test']);
  }

  protected formatDate(value: string): string {
    return new Intl.DateTimeFormat('tr-TR', { dateStyle: 'medium', timeStyle: 'medium' }).format(new Date(value));
  }

  private showSaveResult(response: MappingOutputResponse): void {
    this.feedbackType = response.alreadyExists ? 'info' : 'success';
    this.feedbackMessage = response.alreadyExists
      ? `Bu çıktı daha önce ${this.formatDate(response.savedAt)} tarihinde kaydedilmiş. Yeni kopya oluşturulmadı.`
      : `Çıktı ${this.formatDate(response.savedAt)} tarihinde başarıyla kaydedildi.`;
    this.changeDetector.detectChanges();
  }

  private getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof HttpErrorResponse) {
      const validationErrors = error.error?.errors as Record<string, string[]> | undefined;
      return validationErrors ? Object.values(validationErrors).flat().join(' ') : error.error?.title || fallback;
    }
    return fallback;
  }
}
