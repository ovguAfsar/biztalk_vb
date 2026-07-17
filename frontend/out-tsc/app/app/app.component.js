import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import * as i0 from "@angular/core";
function AppComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 0)(1, "span", 3);
    i0.ɵɵtext(2, "\u2190");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Ana Sayfa ");
    i0.ɵɵelementEnd();
} }
export class AppComponent {
    constructor() {
        this.router = inject(Router);
    }
    static { this.ɵfac = function AppComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AppComponent, selectors: [["app-root"]], decls: 4, vars: 1, consts: [["routerLink", "/", "aria-label", "Ana sayfaya d\u00F6n", 1, "app-home-link"], [1, "app-brand-logo"], ["src", "assets/brand/vakifbank-logo-header.png", "alt", "Vak\u0131fBank"], ["aria-hidden", "true"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, AppComponent_Conditional_0_Template, 4, 0, "a", 0);
            i0.ɵɵelementStart(1, "div", 1);
            i0.ɵɵelement(2, "img", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(3, "router-outlet");
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.router.url !== "/" ? 0 : -1);
        } }, dependencies: [RouterLink, RouterOutlet], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppComponent, [{
        type: Component,
        args: [{
                selector: 'app-root',
                standalone: true,
                imports: [RouterLink, RouterOutlet],
                template: `
    @if (router.url !== '/') {
      <a class="app-home-link" routerLink="/" aria-label="Ana sayfaya dön">
        <span aria-hidden="true">←</span>
        Ana Sayfa
      </a>
    }
    <div class="app-brand-logo">
      <img
        src="assets/brand/vakifbank-logo-header.png"
        alt="VakıfBank"
      />
    </div>
    <router-outlet />
  `
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 24 }); })();
//# sourceMappingURL=app.component.js.map