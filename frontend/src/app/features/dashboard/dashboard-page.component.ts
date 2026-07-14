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
  protected mappingSearchTerm = '';
  protected selectedPatternFilter: MappingDetailsResponse['patternType'] | 'all' = 'all';
  protected visibleMappingCount = 5;

  protected get filteredMappings(): MappingDetailsResponse[] {
    const searchTerm = this.mappingSearchTerm.trim().toLocaleLowerCase('tr-TR');
    return this.mappings.filter(mapping => {
      const normalizedPattern = mapping.patternType === 'mtv' ? 'vergi_mtv' : mapping.patternType;
      const matchesPattern = this.selectedPatternFilter === 'all'
        || normalizedPattern === this.selectedPatternFilter;
      const matchesSearch = !searchTerm || [
        mapping.name,
        mapping.description ?? '',
        this.getStatusLabel(mapping.status)
      ].join(' ').toLocaleLowerCase('tr-TR').includes(searchTerm);

      return matchesPattern && matchesSearch;
    });
  }

  protected get visibleMappings(): MappingDetailsResponse[] {
    return this.filteredMappings.slice(0, this.visibleMappingCount);
  }

  protected get hasMoreMappings(): boolean {
    return this.visibleMappingCount < this.filteredMappings.length;
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

  protected updateMappingSearchTerm(event: Event): void {
    this.mappingSearchTerm = (event.target as HTMLInputElement).value;
    this.visibleMappingCount = 5;
  }

  protected updatePatternFilter(event: Event): void {
    this.selectedPatternFilter = (event.target as HTMLSelectElement).value as MappingDetailsResponse['patternType'] | 'all';
    this.visibleMappingCount = 5;
  }

  protected showMoreMappings(): void {
    this.visibleMappingCount += 5;
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
