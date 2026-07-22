import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import {
  MappingDetailsResponse,
  MappingPatternType,
  MappingStatus
} from '../../../core/models/mapping.models';
import { MappingApiService } from '../../../core/services/mapping-api.service';

@Component({
  selector: 'app-mapping-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mapping-details-page.component.html',
  styleUrl: './mapping-details-page.component.css'
})
export class MappingDetailsPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly mappingApi = inject(MappingApiService);

  protected mapping?: MappingDetailsResponse;
  protected isLoading = false;
  protected errorMessage = '';

  ngOnInit(): void {
    const mappingId = this.route.snapshot.paramMap.get('mappingId');

    if (!mappingId) {
      this.errorMessage = 'Mapping kimliği bulunamadı.';
      return;
    }

    this.isLoading = true;
    this.mappingApi.getMappingById(mappingId)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe({
        next: mapping => {
          this.mapping = mapping;
        },
        error: (error: unknown) => {
          this.errorMessage = error instanceof HttpErrorResponse
            ? error.error?.title || 'Mapping bilgileri yüklenemedi.'
            : 'Mapping bilgileri yüklenemedi.';
        }
      });
  }

  protected getPatternLabel(patternType: MappingPatternType): string {
    switch (patternType) {
      case 'maas': return 'Maaş';
      case 'tos': return 'TÖS';
      case 'mtv':
      case 'vergi_mtv': return 'MTV';
      case 'vergi_gumruk': return 'Gümrük Vergisi';
      case 'vergi_toplu': return 'Toplu Vergi';
      default: return patternType;
    }
  }

  protected getStatusLabel(status: MappingStatus): string {
    return status === 'completed' ? 'Tamamlandı' : 'Devam Ediyor';
  }
}
