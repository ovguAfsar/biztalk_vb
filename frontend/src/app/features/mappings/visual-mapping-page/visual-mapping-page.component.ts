import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import {
  MappingDefinition,
  MappingDetailsResponse,
  MappingTransformType,
  SourceField,
  TargetField
} from '../../../core/models/mapping.models';
import { MappingApiService } from '../../../core/services/mapping-api.service';

type BottomPanelTab = 'properties' | 'output' | 'warnings';

@Component({
  selector: 'app-visual-mapping-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visual-mapping-page.component.html',
  styleUrl: './visual-mapping-page.component.css'
})
export class VisualMappingPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly mappingApi = inject(MappingApiService);
  private readonly changeDetector = inject(ChangeDetectorRef);

  protected readonly transformOptions: MappingTransformType[] = [
    'direct',
    'concat',
    'constant',
    'dateFormat',
    'uppercase',
    'lowercase',
    'trim'
  ];

  protected mappingId = '';
  protected mapping?: MappingDetailsResponse;
  protected mappingDefinitions: MappingDefinition[] = [];
  protected selectedSourceField = '';
  protected selectedTargetField = '';
  protected selectedTransformType: MappingTransformType = 'direct';
  protected activeBottomTab: BottomPanelTab = 'properties';
  protected isLoading = true;
  protected isSaving = false;
  protected loadError = '';
  protected saveError = '';
  protected successMessage = '';

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

  protected get sourceFields(): SourceField[] {
    return this.mapping?.sourceSchema?.fields ?? [];
  }

  protected get targetFields(): TargetField[] {
    return this.mapping?.targetSchema?.fields ?? [];
  }

  protected get canvasHeight(): number {
    return Math.max(360, 112 + Math.max(this.sourceFields.length, this.targetFields.length) * 58);
  }

  protected get mappedTargetCount(): number {
    return new Set(this.mappingDefinitions.map(mapping => mapping.targetField)).size;
  }

  protected get warnings(): string[] {
    if (!this.mapping?.targetSchema) {
      return [];
    }

    return this.targetFields
      .filter(field => field.required && !this.isTargetMapped(field.name))
      .map(field => `${this.getTargetFieldLabel(field)} zorunlu ama henüz eşleşmedi.`);
  }

  protected get selectedSourceFieldDetails(): SourceField | undefined {
    return this.getSourceField(this.selectedSourceField);
  }

  protected get selectedTargetFieldDetails(): TargetField | undefined {
    return this.getTargetField(this.selectedTargetField);
  }

  protected selectSourceField(fieldName: string): void {
    this.selectedSourceField = fieldName;
    this.successMessage = '';
    this.saveError = '';
  }

  protected selectTargetField(fieldName: string): void {
    this.selectedTargetField = fieldName;
    this.successMessage = '';
    this.saveError = '';
  }

  protected updateTransformType(event: Event): void {
    this.selectedTransformType = (event.target as HTMLSelectElement).value as MappingTransformType;
  }

  protected connectSelectedFields(): void {
    if (!this.selectedSourceField || !this.selectedTargetField) {
      return;
    }

    const existingIndex = this.mappingDefinitions.findIndex(
      mapping => mapping.targetField === this.selectedTargetField
    );
    const mappingDefinition: MappingDefinition = {
      sourceField: this.selectedSourceField,
      targetField: this.selectedTargetField,
      transformType: this.selectedTransformType
    };

    if (existingIndex >= 0) {
      this.mappingDefinitions = this.mappingDefinitions.map((mapping, index) =>
        index === existingIndex ? mappingDefinition : mapping
      );
    } else {
      this.mappingDefinitions = [...this.mappingDefinitions, mappingDefinition];
    }

    this.successMessage = '';
    this.saveError = '';
  }

  protected removeMapping(targetField: string): void {
    this.mappingDefinitions = this.mappingDefinitions.filter(mapping => mapping.targetField !== targetField);
    if (this.selectedTargetField === targetField) {
      this.selectedTargetField = '';
    }
    this.successMessage = '';
    this.saveError = '';
  }

  protected saveMappings(): void {
    this.successMessage = '';
    this.saveError = '';

    if (this.mappingDefinitions.length === 0) {
      this.saveError = 'Devam etmeden önce en az bir alan eşleştirmesi yapın.';
      return;
    }

    this.isSaving = true;

    this.mappingApi.saveMappings(this.mappingId, { mappings: this.mappingDefinitions })
      .pipe(finalize(() => {
        this.isSaving = false;
        this.changeDetector.detectChanges();
      }))
      .subscribe({
        next: (response) => {
          this.mappingDefinitions = response.mappings;
          this.successMessage = 'Alan eşleştirmeleri kaydedildi.';
          void this.router.navigate(['/mappings', this.mappingId, 'test']);
          this.changeDetector.detectChanges();
        },
        error: (error: unknown) => {
          this.saveError = this.getErrorMessage(error, 'Alan eşleştirmeleri kaydedilemedi.');
          this.changeDetector.detectChanges();
        }
      });
  }

  protected goBack(): void {
    void this.router.navigate(['/mappings/create']);
  }

  protected continueNext(): void {
    this.saveMappings();
  }

  protected setActiveBottomTab(tab: BottomPanelTab): void {
    this.activeBottomTab = tab;
  }

  protected isSourceMapped(fieldName: string): boolean {
    return this.mappingDefinitions.some(mapping => mapping.sourceField === fieldName);
  }

  protected isTargetMapped(fieldName: string): boolean {
    return this.mappingDefinitions.some(mapping => mapping.targetField === fieldName);
  }

  protected getMappingForTarget(fieldName: string): MappingDefinition | undefined {
    return this.mappingDefinitions.find(mapping => mapping.targetField === fieldName);
  }

  protected getSourceLineY(sourceField: string): number {
    const index = Math.max(this.sourceFields.findIndex(field => field.name === sourceField), 0);
    return 94 + index * 58;
  }

  protected getTargetLineY(targetField: string): number {
    const index = Math.max(this.targetFields.findIndex(field => field.name === targetField), 0);
    return 94 + index * 58;
  }

  protected getSourceFieldLabel(field: SourceField): string {
    return field.displayName ? `${field.displayName} (${field.name})` : field.name;
  }

  protected getTargetFieldLabel(field: TargetField): string {
    return field.displayName ? `${field.displayName} (${field.name})` : field.name;
  }

  protected getSourceLabelByName(fieldName: string): string {
    const field = this.getSourceField(fieldName);
    return field ? this.getSourceFieldLabel(field) : fieldName;
  }

  protected getTargetLabelByName(fieldName: string): string {
    const field = this.getTargetField(fieldName);
    return field ? this.getTargetFieldLabel(field) : fieldName;
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
          this.mappingDefinitions = mapping.mappingDefinitions ?? [];

          if (!mapping.sourceSchema) {
            this.loadError = 'Önce kaynak veri tanımlanmalıdır.';
          } else if (!mapping.targetSchema) {
            this.loadError = 'Önce hedef veri tanımlanmalıdır.';
          }

          this.changeDetector.detectChanges();
        },
        error: (error: unknown) => {
          this.loadError = this.getErrorMessage(error, 'Mapping bilgisi alınamadı.');
          this.changeDetector.detectChanges();
        }
      });
  }

  private getSourceField(fieldName: string): SourceField | undefined {
    return this.sourceFields.find(field => field.name === fieldName);
  }

  private getTargetField(fieldName: string): TargetField | undefined {
    return this.targetFields.find(field => field.name === fieldName);
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
