import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, HostListener, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, finalize, of, switchMap } from 'rxjs';
import { MappingApiService } from '../../../core/services/mapping-api.service';
import { WizardStepperComponent } from '../../../shared/wizard-stepper/wizard-stepper.component';
import { createDefaultTargetSchemaRequest } from '../default-target-schema';
import { readSourceFile } from '../source-mapping-page/source-file-reader';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
function CreateMappingPageComponent_p_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 45);
    i0.ɵɵtext(1, "Mapping bilgileri y\u00FCkleniyor...");
    i0.ɵɵelementEnd();
} }
function CreateMappingPageComponent_section_8_option_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 57);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mapping_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("value", mapping_r3.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate3(" ", mapping_r3.name, "", mapping_r3.institution ? " \u2014 " + mapping_r3.institution : "", " (", ctx_r1.getTemplateSourceTypeLabel(mapping_r3.sourceType), ") ");
} }
function CreateMappingPageComponent_section_8_p_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 58);
    i0.ɵɵtext(1, " Hen\u00FCz \u015Fablon olarak kaydedilmi\u015F bir mapping bulunmuyor. Yeni bir mapping olu\u015Fturup canvas ekran\u0131ndan \u015Fablon olarak kaydedebilirsiniz. ");
    i0.ɵɵelementEnd();
} }
function CreateMappingPageComponent_section_8_div_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 59)(1, "span");
    i0.ɵɵtext(2, "Se\u00E7ilen \u015Fablon");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "small");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8, "\u015Eablon kayd\u0131 de\u011Fi\u015Ftirilmeyecek; kaydetti\u011Finizde yeni bir mapping olu\u015Fturulacak.");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.selectedTemplate.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate4(" ", ctx_r1.selectedTemplate.institution || "Kurum belirtilmemi\u015F", " \u00B7 ", ctx_r1.getTemplateSourceTypeLabel(ctx_r1.selectedTemplate.sourceType), " \u00B7 ", ctx_r1.getPatternTypeLabel(ctx_r1.selectedTemplate.patternType), " \u00B7 ", (ctx_r1.selectedTemplate.mappingDefinitions == null ? null : ctx_r1.selectedTemplate.mappingDefinitions.length) || 0, " e\u015Fleme ");
} }
function CreateMappingPageComponent_section_8_p_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 60);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.mappingsError);
} }
function CreateMappingPageComponent_section_8_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 46)(1, "header", 47)(2, "span", 48);
    i0.ɵɵtext(3, "\u2197");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "h2", 49);
    i0.ɵɵtext(6, "\u015Eablon Se\u00E7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8, "\u00D6nceki bir mapping'in kurallar\u0131n\u0131 yeni \u00E7al\u0131\u015Fma i\u00E7in ba\u015Flang\u0131\u00E7 noktas\u0131 olarak kullan\u0131n.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "span", 50);
    i0.ɵɵtext(10, "Opsiyonel");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 51)(12, "div")(13, "strong");
    i0.ɵɵtext(14, "Kay\u0131tl\u0131 bir mapping'i yeniden kullan");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "p");
    i0.ɵɵtext(16, "Kaynak alan yap\u0131s\u0131, pozisyonlar, hedef \u015Fema, e\u015Flemeler ve transform tipleri yeni mapping'e kopyalan\u0131r.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "select", 52);
    i0.ɵɵlistener("change", function CreateMappingPageComponent_section_8_Template_select_change_17_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selectTemplate($event)); });
    i0.ɵɵelementStart(18, "option", 53);
    i0.ɵɵtext(19, "\u015Eablonsuz / S\u0131f\u0131rdan olu\u015Ftur");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(20, CreateMappingPageComponent_section_8_option_20_Template, 2, 4, "option", 54);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(21, CreateMappingPageComponent_section_8_p_21_Template, 2, 0, "p", 55)(22, CreateMappingPageComponent_section_8_div_22_Template, 9, 5, "div", 56)(23, CreateMappingPageComponent_section_8_p_23_Template, 2, 1, "p", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(17);
    i0.ɵɵproperty("value", (ctx_r1.selectedTemplate == null ? null : ctx_r1.selectedTemplate.id) ?? "")("disabled", ctx_r1.isMappingsLoading);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r1.templateMappings);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.isMappingsLoading && ctx_r1.templateMappings.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.selectedTemplate);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.mappingsError);
} }
function CreateMappingPageComponent_p_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 60);
    i0.ɵɵtext(1, "Mapping ad\u0131 zorunludur.");
    i0.ɵɵelementEnd();
} }
function CreateMappingPageComponent_p_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 60);
    i0.ɵɵtext(1, "A\u00E7\u0131klama zorunludur.");
    i0.ɵɵelementEnd();
} }
function CreateMappingPageComponent_ng_container_36_ng_container_1_option_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 57);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", option_r4.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(option_r4.label);
} }
function CreateMappingPageComponent_ng_container_36_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, CreateMappingPageComponent_ng_container_36_ng_container_1_option_1_Template, 2, 2, "option", 54);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const group_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", group_r5.options);
} }
function CreateMappingPageComponent_ng_container_36_optgroup_2_option_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 57);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r6 = ctx.$implicit;
    i0.ɵɵproperty("value", option_r6.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(option_r6.label);
} }
function CreateMappingPageComponent_ng_container_36_optgroup_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "optgroup", 62);
    i0.ɵɵtemplate(1, CreateMappingPageComponent_ng_container_36_optgroup_2_option_1_Template, 2, 2, "option", 54);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("label", group_r5.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", group_r5.options);
} }
function CreateMappingPageComponent_ng_container_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, CreateMappingPageComponent_ng_container_36_ng_container_1_Template, 2, 1, "ng-container", 43)(2, CreateMappingPageComponent_ng_container_36_optgroup_2_Template, 2, 2, "optgroup", 61);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const group_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !group_r5.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", group_r5.label);
} }
function CreateMappingPageComponent_p_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 63);
    i0.ɵɵtext(1, " Desen t\u00FCr\u00FC se\u00E7ilen \u015Fablondan al\u0131nm\u0131\u015Ft\u0131r. ");
    i0.ɵɵelementEnd();
} }
function CreateMappingPageComponent_p_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 60);
    i0.ɵɵtext(1, "Dosya deseni se\u00E7imi zorunludur.");
    i0.ɵɵelementEnd();
} }
function CreateMappingPageComponent_fieldset_39_p_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 60);
    i0.ɵɵtext(1, " Vergi Header i\u00E7in \u015Eube Kodu 5, Kurum Kodu 5, Dosya Tarihi 8, Kurum Hesap No 17 rakam olmal\u0131d\u0131r. ");
    i0.ɵɵelementEnd();
} }
function CreateMappingPageComponent_fieldset_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "fieldset", 64)(1, "legend");
    i0.ɵɵtext(2, "Vergi Header Bilgileri");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 65)(4, "div", 9)(5, "label", 66);
    i0.ɵɵtext(6, "\u015Eube Kodu");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(7, "input", 67);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 9)(9, "label", 68);
    i0.ɵɵtext(10, "Kurum Kodu");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "input", 69);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 9)(13, "label", 70);
    i0.ɵɵtext(14, "Dosya Tarihi");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(15, "input", 71);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 9)(17, "label", 72);
    i0.ɵɵtext(18, "Kurum Hesap No");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(19, "input", 73);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(20, CreateMappingPageComponent_fieldset_39_p_20_Template, 2, 0, "p", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(20);
    i0.ɵɵproperty("ngIf", ctx_r1.mtvHeaderInvalid);
} }
function CreateMappingPageComponent_fieldset_40_p_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 60);
    i0.ɵɵtext(1, " T\u00D6S Header i\u00E7in \u015Eube Kodu 5, Kurum Kodu 5, Dosya Tarihi 8 rakam; Kurum Hesap No 26 karakter olmal\u0131d\u0131r. ");
    i0.ɵɵelementEnd();
} }
function CreateMappingPageComponent_fieldset_40_p_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 34);
    i0.ɵɵtext(1, " Otomatik se\u00E7ilen T\u00D6S deseni: ");
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.tosVariantLabel);
} }
function CreateMappingPageComponent_fieldset_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "fieldset", 74)(1, "legend");
    i0.ɵɵtext(2, "T\u00D6S Header Bilgileri");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 65)(4, "div", 9)(5, "label", 75);
    i0.ɵɵtext(6, "\u015Eube Kodu");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(7, "input", 76);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 9)(9, "label", 77);
    i0.ɵɵtext(10, "Kurum Kodu");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "input", 78);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 9)(13, "label", 79);
    i0.ɵɵtext(14, "Dosya Tarihi");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(15, "input", 80);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 9)(17, "label", 81);
    i0.ɵɵtext(18, "Kurum Hesap No");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(19, "input", 82);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(20, CreateMappingPageComponent_fieldset_40_p_20_Template, 2, 0, "p", 12)(21, CreateMappingPageComponent_fieldset_40_p_21_Template, 4, 1, "p", 83);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(20);
    i0.ɵɵproperty("ngIf", ctx_r1.tosHeaderInvalid);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.hasSourceFile);
} }
function CreateMappingPageComponent_span_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 84);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.sourceFileMeta, " ");
} }
function CreateMappingPageComponent_p_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 60);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.sourceFileError);
} }
function CreateMappingPageComponent_div_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 85)(1, "span", 86);
    i0.ɵɵtext(2, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "strong");
    i0.ɵɵtext(5, "\u015Eablon ve dosya format\u0131 uyumsuz");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.templateCompatibilityWarning);
} }
function CreateMappingPageComponent_p_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 87);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.successMessage);
} }
function CreateMappingPageComponent_p_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 88);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.errorMessage);
} }
function CreateMappingPageComponent_span_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.isEditingMapping ? "G\u00FCncelle ve Devam Et" : "Devam Et");
} }
function CreateMappingPageComponent_span_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Kaydediliyor...");
    i0.ɵɵelementEnd();
} }
function CreateMappingPageComponent_div_63_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 89)(1, "div", 90)(2, "h2", 91);
    i0.ɵɵtext(3, "Kaydedilmemi\u015F de\u011Fi\u015Fiklikler var");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "\u00C7\u0131kmadan \u00F6nce \u00E7al\u0131\u015Fman\u0131z\u0131 kaydedip daha sonra devam etmek ister misiniz?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 92)(7, "button", 41);
    i0.ɵɵlistener("click", function CreateMappingPageComponent_div_63_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.saveDraftAndLeave()); });
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 93);
    i0.ɵɵlistener("click", function CreateMappingPageComponent_div_63_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.discardChangesAndLeave()); });
    i0.ɵɵtext(10, " Kaydetmeden \u00C7\u0131k ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "button", 94);
    i0.ɵɵlistener("click", function CreateMappingPageComponent_div_63_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.stayOnPage()); });
    i0.ɵɵtext(12, "Sayfada Kal");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("disabled", ctx_r1.isSubmitting);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isSubmitting ? "Kaydediliyor..." : "Kaydet ve \u00C7\u0131k", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.isSubmitting);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.isSubmitting);
} }
export class CreateMappingPageComponent {
    constructor() {
        this.formBuilder = inject(FormBuilder);
        this.mappingApi = inject(MappingApiService);
        this.router = inject(Router);
        this.route = inject(ActivatedRoute);
        this.changeDetector = inject(ChangeDetectorRef);
        this.form = this.formBuilder.nonNullable.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            institution: [''],
            patternType: ['', [Validators.required]],
            mtvSubeKodu: [''],
            mtvKurumKodu: [''],
            mtvDosyaTarihi: [''],
            mtvKurumHesapNo: [''],
            tosSubeKodu: [''],
            tosKurumKodu: [''],
            tosDosyaTarihi: [''],
            tosKurumHesapNo: [''],
            sourceType: ['file', [Validators.required]]
        });
        this.isSubmitting = false;
        this.successMessage = '';
        this.errorMessage = '';
        this.sourceFileName = '';
        this.sourceFileError = '';
        this.detectedSourceType = '';
        this.sourceFields = [];
        this.sourceRecords = [];
        this.isSourceDragActive = false;
        this.mappings = [];
        this.isMappingsLoading = false;
        this.mappingsError = '';
        this.isMappingsPanelOpen = false;
        this.mappingSearchTerm = '';
        this.selectedPatternFilter = 'all';
        this.isExitDialogOpen = false;
        this.isSourceDirty = false;
        this.allowNavigation = false;
        this.patternTypeGroups = [
            { options: [{ value: 'maas', label: 'Maaş' }, { value: 'tos', label: 'TÖS' }] },
            {
                label: 'Vergi',
                options: [
                    { value: 'vergi_mtv', label: 'MTV' },
                    { value: 'vergi_gumruk', label: 'Gümrük Vergisi' },
                    { value: 'vergi_toplu', label: 'Toplu Vergi' }
                ]
            }
        ];
    }
    ngOnInit() {
        const mappingId = this.route.snapshot.paramMap.get('mappingId');
        if (mappingId) {
            this.loadMappingForEditing(mappingId);
            return;
        }
        this.loadMappings();
    }
    get nameInvalid() {
        const control = this.form.controls.name;
        return control.invalid && (control.dirty || control.touched);
    }
    get descriptionInvalid() {
        const control = this.form.controls.description;
        return control.invalid && (control.dirty || control.touched);
    }
    get patternTypeInvalid() {
        const control = this.form.controls.patternType;
        return control.invalid && (control.dirty || control.touched);
    }
    get isVergiPattern() {
        return this.form.controls.patternType.value.startsWith('vergi_')
            || this.form.controls.patternType.value === 'mtv';
    }
    get mtvHeaderInvalid() {
        return this.isVergiPattern && !this.isMtvHeaderValid();
    }
    get isTosPattern() {
        return this.form.controls.patternType.value === 'tos';
    }
    get tosHeaderInvalid() {
        return this.isTosPattern && !this.isTosHeaderValid();
    }
    get tosVariantLabel() {
        return this.isFixedWidthRawSource
            ? 'TÖS Satır Bazlı Kaynak Hesap No'
            : 'TÖS Geniş 100 Açıklamalı AAD';
    }
    get hasSourceFile() {
        return Boolean(this.detectedSourceType)
            && (this.sourceFields.length > 0 || this.sourceRecords.length > 0);
    }
    get isFixedWidthRawSource() {
        return this.detectedSourceType === 'txt'
            && this.sourceFields.length === 0
            && this.sourceRecords.length > 0
            && this.sourceRecords.every(record => typeof record['line'] === 'string');
    }
    get sourceFileMeta() {
        if (!this.hasSourceFile) {
            return '';
        }
        if (this.isFixedWidthRawSource) {
            return `${this.sourceFileName} · ${this.sourceRecords.length} sabit genişlikli satır · ${this.detectedSourceTypeLabel}`;
        }
        return `${this.sourceFileName} · ${this.sourceFields.length} alan · ${this.detectedSourceTypeLabel}`;
    }
    get canContinue() {
        return this.form.valid
            && !this.mtvHeaderInvalid
            && !this.tosHeaderInvalid
            && !this.templateCompatibilityWarning
            && this.hasSourceFile
            && !this.isSubmitting;
    }
    get templateCompatibilityWarning() {
        if (!this.selectedTemplate || !this.detectedSourceType) {
            return '';
        }
        const templateSourceType = this.selectedTemplate.sourceType;
        if (!this.isDetectedFileSourceType(templateSourceType)
            || !this.isDetectedFileSourceType(this.detectedSourceType)
            || templateSourceType === this.detectedSourceType) {
            return '';
        }
        return `Seçilen şablon ${this.getSourceTypeLabel(templateSourceType)} formatındadır. `
            + `Yüklenen dosya ${this.getSourceTypeLabel(this.detectedSourceType)} formatında olduğu için `
            + 'şablondaki kaynak alan eşlemeleri kullanılamaz. Uyumlu bir dosya yükleyin veya farklı bir şablon seçin.';
    }
    get hasUnsavedChanges() {
        return this.form.dirty || this.isSourceDirty;
    }
    get isEditingMapping() {
        return Boolean(this.selectedMapping);
    }
    get filteredMappings() {
        const searchTerm = this.mappingSearchTerm.trim().toLowerCase();
        return this.mappings.filter(mapping => {
            if (!searchTerm) {
                return true;
            }
            const searchableText = [
                mapping.name,
                mapping.description ?? '',
                this.getPatternTypeLabel(mapping.patternType),
                this.getStatusLabel(mapping.status),
                mapping.status,
                mapping.createdAt,
                mapping.updatedAt
            ].join(' ').toLowerCase();
            return searchableText.includes(searchTerm);
        });
    }
    get templateMappings() {
        return this.mappings.filter(mapping => mapping.isTemplate);
    }
    get detectedSourceTypeLabel() {
        switch (this.detectedSourceType) {
            case 'excel':
                return 'Excel';
            case 'txt':
                return 'TXT';
            case 'json':
                return 'JSON';
            case 'xml':
                return 'XML';
            default:
                return this.detectedSourceType ? this.detectedSourceType.toUpperCase() : '';
        }
    }
    getStatusLabel(status) {
        return status === 'completed' ? 'Tamamlandı' : 'Devam Ediyor';
    }
    getPatternTypeLabel(patternType) {
        const normalizedPatternType = patternType === 'mtv' ? 'vergi_mtv' : patternType;
        return this.patternTypeGroups
            .flatMap(group => group.options)
            .find(option => option.value === normalizedPatternType)?.label ?? normalizedPatternType;
    }
    getTemplateSourceTypeLabel(sourceType) {
        switch (sourceType) {
            case 'excel':
                return 'Excel / XLSX';
            case 'txt':
                return 'TXT';
            case 'json':
                return 'JSON';
            case 'xml':
                return 'XML';
            case 'api':
                return 'API';
            case 'database':
                return 'Veritabanı';
            case 'manual':
                return 'Manuel';
            default:
                return 'Dosya';
        }
    }
    toggleMappingsPanel() {
        this.isMappingsPanelOpen = !this.isMappingsPanelOpen;
    }
    updateMappingSearchTerm(event) {
        const input = event.target;
        this.mappingSearchTerm = input.value;
    }
    updatePatternFilter(patternType) {
        this.selectedPatternFilter = patternType;
        this.loadMappings();
    }
    selectMapping(mapping) {
        this.successMessage = '';
        this.errorMessage = '';
        this.sourceFileError = '';
        this.mappingsError = '';
        this.isMappingsLoading = true;
        this.mappingApi.getMappingById(mapping.id)
            .pipe(finalize(() => {
            this.isMappingsLoading = false;
        }))
            .subscribe({
            next: (details) => {
                this.applySelectedMapping(details);
                this.isMappingsPanelOpen = false;
            },
            error: (error) => {
                this.mappingsError = this.getErrorMessage(error);
            }
        });
    }
    selectTemplate(event) {
        const templateId = event.target.value;
        this.selectedTemplate = undefined;
        this.errorMessage = '';
        this.sourceFileError = '';
        this.mappingsError = '';
        if (!templateId) {
            return;
        }
        this.isMappingsLoading = true;
        this.mappingApi.getMappingById(templateId)
            .pipe(finalize(() => {
            this.isMappingsLoading = false;
        }))
            .subscribe({
            next: (template) => {
                this.selectedTemplate = template;
                const patternType = template.patternType === 'mtv' ? 'vergi_mtv' : template.patternType;
                this.form.patchValue({
                    patternType,
                    mtvSubeKodu: template.patternSettings?.mtvHeader?.subeKodu ?? '',
                    mtvKurumKodu: template.patternSettings?.mtvHeader?.kurumKodu ?? '',
                    mtvDosyaTarihi: template.patternSettings?.mtvHeader?.dosyaTarihi ?? this.getTodayAsYYYYMMDD(),
                    mtvKurumHesapNo: template.patternSettings?.mtvHeader?.kurumHesapNo ?? '',
                    tosSubeKodu: template.patternSettings?.tosHeader?.subeKodu ?? '',
                    tosKurumKodu: template.patternSettings?.tosHeader?.kurumKodu ?? '',
                    tosDosyaTarihi: template.patternSettings?.tosHeader?.dosyaTarihi ?? this.getTodayAsYYYYMMDD(),
                    tosKurumHesapNo: template.patternSettings?.tosHeader?.kurumHesapNo ?? ''
                });
            },
            error: (error) => {
                this.mappingsError = this.getErrorMessage(error);
            }
        });
    }
    startNewMapping() {
        this.selectedMapping = undefined;
        this.createdMapping = undefined;
        this.successMessage = '';
        this.errorMessage = '';
        this.sourceFileError = '';
        this.form.reset({
            name: '',
            description: '',
            institution: '',
            patternType: '',
            mtvSubeKodu: '',
            mtvKurumKodu: '',
            mtvDosyaTarihi: this.getTodayAsYYYYMMDD(),
            mtvKurumHesapNo: '',
            tosSubeKodu: '',
            tosKurumKodu: '',
            tosDosyaTarihi: this.getTodayAsYYYYMMDD(),
            tosKurumHesapNo: '',
            sourceType: 'file'
        });
        this.sourceFileName = '';
        this.detectedSourceType = '';
        this.sourceFields = [];
        this.sourceRecords = [];
        this.selectedTemplate = undefined;
        this.isMappingsPanelOpen = false;
    }
    async onSourceFileSelected(event) {
        const input = event.target;
        const file = input.files?.[0];
        if (!file) {
            return;
        }
        await this.importSourceFile(file);
        input.value = '';
    }
    onSourceFileDragOver(event) {
        if (this.isSubmitting) {
            return;
        }
        event.preventDefault();
        this.isSourceDragActive = true;
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'copy';
        }
    }
    onSourceFileDragLeave(event) {
        const currentTarget = event.currentTarget;
        const nextTarget = event.relatedTarget;
        if (currentTarget && nextTarget && currentTarget.contains(nextTarget)) {
            return;
        }
        this.isSourceDragActive = false;
    }
    async onSourceFileDropped(event) {
        event.preventDefault();
        this.isSourceDragActive = false;
        if (this.isSubmitting) {
            return;
        }
        const file = event.dataTransfer?.files?.[0];
        if (!file) {
            return;
        }
        await this.importSourceFile(file);
    }
    async importSourceFile(file) {
        this.sourceFileName = file.name;
        this.sourceFileError = '';
        this.errorMessage = '';
        this.successMessage = '';
        this.detectedSourceType = '';
        this.sourceFields = [];
        this.sourceRecords = [];
        try {
            const result = await readSourceFile(file, 'file');
            this.detectedSourceType = result.format;
            const importedSource = this.toSourceImport(result.fields, result.records);
            this.sourceFields = importedSource.fields;
            this.sourceRecords = importedSource.records;
            this.isSourceDirty = true;
        }
        catch (error) {
            this.sourceFileName = '';
            this.detectedSourceType = '';
            this.sourceFields = [];
            this.sourceRecords = [];
            this.sourceFileError = error instanceof Error ? error.message : 'Dosya okunamadı.';
        }
        finally {
            this.changeDetector.detectChanges();
        }
    }
    onSubmit() {
        this.saveMapping(true, false);
    }
    saveAsDraft() {
        this.saveMapping(false, true);
    }
    saveMapping(navigateAfterSave, forceDraft, afterSave) {
        this.successMessage = '';
        this.errorMessage = '';
        this.createdMapping = undefined;
        const desiredStatus = forceDraft
            ? 'draft'
            : this.hasUnsavedChanges
                ? 'draft'
                : this.selectedMapping?.status ?? 'draft';
        const isNewMapping = !this.selectedMapping;
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        if (this.mtvHeaderInvalid) {
            this.errorMessage = 'Vergi Header bilgileri eksiksiz ve doğru formatta girilmelidir.';
            return;
        }
        if (this.tosHeaderInvalid) {
            this.errorMessage = 'TÖS Header bilgileri eksiksiz ve doğru formatta girilmelidir.';
            return;
        }
        if (!this.hasSourceFile) {
            this.sourceFileError = 'Kaynak dosyası seçin. Desteklenen formatlar: .xlsx, .xls, .csv, .txt';
            return;
        }
        if (this.templateCompatibilityWarning) {
            this.sourceFileError = this.templateCompatibilityWarning;
            return;
        }
        const value = this.form.getRawValue();
        const request = {
            name: value.name.trim(),
            description: value.description.trim() || undefined,
            institution: value.institution.trim() || undefined,
            templateMappingId: isNewMapping ? this.selectedTemplate?.id : undefined,
            sourceType: this.detectedSourceType,
            targetType: 'json',
            patternType: value.patternType,
            patternSettings: this.isVergiPattern
                ? {
                    mtvHeader: {
                        subeKodu: value.mtvSubeKodu.trim(),
                        kurumKodu: value.mtvKurumKodu.trim(),
                        dosyaTarihi: value.mtvDosyaTarihi.trim(),
                        kurumHesapNo: value.mtvKurumHesapNo.trim()
                    }
                }
                : this.isTosPattern
                    ? {
                        tosHeader: {
                            subeKodu: value.tosSubeKodu.trim(),
                            kurumKodu: value.tosKurumKodu.trim(),
                            dosyaTarihi: value.tosDosyaTarihi.trim(),
                            kurumHesapNo: value.tosKurumHesapNo.trim()
                        }
                    }
                    : undefined
        };
        const sourceRequest = this.buildSourceRequest();
        let mappingId = this.selectedMapping?.id ?? '';
        const metadataRequest = this.selectedMapping
            ? this.mappingApi.updateMapping(this.selectedMapping.id, {
                ...request,
                status: desiredStatus
            })
            : this.mappingApi.createMapping(request).pipe(switchMap(createdMapping => this.mappingApi.updateMapping(createdMapping.id, {
                ...request,
                status: desiredStatus
            })));
        this.isSubmitting = true;
        metadataRequest
            .pipe(switchMap((response) => {
            this.createdMapping = response;
            mappingId = response.id;
            return this.mappingApi.saveSourceSchema(response.id, sourceRequest);
        }))
            .pipe(concatMap(() => this.createdMapping?.targetSchema
            ? of(null)
            : this.mappingApi.saveTargetSchema(mappingId, createDefaultTargetSchemaRequest(value.patternType, this.isFixedWidthRawSource))))
            .pipe(finalize(() => {
            this.isSubmitting = false;
        }))
            .subscribe({
            next: () => {
                if (this.createdMapping) {
                    this.selectedMapping = {
                        ...this.createdMapping,
                        status: desiredStatus
                    };
                }
                this.form.markAsPristine();
                this.isSourceDirty = false;
                this.successMessage = forceDraft
                    ? 'Mapping kaydedildi. Daha sonra devam edebilirsiniz.'
                    : this.selectedMapping
                        ? 'Mapping güncellendi.'
                        : 'Mapping taslağı, kaynak dosyası ve hedef şeması kaydedildi.';
                afterSave?.();
                if (navigateAfterSave) {
                    this.allowNavigation = true;
                    void this.router.navigate(['/mappings', mappingId, 'map'], {
                        queryParams: isNewMapping ? { new: 'true' } : undefined
                    });
                }
            },
            error: (error) => {
                this.errorMessage = this.getErrorMessage(error);
            }
        });
    }
    canLeavePage() {
        if (this.allowNavigation || !this.hasUnsavedChanges || this.isSubmitting) {
            return true;
        }
        this.isExitDialogOpen = true;
        return new Promise(resolve => {
            this.exitDecisionResolver = resolve;
        });
    }
    saveDraftAndLeave() {
        if (!this.canContinue) {
            this.errorMessage = 'Taslak kaydetmek için zorunlu alanları doldurun ve kaynak dosyasını seçin.';
            this.closeExitDialog(false);
            return;
        }
        this.saveMapping(false, true, () => {
            this.allowNavigation = true;
            this.closeExitDialog(true);
        });
    }
    discardChangesAndLeave() {
        this.allowNavigation = true;
        this.closeExitDialog(true);
    }
    stayOnPage() {
        this.closeExitDialog(false);
    }
    warnBeforeBrowserUnload(event) {
        if (!this.allowNavigation && this.hasUnsavedChanges) {
            event.preventDefault();
        }
    }
    closeExitDialog(canLeave) {
        this.isExitDialogOpen = false;
        const resolver = this.exitDecisionResolver;
        this.exitDecisionResolver = undefined;
        resolver?.(canLeave);
    }
    loadMappings() {
        this.isMappingsLoading = true;
        this.mappingsError = '';
        const patternType = this.selectedPatternFilter === 'all' ? undefined : this.selectedPatternFilter;
        this.mappingApi.getMappings(patternType)
            .pipe(finalize(() => {
            this.isMappingsLoading = false;
        }))
            .subscribe({
            next: (mappings) => {
                this.mappings = mappings;
            },
            error: (error) => {
                this.mappingsError = this.getErrorMessage(error);
            }
        });
    }
    loadMappingForEditing(mappingId) {
        this.isMappingsLoading = true;
        this.errorMessage = '';
        this.mappingApi.getMappingById(mappingId)
            .pipe(finalize(() => {
            this.isMappingsLoading = false;
        }))
            .subscribe({
            next: (mapping) => {
                this.applySelectedMapping(mapping);
            },
            error: (error) => {
                this.errorMessage = this.getErrorMessage(error);
            }
        });
    }
    applySelectedMapping(mapping) {
        const patternType = mapping.patternType === 'mtv' ? 'vergi_mtv' : mapping.patternType;
        this.selectedMapping = mapping;
        this.form.patchValue({
            name: mapping.name,
            description: mapping.description ?? '',
            institution: mapping.institution ?? '',
            patternType,
            mtvSubeKodu: mapping.patternSettings?.mtvHeader?.subeKodu ?? '',
            mtvKurumKodu: mapping.patternSettings?.mtvHeader?.kurumKodu ?? '',
            mtvDosyaTarihi: mapping.patternSettings?.mtvHeader?.dosyaTarihi ?? this.getTodayAsYYYYMMDD(),
            mtvKurumHesapNo: mapping.patternSettings?.mtvHeader?.kurumHesapNo ?? '',
            tosSubeKodu: mapping.patternSettings?.tosHeader?.subeKodu ?? '',
            tosKurumKodu: mapping.patternSettings?.tosHeader?.kurumKodu ?? '',
            tosDosyaTarihi: mapping.patternSettings?.tosHeader?.dosyaTarihi ?? this.getTodayAsYYYYMMDD(),
            tosKurumHesapNo: mapping.patternSettings?.tosHeader?.kurumHesapNo ?? '',
            sourceType: mapping.sourceType
        });
        this.sourceFileName = mapping.sourceSchema?.sourceName ?? '';
        this.detectedSourceType = mapping.sourceSchema ? mapping.sourceType : '';
        this.sourceFields = mapping.sourceSchema?.fields ?? [];
        this.sourceRecords = mapping.sourceSchema?.records ?? [];
        this.form.markAsPristine();
        this.isSourceDirty = false;
    }
    buildSourceRequest() {
        const templateFields = this.selectedTemplate?.sourceSchema?.fields ?? [];
        if (!this.isFixedWidthRawSource || templateFields.length === 0) {
            return {
                sourceName: this.getFileBaseName(this.sourceFileName),
                sourceType: this.isDetectedFileSourceType(this.detectedSourceType) ? this.detectedSourceType : undefined,
                fields: this.sourceFields,
                records: this.sourceRecords
            };
        }
        const positionedFields = templateFields.filter(field => field.startPosition !== undefined
            && field.endPosition !== undefined);
        const records = this.sourceRecords.map(record => {
            const line = record['line'] ?? '';
            return positionedFields.reduce((parsedRecord, field) => {
                parsedRecord[field.name] = this.readFixedWidthValue(line, field.startPosition, field.endPosition);
                return parsedRecord;
            }, { line });
        });
        const sampleLine = this.sourceRecords[0]?.['line'] ?? '';
        const fields = templateFields.map(field => ({
            ...field,
            sampleValue: field.startPosition !== undefined && field.endPosition !== undefined
                ? this.readFixedWidthValue(sampleLine, field.startPosition, field.endPosition)
                : undefined
        }));
        return {
            sourceName: this.getFileBaseName(this.sourceFileName),
            sourceType: 'txt',
            fields,
            records
        };
    }
    readFixedWidthValue(line, startPosition, endPosition) {
        const startIndex = Math.max(startPosition - 1, 0);
        const endIndex = Math.min(endPosition, line.length);
        return line.substring(startIndex, endIndex).trim();
    }
    toSourceFields(importedFields, usedFieldNames = new Set()) {
        return importedFields.map(field => ({
            name: this.createUniqueFieldName(field.displayName, field.sourcePath, usedFieldNames),
            displayName: field.displayName,
            type: field.type,
            required: false,
            sampleValue: field.sampleValue || undefined
        }));
    }
    toSourceImport(importedFields, importedRecords) {
        if (importedFields.length === 0) {
            return { fields: [], records: importedRecords };
        }
        const usedFieldNames = new Set();
        const sourceKeyToFieldName = new Map();
        const fields = importedFields.map(field => {
            const name = this.createUniqueFieldName(field.displayName, field.sourcePath, usedFieldNames);
            sourceKeyToFieldName.set(field.sourcePath, name);
            sourceKeyToFieldName.set(field.displayName, name);
            return {
                name,
                displayName: field.displayName,
                type: field.type,
                required: false,
                sampleValue: field.sampleValue || undefined
            };
        });
        const records = importedRecords.map(record => {
            return Array.from(sourceKeyToFieldName.entries()).reduce((mappedRecord, [sourceKey, fieldName]) => {
                if (Object.prototype.hasOwnProperty.call(record, sourceKey)) {
                    mappedRecord[fieldName] = record[sourceKey] ?? '';
                }
                return mappedRecord;
            }, {});
        });
        return { fields, records };
    }
    createUniqueFieldName(displayName, sourcePath, usedFieldNames) {
        const baseName = this.toFieldName(displayName || sourcePath) || 'field';
        let candidate = baseName;
        let suffix = 2;
        while (usedFieldNames.has(candidate.toLowerCase())) {
            candidate = `${baseName}${suffix}`;
            suffix += 1;
        }
        usedFieldNames.add(candidate.toLowerCase());
        return candidate;
    }
    toFieldName(value) {
        const asciiValue = value
            .replace(/[Çç]/g, 'c')
            .replace(/[Ğğ]/g, 'g')
            .replace(/[İIı]/g, 'i')
            .replace(/[Öö]/g, 'o')
            .replace(/[Şş]/g, 's')
            .replace(/[Üü]/g, 'u')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
        const words = asciiValue
            .replace(/[^A-Za-z0-9]+/g, ' ')
            .trim()
            .split(/\s+/)
            .filter(Boolean);
        if (words.length === 0) {
            return '';
        }
        const [firstWord, ...remainingWords] = words;
        const fieldName = [
            firstWord.charAt(0).toLowerCase() + firstWord.slice(1),
            ...remainingWords.map(word => word.charAt(0).toUpperCase() + word.slice(1))
        ].join('');
        return /^\d/.test(fieldName) ? `field${fieldName}` : fieldName;
    }
    getFileBaseName(fileName) {
        return fileName.replace(/\.[^/.]+$/, '') || fileName;
    }
    isMtvHeaderValid() {
        const value = this.form.getRawValue();
        return /^\d{5}$/.test(value.mtvSubeKodu.trim())
            && /^\d{5}$/.test(value.mtvKurumKodu.trim())
            && /^\d{8}$/.test(value.mtvDosyaTarihi.trim())
            && /^\d{17}$/.test(value.mtvKurumHesapNo.trim());
    }
    isTosHeaderValid() {
        const value = this.form.getRawValue();
        return /^\d{5}$/.test(value.tosSubeKodu.trim())
            && /^\d{5}$/.test(value.tosKurumKodu.trim())
            && /^\d{8}$/.test(value.tosDosyaTarihi.trim())
            && /^[A-Za-z0-9]{26}$/.test(value.tosKurumHesapNo.trim());
    }
    getTodayAsYYYYMMDD() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}${month}${day}`;
    }
    isDetectedFileSourceType(value) {
        return value === 'excel' || value === 'txt';
    }
    getSourceTypeLabel(value) {
        return value === 'excel' ? 'Excel' : 'TXT';
    }
    getErrorMessage(error) {
        if (error instanceof HttpErrorResponse) {
            const validationErrors = error.error?.errors;
            const validationMessage = validationErrors
                ? Object.values(validationErrors).flat().join(' ')
                : '';
            return validationMessage || error.error?.title || 'Mapping taslağı oluşturulamadı.';
        }
        return 'Mapping taslağı oluşturulamadı.';
    }
    static { this.ɵfac = function CreateMappingPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CreateMappingPageComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CreateMappingPageComponent, selectors: [["app-create-mapping-page"]], hostBindings: function CreateMappingPageComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("beforeunload", function CreateMappingPageComponent_beforeunload_HostBindingHandler($event) { return ctx.warnBeforeBrowserUnload($event); }, i0.ɵɵresolveWindow);
        } }, decls: 64, vars: 35, consts: [[1, "create-page"], ["aria-labelledby", "create-mapping-title", 1, "wizard-shell"], [1, "wizard-header"], ["id", "create-mapping-title"], [3, "currentStep"], ["class", "loading-message", 4, "ngIf"], ["novalidate", "", 1, "mapping-form", 3, "ngSubmit", "formGroup"], ["class", "template-section", "aria-labelledby", "template-section-title", 4, "ngIf"], [1, "form-grid"], [1, "field"], ["for", "mapping-name"], ["id", "mapping-name", "type", "text", "formControlName", "name", "autocomplete", "off"], ["class", "validation-message", 4, "ngIf"], ["for", "mapping-institution"], [1, "optional-label"], ["id", "mapping-institution", "type", "text", "formControlName", "institution", "autocomplete", "organization", "placeholder", "\u00D6rn. Turkcell, Vak\u0131fBank"], ["for", "mapping-description"], ["id", "mapping-description", "formControlName", "description", "rows", "4"], ["aria-label", "Dosya deseni se\u00E7imi", 1, "option-section", "pattern-section"], [1, "pattern-select-row"], ["for", "mapping-pattern-type"], [1, "pattern-select-wrap"], ["id", "mapping-pattern-type", "formControlName", "patternType"], ["value", "", "disabled", ""], [4, "ngFor", "ngForOf"], ["class", "template-pattern-note", 4, "ngIf"], ["class", "option-section mtv-header-section", "aria-label", "Vergi Header bilgileri", 4, "ngIf"], ["class", "option-section mtv-header-section", "aria-label", "T\u00D6S Header bilgileri", 4, "ngIf"], ["aria-label", "Kaynak dosya y\u00FCkleme", 1, "option-section"], [1, "source-upload", 3, "dragover", "dragleave", "drop"], ["type", "file", "accept", ".xlsx,.xls,.csv,.txt", 3, "change", "disabled"], ["aria-hidden", "true", 1, "source-upload__icon"], [1, "source-upload__title"], [1, "source-upload__button"], [1, "source-upload__description"], ["class", "source-upload__meta", 4, "ngIf"], ["class", "template-compatibility-warning", "role", "alert", 4, "ngIf"], ["aria-live", "polite", 1, "feedback"], ["class", "alert alert--success", 4, "ngIf"], ["class", "alert alert--error", 4, "ngIf"], [1, "form-actions"], ["type", "button", 1, "draft-action", 3, "click", "disabled"], ["type", "submit", 1, "primary-action", 3, "disabled"], [4, "ngIf"], ["class", "exit-dialog", "role", "dialog", "aria-modal", "true", "aria-labelledby", "exit-dialog-title", 4, "ngIf"], [1, "loading-message"], ["aria-labelledby", "template-section-title", 1, "template-section"], [1, "template-section__header"], ["aria-hidden", "true", 1, "template-section__icon"], ["id", "template-section-title"], [1, "template-section__optional"], [1, "template-select-row"], ["id", "mapping-template", 3, "change", "value", "disabled"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["class", "template-empty-state", 4, "ngIf"], ["class", "template-summary", 4, "ngIf"], [3, "value"], [1, "template-empty-state"], [1, "template-summary"], [1, "validation-message"], [3, "label", 4, "ngIf"], [3, "label"], [1, "template-pattern-note"], ["aria-label", "Vergi Header bilgileri", 1, "option-section", "mtv-header-section"], [1, "mtv-header-grid"], ["for", "mtv-sube-kodu"], ["id", "mtv-sube-kodu", "type", "text", "inputmode", "numeric", "maxlength", "5", "formControlName", "mtvSubeKodu", "autocomplete", "off"], ["for", "mtv-kurum-kodu"], ["id", "mtv-kurum-kodu", "type", "text", "inputmode", "numeric", "maxlength", "5", "formControlName", "mtvKurumKodu", "autocomplete", "off"], ["for", "mtv-dosya-tarihi"], ["id", "mtv-dosya-tarihi", "type", "text", "inputmode", "numeric", "maxlength", "8", "formControlName", "mtvDosyaTarihi", "autocomplete", "off"], ["for", "mtv-kurum-hesap-no"], ["id", "mtv-kurum-hesap-no", "type", "text", "inputmode", "numeric", "maxlength", "17", "formControlName", "mtvKurumHesapNo", "autocomplete", "off"], ["aria-label", "T\u00D6S Header bilgileri", 1, "option-section", "mtv-header-section"], ["for", "tos-sube-kodu"], ["id", "tos-sube-kodu", "type", "text", "inputmode", "numeric", "maxlength", "5", "formControlName", "tosSubeKodu", "autocomplete", "off"], ["for", "tos-kurum-kodu"], ["id", "tos-kurum-kodu", "type", "text", "inputmode", "numeric", "maxlength", "5", "formControlName", "tosKurumKodu", "autocomplete", "off"], ["for", "tos-dosya-tarihi"], ["id", "tos-dosya-tarihi", "type", "text", "inputmode", "numeric", "maxlength", "8", "formControlName", "tosDosyaTarihi", "autocomplete", "off"], ["for", "tos-kurum-hesap-no"], ["id", "tos-kurum-hesap-no", "type", "text", "maxlength", "26", "formControlName", "tosKurumHesapNo", "autocomplete", "off"], ["class", "source-upload__description", 4, "ngIf"], [1, "source-upload__meta"], ["role", "alert", 1, "template-compatibility-warning"], ["aria-hidden", "true", 1, "template-compatibility-warning__icon"], [1, "alert", "alert--success"], [1, "alert", "alert--error"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "exit-dialog-title", 1, "exit-dialog"], [1, "exit-dialog__card"], ["id", "exit-dialog-title"], [1, "exit-dialog__actions"], ["type", "button", 1, "discard-action", 3, "click", "disabled"], ["type", "button", 1, "stay-action", 3, "click", "disabled"]], template: function CreateMappingPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "main", 0)(1, "section", 1)(2, "header", 2)(3, "h1", 3);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "app-wizard-stepper", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(6, CreateMappingPageComponent_p_6_Template, 2, 0, "p", 5);
            i0.ɵɵelementStart(7, "form", 6);
            i0.ɵɵlistener("ngSubmit", function CreateMappingPageComponent_Template_form_ngSubmit_7_listener() { return ctx.onSubmit(); });
            i0.ɵɵtemplate(8, CreateMappingPageComponent_section_8_Template, 24, 6, "section", 7);
            i0.ɵɵelementStart(9, "div", 8)(10, "div", 9)(11, "label", 10);
            i0.ɵɵtext(12, "Mapping Ad\u0131");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(13, "input", 11);
            i0.ɵɵtemplate(14, CreateMappingPageComponent_p_14_Template, 2, 0, "p", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "div", 9)(16, "label", 13);
            i0.ɵɵtext(17, "Kurum ");
            i0.ɵɵelementStart(18, "span", 14);
            i0.ɵɵtext(19, "Opsiyonel");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(20, "input", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div", 9)(22, "label", 16);
            i0.ɵɵtext(23, "A\u00E7\u0131klama");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(24, "textarea", 17);
            i0.ɵɵtemplate(25, CreateMappingPageComponent_p_25_Template, 2, 0, "p", 12);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(26, "fieldset", 18)(27, "legend");
            i0.ɵɵtext(28, "Dosya Deseni");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "div", 19)(30, "label", 20);
            i0.ɵɵtext(31, "Desen T\u00FCr\u00FC");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "div", 21)(33, "select", 22)(34, "option", 23);
            i0.ɵɵtext(35, "Se\u00E7iniz");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(36, CreateMappingPageComponent_ng_container_36_Template, 3, 2, "ng-container", 24);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(37, CreateMappingPageComponent_p_37_Template, 2, 0, "p", 25)(38, CreateMappingPageComponent_p_38_Template, 2, 0, "p", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(39, CreateMappingPageComponent_fieldset_39_Template, 21, 1, "fieldset", 26)(40, CreateMappingPageComponent_fieldset_40_Template, 22, 2, "fieldset", 27);
            i0.ɵɵelementStart(41, "fieldset", 28)(42, "label", 29);
            i0.ɵɵlistener("dragover", function CreateMappingPageComponent_Template_label_dragover_42_listener($event) { return ctx.onSourceFileDragOver($event); })("dragleave", function CreateMappingPageComponent_Template_label_dragleave_42_listener($event) { return ctx.onSourceFileDragLeave($event); })("drop", function CreateMappingPageComponent_Template_label_drop_42_listener($event) { return ctx.onSourceFileDropped($event); });
            i0.ɵɵelementStart(43, "input", 30);
            i0.ɵɵlistener("change", function CreateMappingPageComponent_Template_input_change_43_listener($event) { return ctx.onSourceFileSelected($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelement(44, "span", 31);
            i0.ɵɵelementStart(45, "span", 32);
            i0.ɵɵtext(46, "Dosyan\u0131z\u0131 buraya s\u00FCr\u00FCkleyin veya");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "span", 33);
            i0.ɵɵtext(48, "Dosya Se\u00E7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "span", 34);
            i0.ɵɵtext(50, "Desteklenen dosya t\u00FCrleri: Excel (.xlsx, .xls), CSV (.csv), TXT (.txt)");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(51, CreateMappingPageComponent_span_51_Template, 2, 1, "span", 35);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(52, CreateMappingPageComponent_p_52_Template, 2, 1, "p", 12)(53, CreateMappingPageComponent_div_53_Template, 8, 1, "div", 36);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "div", 37);
            i0.ɵɵtemplate(55, CreateMappingPageComponent_p_55_Template, 2, 1, "p", 38)(56, CreateMappingPageComponent_p_56_Template, 2, 1, "p", 39);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "div", 40)(58, "button", 41);
            i0.ɵɵlistener("click", function CreateMappingPageComponent_Template_button_click_58_listener() { return ctx.saveAsDraft(); });
            i0.ɵɵtext(59, " Kaydet ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "button", 42);
            i0.ɵɵtemplate(61, CreateMappingPageComponent_span_61_Template, 2, 1, "span", 43)(62, CreateMappingPageComponent_span_62_Template, 2, 0, "span", 43);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(63, CreateMappingPageComponent_div_63_Template, 13, 4, "div", 44);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.isEditingMapping ? "Mapping D\u00FCzenle" : "Yeni Mapping Olu\u015Ftur");
            i0.ɵɵadvance();
            i0.ɵɵproperty("currentStep", 1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isMappingsLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isEditingMapping);
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("field__control--invalid", ctx.nameInvalid);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.nameInvalid);
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("ngIf", ctx.descriptionInvalid);
            i0.ɵɵadvance(8);
            i0.ɵɵclassProp("field__control--invalid", ctx.patternTypeInvalid);
            i0.ɵɵattribute("aria-readonly", ctx.selectedTemplate ? "true" : null)("disabled", ctx.selectedTemplate ? true : null);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.patternTypeGroups);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedTemplate);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.patternTypeInvalid);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isVergiPattern);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isTosPattern);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("source-upload--ready", ctx.hasSourceFile)("source-upload--active", ctx.isSourceDragActive)("source-upload--disabled", ctx.isSubmitting);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.isSubmitting);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngIf", ctx.hasSourceFile);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.sourceFileError);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.templateCompatibilityWarning);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.successMessage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.errorMessage);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !ctx.canContinue);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !ctx.canContinue);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isSubmitting);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isSubmitting);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isExitDialogOpen);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.MaxLengthValidator, i2.FormGroupDirective, i2.FormControlName, WizardStepperComponent], styles: [".create-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: #fdb515 !important;\n  padding: 72px 20px 48px;\n}\n\n.wizard-shell[_ngcontent-%COMP%] {\n  min-width: 0;\n  width: min(1040px, 100%);\n  margin: 0 auto;\n}\n\n.mappings-panel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n  color: #111827;\n}\n\n.mappings-panel--open[_ngcontent-%COMP%] {\n  border: 1px solid #dfe5ef;\n  border-radius: 10px;\n  background: rgb(255 255 255 / 88%);\n  padding: 14px;\n  box-shadow: 0 12px 26px rgb(17 24 39 / 8%);\n}\n\n.mappings-panel__content[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 14px;\n}\n\n.mappings-panel__toggle[_ngcontent-%COMP%], \n.mappings-panel__new[_ngcontent-%COMP%], \n.mapping-list__item[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #d6dfed;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #111827;\n  cursor: pointer;\n  text-align: left;\n}\n\n.mappings-panel__toggle[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 44px;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  border-color: #111827;\n  background: #fcbd00;\n  font-weight: 800;\n  padding: 10px 12px;\n}\n\n.mappings-panel__toggle[_ngcontent-%COMP%]:hover {\n  background: #f2b400;\n}\n\n.mappings-panel__count[_ngcontent-%COMP%] {\n  display: inline-flex;\n  min-width: 30px;\n  min-height: 26px;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid #111827;\n  border-radius: 999px;\n  background: #ffffff;\n  font-size: 0.86rem;\n}\n\n.mappings-panel__new[_ngcontent-%COMP%] {\n  min-height: 42px;\n  font-weight: 780;\n  padding: 10px 12px;\n}\n\n.mappings-panel__new--active[_ngcontent-%COMP%], \n.mappings-panel__new[_ngcontent-%COMP%]:hover, \n.mapping-list__item--active[_ngcontent-%COMP%], \n.mapping-list__item[_ngcontent-%COMP%]:hover {\n  border-color: #111827;\n  box-shadow: inset 4px 0 0 #fcbd00;\n}\n\n.mappings-panel__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n\n.mappings-panel__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #111827;\n  font-size: 1.05rem;\n}\n\n.mappings-panel__header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: inline-flex;\n  min-width: 34px;\n  min-height: 30px;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid #111827;\n  border-radius: 999px;\n  background: #ffd166;\n  font-weight: 780;\n}\n\n.mapping-search[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 7px;\n}\n\n.mapping-search[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #1f2937;\n  font-size: 0.86rem;\n  font-weight: 760;\n}\n\n.mapping-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #cfd8e6;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #111827;\n  padding: 10px 12px;\n}\n\n.mapping-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  border-color: #fcbd00;\n  box-shadow: 0 0 0 3px rgb(252 189 0 / 16%);\n  outline: none;\n}\n\n.mapping-filter[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1px;\n  overflow: hidden;\n  border: 1px solid #cfd8e6;\n  border-radius: 8px;\n  background: #dfe5ef;\n}\n\n.mapping-filter[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 36px;\n  border: 0;\n  background: #ffffff;\n  color: #38445a;\n  cursor: pointer;\n  font-weight: 760;\n}\n\n.mapping-filter[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover, \n.mapping-filter__button--active[_ngcontent-%COMP%] {\n  background: #fcbd00;\n  color: #111827;\n}\n\n.mappings-panel__state[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #38445a;\n  font-weight: 650;\n}\n\n.mapping-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 10px;\n  max-height: 66vh;\n  overflow: auto;\n  padding-right: 2px;\n}\n\n.mapping-list__item[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 5px;\n  padding: 12px;\n}\n\n.mapping-list__name[_ngcontent-%COMP%] {\n  overflow: hidden;\n  color: #111827;\n  font-weight: 780;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.mapping-list__meta[_ngcontent-%COMP%] {\n  color: #4b5563;\n  font-size: 0.8rem;\n  font-weight: 650;\n}\n\n.wizard-header[_ngcontent-%COMP%] {\n  margin-bottom: 34px;\n}\n\n.loading-message[_ngcontent-%COMP%] {\n  margin: -18px 0 24px;\n  font-weight: 750;\n}\n\n.wizard-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #111827;\n  font-size: clamp(1.65rem, 3.2vw, 2.35rem);\n  font-weight: 760;\n  letter-spacing: 0;\n  line-height: 1.08;\n}\n\n.wizard-header__description[_ngcontent-%COMP%] {\n  margin: 14px 0 0;\n  color: #5d6b82;\n  font-size: 1.05rem;\n  line-height: 1.6;\n}\n\n.mapping-form[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 30px;\n}\n\n.optional-label[_ngcontent-%COMP%] {\n  color: #657184;\n  font-size: .78rem;\n  font-weight: 650;\n}\n\n.template-section[_ngcontent-%COMP%] {\n  overflow: hidden;\n  border: 2px solid #111827;\n  border-radius: 14px;\n  background: #fffaf0;\n  box-shadow: 6px 6px 0 rgb(17 24 39 / 14%);\n}\n\n.template-section__header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  gap: 13px;\n  align-items: center;\n  border-bottom: 1px solid #d8cfae;\n  background: #fff4cf;\n  color: #111827;\n  padding: 15px 18px;\n}\n\n.template-section__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #111827;\n  font-size: 1.03rem;\n  line-height: 1.2;\n}\n\n.template-section__header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: #4b5563;\n  font-size: .84rem;\n  line-height: 1.4;\n}\n\n.template-section__icon[_ngcontent-%COMP%] {\n  display: grid;\n  width: 34px;\n  height: 34px;\n  place-items: center;\n  border: 1px solid #111827;\n  border-radius: 9px;\n  background: #fcbd00;\n  color: #111827;\n  font-size: 1.1rem;\n  font-weight: 900;\n}\n\n.template-section__optional[_ngcontent-%COMP%] {\n  border: 1px solid #111827;\n  border-radius: 999px;\n  background: #fff;\n  color: #111827;\n  font-size: .72rem;\n  font-weight: 800;\n  padding: 5px 9px;\n  text-transform: uppercase;\n}\n\n.template-select-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(280px, .85fr);\n  gap: 20px;\n  align-items: center;\n  padding: 20px;\n}\n\n.template-select-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  color: #111827;\n  font-size: .96rem;\n}\n\n.template-select-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.template-summary[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 6px 0 0;\n  color: #4b5563;\n  font-size: .88rem;\n  line-height: 1.45;\n}\n\n.template-select-row[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 48px;\n  border: 1px solid #111827;\n  border-radius: 8px;\n  background: #fff;\n  color: #111827;\n  font-weight: 650;\n  padding: 10px 12px;\n}\n\n.template-select-row[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 3px rgb(252 189 0 / 24%);\n  outline: none;\n}\n\n.template-empty-state[_ngcontent-%COMP%] {\n  margin: 0 20px 20px;\n  border: 1px dashed #8a6a00;\n  border-radius: 8px;\n  background: #fff8df;\n  color: #5c4700;\n  font-size: .86rem;\n  font-weight: 650;\n  line-height: 1.45;\n  padding: 11px 13px;\n}\n\n.template-summary[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 3px;\n  margin: 0 20px 20px;\n  border: 1px solid #111827;\n  border-left: 6px solid #111827;\n  border-radius: 8px;\n  background: #fcbd00;\n  color: #111827;\n  padding: 13px 15px;\n}\n\n.template-summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.template-summary[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: .82rem;\n  font-weight: 700;\n}\n\n.template-summary[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #111827;\n  font-size: .85rem;\n}\n\n.template-pattern-note[_ngcontent-%COMP%] {\n  margin: 10px 0 0;\n  color: #4b5563;\n  font-size: .84rem;\n  font-weight: 650;\n}\n\n.template-compatibility-warning[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr);\n  gap: 12px;\n  align-items: start;\n  margin-top: 14px;\n  border: 1px solid #8a5a00;\n  border-left: 6px solid #8a5a00;\n  border-radius: 9px;\n  background: #fff4cf;\n  color: #4d3300;\n  padding: 13px 15px;\n}\n\n.template-compatibility-warning__icon[_ngcontent-%COMP%] {\n  display: grid;\n  width: 26px;\n  height: 26px;\n  place-items: center;\n  border-radius: 50%;\n  background: #8a5a00;\n  color: #fff;\n  font-weight: 900;\n}\n\n.template-compatibility-warning[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 3px;\n}\n\n.template-compatibility-warning[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  line-height: 1.45;\n}\n\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 22px;\n}\n\n.field[_ngcontent-%COMP%] {\n  display: grid;\n  align-content: start;\n  gap: 9px;\n}\n\n.field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: #1f2937;\n  font-size: 0.96rem;\n  font-weight: 720;\n}\n\n.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #cfd8e6;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #172033;\n  padding: 14px 15px;\n  transition: border-color 160ms ease, box-shadow 160ms ease;\n}\n\n.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  min-height: 116px;\n  resize: vertical;\n}\n\n.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  border-color: #fcbd00;\n  box-shadow: 0 0 0 3px rgb(252 189 0 / 16%);\n  outline: none;\n}\n\n.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: #8a97aa;\n}\n\n.field__control--invalid[_ngcontent-%COMP%] {\n  border-color: #b42318;\n}\n\n.option-section[_ngcontent-%COMP%] {\n  min-width: 0;\n  margin: 0;\n  border: 0;\n  border-top: 1px solid #dfe5ef;\n  padding: 28px 0 0;\n}\n\n.option-section[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%] {\n  margin-bottom: 14px;\n  color: #1f2937;\n  font-size: 0.96rem;\n  font-weight: 720;\n}\n\n.pattern-select-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(120px, 220px) minmax(0, 1fr);\n  align-items: center;\n  gap: 18px;\n  border-radius: 8px;\n  background: #f1f3f5;\n  padding: 14px 20px;\n}\n\n.pattern-select-row[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n  color: #1f2937;\n  font-size: 0.9rem;\n  font-weight: 760;\n  text-transform: uppercase;\n}\n\n.pattern-select-wrap[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.pattern-select-wrap[_ngcontent-%COMP%]::after {\n  position: absolute;\n  top: 50%;\n  right: 15px;\n  border-top: 6px solid #7b8491;\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  content: '';\n  pointer-events: none;\n  transform: translateY(-50%);\n}\n\n.pattern-select-wrap[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 46px;\n  appearance: none;\n  border: 1px solid #d8dee8;\n  border-radius: 5px;\n  background: #ffffff;\n  color: #172033;\n  cursor: pointer;\n  padding: 11px 42px 11px 14px;\n}\n\n.pattern-select-wrap[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  border-color: #fcbd00;\n  box-shadow: 0 0 0 3px rgb(252 189 0 / 16%);\n  outline: none;\n}\n\n.pattern-option[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr);\n  gap: 12px;\n  min-height: 92px;\n  align-items: start;\n  border: 1px solid #cfd8e6;\n  border-radius: 8px;\n  background: #ffffff;\n  cursor: pointer;\n  padding: 16px;\n  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;\n}\n\n.pattern-option[_ngcontent-%COMP%]:hover, \n.pattern-option--selected[_ngcontent-%COMP%] {\n  border-color: #111827;\n  box-shadow: inset 4px 0 0 #fcbd00;\n}\n\n.pattern-option[_ngcontent-%COMP%]:has(input:focus-visible) {\n  outline: 3px solid rgb(252 189 0 / 24%);\n  outline-offset: 2px;\n}\n\n.pattern-option[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  margin-top: 3px;\n  accent-color: #fcbd00;\n}\n\n.pattern-option__body[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 6px;\n}\n\n.pattern-option__title[_ngcontent-%COMP%] {\n  color: #111827;\n  font-weight: 780;\n}\n\n.pattern-option__description[_ngcontent-%COMP%] {\n  color: #4b5563;\n  font-size: 0.88rem;\n  line-height: 1.45;\n}\n\n.mtv-header-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 16px;\n}\n\n.option-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 14px;\n}\n\n.option-grid--target[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n}\n\n.source-upload[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  justify-items: center;\n  gap: 12px;\n  overflow: hidden;\n  min-height: 260px;\n  border: 2px dashed #aebbd0;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #172033;\n  cursor: pointer;\n  padding: 38px 24px;\n  text-align: center;\n  transition: background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease;\n}\n\n.source-upload[_ngcontent-%COMP%]:hover:not(.source-upload--disabled), \n.source-upload--active[_ngcontent-%COMP%] {\n  border-color: #fcbd00;\n  background: #f8fbff;\n  box-shadow: 0 12px 28px rgb(252 189 0 / 14%);\n}\n\n.source-upload[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  cursor: pointer;\n  opacity: 0;\n}\n\n.source-upload--ready[_ngcontent-%COMP%] {\n  border-style: solid;\n  border-color: #8bd2bd;\n  background: #f7fffc;\n}\n\n.source-upload--disabled[_ngcontent-%COMP%] {\n  cursor: not-allowed;\n  opacity: 0.62;\n}\n\n.source-upload--disabled[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  cursor: not-allowed;\n}\n\n.source-upload__icon[_ngcontent-%COMP%] {\n  position: relative;\n  width: 54px;\n  height: 64px;\n  border: 2px solid #fcbd00;\n  border-radius: 8px;\n  background: #fff4cf;\n}\n\n.source-upload__icon[_ngcontent-%COMP%]::before {\n  position: absolute;\n  top: -2px;\n  right: -2px;\n  width: 18px;\n  height: 18px;\n  border-bottom: 2px solid #fcbd00;\n  border-left: 2px solid #fcbd00;\n  border-radius: 0 8px 0 4px;\n  background: #ffffff;\n  content: \"\";\n}\n\n.source-upload__title[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 760;\n}\n\n.source-upload__button[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: inline-flex;\n  min-height: 42px;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  background: #fcbd00;\n  color: #ffffff;\n  font-weight: 760;\n  padding: 10px 18px;\n}\n\n.source-upload__description[_ngcontent-%COMP%], \n.source-upload__meta[_ngcontent-%COMP%] {\n  color: #5d6b82;\n  line-height: 1.45;\n}\n\n.source-upload__meta[_ngcontent-%COMP%] {\n  color: #0f6654;\n  font-weight: 700;\n}\n\n.validation-message[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #b42318;\n  font-size: 0.88rem;\n  line-height: 1.45;\n}\n\n.feedback[_ngcontent-%COMP%] {\n  min-height: 48px;\n}\n\n.alert[_ngcontent-%COMP%] {\n  margin: 0;\n  border-radius: 8px;\n  padding: 14px 16px;\n  font-weight: 650;\n  line-height: 1.45;\n}\n\n.alert--success[_ngcontent-%COMP%] {\n  border: 1px solid #8bd2bd;\n  background: #eaf8f3;\n  color: #0f6654;\n}\n\n.alert--error[_ngcontent-%COMP%] {\n  border: 1px solid #f0a8a0;\n  background: #fff0ed;\n  color: #9f2418;\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  border-top: 1px solid #dfe5ef;\n  padding-top: 24px;\n}\n\n.draft-action[_ngcontent-%COMP%], \n.discard-action[_ngcontent-%COMP%], \n.stay-action[_ngcontent-%COMP%] {\n  min-height: 44px;\n  border: 1px solid #000;\n  border-radius: 8px;\n  background: #fff;\n  cursor: pointer;\n  font-weight: 780;\n  padding: 11px 16px;\n}\n\n.draft-action[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #000;\n  color: #fff !important;\n}\n\n.discard-action[_ngcontent-%COMP%] {\n  border-color: #9f3028;\n  background: #f7d9d5;\n}\n\n.stay-action[_ngcontent-%COMP%] {\n  background: #fcbd00;\n}\n\n.draft-action[_ngcontent-%COMP%]:disabled, \n.discard-action[_ngcontent-%COMP%]:disabled, \n.stay-action[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: .55;\n}\n\n.exit-dialog[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 100;\n  inset: 0;\n  display: grid;\n  place-items: center;\n  background: rgb(0 0 0 / 58%) !important;\n  padding: 20px;\n}\n\n.exit-dialog__card[_ngcontent-%COMP%] {\n  width: min(560px, 100%);\n  border: 2px solid #000;\n  border-radius: 16px;\n  background: #fff !important;\n  padding: 26px;\n  box-shadow: 10px 10px 0 #fcbd00;\n}\n\n.exit-dialog__card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.exit-dialog__card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 12px 0 24px;\n  line-height: 1.55;\n}\n\n.exit-dialog__actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n\n.form-actions[_ngcontent-%COMP%]   .primary-action[_ngcontent-%COMP%] {\n  min-width: 148px;\n  border: 2px solid #000 !important;\n  border-radius: 8px;\n  background: #fff !important;\n  color: #000000 !important;\n  cursor: pointer;\n  font-weight: 780;\n  padding: 13px 20px;\n  box-shadow: none !important;\n  transition: background-color 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease;\n}\n\n.form-actions[_ngcontent-%COMP%]   .primary-action[_ngcontent-%COMP%]   *[_ngcontent-%COMP%] {\n  color: #000000 !important;\n}\n\n.form-actions[_ngcontent-%COMP%]   .primary-action[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: #000 !important;\n  background: #000 !important;\n  color: #ffffff !important;\n  box-shadow: 0 12px 24px rgb(0 0 0 / 18%) !important;\n  transform: translateY(-1px);\n}\n\n.form-actions[_ngcontent-%COMP%]   .primary-action[_ngcontent-%COMP%]:hover:not(:disabled)   *[_ngcontent-%COMP%] {\n  color: #ffffff !important;\n}\n\n.form-actions[_ngcontent-%COMP%]   .primary-action[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid rgb(0 0 0 / 24%);\n  outline-offset: 2px;\n}\n\n.form-actions[_ngcontent-%COMP%]   .primary-action[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  border-color: #9ca8ba !important;\n  background: #fff !important;\n  color: #9ca8ba !important;\n  box-shadow: none !important;\n}\n\n.form-actions[_ngcontent-%COMP%]   .primary-action[_ngcontent-%COMP%]:disabled   *[_ngcontent-%COMP%] {\n  color: #9ca8ba !important;\n}\n\n@media (max-width: 900px) {\n  .create-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .mapping-list[_ngcontent-%COMP%] {\n    max-height: 300px;\n  }\n\n  .form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .template-select-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .mtv-header-grid[_ngcontent-%COMP%], \n   .option-grid[_ngcontent-%COMP%], \n   .option-grid--target[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 560px) {\n  .create-page[_ngcontent-%COMP%] {\n    padding: 28px 16px;\n  }\n\n  .wizard-header[_ngcontent-%COMP%] {\n    margin-bottom: 26px;\n  }\n\n  .option-grid[_ngcontent-%COMP%], \n   .option-grid--target[_ngcontent-%COMP%], \n   .mtv-header-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .pattern-select-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 9px;\n  }\n\n  .template-section__header[_ngcontent-%COMP%] {\n    grid-template-columns: auto minmax(0, 1fr);\n  }\n\n  .template-section__optional[_ngcontent-%COMP%] {\n    grid-column: 2;\n    justify-self: start;\n  }\n\n  .form-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    justify-content: stretch;\n  }\n\n  .primary-action[_ngcontent-%COMP%], \n   .draft-action[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CreateMappingPageComponent, [{
        type: Component,
        args: [{ selector: 'app-create-mapping-page', standalone: true, imports: [CommonModule, ReactiveFormsModule, WizardStepperComponent], template: "<main class=\"create-page\">\n  <section class=\"wizard-shell\" aria-labelledby=\"create-mapping-title\">\n    <header class=\"wizard-header\">\n      <h1 id=\"create-mapping-title\">{{ isEditingMapping ? 'Mapping D\u00FCzenle' : 'Yeni Mapping Olu\u015Ftur' }}</h1>\n      <app-wizard-stepper [currentStep]=\"1\"></app-wizard-stepper>\n    </header>\n\n    <p class=\"loading-message\" *ngIf=\"isMappingsLoading\">Mapping bilgileri y\u00FCkleniyor...</p>\n\n    <form class=\"mapping-form\" [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\" novalidate>\n      <section class=\"template-section\" *ngIf=\"!isEditingMapping\" aria-labelledby=\"template-section-title\">\n        <header class=\"template-section__header\">\n          <span class=\"template-section__icon\" aria-hidden=\"true\">\u2197</span>\n          <div>\n            <h2 id=\"template-section-title\">\u015Eablon Se\u00E7</h2>\n            <p>\u00D6nceki bir mapping'in kurallar\u0131n\u0131 yeni \u00E7al\u0131\u015Fma i\u00E7in ba\u015Flang\u0131\u00E7 noktas\u0131 olarak kullan\u0131n.</p>\n          </div>\n          <span class=\"template-section__optional\">Opsiyonel</span>\n        </header>\n        <div class=\"template-select-row\">\n          <div>\n            <strong>Kay\u0131tl\u0131 bir mapping'i yeniden kullan</strong>\n            <p>Kaynak alan yap\u0131s\u0131, pozisyonlar, hedef \u015Fema, e\u015Flemeler ve transform tipleri yeni mapping'e kopyalan\u0131r.</p>\n          </div>\n          <select\n            id=\"mapping-template\"\n            [value]=\"selectedTemplate?.id ?? ''\"\n            (change)=\"selectTemplate($event)\"\n            [disabled]=\"isMappingsLoading\"\n          >\n            <option value=\"\">\u015Eablonsuz / S\u0131f\u0131rdan olu\u015Ftur</option>\n            <option *ngFor=\"let mapping of templateMappings\" [value]=\"mapping.id\">\n              {{ mapping.name }}{{ mapping.institution ? ' \u2014 ' + mapping.institution : '' }}\n              ({{ getTemplateSourceTypeLabel(mapping.sourceType) }})\n            </option>\n          </select>\n        </div>\n        <p class=\"template-empty-state\" *ngIf=\"!isMappingsLoading && templateMappings.length === 0\">\n          Hen\u00FCz \u015Fablon olarak kaydedilmi\u015F bir mapping bulunmuyor. Yeni bir mapping olu\u015Fturup canvas ekran\u0131ndan\n          \u015Fablon olarak kaydedebilirsiniz.\n        </p>\n        <div class=\"template-summary\" *ngIf=\"selectedTemplate\">\n          <span>Se\u00E7ilen \u015Fablon</span>\n          <strong>{{ selectedTemplate.name }}</strong>\n          <small>\n            {{ selectedTemplate.institution || 'Kurum belirtilmemi\u015F' }} \u00B7\n            {{ getTemplateSourceTypeLabel(selectedTemplate.sourceType) }} \u00B7\n            {{ getPatternTypeLabel(selectedTemplate.patternType) }} \u00B7\n            {{ selectedTemplate.mappingDefinitions?.length || 0 }} e\u015Fleme\n          </small>\n          <p>\u015Eablon kayd\u0131 de\u011Fi\u015Ftirilmeyecek; kaydetti\u011Finizde yeni bir mapping olu\u015Fturulacak.</p>\n        </div>\n        <p class=\"validation-message\" *ngIf=\"mappingsError\">{{ mappingsError }}</p>\n      </section>\n\n      <div class=\"form-grid\">\n        <div class=\"field\">\n          <label for=\"mapping-name\">Mapping Ad\u0131</label>\n          <input\n            id=\"mapping-name\"\n            type=\"text\"\n            formControlName=\"name\"\n            autocomplete=\"off\"\n            [class.field__control--invalid]=\"nameInvalid\"\n          >\n          <p class=\"validation-message\" *ngIf=\"nameInvalid\">Mapping ad\u0131 zorunludur.</p>\n        </div>\n\n        <div class=\"field\">\n          <label for=\"mapping-institution\">Kurum <span class=\"optional-label\">Opsiyonel</span></label>\n          <input\n            id=\"mapping-institution\"\n            type=\"text\"\n            formControlName=\"institution\"\n            autocomplete=\"organization\"\n            placeholder=\"\u00D6rn. Turkcell, Vak\u0131fBank\"\n          >\n        </div>\n\n        <div class=\"field\">\n          <label for=\"mapping-description\">A\u00E7\u0131klama</label>\n          <textarea\n            id=\"mapping-description\"\n            formControlName=\"description\"\n            rows=\"4\"\n          ></textarea>\n            <p class=\"validation-message\" *ngIf=\"descriptionInvalid\">A\u00E7\u0131klama zorunludur.</p>\n        </div>\n      </div>\n\n      <fieldset class=\"option-section pattern-section\" aria-label=\"Dosya deseni se\u00E7imi\">\n        <legend>Dosya Deseni</legend>\n        <div class=\"pattern-select-row\">\n          <label for=\"mapping-pattern-type\">Desen T\u00FCr\u00FC</label>\n          <div class=\"pattern-select-wrap\">\n            <select\n              id=\"mapping-pattern-type\"\n              formControlName=\"patternType\"\n              [attr.aria-readonly]=\"selectedTemplate ? 'true' : null\"\n              [attr.disabled]=\"selectedTemplate ? true : null\"\n              [class.field__control--invalid]=\"patternTypeInvalid\"\n            >\n              <option value=\"\" disabled>Se\u00E7iniz</option>\n              <ng-container *ngFor=\"let group of patternTypeGroups\">\n                <ng-container *ngIf=\"!group.label\">\n                  <option *ngFor=\"let option of group.options\" [value]=\"option.value\">{{ option.label }}</option>\n                </ng-container>\n                <optgroup *ngIf=\"group.label\" [label]=\"group.label\">\n                  <option *ngFor=\"let option of group.options\" [value]=\"option.value\">{{ option.label }}</option>\n                </optgroup>\n              </ng-container>\n            </select>\n          </div>\n        </div>\n        <p class=\"template-pattern-note\" *ngIf=\"selectedTemplate\">\n          Desen t\u00FCr\u00FC se\u00E7ilen \u015Fablondan al\u0131nm\u0131\u015Ft\u0131r.\n        </p>\n        <p class=\"validation-message\" *ngIf=\"patternTypeInvalid\">Dosya deseni se\u00E7imi zorunludur.</p>\n      </fieldset>\n\n      <fieldset class=\"option-section mtv-header-section\" *ngIf=\"isVergiPattern\" aria-label=\"Vergi Header bilgileri\">\n        <legend>Vergi Header Bilgileri</legend>\n        <div class=\"mtv-header-grid\">\n          <div class=\"field\">\n            <label for=\"mtv-sube-kodu\">\u015Eube Kodu</label>\n            <input\n              id=\"mtv-sube-kodu\"\n              type=\"text\"\n              inputmode=\"numeric\"\n              maxlength=\"5\"\n              formControlName=\"mtvSubeKodu\"\n              autocomplete=\"off\"\n            >\n          </div>\n\n          <div class=\"field\">\n            <label for=\"mtv-kurum-kodu\">Kurum Kodu</label>\n            <input\n              id=\"mtv-kurum-kodu\"\n              type=\"text\"\n              inputmode=\"numeric\"\n              maxlength=\"5\"\n              formControlName=\"mtvKurumKodu\"\n              autocomplete=\"off\"\n            >\n          </div>\n\n          <div class=\"field\">\n            <label for=\"mtv-dosya-tarihi\">Dosya Tarihi</label>\n            <input\n              id=\"mtv-dosya-tarihi\"\n              type=\"text\"\n              inputmode=\"numeric\"\n              maxlength=\"8\"\n              formControlName=\"mtvDosyaTarihi\"\n              autocomplete=\"off\"\n            >\n          </div>\n\n          <div class=\"field\">\n            <label for=\"mtv-kurum-hesap-no\">Kurum Hesap No</label>\n            <input\n              id=\"mtv-kurum-hesap-no\"\n              type=\"text\"\n              inputmode=\"numeric\"\n              maxlength=\"17\"\n              formControlName=\"mtvKurumHesapNo\"\n              autocomplete=\"off\"\n            >\n          </div>\n        </div>\n        <p class=\"validation-message\" *ngIf=\"mtvHeaderInvalid\">\n          Vergi Header i\u00E7in \u015Eube Kodu 5, Kurum Kodu 5, Dosya Tarihi 8, Kurum Hesap No 17 rakam olmal\u0131d\u0131r.\n        </p>\n      </fieldset>\n\n      <fieldset class=\"option-section mtv-header-section\" *ngIf=\"isTosPattern\" aria-label=\"T\u00D6S Header bilgileri\">\n        <legend>T\u00D6S Header Bilgileri</legend>\n        <div class=\"mtv-header-grid\">\n          <div class=\"field\">\n            <label for=\"tos-sube-kodu\">\u015Eube Kodu</label>\n            <input id=\"tos-sube-kodu\" type=\"text\" inputmode=\"numeric\" maxlength=\"5\" formControlName=\"tosSubeKodu\" autocomplete=\"off\">\n          </div>\n\n          <div class=\"field\">\n            <label for=\"tos-kurum-kodu\">Kurum Kodu</label>\n            <input id=\"tos-kurum-kodu\" type=\"text\" inputmode=\"numeric\" maxlength=\"5\" formControlName=\"tosKurumKodu\" autocomplete=\"off\">\n          </div>\n\n          <div class=\"field\">\n            <label for=\"tos-dosya-tarihi\">Dosya Tarihi</label>\n            <input id=\"tos-dosya-tarihi\" type=\"text\" inputmode=\"numeric\" maxlength=\"8\" formControlName=\"tosDosyaTarihi\" autocomplete=\"off\">\n          </div>\n\n          <div class=\"field\">\n            <label for=\"tos-kurum-hesap-no\">Kurum Hesap No</label>\n            <input id=\"tos-kurum-hesap-no\" type=\"text\" maxlength=\"26\" formControlName=\"tosKurumHesapNo\" autocomplete=\"off\">\n          </div>\n        </div>\n        <p class=\"validation-message\" *ngIf=\"tosHeaderInvalid\">\n          T\u00D6S Header i\u00E7in \u015Eube Kodu 5, Kurum Kodu 5, Dosya Tarihi 8 rakam; Kurum Hesap No 26 karakter olmal\u0131d\u0131r.\n        </p>\n        <p class=\"source-upload__description\" *ngIf=\"hasSourceFile\">\n          Otomatik se\u00E7ilen T\u00D6S deseni: <strong>{{ tosVariantLabel }}</strong>\n        </p>\n      </fieldset>\n\n      <fieldset class=\"option-section\" aria-label=\"Kaynak dosya y\u00FCkleme\">\n        <label\n          class=\"source-upload\"\n          [class.source-upload--ready]=\"hasSourceFile\"\n          [class.source-upload--active]=\"isSourceDragActive\"\n          [class.source-upload--disabled]=\"isSubmitting\"\n          (dragover)=\"onSourceFileDragOver($event)\"\n          (dragleave)=\"onSourceFileDragLeave($event)\"\n          (drop)=\"onSourceFileDropped($event)\"\n        >\n          <input\n            type=\"file\"\n            accept=\".xlsx,.xls,.csv,.txt\"\n            (change)=\"onSourceFileSelected($event)\"\n            [disabled]=\"isSubmitting\"\n          >\n          <span class=\"source-upload__icon\" aria-hidden=\"true\"></span>\n          <span class=\"source-upload__title\">Dosyan\u0131z\u0131 buraya s\u00FCr\u00FCkleyin veya</span>\n          <span class=\"source-upload__button\">Dosya Se\u00E7</span>\n          <span class=\"source-upload__description\">Desteklenen dosya t\u00FCrleri: Excel (.xlsx, .xls), CSV (.csv), TXT (.txt)</span>\n          <span class=\"source-upload__meta\" *ngIf=\"hasSourceFile\">\n            {{ sourceFileMeta }}\n          </span>\n        </label>\n        <p class=\"validation-message\" *ngIf=\"sourceFileError\">{{ sourceFileError }}</p>\n        <div class=\"template-compatibility-warning\" *ngIf=\"templateCompatibilityWarning\" role=\"alert\">\n          <span class=\"template-compatibility-warning__icon\" aria-hidden=\"true\">!</span>\n          <div>\n            <strong>\u015Eablon ve dosya format\u0131 uyumsuz</strong>\n            <p>{{ templateCompatibilityWarning }}</p>\n          </div>\n        </div>\n      </fieldset>\n\n      <div class=\"feedback\" aria-live=\"polite\">\n        <p class=\"alert alert--success\" *ngIf=\"successMessage\">{{ successMessage }}</p>\n        <p class=\"alert alert--error\" *ngIf=\"errorMessage\">{{ errorMessage }}</p>\n      </div>\n\n      <div class=\"form-actions\">\n        <button class=\"draft-action\" type=\"button\" [disabled]=\"!canContinue\" (click)=\"saveAsDraft()\">\n          Kaydet\n        </button>\n        <button class=\"primary-action\" type=\"submit\" [disabled]=\"!canContinue\">\n          <span *ngIf=\"!isSubmitting\">{{ isEditingMapping ? 'G\u00FCncelle ve Devam Et' : 'Devam Et' }}</span>\n          <span *ngIf=\"isSubmitting\">Kaydediliyor...</span>\n        </button>\n      </div>\n    </form>\n  </section>\n\n  <div class=\"exit-dialog\" *ngIf=\"isExitDialogOpen\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"exit-dialog-title\">\n    <div class=\"exit-dialog__card\">\n      <h2 id=\"exit-dialog-title\">Kaydedilmemi\u015F de\u011Fi\u015Fiklikler var</h2>\n      <p>\u00C7\u0131kmadan \u00F6nce \u00E7al\u0131\u015Fman\u0131z\u0131 kaydedip daha sonra devam etmek ister misiniz?</p>\n      <div class=\"exit-dialog__actions\">\n        <button class=\"draft-action\" type=\"button\" [disabled]=\"isSubmitting\" (click)=\"saveDraftAndLeave()\">\n          {{ isSubmitting ? 'Kaydediliyor...' : 'Kaydet ve \u00C7\u0131k' }}\n        </button>\n        <button class=\"discard-action\" type=\"button\" [disabled]=\"isSubmitting\" (click)=\"discardChangesAndLeave()\">\n          Kaydetmeden \u00C7\u0131k\n        </button>\n        <button class=\"stay-action\" type=\"button\" [disabled]=\"isSubmitting\" (click)=\"stayOnPage()\">Sayfada Kal</button>\n      </div>\n    </div>\n  </div>\n</main>\n", styles: [".create-page {\n  min-height: 100vh;\n  background: #fdb515 !important;\n  padding: 72px 20px 48px;\n}\n\n.wizard-shell {\n  min-width: 0;\n  width: min(1040px, 100%);\n  margin: 0 auto;\n}\n\n.mappings-panel {\n  display: grid;\n  gap: 12px;\n  color: #111827;\n}\n\n.mappings-panel--open {\n  border: 1px solid #dfe5ef;\n  border-radius: 10px;\n  background: rgb(255 255 255 / 88%);\n  padding: 14px;\n  box-shadow: 0 12px 26px rgb(17 24 39 / 8%);\n}\n\n.mappings-panel__content {\n  display: grid;\n  gap: 14px;\n}\n\n.mappings-panel__toggle,\n.mappings-panel__new,\n.mapping-list__item {\n  width: 100%;\n  border: 1px solid #d6dfed;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #111827;\n  cursor: pointer;\n  text-align: left;\n}\n\n.mappings-panel__toggle {\n  display: flex;\n  min-height: 44px;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  border-color: #111827;\n  background: #fcbd00;\n  font-weight: 800;\n  padding: 10px 12px;\n}\n\n.mappings-panel__toggle:hover {\n  background: #f2b400;\n}\n\n.mappings-panel__count {\n  display: inline-flex;\n  min-width: 30px;\n  min-height: 26px;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid #111827;\n  border-radius: 999px;\n  background: #ffffff;\n  font-size: 0.86rem;\n}\n\n.mappings-panel__new {\n  min-height: 42px;\n  font-weight: 780;\n  padding: 10px 12px;\n}\n\n.mappings-panel__new--active,\n.mappings-panel__new:hover,\n.mapping-list__item--active,\n.mapping-list__item:hover {\n  border-color: #111827;\n  box-shadow: inset 4px 0 0 #fcbd00;\n}\n\n.mappings-panel__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n\n.mappings-panel__header h2 {\n  margin: 0;\n  color: #111827;\n  font-size: 1.05rem;\n}\n\n.mappings-panel__header span {\n  display: inline-flex;\n  min-width: 34px;\n  min-height: 30px;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid #111827;\n  border-radius: 999px;\n  background: #ffd166;\n  font-weight: 780;\n}\n\n.mapping-search {\n  display: grid;\n  gap: 7px;\n}\n\n.mapping-search span {\n  color: #1f2937;\n  font-size: 0.86rem;\n  font-weight: 760;\n}\n\n.mapping-search input {\n  width: 100%;\n  border: 1px solid #cfd8e6;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #111827;\n  padding: 10px 12px;\n}\n\n.mapping-search input:focus {\n  border-color: #fcbd00;\n  box-shadow: 0 0 0 3px rgb(252 189 0 / 16%);\n  outline: none;\n}\n\n.mapping-filter {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1px;\n  overflow: hidden;\n  border: 1px solid #cfd8e6;\n  border-radius: 8px;\n  background: #dfe5ef;\n}\n\n.mapping-filter button {\n  min-height: 36px;\n  border: 0;\n  background: #ffffff;\n  color: #38445a;\n  cursor: pointer;\n  font-weight: 760;\n}\n\n.mapping-filter button:hover,\n.mapping-filter__button--active {\n  background: #fcbd00;\n  color: #111827;\n}\n\n.mappings-panel__state {\n  margin: 0;\n  color: #38445a;\n  font-weight: 650;\n}\n\n.mapping-list {\n  display: grid;\n  gap: 10px;\n  max-height: 66vh;\n  overflow: auto;\n  padding-right: 2px;\n}\n\n.mapping-list__item {\n  display: grid;\n  gap: 5px;\n  padding: 12px;\n}\n\n.mapping-list__name {\n  overflow: hidden;\n  color: #111827;\n  font-weight: 780;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.mapping-list__meta {\n  color: #4b5563;\n  font-size: 0.8rem;\n  font-weight: 650;\n}\n\n.wizard-header {\n  margin-bottom: 34px;\n}\n\n.loading-message {\n  margin: -18px 0 24px;\n  font-weight: 750;\n}\n\n.wizard-header h1 {\n  margin: 0;\n  color: #111827;\n  font-size: clamp(1.65rem, 3.2vw, 2.35rem);\n  font-weight: 760;\n  letter-spacing: 0;\n  line-height: 1.08;\n}\n\n.wizard-header__description {\n  margin: 14px 0 0;\n  color: #5d6b82;\n  font-size: 1.05rem;\n  line-height: 1.6;\n}\n\n.mapping-form {\n  display: grid;\n  gap: 30px;\n}\n\n.optional-label {\n  color: #657184;\n  font-size: .78rem;\n  font-weight: 650;\n}\n\n.template-section {\n  overflow: hidden;\n  border: 2px solid #111827;\n  border-radius: 14px;\n  background: #fffaf0;\n  box-shadow: 6px 6px 0 rgb(17 24 39 / 14%);\n}\n\n.template-section__header {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  gap: 13px;\n  align-items: center;\n  border-bottom: 1px solid #d8cfae;\n  background: #fff4cf;\n  color: #111827;\n  padding: 15px 18px;\n}\n\n.template-section__header h2 {\n  margin: 0;\n  color: #111827;\n  font-size: 1.03rem;\n  line-height: 1.2;\n}\n\n.template-section__header p {\n  margin: 4px 0 0;\n  color: #4b5563;\n  font-size: .84rem;\n  line-height: 1.4;\n}\n\n.template-section__icon {\n  display: grid;\n  width: 34px;\n  height: 34px;\n  place-items: center;\n  border: 1px solid #111827;\n  border-radius: 9px;\n  background: #fcbd00;\n  color: #111827;\n  font-size: 1.1rem;\n  font-weight: 900;\n}\n\n.template-section__optional {\n  border: 1px solid #111827;\n  border-radius: 999px;\n  background: #fff;\n  color: #111827;\n  font-size: .72rem;\n  font-weight: 800;\n  padding: 5px 9px;\n  text-transform: uppercase;\n}\n\n.template-select-row {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(280px, .85fr);\n  gap: 20px;\n  align-items: center;\n  padding: 20px;\n}\n\n.template-select-row strong {\n  display: block;\n  color: #111827;\n  font-size: .96rem;\n}\n\n.template-select-row p,\n.template-summary p {\n  margin: 6px 0 0;\n  color: #4b5563;\n  font-size: .88rem;\n  line-height: 1.45;\n}\n\n.template-select-row select {\n  width: 100%;\n  min-height: 48px;\n  border: 1px solid #111827;\n  border-radius: 8px;\n  background: #fff;\n  color: #111827;\n  font-weight: 650;\n  padding: 10px 12px;\n}\n\n.template-select-row select:focus {\n  box-shadow: 0 0 0 3px rgb(252 189 0 / 24%);\n  outline: none;\n}\n\n.template-empty-state {\n  margin: 0 20px 20px;\n  border: 1px dashed #8a6a00;\n  border-radius: 8px;\n  background: #fff8df;\n  color: #5c4700;\n  font-size: .86rem;\n  font-weight: 650;\n  line-height: 1.45;\n  padding: 11px 13px;\n}\n\n.template-summary {\n  display: grid;\n  gap: 3px;\n  margin: 0 20px 20px;\n  border: 1px solid #111827;\n  border-left: 6px solid #111827;\n  border-radius: 8px;\n  background: #fcbd00;\n  color: #111827;\n  padding: 13px 15px;\n}\n\n.template-summary span,\n.template-summary small {\n  font-size: .82rem;\n  font-weight: 700;\n}\n\n.template-summary p {\n  color: #111827;\n  font-size: .85rem;\n}\n\n.template-pattern-note {\n  margin: 10px 0 0;\n  color: #4b5563;\n  font-size: .84rem;\n  font-weight: 650;\n}\n\n.template-compatibility-warning {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr);\n  gap: 12px;\n  align-items: start;\n  margin-top: 14px;\n  border: 1px solid #8a5a00;\n  border-left: 6px solid #8a5a00;\n  border-radius: 9px;\n  background: #fff4cf;\n  color: #4d3300;\n  padding: 13px 15px;\n}\n\n.template-compatibility-warning__icon {\n  display: grid;\n  width: 26px;\n  height: 26px;\n  place-items: center;\n  border-radius: 50%;\n  background: #8a5a00;\n  color: #fff;\n  font-weight: 900;\n}\n\n.template-compatibility-warning strong {\n  display: block;\n  margin-bottom: 3px;\n}\n\n.template-compatibility-warning p {\n  margin: 0;\n  line-height: 1.45;\n}\n\n.form-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 22px;\n}\n\n.field {\n  display: grid;\n  align-content: start;\n  gap: 9px;\n}\n\n.field label {\n  color: #1f2937;\n  font-size: 0.96rem;\n  font-weight: 720;\n}\n\n.field input,\n.field textarea {\n  width: 100%;\n  border: 1px solid #cfd8e6;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #172033;\n  padding: 14px 15px;\n  transition: border-color 160ms ease, box-shadow 160ms ease;\n}\n\n.field textarea {\n  min-height: 116px;\n  resize: vertical;\n}\n\n.field input:focus,\n.field textarea:focus {\n  border-color: #fcbd00;\n  box-shadow: 0 0 0 3px rgb(252 189 0 / 16%);\n  outline: none;\n}\n\n.field input::placeholder,\n.field textarea::placeholder {\n  color: #8a97aa;\n}\n\n.field__control--invalid {\n  border-color: #b42318;\n}\n\n.option-section {\n  min-width: 0;\n  margin: 0;\n  border: 0;\n  border-top: 1px solid #dfe5ef;\n  padding: 28px 0 0;\n}\n\n.option-section legend {\n  margin-bottom: 14px;\n  color: #1f2937;\n  font-size: 0.96rem;\n  font-weight: 720;\n}\n\n.pattern-select-row {\n  display: grid;\n  grid-template-columns: minmax(120px, 220px) minmax(0, 1fr);\n  align-items: center;\n  gap: 18px;\n  border-radius: 8px;\n  background: #f1f3f5;\n  padding: 14px 20px;\n}\n\n.pattern-select-row > label {\n  color: #1f2937;\n  font-size: 0.9rem;\n  font-weight: 760;\n  text-transform: uppercase;\n}\n\n.pattern-select-wrap {\n  position: relative;\n}\n\n.pattern-select-wrap::after {\n  position: absolute;\n  top: 50%;\n  right: 15px;\n  border-top: 6px solid #7b8491;\n  border-right: 5px solid transparent;\n  border-left: 5px solid transparent;\n  content: '';\n  pointer-events: none;\n  transform: translateY(-50%);\n}\n\n.pattern-select-wrap select {\n  width: 100%;\n  min-height: 46px;\n  appearance: none;\n  border: 1px solid #d8dee8;\n  border-radius: 5px;\n  background: #ffffff;\n  color: #172033;\n  cursor: pointer;\n  padding: 11px 42px 11px 14px;\n}\n\n.pattern-select-wrap select:focus {\n  border-color: #fcbd00;\n  box-shadow: 0 0 0 3px rgb(252 189 0 / 16%);\n  outline: none;\n}\n\n.pattern-option {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr);\n  gap: 12px;\n  min-height: 92px;\n  align-items: start;\n  border: 1px solid #cfd8e6;\n  border-radius: 8px;\n  background: #ffffff;\n  cursor: pointer;\n  padding: 16px;\n  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;\n}\n\n.pattern-option:hover,\n.pattern-option--selected {\n  border-color: #111827;\n  box-shadow: inset 4px 0 0 #fcbd00;\n}\n\n.pattern-option:has(input:focus-visible) {\n  outline: 3px solid rgb(252 189 0 / 24%);\n  outline-offset: 2px;\n}\n\n.pattern-option input {\n  margin-top: 3px;\n  accent-color: #fcbd00;\n}\n\n.pattern-option__body {\n  display: grid;\n  gap: 6px;\n}\n\n.pattern-option__title {\n  color: #111827;\n  font-weight: 780;\n}\n\n.pattern-option__description {\n  color: #4b5563;\n  font-size: 0.88rem;\n  line-height: 1.45;\n}\n\n.mtv-header-grid {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 16px;\n}\n\n.option-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 14px;\n}\n\n.option-grid--target {\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n}\n\n.source-upload {\n  position: relative;\n  display: grid;\n  justify-items: center;\n  gap: 12px;\n  overflow: hidden;\n  min-height: 260px;\n  border: 2px dashed #aebbd0;\n  border-radius: 8px;\n  background: #ffffff;\n  color: #172033;\n  cursor: pointer;\n  padding: 38px 24px;\n  text-align: center;\n  transition: background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease;\n}\n\n.source-upload:hover:not(.source-upload--disabled),\n.source-upload--active {\n  border-color: #fcbd00;\n  background: #f8fbff;\n  box-shadow: 0 12px 28px rgb(252 189 0 / 14%);\n}\n\n.source-upload input {\n  position: absolute;\n  inset: 0;\n  cursor: pointer;\n  opacity: 0;\n}\n\n.source-upload--ready {\n  border-style: solid;\n  border-color: #8bd2bd;\n  background: #f7fffc;\n}\n\n.source-upload--disabled {\n  cursor: not-allowed;\n  opacity: 0.62;\n}\n\n.source-upload--disabled input {\n  cursor: not-allowed;\n}\n\n.source-upload__icon {\n  position: relative;\n  width: 54px;\n  height: 64px;\n  border: 2px solid #fcbd00;\n  border-radius: 8px;\n  background: #fff4cf;\n}\n\n.source-upload__icon::before {\n  position: absolute;\n  top: -2px;\n  right: -2px;\n  width: 18px;\n  height: 18px;\n  border-bottom: 2px solid #fcbd00;\n  border-left: 2px solid #fcbd00;\n  border-radius: 0 8px 0 4px;\n  background: #ffffff;\n  content: \"\";\n}\n\n.source-upload__title {\n  font-size: 1.05rem;\n  font-weight: 760;\n}\n\n.source-upload__button {\n  position: relative;\n  z-index: 1;\n  display: inline-flex;\n  min-height: 42px;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  background: #fcbd00;\n  color: #ffffff;\n  font-weight: 760;\n  padding: 10px 18px;\n}\n\n.source-upload__description,\n.source-upload__meta {\n  color: #5d6b82;\n  line-height: 1.45;\n}\n\n.source-upload__meta {\n  color: #0f6654;\n  font-weight: 700;\n}\n\n.validation-message {\n  margin: 0;\n  color: #b42318;\n  font-size: 0.88rem;\n  line-height: 1.45;\n}\n\n.feedback {\n  min-height: 48px;\n}\n\n.alert {\n  margin: 0;\n  border-radius: 8px;\n  padding: 14px 16px;\n  font-weight: 650;\n  line-height: 1.45;\n}\n\n.alert--success {\n  border: 1px solid #8bd2bd;\n  background: #eaf8f3;\n  color: #0f6654;\n}\n\n.alert--error {\n  border: 1px solid #f0a8a0;\n  background: #fff0ed;\n  color: #9f2418;\n}\n\n.form-actions {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  border-top: 1px solid #dfe5ef;\n  padding-top: 24px;\n}\n\n.draft-action,\n.discard-action,\n.stay-action {\n  min-height: 44px;\n  border: 1px solid #000;\n  border-radius: 8px;\n  background: #fff;\n  cursor: pointer;\n  font-weight: 780;\n  padding: 11px 16px;\n}\n\n.draft-action:hover:not(:disabled) {\n  background: #000;\n  color: #fff !important;\n}\n\n.discard-action {\n  border-color: #9f3028;\n  background: #f7d9d5;\n}\n\n.stay-action {\n  background: #fcbd00;\n}\n\n.draft-action:disabled,\n.discard-action:disabled,\n.stay-action:disabled {\n  cursor: not-allowed;\n  opacity: .55;\n}\n\n.exit-dialog {\n  position: fixed;\n  z-index: 100;\n  inset: 0;\n  display: grid;\n  place-items: center;\n  background: rgb(0 0 0 / 58%) !important;\n  padding: 20px;\n}\n\n.exit-dialog__card {\n  width: min(560px, 100%);\n  border: 2px solid #000;\n  border-radius: 16px;\n  background: #fff !important;\n  padding: 26px;\n  box-shadow: 10px 10px 0 #fcbd00;\n}\n\n.exit-dialog__card h2 {\n  margin: 0;\n}\n\n.exit-dialog__card p {\n  margin: 12px 0 24px;\n  line-height: 1.55;\n}\n\n.exit-dialog__actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n\n.form-actions .primary-action {\n  min-width: 148px;\n  border: 2px solid #000 !important;\n  border-radius: 8px;\n  background: #fff !important;\n  color: #000000 !important;\n  cursor: pointer;\n  font-weight: 780;\n  padding: 13px 20px;\n  box-shadow: none !important;\n  transition: background-color 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease;\n}\n\n.form-actions .primary-action * {\n  color: #000000 !important;\n}\n\n.form-actions .primary-action:hover:not(:disabled) {\n  border-color: #000 !important;\n  background: #000 !important;\n  color: #ffffff !important;\n  box-shadow: 0 12px 24px rgb(0 0 0 / 18%) !important;\n  transform: translateY(-1px);\n}\n\n.form-actions .primary-action:hover:not(:disabled) * {\n  color: #ffffff !important;\n}\n\n.form-actions .primary-action:focus-visible {\n  outline: 3px solid rgb(0 0 0 / 24%);\n  outline-offset: 2px;\n}\n\n.form-actions .primary-action:disabled {\n  cursor: not-allowed;\n  border-color: #9ca8ba !important;\n  background: #fff !important;\n  color: #9ca8ba !important;\n  box-shadow: none !important;\n}\n\n.form-actions .primary-action:disabled * {\n  color: #9ca8ba !important;\n}\n\n@media (max-width: 900px) {\n  .create-layout {\n    grid-template-columns: 1fr;\n  }\n\n  .mapping-list {\n    max-height: 300px;\n  }\n\n  .form-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .template-select-row {\n    grid-template-columns: 1fr;\n  }\n\n  .mtv-header-grid,\n  .option-grid,\n  .option-grid--target {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 560px) {\n  .create-page {\n    padding: 28px 16px;\n  }\n\n  .wizard-header {\n    margin-bottom: 26px;\n  }\n\n  .option-grid,\n  .option-grid--target,\n  .mtv-header-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .pattern-select-row {\n    grid-template-columns: 1fr;\n    gap: 9px;\n  }\n\n  .template-section__header {\n    grid-template-columns: auto minmax(0, 1fr);\n  }\n\n  .template-section__optional {\n    grid-column: 2;\n    justify-self: start;\n  }\n\n  .form-actions {\n    flex-direction: column;\n    justify-content: stretch;\n  }\n\n  .primary-action,\n  .draft-action {\n    width: 100%;\n  }\n}\n"] }]
    }], null, { warnBeforeBrowserUnload: [{
            type: HostListener,
            args: ['window:beforeunload', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CreateMappingPageComponent, { className: "CreateMappingPageComponent", filePath: "src/app/features/mappings/create-mapping-page/create-mapping-page.component.ts", lineNumber: 31 }); })();
//# sourceMappingURL=create-mapping-page.component.js.map