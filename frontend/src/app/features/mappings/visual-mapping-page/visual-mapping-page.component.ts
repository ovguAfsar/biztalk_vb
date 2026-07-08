import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, inject } from '@angular/core';
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
import { WizardStepperComponent } from '../../../shared/wizard-stepper/wizard-stepper.component';

type BottomPanelTab = 'properties' | 'output' | 'warnings';

interface PendingConnection {
  sourceField: string;
  targetField: string;
}

@Component({
  selector: 'app-visual-mapping-page',
  standalone: true,
  imports: [CommonModule, WizardStepperComponent],
  templateUrl: './visual-mapping-page.component.html',
  styleUrl: './visual-mapping-page.component.css'
})
export class VisualMappingPageComponent implements OnInit {
  private readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly mappingApi = inject(MappingApiService);
  private readonly changeDetector = inject(ChangeDetectorRef);
  protected readonly sourcePortX = 204;
  protected readonly functionInputX = 452;
  protected readonly functionOutputX = 548;
  protected readonly targetPortX = 786;
  private readonly sourceFirstPortY = 93;
  private readonly sourcePortStepY = 72;
  private readonly targetFirstPortY = 119;
  private readonly targetPortStepY = 66;
  private readonly targetOptionalFirstPortY = 151;

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
  protected dragPreviewX = this.sourcePortX;
  protected dragPreviewY = 0;
  protected pendingConnection?: PendingConnection;
  protected activeBottomTab: BottomPanelTab = 'properties';
  protected isLoading = true;
  protected isSaving = false;
  protected loadError = '';
  protected saveError = '';
  protected successMessage = '';
  protected requiredFieldsPopupMessage = '';
  protected autoMatchMessage = '';
  protected mappingValidationWarnings: string[] = [];

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
    const sourceHeight = this.sourceFields.length * this.sourcePortStepY;
    const requiredHeight = this.requiredTargetFields.length > 0
      ? 40 + this.requiredTargetFields.length * this.targetPortStepY
      : 0;
    const optionalHeight = this.optionalTargetFields.length > 0
      ? 40 + this.optionalTargetFields.length * this.targetPortStepY
      : 0;
    const targetHeight = requiredHeight + optionalHeight;

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

