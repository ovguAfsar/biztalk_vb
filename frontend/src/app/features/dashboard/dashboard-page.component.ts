import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { MappingDetailsResponse, MappingStatus } from '../../core/models/mapping.models';
import { MappingApiService } from '../../core/services/mapping-api.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent implements OnInit {
  private readonly mappingApi = inject(MappingApiService);

  protected mappings: MappingDetailsResponse[] = [];
  protected isLoading = false;
  protected deletingMappingId = '';
  protected errorMessage = '';
  protected showAllMappings = false;

  protected get visibleMappings(): MappingDetailsResponse[] {
    return this.showAllMappings ? this.mappings : this.mappings.slice(0, 5);
  }

  protected get totalMappings(): number {
    return this.mappings.length;
  }

  protected get activeMappings(): number {
    return this.mappings.filter(mapping => mapping.status === 'completed').length;
  }

  protected get draftMappings(): number {
    return this.mappings.filter(mapping => mapping.status === 'draft').length;
  }

  ngOnInit(): void {
    this.loadMappings();
  }

  protected getStatusLabel(status: MappingStatus): string {
    return status === 'completed' ? 'Tamamlandı' : 'Taslak';
  }

  protected toggleAllMappings(): void {
    this.showAllMappings = !this.showAllMappings;
  }

  protected deleteMapping(mapping: MappingDetailsResponse): void {
    if (this.deletingMappingId || !window.confirm(`“${mapping.name}” mapping kaydı silinsin mi?`)) {
      return;
    }

    this.errorMessage = '';
    this.deletingMappingId = mapping.id;
    this.mappingApi.deleteMapping(mapping.id)
      .pipe(finalize(() => {
        this.deletingMappingId = '';
      }))
      .subscribe({
        next: () => {
          this.mappings = this.mappings.filter(item => item.id !== mapping.id);
        },
        error: (error: unknown) => {
          this.errorMessage = this.getErrorMessage(error, 'Mapping silinemedi.');
        }
      });
  }

  private loadMappings(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.mappingApi.getMappings()
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe({
        next: (mappings) => {
          this.mappings = [...mappings].sort((left, right) =>
            new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
          );
        },
        error: (error: unknown) => {
          this.errorMessage = this.getErrorMessage(error, 'Mapping listesi yüklenemedi.');
        }
      });
  }

  private getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof HttpErrorResponse) {
      return error.error?.title || fallback;
    }

    return fallback;
  }
}
