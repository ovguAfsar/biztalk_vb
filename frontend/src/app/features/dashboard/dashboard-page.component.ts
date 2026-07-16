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
  protected currentPage = 1;
  protected readonly pageSize = 5;

  protected get filteredMappings(): MappingDetailsResponse[] {
    const searchTerm = this.mappingSearchTerm.trim().toLocaleLowerCase('tr-TR');
    return this.mappings.filter(mapping => {
      const normalizedPattern = mapping.patternType === 'mtv' ? 'vergi_mtv' : mapping.patternType;
      const matchesPattern = this.selectedPatternFilter === 'all'
        || normalizedPattern === this.selectedPatternFilter;
      const matchesSearch = !searchTerm || [
        mapping.name,
        mapping.institution ?? '',
        mapping.description ?? '',
        this.getStatusLabel(mapping.status)
      ].join(' ').toLocaleLowerCase('tr-TR').includes(searchTerm);

      return matchesPattern && matchesSearch;
    });
  }

  protected get visibleMappings(): MappingDetailsResponse[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredMappings.slice(startIndex, startIndex + this.pageSize);
  }

  protected get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredMappings.length / this.pageSize));
  }

  protected get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  protected get firstVisibleMappingNumber(): number {
    return this.filteredMappings.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  protected get lastVisibleMappingNumber(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredMappings.length);
  }

  protected get totalMappings(): number {
    return this.mappings.length;
  }

  protected get activeMappings(): number {
    return this.mappings.filter(mapping => mapping.status === 'completed').length;
  }

  protected get draftMappings(): number {
    return this.mappings.filter(mapping => mapping.status === 'draft' || mapping.status === 'in_progress').length;
  }

  ngOnInit(): void {
    this.loadMappings();
  }

  protected getStatusLabel(status: MappingStatus): string {
    switch (status) {
      case 'completed':
        return 'Tamamlandı';
      case 'in_progress':
        return 'Devam Ediyor';
      default:
        return 'Devam Ediyor';
    }
  }

  protected updateMappingSearchTerm(event: Event): void {
    this.mappingSearchTerm = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
  }

  protected updatePatternFilter(event: Event): void {
    this.selectedPatternFilter = (event.target as HTMLSelectElement).value as MappingDetailsResponse['patternType'] | 'all';
    this.currentPage = 1;
  }

  protected goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }

    this.currentPage = page;
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
          this.currentPage = Math.min(this.currentPage, this.totalPages);
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