  protected get canSubmitMappings(): boolean {
    return this.mappingDefinitions.length > 0
      && this.missingRequiredTargetFields.length === 0
      && !this.isSaving;
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

  protected get dragPreviewEndX(): number {
    return this.dragTargetField ? this.getTargetPortX(this.dragTargetField) : this.dragPreviewX;
  }

  protected get dragPreviewEndY(): number {
    return this.dragTargetField ? this.getTargetLineY(this.dragTargetField) : this.dragPreviewY;
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
    this.dragPreviewX = this.sourcePortX;
    this.dragPreviewY = this.getSourceLineY(fieldName);
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
    this.updateDragPreview(event);
    this.setActiveDragTarget(this.resolveTargetFieldAtPoint(event.clientX, event.clientY) ?? fieldName);
  }

  protected leaveTargetDropZone(event: DragEvent, fieldName: string): void {
    const nextTargetField = this.resolveTargetFieldAtPoint(event.clientX, event.clientY);
    if (nextTargetField && nextTargetField !== fieldName) {
      this.setActiveDragTarget(nextTargetField);
      return;
    }

    if (!nextTargetField && this.dragTargetField === fieldName) {
      this.dragTargetField = '';
    }
  }

  protected allowDragOverGap(event: DragEvent): void {
    if (!this.draggedSourceField) {
      return;
    }

    event.preventDefault();
    this.updateDragPreview(event);
    const targetField = this.resolveTargetFieldAtPoint(event.clientX, event.clientY);
    if (targetField) {
      this.setActiveDragTarget(targetField);
    } else {
      this.dragTargetField = '';
    }

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
  }

  protected updateDragPreview(event: DragEvent): void {
    if (!this.draggedSourceField) {
      return;
    }

    const canvas = (event.target as HTMLElement | null)?.closest('.canvas-grid');
    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const width = Math.max(rect.width, 1);
    const height = Math.max(rect.height, 1);
    const x = ((event.clientX - rect.left) / width) * 1000;
    const y = ((event.clientY - rect.top) / height) * this.canvasHeight;

    this.dragPreviewX = Math.min(960, Math.max(this.sourcePortX, x));
    this.dragPreviewY = Math.min(this.canvasHeight - 24, Math.max(24, y));
  }

  protected dropOnNearestTarget(event: DragEvent): void {
    if ((event.target as HTMLElement)?.closest('.target-drop-zone, .schema-target-drop')) {
      return;
    }

    event.preventDefault();
    const targetField = this.resolveTargetFieldAtPoint(event.clientX, event.clientY)
      ?? this.resolveNearestTargetField(event.clientY);
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
    const resolvedTargetField = this.resolveTargetFieldAtPoint(event.clientX, event.clientY) ?? targetField;

    if (!sourceField || !resolvedTargetField) {
      this.clearDragState();
      return;
    }

    this.selectedSourceField = sourceField;
    this.selectedTargetField = resolvedTargetField;
    const existingMapping = this.getMappingForTarget(resolvedTargetField);
    this.selectedTransformType = existingMapping ? 'concat' : 'direct';
    this.pendingConnection = { sourceField, targetField: resolvedTargetField };
    this.clearDragState(false);
  }

  protected endSourceDrag(): void {
    this.clearDragState();
  }

  protected connectSelectedFields(): void {
    this.connectFields(this.selectedSourceField, this.selectedTargetField, this.selectedTransformType);
  }

  protected autoMatchFields(): void {
    this.successMessage = '';
    this.saveError = '';
    this.autoMatchMessage = '';

    const createdMappings = this.createAutoMatches();
    if (createdMappings.length === 0) {
      this.autoMatchMessage = 'Benzer alan bulunamadı veya mevcut eşleşmeler korunuyor.';
      return;
    }

    this.mappingDefinitions = [...this.mappingDefinitions, ...createdMappings];
    this.autoMatchMessage = `${createdMappings.length} alan otomatik eşlendi. İstersen bağlantıları silebilir veya değiştirebilirsin.`;
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

  protected canUsePendingTransform(transformType: MappingTransformType): boolean {
    if (!this.pendingConnection) {
      return true;
    }

    return !this.getMappingForTarget(this.pendingConnection.targetField) || transformType === 'concat';
  }

  protected getPendingTransformTitle(transformType: MappingTransformType): string {
    return this.canUsePendingTransform(transformType)
      ? transformType
      : 'Bu hedef alan zaten dolu. Aynı hedefe ek kaynak sadece concat ile bağlanabilir.';
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
    return this.getConnectionSourceFields(mappingDefinition)
      .map(fieldName => this.getSourceLabelByName(fieldName))
      .join(' + ');
  }

  protected getConnectionSourceFields(mappingDefinition: MappingDefinition): string[] {
    return this.getSourceFieldNames(mappingDefinition.sourceField);
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

    if (existingMapping && transformType !== 'concat') {
      this.saveError = 'Bu hedef alan zaten eşleşmiş. Aynı hedefe ek kaynak sadece concat ile bağlanabilir.';
      return false;
    }

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

  protected saveMappings(confirmWarnings = false): void {
    this.successMessage = '';
    this.saveError = '';
    if (!confirmWarnings) {
      this.mappingValidationWarnings = [];
    }

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

    const clientWarnings = this.getMappingTypeWarnings();
    if (clientWarnings.length > 0 && !confirmWarnings) {
      this.mappingValidationWarnings = clientWarnings;
      this.activeBottomTab = 'warnings';
      this.changeDetector.detectChanges();
      return;
    }

    this.isSaving = true;

    this.mappingApi.saveMappings(this.mappingId, { mappings: this.mappingDefinitions, confirmWarnings })
      .pipe(finalize(() => {
        this.isSaving = false;
        this.changeDetector.detectChanges();
      }))
      .subscribe({
        next: (response) => {
          const responseWarnings = response.warnings ?? [];
          if (responseWarnings.length > 0 && !confirmWarnings) {
            this.mappingValidationWarnings = responseWarnings;
            this.activeBottomTab = 'warnings';
            this.changeDetector.detectChanges();
            return;
          }

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

  protected closeMappingValidationWarnings(): void {
    this.mappingValidationWarnings = [];
  }

  protected continueDespiteMappingWarnings(): void {
    this.mappingValidationWarnings = [];
    this.saveMappings(true);
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
    const portCenter = this.getPortCenter('.connector-port--source', firstSourceField);
    if (portCenter) {
      return portCenter.y;
    }

    const index = Math.max(this.sourceFields.findIndex(field => field.name === firstSourceField), 0);
    return this.sourceFirstPortY + index * this.sourcePortStepY;
  }

  protected getSourcePortX(sourceField: string): number {
    const firstSourceField = this.getSourceFieldNames(sourceField)[0] ?? sourceField;
    return this.getPortCenter('.connector-port--source', firstSourceField)?.x ?? this.sourcePortX;
  }

  protected getTargetLineY(targetField: string): number {
    const portCenter = this.getPortCenter('.connector-port--target', targetField);
    if (portCenter) {
      return portCenter.y;
    }

    const requiredIndex = this.requiredTargetFields.findIndex(field => field.name === targetField);
    if (requiredIndex >= 0) {
      return this.targetFirstPortY + requiredIndex * this.targetPortStepY;
    }

    const optionalIndex = Math.max(this.optionalTargetFields.findIndex(field => field.name === targetField), 0);
    const optionalBaseY = this.requiredTargetFields.length > 0
      ? this.targetOptionalFirstPortY + this.requiredTargetFields.length * this.targetPortStepY
      : this.targetFirstPortY;

    return optionalBaseY + optionalIndex * this.targetPortStepY;
  }

  protected getTargetPortX(targetField: string): number {
    return this.getPortCenter('.connector-port--target', targetField)?.x ?? this.targetPortX;
  }

  protected getConnectionLabelY(mappingDefinition: MappingDefinition): number {
    const sourceFields = this.getConnectionSourceFields(mappingDefinition);
    const sourceAverageY = sourceFields.length > 0
      ? sourceFields.reduce((total, sourceField) => total + this.getSourceLineY(sourceField), 0) / sourceFields.length
      : this.getSourceLineY(mappingDefinition.sourceField);

    return (sourceAverageY + this.getTargetLineY(mappingDefinition.targetField)) / 2 - 8;
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

  protected getCanvasFieldName(field: SourceField | TargetField): string {
    return field.displayName || this.splitFieldName(field.name);
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
          } else if (this.mappingDefinitions.length === 0) {
            const createdMappings = this.createAutoMatches();
            if (createdMappings.length > 0) {
              this.mappingDefinitions = createdMappings;
              this.autoMatchMessage = `${createdMappings.length} alan otomatik eşlendi. İstersen bağlantıları silebilir veya değiştirebilirsin.`;
            }
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

  private setActiveDragTarget(fieldName: string): void {
    this.dragTargetField = fieldName;
    this.selectedTargetField = fieldName;
  }

  private resolveTargetFieldAtPoint(clientX: number, clientY: number): string | undefined {
    if (!clientX && !clientY) {
      return undefined;
    }

    const elements = document.elementsFromPoint(clientX, clientY);
    for (const element of elements) {
      const targetElement = element.closest<HTMLElement>('.target-drop-zone[data-field-name], .schema-target-drop[data-field-name]');
      const fieldName = targetElement?.dataset['fieldName'];
      if (fieldName) {
        return fieldName;
      }
    }

    return undefined;
  }

  private splitFieldName(fieldName: string): string {
    return fieldName
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
      .replace(/\bIban\b/g, 'IBAN')
      .replace(/\bTc\b/g, 'TC')
      .trim();
  }

  private getPortCenter(selector: string, fieldName: string): { x: number; y: number } | undefined {
    const canvas = this.hostElement.nativeElement.querySelector<HTMLElement>('.canvas-grid');
    if (!canvas) {
      return undefined;
    }

    const ports = Array.from(this.hostElement.nativeElement.querySelectorAll<HTMLElement>(selector));
    const port = ports.find(element => element.dataset['fieldName'] === fieldName);
    if (!port) {
      return undefined;
    }

    const canvasRect = canvas.getBoundingClientRect();
    const portRect = port.getBoundingClientRect();
    const canvasWidth = Math.max(canvasRect.width, 1);
    const canvasHeight = Math.max(canvasRect.height, 1);

    return {
      x: ((portRect.left + portRect.width / 2 - canvasRect.left) / canvasWidth) * 1000,
      y: ((portRect.top + portRect.height / 2 - canvasRect.top) / canvasHeight) * this.canvasHeight
    };
  }

  private clearDragState(clearPendingConnection = false): void {
    this.draggedSourceField = '';
    this.dragTargetField = '';
    this.dragPreviewX = this.sourcePortX;
    this.dragPreviewY = 0;
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

  private getMappingTypeWarnings(): string[] {
    return this.mappingDefinitions
      .map(mappingDefinition => this.getMappingTypeWarning(mappingDefinition))
      .filter((warning): warning is string => Boolean(warning));
  }

  private getMappingTypeWarning(mappingDefinition: MappingDefinition): string | undefined {
    if (mappingDefinition.transformType === 'constant') {
      return undefined;
    }

    const sourceFields = this.getSourceFieldNames(mappingDefinition.sourceField)
      .map(fieldName => this.getSourceField(fieldName))
      .filter((field): field is SourceField => Boolean(field));
    const targetField = this.getTargetField(mappingDefinition.targetField);

    if (sourceFields.length === 0 || !targetField) {
      return undefined;
    }

    if (sourceFields.length > 1) {
      if (targetField.type === 'text') {
        return undefined;
      }

      return `Tip uyumsuzluğu olabilir: kaynak '${sourceFields.map(field => this.getSourceFieldLabel(field)).join(' + ')}' (${sourceFields.map(field => field.type).join(' + ')}) hedef '${this.getTargetFieldLabel(targetField)}' (${targetField.type}) alanına eşlenmiş.`;
    }

    const sourceField = sourceFields[0];
    if (sourceField.type === targetField.type) {
      return undefined;
    }

    if (mappingDefinition.transformType === 'dateFormat' && targetField.type === 'date') {
      return undefined;
    }

    return `Tip uyumsuzluğu olabilir: kaynak '${this.getSourceFieldLabel(sourceField)}' (${sourceField.type}) hedef '${this.getTargetFieldLabel(targetField)}' (${targetField.type}) alanına eşlenmiş.`;
  }

  private createAutoMatches(): MappingDefinition[] {
    const usedSources = new Set(
      this.mappingDefinitions.flatMap(mapping => this.getSourceFieldNames(mapping.sourceField))
    );
    const usedTargets = new Set(this.mappingDefinitions.map(mapping => mapping.targetField));
    const candidates = this.targetFields
      .filter(targetField => !usedTargets.has(targetField.name))
      .flatMap(targetField => this.sourceFields
        .filter(sourceField => !usedSources.has(sourceField.name))
        .map(sourceField => ({
          sourceField: sourceField.name,
          targetField: targetField.name,
          score: this.getFieldSimilarityScore(sourceField, targetField)
        })))
      .filter(candidate => candidate.score >= 0.68)
      .sort((left, right) => right.score - left.score);
    const matches: MappingDefinition[] = [];

    for (const candidate of candidates) {
      if (usedSources.has(candidate.sourceField) || usedTargets.has(candidate.targetField)) {
        continue;
      }

      usedSources.add(candidate.sourceField);
      usedTargets.add(candidate.targetField);
      matches.push({
        sourceField: candidate.sourceField,
        targetField: candidate.targetField,
        transformType: 'direct'
      });
    }

    return matches;
  }

  private getFieldSimilarityScore(sourceField: SourceField, targetField: TargetField): number {
    const sourceTerms = this.getFieldSearchTerms(sourceField);
    const targetTerms = this.getFieldSearchTerms(targetField);
    let bestScore = 0;

    for (const sourceTerm of sourceTerms) {
      for (const targetTerm of targetTerms) {
        bestScore = Math.max(bestScore, this.scoreNormalizedTerms(sourceTerm, targetTerm));
      }
    }

    return bestScore;
  }

  private getFieldSearchTerms(field: SourceField | TargetField): string[] {
    return Array.from(new Set([
      field.name,
      field.displayName ?? '',
      this.splitFieldName(field.name),
      field.displayName ? this.splitFieldName(field.displayName) : ''
    ]
      .map(value => value.trim())
      .filter(Boolean)));
  }

  private scoreNormalizedTerms(sourceValue: string, targetValue: string): number {
    const source = this.normalizeFieldText(sourceValue);
    const target = this.normalizeFieldText(targetValue);

    if (!source || !target) {
      return 0;
    }

    if (source.compact === target.compact) {
      return 1;
    }

    if (source.compact.includes(target.compact) || target.compact.includes(source.compact)) {
      const shorterLength = Math.min(source.compact.length, target.compact.length);
      const longerLength = Math.max(source.compact.length, target.compact.length);
      return Math.max(0.76, 0.72 + (shorterLength / longerLength) * 0.22);
    }

    const sourceTokenSet = new Set(source.tokens);
    const targetTokenSet = new Set(target.tokens);
    const intersectionCount = target.tokens.filter(token => sourceTokenSet.has(token)).length;
    const reverseIntersectionCount = source.tokens.filter(token => targetTokenSet.has(token)).length;
    const targetCoverage = target.tokens.length > 0 ? intersectionCount / target.tokens.length : 0;
    const sourceCoverage = source.tokens.length > 0 ? reverseIntersectionCount / source.tokens.length : 0;

    if (targetCoverage === 1 && target.tokens.length > 0) {
      return 0.86;
    }

    const tokenScore = targetCoverage * 0.62 + sourceCoverage * 0.2;
    const diceScore = this.getDiceCoefficient(source.compact, target.compact) * 0.72;

    return Math.max(tokenScore, diceScore);
  }

  private normalizeFieldText(value: string): { compact: string; tokens: string[] } {
    const asciiValue = value
      .replace(/[Çç]/g, 'c')
      .replace(/[Ğğ]/g, 'g')
      .replace(/[İIı]/g, 'i')
      .replace(/[Öö]/g, 'o')
      .replace(/[Şş]/g, 's')
      .replace(/[Üü]/g, 'u')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const spacedValue = asciiValue
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
      .replace(/[_\-.]+/g, ' ')
      .toLowerCase();
    const tokens = spacedValue
      .replace(/[^a-z0-9]+/g, ' ')
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map(token => this.normalizeFieldToken(token))
      .filter(Boolean);

    return {
      compact: tokens.join(''),
      tokens: Array.from(new Set(tokens))
    };
  }

  private normalizeFieldToken(token: string): string {
    const aliases: Record<string, string> = {
      alici: '',
      gonderen: '',
      musteri: '',
      kisi: '',
      no: 'numara',
      numarasi: 'numara',
      numarası: 'numara',
      hesapno: 'hesapnumara',
      tutari: 'tutar',
      tutarı: 'tutar',
      miktar: 'tutar',
      amount: 'tutar',
      name: 'ad',
      surname: 'soyad',
      lastname: 'soyad',
      firstname: 'ad'
    };

    return aliases[token] ?? token;
  }

  private getDiceCoefficient(left: string, right: string): number {
    if (left.length < 2 || right.length < 2) {
      return left === right ? 1 : 0;
    }

    const leftBigrams = this.getBigrams(left);
    const rightBigrams = this.getBigrams(right);
    const rightCounts = rightBigrams.reduce<Map<string, number>>((counts, bigram) => {
      counts.set(bigram, (counts.get(bigram) ?? 0) + 1);
      return counts;
    }, new Map<string, number>());
    let intersection = 0;

    for (const bigram of leftBigrams) {
      const count = rightCounts.get(bigram) ?? 0;
      if (count > 0) {
        intersection += 1;
        rightCounts.set(bigram, count - 1);
      }
    }

    return (2 * intersection) / (leftBigrams.length + rightBigrams.length);
  }

  private getBigrams(value: string): string[] {
    return Array.from({ length: value.length - 1 }, (_, index) => value.slice(index, index + 2));
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
