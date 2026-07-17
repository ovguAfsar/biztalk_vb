import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function WizardStepperComponent_li_2_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 7);
} }
function WizardStepperComponent_li_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 3)(1, "span", 4);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 5);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, WizardStepperComponent_li_2_span_5_Template, 1, 0, "span", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const step_r1 = ctx.$implicit;
    const isLast_r2 = ctx.last;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("wizard-stepper__item--completed", ctx_r2.getStepState(step_r1.number) === "completed")("wizard-stepper__item--active", ctx_r2.getStepState(step_r1.number) === "active")("wizard-stepper__item--upcoming", ctx_r2.getStepState(step_r1.number) === "upcoming")("wizard-stepper__item--step-1", step_r1.number === 1)("wizard-stepper__item--step-2", step_r1.number === 2)("wizard-stepper__item--step-3", step_r1.number === 3)("wizard-stepper__item--step-4", step_r1.number === 4);
    i0.ɵɵattribute("aria-current", ctx_r2.getStepState(step_r1.number) === "active" ? "step" : null);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(step_r1.number);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(step_r1.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !isLast_r2);
} }
export class WizardStepperComponent {
    constructor() {
        this.currentStep = 1;
        this.steps = [
            { number: 1, label: 'Kaynak Dosya' },
            { number: 2, label: 'Alan Eşleştirme' },
            { number: 3, label: 'Test' },
            { number: 4, label: 'Çıktı ve Kaydet' }
        ];
    }
    getStepState(stepNumber) {
        if (stepNumber < this.currentStep) {
            return 'completed';
        }
        return stepNumber === this.currentStep ? 'active' : 'upcoming';
    }
    static { this.ɵfac = function WizardStepperComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || WizardStepperComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WizardStepperComponent, selectors: [["app-wizard-stepper"]], inputs: { currentStep: "currentStep" }, decls: 3, vars: 1, consts: [["aria-label", "Mapping ad\u0131mlar\u0131", 1, "wizard-stepper"], [1, "wizard-stepper__list"], ["class", "wizard-stepper__item", 3, "wizard-stepper__item--completed", "wizard-stepper__item--active", "wizard-stepper__item--upcoming", "wizard-stepper__item--step-1", "wizard-stepper__item--step-2", "wizard-stepper__item--step-3", "wizard-stepper__item--step-4", 4, "ngFor", "ngForOf"], [1, "wizard-stepper__item"], [1, "wizard-stepper__marker"], [1, "wizard-stepper__label"], ["class", "wizard-stepper__line", 4, "ngIf"], [1, "wizard-stepper__line"]], template: function WizardStepperComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "nav", 0)(1, "ol", 1);
            i0.ɵɵtemplate(2, WizardStepperComponent_li_2_Template, 6, 18, "li", 2);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.steps);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf], styles: [".wizard-stepper[_ngcontent-%COMP%] {\n  margin: 22px 0 0;\n}\n\n.wizard-stepper__list[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 0;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\n.wizard-stepper__item[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  min-width: 0;\n  color: #000000;\n  font-weight: 760;\n}\n\n.wizard-stepper__marker[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  display: grid;\n  place-items: center;\n  flex: 0 0 auto;\n  width: 34px;\n  height: 34px;\n  border: 2px solid #000000;\n  border-radius: 999px;\n  background: #ffffff;\n  color: #000000;\n  font-size: 0.92rem;\n  font-weight: 850;\n}\n\n.wizard-stepper__label[_ngcontent-%COMP%] {\n  min-width: 0;\n  margin-left: 10px;\n  overflow: hidden;\n  color: inherit;\n  font-size: 0.92rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.wizard-stepper__line[_ngcontent-%COMP%] {\n  height: 2px;\n  min-width: 18px;\n  flex: 1 1 auto;\n  margin: 0 18px;\n  background: #000000;\n}\n\n.wizard-stepper__item--completed[_ngcontent-%COMP%] {\n  color: #000000;\n}\n\n.wizard-stepper__item--completed[_ngcontent-%COMP%]   .wizard-stepper__marker[_ngcontent-%COMP%] {\n  color: #000000;\n}\n\n.wizard-stepper__item--completed[_ngcontent-%COMP%]   .wizard-stepper__line[_ngcontent-%COMP%] {\n  background: #000000;\n}\n\n.wizard-stepper__item--active[_ngcontent-%COMP%] {\n  color: #000000;\n}\n\n.wizard-stepper__item--active[_ngcontent-%COMP%]   .wizard-stepper__marker[_ngcontent-%COMP%] {\n  border-color: #000000;\n  color: #000000;\n  box-shadow: 0 0 0 5px rgb(0 0 0 / 14%);\n}\n\n.wizard-stepper__item--upcoming[_ngcontent-%COMP%] {\n  color: #000000;\n}\n\n.wizard-stepper__item--step-1[_ngcontent-%COMP%]   .wizard-stepper__marker[_ngcontent-%COMP%] {\n  background: #ffd166;\n}\n\n.wizard-stepper__item--step-2[_ngcontent-%COMP%]   .wizard-stepper__marker[_ngcontent-%COMP%] {\n  background: #f27b42;\n}\n\n.wizard-stepper__item--step-3[_ngcontent-%COMP%]   .wizard-stepper__marker[_ngcontent-%COMP%] {\n  background: #f3a3a0;\n}\n\n.wizard-stepper__item--step-4[_ngcontent-%COMP%]   .wizard-stepper__marker[_ngcontent-%COMP%] {\n  background: #e2241e;\n}\n\n@media (max-width: 720px) {\n  .wizard-stepper__list[_ngcontent-%COMP%] {\n    gap: 12px;\n  }\n\n  .wizard-stepper__item[_ngcontent-%COMP%] {\n    display: grid;\n    justify-items: center;\n    text-align: center;\n  }\n\n  .wizard-stepper__label[_ngcontent-%COMP%] {\n    margin: 8px 0 0;\n    white-space: normal;\n  }\n\n  .wizard-stepper__line[_ngcontent-%COMP%] {\n    display: none;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WizardStepperComponent, [{
        type: Component,
        args: [{ selector: 'app-wizard-stepper', standalone: true, imports: [CommonModule], template: "<nav class=\"wizard-stepper\" aria-label=\"Mapping ad\u0131mlar\u0131\">\n  <ol class=\"wizard-stepper__list\">\n    <li\n      class=\"wizard-stepper__item\"\n      *ngFor=\"let step of steps; let isLast = last\"\n      [class.wizard-stepper__item--completed]=\"getStepState(step.number) === 'completed'\"\n      [class.wizard-stepper__item--active]=\"getStepState(step.number) === 'active'\"\n      [class.wizard-stepper__item--upcoming]=\"getStepState(step.number) === 'upcoming'\"\n      [class.wizard-stepper__item--step-1]=\"step.number === 1\"\n      [class.wizard-stepper__item--step-2]=\"step.number === 2\"\n      [class.wizard-stepper__item--step-3]=\"step.number === 3\"\n      [class.wizard-stepper__item--step-4]=\"step.number === 4\"\n      [attr.aria-current]=\"getStepState(step.number) === 'active' ? 'step' : null\"\n    >\n      <span class=\"wizard-stepper__marker\">{{ step.number }}</span>\n      <span class=\"wizard-stepper__label\">{{ step.label }}</span>\n      <span class=\"wizard-stepper__line\" *ngIf=\"!isLast\"></span>\n    </li>\n  </ol>\n</nav>\n", styles: [".wizard-stepper {\n  margin: 22px 0 0;\n}\n\n.wizard-stepper__list {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 0;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\n.wizard-stepper__item {\n  position: relative;\n  display: flex;\n  align-items: center;\n  min-width: 0;\n  color: #000000;\n  font-weight: 760;\n}\n\n.wizard-stepper__marker {\n  position: relative;\n  z-index: 2;\n  display: grid;\n  place-items: center;\n  flex: 0 0 auto;\n  width: 34px;\n  height: 34px;\n  border: 2px solid #000000;\n  border-radius: 999px;\n  background: #ffffff;\n  color: #000000;\n  font-size: 0.92rem;\n  font-weight: 850;\n}\n\n.wizard-stepper__label {\n  min-width: 0;\n  margin-left: 10px;\n  overflow: hidden;\n  color: inherit;\n  font-size: 0.92rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.wizard-stepper__line {\n  height: 2px;\n  min-width: 18px;\n  flex: 1 1 auto;\n  margin: 0 18px;\n  background: #000000;\n}\n\n.wizard-stepper__item--completed {\n  color: #000000;\n}\n\n.wizard-stepper__item--completed .wizard-stepper__marker {\n  color: #000000;\n}\n\n.wizard-stepper__item--completed .wizard-stepper__line {\n  background: #000000;\n}\n\n.wizard-stepper__item--active {\n  color: #000000;\n}\n\n.wizard-stepper__item--active .wizard-stepper__marker {\n  border-color: #000000;\n  color: #000000;\n  box-shadow: 0 0 0 5px rgb(0 0 0 / 14%);\n}\n\n.wizard-stepper__item--upcoming {\n  color: #000000;\n}\n\n.wizard-stepper__item--step-1 .wizard-stepper__marker {\n  background: #ffd166;\n}\n\n.wizard-stepper__item--step-2 .wizard-stepper__marker {\n  background: #f27b42;\n}\n\n.wizard-stepper__item--step-3 .wizard-stepper__marker {\n  background: #f3a3a0;\n}\n\n.wizard-stepper__item--step-4 .wizard-stepper__marker {\n  background: #e2241e;\n}\n\n@media (max-width: 720px) {\n  .wizard-stepper__list {\n    gap: 12px;\n  }\n\n  .wizard-stepper__item {\n    display: grid;\n    justify-items: center;\n    text-align: center;\n  }\n\n  .wizard-stepper__label {\n    margin: 8px 0 0;\n    white-space: normal;\n  }\n\n  .wizard-stepper__line {\n    display: none;\n  }\n}\n"] }]
    }], null, { currentStep: [{
            type: Input,
            args: [{ required: true }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(WizardStepperComponent, { className: "WizardStepperComponent", filePath: "src/app/shared/wizard-stepper/wizard-stepper.component.ts", lineNumber: 16 }); })();
//# sourceMappingURL=wizard-stepper.component.js.map