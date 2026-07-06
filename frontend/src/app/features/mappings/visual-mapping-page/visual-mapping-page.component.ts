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

interface PendingConnection {
  sourceField: string;
  targetField: string;
}

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
  protected draggedSourceField = '';
  protected dragTargetField = '';
  protected pendingConnection?: PendingConnection;
  protected activeBottomTab: BottomPanelTab = 'properties';
  protected isLoading = true;
  protected isSaving = false;
  protected loadError = '';
  protected saveError = '';
  protected successMessage = '';
  protected requiredFieldsPopupMessage = '';

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

  protected get requiredTargetFields(): TargetField[] {
    return this.targetFields.filter(field => field.required);
  }

  protected get optionalTargetFields(): TargetField[] {
    return this.targetFields.filter(field => !field.required);
  }

  protected get orderedTargetFields(): TargetField[] {
    return [...this.requiredTargetFields, ...this.optionalTargetFields];
  }

  protected get canvasHeight(): number {
    const sourceHeight = this.sourceFields.length * 58;
    const targetHeaderHeight = (this.requiredTargetFields.length > 0 ? 40 : 0)
      + (this.optionalTargetFields.length > 0 ? 40 : 0);
    const targetHeight = this.targetFields.length * 58 + targetHeaderHeight;

    return Math.max(420, 112 + Math.max(sourceHeight, targetHeight));
  }

  protected get mappedTargetCount(): number {
    return new Set(this.mappingDefinitions.map(mapping => mapping.targetField)).size;
  }

  protected get warnings(): string[] {
    return this.missingRequiredTargetFields
      .map(field => `${this.getTargetFieldLabel(field)} zorunlu ama henüz eşleşmedi.`);
  }

  protected get missingRequiredTargetFields(): TargetField[] {
    return this.targetFields.filter(field => this.isRequiredTargetUnmapped(field.name));
  }

  protected get selectedSourceFieldDetails(): SourceField | undefined {
    return this.getSourceField(this.selectedSourceField);
  }

  protected get selectedTargetFieldDetails(): TargetField | undefined {
    return this.getTargetField(this.selectedTargetField);
  }

  protected get canConnectSelectedFields(): boolean {
    return Boolean(this.selectedSourceField && this.selectedTargetField);
  }

  protected trackByFieldName(_index: number, field: SourceField | TargetField): string {
    return field.name;
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

  protected startSourceDrag(event: DragEvent, fieldName: string): void {
    event.stopPropagation();
    this.draggedSourceField = fieldName;
    this.selectedSourceField = fieldName;
    this.selectedTransformType = 'direct';
    this.pendingConnection = undefined;
    this.successMessage = '';
    this.saveError = '';

    event.dataTransfer?.setData('text/plain', fieldName);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'copy';
    }
  }

  protected enterTargetDropZone(event: DragEvent, fieldName: string): void {
    if (!this.draggedSourceField) {
      return;
    }

    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
    this.dragTargetField = fieldName;
    this.selectedTargetField = fieldName;
  }

  protected leaveTargetDropZone(fieldName: string): void {
    if (this.dragTargetField === fieldName) {
      this.dragTargetField = '';
    }
  }

  protected allowDragOverGap(event: DragEvent): void {
    if (!this.draggedSourceField) {
      return;
    }

    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
  }

  protected dropOnNearestTarget(event: DragEvent): void {
    if ((event.target as HTMLElement)?.closest('.target-drop-zone')) {
      return;
    }

    event.preventDefault();
    const targetField = this.resolveNearestTargetField(event.clientY);
    if (!targetField) {
      this.clearDragState();
      return;
    }

    this.dropOnTarget(event, targetField);
  }

  private resolveNearestTargetField(clientY: number): string | undefined {
    const rows = Array.from(document.querySelectorAll<HTMLElement>('.target-drop-zone[data-field-name]'));
    let closestFieldName: string | undefined;
    let closestDistance = Number.POSITIVE_INFINITY;

    for (const row of rows) {
      const rect = row.getBoundingClientRect();
      const distance = clientY < rect.top
        ? rect.top - clientY
        : clientY > rect.bottom
          ? clientY - rect.bottom
          : 0;

      if (distance < closestDistance) {
        closestDistance = distance;
        closestFieldName = row.dataset['fieldName'];
      }
    }

    return closestFieldName;
  }

  protected updateDragTransform(transformType: MappingTransformType): void {
    this.selectedTransformType = transformType;
  }

  protected dropOnTarget(event: DragEvent, targetField: string): void {
    event.preventDefault();
    event.stopPropagation();
    const sourceField = this.draggedSourceField || event.dataTransfer?.getData('text/plain') || '';

    if (!sourceField) {
      this.clearDragState();
      return;
    }

    this.selectedSourceField = sourceField;
    this.selectedTargetField = targetField;
    const existingMapping = this.getMappingForTarget(targetField);
    this.selectedTransformType = existingMapping ? 'concat' : 'direct';
    this.pendingConnection = { sourceField, targetField };
    this.clearDragState(false);
  }

  protected endSourceDrag(): void {
    this.clearDragState();
  }

  protected connectSelectedFields(): void {
    this.connectFields(this.selectedSourceField, this.selectedTargetField, this.selectedTransformType);
  }

  protected choosePendingTransform(transformType: MappingTransformType): void {
    if (!this.pendingConnection) {
      return;
    }

    const { sourceField, targetField } = this.pendingConnection;
    const didConnect = this.connectFields(sourceField, targetField, transformType);

    if (didConnect) {
      this.pendingConnection = undefined;
      this.selectedTransformType = transformType;
    }
  }

  protected cancelPendingConnection(): void {
    this.pendingConnection = undefined;
    this.selectedSourceField = '';
    this.selectedTargetField = '';
    this.successMessage = '';
    this.saveError = '';
  }

  protected isPendingTarget(fieldName: string): boolean {
    return this.pendingConnection?.targetField === fieldName;
  }

  protected getMappingSourceLabel(mappingDefinition: MappingDefinition): string {
    return this.getSourceFieldNames(mappingDefinition.sourceField)
      .map(fieldName => this.getSourceLabelByName(fieldName))
      .join(' + ');
  }

  private connectFields(
    sourceField: string,
    targetField: string,
    transformType: MappingTransformType
  ): boolean {
    if (!sourceField || !targetField) {
      return false;
    }

    const existingIndex = this.mappingDefinitions.findIndex(
      mapping => mapping.targetField === targetField
    );
    const existingMapping = existingIndex >= 0 ? this.mappingDefinitions[existingIndex] : undefined;

    const sourceFieldValue = transformType === 'concat' && existingMapping
      ? this.mergeSourceFields(existingMapping.sourceField, sourceField)
      : sourceField;
    const mappingDefinition: MappingDefinition = {
      sourceField: sourceFieldValue,
      targetField,
      transformType
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
    return true;
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

    if (this.missingRequiredTargetFields.length > 0) {
      this.activeBottomTab = 'warnings';
      this.requiredFieldsPopupMessage = `Zorunlu alanlar boş bırakılamaz: ${this.missingRequiredTargetFields
        .map(field => this.getTargetFieldLabel(field))
        .join(', ')}.`;
      this.saveError = `Zorunlu hedef alanlar eşleştirilmeden devam edilemez: ${this.missingRequiredTargetFields
        .map(field => this.getTargetFieldLabel(field))
        .join(', ')}.`;
      return;
    }

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

  protected closeRequiredFieldsPopup(): void {
    this.requiredFieldsPopupMessage = '';
  }

  protected setActiveBottomTab(tab: BottomPanelTab): void {
    this.activeBottomTab = tab;
  }

  protected getSourceMappingCount(fieldName: string): number {
    return this.mappingDefinitions.filter(mapping => this.getSourceFieldNames(mapping.sourceField).includes(fieldName)).length;
  }

  protected getSourceUsageLabel(fieldName: string): string {
    const usageCount = this.getSourceMappingCount(fieldName);
    return usageCount > 0 ? `${fieldName} - ${usageCount} eşleşme` : fieldName;
  }

  protected isTargetMapped(fieldName: string): boolean {
    return this.mappingDefinitions.some(mapping => mapping.targetField === fieldName);
  }

  protected isRequiredTargetUnmapped(fieldName: string): boolean {
    const field = this.getTargetField(fieldName);
    return Boolean(field?.required && !this.isTargetMapped(fieldName));
  }

  protected getMappingForTarget(fieldName: string): MappingDefinition | undefined {
    return this.mappingDefinitions.find(mapping => mapping.targetField === fieldName);
  }

  protected getSourceLineY(sourceField: string): number {
    const firstSourceField = this.getSourceFieldNames(sourceField)[0] ?? sourceField;
    const index = Math.max(this.sourceFields.findIndex(field => field.name === firstSourceField), 0);
    return 94 + index * 58;
  }

  protected getTargetLineY(targetField: string): number {
    const requiredIndex = this.requiredTargetFields.findIndex(field => field.name === targetField);
    if (requiredIndex >= 0) {
      return 113 + requiredIndex * 58;
    }

    const optionalIndex = Math.max(this.optionalTargetFields.findIndex(field => field.name === targetField), 0);
    const optionalBaseY = this.requiredTargetFields.length > 0
      ? 153 + this.requiredTargetFields.length * 58
      : 113;

    return optionalBaseY + optionalIndex * 58;
  }

  protected getConnectionLabelY(mappingDefinition: MappingDefinition): number {
    return (this.getSourceLineY(mappingDefinition.sourceField) + this.getTargetLineY(mappingDefinition.targetField)) / 2 - 8;
  }

  protected getFunctionNodeLabel(mappingDefinition: MappingDefinition): string {
    return mappingDefinition.transformType;
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

  private clearDragState(clearPendingConnection = false): void {
    this.draggedSourceField = '';
    this.dragTargetField = '';
    if (clearPendingConnection) {
      this.pendingConnection = undefined;
    }
  }

  private mergeSourceFields(existingSourceField: string, nextSourceField: string): string {
    const sourceFields = [...this.getSourceFieldNames(existingSourceField), nextSourceField]
      .map(fieldName => fieldName.trim())
      .filter(Boolean);

    return Array.from(new Set(sourceFields)).join(', ');
  }

  private getSourceFieldNames(sourceField: string): string[] {
    return sourceField
      .split(',')
      .map(fieldName => fieldName.trim())
      .filter(Boolean);
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
