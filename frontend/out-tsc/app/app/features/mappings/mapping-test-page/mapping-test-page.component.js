import { CommonModule, Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { MappingApiService } from '../../../core/services/mapping-api.service';
import { WizardStepperComponent } from '../../../shared/wizard-stepper/wizard-stepper.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
function MappingTestPageComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "span", 11);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 12);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 13);
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
function MappingTestPageComponent_p_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 14);
    i0.ɵɵtext(1, "Mapping bilgisi y\u00FCkleniyor...");
    i0.ɵɵelementEnd();
} }
function MappingTestPageComponent_p_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.loadError);
} }
function MappingTestPageComponent_section_9_p_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 37);
    i0.ɵɵtext(1, " Hen\u00FCz uyar\u0131 veya hata yok. ");
    i0.ɵɵelementEnd();
} }
function MappingTestPageComponent_section_9_div_28_li_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const warning_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(warning_r3);
} }
function MappingTestPageComponent_section_9_div_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38)(1, "h3");
    i0.ɵɵtext(2, "Warnings");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "ul");
    i0.ɵɵtemplate(4, MappingTestPageComponent_section_9_div_28_li_4_Template, 2, 1, "li", 39);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r0.warnings);
} }
function MappingTestPageComponent_section_9_div_29_li_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const error_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(error_r4);
} }
function MappingTestPageComponent_section_9_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 40)(1, "h3");
    i0.ɵɵtext(2, "Errors");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "ul");
    i0.ɵɵtemplate(4, MappingTestPageComponent_section_9_div_29_li_4_Template, 2, 1, "li", 39);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r0.errors);
} }
function MappingTestPageComponent_section_9_p_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 41);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.noticeMessage);
} }
function MappingTestPageComponent_section_9_p_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 42);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.successMessage);
} }
function MappingTestPageComponent_section_9_span_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Mapping'i \u00C7al\u0131\u015Ft\u0131r");
    i0.ɵɵelementEnd();
} }
function MappingTestPageComponent_section_9_span_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "\u00C7al\u0131\u015Ft\u0131r\u0131l\u0131yor...");
    i0.ɵɵelementEnd();
} }
function MappingTestPageComponent_section_9_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 16)(1, "div", 17)(2, "section", 18)(3, "header", 19)(4, "div")(5, "p", 20);
    i0.ɵɵtext(6, "Sample source payload");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "h2");
    i0.ɵɵtext(8, "Test Input");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "textarea", 21);
    i0.ɵɵtwoWayListener("ngModelChange", function MappingTestPageComponent_section_9_Template_textarea_ngModelChange_9_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.inputJson, $event) || (ctx_r0.inputJson = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "section", 18)(11, "header", 19)(12, "div")(13, "p", 20);
    i0.ɵɵtext(14, "Generated target payload");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "h2");
    i0.ɵɵtext(16, "Output");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "pre", 22);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(19, "section", 23)(20, "header", 19)(21, "div")(22, "p", 20);
    i0.ɵɵtext(23, "Validation result");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "h2");
    i0.ɵɵtext(25, "Warnings / Errors");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(26, "div", 24);
    i0.ɵɵtemplate(27, MappingTestPageComponent_section_9_p_27_Template, 2, 0, "p", 25)(28, MappingTestPageComponent_section_9_div_28_Template, 5, 1, "div", 26)(29, MappingTestPageComponent_section_9_div_29_Template, 5, 1, "div", 27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div", 28);
    i0.ɵɵtemplate(31, MappingTestPageComponent_section_9_p_31_Template, 2, 1, "p", 29)(32, MappingTestPageComponent_section_9_p_32_Template, 2, 1, "p", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "div", 31)(34, "button", 32);
    i0.ɵɵlistener("click", function MappingTestPageComponent_section_9_Template_button_click_34_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.goBack()); });
    i0.ɵɵtext(35, "Geri");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "div", 33)(37, "button", 34);
    i0.ɵɵlistener("click", function MappingTestPageComponent_section_9_Template_button_click_37_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.runMapping()); });
    i0.ɵɵtemplate(38, MappingTestPageComponent_section_9_span_38_Template, 2, 0, "span", 35)(39, MappingTestPageComponent_section_9_span_39_Template, 2, 0, "span", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "button", 36);
    i0.ɵɵlistener("click", function MappingTestPageComponent_section_9_Template_button_click_40_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.openNewMappingConfirmModal()); });
    i0.ɵɵtext(41, " Yeni Mapping Olu\u015Ftur ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.inputJson);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r0.outputJson);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("ngIf", ctx_r0.warnings.length === 0 && ctx_r0.errors.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.warnings.length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.errors.length > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.noticeMessage);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.successMessage);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isRunning);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r0.isRunning);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.isRunning);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.isRunning);
} }
function MappingTestPageComponent_div_10_p_6_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Hata veya uyar\u0131 bulunamad\u0131.");
    i0.ɵɵelementEnd();
} }
function MappingTestPageComponent_div_10_p_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 52);
    i0.ɵɵtext(1, " Mapping ba\u015Far\u0131yla \u00E7al\u0131\u015Ft\u0131r\u0131ld\u0131. ");
    i0.ɵɵtemplate(2, MappingTestPageComponent_div_10_p_6_span_2_Template, 2, 0, "span", 35);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.warnings.length === 0);
} }
function MappingTestPageComponent_div_10_div_7_div_1_li_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const warning_r6 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(warning_r6);
} }
function MappingTestPageComponent_div_10_div_7_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 56)(1, "h3");
    i0.ɵɵtext(2, "Warnings");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "ul");
    i0.ɵɵtemplate(4, MappingTestPageComponent_div_10_div_7_div_1_li_4_Template, 2, 1, "li", 39);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r0.warnings);
} }
function MappingTestPageComponent_div_10_div_7_div_2_li_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const error_r7 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(error_r7);
} }
function MappingTestPageComponent_div_10_div_7_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 57)(1, "h3");
    i0.ɵɵtext(2, "Errors");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "ul");
    i0.ɵɵtemplate(4, MappingTestPageComponent_div_10_div_7_div_2_li_4_Template, 2, 1, "li", 39);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r0.errors);
} }
function MappingTestPageComponent_div_10_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 53);
    i0.ɵɵtemplate(1, MappingTestPageComponent_div_10_div_7_div_1_Template, 5, 1, "div", 54)(2, MappingTestPageComponent_div_10_div_7_div_2_Template, 5, 1, "div", 55);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.warnings.length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.errors.length > 0);
} }
function MappingTestPageComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 43)(1, "div", 44)(2, "div", 45);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2", 46);
    i0.ɵɵtext(5, "Test Sonucu");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, MappingTestPageComponent_div_10_p_6_Template, 3, 1, "p", 47)(7, MappingTestPageComponent_div_10_div_7_Template, 3, 2, "div", 48);
    i0.ɵɵelementStart(8, "div", 49)(9, "button", 50);
    i0.ɵɵlistener("click", function MappingTestPageComponent_div_10_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r5); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeTestResultModal()); });
    i0.ɵɵtext(10, " Kapat ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "button", 51);
    i0.ɵɵlistener("click", function MappingTestPageComponent_div_10_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r5); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.continueNext()); });
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("completion-modal__icon--error", ctx_r0.errors.length > 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.errors.length > 0 ? "!" : "\u2713", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r0.errors.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.warnings.length > 0 || ctx_r0.errors.length > 0);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r0.hasSuccessfulRun || ctx_r0.isCompleting);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.isCompleting ? "Haz\u0131rlan\u0131yor..." : "\u00C7\u0131kt\u0131y\u0131 \u00D6nizle", " ");
} }
function MappingTestPageComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 43)(1, "div", 58)(2, "div", 45);
    i0.ɵɵtext(3, "\u2713");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2", 46);
    i0.ɵɵtext(5, "Test Tamamland\u0131");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 52);
    i0.ɵɵtext(7, "Mapping tan\u0131m\u0131 test edildi ve kullan\u0131ma haz\u0131r.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 49)(9, "button", 59);
    i0.ɵɵlistener("click", function MappingTestPageComponent_div_11_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeCompletionModal()); });
    i0.ɵɵtext(10, "Kapat");
    i0.ɵɵelementEnd()()()();
} }
function MappingTestPageComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 43)(1, "div", 58)(2, "h2", 46);
    i0.ɵɵtext(3, "Yeni Mapping Olu\u015Fturulsun mu?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 52);
    i0.ɵɵtext(5, "Bu test ekran\u0131ndan \u00E7\u0131k\u0131p yeni mapping ad\u0131m\u0131na d\u00F6nmek \u00FCzeresiniz.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 49)(7, "button", 50);
    i0.ɵɵlistener("click", function MappingTestPageComponent_div_12_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r9); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeNewMappingConfirmModal()); });
    i0.ɵɵtext(8, " Vazge\u00E7 ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 59);
    i0.ɵɵlistener("click", function MappingTestPageComponent_div_12_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r9); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.goToNewMapping()); });
    i0.ɵɵtext(10, "Eminim");
    i0.ɵɵelementEnd()()()();
} }
export class MappingTestPageComponent {
    constructor() {
        this.route = inject(ActivatedRoute);
        this.router = inject(Router);
        this.location = inject(Location);
        this.mappingApi = inject(MappingApiService);
        this.changeDetector = inject(ChangeDetectorRef);
        this.mappingId = '';
        this.inputJson = '';
        this.outputJson = '';
        this.warnings = [];
        this.errors = [];
        this.isLoading = true;
        this.isRunning = false;
        this.loadError = '';
        this.successMessage = '';
        this.noticeMessage = '';
        this.hasSuccessfulRun = false;
        this.generatedAt = '';
        this.showTestResultModal = false;
        this.showCompletionModal = false;
        this.showNewMappingConfirmModal = false;
        this.isCompleting = false;
    }
    ngOnInit() {
        const mappingId = this.route.snapshot.paramMap.get('mappingId');
        if (!mappingId) {
            this.isLoading = false;
            this.loadError = 'Mapping id bulunamadı.';
            return;
        }
        this.mappingId = mappingId;
        this.loadMapping(mappingId);
    }
    runMapping() {
        this.successMessage = '';
        this.noticeMessage = '';
        this.hasSuccessfulRun = false;
        this.errors = [];
        this.warnings = [];
        const parsedInput = this.parseInputJson();
        if (!parsedInput) {
            return;
        }
        this.isRunning = true;
        this.mappingApi.testMapping(this.mappingId, { input: parsedInput })
            .pipe(finalize(() => {
            this.isRunning = false;
            this.changeDetector.detectChanges();
        }))
            .subscribe({
            next: (response) => this.applyTestResponse(response),
            error: (error) => {
                this.hasSuccessfulRun = false;
                this.errors = [this.getErrorMessage(error, 'Mapping testi çalıştırılamadı.')];
                this.showTestResultModal = true;
                this.changeDetector.detectChanges();
            }
        });
    }
    goBack() {
        if (this.mappingId) {
            void this.router.navigate(['/mappings', this.mappingId, 'map']);
            return;
        }
        if (window.history.length > 1) {
            this.location.back();
            return;
        }
        void this.router.navigate(['/mappings/create']);
    }
    continueNext() {
        this.successMessage = '';
        if (!this.hasSuccessfulRun) {
            this.noticeMessage = 'Devam etmeden önce Mapping’i Çalıştır ile test sonucunu oluşturun.';
            return;
        }
        if (!this.mapping) {
            this.noticeMessage = 'Mapping bilgisi bulunamadı.';
            return;
        }
        this.noticeMessage = '';
        this.isCompleting = true;
        this.mappingApi.updateMapping(this.mappingId, {
            name: this.mapping.name,
            description: this.mapping.description,
            institution: this.mapping.institution,
            sourceType: this.mapping.sourceType,
            targetType: this.mapping.targetType,
            patternType: this.mapping.patternType,
            patternSettings: this.mapping.patternSettings,
            status: 'completed'
        })
            .pipe(finalize(() => {
            this.isCompleting = false;
            this.changeDetector.detectChanges();
        }))
            .subscribe({
            next: (mapping) => {
                this.mapping = mapping;
                this.showTestResultModal = false;
                void this.router.navigate(['/mappings', this.mappingId, 'output'], {
                    state: {
                        output: JSON.parse(this.outputJson),
                        generatedAt: this.generatedAt
                    }
                });
                this.changeDetector.detectChanges();
            },
            error: (error) => {
                this.noticeMessage = this.getErrorMessage(error, 'Mapping durumu tamamlandı olarak güncellenemedi.');
                this.changeDetector.detectChanges();
            }
        });
    }
    closeTestResultModal() {
        this.showTestResultModal = false;
    }
    closeCompletionModal() {
        this.showCompletionModal = false;
    }
    openNewMappingConfirmModal() {
        this.showNewMappingConfirmModal = true;
    }
    closeNewMappingConfirmModal() {
        this.showNewMappingConfirmModal = false;
    }
    goToNewMapping() {
        this.showCompletionModal = false;
        this.showNewMappingConfirmModal = false;
        void this.router.navigate(['/mappings/create']);
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
                this.validateMappingForTest(mapping);
                if (!this.loadError) {
                    this.inputJson = JSON.stringify(this.createSampleInput(mapping.sourceSchema.fields, mapping.sourceSchema.records), null, 2);
                    this.outputJson = JSON.stringify([], null, 2);
                }
                this.changeDetector.detectChanges();
            },
            error: (error) => {
                this.loadError = this.getErrorMessage(error, 'Mapping bilgisi alınamadı.');
                this.changeDetector.detectChanges();
            }
        });
    }
    validateMappingForTest(mapping) {
        if (!mapping.sourceSchema) {
            this.loadError = 'Önce kaynak veri tanımlanmalıdır.';
            return;
        }
        if (!mapping.targetSchema) {
            this.loadError = 'Önce hedef veri tanımlanmalıdır.';
            return;
        }
        if (!mapping.mappingDefinitions || mapping.mappingDefinitions.length === 0) {
            this.loadError = 'Önce alan eşleştirmesi yapılmalıdır.';
        }
    }
    createSampleInput(fields, records) {
        if (records && records.length > 0) {
            return records;
        }
        return fields.reduce((sampleInput, field) => {
            sampleInput[field.name] = this.createSampleValue(field);
            return sampleInput;
        }, {});
    }
    createSampleValue(field) {
        if (field.sampleValue) {
            return this.parseSampleValue(field.sampleValue, field.type);
        }
        switch (field.type) {
            case 'number':
                return 0;
            case 'date':
                return '2026-06-26';
            case 'boolean':
                return false;
            case 'object':
                return {};
            case 'array':
                return [];
            case 'text':
            default:
                return '';
        }
    }
    parseSampleValue(sampleValue, type) {
        switch (type) {
            case 'number': {
                const parsedNumber = Number(sampleValue);
                return Number.isNaN(parsedNumber) ? 0 : parsedNumber;
            }
            case 'boolean':
                return sampleValue.toLowerCase() === 'true';
            case 'object':
            case 'array':
                try {
                    return JSON.parse(sampleValue);
                }
                catch {
                    return type === 'array' ? [] : {};
                }
            default:
                return sampleValue;
        }
    }
    parseInputJson() {
        try {
            const parsedInput = JSON.parse(this.inputJson);
            if (this.isPlainObject(parsedInput)) {
                return parsedInput;
            }
            if (Array.isArray(parsedInput)
                && parsedInput.length > 0
                && parsedInput.every(item => this.isPlainObject(item))) {
                return parsedInput;
            }
            if (Array.isArray(parsedInput)) {
                this.errors = ['Input JSON boş olmayan bir object listesi olmalıdır.'];
                return null;
            }
            this.errors = ['Input JSON bir object veya object listesi olmalıdır.'];
            return null;
        }
        catch {
            this.errors = ['Input JSON geçerli değil. Lütfen formatı kontrol edin.'];
            return null;
        }
    }
    applyTestResponse(response) {
        this.outputJson = JSON.stringify(response.output, null, 2);
        this.generatedAt = response.generatedAt;
        this.warnings = response.warnings;
        this.errors = response.errors;
        this.hasSuccessfulRun = response.errors.length === 0;
        this.noticeMessage = '';
        this.successMessage = this.hasSuccessfulRun ? 'Mapping başarıyla çalıştırıldı.' : '';
        this.showTestResultModal = true;
        this.changeDetector.detectChanges();
    }
    isPlainObject(value) {
        return value !== null && !Array.isArray(value) && typeof value === 'object';
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
    static { this.ɵfac = function MappingTestPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MappingTestPageComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MappingTestPageComponent, selectors: [["app-mapping-test-page"]], decls: 13, vars: 8, consts: [[1, "test-page"], ["aria-labelledby", "test-title", 1, "wizard-shell"], [1, "wizard-header"], ["id", "test-title"], [3, "currentStep"], ["class", "mapping-summary", 4, "ngIf"], ["class", "state-message", 4, "ngIf"], ["class", "alert alert--error", 4, "ngIf"], ["class", "test-shell", 4, "ngIf"], ["class", "completion-overlay", 4, "ngIf"], [1, "mapping-summary"], [1, "mapping-summary__name"], [1, "schema-badge", "schema-badge--source"], [1, "schema-badge", "schema-badge--target"], [1, "state-message"], [1, "alert", "alert--error"], [1, "test-shell"], [1, "test-grid"], [1, "json-panel"], [1, "panel-header"], [1, "panel-eyebrow"], ["spellcheck", "false", "aria-label", "Test input JSON", 1, "json-editor", 3, "ngModelChange", "ngModel"], [1, "json-output"], [1, "messages-panel"], [1, "message-body"], ["class", "empty-state", 4, "ngIf"], ["class", "message-column", 4, "ngIf"], ["class", "message-column message-column--error", 4, "ngIf"], ["aria-live", "polite", 1, "feedback"], ["class", "alert alert--info", 4, "ngIf"], ["class", "alert alert--success", 4, "ngIf"], [1, "form-actions"], ["type", "button", 1, "back-action", 3, "click", "disabled"], [1, "form-actions__right"], ["type", "button", 1, "secondary-action", 3, "click", "disabled"], [4, "ngIf"], ["type", "button", 1, "secondary-action", 3, "click"], [1, "empty-state"], [1, "message-column"], [4, "ngFor", "ngForOf"], [1, "message-column", "message-column--error"], [1, "alert", "alert--info"], [1, "alert", "alert--success"], [1, "completion-overlay"], [1, "completion-modal", "completion-modal--wide"], [1, "completion-modal__icon"], [1, "completion-modal__title"], ["class", "completion-modal__text", 4, "ngIf"], ["class", "result-summary", 4, "ngIf"], [1, "completion-modal__actions"], ["type", "button", 1, "completion-modal__btn", "completion-modal__btn--secondary", 3, "click"], ["type", "button", 1, "completion-modal__btn", 3, "click", "disabled"], [1, "completion-modal__text"], [1, "result-summary"], ["class", "result-summary__column", 4, "ngIf"], ["class", "result-summary__column result-summary__column--error", 4, "ngIf"], [1, "result-summary__column"], [1, "result-summary__column", "result-summary__column--error"], [1, "completion-modal"], ["type", "button", 1, "completion-modal__btn", 3, "click"]], template: function MappingTestPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "main", 0)(1, "section", 1)(2, "header", 2)(3, "h1", 3);
            i0.ɵɵtext(4, "Yeni Mapping Olu\u015Ftur");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "app-wizard-stepper", 4);
            i0.ɵɵtemplate(6, MappingTestPageComponent_div_6_Template, 7, 3, "div", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(7, MappingTestPageComponent_p_7_Template, 2, 0, "p", 6)(8, MappingTestPageComponent_p_8_Template, 2, 1, "p", 7)(9, MappingTestPageComponent_section_9_Template, 42, 11, "section", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(10, MappingTestPageComponent_div_10_Template, 13, 7, "div", 9)(11, MappingTestPageComponent_div_11_Template, 11, 0, "div", 9)(12, MappingTestPageComponent_div_12_Template, 11, 0, "div", 9);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("currentStep", 3);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.mapping);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.loadError);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.mapping && !ctx.loadError);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showTestResultModal);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showCompletionModal);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showNewMappingConfirmModal);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, FormsModule, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgModel, WizardStepperComponent], styles: [".test-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  padding: 40px 20px;\n}\n\n.wizard-shell[_ngcontent-%COMP%] {\n  max-width: 1320px;\n  margin: 0 auto;\n}\n\n.wizard-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n\n.wizard-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #111827;\n  font-size: clamp(1.65rem, 3.2vw, 2.35rem);\n  font-weight: 760;\n  letter-spacing: 0;\n  line-height: 1.08;\n}\n\n.mapping-summary[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 10px;\n  margin-top: 16px;\n}\n\n.mapping-summary__name[_ngcontent-%COMP%] {\n  color: #59677c;\n  font-size: 0.95rem;\n  font-weight: 650;\n}\n\n.schema-badge[_ngcontent-%COMP%] {\n  border-radius: 999px;\n  font-size: 0.82rem;\n  font-weight: 760;\n  padding: 5px 10px;\n}\n\n.schema-badge--source[_ngcontent-%COMP%] {\n  border: 1px solid #9dc0ff;\n  background: #fff4cf;\n  color: #e5a900;\n}\n\n.schema-badge--target[_ngcontent-%COMP%] {\n  border: 1px solid #8bd2bd;\n  background: #eaf8f3;\n  color: #0f6654;\n}\n\n.test-shell[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 14px;\n}\n\n.test-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 12px;\n}\n\n.json-panel[_ngcontent-%COMP%], \n.messages-panel[_ngcontent-%COMP%] {\n  overflow: hidden;\n  border: 1px solid #cfd8e6;\n  border-radius: 8px;\n  background: #ffffff;\n}\n\n.panel-header[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #dfe5ef;\n  background: #f8fafc;\n  padding: 14px 16px;\n}\n\n.panel-eyebrow[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  color: #64748b;\n  font-size: 0.74rem;\n  font-weight: 760;\n  letter-spacing: 0;\n  text-transform: uppercase;\n}\n\n.panel-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #172033;\n  font-size: 1rem;\n  font-weight: 760;\n  letter-spacing: 0;\n}\n\n.json-editor[_ngcontent-%COMP%], \n.json-output[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 420px;\n  margin: 0;\n  border: 0;\n  background: #fbfdff;\n  color: #172033;\n  font-family: \"SFMono-Regular\", Consolas, \"Liberation Mono\", monospace;\n  font-size: 0.9rem;\n  line-height: 1.55;\n  padding: 16px;\n  resize: vertical;\n  tab-size: 2;\n}\n\n.json-editor[_ngcontent-%COMP%]:focus {\n  box-shadow: inset 0 0 0 3px rgb(252 189 0 / 16%);\n  outline: none;\n}\n\n.json-output[_ngcontent-%COMP%] {\n  overflow: auto;\n  overflow-wrap: anywhere;\n  white-space: pre-wrap;\n}\n\n.message-body[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 14px;\n  min-height: 120px;\n  padding: 16px;\n}\n\n.message-column[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.message-column[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  color: #92400e;\n  font-size: 0.95rem;\n  font-weight: 760;\n}\n\n.message-column--error[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #9f2418;\n}\n\n.message-column[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 6px;\n  margin: 0;\n  padding-left: 20px;\n  color: #59677c;\n  font-weight: 650;\n}\n\n.message-column--error[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  color: #9f2418;\n}\n\n.state-message[_ngcontent-%COMP%], \n.empty-state[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #5d6b82;\n  font-weight: 650;\n}\n\n.feedback[_ngcontent-%COMP%] {\n  min-height: 48px;\n}\n\n.alert[_ngcontent-%COMP%] {\n  margin: 0;\n  border-radius: 8px;\n  padding: 14px 16px;\n  font-weight: 650;\n  line-height: 1.45;\n}\n\n.alert--success[_ngcontent-%COMP%] {\n  border: 1px solid #8bd2bd;\n  background: #eaf8f3;\n  color: #0f6654;\n}\n\n.alert--info[_ngcontent-%COMP%] {\n  border: 1px solid #b7cff7;\n  background: #fff4cf;\n  color: #e5a900;\n}\n\n.alert--error[_ngcontent-%COMP%] {\n  border: 1px solid #f0a8a0;\n  background: #fff0ed;\n  color: #9f2418;\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  border-top: 1px solid #dfe5ef;\n  padding-top: 18px;\n}\n\n.form-actions__right[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n\n.primary-action[_ngcontent-%COMP%], \n.secondary-action[_ngcontent-%COMP%], \n.back-action[_ngcontent-%COMP%] {\n  min-height: 42px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 760;\n  transition: background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;\n}\n\n.primary-action[_ngcontent-%COMP%] {\n  min-width: 168px;\n  border: 0;\n  background: #fcbd00;\n  color: #ffffff;\n  padding: 10px 18px;\n}\n\n.primary-action[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #e5a900;\n  box-shadow: 0 12px 24px rgb(252 189 0 / 22%);\n  transform: translateY(-1px);\n}\n\n.secondary-action[_ngcontent-%COMP%], \n.back-action[_ngcontent-%COMP%] {\n  border: 1px solid #cfd8e6;\n  background: #ffffff;\n  color: #172033;\n  padding: 9px 14px;\n}\n\n.secondary-action[_ngcontent-%COMP%]:hover:not(:disabled), \n.back-action[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: #e5a900;\n  box-shadow: 0 8px 20px rgb(23 32 51 / 8%);\n}\n\n.primary-action[_ngcontent-%COMP%]:focus-visible, \n.secondary-action[_ngcontent-%COMP%]:focus-visible, \n.back-action[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid rgb(252 189 0 / 24%);\n  outline-offset: 2px;\n}\n\n.primary-action[_ngcontent-%COMP%]:disabled, \n.secondary-action[_ngcontent-%COMP%]:disabled, \n.back-action[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.62;\n  box-shadow: none;\n  transform: none;\n}\n\n@media (max-width: 920px) {\n  .test-grid[_ngcontent-%COMP%], \n   .message-body[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 640px) {\n  .test-page[_ngcontent-%COMP%] {\n    padding: 28px 16px;\n  }\n\n  .form-actions[_ngcontent-%COMP%], \n   .form-actions__right[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .primary-action[_ngcontent-%COMP%], \n   .secondary-action[_ngcontent-%COMP%], \n   .back-action[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .completion-overlay[_ngcontent-%COMP%] {\n    padding: 18px 12px;\n  }\n\n  .completion-modal[_ngcontent-%COMP%] {\n    max-height: calc(100vh - 36px);\n    padding: 24px;\n  }\n}\n.completion-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  overflow: auto;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 1000;\n  padding: 32px 16px;\n}\n\n.completion-modal[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: calc(100vh - 64px);\n  background: #ffffff;\n  border-radius: 16px;\n  padding: 32px;\n  max-width: 400px;\n  width: 90%;\n  text-align: center;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n}\n\n.completion-modal--wide[_ngcontent-%COMP%] {\n  max-width: 620px;\n  text-align: left;\n}\n\n.completion-modal__icon[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  margin: 0 auto 16px;\n  background: #22c55e;\n  color: #ffffff;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 32px;\n  font-weight: bold;\n}\n\n.completion-modal__icon--error[_ngcontent-%COMP%] {\n  background: #dc2626;\n}\n\n.completion-modal__title[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-size: 22px;\n  color: #111827;\n  text-align: center;\n}\n\n.completion-modal__text[_ngcontent-%COMP%] {\n  margin: 0 0 24px;\n  color: #6b7280;\n  font-size: 15px;\n  text-align: center;\n}\n\n.result-summary[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 14px;\n  margin: 18px 0 24px;\n  overflow: auto;\n  max-height: min(52vh, 520px);\n  padding-right: 4px;\n  text-align: left;\n}\n\n.result-summary__column[_ngcontent-%COMP%] {\n  border: 1px solid #fde68a;\n  border-radius: 8px;\n  background: #fffbeb;\n  padding: 12px 14px;\n}\n\n.result-summary__column--error[_ngcontent-%COMP%] {\n  border-color: #fecaca;\n  background: #fff1f1;\n}\n\n.result-summary__column[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  color: #92400e;\n  font-size: 0.95rem;\n  font-weight: 760;\n}\n\n.result-summary__column--error[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #b91c1c;\n}\n\n.result-summary__column[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 6px;\n  margin: 0;\n  padding-left: 20px;\n  color: #59677c;\n  font-weight: 650;\n  overflow-wrap: anywhere;\n}\n\n.result-summary__column--error[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  color: #9f2418;\n}\n\n.completion-modal__actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 10px;\n}\n\n.completion-modal__btn[_ngcontent-%COMP%] {\n  background: #fcbd00;\n  color: #ffffff;\n  border: none;\n  border-radius: 8px;\n  padding: 12px 32px;\n  font-size: 15px;\n  font-weight: 600;\n  cursor: pointer;\n}\n\n.completion-modal__btn[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.55;\n}\n\n.completion-modal__btn--secondary[_ngcontent-%COMP%] {\n  border: 1px solid #cfd8e6;\n  background: #ffffff;\n  color: #172033;\n}\n\n.completion-modal__btn[_ngcontent-%COMP%]:hover {\n  background: #e5a900;\n}\n\n.completion-modal__btn[_ngcontent-%COMP%]:disabled:hover {\n  background: #fcbd00;\n}\n\n.completion-modal__btn--secondary[_ngcontent-%COMP%]:hover {\n  background: #f8fafc;\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MappingTestPageComponent, [{
        type: Component,
        args: [{ selector: 'app-mapping-test-page', standalone: true, imports: [CommonModule, FormsModule, WizardStepperComponent], template: "<main class=\"test-page\">\n  <section class=\"wizard-shell\" aria-labelledby=\"test-title\">\n    <header class=\"wizard-header\">\n      <h1 id=\"test-title\">Yeni Mapping Olu\u015Ftur</h1>\n      <app-wizard-stepper [currentStep]=\"3\"></app-wizard-stepper>\n\n      <div class=\"mapping-summary\" *ngIf=\"mapping\">\n        <span class=\"mapping-summary__name\">{{ mapping.name }}</span>\n        <span class=\"schema-badge schema-badge--source\">{{ mapping.sourceType }}</span>\n        <span class=\"schema-badge schema-badge--target\">{{ mapping.targetType }}</span>\n      </div>\n    </header>\n\n    <p class=\"state-message\" *ngIf=\"isLoading\">Mapping bilgisi y\u00FCkleniyor...</p>\n    <p class=\"alert alert--error\" *ngIf=\"!isLoading && loadError\">{{ loadError }}</p>\n\n    <section class=\"test-shell\" *ngIf=\"!isLoading && mapping && !loadError\">\n      <div class=\"test-grid\">\n        <section class=\"json-panel\">\n          <header class=\"panel-header\">\n            <div>\n              <p class=\"panel-eyebrow\">Sample source payload</p>\n              <h2>Test Input</h2>\n            </div>\n          </header>\n          <textarea\n            class=\"json-editor\"\n            [(ngModel)]=\"inputJson\"\n            spellcheck=\"false\"\n            aria-label=\"Test input JSON\"\n          ></textarea>\n        </section>\n\n        <section class=\"json-panel\">\n          <header class=\"panel-header\">\n            <div>\n              <p class=\"panel-eyebrow\">Generated target payload</p>\n              <h2>Output</h2>\n            </div>\n          </header>\n          <pre class=\"json-output\">{{ outputJson }}</pre>\n        </section>\n      </div>\n\n      <section class=\"messages-panel\">\n        <header class=\"panel-header\">\n          <div>\n            <p class=\"panel-eyebrow\">Validation result</p>\n            <h2>Warnings / Errors</h2>\n          </div>\n        </header>\n\n        <div class=\"message-body\">\n          <p class=\"empty-state\" *ngIf=\"warnings.length === 0 && errors.length === 0\">\n            Hen\u00FCz uyar\u0131 veya hata yok.\n          </p>\n\n          <div class=\"message-column\" *ngIf=\"warnings.length > 0\">\n            <h3>Warnings</h3>\n            <ul>\n              <li *ngFor=\"let warning of warnings\">{{ warning }}</li>\n            </ul>\n          </div>\n\n          <div class=\"message-column message-column--error\" *ngIf=\"errors.length > 0\">\n            <h3>Errors</h3>\n            <ul>\n              <li *ngFor=\"let error of errors\">{{ error }}</li>\n            </ul>\n          </div>\n        </div>\n      </section>\n\n      <div class=\"feedback\" aria-live=\"polite\">\n        <p class=\"alert alert--info\" *ngIf=\"noticeMessage\">{{ noticeMessage }}</p>\n        <p class=\"alert alert--success\" *ngIf=\"successMessage\">{{ successMessage }}</p>\n      </div>\n\n      <div class=\"form-actions\">\n        <button class=\"back-action\" type=\"button\" (click)=\"goBack()\" [disabled]=\"isRunning\">Geri</button>\n        <div class=\"form-actions__right\">\n          <button class=\"secondary-action\" type=\"button\" (click)=\"runMapping()\" [disabled]=\"isRunning\">\n            <span *ngIf=\"!isRunning\">Mapping'i \u00C7al\u0131\u015Ft\u0131r</span>\n            <span *ngIf=\"isRunning\">\u00C7al\u0131\u015Ft\u0131r\u0131l\u0131yor...</span>\n          </button>\n          <button class=\"secondary-action\" type=\"button\" (click)=\"openNewMappingConfirmModal()\">\n            Yeni Mapping Olu\u015Ftur\n          </button>\n        </div>\n      </div>\n    </section>\n  </section>\n\n  <div class=\"completion-overlay\" *ngIf=\"showTestResultModal\">\n    <div class=\"completion-modal completion-modal--wide\">\n      <div class=\"completion-modal__icon\" [class.completion-modal__icon--error]=\"errors.length > 0\">\n        {{ errors.length > 0 ? '!' : '\u2713' }}\n      </div>\n      <h2 class=\"completion-modal__title\">Test Sonucu</h2>\n      <p class=\"completion-modal__text\" *ngIf=\"errors.length === 0\">\n        Mapping ba\u015Far\u0131yla \u00E7al\u0131\u015Ft\u0131r\u0131ld\u0131.\n        <span *ngIf=\"warnings.length === 0\">Hata veya uyar\u0131 bulunamad\u0131.</span>\n      </p>\n\n      <div class=\"result-summary\" *ngIf=\"warnings.length > 0 || errors.length > 0\">\n        <div class=\"result-summary__column\" *ngIf=\"warnings.length > 0\">\n          <h3>Warnings</h3>\n          <ul>\n            <li *ngFor=\"let warning of warnings\">{{ warning }}</li>\n          </ul>\n        </div>\n\n        <div class=\"result-summary__column result-summary__column--error\" *ngIf=\"errors.length > 0\">\n          <h3>Errors</h3>\n          <ul>\n            <li *ngFor=\"let error of errors\">{{ error }}</li>\n          </ul>\n        </div>\n      </div>\n\n      <div class=\"completion-modal__actions\">\n        <button type=\"button\" class=\"completion-modal__btn completion-modal__btn--secondary\" (click)=\"closeTestResultModal()\">\n          Kapat\n        </button>\n        <button type=\"button\" class=\"completion-modal__btn\" (click)=\"continueNext()\" [disabled]=\"!hasSuccessfulRun || isCompleting\">\n          {{ isCompleting ? 'Haz\u0131rlan\u0131yor...' : '\u00C7\u0131kt\u0131y\u0131 \u00D6nizle' }}\n        </button>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"completion-overlay\" *ngIf=\"showCompletionModal\">\n    <div class=\"completion-modal\">\n      <div class=\"completion-modal__icon\">\u2713</div>\n      <h2 class=\"completion-modal__title\">Test Tamamland\u0131</h2>\n      <p class=\"completion-modal__text\">Mapping tan\u0131m\u0131 test edildi ve kullan\u0131ma haz\u0131r.</p>\n      <div class=\"completion-modal__actions\">\n        <button type=\"button\" class=\"completion-modal__btn\" (click)=\"closeCompletionModal()\">Kapat</button>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"completion-overlay\" *ngIf=\"showNewMappingConfirmModal\">\n    <div class=\"completion-modal\">\n      <h2 class=\"completion-modal__title\">Yeni Mapping Olu\u015Fturulsun mu?</h2>\n      <p class=\"completion-modal__text\">Bu test ekran\u0131ndan \u00E7\u0131k\u0131p yeni mapping ad\u0131m\u0131na d\u00F6nmek \u00FCzeresiniz.</p>\n      <div class=\"completion-modal__actions\">\n        <button type=\"button\" class=\"completion-modal__btn completion-modal__btn--secondary\" (click)=\"closeNewMappingConfirmModal()\">\n          Vazge\u00E7\n        </button>\n        <button type=\"button\" class=\"completion-modal__btn\" (click)=\"goToNewMapping()\">Eminim</button>\n      </div>\n    </div>\n  </div>\n</main>\n", styles: [".test-page {\n  min-height: 100vh;\n  padding: 40px 20px;\n}\n\n.wizard-shell {\n  max-width: 1320px;\n  margin: 0 auto;\n}\n\n.wizard-header {\n  margin-bottom: 24px;\n}\n\n.wizard-header h1 {\n  margin: 0;\n  color: #111827;\n  font-size: clamp(1.65rem, 3.2vw, 2.35rem);\n  font-weight: 760;\n  letter-spacing: 0;\n  line-height: 1.08;\n}\n\n.mapping-summary {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 10px;\n  margin-top: 16px;\n}\n\n.mapping-summary__name {\n  color: #59677c;\n  font-size: 0.95rem;\n  font-weight: 650;\n}\n\n.schema-badge {\n  border-radius: 999px;\n  font-size: 0.82rem;\n  font-weight: 760;\n  padding: 5px 10px;\n}\n\n.schema-badge--source {\n  border: 1px solid #9dc0ff;\n  background: #fff4cf;\n  color: #e5a900;\n}\n\n.schema-badge--target {\n  border: 1px solid #8bd2bd;\n  background: #eaf8f3;\n  color: #0f6654;\n}\n\n.test-shell {\n  display: grid;\n  gap: 14px;\n}\n\n.test-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 12px;\n}\n\n.json-panel,\n.messages-panel {\n  overflow: hidden;\n  border: 1px solid #cfd8e6;\n  border-radius: 8px;\n  background: #ffffff;\n}\n\n.panel-header {\n  border-bottom: 1px solid #dfe5ef;\n  background: #f8fafc;\n  padding: 14px 16px;\n}\n\n.panel-eyebrow {\n  margin: 0 0 4px;\n  color: #64748b;\n  font-size: 0.74rem;\n  font-weight: 760;\n  letter-spacing: 0;\n  text-transform: uppercase;\n}\n\n.panel-header h2 {\n  margin: 0;\n  color: #172033;\n  font-size: 1rem;\n  font-weight: 760;\n  letter-spacing: 0;\n}\n\n.json-editor,\n.json-output {\n  width: 100%;\n  min-height: 420px;\n  margin: 0;\n  border: 0;\n  background: #fbfdff;\n  color: #172033;\n  font-family: \"SFMono-Regular\", Consolas, \"Liberation Mono\", monospace;\n  font-size: 0.9rem;\n  line-height: 1.55;\n  padding: 16px;\n  resize: vertical;\n  tab-size: 2;\n}\n\n.json-editor:focus {\n  box-shadow: inset 0 0 0 3px rgb(252 189 0 / 16%);\n  outline: none;\n}\n\n.json-output {\n  overflow: auto;\n  overflow-wrap: anywhere;\n  white-space: pre-wrap;\n}\n\n.message-body {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 14px;\n  min-height: 120px;\n  padding: 16px;\n}\n\n.message-column {\n  min-width: 0;\n}\n\n.message-column h3 {\n  margin: 0 0 8px;\n  color: #92400e;\n  font-size: 0.95rem;\n  font-weight: 760;\n}\n\n.message-column--error h3 {\n  color: #9f2418;\n}\n\n.message-column ul {\n  display: grid;\n  gap: 6px;\n  margin: 0;\n  padding-left: 20px;\n  color: #59677c;\n  font-weight: 650;\n}\n\n.message-column--error ul {\n  color: #9f2418;\n}\n\n.state-message,\n.empty-state {\n  margin: 0;\n  color: #5d6b82;\n  font-weight: 650;\n}\n\n.feedback {\n  min-height: 48px;\n}\n\n.alert {\n  margin: 0;\n  border-radius: 8px;\n  padding: 14px 16px;\n  font-weight: 650;\n  line-height: 1.45;\n}\n\n.alert--success {\n  border: 1px solid #8bd2bd;\n  background: #eaf8f3;\n  color: #0f6654;\n}\n\n.alert--info {\n  border: 1px solid #b7cff7;\n  background: #fff4cf;\n  color: #e5a900;\n}\n\n.alert--error {\n  border: 1px solid #f0a8a0;\n  background: #fff0ed;\n  color: #9f2418;\n}\n\n.form-actions {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  border-top: 1px solid #dfe5ef;\n  padding-top: 18px;\n}\n\n.form-actions__right {\n  display: flex;\n  gap: 10px;\n}\n\n.primary-action,\n.secondary-action,\n.back-action {\n  min-height: 42px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 760;\n  transition: background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;\n}\n\n.primary-action {\n  min-width: 168px;\n  border: 0;\n  background: #fcbd00;\n  color: #ffffff;\n  padding: 10px 18px;\n}\n\n.primary-action:hover:not(:disabled) {\n  background: #e5a900;\n  box-shadow: 0 12px 24px rgb(252 189 0 / 22%);\n  transform: translateY(-1px);\n}\n\n.secondary-action,\n.back-action {\n  border: 1px solid #cfd8e6;\n  background: #ffffff;\n  color: #172033;\n  padding: 9px 14px;\n}\n\n.secondary-action:hover:not(:disabled),\n.back-action:hover:not(:disabled) {\n  border-color: #e5a900;\n  box-shadow: 0 8px 20px rgb(23 32 51 / 8%);\n}\n\n.primary-action:focus-visible,\n.secondary-action:focus-visible,\n.back-action:focus-visible {\n  outline: 3px solid rgb(252 189 0 / 24%);\n  outline-offset: 2px;\n}\n\n.primary-action:disabled,\n.secondary-action:disabled,\n.back-action:disabled {\n  cursor: not-allowed;\n  opacity: 0.62;\n  box-shadow: none;\n  transform: none;\n}\n\n@media (max-width: 920px) {\n  .test-grid,\n  .message-body {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 640px) {\n  .test-page {\n    padding: 28px 16px;\n  }\n\n  .form-actions,\n  .form-actions__right {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .primary-action,\n  .secondary-action,\n  .back-action {\n    width: 100%;\n  }\n\n  .completion-overlay {\n    padding: 18px 12px;\n  }\n\n  .completion-modal {\n    max-height: calc(100vh - 36px);\n    padding: 24px;\n  }\n}\n.completion-overlay {\n  position: fixed;\n  inset: 0;\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  overflow: auto;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 1000;\n  padding: 32px 16px;\n}\n\n.completion-modal {\n  display: flex;\n  flex-direction: column;\n  max-height: calc(100vh - 64px);\n  background: #ffffff;\n  border-radius: 16px;\n  padding: 32px;\n  max-width: 400px;\n  width: 90%;\n  text-align: center;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n}\n\n.completion-modal--wide {\n  max-width: 620px;\n  text-align: left;\n}\n\n.completion-modal__icon {\n  width: 64px;\n  height: 64px;\n  margin: 0 auto 16px;\n  background: #22c55e;\n  color: #ffffff;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 32px;\n  font-weight: bold;\n}\n\n.completion-modal__icon--error {\n  background: #dc2626;\n}\n\n.completion-modal__title {\n  margin: 0 0 8px;\n  font-size: 22px;\n  color: #111827;\n  text-align: center;\n}\n\n.completion-modal__text {\n  margin: 0 0 24px;\n  color: #6b7280;\n  font-size: 15px;\n  text-align: center;\n}\n\n.result-summary {\n  display: grid;\n  gap: 14px;\n  margin: 18px 0 24px;\n  overflow: auto;\n  max-height: min(52vh, 520px);\n  padding-right: 4px;\n  text-align: left;\n}\n\n.result-summary__column {\n  border: 1px solid #fde68a;\n  border-radius: 8px;\n  background: #fffbeb;\n  padding: 12px 14px;\n}\n\n.result-summary__column--error {\n  border-color: #fecaca;\n  background: #fff1f1;\n}\n\n.result-summary__column h3 {\n  margin: 0 0 8px;\n  color: #92400e;\n  font-size: 0.95rem;\n  font-weight: 760;\n}\n\n.result-summary__column--error h3 {\n  color: #b91c1c;\n}\n\n.result-summary__column ul {\n  display: grid;\n  gap: 6px;\n  margin: 0;\n  padding-left: 20px;\n  color: #59677c;\n  font-weight: 650;\n  overflow-wrap: anywhere;\n}\n\n.result-summary__column--error ul {\n  color: #9f2418;\n}\n\n.completion-modal__actions {\n  display: flex;\n  justify-content: center;\n  gap: 10px;\n}\n\n.completion-modal__btn {\n  background: #fcbd00;\n  color: #ffffff;\n  border: none;\n  border-radius: 8px;\n  padding: 12px 32px;\n  font-size: 15px;\n  font-weight: 600;\n  cursor: pointer;\n}\n\n.completion-modal__btn:disabled {\n  cursor: not-allowed;\n  opacity: 0.55;\n}\n\n.completion-modal__btn--secondary {\n  border: 1px solid #cfd8e6;\n  background: #ffffff;\n  color: #172033;\n}\n\n.completion-modal__btn:hover {\n  background: #e5a900;\n}\n\n.completion-modal__btn:disabled:hover {\n  background: #fcbd00;\n}\n\n.completion-modal__btn--secondary:hover {\n  background: #f8fafc;\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MappingTestPageComponent, { className: "MappingTestPageComponent", filePath: "src/app/features/mappings/mapping-test-page/mapping-test-page.component.ts", lineNumber: 23 }); })();
//# sourceMappingURL=mapping-test-page.component.js.map