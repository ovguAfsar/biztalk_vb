import { CommonModule, Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { MappingApiService } from '../../../core/services/mapping-api.service';
import { WizardStepperComponent } from '../../../shared/wizard-stepper/wizard-stepper.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function MappingOutputPageComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "span", 9);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 10);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.mapping.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r0.mapping.sourceType, " \u2192 ", ctx_r0.mapping.targetType);
} }
function MappingOutputPageComponent_p_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 11);
    i0.ɵɵtext(1, "Mapping bilgisi y\u00FCkleniyor...");
    i0.ɵɵelementEnd();
} }
function MappingOutputPageComponent_section_8_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 15)(1, "p");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 16);
    i0.ɵɵlistener("click", function MappingOutputPageComponent_section_8_div_1_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.returnToTest()); });
    i0.ɵɵtext(4, "Test Sayfas\u0131na D\u00F6n");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.loadError);
} }
function MappingOutputPageComponent_section_8_ng_container_2_p_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 26);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("alert--success", ctx_r0.feedbackType === "success")("alert--info", ctx_r0.feedbackType === "info")("alert--error", ctx_r0.feedbackType === "error");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.feedbackMessage);
} }
function MappingOutputPageComponent_section_8_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "section", 17)(2, "header", 18)(3, "div")(4, "p", 19);
    i0.ɵɵtext(5, "Generated target payload");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h2");
    i0.ɵɵtext(7, "JSON \u00D6nizleme");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "time");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "pre", 20);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 21);
    i0.ɵɵtemplate(13, MappingOutputPageComponent_section_8_ng_container_2_p_13_Template, 2, 7, "p", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 23)(15, "button", 24);
    i0.ɵɵlistener("click", function MappingOutputPageComponent_section_8_ng_container_2_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.goBack()); });
    i0.ɵɵtext(16, "Geri");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "button", 25);
    i0.ɵɵlistener("click", function MappingOutputPageComponent_section_8_ng_container_2_Template_button_click_17_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.save()); });
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(8);
    i0.ɵɵattribute("datetime", ctx_r0.generatedAt);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u00DCretildi: ", ctx_r0.formatDate(ctx_r0.generatedAt));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.outputJson);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.feedbackMessage);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isSaving);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isSaving);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.isSaving ? "Kaydediliyor..." : "Kaydet", " ");
} }
function MappingOutputPageComponent_section_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 12);
    i0.ɵɵtemplate(1, MappingOutputPageComponent_section_8_div_1_Template, 5, 1, "div", 13)(2, MappingOutputPageComponent_section_8_ng_container_2_Template, 19, 7, "ng-container", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.loadError);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.loadError && ctx_r0.outputJson);
} }
export class MappingOutputPageComponent {
    constructor() {
        this.route = inject(ActivatedRoute);
        this.router = inject(Router);
        this.location = inject(Location);
        this.mappingApi = inject(MappingApiService);
        this.changeDetector = inject(ChangeDetectorRef);
        this.mappingId = '';
        this.outputJson = '';
        this.generatedAt = '';
        this.isLoading = true;
        this.isSaving = false;
        this.loadError = '';
        this.feedbackMessage = '';
        this.feedbackType = 'success';
    }
    ngOnInit() {
        this.mappingId = this.route.snapshot.paramMap.get('mappingId') ?? '';
        const state = window.history.state;
        if (Object.prototype.hasOwnProperty.call(state, 'output') && state.generatedAt) {
            this.output = state.output;
            this.outputJson = JSON.stringify(state.output, null, 2);
            this.generatedAt = state.generatedAt;
        }
        else {
            this.loadError = 'Önizlenecek çıktı bulunamadı. Mapping’i yeniden çalıştırın.';
        }
        if (!this.mappingId) {
            this.isLoading = false;
            this.loadError = 'Mapping id bulunamadı.';
            return;
        }
        this.mappingApi.getMappingById(this.mappingId)
            .pipe(finalize(() => {
            this.isLoading = false;
            this.changeDetector.detectChanges();
        }))
            .subscribe({
            next: mapping => {
                this.mapping = mapping;
                this.changeDetector.detectChanges();
            },
            error: error => {
                this.loadError = this.getErrorMessage(error, 'Mapping bilgisi alınamadı.');
                this.changeDetector.detectChanges();
            }
        });
    }
    save() {
        if (this.output === undefined || !this.generatedAt || this.isSaving)
            return;
        this.isSaving = true;
        this.feedbackMessage = '';
        this.mappingApi.saveMappingOutput(this.mappingId, {
            output: this.output,
            generatedAt: this.generatedAt
        }).pipe(finalize(() => {
            this.isSaving = false;
            this.changeDetector.detectChanges();
        })).subscribe({
            next: response => this.showSaveResult(response),
            error: error => {
                this.feedbackType = 'error';
                this.feedbackMessage = this.getErrorMessage(error, 'Çıktı kaydedilemedi. Lütfen tekrar deneyin.');
                this.changeDetector.detectChanges();
            }
        });
    }
    goBack() {
        if (window.history.length > 1) {
            this.location.back();
            return;
        }
        void this.router.navigate(['/mappings', this.mappingId, 'test']);
    }
    returnToTest() {
        void this.router.navigate(['/mappings', this.mappingId, 'test']);
    }
    formatDate(value) {
        return new Intl.DateTimeFormat('tr-TR', { dateStyle: 'medium', timeStyle: 'medium' }).format(new Date(value));
    }
    showSaveResult(response) {
        this.feedbackType = response.alreadyExists ? 'info' : 'success';
        this.feedbackMessage = response.alreadyExists
            ? `Bu çıktı daha önce ${this.formatDate(response.savedAt)} tarihinde kaydedilmiş. Yeni kopya oluşturulmadı.`
            : `Çıktı ${this.formatDate(response.savedAt)} tarihinde başarıyla kaydedildi.`;
        this.changeDetector.detectChanges();
    }
    getErrorMessage(error, fallback) {
        if (error instanceof HttpErrorResponse) {
            const validationErrors = error.error?.errors;
            return validationErrors ? Object.values(validationErrors).flat().join(' ') : error.error?.title || fallback;
        }
        return fallback;
    }
    static { this.ɵfac = function MappingOutputPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MappingOutputPageComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MappingOutputPageComponent, selectors: [["app-mapping-output-page"]], decls: 9, vars: 4, consts: [[1, "output-page"], ["aria-labelledby", "output-title", 1, "wizard-shell"], [1, "wizard-header"], ["id", "output-title"], [3, "currentStep"], ["class", "mapping-summary", 4, "ngIf"], ["class", "state-message", 4, "ngIf"], ["class", "output-shell", 4, "ngIf"], [1, "mapping-summary"], [1, "mapping-summary__name"], [1, "schema-badge"], [1, "state-message"], [1, "output-shell"], ["class", "alert alert--error", 4, "ngIf"], [4, "ngIf"], [1, "alert", "alert--error"], ["type", "button", 1, "secondary-action", 3, "click"], [1, "json-panel"], [1, "panel-header"], [1, "panel-eyebrow"], ["aria-label", "\u00DCretilen JSON \u00E7\u0131kt\u0131s\u0131", 1, "json-output"], ["aria-live", "polite", 1, "feedback"], ["class", "alert", 3, "alert--success", "alert--info", "alert--error", 4, "ngIf"], [1, "form-actions"], ["type", "button", 1, "back-action", 3, "click", "disabled"], ["type", "button", 1, "primary-action", 3, "click", "disabled"], [1, "alert"]], template: function MappingOutputPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "main", 0)(1, "section", 1)(2, "header", 2)(3, "h1", 3);
            i0.ɵɵtext(4, "JSON \u00C7\u0131kt\u0131s\u0131");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "app-wizard-stepper", 4);
            i0.ɵɵtemplate(6, MappingOutputPageComponent_div_6_Template, 5, 3, "div", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(7, MappingOutputPageComponent_p_7_Template, 2, 0, "p", 6)(8, MappingOutputPageComponent_section_8_Template, 3, 2, "section", 7);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("currentStep", 4);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.mapping);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading);
        } }, dependencies: [CommonModule, i1.NgIf, WizardStepperComponent], styles: [".output-page[_ngcontent-%COMP%] { min-height: 100vh; padding: 40px 20px; }\n.wizard-shell[_ngcontent-%COMP%] { max-width: 1120px; margin: 0 auto; }\n.wizard-header[_ngcontent-%COMP%] { margin-bottom: 24px; }\n.wizard-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { margin: 0; font-size: clamp(1.65rem, 3.2vw, 2.35rem); font-weight: 800; }\n.mapping-summary[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 10px; margin-top: 16px; }\n.mapping-summary__name[_ngcontent-%COMP%] { font-weight: 750; }\n.schema-badge[_ngcontent-%COMP%] { border: 1px solid #000; border-radius: 999px; background: #ffd166; padding: 5px 10px; font-size: .82rem; font-weight: 800; }\n.output-shell[_ngcontent-%COMP%] { display: grid; gap: 14px; }\n.json-panel[_ngcontent-%COMP%] { overflow: hidden; border: 2px solid #000; border-radius: 10px; background: #fff; box-shadow: 8px 8px 0 rgb(0 0 0 / 14%); }\n.panel-header[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: center; gap: 16px; border-bottom: 2px solid #000; background: #ffd166; padding: 14px 16px; }\n.panel-eyebrow[_ngcontent-%COMP%] { margin: 0 0 4px; font-size: .74rem; font-weight: 800; text-transform: uppercase; }\n.panel-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 0; font-size: 1.05rem; }\n.panel-header[_ngcontent-%COMP%]   time[_ngcontent-%COMP%] { font-size: .86rem; font-weight: 750; }\n.json-output[_ngcontent-%COMP%] { min-height: 440px; max-height: 62vh; overflow: auto; margin: 0; background: #fff; padding: 20px; font-family: \"SFMono-Regular\", Consolas, monospace; font-size: .9rem; line-height: 1.6; white-space: pre-wrap; overflow-wrap: anywhere; }\n.feedback[_ngcontent-%COMP%] { min-height: 50px; }\n.alert[_ngcontent-%COMP%] { margin: 0; border-radius: 8px; padding: 14px 16px; font-weight: 700; }\n.alert[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0 0 12px; }\n.alert--success[_ngcontent-%COMP%] { border: 1px solid #16734f; background: #eaf8f3; }\n.alert--info[_ngcontent-%COMP%] { border: 1px solid #000; background: #fff4cf; }\n.alert--error[_ngcontent-%COMP%] { border: 1px solid #a12b20; background: #fff0ed; }\n.form-actions[_ngcontent-%COMP%] { display: flex; justify-content: space-between; gap: 12px; border-top: 1px solid #000; padding-top: 18px; }\n.primary-action[_ngcontent-%COMP%], .secondary-action[_ngcontent-%COMP%], .back-action[_ngcontent-%COMP%] { min-height: 42px; border-radius: 8px; cursor: pointer; padding: 9px 18px; font-weight: 800; }\n.primary-action[_ngcontent-%COMP%] { min-width: 150px; border: 2px solid #000; background: #fcbd00; }\n.secondary-action[_ngcontent-%COMP%], .back-action[_ngcontent-%COMP%] { border: 1px solid #000; background: #fff; }\nbutton[_ngcontent-%COMP%]:disabled { cursor: not-allowed; opacity: .6; }\nbutton[_ngcontent-%COMP%]:focus-visible { outline: 3px solid rgb(0 0 0 / 25%); outline-offset: 2px; }\n@media (max-width: 640px) { .panel-header[_ngcontent-%COMP%] { align-items: flex-start; flex-direction: column; } .form-actions[_ngcontent-%COMP%] { flex-direction: column-reverse; } .form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { width: 100%; } }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MappingOutputPageComponent, [{
        type: Component,
        args: [{ selector: 'app-mapping-output-page', standalone: true, imports: [CommonModule, WizardStepperComponent], template: "<main class=\"output-page\">\n  <section class=\"wizard-shell\" aria-labelledby=\"output-title\">\n    <header class=\"wizard-header\">\n      <h1 id=\"output-title\">JSON \u00C7\u0131kt\u0131s\u0131</h1>\n      <app-wizard-stepper [currentStep]=\"4\"></app-wizard-stepper>\n\n      <div class=\"mapping-summary\" *ngIf=\"mapping\">\n        <span class=\"mapping-summary__name\">{{ mapping.name }}</span>\n        <span class=\"schema-badge\">{{ mapping.sourceType }} \u2192 {{ mapping.targetType }}</span>\n      </div>\n    </header>\n\n    <p class=\"state-message\" *ngIf=\"isLoading\">Mapping bilgisi y\u00FCkleniyor...</p>\n\n    <section class=\"output-shell\" *ngIf=\"!isLoading\">\n      <div class=\"alert alert--error\" *ngIf=\"loadError\">\n        <p>{{ loadError }}</p>\n        <button type=\"button\" class=\"secondary-action\" (click)=\"returnToTest()\">Test Sayfas\u0131na D\u00F6n</button>\n      </div>\n\n      <ng-container *ngIf=\"!loadError && outputJson\">\n        <section class=\"json-panel\">\n          <header class=\"panel-header\">\n            <div>\n              <p class=\"panel-eyebrow\">Generated target payload</p>\n              <h2>JSON \u00D6nizleme</h2>\n            </div>\n            <time [attr.datetime]=\"generatedAt\">\u00DCretildi: {{ formatDate(generatedAt) }}</time>\n          </header>\n          <pre class=\"json-output\" aria-label=\"\u00DCretilen JSON \u00E7\u0131kt\u0131s\u0131\">{{ outputJson }}</pre>\n        </section>\n\n        <div class=\"feedback\" aria-live=\"polite\">\n          <p class=\"alert\" *ngIf=\"feedbackMessage\"\n             [class.alert--success]=\"feedbackType === 'success'\"\n             [class.alert--info]=\"feedbackType === 'info'\"\n             [class.alert--error]=\"feedbackType === 'error'\">{{ feedbackMessage }}</p>\n        </div>\n\n        <div class=\"form-actions\">\n          <button type=\"button\" class=\"back-action\" (click)=\"goBack()\" [disabled]=\"isSaving\">Geri</button>\n          <button type=\"button\" class=\"primary-action\" (click)=\"save()\" [disabled]=\"isSaving\">\n            {{ isSaving ? 'Kaydediliyor...' : 'Kaydet' }}\n          </button>\n        </div>\n      </ng-container>\n    </section>\n  </section>\n</main>\n", styles: [".output-page { min-height: 100vh; padding: 40px 20px; }\n.wizard-shell { max-width: 1120px; margin: 0 auto; }\n.wizard-header { margin-bottom: 24px; }\n.wizard-header h1 { margin: 0; font-size: clamp(1.65rem, 3.2vw, 2.35rem); font-weight: 800; }\n.mapping-summary { display: flex; align-items: center; gap: 10px; margin-top: 16px; }\n.mapping-summary__name { font-weight: 750; }\n.schema-badge { border: 1px solid #000; border-radius: 999px; background: #ffd166; padding: 5px 10px; font-size: .82rem; font-weight: 800; }\n.output-shell { display: grid; gap: 14px; }\n.json-panel { overflow: hidden; border: 2px solid #000; border-radius: 10px; background: #fff; box-shadow: 8px 8px 0 rgb(0 0 0 / 14%); }\n.panel-header { display: flex; justify-content: space-between; align-items: center; gap: 16px; border-bottom: 2px solid #000; background: #ffd166; padding: 14px 16px; }\n.panel-eyebrow { margin: 0 0 4px; font-size: .74rem; font-weight: 800; text-transform: uppercase; }\n.panel-header h2 { margin: 0; font-size: 1.05rem; }\n.panel-header time { font-size: .86rem; font-weight: 750; }\n.json-output { min-height: 440px; max-height: 62vh; overflow: auto; margin: 0; background: #fff; padding: 20px; font-family: \"SFMono-Regular\", Consolas, monospace; font-size: .9rem; line-height: 1.6; white-space: pre-wrap; overflow-wrap: anywhere; }\n.feedback { min-height: 50px; }\n.alert { margin: 0; border-radius: 8px; padding: 14px 16px; font-weight: 700; }\n.alert p { margin: 0 0 12px; }\n.alert--success { border: 1px solid #16734f; background: #eaf8f3; }\n.alert--info { border: 1px solid #000; background: #fff4cf; }\n.alert--error { border: 1px solid #a12b20; background: #fff0ed; }\n.form-actions { display: flex; justify-content: space-between; gap: 12px; border-top: 1px solid #000; padding-top: 18px; }\n.primary-action, .secondary-action, .back-action { min-height: 42px; border-radius: 8px; cursor: pointer; padding: 9px 18px; font-weight: 800; }\n.primary-action { min-width: 150px; border: 2px solid #000; background: #fcbd00; }\n.secondary-action, .back-action { border: 1px solid #000; background: #fff; }\nbutton:disabled { cursor: not-allowed; opacity: .6; }\nbutton:focus-visible { outline: 3px solid rgb(0 0 0 / 25%); outline-offset: 2px; }\n@media (max-width: 640px) { .panel-header { align-items: flex-start; flex-direction: column; } .form-actions { flex-direction: column-reverse; } .form-actions button { width: 100%; } }\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MappingOutputPageComponent, { className: "MappingOutputPageComponent", filePath: "src/app/features/mappings/mapping-output-page/mapping-output-page.component.ts", lineNumber: 23 }); })();
//# sourceMappingURL=mapping-output-page.component.js.map