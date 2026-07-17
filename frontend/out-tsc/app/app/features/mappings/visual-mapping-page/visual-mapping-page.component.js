import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, HostListener, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { MappingApiService } from '../../../core/services/mapping-api.service';
import { WizardStepperComponent } from '../../../shared/wizard-stepper/wizard-stepper.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = () => ["text", "number", "date", "boolean", "object", "array"];
function VisualMappingPageComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11)(1, "span", 12);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 13);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 14);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.mapping.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.mapping.sourceType);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.mapping.targetType);
} }
function VisualMappingPageComponent_p_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 15);
    i0.ɵɵtext(1, "Mapping bilgisi y\u00FCkleniyor...");
    i0.ɵɵelementEnd();
} }
function VisualMappingPageComponent_p_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.loadError);
} }
function VisualMappingPageComponent_section_9_button_14_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, " \u00B7 required");
    i0.ɵɵelementEnd();
} }
function VisualMappingPageComponent_section_9_button_14_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 73);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const usageCount_r5 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", usageCount_r5, " e\u015Fle\u015Fme ");
} }
function VisualMappingPageComponent_section_9_button_14_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 69);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_section_9_button_14_Template_button_click_0_listener() { const field_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.selectSourceField(field_r4.name)); });
    i0.ɵɵelementStart(1, "span", 70);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 71);
    i0.ɵɵtext(4);
    i0.ɵɵtemplate(5, VisualMappingPageComponent_section_9_button_14_span_5_Template, 2, 0, "span", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, VisualMappingPageComponent_section_9_button_14_span_6_Template, 2, 1, "span", 72);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const field_r4 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("schema-field--selected", ctx_r0.selectedSourceField === field_r4.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.getSourceFieldLabel(field_r4));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(field_r4.type);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", field_r4.required);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.getSourceMappingCount(field_r4.name));
} }
function VisualMappingPageComponent_section_9_section_15_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 80);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.requiredPendingFixedWidthTargetFields.length, " zorunlu ");
} }
function VisualMappingPageComponent_section_9_section_15_li_9_strong_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1, "Zorunlu");
    i0.ɵɵelementEnd();
} }
function VisualMappingPageComponent_section_9_section_15_li_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, VisualMappingPageComponent_section_9_section_15_li_9_strong_3_Template, 2, 0, "strong", 32);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const field_r7 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.getTargetFieldLabel(field_r7));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", field_r7.required);
} }
function VisualMappingPageComponent_section_9_section_15_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 74)(1, "div", 75)(2, "div")(3, "strong");
    i0.ɵɵtext(4, "Bekleyen sabit geni\u015Flik alanlar\u0131");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(7, VisualMappingPageComponent_section_9_section_15_span_7_Template, 2, 1, "span", 76);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "ul", 77);
    i0.ɵɵtemplate(9, VisualMappingPageComponent_section_9_section_15_li_9_Template, 4, 2, "li", 78);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "button", 79);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_section_9_section_15_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.openDeferredFixedWidthPositions()); });
    i0.ɵɵtext(11, " Pozisyonlar\u0131 Tan\u0131mla ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", ctx_r0.pendingFixedWidthTargetFields.length, " alan");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.requiredPendingFixedWidthTargetFields.length > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r0.pendingFixedWidthTargetFields)("ngForTrackBy", ctx_r0.trackByFieldName);
} }
function VisualMappingPageComponent_section_9_span_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "AI ile E\u015Fle");
    i0.ɵɵelementEnd();
} }
function VisualMappingPageComponent_section_9_span_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "AI d\u00FC\u015F\u00FCn\u00FCyor...");
    i0.ɵɵelementEnd();
} }
function VisualMappingPageComponent_section_9_button_31_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 81);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_section_9_button_31_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.requestClearMappings()); });
    i0.ɵɵtext(1, " T\u00FCm\u00FCn\u00FC Sil ");
    i0.ɵɵelementEnd();
} }
function VisualMappingPageComponent_section_9_span_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Ok ba\u015Flang\u0131c\u0131: ", ctx_r0.getSourceLabelByName(ctx_r0.draggedSourceField));
} }
function VisualMappingPageComponent_section_9_span_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" Se\u00E7iliyor: ", ctx_r0.getSourceLabelByName(ctx_r0.pendingConnection.sourceField), " \u2192 ", ctx_r0.getTargetLabelByName(ctx_r0.pendingConnection.targetField), " ");
} }
function VisualMappingPageComponent_section_9_span_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 82);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.autoMatchMessage);
} }
function VisualMappingPageComponent_section_9_span_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 83);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.aiMatchMessage);
} }
function VisualMappingPageComponent_section_9__svg_ng_container_45__svg_path_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelement(0, "path", 88);
} if (rf & 2) {
    const sourceField_r9 = ctx.$implicit;
    const mappingDefinition_r10 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("marker-end", "url(#" + ctx_r0.getMarkerId(mappingDefinition_r10.targetField) + ")");
    i0.ɵɵclassProp("connection-line--highlighted", ctx_r0.isMappingHighlighted(mappingDefinition_r10.targetField))("connection-line--dimmed", ctx_r0.isMappingDimmed(mappingDefinition_r10.targetField));
    i0.ɵɵattribute("d", ctx_r0.getConnectionPath(sourceField_r9, mappingDefinition_r10));
} }
function VisualMappingPageComponent_section_9__svg_ng_container_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, VisualMappingPageComponent_section_9__svg_ng_container_45__svg_path_1_Template, 1, 7, "path", 84);
    i0.ɵɵelementStart(2, "g", 85);
    i0.ɵɵelement(3, "rect", 86);
    i0.ɵɵelementStart(4, "text", 87);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const mappingDefinition_r10 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.getConnectionSourceFields(mappingDefinition_r10));
    i0.ɵɵadvance();
    i0.ɵɵclassProp("connection-function--highlighted", ctx_r0.isMappingHighlighted(mappingDefinition_r10.targetField))("connection-function--dimmed", ctx_r0.isMappingDimmed(mappingDefinition_r10.targetField));
    i0.ɵɵattribute("transform", "translate(" + ctx_r0.getConnectionLabelX(mappingDefinition_r10) + " " + ctx_r0.getConnectionLabelY(mappingDefinition_r10) + ")");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.getFunctionNodeLabel(mappingDefinition_r10));
} }
function VisualMappingPageComponent_section_9__svg_line_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelement(0, "line", 89);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("x1", ctx_r0.getSourcePortX(ctx_r0.draggedSourceField))("y1", ctx_r0.getSourceLineY(ctx_r0.draggedSourceField))("x2", ctx_r0.dragPreviewEndX)("y2", ctx_r0.dragPreviewEndY);
} }
function VisualMappingPageComponent_section_9__svg_circle_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelement(0, "circle", 90);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("cx", ctx_r0.dragPreviewEndX)("cy", ctx_r0.dragPreviewEndY);
} }
function VisualMappingPageComponent_section_9_button_49_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 91);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_section_9_button_49_Template_button_click_0_listener() { const field_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.selectSourceField(field_r12.name)); })("mouseenter", function VisualMappingPageComponent_section_9_button_49_Template_button_mouseenter_0_listener() { const field_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.setHoveredSourceField(field_r12.name)); })("mouseleave", function VisualMappingPageComponent_section_9_button_49_Template_button_mouseleave_0_listener() { i0.ɵɵrestoreView(_r11); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.clearHoveredMapping()); });
    i0.ɵɵelementStart(1, "span", 92)(2, "span", 93);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 94);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span", 95);
    i0.ɵɵlistener("dragstart", function VisualMappingPageComponent_section_9_button_49_Template_span_dragstart_6_listener($event) { const field_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.startSourceDrag($event, field_r12.name)); })("dragend", function VisualMappingPageComponent_section_9_button_49_Template_span_dragend_6_listener() { i0.ɵɵrestoreView(_r11); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.endSourceDrag()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const field_r12 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("canvas-node--selected", ctx_r0.selectedSourceField === field_r12.name);
    i0.ɵɵattribute("title", ctx_r0.getSourceUsageLabel(field_r12.name));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.getCanvasFieldName(field_r12));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(field_r12.type);
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-field-name", field_r12.name);
} }
function VisualMappingPageComponent_section_9_section_51_div_3_div_11_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 110);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_section_9_section_51_div_3_div_11_button_6_Template_button_click_0_listener() { const transform_r18 = i0.ɵɵrestoreView(_r17).$implicit; const ctx_r0 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r0.choosePendingTransform(transform_r18)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const transform_r18 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(5);
    i0.ɵɵclassProp("drop-transform-palette__option--active", ctx_r0.selectedTransformType === transform_r18);
    i0.ɵɵproperty("disabled", !ctx_r0.canUsePendingTransform(transform_r18));
    i0.ɵɵattribute("title", ctx_r0.getPendingTransformTitle(transform_r18));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", transform_r18, " ");
} }
function VisualMappingPageComponent_section_9_section_51_div_3_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 106)(1, "div", 107)(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, VisualMappingPageComponent_section_9_section_51_div_3_div_11_button_6_Template, 2, 5, "button", 108);
    i0.ɵɵelementStart(7, "button", 109);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_section_9_section_51_div_3_div_11_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r16); const ctx_r0 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r0.cancelPendingConnection()); });
    i0.ɵɵtext(8, " Vazge\u00E7 ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const pending_r19 = ctx.ngIf;
    const ctx_r0 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.getSourceLabelByName(pending_r19.sourceField));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.getTargetLabelByName(pending_r19.targetField));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.transformOptions);
} }
function VisualMappingPageComponent_section_9_section_51_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 99);
    i0.ɵɵlistener("dragenter", function VisualMappingPageComponent_section_9_section_51_div_3_Template_div_dragenter_0_listener($event) { const field_r15 = i0.ɵɵrestoreView(_r14).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.enterTargetDropZone($event, field_r15.name)); })("dragover", function VisualMappingPageComponent_section_9_section_51_div_3_Template_div_dragover_0_listener($event) { const field_r15 = i0.ɵɵrestoreView(_r14).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.enterTargetDropZone($event, field_r15.name)); })("dragleave", function VisualMappingPageComponent_section_9_section_51_div_3_Template_div_dragleave_0_listener($event) { const field_r15 = i0.ɵɵrestoreView(_r14).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.leaveTargetDropZone($event, field_r15.name)); })("drop", function VisualMappingPageComponent_section_9_section_51_div_3_Template_div_drop_0_listener($event) { const field_r15 = i0.ɵɵrestoreView(_r14).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.dropOnTarget($event, field_r15.name)); });
    i0.ɵɵelementStart(1, "button", 100);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_section_9_section_51_div_3_Template_button_click_1_listener() { const field_r15 = i0.ɵɵrestoreView(_r14).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.selectTargetField(field_r15.name)); })("mouseenter", function VisualMappingPageComponent_section_9_section_51_div_3_Template_button_mouseenter_1_listener() { const field_r15 = i0.ɵɵrestoreView(_r14).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.setHoveredTargetField(field_r15.name)); })("mouseleave", function VisualMappingPageComponent_section_9_section_51_div_3_Template_button_mouseleave_1_listener() { i0.ɵɵrestoreView(_r14); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.clearHoveredMapping()); })("dragenter", function VisualMappingPageComponent_section_9_section_51_div_3_Template_button_dragenter_1_listener($event) { const field_r15 = i0.ɵɵrestoreView(_r14).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.enterTargetDropZone($event, field_r15.name)); })("dragover", function VisualMappingPageComponent_section_9_section_51_div_3_Template_button_dragover_1_listener($event) { const field_r15 = i0.ɵɵrestoreView(_r14).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.enterTargetDropZone($event, field_r15.name)); })("drop", function VisualMappingPageComponent_section_9_section_51_div_3_Template_button_drop_1_listener($event) { const field_r15 = i0.ɵɵrestoreView(_r14).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.dropOnTarget($event, field_r15.name)); });
    i0.ɵɵelementStart(2, "span", 101);
    i0.ɵɵlistener("dragenter", function VisualMappingPageComponent_section_9_section_51_div_3_Template_span_dragenter_2_listener($event) { const field_r15 = i0.ɵɵrestoreView(_r14).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.enterTargetDropZone($event, field_r15.name)); })("dragover", function VisualMappingPageComponent_section_9_section_51_div_3_Template_span_dragover_2_listener($event) { const field_r15 = i0.ɵɵrestoreView(_r14).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.enterTargetDropZone($event, field_r15.name)); })("drop", function VisualMappingPageComponent_section_9_section_51_div_3_Template_span_drop_2_listener($event) { const field_r15 = i0.ɵɵrestoreView(_r14).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.dropOnTarget($event, field_r15.name)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 92)(4, "span", 93);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span", 102)(7, "span", 103);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 104);
    i0.ɵɵtext(10, "required");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(11, VisualMappingPageComponent_section_9_section_51_div_3_div_11_Template, 9, 3, "div", 105);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const field_r15 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("target-drop-zone--active", ctx_r0.dragTargetField === field_r15.name)("target-drop-zone--pending", ctx_r0.isPendingTarget(field_r15.name));
    i0.ɵɵattribute("data-field-name", field_r15.name);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("canvas-node--selected", ctx_r0.selectedTargetField === field_r15.name)("canvas-node--mapped", ctx_r0.isTargetMapped(field_r15.name))("canvas-node--required-missing", ctx_r0.isRequiredTargetUnmapped(field_r15.name));
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-field-name", field_r15.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.getCanvasFieldName(field_r15));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(field_r15.type);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r0.isPendingTarget(field_r15.name) && ctx_r0.pendingConnection);
} }
function VisualMappingPageComponent_section_9_section_51_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 96);
    i0.ɵɵlistener("dragover", function VisualMappingPageComponent_section_9_section_51_Template_section_dragover_0_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.allowDragOverGap($event)); });
    i0.ɵɵelementStart(1, "div", 97);
    i0.ɵɵtext(2, "Zorunlu");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, VisualMappingPageComponent_section_9_section_51_div_3_Template, 12, 15, "div", 98);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r0.requiredTargetFields)("ngForTrackBy", ctx_r0.trackByFieldName);
} }
function VisualMappingPageComponent_section_9_section_52_div_3_div_9_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 110);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_section_9_section_52_div_3_div_9_button_6_Template_button_click_0_listener() { const transform_r25 = i0.ɵɵrestoreView(_r24).$implicit; const ctx_r0 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r0.choosePendingTransform(transform_r25)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const transform_r25 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(5);
    i0.ɵɵclassProp("drop-transform-palette__option--active", ctx_r0.selectedTransformType === transform_r25);
    i0.ɵɵproperty("disabled", !ctx_r0.canUsePendingTransform(transform_r25));
    i0.ɵɵattribute("title", ctx_r0.getPendingTransformTitle(transform_r25));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", transform_r25, " ");
} }
function VisualMappingPageComponent_section_9_section_52_div_3_div_9_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 106)(1, "div", 107)(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, VisualMappingPageComponent_section_9_section_52_div_3_div_9_button_6_Template, 2, 5, "button", 108);
    i0.ɵɵelementStart(7, "button", 109);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_section_9_section_52_div_3_div_9_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r23); const ctx_r0 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r0.cancelPendingConnection()); });
    i0.ɵɵtext(8, " Vazge\u00E7 ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const pending_r26 = ctx.ngIf;
    const ctx_r0 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.getSourceLabelByName(pending_r26.sourceField));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.getTargetLabelByName(pending_r26.targetField));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.transformOptions);
} }
function VisualMappingPageComponent_section_9_section_52_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 99);
    i0.ɵɵlistener("dragenter", function VisualMappingPageComponent_section_9_section_52_div_3_Template_div_dragenter_0_listener($event) { const field_r22 = i0.ɵɵrestoreView(_r21).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.enterTargetDropZone($event, field_r22.name)); })("dragover", function VisualMappingPageComponent_section_9_section_52_div_3_Template_div_dragover_0_listener($event) { const field_r22 = i0.ɵɵrestoreView(_r21).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.enterTargetDropZone($event, field_r22.name)); })("dragleave", function VisualMappingPageComponent_section_9_section_52_div_3_Template_div_dragleave_0_listener($event) { const field_r22 = i0.ɵɵrestoreView(_r21).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.leaveTargetDropZone($event, field_r22.name)); })("drop", function VisualMappingPageComponent_section_9_section_52_div_3_Template_div_drop_0_listener($event) { const field_r22 = i0.ɵɵrestoreView(_r21).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.dropOnTarget($event, field_r22.name)); });
    i0.ɵɵelementStart(1, "button", 112);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_section_9_section_52_div_3_Template_button_click_1_listener() { const field_r22 = i0.ɵɵrestoreView(_r21).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.selectTargetField(field_r22.name)); })("mouseenter", function VisualMappingPageComponent_section_9_section_52_div_3_Template_button_mouseenter_1_listener() { const field_r22 = i0.ɵɵrestoreView(_r21).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.setHoveredTargetField(field_r22.name)); })("mouseleave", function VisualMappingPageComponent_section_9_section_52_div_3_Template_button_mouseleave_1_listener() { i0.ɵɵrestoreView(_r21); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.clearHoveredMapping()); })("dragenter", function VisualMappingPageComponent_section_9_section_52_div_3_Template_button_dragenter_1_listener($event) { const field_r22 = i0.ɵɵrestoreView(_r21).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.enterTargetDropZone($event, field_r22.name)); })("dragover", function VisualMappingPageComponent_section_9_section_52_div_3_Template_button_dragover_1_listener($event) { const field_r22 = i0.ɵɵrestoreView(_r21).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.enterTargetDropZone($event, field_r22.name)); })("drop", function VisualMappingPageComponent_section_9_section_52_div_3_Template_button_drop_1_listener($event) { const field_r22 = i0.ɵɵrestoreView(_r21).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.dropOnTarget($event, field_r22.name)); });
    i0.ɵɵelementStart(2, "span", 101);
    i0.ɵɵlistener("dragenter", function VisualMappingPageComponent_section_9_section_52_div_3_Template_span_dragenter_2_listener($event) { const field_r22 = i0.ɵɵrestoreView(_r21).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.enterTargetDropZone($event, field_r22.name)); })("dragover", function VisualMappingPageComponent_section_9_section_52_div_3_Template_span_dragover_2_listener($event) { const field_r22 = i0.ɵɵrestoreView(_r21).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.enterTargetDropZone($event, field_r22.name)); })("drop", function VisualMappingPageComponent_section_9_section_52_div_3_Template_span_drop_2_listener($event) { const field_r22 = i0.ɵɵrestoreView(_r21).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.dropOnTarget($event, field_r22.name)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 92)(4, "span", 93);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span", 102)(7, "span", 103);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(9, VisualMappingPageComponent_section_9_section_52_div_3_div_9_Template, 9, 3, "div", 105);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const field_r22 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("target-drop-zone--active", ctx_r0.dragTargetField === field_r22.name)("target-drop-zone--pending", ctx_r0.isPendingTarget(field_r22.name));
    i0.ɵɵattribute("data-field-name", field_r22.name);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("canvas-node--selected", ctx_r0.selectedTargetField === field_r22.name)("canvas-node--mapped", ctx_r0.isTargetMapped(field_r22.name));
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-field-name", field_r22.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.getCanvasFieldName(field_r22));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(field_r22.type);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.isPendingTarget(field_r22.name) && ctx_r0.pendingConnection);
} }
function VisualMappingPageComponent_section_9_section_52_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 96);
    i0.ɵɵlistener("dragover", function VisualMappingPageComponent_section_9_section_52_Template_section_dragover_0_listener($event) { i0.ɵɵrestoreView(_r20); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.allowDragOverGap($event)); });
    i0.ɵɵelementStart(1, "div", 111);
    i0.ɵɵtext(2, "Di\u011Fer");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, VisualMappingPageComponent_section_9_section_52_div_3_Template, 10, 13, "div", 98);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r0.optionalTargetFields)("ngForTrackBy", ctx_r0.trackByFieldName);
} }
function VisualMappingPageComponent_section_9_p_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 113);
    i0.ɵɵtext(1, " \u0130lk e\u015Fle\u015Ftirmeyi olu\u015Fturmak i\u00E7in kaynak alan\u0131 hedef alan\u0131n \u00FCzerine b\u0131rak\u0131n ve ba\u011Flama t\u00FCr\u00FCn\u00FC se\u00E7in. ");
    i0.ɵɵelementEnd();
} }
function VisualMappingPageComponent_section_9_div_60_Template(rf, ctx) { if (rf & 1) {
    const _r27 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 114);
    i0.ɵɵlistener("mouseenter", function VisualMappingPageComponent_section_9_div_60_Template_div_mouseenter_0_listener() { const mappingDefinition_r28 = i0.ɵɵrestoreView(_r27).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.setHoveredMapping(mappingDefinition_r28.targetField)); })("mouseleave", function VisualMappingPageComponent_section_9_div_60_Template_div_mouseleave_0_listener() { i0.ɵɵrestoreView(_r27); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.clearHoveredMapping()); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 115);
    i0.ɵɵtext(4, "\u2192");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 116);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 117);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_section_9_div_60_Template_button_click_9_listener() { const mappingDefinition_r28 = i0.ɵɵrestoreView(_r27).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.removeMapping(mappingDefinition_r28.targetField)); });
    i0.ɵɵtext(10, "Sil");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const mappingDefinition_r28 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("mapping-row--highlighted", ctx_r0.isMappingHighlighted(mappingDefinition_r28.targetField));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.getMappingSourceLabel(mappingDefinition_r28));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.getTargetLabelByName(mappingDefinition_r28.targetField));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(mappingDefinition_r28.transformType);
} }
function VisualMappingPageComponent_section_9_section_73_button_6_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 123);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mappingDefinition_r31 = ctx.ngIf;
    const ctx_r0 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getMappingSourceLabel(mappingDefinition_r31), " ");
} }
function VisualMappingPageComponent_section_9_section_73_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r29 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 121);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_section_9_section_73_button_6_Template_button_click_0_listener() { const field_r30 = i0.ɵɵrestoreView(_r29).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.selectTargetField(field_r30.name)); })("dragenter", function VisualMappingPageComponent_section_9_section_73_button_6_Template_button_dragenter_0_listener($event) { const field_r30 = i0.ɵɵrestoreView(_r29).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.enterTargetDropZone($event, field_r30.name)); })("dragover", function VisualMappingPageComponent_section_9_section_73_button_6_Template_button_dragover_0_listener($event) { const field_r30 = i0.ɵɵrestoreView(_r29).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.enterTargetDropZone($event, field_r30.name)); })("dragleave", function VisualMappingPageComponent_section_9_section_73_button_6_Template_button_dragleave_0_listener($event) { const field_r30 = i0.ɵɵrestoreView(_r29).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.leaveTargetDropZone($event, field_r30.name)); })("drop", function VisualMappingPageComponent_section_9_section_73_button_6_Template_button_drop_0_listener($event) { const field_r30 = i0.ɵɵrestoreView(_r29).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.dropOnTarget($event, field_r30.name)); });
    i0.ɵɵelementStart(1, "span", 70);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 71);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, VisualMappingPageComponent_section_9_section_73_button_6_span_5_Template, 2, 1, "span", 122);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const field_r30 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("schema-field--selected", ctx_r0.selectedTargetField === field_r30.name)("schema-field--mapped", ctx_r0.isTargetMapped(field_r30.name))("schema-field--required-missing", ctx_r0.isRequiredTargetUnmapped(field_r30.name));
    i0.ɵɵattribute("data-field-name", field_r30.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.getTargetFieldLabel(field_r30));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", field_r30.type, " \u00B7 zorunlu");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.getMappingForTarget(field_r30.name));
} }
function VisualMappingPageComponent_section_9_section_73_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 118)(1, "div", 119)(2, "span");
    i0.ɵɵtext(3, "Zorunlu Alanlar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, VisualMappingPageComponent_section_9_section_73_button_6_Template, 6, 10, "button", 120);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.requiredTargetFields.length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.requiredTargetFields)("ngForTrackBy", ctx_r0.trackByFieldName);
} }
function VisualMappingPageComponent_section_9_section_74_button_6_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 123);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mappingDefinition_r34 = ctx.ngIf;
    const ctx_r0 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getMappingSourceLabel(mappingDefinition_r34), " ");
} }
function VisualMappingPageComponent_section_9_section_74_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r32 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 126);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_section_9_section_74_button_6_Template_button_click_0_listener() { const field_r33 = i0.ɵɵrestoreView(_r32).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.selectTargetField(field_r33.name)); })("dragenter", function VisualMappingPageComponent_section_9_section_74_button_6_Template_button_dragenter_0_listener($event) { const field_r33 = i0.ɵɵrestoreView(_r32).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.enterTargetDropZone($event, field_r33.name)); })("dragover", function VisualMappingPageComponent_section_9_section_74_button_6_Template_button_dragover_0_listener($event) { const field_r33 = i0.ɵɵrestoreView(_r32).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.enterTargetDropZone($event, field_r33.name)); })("dragleave", function VisualMappingPageComponent_section_9_section_74_button_6_Template_button_dragleave_0_listener($event) { const field_r33 = i0.ɵɵrestoreView(_r32).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.leaveTargetDropZone($event, field_r33.name)); })("drop", function VisualMappingPageComponent_section_9_section_74_button_6_Template_button_drop_0_listener($event) { const field_r33 = i0.ɵɵrestoreView(_r32).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.dropOnTarget($event, field_r33.name)); });
    i0.ɵɵelementStart(1, "span", 70);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 71);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, VisualMappingPageComponent_section_9_section_74_button_6_span_5_Template, 2, 1, "span", 122);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const field_r33 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("schema-field--selected", ctx_r0.selectedTargetField === field_r33.name)("schema-field--mapped", ctx_r0.isTargetMapped(field_r33.name));
    i0.ɵɵattribute("data-field-name", field_r33.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.getTargetFieldLabel(field_r33));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(field_r33.type);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.getMappingForTarget(field_r33.name));
} }
function VisualMappingPageComponent_section_9_section_74_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 118)(1, "div", 124)(2, "span");
    i0.ɵɵtext(3, "Di\u011Fer Alanlar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, VisualMappingPageComponent_section_9_section_74_button_6_Template, 6, 8, "button", 125);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.optionalTargetFields.length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.optionalTargetFields)("ngForTrackBy", ctx_r0.trackByFieldName);
} }
function VisualMappingPageComponent_section_9_div_83_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 127)(1, "dl", 128)(2, "div")(3, "dt");
    i0.ɵɵtext(4, "Selected source");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "dd");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div")(8, "dt");
    i0.ɵɵtext(9, "Selected target");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "dd");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div")(13, "dt");
    i0.ɵɵtext(14, "Transform");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "dd");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r0.selectedSourceFieldDetails ? ctx_r0.getSourceFieldLabel(ctx_r0.selectedSourceFieldDetails) : "Se\u00E7ilmedi");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.selectedTargetFieldDetails ? ctx_r0.getTargetFieldLabel(ctx_r0.selectedTargetFieldDetails) : "Se\u00E7ilmedi");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.selectedTransformType);
} }
function VisualMappingPageComponent_section_9_div_84_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 127)(1, "p");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r0.mappedTargetCount, " hedef alan e\u015Fle\u015Fti. Toplam ", ctx_r0.mappingDefinitions.length, " ba\u011Flant\u0131 var.");
} }
function VisualMappingPageComponent_section_9_div_85_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 113);
    i0.ɵɵtext(1, "Uyar\u0131 yok.");
    i0.ɵɵelementEnd();
} }
function VisualMappingPageComponent_section_9_div_85_ul_2_li_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const warning_r35 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(warning_r35);
} }
function VisualMappingPageComponent_section_9_div_85_ul_2_li_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const warning_r36 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(warning_r36);
} }
function VisualMappingPageComponent_section_9_div_85_ul_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 130);
    i0.ɵɵtemplate(1, VisualMappingPageComponent_section_9_div_85_ul_2_li_1_Template, 2, 1, "li", 44)(2, VisualMappingPageComponent_section_9_div_85_ul_2_li_2_Template, 2, 1, "li", 44);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.warnings);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.mappingValidationWarnings);
} }
function VisualMappingPageComponent_section_9_div_85_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 127);
    i0.ɵɵtemplate(1, VisualMappingPageComponent_section_9_div_85_p_1_Template, 2, 0, "p", 53)(2, VisualMappingPageComponent_section_9_div_85_ul_2_Template, 3, 2, "ul", 129);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.warnings.length === 0 && ctx_r0.mappingValidationWarnings.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.warnings.length > 0 || ctx_r0.mappingValidationWarnings.length > 0);
} }
function VisualMappingPageComponent_section_9_p_87_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 131);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.successMessage);
} }
function VisualMappingPageComponent_section_9_p_88_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.saveError);
} }
function VisualMappingPageComponent_section_9_button_93_Template(rf, ctx) { if (rf & 1) {
    const _r37 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 132);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_section_9_button_93_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r37); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.markAsTemplate()); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r0.mappingDefinitions.length === 0 || ctx_r0.isSaving || ctx_r0.isMarkingTemplate);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.isMarkingTemplate ? "\u015Eablon Kaydediliyor..." : "\u015Eablon Olarak Kaydet", " ");
} }
function VisualMappingPageComponent_section_9_span_94_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 133);
    i0.ɵɵtext(1, "\u015Eablon");
    i0.ɵɵelementEnd();
} }
function VisualMappingPageComponent_section_9_span_96_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Kaydet");
    i0.ɵɵelementEnd();
} }
function VisualMappingPageComponent_section_9_span_97_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Kaydediliyor...");
    i0.ɵɵelementEnd();
} }
function VisualMappingPageComponent_section_9_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 17)(1, "div", 18)(2, "aside", 19)(3, "header", 20)(4, "div")(5, "p", 21);
    i0.ɵɵtext(6, "Source specification");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "h2");
    i0.ɵɵtext(8, "Kaynak Alanlar");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "span", 22);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "p", 23);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 24);
    i0.ɵɵtemplate(14, VisualMappingPageComponent_section_9_button_14_Template, 7, 6, "button", 25)(15, VisualMappingPageComponent_section_9_section_15_Template, 12, 4, "section", 26);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "section", 27)(17, "header", 28)(18, "div")(19, "p", 21);
    i0.ɵɵtext(20, "Mapping surface");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "h2");
    i0.ɵɵtext(22, "Mapping Canvas");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(23, "div", 29)(24, "span");
    i0.ɵɵtext(25, "Kaynak alan\u0131n sa\u011F\u0131ndaki ba\u011Flant\u0131 noktas\u0131ndan hedef alan\u0131n solundaki noktaya ok \u00E7ekin.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "button", 30);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_section_9_Template_button_click_26_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.autoMatchFields()); });
    i0.ɵɵtext(27, "Otomatik E\u015Fle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "button", 31);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_section_9_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.aiMatchFields()); });
    i0.ɵɵtemplate(29, VisualMappingPageComponent_section_9_span_29_Template, 2, 0, "span", 32)(30, VisualMappingPageComponent_section_9_span_30_Template, 2, 0, "span", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(31, VisualMappingPageComponent_section_9_button_31_Template, 2, 0, "button", 33)(32, VisualMappingPageComponent_section_9_span_32_Template, 2, 1, "span", 32)(33, VisualMappingPageComponent_section_9_span_33_Template, 2, 2, "span", 32)(34, VisualMappingPageComponent_section_9_span_34_Template, 2, 1, "span", 34)(35, VisualMappingPageComponent_section_9_span_35_Template, 2, 1, "span", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "div", 36);
    i0.ɵɵlistener("dragover", function VisualMappingPageComponent_section_9_Template_div_dragover_36_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.allowDragOverGap($event)); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(37, "svg", 37)(38, "defs")(39, "marker", 38);
    i0.ɵɵelement(40, "path", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "marker", 40);
    i0.ɵɵelement(42, "path", 41);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "marker", 42);
    i0.ɵɵelement(44, "path", 43);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(45, VisualMappingPageComponent_section_9__svg_ng_container_45_Template, 6, 7, "ng-container", 44)(46, VisualMappingPageComponent_section_9__svg_line_46_Template, 1, 4, "line", 45)(47, VisualMappingPageComponent_section_9__svg_circle_47_Template, 1, 2, "circle", 46);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(48, "div", 47);
    i0.ɵɵtemplate(49, VisualMappingPageComponent_section_9_button_49_Template, 7, 6, "button", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "div", 49);
    i0.ɵɵlistener("dragover", function VisualMappingPageComponent_section_9_Template_div_dragover_50_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.allowDragOverGap($event)); })("drop", function VisualMappingPageComponent_section_9_Template_div_drop_50_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.dropOnNearestTarget($event)); });
    i0.ɵɵtemplate(51, VisualMappingPageComponent_section_9_section_51_Template, 4, 2, "section", 50)(52, VisualMappingPageComponent_section_9_section_52_Template, 4, 2, "section", 50);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(53, "section", 51)(54, "div", 52)(55, "h3");
    i0.ɵɵtext(56, "Ba\u011Flant\u0131lar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "span");
    i0.ɵɵtext(58);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(59, VisualMappingPageComponent_section_9_p_59_Template, 2, 0, "p", 53)(60, VisualMappingPageComponent_section_9_div_60_Template, 11, 5, "div", 54);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(61, "aside", 19)(62, "header", 20)(63, "div")(64, "p", 21);
    i0.ɵɵtext(65, "Destination specification");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(66, "h2");
    i0.ɵɵtext(67, "Hedef Alanlar");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(68, "span", 22);
    i0.ɵɵtext(69);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(70, "p", 23);
    i0.ɵɵtext(71);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(72, "div", 24);
    i0.ɵɵtemplate(73, VisualMappingPageComponent_section_9_section_73_Template, 7, 3, "section", 55)(74, VisualMappingPageComponent_section_9_section_74_Template, 7, 3, "section", 55);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(75, "section", 56)(76, "div", 57)(77, "button", 58);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_section_9_Template_button_click_77_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.setActiveBottomTab("properties")); });
    i0.ɵɵtext(78, " Properties ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(79, "button", 58);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_section_9_Template_button_click_79_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.setActiveBottomTab("output")); });
    i0.ɵɵtext(80, " Output ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(81, "button", 58);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_section_9_Template_button_click_81_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.setActiveBottomTab("warnings")); });
    i0.ɵɵtext(82, " Warnings ");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(83, VisualMappingPageComponent_section_9_div_83_Template, 17, 3, "div", 59)(84, VisualMappingPageComponent_section_9_div_84_Template, 3, 2, "div", 59)(85, VisualMappingPageComponent_section_9_div_85_Template, 3, 2, "div", 59);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(86, "div", 60);
    i0.ɵɵtemplate(87, VisualMappingPageComponent_section_9_p_87_Template, 2, 1, "p", 61)(88, VisualMappingPageComponent_section_9_p_88_Template, 2, 1, "p", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(89, "div", 62)(90, "button", 63);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_section_9_Template_button_click_90_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.goBack()); });
    i0.ɵɵtext(91, "Geri");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(92, "div", 64);
    i0.ɵɵtemplate(93, VisualMappingPageComponent_section_9_button_93_Template, 2, 2, "button", 65)(94, VisualMappingPageComponent_section_9_span_94_Template, 2, 0, "span", 66);
    i0.ɵɵelementStart(95, "button", 67);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_section_9_Template_button_click_95_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.saveMappings()); });
    i0.ɵɵtemplate(96, VisualMappingPageComponent_section_9_span_96_Template, 2, 0, "span", 32)(97, VisualMappingPageComponent_section_9_span_97_Template, 2, 0, "span", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(98, "button", 68);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_section_9_Template_button_click_98_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.continueNext()); });
    i0.ɵɵtext(99, "Devam Et");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(ctx_r0.sourceFields.length);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.mapping.sourceSchema == null ? null : ctx_r0.mapping.sourceSchema.sourceName);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r0.sourceFields)("ngForTrackBy", ctx_r0.trackByFieldName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.pendingFixedWidthTargetFields.length > 0);
    i0.ɵɵadvance(13);
    i0.ɵɵproperty("disabled", ctx_r0.isAiMatching || ctx_r0.sourceFields.length === 0 || ctx_r0.targetFields.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.isAiMatching);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.isAiMatching);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.mappingDefinitions.length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.draggedSourceField);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.pendingConnection);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.autoMatchMessage);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.aiMatchMessage);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("min-height", ctx_r0.canvasHeight, "px");
    i0.ɵɵadvance();
    i0.ɵɵattribute("viewBox", "0 0 1000 " + ctx_r0.canvasHeight);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngForOf", ctx_r0.mappingDefinitions);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.draggedSourceField);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.draggedSourceField);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r0.sourceFields)("ngForTrackBy", ctx_r0.trackByFieldName);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.requiredTargetFields.length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.optionalTargetFields.length > 0);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", ctx_r0.mappingDefinitions.length, " mapping");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.mappingDefinitions.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.mappingDefinitions);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r0.targetFields.length);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.mapping.targetSchema == null ? null : ctx_r0.mapping.targetSchema.targetName);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.requiredTargetFields.length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.optionalTargetFields.length > 0);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("tab-button--active", ctx_r0.activeBottomTab === "properties");
    i0.ɵɵattribute("aria-selected", ctx_r0.activeBottomTab === "properties");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("tab-button--active", ctx_r0.activeBottomTab === "output");
    i0.ɵɵattribute("aria-selected", ctx_r0.activeBottomTab === "output");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("tab-button--active", ctx_r0.activeBottomTab === "warnings");
    i0.ɵɵattribute("aria-selected", ctx_r0.activeBottomTab === "warnings");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.activeBottomTab === "properties");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.activeBottomTab === "output");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.activeBottomTab === "warnings");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.successMessage);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.saveError);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isSaving);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r0.mapping && !ctx_r0.mapping.sourceTemplateId && !ctx_r0.mapping.isTemplate);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.mapping == null ? null : ctx_r0.mapping.isTemplate);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r0.canSubmitMappings);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.isSaving);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.isSaving);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r0.canSubmitMappings);
} }
function VisualMappingPageComponent_div_10_div_24_option_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 147);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r41 = ctx.$implicit;
    i0.ɵɵproperty("value", type_r41);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(type_r41);
} }
function VisualMappingPageComponent_div_10_div_24_Template(rf, ctx) { if (rf & 1) {
    const _r39 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 142)(1, "input", 143);
    i0.ɵɵlistener("input", function VisualMappingPageComponent_div_10_div_24_Template_input_input_1_listener($event) { const index_r40 = i0.ɵɵrestoreView(_r39).index; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.updateFixedWidthPosition(index_r40, "name", $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "input", 143);
    i0.ɵɵlistener("input", function VisualMappingPageComponent_div_10_div_24_Template_input_input_2_listener($event) { const index_r40 = i0.ɵɵrestoreView(_r39).index; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.updateFixedWidthPosition(index_r40, "displayName", $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "select", 144);
    i0.ɵɵlistener("change", function VisualMappingPageComponent_div_10_div_24_Template_select_change_3_listener($event) { const index_r40 = i0.ɵɵrestoreView(_r39).index; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.updateFixedWidthPosition(index_r40, "type", $event)); });
    i0.ɵɵtemplate(4, VisualMappingPageComponent_div_10_div_24_option_4_Template, 2, 2, "option", 145);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "input", 146);
    i0.ɵɵlistener("input", function VisualMappingPageComponent_div_10_div_24_Template_input_input_5_listener($event) { const index_r40 = i0.ɵɵrestoreView(_r39).index; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.updateFixedWidthPosition(index_r40, "startPosition", $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "input", 146);
    i0.ɵɵlistener("input", function VisualMappingPageComponent_div_10_div_24_Template_input_input_6_listener($event) { const index_r40 = i0.ɵɵrestoreView(_r39).index; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.updateFixedWidthPosition(index_r40, "endPosition", $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "output");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r42 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("fixed-width-grid__row--required-missing", ctx_r0.isFixedWidthRequiredMissing(row_r42));
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", row_r42.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", row_r42.displayName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", row_r42.type);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(9, _c0));
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", row_r42.startPosition ?? "");
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", row_r42.endPosition ?? "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.getFixedWidthLength(row_r42));
} }
function VisualMappingPageComponent_div_10_ul_25_li_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const error_r43 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(error_r43);
} }
function VisualMappingPageComponent_div_10_ul_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 130);
    i0.ɵɵtemplate(1, VisualMappingPageComponent_div_10_ul_25_li_1_Template, 2, 1, "li", 44);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.fixedWidthPositionErrors);
} }
function VisualMappingPageComponent_div_10_span_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Kaynaklar\u0131 Olu\u015Ftur");
    i0.ɵɵelementEnd();
} }
function VisualMappingPageComponent_div_10_span_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Kaydediliyor...");
    i0.ɵɵelementEnd();
} }
function VisualMappingPageComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r38 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 134)(1, "section", 135)(2, "div", 136)(3, "div")(4, "h2", 137);
    i0.ɵɵtext(5, "Sabit Geni\u015Flik Pozisyonlar\u0131");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "Kaynak alanlar\u0131 olu\u015Fturmak i\u00E7in 1-based ba\u015Flang\u0131\u00E7 ve biti\u015F pozisyonlar\u0131n\u0131 girin.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "span");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 138)(11, "div", 139)(12, "span");
    i0.ɵɵtext(13, "Alan");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15, "G\u00F6r\u00FCnen Ad");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span");
    i0.ɵɵtext(17, "Tip");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span");
    i0.ɵɵtext(19, "Ba\u015Flang\u0131\u00E7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21, "Biti\u015F");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "span");
    i0.ɵɵtext(23, "Uzunluk");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(24, VisualMappingPageComponent_div_10_div_24_Template, 9, 10, "div", 140);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(25, VisualMappingPageComponent_div_10_ul_25_Template, 2, 1, "ul", 129);
    i0.ɵɵelementStart(26, "div", 141)(27, "button", 63);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_div_10_Template_button_click_27_listener() { i0.ɵɵrestoreView(_r38); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeFixedWidthPositionModal()); });
    i0.ɵɵtext(28, " Sonra Tan\u0131mla ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "button", 68);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_div_10_Template_button_click_29_listener() { i0.ɵɵrestoreView(_r38); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.saveFixedWidthPositions()); });
    i0.ɵɵtemplate(30, VisualMappingPageComponent_div_10_span_30_Template, 2, 0, "span", 32)(31, VisualMappingPageComponent_div_10_span_31_Template, 2, 0, "span", 32);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1("", ctx_r0.fixedWidthRawRecords.length, " sat\u0131r");
    i0.ɵɵadvance(15);
    i0.ɵɵproperty("ngForOf", ctx_r0.fixedWidthPositionRows);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.fixedWidthPositionErrors.length > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isSavingFixedWidthPositions);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r0.canSaveFixedWidthPositions);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.isSavingFixedWidthPositions);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.isSavingFixedWidthPositions);
} }
function VisualMappingPageComponent_div_11_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r45 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 132);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_div_11_button_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r45); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.saveIncompleteAsTemplate()); });
    i0.ɵɵtext(1, " Eksik Haliyle \u015Eablon Kaydet ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r0.isSaving || ctx_r0.isMarkingTemplate);
} }
function VisualMappingPageComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r44 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 148);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_div_11_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r44); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeRequiredFieldsPopup()); });
    i0.ɵɵelementStart(1, "section", 149);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_div_11_Template_section_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "h2", 150);
    i0.ɵɵtext(3, "Zorunlu Alanlar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 141)(7, "button", 151);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_div_11_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r44); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeRequiredFieldsPopup()); });
    i0.ɵɵtext(8, "Geri D\u00F6n ve D\u00FCzenle");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, VisualMappingPageComponent_div_11_button_9_Template, 2, 1, "button", 65);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.requiredFieldsPopupMessage);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r0.isTemplateSavePending);
} }
function VisualMappingPageComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    const _r46 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 148);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_div_12_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r46); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeClearMappingsPopup()); });
    i0.ɵɵelementStart(1, "section", 152);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_div_12_Template_section_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "h2", 153);
    i0.ɵɵtext(3, "E\u015Fle\u015Ftirmeleri Sil");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 141)(7, "button", 151);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_div_12_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r46); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeClearMappingsPopup()); });
    i0.ɵɵtext(8, "Vazge\u00E7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 154);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_div_12_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r46); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.confirmClearMappings()); });
    i0.ɵɵtext(10, "T\u00FCm\u00FCn\u00FC Sil");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.clearMappingsPopupMessage);
} }
function VisualMappingPageComponent_div_13_li_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const warning_r48 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(warning_r48);
} }
function VisualMappingPageComponent_div_13_span_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.isTemplateSavePending ? "Uyar\u0131lara Ra\u011Fmen \u015Eablon Kaydet" : "Yine de Devam Et", " ");
} }
function VisualMappingPageComponent_div_13_span_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Kaydediliyor...");
    i0.ɵɵelementEnd();
} }
function VisualMappingPageComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    const _r47 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 148);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_div_13_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r47); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeMappingValidationWarnings()); });
    i0.ɵɵelementStart(1, "section", 155);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_div_13_Template_section_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "h2", 156);
    i0.ɵɵtext(3, "E\u015Fleme Uyar\u0131lar\u0131");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Bu e\u015Flemeler hatal\u0131 olmayabilir ama kontrol edilmesi iyi olur.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "ul", 130);
    i0.ɵɵtemplate(7, VisualMappingPageComponent_div_13_li_7_Template, 2, 1, "li", 44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 141)(9, "button", 151);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_div_13_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r47); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeMappingValidationWarnings()); });
    i0.ɵɵtext(10, "Geri D\u00F6n ve D\u00FCzenle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "button", 68);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_div_13_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r47); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.continueDespiteMappingWarnings()); });
    i0.ɵɵtemplate(12, VisualMappingPageComponent_div_13_span_12_Template, 2, 1, "span", 32)(13, VisualMappingPageComponent_div_13_span_13_Template, 2, 0, "span", 32);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngForOf", ctx_r0.mappingValidationWarnings);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r0.isSaving);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.isSaving);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.isSaving);
} }
function VisualMappingPageComponent_div_14_p_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.saveError);
} }
function VisualMappingPageComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    const _r49 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 134)(1, "section", 157)(2, "h2", 158);
    i0.ɵɵtext(3, "Kaydedilmemi\u015F e\u015Fle\u015Ftirmeler var");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "\u00C7\u0131kmadan \u00F6nce e\u015Fle\u015Ftirmelerinizi kaydetmek ister misiniz?");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, VisualMappingPageComponent_div_14_p_6_Template, 2, 1, "p", 7);
    i0.ɵɵelementStart(7, "div", 141)(8, "button", 68);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_div_14_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r49); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.saveMappingsAndLeave()); });
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "button", 159);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_div_14_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r49); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.discardMappingChangesAndLeave()); });
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "button", 63);
    i0.ɵɵlistener("click", function VisualMappingPageComponent_div_14_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r49); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.stayOnMappingPage()); });
    i0.ɵɵtext(13, "Sayfada Kal");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r0.saveError);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isSaving || ctx_r0.isDiscarding);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.isSaving ? "Kaydediliyor..." : "Kaydet ve \u00C7\u0131k", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.isSaving || ctx_r0.isDiscarding);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.isDiscarding ? "Siliniyor..." : "Kaydetmeden \u00C7\u0131k", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.isSaving || ctx_r0.isDiscarding);
} }
export class VisualMappingPageComponent {
    constructor() {
        this.hostElement = inject(ElementRef);
        this.route = inject(ActivatedRoute);
        this.router = inject(Router);
        this.mappingApi = inject(MappingApiService);
        this.changeDetector = inject(ChangeDetectorRef);
        this.sourcePortX = 204;
        this.targetPortX = 786;
        this.sourceFirstPortY = 93;
        this.sourcePortStepY = 72;
        this.targetFirstPortY = 119;
        this.targetPortStepY = 66;
        this.targetOptionalFirstPortY = 151;
        this.transformOptions = [
            'direct',
            'concat',
            'constant',
            'dateFormat',
            'uppercase',
            'lowercase',
            'trim'
        ];
        this.mappingId = '';
        this.mappingDefinitions = [];
        this.selectedSourceField = '';
        this.selectedTargetField = '';
        this.selectedTransformType = 'direct';
        this.draggedSourceField = '';
        this.dragTargetField = '';
        this.dragPreviewX = this.sourcePortX;
        this.dragPreviewY = 0;
        this.activeBottomTab = 'properties';
        this.isLoading = true;
        this.isSaving = false;
        this.isMarkingTemplate = false;
        this.loadError = '';
        this.saveError = '';
        this.successMessage = '';
        this.requiredFieldsPopupMessage = '';
        this.autoMatchMessage = '';
        this.aiMatchMessage = '';
        this.clearMappingsPopupMessage = '';
        this.mappingValidationWarnings = [];
        this.isAiMatching = false;
        this.showFixedWidthPositionModal = false;
        this.fixedWidthPositionRows = [];
        this.fixedWidthPositionErrors = [];
        this.isSavingFixedWidthPositions = false;
        this.isExitDialogOpen = false;
        this.isDiscarding = false;
        this.hoveredMappingTargetFields = [];
        this.savedMappingsSnapshot = '[]';
        this.allowNavigation = false;
        this.isNewMappingSession = false;
        this.isTemplateSavePending = false;
    }
    ngOnInit() {
        const mappingId = this.route.snapshot.paramMap.get('mappingId');
        if (!mappingId) {
            this.isLoading = false;
            this.loadError = 'Mapping id bulunamadı.';
            return;
        }
        this.mappingId = mappingId;
        this.isNewMappingSession = this.route.snapshot.queryParamMap.get('new') === 'true';
        this.loadMapping(mappingId);
    }
    get sourceFields() {
        return this.mapping?.sourceSchema?.fields ?? [];
    }
    get targetFields() {
        return this.mapping?.targetSchema?.fields ?? [];
    }
    get requiredTargetFields() {
        return this.targetFields.filter(field => field.required);
    }
    get optionalTargetFields() {
        return this.targetFields.filter(field => !field.required);
    }
    get orderedTargetFields() {
        return [...this.requiredTargetFields, ...this.optionalTargetFields];
    }
    get canvasHeight() {
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
    get mappedTargetCount() {
        return new Set(this.mappingDefinitions.map(mapping => mapping.targetField)).size;
    }
    get warnings() {
        return this.missingRequiredTargetFields
            .map(field => `${this.getTargetFieldLabel(field)} zorunlu ama henüz eşleşmedi.`);
    }
    get missingRequiredTargetFields() {
        return this.targetFields.filter(field => this.isRequiredTargetUnmapped(field.name));
    }
    get canSubmitMappings() {
        return this.mappingDefinitions.length > 0
            && this.missingRequiredTargetFields.length === 0
            && !this.isSaving;
    }
    get hasUnsavedMappingChanges() {
        return JSON.stringify(this.mappingDefinitions) !== this.savedMappingsSnapshot;
    }
    get fixedWidthRawRecords() {
        return this.mapping?.sourceSchema?.records ?? [];
    }
    get pendingFixedWidthTargetFields() {
        return this.mapping ? this.getPendingFixedWidthTargetFields(this.mapping) : [];
    }
    get requiredPendingFixedWidthTargetFields() {
        return this.pendingFixedWidthTargetFields.filter(field => field.required);
    }
    get canSaveFixedWidthPositions() {
        return !this.isSavingFixedWidthPositions && this.fixedWidthPositionErrors.length === 0;
    }
    get selectedSourceFieldDetails() {
        return this.getSourceField(this.selectedSourceField);
    }
    get selectedTargetFieldDetails() {
        return this.getTargetField(this.selectedTargetField);
    }
    get canConnectSelectedFields() {
        return Boolean(this.selectedSourceField && this.selectedTargetField);
    }
    get dragPreviewEndX() {
        return this.dragTargetField ? this.getTargetPortX(this.dragTargetField) : this.dragPreviewX;
    }
    get dragPreviewEndY() {
        return this.dragTargetField ? this.getTargetLineY(this.dragTargetField) : this.dragPreviewY;
    }
    trackByFieldName(_index, field) {
        return field.name;
    }
    selectSourceField(fieldName) {
        this.selectedSourceField = fieldName;
        this.successMessage = '';
        this.saveError = '';
    }
    selectTargetField(fieldName) {
        this.selectedTargetField = fieldName;
        this.successMessage = '';
        this.saveError = '';
    }
    updateTransformType(event) {
        this.selectedTransformType = event.target.value;
    }
    startSourceDrag(event, fieldName) {
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
    enterTargetDropZone(event, fieldName) {
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
    leaveTargetDropZone(event, fieldName) {
        const nextTargetField = this.resolveTargetFieldAtPoint(event.clientX, event.clientY);
        if (nextTargetField && nextTargetField !== fieldName) {
            this.setActiveDragTarget(nextTargetField);
            return;
        }
        if (!nextTargetField && this.dragTargetField === fieldName) {
            this.dragTargetField = '';
        }
    }
    allowDragOverGap(event) {
        if (!this.draggedSourceField) {
            return;
        }
        event.preventDefault();
        this.updateDragPreview(event);
        const targetField = this.resolveTargetFieldAtPoint(event.clientX, event.clientY);
        if (targetField) {
            this.setActiveDragTarget(targetField);
        }
        else {
            this.dragTargetField = '';
        }
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'copy';
        }
    }
    updateDragPreview(event) {
        if (!this.draggedSourceField) {
            return;
        }
        const canvas = event.target?.closest('.canvas-grid');
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
    dropOnNearestTarget(event) {
        if (event.target?.closest('.target-drop-zone, .schema-target-drop')) {
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
    resolveNearestTargetField(clientY) {
        const rows = Array.from(document.querySelectorAll('.target-drop-zone[data-field-name]'));
        let closestFieldName;
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
    updateDragTransform(transformType) {
        this.selectedTransformType = transformType;
    }
    dropOnTarget(event, targetField) {
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
    endSourceDrag() {
        this.clearDragState();
    }
    connectSelectedFields() {
        this.connectFields(this.selectedSourceField, this.selectedTargetField, this.selectedTransformType);
    }
    autoMatchFields() {
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
    aiMatchFields() {
        this.successMessage = '';
        this.saveError = '';
        this.aiMatchMessage = '';
        if (this.sourceFields.length === 0 || this.targetFields.length === 0) {
            this.aiMatchMessage = 'AI eşleme için kaynak ve hedef alanlar hazır olmalı.';
            return;
        }
        this.isAiMatching = true;
        this.mappingApi.suggestMappingsWithAi({
            patternType: this.mapping?.patternType,
            sourceFields: this.sourceFields.map(field => ({
                name: field.name,
                displayName: field.displayName,
                type: field.type
            })),
            targetFields: this.targetFields.map(field => ({
                name: field.name,
                displayName: field.displayName,
                type: field.type
            }))
        })
            .pipe(finalize(() => {
            this.isAiMatching = false;
            this.changeDetector.detectChanges();
        }))
            .subscribe({
            next: (response) => {
                if (!response.isAvailable) {
                    this.aiMatchMessage = response.message || 'AI şu an kullanılamıyor.';
                    return;
                }
                const appliedCount = this.applyAiSuggestions(response.suggestions ?? []);
                this.aiMatchMessage = appliedCount > 0
                    ? `${appliedCount} alan AI ile eşlendi. İstersen bağlantıları silebilir veya değiştirebilirsin.`
                    : response.message || 'AI uygun yeni eşleme önermedi.';
            },
            error: () => {
                this.aiMatchMessage = 'AI şu an kullanılamıyor.';
            }
        });
    }
    choosePendingTransform(transformType) {
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
    canUsePendingTransform(transformType) {
        if (!this.pendingConnection) {
            return true;
        }
        return !this.getMappingForTarget(this.pendingConnection.targetField) || transformType === 'concat';
    }
    getPendingTransformTitle(transformType) {
        return this.canUsePendingTransform(transformType)
            ? transformType
            : 'Bu hedef alan zaten dolu. Aynı hedefe ek kaynak sadece concat ile bağlanabilir.';
    }
    cancelPendingConnection() {
        this.pendingConnection = undefined;
        this.selectedSourceField = '';
        this.selectedTargetField = '';
        this.successMessage = '';
        this.saveError = '';
    }
    isPendingTarget(fieldName) {
        return this.pendingConnection?.targetField === fieldName;
    }
    getMappingSourceLabel(mappingDefinition) {
        return this.getConnectionSourceFields(mappingDefinition)
            .map(fieldName => this.getSourceLabelByName(fieldName))
            .join(' + ');
    }
    getConnectionSourceFields(mappingDefinition) {
        return this.getSourceFieldNames(mappingDefinition.sourceField);
    }
    connectFields(sourceField, targetField, transformType) {
        if (!sourceField || !targetField) {
            return false;
        }
        const existingIndex = this.mappingDefinitions.findIndex(mapping => mapping.targetField === targetField);
        const existingMapping = existingIndex >= 0 ? this.mappingDefinitions[existingIndex] : undefined;
        if (existingMapping && transformType !== 'concat') {
            this.saveError = 'Bu hedef alan zaten eşleşmiş. Aynı hedefe ek kaynak sadece concat ile bağlanabilir.';
            return false;
        }
        const sourceFieldValue = transformType === 'concat' && existingMapping
            ? this.mergeSourceFields(existingMapping.sourceField, sourceField)
            : sourceField;
        const mappingDefinition = {
            sourceField: sourceFieldValue,
            targetField,
            transformType
        };
        if (existingIndex >= 0) {
            this.mappingDefinitions = this.mappingDefinitions.map((mapping, index) => index === existingIndex ? mappingDefinition : mapping);
        }
        else {
            this.mappingDefinitions = [...this.mappingDefinitions, mappingDefinition];
        }
        this.successMessage = '';
        this.saveError = '';
        return true;
    }
    applyAiSuggestions(suggestions) {
        const sourceNames = new Map(this.sourceFields.map(field => [field.name.toLowerCase(), field.name]));
        const targetNames = new Map(this.targetFields.map(field => [field.name.toLowerCase(), field.name]));
        const nextMappings = [...this.mappingDefinitions];
        let appliedCount = 0;
        for (const suggestion of suggestions) {
            const sourceField = sourceNames.get(suggestion.sourceField.toLowerCase());
            const targetField = targetNames.get(suggestion.targetField.toLowerCase());
            if (!sourceField || !targetField) {
                continue;
            }
            const mappingDefinition = {
                sourceField,
                targetField,
                transformType: 'direct'
            };
            const existingIndex = nextMappings.findIndex(mapping => mapping.targetField === targetField);
            if (existingIndex >= 0) {
                const existingMapping = nextMappings[existingIndex];
                if (existingMapping.sourceField === sourceField && existingMapping.transformType === 'direct') {
                    continue;
                }
                nextMappings[existingIndex] = mappingDefinition;
            }
            else {
                nextMappings.push(mappingDefinition);
            }
            appliedCount += 1;
        }
        if (appliedCount > 0) {
            this.mappingDefinitions = nextMappings;
        }
        return appliedCount;
    }
    removeMapping(targetField) {
        this.mappingDefinitions = this.mappingDefinitions.filter(mapping => mapping.targetField !== targetField);
        if (this.selectedTargetField === targetField) {
            this.selectedTargetField = '';
        }
        this.successMessage = '';
        this.saveError = '';
    }
    requestClearMappings() {
        if (this.mappingDefinitions.length === 0) {
            return;
        }
        this.clearMappingsPopupMessage = 'Tüm eşleştirmeler silinsin mi?';
    }
    closeClearMappingsPopup() {
        this.clearMappingsPopupMessage = '';
    }
    confirmClearMappings() {
        this.mappingDefinitions = [];
        this.selectedSourceField = '';
        this.selectedTargetField = '';
        this.pendingConnection = undefined;
        this.draggedSourceField = '';
        this.dragTargetField = '';
        this.autoMatchMessage = 'Tüm eşleştirmeler silindi.';
        this.successMessage = '';
        this.saveError = '';
        this.closeClearMappingsPopup();
    }
    saveMappings(confirmWarnings = false, navigateAfterSave = true, afterSave, allowIncomplete = false) {
        this.successMessage = '';
        this.saveError = '';
        if (!confirmWarnings) {
            this.mappingValidationWarnings = [];
        }
        if (!allowIncomplete && this.missingRequiredTargetFields.length > 0) {
            this.activeBottomTab = 'warnings';
            this.requiredFieldsPopupMessage = `Zorunlu alanlar boş bırakılamaz: ${this.missingRequiredTargetFields
                .map(field => this.getTargetFieldLabel(field))
                .join(', ')}.`;
            this.saveError = `Zorunlu hedef alanlar eşleştirilmeden devam edilemez: ${this.missingRequiredTargetFields
                .map(field => this.getTargetFieldLabel(field))
                .join(', ')}.`;
            return;
        }
        if (!allowIncomplete && this.mappingDefinitions.length === 0) {
            this.saveError = 'Devam etmeden önce en az bir alan eşleştirmesi yapın.';
            return;
        }
        const clientWarnings = this.getMappingTypeWarnings();
        if (!allowIncomplete && clientWarnings.length > 0 && !confirmWarnings) {
            this.mappingValidationWarnings = clientWarnings;
            this.activeBottomTab = 'warnings';
            this.changeDetector.detectChanges();
            return;
        }
        this.isSaving = true;
        this.mappingApi.saveMappings(this.mappingId, {
            mappings: this.mappingDefinitions,
            confirmWarnings,
            allowIncomplete
        })
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
                this.savedMappingsSnapshot = JSON.stringify(response.mappings);
                this.isNewMappingSession = false;
                this.successMessage = 'Alan eşleştirmeleri kaydedildi.';
                afterSave?.();
                if (navigateAfterSave) {
                    this.allowNavigation = true;
                    void this.router.navigate(['/mappings', this.mappingId, 'test']);
                }
                this.changeDetector.detectChanges();
            },
            error: (error) => {
                this.saveError = this.getErrorMessage(error, 'Alan eşleştirmeleri kaydedilemedi.');
                this.changeDetector.detectChanges();
            }
        });
    }
    goBack() {
        void this.router.navigate(['/mappings/create']);
    }
    continueNext() {
        this.saveMappings();
    }
    markAsTemplate() {
        if (!this.mapping || this.mapping.sourceTemplateId || this.mapping.isTemplate || this.isMarkingTemplate) {
            return;
        }
        this.isTemplateSavePending = true;
        this.saveMappings(false, false, () => {
            this.persistAsTemplate();
        });
    }
    persistAsTemplate() {
        if (!this.mapping) {
            return;
        }
        this.successMessage = '';
        this.saveError = '';
        this.isMarkingTemplate = true;
        this.mappingApi.updateMapping(this.mappingId, {
            name: this.mapping.name,
            description: this.mapping.description,
            institution: this.mapping.institution,
            sourceType: this.mapping.sourceType,
            targetType: this.mapping.targetType,
            patternType: this.mapping.patternType,
            patternSettings: this.mapping.patternSettings,
            status: this.mapping.status,
            isTemplate: true
        })
            .pipe(finalize(() => {
            this.isMarkingTemplate = false;
            this.changeDetector.detectChanges();
        }))
            .subscribe({
            next: (mapping) => {
                this.mapping = mapping;
                this.isTemplateSavePending = false;
                this.successMessage = 'Mapping şablon olarak kaydedildi. Yeni mapping oluştururken seçilebilir.';
            },
            error: (error) => {
                this.saveError = this.getErrorMessage(error, 'Mapping şablon olarak kaydedilemedi.');
            }
        });
    }
    closeRequiredFieldsPopup() {
        this.requiredFieldsPopupMessage = '';
        this.isTemplateSavePending = false;
    }
    closeMappingValidationWarnings() {
        this.mappingValidationWarnings = [];
        this.isTemplateSavePending = false;
    }
    continueDespiteMappingWarnings() {
        this.mappingValidationWarnings = [];
        if (this.isTemplateSavePending) {
            this.saveMappings(true, false, () => {
                this.persistAsTemplate();
            });
            return;
        }
        this.saveMappings(true);
    }
    saveIncompleteAsTemplate() {
        this.requiredFieldsPopupMessage = '';
        this.saveMappings(true, false, () => {
            this.persistAsTemplate();
        }, true);
    }
    canLeavePage() {
        if (this.allowNavigation || (!this.hasUnsavedMappingChanges && !this.isNewMappingSession)) {
            return true;
        }
        this.isExitDialogOpen = true;
        return new Promise(resolve => {
            this.exitDecisionResolver = resolve;
        });
    }
    saveMappingsAndLeave() {
        this.saveError = '';
        if (!this.hasUnsavedMappingChanges) {
            this.isNewMappingSession = false;
            this.allowNavigation = true;
            this.closeExitDialog(true);
            return;
        }
        this.saveMappings(true, false, () => {
            this.allowNavigation = true;
            this.closeExitDialog(true);
        }, true);
    }
    discardMappingChangesAndLeave() {
        if (!this.isNewMappingSession) {
            this.allowNavigation = true;
            this.closeExitDialog(true);
            return;
        }
        this.isDiscarding = true;
        this.mappingApi.deleteMapping(this.mappingId)
            .pipe(finalize(() => {
            this.isDiscarding = false;
            this.changeDetector.detectChanges();
        }))
            .subscribe({
            next: () => {
                this.allowNavigation = true;
                this.closeExitDialog(true);
            },
            error: (error) => {
                this.saveError = this.getErrorMessage(error, 'Kaydedilmemiş mapping kaydı silinemedi.');
                this.closeExitDialog(false);
            }
        });
    }
    stayOnMappingPage() {
        this.closeExitDialog(false);
    }
    warnBeforeBrowserUnload(event) {
        if (!this.allowNavigation && (this.hasUnsavedMappingChanges || this.isNewMappingSession)) {
            event.preventDefault();
        }
    }
    closeExitDialog(canLeave) {
        this.isExitDialogOpen = false;
        const resolver = this.exitDecisionResolver;
        this.exitDecisionResolver = undefined;
        resolver?.(canLeave);
    }
    setActiveBottomTab(tab) {
        this.activeBottomTab = tab;
    }
    updateFixedWidthPosition(index, key, event) {
        const row = this.fixedWidthPositionRows[index];
        if (!row) {
            return;
        }
        const input = event.target;
        if (key === 'startPosition' || key === 'endPosition') {
            row[key] = input.value === '' ? null : Number(input.value);
        }
        else if (key === 'type') {
            row.type = input.value;
        }
        else {
            row[key] = input.value;
        }
        this.fixedWidthPositionErrors = this.validateFixedWidthPositionRows();
    }
    getFixedWidthLength(row) {
        if (!this.isCompleteFixedWidthRow(row)) {
            return '';
        }
        return String(row.endPosition - row.startPosition + 1);
    }
    isFixedWidthRequiredMissing(row) {
        return row.required && !this.isCompleteFixedWidthRow(row);
    }
    closeFixedWidthPositionModal() {
        const pendingCount = this.pendingFixedWidthTargetFields.length;
        if (pendingCount > 0) {
            this.autoMatchMessage = `${pendingCount} sabit genişlik alanı bekliyor. Kaynak panelinden pozisyonları tanımlayabilirsin.`;
        }
        this.showFixedWidthPositionModal = false;
    }
    openDeferredFixedWidthPositions() {
        if (!this.mapping) {
            return;
        }
        if (this.fixedWidthPositionRows.length === 0) {
            this.openFixedWidthPositionModal(this.mapping);
            return;
        }
        this.fixedWidthPositionErrors = this.validateFixedWidthPositionRows();
        this.showFixedWidthPositionModal = true;
    }
    saveFixedWidthPositions() {
        this.fixedWidthPositionErrors = [
            ...this.validateFixedWidthPositionRows(),
            ...this.validateRequiredFixedWidthPositionRows()
        ];
        if (this.fixedWidthPositionErrors.length > 0 || !this.mapping?.sourceSchema) {
            return;
        }
        const positionedRows = this.fixedWidthPositionRows.filter(row => this.isCompleteFixedWidthRow(row));
        if (positionedRows.length === 0) {
            this.fixedWidthPositionErrors = ['Kaynak oluşturmak için en az bir alan pozisyonu girin veya Sonra Tanımla ile bekletin.'];
            return;
        }
        const rawRecords = this.fixedWidthRawRecords;
        const sourceFields = positionedRows.map(row => this.toSourceFieldFromPositionRow(row, rawRecords[0]?.['line'] ?? ''));
        const records = rawRecords.map(record => ({
            line: record['line'] ?? '',
            ...this.readFixedWidthRecord(record['line'] ?? '', positionedRows)
        }));
        const request = {
            sourceName: this.mapping.sourceSchema.sourceName,
            sourceType: this.mapping.sourceType,
            fields: sourceFields,
            records
        };
        this.isSavingFixedWidthPositions = true;
        this.mappingApi.saveSourceSchema(this.mappingId, request)
            .pipe(finalize(() => {
            this.isSavingFixedWidthPositions = false;
            this.changeDetector.detectChanges();
        }))
            .subscribe({
            next: (response) => {
                if (!this.mapping) {
                    return;
                }
                this.mapping = {
                    ...this.mapping,
                    sourceType: response.sourceType,
                    sourceSchema: {
                        sourceName: response.sourceName,
                        fields: response.fields,
                        records: response.records
                    },
                    updatedAt: response.updatedAt
                };
                this.showFixedWidthPositionModal = false;
                this.mappingDefinitions = this.mappingDefinitions.filter(mappingDefinition => response.fields.some(field => field.name === mappingDefinition.sourceField));
                const pendingCount = this.pendingFixedWidthTargetFields.length;
                if (pendingCount > 0) {
                    this.autoMatchMessage = `${response.fields.length} kaynak kolon oluşturuldu. ${pendingCount} alan sonra tanımlanmak üzere bekliyor.`;
                }
                else {
                    this.autoMatchMessage = 'Kaynak kolonlar oluşturuldu. Eşlemek için Otomatik Eşle veya AI ile Eşle butonunu kullanabilirsin.';
                }
                this.changeDetector.detectChanges();
            },
            error: (error) => {
                this.fixedWidthPositionErrors = [this.getErrorMessage(error, 'Pozisyon tanımları kaydedilemedi.')];
                this.changeDetector.detectChanges();
            }
        });
    }
    getSourceMappingCount(fieldName) {
        return this.mappingDefinitions.filter(mapping => this.getSourceFieldNames(mapping.sourceField).includes(fieldName)).length;
    }
    getSourceUsageLabel(fieldName) {
        const usageCount = this.getSourceMappingCount(fieldName);
        return usageCount > 0 ? `${fieldName} - ${usageCount} eşleşme` : fieldName;
    }
    isTargetMapped(fieldName) {
        return this.mappingDefinitions.some(mapping => mapping.targetField === fieldName);
    }
    isRequiredTargetUnmapped(fieldName) {
        const field = this.getTargetField(fieldName);
        return Boolean(field?.required && !this.isTargetMapped(fieldName));
    }
    getMappingForTarget(fieldName) {
        return this.mappingDefinitions.find(mapping => mapping.targetField === fieldName);
    }
    getSourceLineY(sourceField) {
        const firstSourceField = this.getSourceFieldNames(sourceField)[0] ?? sourceField;
        const portCenter = this.getPortCenter('.connector-port--source', firstSourceField);
        if (portCenter) {
            return portCenter.y;
        }
        const index = Math.max(this.sourceFields.findIndex(field => field.name === firstSourceField), 0);
        return this.sourceFirstPortY + index * this.sourcePortStepY;
    }
    getSourcePortX(sourceField) {
        const firstSourceField = this.getSourceFieldNames(sourceField)[0] ?? sourceField;
        return this.getPortCenter('.connector-port--source', firstSourceField)?.x ?? this.sourcePortX;
    }
    getTargetLineY(targetField) {
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
    getTargetPortX(targetField) {
        return this.getPortCenter('.connector-port--target', targetField)?.x ?? this.targetPortX;
    }
    getConnectionPath(sourceField, mappingDefinition) {
        return this.buildCurvePath(this.getSourcePortX(sourceField), this.getSourceLineY(sourceField), this.getTargetPortX(mappingDefinition.targetField), this.getTargetLineY(mappingDefinition.targetField));
    }
    getConnectionLabelX(mappingDefinition) {
        return this.getTargetPortX(mappingDefinition.targetField) - 84;
    }
    getConnectionLabelY(mappingDefinition) {
        return this.getTargetLineY(mappingDefinition.targetField);
    }
    getMarkerId(targetField) {
        if (this.isMappingHighlighted(targetField)) {
            return 'connection-arrow-highlighted';
        }
        if (this.isMappingDimmed(targetField)) {
            return 'connection-arrow-dimmed';
        }
        return 'connection-arrow';
    }
    isMappingHighlighted(targetField) {
        return this.hoveredMappingTargetFields.includes(targetField);
    }
    isMappingDimmed(targetField) {
        return this.hoveredMappingTargetFields.length > 0 && !this.hoveredMappingTargetFields.includes(targetField);
    }
    setHoveredMapping(targetField) {
        this.hoveredMappingTargetFields = [targetField];
    }
    setHoveredSourceField(sourceFieldName) {
        this.hoveredMappingTargetFields = this.mappingDefinitions
            .filter(mapping => this.getConnectionSourceFields(mapping).includes(sourceFieldName))
            .map(mapping => mapping.targetField);
    }
    setHoveredTargetField(targetFieldName) {
        this.hoveredMappingTargetFields = this.mappingDefinitions.some(mapping => mapping.targetField === targetFieldName)
            ? [targetFieldName]
            : [];
    }
    clearHoveredMapping() {
        this.hoveredMappingTargetFields = [];
    }
    buildCurvePath(x1, y1, x2, y2) {
        const midX = (x1 + x2) / 2;
        return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
    }
    getFunctionNodeLabel(mappingDefinition) {
        return mappingDefinition.transformType;
    }
    getSourceFieldLabel(field) {
        return field.displayName ? `${field.displayName} (${field.name})` : field.name;
    }
    getTargetFieldLabel(field) {
        return field.displayName ? `${field.displayName} (${field.name})` : field.name;
    }
    getSourceLabelByName(fieldName) {
        const field = this.getSourceField(fieldName);
        return field ? this.getSourceFieldLabel(field) : fieldName;
    }
    getTargetLabelByName(fieldName) {
        const field = this.getTargetField(fieldName);
        return field ? this.getTargetFieldLabel(field) : fieldName;
    }
    getCanvasFieldName(field) {
        return field.displayName || this.splitFieldName(field.name);
    }
    loadMapping(mappingId) {
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
                this.savedMappingsSnapshot = JSON.stringify(this.mappingDefinitions);
                if (!mapping.sourceSchema) {
                    this.loadError = 'Önce kaynak veri tanımlanmalıdır.';
                }
                else if (!mapping.targetSchema) {
                    this.loadError = 'Önce hedef veri tanımlanmalıdır.';
                }
                else if (this.shouldPromptForFixedWidthPositions(mapping)) {
                    this.openFixedWidthPositionModal(mapping);
                }
                this.changeDetector.detectChanges();
            },
            error: (error) => {
                this.loadError = this.getErrorMessage(error, 'Mapping bilgisi alınamadı.');
                this.changeDetector.detectChanges();
            }
        });
    }
    getSourceField(fieldName) {
        return this.sourceFields.find(field => field.name === fieldName);
    }
    getTargetField(fieldName) {
        return this.targetFields.find(field => field.name === fieldName);
    }
    shouldPromptForFixedWidthPositions(mapping) {
        if (!this.hasFixedWidthRawLines(mapping)) {
            return false;
        }
        const sourceFieldCount = mapping.sourceSchema?.fields.length ?? 0;
        return sourceFieldCount === 0 || this.getPendingFixedWidthTargetFields(mapping).some(field => field.required);
    }
    openFixedWidthPositionModal(mapping) {
        this.fixedWidthPositionRows = (mapping.targetSchema?.fields ?? []).map(field => {
            const existingSourceField = this.getFixedWidthSourceFieldForTarget(mapping, field.name);
            return {
                targetFieldName: field.name,
                name: existingSourceField?.name ?? field.name,
                displayName: existingSourceField?.displayName ?? field.displayName ?? this.splitFieldName(field.name),
                type: (existingSourceField?.type ?? field.type),
                required: field.required,
                startPosition: existingSourceField?.startPosition ?? null,
                endPosition: existingSourceField?.endPosition ?? null
            };
        });
        this.fixedWidthPositionErrors = [];
        this.showFixedWidthPositionModal = true;
    }
    validateFixedWidthPositionRows() {
        const errors = [];
        const ranges = [];
        const usedNames = new Set();
        this.fixedWidthPositionRows.forEach((row, index) => {
            const hasStart = row.startPosition !== null && row.startPosition !== undefined;
            const hasEnd = row.endPosition !== null && row.endPosition !== undefined;
            if (!hasStart && !hasEnd) {
                return;
            }
            const label = row.displayName.trim() || row.name.trim() || `Alan ${index + 1}`;
            if (!row.name.trim()) {
                errors.push(`${label} için alan adı boş olamaz.`);
            }
            else if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(row.name.trim())) {
                errors.push(`${label} alan adı harf veya alt çizgi ile başlamalıdır.`);
            }
            else if (usedNames.has(row.name.trim().toLowerCase())) {
                errors.push(`${label} alan adı tekrar ediyor.`);
            }
            usedNames.add(row.name.trim().toLowerCase());
            if (hasStart !== hasEnd) {
                errors.push(`${label} için başlangıç ve bitiş birlikte girilmelidir.`);
                return;
            }
            if (row.startPosition < 1) {
                errors.push(`${label} başlangıç pozisyonu 1 veya daha büyük olmalıdır.`);
            }
            if (row.endPosition < row.startPosition) {
                errors.push(`${label} bitiş pozisyonu başlangıçtan küçük olamaz.`);
            }
            if (row.startPosition >= 1 && row.endPosition >= row.startPosition) {
                ranges.push({
                    name: label,
                    start: row.startPosition,
                    end: row.endPosition
                });
            }
        });
        for (let index = 0; index < ranges.length; index++) {
            for (let nextIndex = index + 1; nextIndex < ranges.length; nextIndex++) {
                const current = ranges[index];
                const next = ranges[nextIndex];
                if (current.start <= next.end && next.start <= current.end) {
                    errors.push(`${current.name} ile ${next.name} pozisyon aralıkları çakışıyor.`);
                }
            }
        }
        return errors;
    }
    validateRequiredFixedWidthPositionRows() {
        const missingRequiredRows = this.fixedWidthPositionRows.filter(row => this.isFixedWidthRequiredMissing(row));
        if (missingRequiredRows.length === 0) {
            return [];
        }
        return [
            `Zorunlu alanların pozisyonu tamamlanmalı: ${missingRequiredRows
                .map(row => row.displayName.trim() || row.name.trim() || row.targetFieldName)
                .join(', ')}.`
        ];
    }
    isCompleteFixedWidthRow(row) {
        return row.startPosition !== null
            && row.startPosition !== undefined
            && row.endPosition !== null
            && row.endPosition !== undefined;
    }
    toSourceFieldFromPositionRow(row, sampleLine) {
        return {
            name: row.name.trim(),
            displayName: row.displayName.trim() || undefined,
            type: row.type,
            required: false,
            sampleValue: this.readFixedWidthValue(sampleLine, row),
            startPosition: row.startPosition,
            endPosition: row.endPosition,
            length: row.endPosition - row.startPosition + 1
        };
    }
    readFixedWidthRecord(line, rows) {
        return rows.reduce((record, row) => {
            record[row.name.trim()] = this.readFixedWidthValue(line, row);
            return record;
        }, {});
    }
    readFixedWidthValue(line, row) {
        const startIndex = Math.max(row.startPosition - 1, 0);
        const endIndex = Math.min(row.endPosition, line.length);
        return line.substring(startIndex, endIndex).trim();
    }
    hasFixedWidthRawLines(mapping) {
        const records = mapping.sourceSchema?.records ?? [];
        return mapping.sourceType === 'txt'
            && records.length > 0
            && records.every(record => typeof record['line'] === 'string');
    }
    getPendingFixedWidthTargetFields(mapping) {
        if (!this.hasFixedWidthRawLines(mapping)) {
            return [];
        }
        const positionedSourceFieldNames = new Set((mapping.sourceSchema?.fields ?? [])
            .filter(field => field.startPosition !== undefined && field.startPosition !== null
            && field.endPosition !== undefined && field.endPosition !== null)
            .map(field => field.name.trim().toLowerCase()));
        return (mapping.targetSchema?.fields ?? [])
            .filter(field => {
            const normalizedTargetFieldName = field.name.trim().toLowerCase();
            const mappedSourceFieldName = mapping.mappingDefinitions
                ?.find(definition => definition.targetField.trim().toLowerCase() === normalizedTargetFieldName)
                ?.sourceField
                .trim()
                .toLowerCase();
            return !positionedSourceFieldNames.has(mappedSourceFieldName ?? normalizedTargetFieldName);
        });
    }
    getFixedWidthSourceFieldForTarget(mapping, targetFieldName) {
        const normalizedTargetFieldName = targetFieldName.trim().toLowerCase();
        const mappedSourceFieldName = mapping.mappingDefinitions
            ?.find(definition => definition.targetField.trim().toLowerCase() === normalizedTargetFieldName)
            ?.sourceField;
        const normalizedSourceFieldName = mappedSourceFieldName?.trim().toLowerCase() ?? normalizedTargetFieldName;
        return (mapping.sourceSchema?.fields ?? [])
            .find(field => field.name.trim().toLowerCase() === normalizedSourceFieldName);
    }
    setActiveDragTarget(fieldName) {
        this.dragTargetField = fieldName;
        this.selectedTargetField = fieldName;
    }
    resolveTargetFieldAtPoint(clientX, clientY) {
        if (!clientX && !clientY) {
            return undefined;
        }
        const elements = document.elementsFromPoint(clientX, clientY);
        for (const element of elements) {
            const targetElement = element.closest('.target-drop-zone[data-field-name], .schema-target-drop[data-field-name]');
            const fieldName = targetElement?.dataset['fieldName'];
            if (fieldName) {
                return fieldName;
            }
        }
        return undefined;
    }
    splitFieldName(fieldName) {
        return fieldName
            .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
            .replace(/\bIban\b/g, 'IBAN')
            .replace(/\bTc\b/g, 'TC')
            .trim();
    }
    getPortCenter(selector, fieldName) {
        const canvas = this.hostElement.nativeElement.querySelector('.canvas-grid');
        if (!canvas) {
            return undefined;
        }
        const ports = Array.from(this.hostElement.nativeElement.querySelectorAll(selector));
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
    clearDragState(clearPendingConnection = false) {
        this.draggedSourceField = '';
        this.dragTargetField = '';
        this.dragPreviewX = this.sourcePortX;
        this.dragPreviewY = 0;
        if (clearPendingConnection) {
            this.pendingConnection = undefined;
        }
    }
    mergeSourceFields(existingSourceField, nextSourceField) {
        const sourceFields = [...this.getSourceFieldNames(existingSourceField), nextSourceField]
            .map(fieldName => fieldName.trim())
            .filter(Boolean);
        return Array.from(new Set(sourceFields)).join(', ');
    }
    getSourceFieldNames(sourceField) {
        return sourceField
            .split(',')
            .map(fieldName => fieldName.trim())
            .filter(Boolean);
    }
    getMappingTypeWarnings() {
        return this.mappingDefinitions
            .map(mappingDefinition => this.getMappingTypeWarning(mappingDefinition))
            .filter((warning) => Boolean(warning));
    }
    getMappingTypeWarning(mappingDefinition) {
        if (mappingDefinition.transformType === 'constant') {
            return undefined;
        }
        const sourceFields = this.getSourceFieldNames(mappingDefinition.sourceField)
            .map(fieldName => this.getSourceField(fieldName))
            .filter((field) => Boolean(field));
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
    createAutoMatches() {
        const usedSources = new Set(this.mappingDefinitions.flatMap(mapping => this.getSourceFieldNames(mapping.sourceField)));
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
        const matches = [];
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
    getFieldSimilarityScore(sourceField, targetField) {
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
    getFieldSearchTerms(field) {
        return Array.from(new Set([
            field.name,
            field.displayName ?? '',
            this.splitFieldName(field.name),
            field.displayName ? this.splitFieldName(field.displayName) : ''
        ]
            .map(value => value.trim())
            .filter(Boolean)));
    }
    scoreNormalizedTerms(sourceValue, targetValue) {
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
    normalizeFieldText(value) {
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
    normalizeFieldToken(token) {
        const aliases = {
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
    getDiceCoefficient(left, right) {
        if (left.length < 2 || right.length < 2) {
            return left === right ? 1 : 0;
        }
        const leftBigrams = this.getBigrams(left);
        const rightBigrams = this.getBigrams(right);
        const rightCounts = rightBigrams.reduce((counts, bigram) => {
            counts.set(bigram, (counts.get(bigram) ?? 0) + 1);
            return counts;
        }, new Map());
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
    getBigrams(value) {
        return Array.from({ length: value.length - 1 }, (_, index) => value.slice(index, index + 2));
    }
    getErrorMessage(error, fallback) {
        if (error instanceof HttpErrorResponse) {
            const validationErrors = error.error?.errors;
            const validationMessage = validationErrors
                ? Object.values(validationErrors).flat().join(' ')
                : '';
            return validationMessage || error.error?.title || fallback;
        }
        return fallback;
    }
    static { this.ɵfac = function VisualMappingPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || VisualMappingPageComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: VisualMappingPageComponent, selectors: [["app-visual-mapping-page"]], hostBindings: function VisualMappingPageComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("beforeunload", function VisualMappingPageComponent_beforeunload_HostBindingHandler($event) { return ctx.warnBeforeBrowserUnload($event); }, i0.ɵɵresolveWindow);
        } }, decls: 15, vars: 10, consts: [[1, "map-page"], ["aria-labelledby", "map-title", 1, "wizard-shell"], [1, "wizard-header"], ["id", "map-title"], [3, "currentStep"], ["class", "mapping-summary", 4, "ngIf"], ["class", "state-message", 4, "ngIf"], ["class", "alert alert--error", 4, "ngIf"], ["class", "mapper-shell", 4, "ngIf"], ["class", "modal-backdrop", "role", "presentation", 4, "ngIf"], ["class", "modal-backdrop", "role", "presentation", 3, "click", 4, "ngIf"], [1, "mapping-summary"], [1, "mapping-summary__name"], [1, "schema-badge", "schema-badge--source"], [1, "schema-badge", "schema-badge--target"], [1, "state-message"], [1, "alert", "alert--error"], [1, "mapper-shell"], [1, "mapper-workbench"], [1, "schema-panel"], [1, "panel-header"], [1, "panel-eyebrow"], [1, "field-count"], [1, "schema-name"], [1, "schema-field-list"], ["class", "schema-field", "type", "button", 3, "schema-field--selected", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "fixed-width-pending-panel", 4, "ngIf"], [1, "canvas-panel"], [1, "panel-header", "panel-header--canvas"], [1, "selection-strip"], ["type", "button", 1, "auto-match-action", 3, "click"], ["type", "button", 1, "ai-match-action", 3, "click", "disabled"], [4, "ngIf"], ["class", "clear-mappings-action", "type", "button", 3, "click", 4, "ngIf"], ["class", "auto-match-message", 4, "ngIf"], ["class", "ai-match-message", 4, "ngIf"], [1, "canvas-grid", 3, "dragover"], ["preserveAspectRatio", "none", "aria-hidden", "true", 1, "connection-layer"], ["id", "connection-arrow", "markerWidth", "10", "markerHeight", "10", "refX", "9", "refY", "5", "orient", "auto", "markerUnits", "strokeWidth"], ["d", "M 0 0 L 10 5 L 0 10 z", "fill", "#000000"], ["id", "connection-arrow-highlighted", "markerWidth", "10", "markerHeight", "10", "refX", "9", "refY", "5", "orient", "auto", "markerUnits", "strokeWidth"], ["d", "M 0 0 L 10 5 L 0 10 z", "fill", "#fcbd00"], ["id", "connection-arrow-dimmed", "markerWidth", "10", "markerHeight", "10", "refX", "9", "refY", "5", "orient", "auto", "markerUnits", "strokeWidth"], ["d", "M 0 0 L 10 5 L 0 10 z", "fill", "#c7cdd6"], [4, "ngFor", "ngForOf"], ["class", "connection-line connection-line--preview", 4, "ngIf"], ["class", "connection-preview-end", "r", "7", 4, "ngIf"], [1, "canvas-column", "canvas-column--source"], ["class", "canvas-node", "type", "button", 3, "canvas-node--selected", "click", "mouseenter", "mouseleave", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "canvas-column", "canvas-column--target", 3, "dragover", "drop"], ["class", "canvas-field-group", 3, "dragover", 4, "ngIf"], ["aria-label", "Mevcut e\u015Fle\u015Ftirmeler", 1, "mapping-list"], [1, "mapping-list__header"], ["class", "empty-state", 4, "ngIf"], ["class", "mapping-row", 3, "mapping-row--highlighted", "mouseenter", "mouseleave", 4, "ngFor", "ngForOf"], ["class", "schema-field-group", 4, "ngIf"], [1, "bottom-panel"], ["role", "tablist", "aria-label", "Mapping bilgi panelleri", 1, "tab-list"], ["type", "button", "role", "tab", 3, "click"], ["class", "tab-panel", 4, "ngIf"], ["aria-live", "polite", 1, "feedback"], ["class", "alert alert--success", 4, "ngIf"], [1, "form-actions"], ["type", "button", 1, "back-action", 3, "click", "disabled"], [1, "form-actions__right"], ["class", "template-action", "type", "button", 3, "disabled", "click", 4, "ngIf"], ["class", "template-saved-badge", 4, "ngIf"], ["type", "button", 1, "secondary-action", 3, "click", "disabled"], ["type", "button", 1, "primary-action", 3, "click", "disabled"], ["type", "button", 1, "schema-field", 3, "click"], [1, "field-name"], [1, "field-meta"], ["class", "source-usage", 4, "ngIf"], [1, "source-usage"], [1, "fixed-width-pending-panel"], [1, "fixed-width-pending-panel__header"], ["class", "fixed-width-pending-panel__required", 4, "ngIf"], [1, "fixed-width-pending-list"], [4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", 1, "secondary-action", 3, "click"], [1, "fixed-width-pending-panel__required"], ["type", "button", 1, "clear-mappings-action", 3, "click"], [1, "auto-match-message"], [1, "ai-match-message"], ["class", "connection-line", 3, "connection-line--highlighted", "connection-line--dimmed", "marker-end", 4, "ngFor", "ngForOf"], [1, "connection-function"], ["x", "-34", "y", "-13", "width", "68", "height", "26", "rx", "6"], ["text-anchor", "middle", "y", "4"], [1, "connection-line"], [1, "connection-line", "connection-line--preview"], ["r", "7", 1, "connection-preview-end"], ["type", "button", 1, "canvas-node", 3, "click", "mouseenter", "mouseleave"], [1, "canvas-node__content"], [1, "canvas-node__label"], [1, "canvas-node__meta"], ["draggable", "true", "title", "Ba\u011Flant\u0131 ba\u015Flat", 1, "connector-port", "connector-port--source", 3, "dragstart", "dragend"], [1, "canvas-field-group", 3, "dragover"], [1, "canvas-field-group__header", "canvas-field-group__header--required"], ["class", "target-drop-zone", 3, "target-drop-zone--active", "target-drop-zone--pending", "dragenter", "dragover", "dragleave", "drop", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "target-drop-zone", 3, "dragenter", "dragover", "dragleave", "drop"], ["type", "button", 1, "canvas-node", "canvas-node--required", 3, "click", "mouseenter", "mouseleave", "dragenter", "dragover", "drop"], ["title", "Ba\u011Flant\u0131y\u0131 buraya b\u0131rak", 1, "connector-port", "connector-port--target", 3, "dragenter", "dragover", "drop"], [1, "canvas-node__badges"], [1, "canvas-node__type"], [1, "canvas-node__badge"], ["class", "drop-transform-palette", 4, "ngIf"], [1, "drop-transform-palette"], [1, "drop-transform-palette__summary"], ["type", "button", 3, "drop-transform-palette__option--active", "disabled", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "drop-transform-palette__cancel", 3, "click"], ["type", "button", 3, "click", "disabled"], [1, "canvas-field-group__header"], ["type", "button", 1, "canvas-node", 3, "click", "mouseenter", "mouseleave", "dragenter", "dragover", "drop"], [1, "empty-state"], [1, "mapping-row", 3, "mouseenter", "mouseleave"], [1, "mapping-row__arrow"], [1, "mapping-row__transform"], ["type", "button", 1, "delete-action", 3, "click"], [1, "schema-field-group"], [1, "schema-field-group__header", "schema-field-group__header--required"], ["class", "schema-field schema-field--required schema-target-drop", "type", "button", 3, "schema-field--selected", "schema-field--mapped", "schema-field--required-missing", "click", "dragenter", "dragover", "dragleave", "drop", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", 1, "schema-field", "schema-field--required", "schema-target-drop", 3, "click", "dragenter", "dragover", "dragleave", "drop"], ["class", "mapped-from", 4, "ngIf"], [1, "mapped-from"], [1, "schema-field-group__header"], ["class", "schema-field schema-target-drop", "type", "button", 3, "schema-field--selected", "schema-field--mapped", "click", "dragenter", "dragover", "dragleave", "drop", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", 1, "schema-field", "schema-target-drop", 3, "click", "dragenter", "dragover", "dragleave", "drop"], [1, "tab-panel"], [1, "property-grid"], ["class", "warning-list", 4, "ngIf"], [1, "warning-list"], [1, "alert", "alert--success"], ["type", "button", 1, "template-action", 3, "click", "disabled"], [1, "template-saved-badge"], ["role", "presentation", 1, "modal-backdrop"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "fixed-width-modal-title", 1, "required-fields-modal", "fixed-width-modal"], [1, "fixed-width-modal__header"], ["id", "fixed-width-modal-title"], ["role", "table", "aria-label", "Sabit geni\u015Flik pozisyonlar\u0131", 1, "fixed-width-grid"], ["role", "row", 1, "fixed-width-grid__row", "fixed-width-grid__row--head"], ["class", "fixed-width-grid__row", "role", "row", 3, "fixed-width-grid__row--required-missing", 4, "ngFor", "ngForOf"], [1, "modal-actions"], ["role", "row", 1, "fixed-width-grid__row"], ["type", "text", "autocomplete", "off", 3, "input", "value"], [3, "change", "value"], [3, "value", 4, "ngFor", "ngForOf"], ["type", "number", "min", "1", "inputmode", "numeric", 3, "input", "value"], [3, "value"], ["role", "presentation", 1, "modal-backdrop", 3, "click"], ["role", "alertdialog", "aria-modal", "true", "aria-labelledby", "required-fields-modal-title", 1, "required-fields-modal", 3, "click"], ["id", "required-fields-modal-title"], ["type", "button", 1, "back-action", 3, "click"], ["role", "alertdialog", "aria-modal", "true", "aria-labelledby", "clear-mappings-modal-title", 1, "required-fields-modal", 3, "click"], ["id", "clear-mappings-modal-title"], ["type", "button", 1, "primary-action", 3, "click"], ["role", "alertdialog", "aria-modal", "true", "aria-labelledby", "mapping-warning-modal-title", 1, "required-fields-modal", "mapping-warning-modal", 3, "click"], ["id", "mapping-warning-modal-title"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "mapping-exit-title", 1, "required-fields-modal"], ["id", "mapping-exit-title"], ["type", "button", 1, "delete-action", 3, "click", "disabled"]], template: function VisualMappingPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "main", 0)(1, "section", 1)(2, "header", 2)(3, "h1", 3);
            i0.ɵɵtext(4, "Yeni Mapping Olu\u015Ftur");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "app-wizard-stepper", 4);
            i0.ɵɵtemplate(6, VisualMappingPageComponent_div_6_Template, 7, 3, "div", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(7, VisualMappingPageComponent_p_7_Template, 2, 0, "p", 6)(8, VisualMappingPageComponent_p_8_Template, 2, 1, "p", 7)(9, VisualMappingPageComponent_section_9_Template, 100, 51, "section", 8)(10, VisualMappingPageComponent_div_10_Template, 32, 7, "div", 9)(11, VisualMappingPageComponent_div_11_Template, 10, 2, "div", 10)(12, VisualMappingPageComponent_div_12_Template, 11, 1, "div", 10)(13, VisualMappingPageComponent_div_13_Template, 14, 4, "div", 10)(14, VisualMappingPageComponent_div_14_Template, 14, 6, "div", 9);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("currentStep", 2);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.mapping);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.loadError);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.mapping && !ctx.loadError);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showFixedWidthPositionModal);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.requiredFieldsPopupMessage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.clearMappingsPopupMessage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.mappingValidationWarnings.length > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isExitDialogOpen);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, WizardStepperComponent], styles: [".map-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  padding: 40px 20px;\n}\n\n.wizard-shell[_ngcontent-%COMP%] {\n  max-width: 1440px;\n  margin: 0 auto;\n}\n\n.wizard-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n\n.wizard-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #111827;\n  font-size: clamp(1.65rem, 3.2vw, 2.35rem);\n  font-weight: 760;\n  letter-spacing: 0;\n  line-height: 1.08;\n}\n\n.mapping-summary[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 10px;\n  margin-top: 16px;\n}\n\n.mapping-summary__name[_ngcontent-%COMP%] {\n  color: #59677c;\n  font-size: 0.95rem;\n  font-weight: 650;\n}\n\n.schema-badge[_ngcontent-%COMP%] {\n  border-radius: 999px;\n  font-size: 0.82rem;\n  font-weight: 760;\n  padding: 5px 10px;\n}\n\n.schema-badge--source[_ngcontent-%COMP%] {\n  border: 1px solid #9dc0ff;\n  background: #fff4cf;\n  color: #e5a900;\n}\n\n.schema-badge--target[_ngcontent-%COMP%] {\n  border: 1px solid #8bd2bd;\n  background: #eaf8f3;\n  color: #0f6654;\n}\n\n.mapper-shell[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 14px;\n}\n\n.mapper-workbench[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 280px minmax(560px, 1fr) 280px;\n  gap: 12px;\n  align-items: stretch;\n}\n\n.schema-panel[_ngcontent-%COMP%], \n.canvas-panel[_ngcontent-%COMP%], \n.bottom-panel[_ngcontent-%COMP%] {\n  border: 1px solid #cfd8e6;\n  border-radius: 8px;\n  background: #ffffff;\n}\n\n.schema-panel[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-rows: auto auto 1fr;\n  min-height: 560px;\n  overflow: hidden;\n}\n\n.canvas-panel[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-rows: auto auto 1fr auto;\n  min-height: 560px;\n  overflow: hidden;\n}\n\n.panel-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  border-bottom: 1px solid #dfe5ef;\n  background: #f8fafc;\n  padding: 14px 16px;\n}\n\n.panel-header--canvas[_ngcontent-%COMP%] {\n  align-items: end;\n}\n\n.panel-eyebrow[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  color: #64748b;\n  font-size: 0.74rem;\n  font-weight: 760;\n  letter-spacing: 0;\n  text-transform: uppercase;\n}\n\n.panel-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #172033;\n  font-size: 1rem;\n  font-weight: 760;\n  letter-spacing: 0;\n}\n\n.field-count[_ngcontent-%COMP%] {\n  min-width: 32px;\n  border: 1px solid #cfd8e6;\n  border-radius: 999px;\n  background: #ffffff;\n  color: #334155;\n  font-size: 0.82rem;\n  font-weight: 760;\n  padding: 4px 8px;\n  text-align: center;\n}\n\n.schema-name[_ngcontent-%COMP%] {\n  margin: 0;\n  border-bottom: 1px solid #dfe5ef;\n  color: #59677c;\n  font-size: 0.88rem;\n  font-weight: 700;\n  padding: 12px 16px;\n}\n\n.schema-field-list[_ngcontent-%COMP%] {\n  display: grid;\n  align-content: start;\n  gap: 12px;\n  overflow: auto;\n  padding: 12px;\n}\n\n.fixed-width-pending-panel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n  border: 1px solid #f0d48a;\n  border-radius: 8px;\n  background: #fff9e8;\n  padding: 12px;\n}\n\n.fixed-width-pending-panel__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: start;\n  justify-content: space-between;\n  gap: 10px;\n}\n\n.fixed-width-pending-panel__header[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 3px;\n}\n\n.fixed-width-pending-panel__header[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #172033;\n  font-size: 0.9rem;\n  font-weight: 800;\n  line-height: 1.25;\n}\n\n.fixed-width-pending-panel__header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 0.78rem;\n  font-weight: 760;\n}\n\n.fixed-width-pending-panel__required[_ngcontent-%COMP%] {\n  border: 1px solid #fecaca;\n  border-radius: 999px;\n  background: #fff1f1;\n  color: #b91c1c;\n  font-size: 0.74rem;\n  font-weight: 800;\n  padding: 4px 8px;\n  white-space: nowrap;\n}\n\n.fixed-width-pending-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 7px;\n  max-height: 180px;\n  overflow: auto;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\n.fixed-width-pending-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  border: 1px solid #f3e1a8;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #172033;\n  font-size: 0.82rem;\n  font-weight: 720;\n  padding: 8px 10px;\n}\n\n.fixed-width-pending-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  overflow-wrap: anywhere;\n}\n\n.fixed-width-pending-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #b91c1c;\n  font-size: 0.72rem;\n  white-space: nowrap;\n}\n\n.schema-field-group[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n}\n\n.schema-field-group__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  color: #64748b;\n  font-size: 0.76rem;\n  font-weight: 800;\n  letter-spacing: 0;\n  text-transform: uppercase;\n}\n\n.schema-field-group__header[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  min-width: 26px;\n  border: 1px solid #d7deea;\n  border-radius: 999px;\n  background: #ffffff;\n  color: #475569;\n  padding: 2px 7px;\n  text-align: center;\n}\n\n.schema-field-group__header--required[_ngcontent-%COMP%] {\n  color: #b91c1c;\n}\n\n.schema-field-group__header--required[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  border-color: #fecaca;\n  background: #fff1f1;\n  color: #b91c1c;\n}\n\n.schema-field[_ngcontent-%COMP%], \n.canvas-node[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 0;\n  border: 1px solid #d7deea;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #172033;\n  cursor: pointer;\n  text-align: left;\n  transition: border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease;\n}\n\n.schema-field[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 4px;\n  align-content: center;\n  min-height: 58px;\n  padding: 10px 12px;\n}\n\n.schema-field[_ngcontent-%COMP%]:hover, \n.canvas-node[_ngcontent-%COMP%]:hover {\n  border-color: #e5a900;\n  box-shadow: 0 8px 18px rgb(23 32 51 / 8%);\n}\n\n.schema-field--selected[_ngcontent-%COMP%], \n.canvas-node--selected[_ngcontent-%COMP%] {\n  border-color: #fcbd00;\n  box-shadow: 0 0 0 3px rgb(252 189 0 / 14%);\n}\n\n.schema-field--mapped[_ngcontent-%COMP%], \n.canvas-node--mapped[_ngcontent-%COMP%] {\n  background: #f7fffc;\n}\n\n.schema-field--required[_ngcontent-%COMP%], \n.canvas-node--required[_ngcontent-%COMP%] {\n  border-color: #fecaca;\n  background: #fff7f7;\n}\n\n.schema-field--required-missing[_ngcontent-%COMP%], \n.canvas-node--required-missing[_ngcontent-%COMP%] {\n  border-color: #dc2626;\n  background: #fff1f1;\n  color: #7f1d1d;\n}\n\n.schema-field--required-missing[_ngcontent-%COMP%]:hover, \n.canvas-node--required-missing[_ngcontent-%COMP%]:hover {\n  border-color: #b91c1c;\n  box-shadow: 0 8px 18px rgb(185 28 28 / 12%);\n}\n\n.schema-field--required-missing[_ngcontent-%COMP%]   .field-meta[_ngcontent-%COMP%] {\n  color: #b91c1c;\n}\n\n.field-name[_ngcontent-%COMP%] {\n  overflow-wrap: anywhere;\n  font-size: 0.9rem;\n  font-weight: 760;\n  line-height: 1.25;\n  word-break: break-word;\n}\n\n.field-meta[_ngcontent-%COMP%], \n.mapped-from[_ngcontent-%COMP%] {\n  overflow-wrap: anywhere;\n  color: #64748b;\n  font-size: 0.78rem;\n  font-weight: 650;\n  line-height: 1.25;\n  word-break: break-word;\n}\n\n.mapped-from[_ngcontent-%COMP%] {\n  color: #0f6654;\n}\n\n.source-usage[_ngcontent-%COMP%] {\n  color: #e5a900;\n  font-size: 0.76rem;\n  font-weight: 760;\n}\n\n.canvas-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: end;\n  justify-content: flex-end;\n  gap: 10px;\n}\n\n.canvas-toolbar[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 5px;\n  color: #475569;\n  font-size: 0.78rem;\n  font-weight: 700;\n}\n\n.canvas-toolbar[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  min-height: 38px;\n  border: 1px solid #cfd8e6;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #172033;\n  padding: 8px 10px;\n}\n\n.selection-strip[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 10px;\n  border-bottom: 1px solid #dfe5ef;\n  color: #59677c;\n  font-size: 0.86rem;\n  font-weight: 680;\n  padding: 10px 16px;\n}\n\n.auto-match-action[_ngcontent-%COMP%], \n.ai-match-action[_ngcontent-%COMP%], \n.clear-mappings-action[_ngcontent-%COMP%] {\n  min-height: 32px;\n  border: 1px solid #111827;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 0.78rem;\n  font-weight: 800;\n  padding: 6px 10px;\n}\n\n.auto-match-action[_ngcontent-%COMP%] {\n  background: #fcbd00;\n  color: #111827;\n}\n\n.auto-match-action[_ngcontent-%COMP%]:hover {\n  background: #f2b400;\n}\n\n.ai-match-action[_ngcontent-%COMP%] {\n  background: #fcbd00;\n  color: #111827;\n}\n\n.ai-match-action[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f2b400;\n}\n\n.clear-mappings-action[_ngcontent-%COMP%] {\n  background: #ffffff;\n  color: #111827;\n}\n\n.clear-mappings-action[_ngcontent-%COMP%]:hover {\n  background: #fff7df;\n}\n\n.auto-match-message[_ngcontent-%COMP%] {\n  color: #0f6654;\n  font-weight: 760;\n}\n\n.ai-match-message[_ngcontent-%COMP%] {\n  color: #111827;\n  font-weight: 760;\n}\n\n.canvas-grid[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: auto;\n  background-color: #fbfdff;\n  background-image:\n    linear-gradient(#e7edf6 1px, transparent 1px),\n    linear-gradient(90deg, #e7edf6 1px, transparent 1px);\n  background-size: 24px 24px;\n}\n\n.connection-layer[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 1;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n}\n\n.connection-line[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: #000000;\n  stroke-linecap: round;\n  stroke-width: 3;\n  transition: stroke 140ms ease, stroke-width 140ms ease, opacity 140ms ease;\n}\n\n.connection-line--highlighted[_ngcontent-%COMP%] {\n  stroke: #fcbd00 !important;\n  stroke-width: 4.5;\n}\n\n.connection-line--dimmed[_ngcontent-%COMP%] {\n  stroke: #c7cdd6 !important;\n  opacity: 0.45;\n}\n\n.connection-line--preview[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: #000000;\n  stroke-dasharray: 10 8;\n  stroke-width: 4;\n}\n\n.connection-preview-end[_ngcontent-%COMP%] {\n  fill: #000000;\n  stroke: #ffffff;\n  stroke-width: 3;\n}\n\n.connection-function[_ngcontent-%COMP%]   rect[_ngcontent-%COMP%] {\n  fill: #ffffff;\n  stroke: #000000;\n  stroke-width: 2;\n  transition: stroke 140ms ease;\n}\n\n.connection-function[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {\n  fill: #000000;\n  font-size: 12px;\n  font-weight: 760;\n  paint-order: stroke;\n  stroke: #ffffff;\n  stroke-linejoin: round;\n  stroke-width: 3px;\n}\n\n.connection-function--highlighted[_ngcontent-%COMP%]   rect[_ngcontent-%COMP%] {\n  stroke: #fcbd00 !important;\n  stroke-width: 3;\n}\n\n.connection-function--dimmed[_ngcontent-%COMP%] {\n  opacity: 0.45;\n}\n\n.canvas-column[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 2;\n  top: 64px;\n  display: grid;\n  align-content: start;\n  gap: 14px;\n  width: 210px;\n}\n\n.canvas-column--source[_ngcontent-%COMP%] {\n  left: 24px;\n}\n\n.canvas-column--target[_ngcontent-%COMP%] {\n  right: 24px;\n  width: 235px;\n}\n\n.canvas-node[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 8px;\n  min-height: 58px;\n  overflow: visible;\n  padding: 9px 34px 9px 11px;\n  text-overflow: ellipsis;\n  white-space: normal;\n}\n\n.canvas-column--target[_ngcontent-%COMP%]   .canvas-node[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(0, 1fr) max-content;\n  padding-left: 30px;\n  padding-right: 12px;\n}\n\n.canvas-node__content[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 3px;\n  min-width: 0;\n  align-content: center;\n}\n\n.canvas-node__label[_ngcontent-%COMP%] {\n  min-width: 0;\n  color: #172033;\n  font-size: 0.9rem;\n  font-weight: 760;\n  line-height: 1.22;\n  overflow-wrap: anywhere;\n  word-break: break-word;\n}\n\n.canvas-node__meta[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 0.72rem;\n  font-weight: 760;\n  line-height: 1;\n  text-transform: uppercase;\n}\n\n.canvas-node__badges[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 0 0 auto;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 5px;\n  margin-left: auto;\n  max-width: 104px;\n}\n\n.canvas-node__type[_ngcontent-%COMP%] {\n  border: 1px solid #cfd8e6;\n  border-radius: 999px;\n  background: #ffffff;\n  color: #334155;\n  font-size: 0.66rem;\n  font-weight: 850;\n  line-height: 1;\n  padding: 4px 7px;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n\n.canvas-node__badge[_ngcontent-%COMP%] {\n  border: 1px solid #fecaca;\n  border-radius: 999px;\n  background: #ffffff;\n  color: #b91c1c;\n  font-size: 0.68rem;\n  font-weight: 800;\n  line-height: 1;\n  padding: 2px 6px;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n\n.connector-port[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  z-index: 3;\n  width: 16px;\n  height: 16px;\n  border: 2px solid #fcbd00;\n  border-radius: 999px;\n  background: #ffffff;\n  box-shadow: 0 0 0 3px rgb(252 189 0 / 10%);\n  transform: translateY(-50%);\n}\n\n.connector-port--source[_ngcontent-%COMP%] {\n  right: -9px;\n  cursor: grab;\n}\n\n.canvas-field-group[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n}\n\n.canvas-field-group__header[_ngcontent-%COMP%] {\n  min-height: 18px;\n  color: #64748b;\n  font-size: 0.72rem;\n  font-weight: 850;\n  letter-spacing: 0;\n  text-transform: uppercase;\n}\n\n.canvas-field-group__header--required[_ngcontent-%COMP%] {\n  color: #b91c1c;\n}\n\n.canvas-node--required[_ngcontent-%COMP%] {\n  border-color: #fecaca;\n  background: #fff7f7;\n}\n\n.connector-port--target[_ngcontent-%COMP%] {\n  left: -9px;\n  border-color: #0f6654;\n  box-shadow: 0 0 0 3px rgb(15 102 84 / 10%);\n}\n\n.connector-port[_ngcontent-%COMP%] {\n  pointer-events: auto;\n  -webkit-user-drag: element;\n  user-select: none;\n  -webkit-user-select: none;\n}\n\n.connector-port--source[_ngcontent-%COMP%]:active {\n  cursor: grabbing;\n}\n\n.canvas-node[_ngcontent-%COMP%]:hover   .connector-port--source[_ngcontent-%COMP%], \n.target-drop-zone--active[_ngcontent-%COMP%]   .connector-port--target[_ngcontent-%COMP%] {\n  background: #fcbd00;\n}\n\n.target-drop-zone--active[_ngcontent-%COMP%]   .connector-port--target[_ngcontent-%COMP%] {\n  border-color: #0f6654;\n  background: #0f6654;\n}\n\n.target-drop-zone[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 46px;\n}\n\n.target-drop-zone--active[_ngcontent-%COMP%]   .canvas-node[_ngcontent-%COMP%] {\n  border-color: #0f6654;\n  background: #eaf8f3;\n  box-shadow: 0 0 0 3px rgb(15 102 84 / 16%);\n}\n\n.target-drop-zone--pending[_ngcontent-%COMP%]   .canvas-node[_ngcontent-%COMP%] {\n  border-color: #fcbd00;\n  background: #fff4cf;\n  box-shadow: 0 0 0 3px rgb(252 189 0 / 16%);\n}\n\n.drop-transform-palette[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  top: calc(100% + 8px);\n  z-index: 4;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 6px;\n  width: min(360px, 78vw);\n  border: 1px solid #bfd0e7;\n  border-radius: 8px;\n  background: #ffffff;\n  box-shadow: 0 16px 36px rgb(23 32 51 / 18%);\n  padding: 10px;\n}\n\n.drop-transform-palette__summary[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  display: grid;\n  gap: 2px;\n  border-bottom: 1px solid #dfe5ef;\n  color: #64748b;\n  font-size: 0.76rem;\n  font-weight: 700;\n  padding-bottom: 8px;\n}\n\n.drop-transform-palette__summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.drop-transform-palette__summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  min-width: 0;\n  overflow-wrap: anywhere;\n}\n\n.drop-transform-palette__summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #172033;\n  font-size: 0.82rem;\n}\n\n.drop-transform-palette[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 36px;\n  border: 1px solid #d7deea;\n  border-radius: 8px;\n  background: #f8fafc;\n  color: #334155;\n  cursor: pointer;\n  font-size: 0.8rem;\n  font-weight: 760;\n  padding: 8px 10px;\n  text-align: center;\n}\n\n.drop-transform-palette[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  border-color: #e2e8f0;\n  background: #f1f5f9;\n  color: #94a3b8;\n  cursor: not-allowed;\n}\n\n.drop-transform-palette__option--active[_ngcontent-%COMP%] {\n  border-color: #fcbd00 !important;\n  background: #fff4cf !important;\n  color: #e5a900 !important;\n}\n\n.drop-transform-palette__cancel[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  background: #ffffff !important;\n  color: #64748b !important;\n}\n\n.mapping-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n  border-top: 1px solid #dfe5ef;\n  background: #ffffff;\n  padding: 12px;\n}\n\n.mapping-list__header[_ngcontent-%COMP%], \n.mapping-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto auto;\n  align-items: center;\n  gap: 10px;\n}\n\n.mapping-list__header[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr auto;\n  color: #59677c;\n  font-size: 0.84rem;\n  font-weight: 700;\n}\n\n.mapping-list__header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #172033;\n  font-size: 0.95rem;\n  font-weight: 760;\n}\n\n.mapping-row[_ngcontent-%COMP%] {\n  border: 1px solid #dfe5ef;\n  border-radius: 8px;\n  background: #f8fafc;\n  color: #172033;\n  font-size: 0.85rem;\n  font-weight: 650;\n  padding: 8px 10px;\n  transition: border-color 140ms ease, background 140ms ease;\n}\n\n.mapping-row--highlighted[_ngcontent-%COMP%] {\n  border-color: #fcbd00;\n  background: #fff7df;\n}\n\n.mapping-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  overflow-wrap: anywhere;\n}\n\n.mapping-row__arrow[_ngcontent-%COMP%] {\n  color: #000000;\n  font-weight: 800;\n}\n\n.mapping-row__transform[_ngcontent-%COMP%] {\n  border: 1px solid #cfd8e6;\n  border-radius: 999px;\n  background: #ffffff;\n  color: #475569;\n  padding: 4px 8px;\n}\n\n.bottom-panel[_ngcontent-%COMP%] {\n  overflow: hidden;\n}\n\n.tab-list[_ngcontent-%COMP%] {\n  display: flex;\n  border-bottom: 1px solid #dfe5ef;\n  background: #f8fafc;\n}\n\n.tab-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 42px;\n  border: 0;\n  border-right: 1px solid #dfe5ef;\n  background: transparent;\n  color: #475569;\n  cursor: pointer;\n  font-weight: 760;\n  padding: 10px 16px;\n}\n\n.tab-button--active[_ngcontent-%COMP%] {\n  background: #ffffff !important;\n  color: #172033 !important;\n}\n\n.tab-panel[_ngcontent-%COMP%] {\n  min-height: 104px;\n  padding: 16px;\n}\n\n.tab-panel[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #475569;\n  font-weight: 650;\n}\n\n.property-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 14px;\n  margin: 0;\n}\n\n.property-grid[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.property-grid[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 0.78rem;\n  font-weight: 760;\n  text-transform: uppercase;\n}\n\n.property-grid[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 5px 0 0;\n  color: #172033;\n  font-weight: 680;\n  overflow-wrap: anywhere;\n}\n\n.warning-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 6px;\n  margin: 0;\n  padding-left: 20px;\n  color: #9f2418;\n  font-weight: 650;\n}\n\n.state-message[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #5d6b82;\n  font-weight: 650;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #64748b;\n  font-size: 0.88rem;\n  font-weight: 650;\n}\n\n.feedback[_ngcontent-%COMP%] {\n  min-height: 48px;\n}\n\n.alert[_ngcontent-%COMP%] {\n  margin: 0;\n  border-radius: 8px;\n  padding: 14px 16px;\n  font-weight: 650;\n  line-height: 1.45;\n}\n\n.alert--success[_ngcontent-%COMP%] {\n  border: 1px solid #8bd2bd;\n  background: #eaf8f3;\n  color: #0f6654;\n}\n\n.alert--error[_ngcontent-%COMP%] {\n  border: 1px solid #f0a8a0;\n  background: #fff0ed;\n  color: #9f2418;\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  border-top: 1px solid #dfe5ef;\n  padding-top: 18px;\n}\n\n.form-actions__right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n\n.template-action[_ngcontent-%COMP%] {\n  min-height: 40px;\n  border: 1px solid #111827;\n  border-radius: 8px;\n  background: #fff4cf;\n  color: #111827;\n  cursor: pointer;\n  font-weight: 800;\n  padding: 9px 14px;\n}\n\n.template-action[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #fcbd00;\n}\n\n.template-action[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: .6;\n}\n\n.template-saved-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  min-height: 36px;\n  align-items: center;\n  border: 1px solid #111827;\n  border-radius: 999px;\n  background: #fcbd00;\n  color: #111827;\n  font-size: .8rem;\n  font-weight: 850;\n  padding: 7px 12px;\n}\n\n.modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 30;\n  display: grid;\n  place-items: center;\n  background: rgb(15 23 42 / 34%);\n  padding: 20px;\n}\n\n.required-fields-modal[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 14px;\n  width: min(460px, 100%);\n  border: 1px solid #f0a8a0;\n  border-radius: 8px;\n  background: #ffffff;\n  box-shadow: 0 24px 60px rgb(23 32 51 / 24%);\n  padding: 22px;\n}\n\n.required-fields-modal[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #9f2418;\n  font-size: 1.1rem;\n  font-weight: 800;\n}\n\n.required-fields-modal[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #172033;\n  font-weight: 680;\n  line-height: 1.5;\n  overflow-wrap: anywhere;\n}\n\n.required-fields-modal[_ngcontent-%COMP%]   .primary-action[_ngcontent-%COMP%] {\n  justify-self: end;\n}\n\n.mapping-warning-modal[_ngcontent-%COMP%] {\n  width: min(680px, 100%);\n}\n\n.fixed-width-modal[_ngcontent-%COMP%] {\n  width: min(1040px, 100%);\n  max-height: min(760px, 92vh);\n  overflow: auto;\n  border-color: #111827;\n}\n\n.fixed-width-modal__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: start;\n  justify-content: space-between;\n  gap: 14px;\n}\n\n.fixed-width-modal__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #111827;\n}\n\n.fixed-width-modal__header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  border: 1px solid #111827;\n  border-radius: 999px;\n  background: #fcbd00;\n  color: #111827;\n  font-size: 0.82rem;\n  font-weight: 800;\n  padding: 5px 10px;\n  white-space: nowrap;\n}\n\n.fixed-width-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n  overflow-x: auto;\n}\n\n.fixed-width-grid__row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(130px, 1fr) minmax(150px, 1.2fr) minmax(110px, 0.75fr) minmax(98px, 0.55fr) minmax(98px, 0.55fr) minmax(82px, 0.45fr);\n  gap: 8px;\n  min-width: 760px;\n  align-items: center;\n}\n\n.fixed-width-grid__row--required-missing[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.fixed-width-grid__row--required-missing[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.fixed-width-grid__row--required-missing[_ngcontent-%COMP%]   output[_ngcontent-%COMP%] {\n  border-color: #f0a8a0;\n  background: #fff7f5;\n}\n\n.fixed-width-grid__row--head[_ngcontent-%COMP%] {\n  color: #111827;\n  font-size: 0.75rem;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n\n.fixed-width-grid[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.fixed-width-grid[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.fixed-width-grid[_ngcontent-%COMP%]   output[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 38px;\n  border: 1px solid #cfd8e6;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #172033;\n  font-weight: 700;\n  padding: 8px 10px;\n}\n\n.fixed-width-grid[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.fixed-width-grid[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  border-color: #fcbd00;\n  box-shadow: 0 0 0 3px rgb(252 189 0 / 18%);\n  outline: none;\n}\n\n.fixed-width-grid[_ngcontent-%COMP%]   output[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  border-color: #111827;\n  background: #fff7df;\n}\n\n.mapping-warning-modal[_ngcontent-%COMP%]   .warning-list[_ngcontent-%COMP%] {\n  max-height: 260px;\n  overflow: auto;\n  border: 1px solid #f0d48a;\n  border-radius: 8px;\n  background: #fff9e8;\n  padding: 14px 18px 14px 32px;\n}\n\n.modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 10px;\n}\n\n.primary-action[_ngcontent-%COMP%], \n.secondary-action[_ngcontent-%COMP%], \n.back-action[_ngcontent-%COMP%], \n.delete-action[_ngcontent-%COMP%] {\n  min-height: 40px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 760;\n  transition: background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;\n}\n\n.primary-action[_ngcontent-%COMP%] {\n  min-width: 132px;\n  border: 0;\n  background: #fcbd00;\n  color: #ffffff;\n  padding: 10px 18px;\n}\n\n.primary-action[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #e5a900;\n  box-shadow: 0 12px 24px rgb(252 189 0 / 22%);\n  transform: translateY(-1px);\n}\n\n.secondary-action[_ngcontent-%COMP%], \n.back-action[_ngcontent-%COMP%] {\n  border: 1px solid #cfd8e6;\n  background: #ffffff;\n  color: #172033;\n  padding: 9px 14px;\n}\n\n.secondary-action[_ngcontent-%COMP%]:hover:not(:disabled), \n.back-action[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: #e5a900;\n  box-shadow: 0 8px 20px rgb(23 32 51 / 8%);\n}\n\n.delete-action[_ngcontent-%COMP%] {\n  border: 1px solid #f0a8a0;\n  background: #fff7f5;\n  color: #9f2418;\n  padding: 6px 10px;\n}\n\n.delete-action[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #fff0ed;\n}\n\n.primary-action[_ngcontent-%COMP%]:focus-visible, \n.secondary-action[_ngcontent-%COMP%]:focus-visible, \n.back-action[_ngcontent-%COMP%]:focus-visible, \n.delete-action[_ngcontent-%COMP%]:focus-visible, \n.schema-field[_ngcontent-%COMP%]:focus-visible, \n.canvas-node[_ngcontent-%COMP%]:focus-visible, \n.tab-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid rgb(252 189 0 / 24%);\n  outline-offset: 2px;\n}\n\n.primary-action[_ngcontent-%COMP%]:disabled, \n.secondary-action[_ngcontent-%COMP%]:disabled, \n.back-action[_ngcontent-%COMP%]:disabled, \n.delete-action[_ngcontent-%COMP%]:disabled, \n.ai-match-action[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.62;\n  box-shadow: none;\n  transform: none;\n}\n\n@media (max-width: 1180px) {\n  .mapper-workbench[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .schema-panel[_ngcontent-%COMP%], \n   .canvas-panel[_ngcontent-%COMP%] {\n    min-height: auto;\n  }\n}\n\n@media (max-width: 720px) {\n  .map-page[_ngcontent-%COMP%] {\n    padding: 28px 16px;\n  }\n\n  .panel-header--canvas[_ngcontent-%COMP%], \n   .form-actions[_ngcontent-%COMP%], \n   .form-actions__right[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .canvas-toolbar[_ngcontent-%COMP%] {\n    justify-content: stretch;\n  }\n\n  .canvas-toolbar[_ngcontent-%COMP%]   label[_ngcontent-%COMP%], \n   .canvas-toolbar[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n   .primary-action[_ngcontent-%COMP%], \n   .secondary-action[_ngcontent-%COMP%], \n   .back-action[_ngcontent-%COMP%], \n   .delete-action[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .property-grid[_ngcontent-%COMP%], \n   .mapping-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .canvas-column[_ngcontent-%COMP%] {\n    width: 150px;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VisualMappingPageComponent, [{
        type: Component,
        args: [{ selector: 'app-visual-mapping-page', standalone: true, imports: [CommonModule, WizardStepperComponent], template: "<main class=\"map-page\">\n  <section class=\"wizard-shell\" aria-labelledby=\"map-title\">\n    <header class=\"wizard-header\">\n      <h1 id=\"map-title\">Yeni Mapping Olu\u015Ftur</h1>\n      <app-wizard-stepper [currentStep]=\"2\"></app-wizard-stepper>\n\n      <div class=\"mapping-summary\" *ngIf=\"mapping\">\n        <span class=\"mapping-summary__name\">{{ mapping.name }}</span>\n        <span class=\"schema-badge schema-badge--source\">{{ mapping.sourceType }}</span>\n        <span class=\"schema-badge schema-badge--target\">{{ mapping.targetType }}</span>\n      </div>\n    </header>\n\n    <p class=\"state-message\" *ngIf=\"isLoading\">Mapping bilgisi y\u00FCkleniyor...</p>\n    <p class=\"alert alert--error\" *ngIf=\"!isLoading && loadError\">{{ loadError }}</p>\n\n    <section class=\"mapper-shell\" *ngIf=\"!isLoading && mapping && !loadError\">\n      <div class=\"mapper-workbench\">\n        <aside class=\"schema-panel\">\n          <header class=\"panel-header\">\n            <div>\n              <p class=\"panel-eyebrow\">Source specification</p>\n              <h2>Kaynak Alanlar</h2>\n            </div>\n            <span class=\"field-count\">{{ sourceFields.length }}</span>\n          </header>\n\n          <p class=\"schema-name\">{{ mapping.sourceSchema?.sourceName }}</p>\n\n          <div class=\"schema-field-list\">\n            <button\n              class=\"schema-field\"\n              type=\"button\"\n              *ngFor=\"let field of sourceFields; trackBy: trackByFieldName\"\n              [class.schema-field--selected]=\"selectedSourceField === field.name\"\n              (click)=\"selectSourceField(field.name)\"\n            >\n              <span class=\"field-name\">{{ getSourceFieldLabel(field) }}</span>\n              <span class=\"field-meta\">{{ field.type }}<span *ngIf=\"field.required\"> \u00B7 required</span></span>\n              <span class=\"source-usage\" *ngIf=\"getSourceMappingCount(field.name) as usageCount\">\n                {{ usageCount }} e\u015Fle\u015Fme\n              </span>\n            </button>\n\n            <section class=\"fixed-width-pending-panel\" *ngIf=\"pendingFixedWidthTargetFields.length > 0\">\n              <div class=\"fixed-width-pending-panel__header\">\n                <div>\n                  <strong>Bekleyen sabit geni\u015Flik alanlar\u0131</strong>\n                  <span>{{ pendingFixedWidthTargetFields.length }} alan</span>\n                </div>\n                <span class=\"fixed-width-pending-panel__required\" *ngIf=\"requiredPendingFixedWidthTargetFields.length > 0\">\n                  {{ requiredPendingFixedWidthTargetFields.length }} zorunlu\n                </span>\n              </div>\n\n              <ul class=\"fixed-width-pending-list\">\n                <li *ngFor=\"let field of pendingFixedWidthTargetFields; trackBy: trackByFieldName\">\n                  <span>{{ getTargetFieldLabel(field) }}</span>\n                  <strong *ngIf=\"field.required\">Zorunlu</strong>\n                </li>\n              </ul>\n\n              <button class=\"secondary-action\" type=\"button\" (click)=\"openDeferredFixedWidthPositions()\">\n                Pozisyonlar\u0131 Tan\u0131mla\n              </button>\n            </section>\n          </div>\n        </aside>\n\n        <section class=\"canvas-panel\">\n          <header class=\"panel-header panel-header--canvas\">\n            <div>\n              <p class=\"panel-eyebrow\">Mapping surface</p>\n              <h2>Mapping Canvas</h2>\n            </div>\n          </header>\n\n          <div class=\"selection-strip\">\n            <span>Kaynak alan\u0131n sa\u011F\u0131ndaki ba\u011Flant\u0131 noktas\u0131ndan hedef alan\u0131n solundaki noktaya ok \u00E7ekin.</span>\n            <button class=\"auto-match-action\" type=\"button\" (click)=\"autoMatchFields()\">Otomatik E\u015Fle</button>\n            <button\n              class=\"ai-match-action\"\n              type=\"button\"\n              (click)=\"aiMatchFields()\"\n              [disabled]=\"isAiMatching || sourceFields.length === 0 || targetFields.length === 0\"\n            >\n              <span *ngIf=\"!isAiMatching\">AI ile E\u015Fle</span>\n              <span *ngIf=\"isAiMatching\">AI d\u00FC\u015F\u00FCn\u00FCyor...</span>\n            </button>\n            <button\n              class=\"clear-mappings-action\"\n              type=\"button\"\n              *ngIf=\"mappingDefinitions.length > 0\"\n              (click)=\"requestClearMappings()\"\n            >\n              T\u00FCm\u00FCn\u00FC Sil\n            </button>\n            <span *ngIf=\"draggedSourceField\">Ok ba\u015Flang\u0131c\u0131: {{ getSourceLabelByName(draggedSourceField) }}</span>\n            <span *ngIf=\"pendingConnection\">\n              Se\u00E7iliyor: {{ getSourceLabelByName(pendingConnection.sourceField) }} \u2192 {{ getTargetLabelByName(pendingConnection.targetField) }}\n            </span>\n            <span class=\"auto-match-message\" *ngIf=\"autoMatchMessage\">{{ autoMatchMessage }}</span>\n            <span class=\"ai-match-message\" *ngIf=\"aiMatchMessage\">{{ aiMatchMessage }}</span>\n          </div>\n\n          <div\n            class=\"canvas-grid\"\n            [style.min-height.px]=\"canvasHeight\"\n            (dragover)=\"allowDragOverGap($event)\"\n          >\n            <svg\n              class=\"connection-layer\"\n              [attr.viewBox]=\"'0 0 1000 ' + canvasHeight\"\n              preserveAspectRatio=\"none\"\n              aria-hidden=\"true\"\n            >\n              <defs>\n                <marker\n                  id=\"connection-arrow\"\n                  markerWidth=\"10\"\n                  markerHeight=\"10\"\n                  refX=\"9\"\n                  refY=\"5\"\n                  orient=\"auto\"\n                  markerUnits=\"strokeWidth\"\n                >\n                  <path d=\"M 0 0 L 10 5 L 0 10 z\" fill=\"#000000\" />\n                </marker>\n                <marker\n                  id=\"connection-arrow-highlighted\"\n                  markerWidth=\"10\"\n                  markerHeight=\"10\"\n                  refX=\"9\"\n                  refY=\"5\"\n                  orient=\"auto\"\n                  markerUnits=\"strokeWidth\"\n                >\n                  <path d=\"M 0 0 L 10 5 L 0 10 z\" fill=\"#fcbd00\" />\n                </marker>\n                <marker\n                  id=\"connection-arrow-dimmed\"\n                  markerWidth=\"10\"\n                  markerHeight=\"10\"\n                  refX=\"9\"\n                  refY=\"5\"\n                  orient=\"auto\"\n                  markerUnits=\"strokeWidth\"\n                >\n                  <path d=\"M 0 0 L 10 5 L 0 10 z\" fill=\"#c7cdd6\" />\n                </marker>\n              </defs>\n\n              <ng-container *ngFor=\"let mappingDefinition of mappingDefinitions\">\n                <path\n                  class=\"connection-line\"\n                  *ngFor=\"let sourceField of getConnectionSourceFields(mappingDefinition)\"\n                  [class.connection-line--highlighted]=\"isMappingHighlighted(mappingDefinition.targetField)\"\n                  [class.connection-line--dimmed]=\"isMappingDimmed(mappingDefinition.targetField)\"\n                  [style.marker-end]=\"'url(#' + getMarkerId(mappingDefinition.targetField) + ')'\"\n                  [attr.d]=\"getConnectionPath(sourceField, mappingDefinition)\"\n                />\n                <g\n                  class=\"connection-function\"\n                  [class.connection-function--highlighted]=\"isMappingHighlighted(mappingDefinition.targetField)\"\n                  [class.connection-function--dimmed]=\"isMappingDimmed(mappingDefinition.targetField)\"\n                  [attr.transform]=\"'translate(' + getConnectionLabelX(mappingDefinition) + ' ' + getConnectionLabelY(mappingDefinition) + ')'\"\n                >\n                  <rect x=\"-34\" y=\"-13\" width=\"68\" height=\"26\" rx=\"6\" />\n                  <text text-anchor=\"middle\" y=\"4\">{{ getFunctionNodeLabel(mappingDefinition) }}</text>\n                </g>\n              </ng-container>\n\n              <line\n                class=\"connection-line connection-line--preview\"\n                *ngIf=\"draggedSourceField\"\n                [attr.x1]=\"getSourcePortX(draggedSourceField)\"\n                [attr.y1]=\"getSourceLineY(draggedSourceField)\"\n                [attr.x2]=\"dragPreviewEndX\"\n                [attr.y2]=\"dragPreviewEndY\"\n              />\n              <circle\n                class=\"connection-preview-end\"\n                *ngIf=\"draggedSourceField\"\n                [attr.cx]=\"dragPreviewEndX\"\n                [attr.cy]=\"dragPreviewEndY\"\n                r=\"7\"\n              />\n            </svg>\n\n            <div class=\"canvas-column canvas-column--source\">\n              <button\n                class=\"canvas-node\"\n                type=\"button\"\n                *ngFor=\"let field of sourceFields; trackBy: trackByFieldName\"\n                [class.canvas-node--selected]=\"selectedSourceField === field.name\"\n                [attr.title]=\"getSourceUsageLabel(field.name)\"\n                (click)=\"selectSourceField(field.name)\"\n                (mouseenter)=\"setHoveredSourceField(field.name)\"\n                (mouseleave)=\"clearHoveredMapping()\"\n              >\n                <span class=\"canvas-node__content\">\n                  <span class=\"canvas-node__label\">{{ getCanvasFieldName(field) }}</span>\n                  <span class=\"canvas-node__meta\">{{ field.type }}</span>\n                </span>\n                <span\n                  class=\"connector-port connector-port--source\"\n                  [attr.data-field-name]=\"field.name\"\n                  draggable=\"true\"\n                  title=\"Ba\u011Flant\u0131 ba\u015Flat\"\n                  (dragstart)=\"startSourceDrag($event, field.name)\"\n                  (dragend)=\"endSourceDrag()\"\n                ></span>\n              </button>\n            </div>\n\n            <div\n              class=\"canvas-column canvas-column--target\"\n              (dragover)=\"allowDragOverGap($event)\"\n              (drop)=\"dropOnNearestTarget($event)\"\n            >\n              <section class=\"canvas-field-group\" *ngIf=\"requiredTargetFields.length > 0\" (dragover)=\"allowDragOverGap($event)\">\n                <div class=\"canvas-field-group__header canvas-field-group__header--required\">Zorunlu</div>\n\n                <div\n                  class=\"target-drop-zone\"\n                  *ngFor=\"let field of requiredTargetFields; trackBy: trackByFieldName\"\n                  [attr.data-field-name]=\"field.name\"\n                  [class.target-drop-zone--active]=\"dragTargetField === field.name\"\n                  [class.target-drop-zone--pending]=\"isPendingTarget(field.name)\"\n                  (dragenter)=\"enterTargetDropZone($event, field.name)\"\n                  (dragover)=\"enterTargetDropZone($event, field.name)\"\n                  (dragleave)=\"leaveTargetDropZone($event, field.name)\"\n                  (drop)=\"dropOnTarget($event, field.name)\"\n                >\n                  <button\n                    class=\"canvas-node canvas-node--required\"\n                    type=\"button\"\n                    [class.canvas-node--selected]=\"selectedTargetField === field.name\"\n                    [class.canvas-node--mapped]=\"isTargetMapped(field.name)\"\n                    [class.canvas-node--required-missing]=\"isRequiredTargetUnmapped(field.name)\"\n                    (click)=\"selectTargetField(field.name)\"\n                    (mouseenter)=\"setHoveredTargetField(field.name)\"\n                    (mouseleave)=\"clearHoveredMapping()\"\n                    (dragenter)=\"enterTargetDropZone($event, field.name)\"\n                    (dragover)=\"enterTargetDropZone($event, field.name)\"\n                    (drop)=\"dropOnTarget($event, field.name)\"\n                  >\n                    <span\n                      class=\"connector-port connector-port--target\"\n                      [attr.data-field-name]=\"field.name\"\n                      title=\"Ba\u011Flant\u0131y\u0131 buraya b\u0131rak\"\n                      (dragenter)=\"enterTargetDropZone($event, field.name)\"\n                      (dragover)=\"enterTargetDropZone($event, field.name)\"\n                      (drop)=\"dropOnTarget($event, field.name)\"\n                    ></span>\n                    <span class=\"canvas-node__content\">\n                      <span class=\"canvas-node__label\">{{ getCanvasFieldName(field) }}</span>\n                    </span>\n                    <span class=\"canvas-node__badges\">\n                      <span class=\"canvas-node__type\">{{ field.type }}</span>\n                      <span class=\"canvas-node__badge\">required</span>\n                    </span>\n                  </button>\n\n                  <div class=\"drop-transform-palette\" *ngIf=\"isPendingTarget(field.name) && pendingConnection as pending\">\n                    <div class=\"drop-transform-palette__summary\">\n                      <span>{{ getSourceLabelByName(pending.sourceField) }}</span>\n                      <strong>{{ getTargetLabelByName(pending.targetField) }}</strong>\n                    </div>\n                    <button\n                      type=\"button\"\n                      *ngFor=\"let transform of transformOptions\"\n                      [class.drop-transform-palette__option--active]=\"selectedTransformType === transform\"\n                      [disabled]=\"!canUsePendingTransform(transform)\"\n                      [attr.title]=\"getPendingTransformTitle(transform)\"\n                      (click)=\"choosePendingTransform(transform)\"\n                    >\n                      {{ transform }}\n                    </button>\n                    <button class=\"drop-transform-palette__cancel\" type=\"button\" (click)=\"cancelPendingConnection()\">\n                      Vazge\u00E7\n                    </button>\n                  </div>\n                </div>\n              </section>\n\n              <section class=\"canvas-field-group\" *ngIf=\"optionalTargetFields.length > 0\" (dragover)=\"allowDragOverGap($event)\">\n                <div class=\"canvas-field-group__header\">Di\u011Fer</div>\n\n                <div\n                  class=\"target-drop-zone\"\n                  *ngFor=\"let field of optionalTargetFields; trackBy: trackByFieldName\"\n                  [attr.data-field-name]=\"field.name\"\n                  [class.target-drop-zone--active]=\"dragTargetField === field.name\"\n                  [class.target-drop-zone--pending]=\"isPendingTarget(field.name)\"\n                  (dragenter)=\"enterTargetDropZone($event, field.name)\"\n                  (dragover)=\"enterTargetDropZone($event, field.name)\"\n                  (dragleave)=\"leaveTargetDropZone($event, field.name)\"\n                  (drop)=\"dropOnTarget($event, field.name)\"\n                >\n                  <button\n                    class=\"canvas-node\"\n                    type=\"button\"\n                    [class.canvas-node--selected]=\"selectedTargetField === field.name\"\n                    [class.canvas-node--mapped]=\"isTargetMapped(field.name)\"\n                    (click)=\"selectTargetField(field.name)\"\n                    (mouseenter)=\"setHoveredTargetField(field.name)\"\n                    (mouseleave)=\"clearHoveredMapping()\"\n                    (dragenter)=\"enterTargetDropZone($event, field.name)\"\n                    (dragover)=\"enterTargetDropZone($event, field.name)\"\n                    (drop)=\"dropOnTarget($event, field.name)\"\n                  >\n                    <span\n                      class=\"connector-port connector-port--target\"\n                      [attr.data-field-name]=\"field.name\"\n                      title=\"Ba\u011Flant\u0131y\u0131 buraya b\u0131rak\"\n                      (dragenter)=\"enterTargetDropZone($event, field.name)\"\n                      (dragover)=\"enterTargetDropZone($event, field.name)\"\n                      (drop)=\"dropOnTarget($event, field.name)\"\n                    ></span>\n                    <span class=\"canvas-node__content\">\n                      <span class=\"canvas-node__label\">{{ getCanvasFieldName(field) }}</span>\n                    </span>\n                    <span class=\"canvas-node__badges\">\n                      <span class=\"canvas-node__type\">{{ field.type }}</span>\n                    </span>\n                  </button>\n\n                  <div class=\"drop-transform-palette\" *ngIf=\"isPendingTarget(field.name) && pendingConnection as pending\">\n                    <div class=\"drop-transform-palette__summary\">\n                      <span>{{ getSourceLabelByName(pending.sourceField) }}</span>\n                      <strong>{{ getTargetLabelByName(pending.targetField) }}</strong>\n                    </div>\n                    <button\n                      type=\"button\"\n                      *ngFor=\"let transform of transformOptions\"\n                      [class.drop-transform-palette__option--active]=\"selectedTransformType === transform\"\n                      [disabled]=\"!canUsePendingTransform(transform)\"\n                      [attr.title]=\"getPendingTransformTitle(transform)\"\n                      (click)=\"choosePendingTransform(transform)\"\n                    >\n                      {{ transform }}\n                    </button>\n                    <button class=\"drop-transform-palette__cancel\" type=\"button\" (click)=\"cancelPendingConnection()\">\n                      Vazge\u00E7\n                    </button>\n                  </div>\n                </div>\n              </section>\n            </div>\n          </div>\n\n          <section class=\"mapping-list\" aria-label=\"Mevcut e\u015Fle\u015Ftirmeler\">\n            <div class=\"mapping-list__header\">\n              <h3>Ba\u011Flant\u0131lar</h3>\n              <span>{{ mappingDefinitions.length }} mapping</span>\n            </div>\n\n            <p class=\"empty-state\" *ngIf=\"mappingDefinitions.length === 0\">\n              \u0130lk e\u015Fle\u015Ftirmeyi olu\u015Fturmak i\u00E7in kaynak alan\u0131 hedef alan\u0131n \u00FCzerine b\u0131rak\u0131n ve ba\u011Flama t\u00FCr\u00FCn\u00FC se\u00E7in.\n            </p>\n\n            <div\n              class=\"mapping-row\"\n              *ngFor=\"let mappingDefinition of mappingDefinitions\"\n              [class.mapping-row--highlighted]=\"isMappingHighlighted(mappingDefinition.targetField)\"\n              (mouseenter)=\"setHoveredMapping(mappingDefinition.targetField)\"\n              (mouseleave)=\"clearHoveredMapping()\"\n            >\n              <span>{{ getMappingSourceLabel(mappingDefinition) }}</span>\n              <span class=\"mapping-row__arrow\">\u2192</span>\n              <span>{{ getTargetLabelByName(mappingDefinition.targetField) }}</span>\n              <span class=\"mapping-row__transform\">{{ mappingDefinition.transformType }}</span>\n              <button class=\"delete-action\" type=\"button\" (click)=\"removeMapping(mappingDefinition.targetField)\">Sil</button>\n            </div>\n          </section>\n        </section>\n\n        <aside class=\"schema-panel\">\n          <header class=\"panel-header\">\n            <div>\n              <p class=\"panel-eyebrow\">Destination specification</p>\n              <h2>Hedef Alanlar</h2>\n            </div>\n            <span class=\"field-count\">{{ targetFields.length }}</span>\n          </header>\n\n          <p class=\"schema-name\">{{ mapping.targetSchema?.targetName }}</p>\n\n          <div class=\"schema-field-list\">\n            <section class=\"schema-field-group\" *ngIf=\"requiredTargetFields.length > 0\">\n              <div class=\"schema-field-group__header schema-field-group__header--required\">\n                <span>Zorunlu Alanlar</span>\n                <strong>{{ requiredTargetFields.length }}</strong>\n              </div>\n\n              <button\n                class=\"schema-field schema-field--required schema-target-drop\"\n                type=\"button\"\n                *ngFor=\"let field of requiredTargetFields; trackBy: trackByFieldName\"\n                [attr.data-field-name]=\"field.name\"\n                [class.schema-field--selected]=\"selectedTargetField === field.name\"\n                [class.schema-field--mapped]=\"isTargetMapped(field.name)\"\n                [class.schema-field--required-missing]=\"isRequiredTargetUnmapped(field.name)\"\n                (click)=\"selectTargetField(field.name)\"\n                (dragenter)=\"enterTargetDropZone($event, field.name)\"\n                (dragover)=\"enterTargetDropZone($event, field.name)\"\n                (dragleave)=\"leaveTargetDropZone($event, field.name)\"\n                (drop)=\"dropOnTarget($event, field.name)\"\n              >\n                <span class=\"field-name\">{{ getTargetFieldLabel(field) }}</span>\n                <span class=\"field-meta\">{{ field.type }} \u00B7 zorunlu</span>\n                <span class=\"mapped-from\" *ngIf=\"getMappingForTarget(field.name) as mappingDefinition\">\n                  {{ getMappingSourceLabel(mappingDefinition) }}\n                </span>\n              </button>\n            </section>\n\n            <section class=\"schema-field-group\" *ngIf=\"optionalTargetFields.length > 0\">\n              <div class=\"schema-field-group__header\">\n                <span>Di\u011Fer Alanlar</span>\n                <strong>{{ optionalTargetFields.length }}</strong>\n              </div>\n\n              <button\n                class=\"schema-field schema-target-drop\"\n                type=\"button\"\n                *ngFor=\"let field of optionalTargetFields; trackBy: trackByFieldName\"\n                [attr.data-field-name]=\"field.name\"\n                [class.schema-field--selected]=\"selectedTargetField === field.name\"\n                [class.schema-field--mapped]=\"isTargetMapped(field.name)\"\n                (click)=\"selectTargetField(field.name)\"\n                (dragenter)=\"enterTargetDropZone($event, field.name)\"\n                (dragover)=\"enterTargetDropZone($event, field.name)\"\n                (dragleave)=\"leaveTargetDropZone($event, field.name)\"\n                (drop)=\"dropOnTarget($event, field.name)\"\n              >\n                <span class=\"field-name\">{{ getTargetFieldLabel(field) }}</span>\n                <span class=\"field-meta\">{{ field.type }}</span>\n                <span class=\"mapped-from\" *ngIf=\"getMappingForTarget(field.name) as mappingDefinition\">\n                  {{ getMappingSourceLabel(mappingDefinition) }}\n                </span>\n              </button>\n            </section>\n          </div>\n        </aside>\n      </div>\n\n      <section class=\"bottom-panel\">\n        <div class=\"tab-list\" role=\"tablist\" aria-label=\"Mapping bilgi panelleri\">\n          <button\n            type=\"button\"\n            role=\"tab\"\n            [attr.aria-selected]=\"activeBottomTab === 'properties'\"\n            [class.tab-button--active]=\"activeBottomTab === 'properties'\"\n            (click)=\"setActiveBottomTab('properties')\"\n          >\n            Properties\n          </button>\n          <button\n            type=\"button\"\n            role=\"tab\"\n            [attr.aria-selected]=\"activeBottomTab === 'output'\"\n            [class.tab-button--active]=\"activeBottomTab === 'output'\"\n            (click)=\"setActiveBottomTab('output')\"\n          >\n            Output\n          </button>\n          <button\n            type=\"button\"\n            role=\"tab\"\n            [attr.aria-selected]=\"activeBottomTab === 'warnings'\"\n            [class.tab-button--active]=\"activeBottomTab === 'warnings'\"\n            (click)=\"setActiveBottomTab('warnings')\"\n          >\n            Warnings\n          </button>\n        </div>\n\n        <div class=\"tab-panel\" *ngIf=\"activeBottomTab === 'properties'\">\n          <dl class=\"property-grid\">\n            <div>\n              <dt>Selected source</dt>\n              <dd>{{ selectedSourceFieldDetails ? getSourceFieldLabel(selectedSourceFieldDetails) : 'Se\u00E7ilmedi' }}</dd>\n            </div>\n            <div>\n              <dt>Selected target</dt>\n              <dd>{{ selectedTargetFieldDetails ? getTargetFieldLabel(selectedTargetFieldDetails) : 'Se\u00E7ilmedi' }}</dd>\n            </div>\n            <div>\n              <dt>Transform</dt>\n              <dd>{{ selectedTransformType }}</dd>\n            </div>\n          </dl>\n        </div>\n\n        <div class=\"tab-panel\" *ngIf=\"activeBottomTab === 'output'\">\n          <p>{{ mappedTargetCount }} hedef alan e\u015Fle\u015Fti. Toplam {{ mappingDefinitions.length }} ba\u011Flant\u0131 var.</p>\n        </div>\n\n        <div class=\"tab-panel\" *ngIf=\"activeBottomTab === 'warnings'\">\n          <p class=\"empty-state\" *ngIf=\"warnings.length === 0 && mappingValidationWarnings.length === 0\">Uyar\u0131 yok.</p>\n          <ul class=\"warning-list\" *ngIf=\"warnings.length > 0 || mappingValidationWarnings.length > 0\">\n            <li *ngFor=\"let warning of warnings\">{{ warning }}</li>\n            <li *ngFor=\"let warning of mappingValidationWarnings\">{{ warning }}</li>\n          </ul>\n        </div>\n      </section>\n\n      <div class=\"feedback\" aria-live=\"polite\">\n        <p class=\"alert alert--success\" *ngIf=\"successMessage\">{{ successMessage }}</p>\n        <p class=\"alert alert--error\" *ngIf=\"saveError\">{{ saveError }}</p>\n      </div>\n\n      <div class=\"form-actions\">\n        <button class=\"back-action\" type=\"button\" (click)=\"goBack()\" [disabled]=\"isSaving\">Geri</button>\n        <div class=\"form-actions__right\">\n          <button\n            class=\"template-action\"\n            type=\"button\"\n            *ngIf=\"mapping && !mapping.sourceTemplateId && !mapping.isTemplate\"\n            (click)=\"markAsTemplate()\"\n            [disabled]=\"mappingDefinitions.length === 0 || isSaving || isMarkingTemplate\"\n          >\n            {{ isMarkingTemplate ? '\u015Eablon Kaydediliyor...' : '\u015Eablon Olarak Kaydet' }}\n          </button>\n          <span class=\"template-saved-badge\" *ngIf=\"mapping?.isTemplate\">\u015Eablon</span>\n          <button class=\"secondary-action\" type=\"button\" (click)=\"saveMappings()\" [disabled]=\"!canSubmitMappings\">\n            <span *ngIf=\"!isSaving\">Kaydet</span>\n            <span *ngIf=\"isSaving\">Kaydediliyor...</span>\n          </button>\n          <button class=\"primary-action\" type=\"button\" (click)=\"continueNext()\" [disabled]=\"!canSubmitMappings\">Devam Et</button>\n        </div>\n      </div>\n      </section>\n\n      <div\n        class=\"modal-backdrop\"\n        *ngIf=\"showFixedWidthPositionModal\"\n        role=\"presentation\"\n      >\n        <section\n          class=\"required-fields-modal fixed-width-modal\"\n          role=\"dialog\"\n          aria-modal=\"true\"\n          aria-labelledby=\"fixed-width-modal-title\"\n        >\n          <div class=\"fixed-width-modal__header\">\n            <div>\n              <h2 id=\"fixed-width-modal-title\">Sabit Geni\u015Flik Pozisyonlar\u0131</h2>\n              <p>Kaynak alanlar\u0131 olu\u015Fturmak i\u00E7in 1-based ba\u015Flang\u0131\u00E7 ve biti\u015F pozisyonlar\u0131n\u0131 girin.</p>\n            </div>\n            <span>{{ fixedWidthRawRecords.length }} sat\u0131r</span>\n          </div>\n\n          <div class=\"fixed-width-grid\" role=\"table\" aria-label=\"Sabit geni\u015Flik pozisyonlar\u0131\">\n            <div class=\"fixed-width-grid__row fixed-width-grid__row--head\" role=\"row\">\n              <span>Alan</span>\n              <span>G\u00F6r\u00FCnen Ad</span>\n              <span>Tip</span>\n              <span>Ba\u015Flang\u0131\u00E7</span>\n              <span>Biti\u015F</span>\n              <span>Uzunluk</span>\n            </div>\n\n            <div\n              class=\"fixed-width-grid__row\"\n              role=\"row\"\n              *ngFor=\"let row of fixedWidthPositionRows; let index = index\"\n              [class.fixed-width-grid__row--required-missing]=\"isFixedWidthRequiredMissing(row)\"\n            >\n              <input\n                type=\"text\"\n                [value]=\"row.name\"\n                (input)=\"updateFixedWidthPosition(index, 'name', $event)\"\n                autocomplete=\"off\"\n              >\n              <input\n                type=\"text\"\n                [value]=\"row.displayName\"\n                (input)=\"updateFixedWidthPosition(index, 'displayName', $event)\"\n                autocomplete=\"off\"\n              >\n              <select [value]=\"row.type\" (change)=\"updateFixedWidthPosition(index, 'type', $event)\">\n                <option *ngFor=\"let type of ['text', 'number', 'date', 'boolean', 'object', 'array']\" [value]=\"type\">{{ type }}</option>\n              </select>\n              <input\n                type=\"number\"\n                min=\"1\"\n                inputmode=\"numeric\"\n                [value]=\"row.startPosition ?? ''\"\n                (input)=\"updateFixedWidthPosition(index, 'startPosition', $event)\"\n              >\n              <input\n                type=\"number\"\n                min=\"1\"\n                inputmode=\"numeric\"\n                [value]=\"row.endPosition ?? ''\"\n                (input)=\"updateFixedWidthPosition(index, 'endPosition', $event)\"\n              >\n              <output>{{ getFixedWidthLength(row) }}</output>\n            </div>\n          </div>\n\n          <ul class=\"warning-list\" *ngIf=\"fixedWidthPositionErrors.length > 0\">\n            <li *ngFor=\"let error of fixedWidthPositionErrors\">{{ error }}</li>\n          </ul>\n\n          <div class=\"modal-actions\">\n            <button class=\"back-action\" type=\"button\" (click)=\"closeFixedWidthPositionModal()\" [disabled]=\"isSavingFixedWidthPositions\">\n              Sonra Tan\u0131mla\n            </button>\n            <button class=\"primary-action\" type=\"button\" (click)=\"saveFixedWidthPositions()\" [disabled]=\"!canSaveFixedWidthPositions\">\n              <span *ngIf=\"!isSavingFixedWidthPositions\">Kaynaklar\u0131 Olu\u015Ftur</span>\n              <span *ngIf=\"isSavingFixedWidthPositions\">Kaydediliyor...</span>\n            </button>\n          </div>\n        </section>\n      </div>\n\n      <div\n        class=\"modal-backdrop\"\n        *ngIf=\"requiredFieldsPopupMessage\"\n      role=\"presentation\"\n      (click)=\"closeRequiredFieldsPopup()\"\n    >\n      <section\n        class=\"required-fields-modal\"\n        role=\"alertdialog\"\n        aria-modal=\"true\"\n        aria-labelledby=\"required-fields-modal-title\"\n        (click)=\"$event.stopPropagation()\"\n      >\n        <h2 id=\"required-fields-modal-title\">Zorunlu Alanlar</h2>\n        <p>{{ requiredFieldsPopupMessage }}</p>\n        <div class=\"modal-actions\">\n          <button class=\"back-action\" type=\"button\" (click)=\"closeRequiredFieldsPopup()\">Geri D\u00F6n ve D\u00FCzenle</button>\n          <button\n            class=\"template-action\"\n            type=\"button\"\n            *ngIf=\"isTemplateSavePending\"\n            (click)=\"saveIncompleteAsTemplate()\"\n            [disabled]=\"isSaving || isMarkingTemplate\"\n          >\n            Eksik Haliyle \u015Eablon Kaydet\n          </button>\n        </div>\n      </section>\n    </div>\n\n    <div\n      class=\"modal-backdrop\"\n      *ngIf=\"clearMappingsPopupMessage\"\n      role=\"presentation\"\n      (click)=\"closeClearMappingsPopup()\"\n    >\n      <section\n        class=\"required-fields-modal\"\n        role=\"alertdialog\"\n        aria-modal=\"true\"\n        aria-labelledby=\"clear-mappings-modal-title\"\n        (click)=\"$event.stopPropagation()\"\n      >\n        <h2 id=\"clear-mappings-modal-title\">E\u015Fle\u015Ftirmeleri Sil</h2>\n        <p>{{ clearMappingsPopupMessage }}</p>\n        <div class=\"modal-actions\">\n          <button class=\"back-action\" type=\"button\" (click)=\"closeClearMappingsPopup()\">Vazge\u00E7</button>\n          <button class=\"primary-action\" type=\"button\" (click)=\"confirmClearMappings()\">T\u00FCm\u00FCn\u00FC Sil</button>\n        </div>\n      </section>\n    </div>\n\n    <div\n      class=\"modal-backdrop\"\n      *ngIf=\"mappingValidationWarnings.length > 0\"\n      role=\"presentation\"\n      (click)=\"closeMappingValidationWarnings()\"\n    >\n      <section\n        class=\"required-fields-modal mapping-warning-modal\"\n        role=\"alertdialog\"\n        aria-modal=\"true\"\n        aria-labelledby=\"mapping-warning-modal-title\"\n        (click)=\"$event.stopPropagation()\"\n      >\n        <h2 id=\"mapping-warning-modal-title\">E\u015Fleme Uyar\u0131lar\u0131</h2>\n        <p>Bu e\u015Flemeler hatal\u0131 olmayabilir ama kontrol edilmesi iyi olur.</p>\n        <ul class=\"warning-list\">\n          <li *ngFor=\"let warning of mappingValidationWarnings\">{{ warning }}</li>\n        </ul>\n        <div class=\"modal-actions\">\n          <button class=\"back-action\" type=\"button\" (click)=\"closeMappingValidationWarnings()\">Geri D\u00F6n ve D\u00FCzenle</button>\n          <button class=\"primary-action\" type=\"button\" (click)=\"continueDespiteMappingWarnings()\" [disabled]=\"isSaving\">\n            <span *ngIf=\"!isSaving\">\n              {{ isTemplateSavePending ? 'Uyar\u0131lara Ra\u011Fmen \u015Eablon Kaydet' : 'Yine de Devam Et' }}\n            </span>\n            <span *ngIf=\"isSaving\">Kaydediliyor...</span>\n          </button>\n        </div>\n      </section>\n    </div>\n\n    <div class=\"modal-backdrop\" *ngIf=\"isExitDialogOpen\" role=\"presentation\">\n      <section class=\"required-fields-modal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"mapping-exit-title\">\n        <h2 id=\"mapping-exit-title\">Kaydedilmemi\u015F e\u015Fle\u015Ftirmeler var</h2>\n        <p>\u00C7\u0131kmadan \u00F6nce e\u015Fle\u015Ftirmelerinizi kaydetmek ister misiniz?</p>\n        <p class=\"alert alert--error\" *ngIf=\"saveError\">{{ saveError }}</p>\n        <div class=\"modal-actions\">\n          <button class=\"primary-action\" type=\"button\" [disabled]=\"isSaving || isDiscarding\" (click)=\"saveMappingsAndLeave()\">\n            {{ isSaving ? 'Kaydediliyor...' : 'Kaydet ve \u00C7\u0131k' }}\n          </button>\n          <button class=\"delete-action\" type=\"button\" [disabled]=\"isSaving || isDiscarding\" (click)=\"discardMappingChangesAndLeave()\">\n            {{ isDiscarding ? 'Siliniyor...' : 'Kaydetmeden \u00C7\u0131k' }}\n          </button>\n          <button class=\"back-action\" type=\"button\" [disabled]=\"isSaving || isDiscarding\" (click)=\"stayOnMappingPage()\">Sayfada Kal</button>\n        </div>\n      </section>\n    </div>\n  </section>\n</main>\n", styles: [".map-page {\n  min-height: 100vh;\n  padding: 40px 20px;\n}\n\n.wizard-shell {\n  max-width: 1440px;\n  margin: 0 auto;\n}\n\n.wizard-header {\n  margin-bottom: 24px;\n}\n\n.wizard-header h1 {\n  margin: 0;\n  color: #111827;\n  font-size: clamp(1.65rem, 3.2vw, 2.35rem);\n  font-weight: 760;\n  letter-spacing: 0;\n  line-height: 1.08;\n}\n\n.mapping-summary {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 10px;\n  margin-top: 16px;\n}\n\n.mapping-summary__name {\n  color: #59677c;\n  font-size: 0.95rem;\n  font-weight: 650;\n}\n\n.schema-badge {\n  border-radius: 999px;\n  font-size: 0.82rem;\n  font-weight: 760;\n  padding: 5px 10px;\n}\n\n.schema-badge--source {\n  border: 1px solid #9dc0ff;\n  background: #fff4cf;\n  color: #e5a900;\n}\n\n.schema-badge--target {\n  border: 1px solid #8bd2bd;\n  background: #eaf8f3;\n  color: #0f6654;\n}\n\n.mapper-shell {\n  display: grid;\n  gap: 14px;\n}\n\n.mapper-workbench {\n  display: grid;\n  grid-template-columns: 280px minmax(560px, 1fr) 280px;\n  gap: 12px;\n  align-items: stretch;\n}\n\n.schema-panel,\n.canvas-panel,\n.bottom-panel {\n  border: 1px solid #cfd8e6;\n  border-radius: 8px;\n  background: #ffffff;\n}\n\n.schema-panel {\n  display: grid;\n  grid-template-rows: auto auto 1fr;\n  min-height: 560px;\n  overflow: hidden;\n}\n\n.canvas-panel {\n  display: grid;\n  grid-template-rows: auto auto 1fr auto;\n  min-height: 560px;\n  overflow: hidden;\n}\n\n.panel-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  border-bottom: 1px solid #dfe5ef;\n  background: #f8fafc;\n  padding: 14px 16px;\n}\n\n.panel-header--canvas {\n  align-items: end;\n}\n\n.panel-eyebrow {\n  margin: 0 0 4px;\n  color: #64748b;\n  font-size: 0.74rem;\n  font-weight: 760;\n  letter-spacing: 0;\n  text-transform: uppercase;\n}\n\n.panel-header h2 {\n  margin: 0;\n  color: #172033;\n  font-size: 1rem;\n  font-weight: 760;\n  letter-spacing: 0;\n}\n\n.field-count {\n  min-width: 32px;\n  border: 1px solid #cfd8e6;\n  border-radius: 999px;\n  background: #ffffff;\n  color: #334155;\n  font-size: 0.82rem;\n  font-weight: 760;\n  padding: 4px 8px;\n  text-align: center;\n}\n\n.schema-name {\n  margin: 0;\n  border-bottom: 1px solid #dfe5ef;\n  color: #59677c;\n  font-size: 0.88rem;\n  font-weight: 700;\n  padding: 12px 16px;\n}\n\n.schema-field-list {\n  display: grid;\n  align-content: start;\n  gap: 12px;\n  overflow: auto;\n  padding: 12px;\n}\n\n.fixed-width-pending-panel {\n  display: grid;\n  gap: 12px;\n  border: 1px solid #f0d48a;\n  border-radius: 8px;\n  background: #fff9e8;\n  padding: 12px;\n}\n\n.fixed-width-pending-panel__header {\n  display: flex;\n  align-items: start;\n  justify-content: space-between;\n  gap: 10px;\n}\n\n.fixed-width-pending-panel__header div {\n  display: grid;\n  gap: 3px;\n}\n\n.fixed-width-pending-panel__header strong {\n  color: #172033;\n  font-size: 0.9rem;\n  font-weight: 800;\n  line-height: 1.25;\n}\n\n.fixed-width-pending-panel__header span {\n  color: #64748b;\n  font-size: 0.78rem;\n  font-weight: 760;\n}\n\n.fixed-width-pending-panel__required {\n  border: 1px solid #fecaca;\n  border-radius: 999px;\n  background: #fff1f1;\n  color: #b91c1c;\n  font-size: 0.74rem;\n  font-weight: 800;\n  padding: 4px 8px;\n  white-space: nowrap;\n}\n\n.fixed-width-pending-list {\n  display: grid;\n  gap: 7px;\n  max-height: 180px;\n  overflow: auto;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\n.fixed-width-pending-list li {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  border: 1px solid #f3e1a8;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #172033;\n  font-size: 0.82rem;\n  font-weight: 720;\n  padding: 8px 10px;\n}\n\n.fixed-width-pending-list li span {\n  overflow-wrap: anywhere;\n}\n\n.fixed-width-pending-list li strong {\n  color: #b91c1c;\n  font-size: 0.72rem;\n  white-space: nowrap;\n}\n\n.schema-field-group {\n  display: grid;\n  gap: 8px;\n}\n\n.schema-field-group__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  color: #64748b;\n  font-size: 0.76rem;\n  font-weight: 800;\n  letter-spacing: 0;\n  text-transform: uppercase;\n}\n\n.schema-field-group__header strong {\n  min-width: 26px;\n  border: 1px solid #d7deea;\n  border-radius: 999px;\n  background: #ffffff;\n  color: #475569;\n  padding: 2px 7px;\n  text-align: center;\n}\n\n.schema-field-group__header--required {\n  color: #b91c1c;\n}\n\n.schema-field-group__header--required strong {\n  border-color: #fecaca;\n  background: #fff1f1;\n  color: #b91c1c;\n}\n\n.schema-field,\n.canvas-node {\n  width: 100%;\n  min-width: 0;\n  border: 1px solid #d7deea;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #172033;\n  cursor: pointer;\n  text-align: left;\n  transition: border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease;\n}\n\n.schema-field {\n  display: grid;\n  gap: 4px;\n  align-content: center;\n  min-height: 58px;\n  padding: 10px 12px;\n}\n\n.schema-field:hover,\n.canvas-node:hover {\n  border-color: #e5a900;\n  box-shadow: 0 8px 18px rgb(23 32 51 / 8%);\n}\n\n.schema-field--selected,\n.canvas-node--selected {\n  border-color: #fcbd00;\n  box-shadow: 0 0 0 3px rgb(252 189 0 / 14%);\n}\n\n.schema-field--mapped,\n.canvas-node--mapped {\n  background: #f7fffc;\n}\n\n.schema-field--required,\n.canvas-node--required {\n  border-color: #fecaca;\n  background: #fff7f7;\n}\n\n.schema-field--required-missing,\n.canvas-node--required-missing {\n  border-color: #dc2626;\n  background: #fff1f1;\n  color: #7f1d1d;\n}\n\n.schema-field--required-missing:hover,\n.canvas-node--required-missing:hover {\n  border-color: #b91c1c;\n  box-shadow: 0 8px 18px rgb(185 28 28 / 12%);\n}\n\n.schema-field--required-missing .field-meta {\n  color: #b91c1c;\n}\n\n.field-name {\n  overflow-wrap: anywhere;\n  font-size: 0.9rem;\n  font-weight: 760;\n  line-height: 1.25;\n  word-break: break-word;\n}\n\n.field-meta,\n.mapped-from {\n  overflow-wrap: anywhere;\n  color: #64748b;\n  font-size: 0.78rem;\n  font-weight: 650;\n  line-height: 1.25;\n  word-break: break-word;\n}\n\n.mapped-from {\n  color: #0f6654;\n}\n\n.source-usage {\n  color: #e5a900;\n  font-size: 0.76rem;\n  font-weight: 760;\n}\n\n.canvas-toolbar {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: end;\n  justify-content: flex-end;\n  gap: 10px;\n}\n\n.canvas-toolbar label {\n  display: grid;\n  gap: 5px;\n  color: #475569;\n  font-size: 0.78rem;\n  font-weight: 700;\n}\n\n.canvas-toolbar select {\n  min-height: 38px;\n  border: 1px solid #cfd8e6;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #172033;\n  padding: 8px 10px;\n}\n\n.selection-strip {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 10px;\n  border-bottom: 1px solid #dfe5ef;\n  color: #59677c;\n  font-size: 0.86rem;\n  font-weight: 680;\n  padding: 10px 16px;\n}\n\n.auto-match-action,\n.ai-match-action,\n.clear-mappings-action {\n  min-height: 32px;\n  border: 1px solid #111827;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 0.78rem;\n  font-weight: 800;\n  padding: 6px 10px;\n}\n\n.auto-match-action {\n  background: #fcbd00;\n  color: #111827;\n}\n\n.auto-match-action:hover {\n  background: #f2b400;\n}\n\n.ai-match-action {\n  background: #fcbd00;\n  color: #111827;\n}\n\n.ai-match-action:hover:not(:disabled) {\n  background: #f2b400;\n}\n\n.clear-mappings-action {\n  background: #ffffff;\n  color: #111827;\n}\n\n.clear-mappings-action:hover {\n  background: #fff7df;\n}\n\n.auto-match-message {\n  color: #0f6654;\n  font-weight: 760;\n}\n\n.ai-match-message {\n  color: #111827;\n  font-weight: 760;\n}\n\n.canvas-grid {\n  position: relative;\n  overflow: auto;\n  background-color: #fbfdff;\n  background-image:\n    linear-gradient(#e7edf6 1px, transparent 1px),\n    linear-gradient(90deg, #e7edf6 1px, transparent 1px);\n  background-size: 24px 24px;\n}\n\n.connection-layer {\n  position: absolute;\n  inset: 0;\n  z-index: 1;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n}\n\n.connection-line {\n  fill: none;\n  stroke: #000000;\n  stroke-linecap: round;\n  stroke-width: 3;\n  transition: stroke 140ms ease, stroke-width 140ms ease, opacity 140ms ease;\n}\n\n.connection-line--highlighted {\n  stroke: #fcbd00 !important;\n  stroke-width: 4.5;\n}\n\n.connection-line--dimmed {\n  stroke: #c7cdd6 !important;\n  opacity: 0.45;\n}\n\n.connection-line--preview {\n  fill: none;\n  stroke: #000000;\n  stroke-dasharray: 10 8;\n  stroke-width: 4;\n}\n\n.connection-preview-end {\n  fill: #000000;\n  stroke: #ffffff;\n  stroke-width: 3;\n}\n\n.connection-function rect {\n  fill: #ffffff;\n  stroke: #000000;\n  stroke-width: 2;\n  transition: stroke 140ms ease;\n}\n\n.connection-function text {\n  fill: #000000;\n  font-size: 12px;\n  font-weight: 760;\n  paint-order: stroke;\n  stroke: #ffffff;\n  stroke-linejoin: round;\n  stroke-width: 3px;\n}\n\n.connection-function--highlighted rect {\n  stroke: #fcbd00 !important;\n  stroke-width: 3;\n}\n\n.connection-function--dimmed {\n  opacity: 0.45;\n}\n\n.canvas-column {\n  position: absolute;\n  z-index: 2;\n  top: 64px;\n  display: grid;\n  align-content: start;\n  gap: 14px;\n  width: 210px;\n}\n\n.canvas-column--source {\n  left: 24px;\n}\n\n.canvas-column--target {\n  right: 24px;\n  width: 235px;\n}\n\n.canvas-node {\n  position: relative;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 8px;\n  min-height: 58px;\n  overflow: visible;\n  padding: 9px 34px 9px 11px;\n  text-overflow: ellipsis;\n  white-space: normal;\n}\n\n.canvas-column--target .canvas-node {\n  grid-template-columns: minmax(0, 1fr) max-content;\n  padding-left: 30px;\n  padding-right: 12px;\n}\n\n.canvas-node__content {\n  display: grid;\n  gap: 3px;\n  min-width: 0;\n  align-content: center;\n}\n\n.canvas-node__label {\n  min-width: 0;\n  color: #172033;\n  font-size: 0.9rem;\n  font-weight: 760;\n  line-height: 1.22;\n  overflow-wrap: anywhere;\n  word-break: break-word;\n}\n\n.canvas-node__meta {\n  color: #64748b;\n  font-size: 0.72rem;\n  font-weight: 760;\n  line-height: 1;\n  text-transform: uppercase;\n}\n\n.canvas-node__badges {\n  display: flex;\n  flex: 0 0 auto;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 5px;\n  margin-left: auto;\n  max-width: 104px;\n}\n\n.canvas-node__type {\n  border: 1px solid #cfd8e6;\n  border-radius: 999px;\n  background: #ffffff;\n  color: #334155;\n  font-size: 0.66rem;\n  font-weight: 850;\n  line-height: 1;\n  padding: 4px 7px;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n\n.canvas-node__badge {\n  border: 1px solid #fecaca;\n  border-radius: 999px;\n  background: #ffffff;\n  color: #b91c1c;\n  font-size: 0.68rem;\n  font-weight: 800;\n  line-height: 1;\n  padding: 2px 6px;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n\n.connector-port {\n  position: absolute;\n  top: 50%;\n  z-index: 3;\n  width: 16px;\n  height: 16px;\n  border: 2px solid #fcbd00;\n  border-radius: 999px;\n  background: #ffffff;\n  box-shadow: 0 0 0 3px rgb(252 189 0 / 10%);\n  transform: translateY(-50%);\n}\n\n.connector-port--source {\n  right: -9px;\n  cursor: grab;\n}\n\n.canvas-field-group {\n  display: grid;\n  gap: 8px;\n}\n\n.canvas-field-group__header {\n  min-height: 18px;\n  color: #64748b;\n  font-size: 0.72rem;\n  font-weight: 850;\n  letter-spacing: 0;\n  text-transform: uppercase;\n}\n\n.canvas-field-group__header--required {\n  color: #b91c1c;\n}\n\n.canvas-node--required {\n  border-color: #fecaca;\n  background: #fff7f7;\n}\n\n.connector-port--target {\n  left: -9px;\n  border-color: #0f6654;\n  box-shadow: 0 0 0 3px rgb(15 102 84 / 10%);\n}\n\n.connector-port {\n  pointer-events: auto;\n  -webkit-user-drag: element;\n  user-select: none;\n  -webkit-user-select: none;\n}\n\n.connector-port--source:active {\n  cursor: grabbing;\n}\n\n.canvas-node:hover .connector-port--source,\n.target-drop-zone--active .connector-port--target {\n  background: #fcbd00;\n}\n\n.target-drop-zone--active .connector-port--target {\n  border-color: #0f6654;\n  background: #0f6654;\n}\n\n.target-drop-zone {\n  position: relative;\n  min-height: 46px;\n}\n\n.target-drop-zone--active .canvas-node {\n  border-color: #0f6654;\n  background: #eaf8f3;\n  box-shadow: 0 0 0 3px rgb(15 102 84 / 16%);\n}\n\n.target-drop-zone--pending .canvas-node {\n  border-color: #fcbd00;\n  background: #fff4cf;\n  box-shadow: 0 0 0 3px rgb(252 189 0 / 16%);\n}\n\n.drop-transform-palette {\n  position: absolute;\n  right: 0;\n  top: calc(100% + 8px);\n  z-index: 4;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 6px;\n  width: min(360px, 78vw);\n  border: 1px solid #bfd0e7;\n  border-radius: 8px;\n  background: #ffffff;\n  box-shadow: 0 16px 36px rgb(23 32 51 / 18%);\n  padding: 10px;\n}\n\n.drop-transform-palette__summary {\n  grid-column: 1 / -1;\n  display: grid;\n  gap: 2px;\n  border-bottom: 1px solid #dfe5ef;\n  color: #64748b;\n  font-size: 0.76rem;\n  font-weight: 700;\n  padding-bottom: 8px;\n}\n\n.drop-transform-palette__summary span,\n.drop-transform-palette__summary strong {\n  min-width: 0;\n  overflow-wrap: anywhere;\n}\n\n.drop-transform-palette__summary strong {\n  color: #172033;\n  font-size: 0.82rem;\n}\n\n.drop-transform-palette button {\n  min-height: 36px;\n  border: 1px solid #d7deea;\n  border-radius: 8px;\n  background: #f8fafc;\n  color: #334155;\n  cursor: pointer;\n  font-size: 0.8rem;\n  font-weight: 760;\n  padding: 8px 10px;\n  text-align: center;\n}\n\n.drop-transform-palette button:disabled {\n  border-color: #e2e8f0;\n  background: #f1f5f9;\n  color: #94a3b8;\n  cursor: not-allowed;\n}\n\n.drop-transform-palette__option--active {\n  border-color: #fcbd00 !important;\n  background: #fff4cf !important;\n  color: #e5a900 !important;\n}\n\n.drop-transform-palette__cancel {\n  grid-column: 1 / -1;\n  background: #ffffff !important;\n  color: #64748b !important;\n}\n\n.mapping-list {\n  display: grid;\n  gap: 8px;\n  border-top: 1px solid #dfe5ef;\n  background: #ffffff;\n  padding: 12px;\n}\n\n.mapping-list__header,\n.mapping-row {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto auto;\n  align-items: center;\n  gap: 10px;\n}\n\n.mapping-list__header {\n  grid-template-columns: 1fr auto;\n  color: #59677c;\n  font-size: 0.84rem;\n  font-weight: 700;\n}\n\n.mapping-list__header h3 {\n  margin: 0;\n  color: #172033;\n  font-size: 0.95rem;\n  font-weight: 760;\n}\n\n.mapping-row {\n  border: 1px solid #dfe5ef;\n  border-radius: 8px;\n  background: #f8fafc;\n  color: #172033;\n  font-size: 0.85rem;\n  font-weight: 650;\n  padding: 8px 10px;\n  transition: border-color 140ms ease, background 140ms ease;\n}\n\n.mapping-row--highlighted {\n  border-color: #fcbd00;\n  background: #fff7df;\n}\n\n.mapping-row span {\n  overflow-wrap: anywhere;\n}\n\n.mapping-row__arrow {\n  color: #000000;\n  font-weight: 800;\n}\n\n.mapping-row__transform {\n  border: 1px solid #cfd8e6;\n  border-radius: 999px;\n  background: #ffffff;\n  color: #475569;\n  padding: 4px 8px;\n}\n\n.bottom-panel {\n  overflow: hidden;\n}\n\n.tab-list {\n  display: flex;\n  border-bottom: 1px solid #dfe5ef;\n  background: #f8fafc;\n}\n\n.tab-list button {\n  min-height: 42px;\n  border: 0;\n  border-right: 1px solid #dfe5ef;\n  background: transparent;\n  color: #475569;\n  cursor: pointer;\n  font-weight: 760;\n  padding: 10px 16px;\n}\n\n.tab-button--active {\n  background: #ffffff !important;\n  color: #172033 !important;\n}\n\n.tab-panel {\n  min-height: 104px;\n  padding: 16px;\n}\n\n.tab-panel p {\n  margin: 0;\n  color: #475569;\n  font-weight: 650;\n}\n\n.property-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 14px;\n  margin: 0;\n}\n\n.property-grid div {\n  min-width: 0;\n}\n\n.property-grid dt {\n  color: #64748b;\n  font-size: 0.78rem;\n  font-weight: 760;\n  text-transform: uppercase;\n}\n\n.property-grid dd {\n  margin: 5px 0 0;\n  color: #172033;\n  font-weight: 680;\n  overflow-wrap: anywhere;\n}\n\n.warning-list {\n  display: grid;\n  gap: 6px;\n  margin: 0;\n  padding-left: 20px;\n  color: #9f2418;\n  font-weight: 650;\n}\n\n.state-message {\n  margin: 0;\n  color: #5d6b82;\n  font-weight: 650;\n}\n\n.empty-state {\n  margin: 0;\n  color: #64748b;\n  font-size: 0.88rem;\n  font-weight: 650;\n}\n\n.feedback {\n  min-height: 48px;\n}\n\n.alert {\n  margin: 0;\n  border-radius: 8px;\n  padding: 14px 16px;\n  font-weight: 650;\n  line-height: 1.45;\n}\n\n.alert--success {\n  border: 1px solid #8bd2bd;\n  background: #eaf8f3;\n  color: #0f6654;\n}\n\n.alert--error {\n  border: 1px solid #f0a8a0;\n  background: #fff0ed;\n  color: #9f2418;\n}\n\n.form-actions {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  border-top: 1px solid #dfe5ef;\n  padding-top: 18px;\n}\n\n.form-actions__right {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n\n.template-action {\n  min-height: 40px;\n  border: 1px solid #111827;\n  border-radius: 8px;\n  background: #fff4cf;\n  color: #111827;\n  cursor: pointer;\n  font-weight: 800;\n  padding: 9px 14px;\n}\n\n.template-action:hover:not(:disabled) {\n  background: #fcbd00;\n}\n\n.template-action:disabled {\n  cursor: not-allowed;\n  opacity: .6;\n}\n\n.template-saved-badge {\n  display: inline-flex;\n  min-height: 36px;\n  align-items: center;\n  border: 1px solid #111827;\n  border-radius: 999px;\n  background: #fcbd00;\n  color: #111827;\n  font-size: .8rem;\n  font-weight: 850;\n  padding: 7px 12px;\n}\n\n.modal-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: 30;\n  display: grid;\n  place-items: center;\n  background: rgb(15 23 42 / 34%);\n  padding: 20px;\n}\n\n.required-fields-modal {\n  display: grid;\n  gap: 14px;\n  width: min(460px, 100%);\n  border: 1px solid #f0a8a0;\n  border-radius: 8px;\n  background: #ffffff;\n  box-shadow: 0 24px 60px rgb(23 32 51 / 24%);\n  padding: 22px;\n}\n\n.required-fields-modal h2 {\n  margin: 0;\n  color: #9f2418;\n  font-size: 1.1rem;\n  font-weight: 800;\n}\n\n.required-fields-modal p {\n  margin: 0;\n  color: #172033;\n  font-weight: 680;\n  line-height: 1.5;\n  overflow-wrap: anywhere;\n}\n\n.required-fields-modal .primary-action {\n  justify-self: end;\n}\n\n.mapping-warning-modal {\n  width: min(680px, 100%);\n}\n\n.fixed-width-modal {\n  width: min(1040px, 100%);\n  max-height: min(760px, 92vh);\n  overflow: auto;\n  border-color: #111827;\n}\n\n.fixed-width-modal__header {\n  display: flex;\n  align-items: start;\n  justify-content: space-between;\n  gap: 14px;\n}\n\n.fixed-width-modal__header h2 {\n  color: #111827;\n}\n\n.fixed-width-modal__header span {\n  border: 1px solid #111827;\n  border-radius: 999px;\n  background: #fcbd00;\n  color: #111827;\n  font-size: 0.82rem;\n  font-weight: 800;\n  padding: 5px 10px;\n  white-space: nowrap;\n}\n\n.fixed-width-grid {\n  display: grid;\n  gap: 8px;\n  overflow-x: auto;\n}\n\n.fixed-width-grid__row {\n  display: grid;\n  grid-template-columns: minmax(130px, 1fr) minmax(150px, 1.2fr) minmax(110px, 0.75fr) minmax(98px, 0.55fr) minmax(98px, 0.55fr) minmax(82px, 0.45fr);\n  gap: 8px;\n  min-width: 760px;\n  align-items: center;\n}\n\n.fixed-width-grid__row--required-missing input,\n.fixed-width-grid__row--required-missing select,\n.fixed-width-grid__row--required-missing output {\n  border-color: #f0a8a0;\n  background: #fff7f5;\n}\n\n.fixed-width-grid__row--head {\n  color: #111827;\n  font-size: 0.75rem;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n\n.fixed-width-grid input,\n.fixed-width-grid select,\n.fixed-width-grid output {\n  width: 100%;\n  min-height: 38px;\n  border: 1px solid #cfd8e6;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #172033;\n  font-weight: 700;\n  padding: 8px 10px;\n}\n\n.fixed-width-grid input:focus,\n.fixed-width-grid select:focus {\n  border-color: #fcbd00;\n  box-shadow: 0 0 0 3px rgb(252 189 0 / 18%);\n  outline: none;\n}\n\n.fixed-width-grid output {\n  display: inline-flex;\n  align-items: center;\n  border-color: #111827;\n  background: #fff7df;\n}\n\n.mapping-warning-modal .warning-list {\n  max-height: 260px;\n  overflow: auto;\n  border: 1px solid #f0d48a;\n  border-radius: 8px;\n  background: #fff9e8;\n  padding: 14px 18px 14px 32px;\n}\n\n.modal-actions {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 10px;\n}\n\n.primary-action,\n.secondary-action,\n.back-action,\n.delete-action {\n  min-height: 40px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 760;\n  transition: background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;\n}\n\n.primary-action {\n  min-width: 132px;\n  border: 0;\n  background: #fcbd00;\n  color: #ffffff;\n  padding: 10px 18px;\n}\n\n.primary-action:hover:not(:disabled) {\n  background: #e5a900;\n  box-shadow: 0 12px 24px rgb(252 189 0 / 22%);\n  transform: translateY(-1px);\n}\n\n.secondary-action,\n.back-action {\n  border: 1px solid #cfd8e6;\n  background: #ffffff;\n  color: #172033;\n  padding: 9px 14px;\n}\n\n.secondary-action:hover:not(:disabled),\n.back-action:hover:not(:disabled) {\n  border-color: #e5a900;\n  box-shadow: 0 8px 20px rgb(23 32 51 / 8%);\n}\n\n.delete-action {\n  border: 1px solid #f0a8a0;\n  background: #fff7f5;\n  color: #9f2418;\n  padding: 6px 10px;\n}\n\n.delete-action:hover:not(:disabled) {\n  background: #fff0ed;\n}\n\n.primary-action:focus-visible,\n.secondary-action:focus-visible,\n.back-action:focus-visible,\n.delete-action:focus-visible,\n.schema-field:focus-visible,\n.canvas-node:focus-visible,\n.tab-list button:focus-visible {\n  outline: 3px solid rgb(252 189 0 / 24%);\n  outline-offset: 2px;\n}\n\n.primary-action:disabled,\n.secondary-action:disabled,\n.back-action:disabled,\n.delete-action:disabled,\n.ai-match-action:disabled {\n  cursor: not-allowed;\n  opacity: 0.62;\n  box-shadow: none;\n  transform: none;\n}\n\n@media (max-width: 1180px) {\n  .mapper-workbench {\n    grid-template-columns: 1fr;\n  }\n\n  .schema-panel,\n  .canvas-panel {\n    min-height: auto;\n  }\n}\n\n@media (max-width: 720px) {\n  .map-page {\n    padding: 28px 16px;\n  }\n\n  .panel-header--canvas,\n  .form-actions,\n  .form-actions__right {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .canvas-toolbar {\n    justify-content: stretch;\n  }\n\n  .canvas-toolbar label,\n  .canvas-toolbar select,\n  .primary-action,\n  .secondary-action,\n  .back-action,\n  .delete-action {\n    width: 100%;\n  }\n\n  .property-grid,\n  .mapping-row {\n    grid-template-columns: 1fr;\n  }\n\n  .canvas-column {\n    width: 150px;\n  }\n}\n"] }]
    }], null, { warnBeforeBrowserUnload: [{
            type: HostListener,
            args: ['window:beforeunload', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(VisualMappingPageComponent, { className: "VisualMappingPageComponent", filePath: "src/app/features/mappings/visual-mapping-page/visual-mapping-page.component.ts", lineNumber: 43 }); })();
//# sourceMappingURL=visual-mapping-page.component.js.map