import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { MappingApiService } from '../../core/services/mapping-api.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = a0 => ["/mappings", a0, "edit"];
function DashboardPageComponent_div_28_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 24)(1, "label", 25)(2, "span", 26);
    i0.ɵɵtext(3, "Mappinglerde ara");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "input", 27);
    i0.ɵɵlistener("input", function DashboardPageComponent_div_28_Template_input_input_4_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.updateMappingSearchTerm($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "label", 28)(6, "span");
    i0.ɵɵtext(7, "Dosya Deseni");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "select", 29);
    i0.ɵɵlistener("change", function DashboardPageComponent_div_28_Template_select_change_8_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.updatePatternFilter($event)); });
    i0.ɵɵelementStart(9, "option", 30);
    i0.ɵɵtext(10, "T\u00FCm\u00FC");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "option", 31);
    i0.ɵɵtext(12, "Maa\u015F");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "option", 32);
    i0.ɵɵtext(14, "T\u00D6S");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "option", 33);
    i0.ɵɵtext(16, "MTV");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "option", 34);
    i0.ɵɵtext(18, "G\u00FCmr\u00FCk Vergisi");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "option", 35);
    i0.ɵɵtext(20, "Toplu Vergi");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", ctx_r1.mappingSearchTerm);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", ctx_r1.selectedPatternFilter);
} }
function DashboardPageComponent_p_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 36);
    i0.ɵɵtext(1, "Mapping kay\u0131tlar\u0131 y\u00FCkleniyor...");
    i0.ɵɵelementEnd();
} }
function DashboardPageComponent_p_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 37);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.errorMessage);
} }
function DashboardPageComponent_div_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36)(1, "strong");
    i0.ɵɵtext(2, "Hen\u00FCz mapping bulunmuyor.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "\u0130lk mapping \u00E7al\u0131\u015Fman\u0131z\u0131 olu\u015Fturmak i\u00E7in yukar\u0131daki kart\u0131 kullanabilirsiniz.");
    i0.ɵɵelementEnd()();
} }
function DashboardPageComponent_div_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36)(1, "strong");
    i0.ɵɵtext(2, "Arama ve filtreye uygun mapping bulunamad\u0131.");
    i0.ɵɵelementEnd()();
} }
function DashboardPageComponent_div_33_tr_16_small_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mapping_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(mapping_r4.description);
} }
function DashboardPageComponent_div_33_tr_16_span_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 49);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const mapping_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", mapping_r4.institution, " ");
} }
function DashboardPageComponent_div_33_tr_16_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 50);
    i0.ɵɵtext(1, "\u2014");
    i0.ɵɵelementEnd();
} }
function DashboardPageComponent_div_33_tr_16_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "a", 41);
    i0.ɵɵelement(3, "span", 42);
    i0.ɵɵelementStart(4, "span")(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, DashboardPageComponent_div_33_tr_16_small_7_Template, 2, 1, "small", 43);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(8, "td");
    i0.ɵɵtemplate(9, DashboardPageComponent_div_33_tr_16_span_9_Template, 2, 1, "span", 44)(10, DashboardPageComponent_div_33_tr_16_ng_template_10_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td")(13, "span", 45);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "td");
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td")(19, "div", 46)(20, "a", 47);
    i0.ɵɵtext(21, "D\u00FCzenle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "button", 48);
    i0.ɵɵlistener("click", function DashboardPageComponent_div_33_tr_16_Template_button_click_22_listener() { const mapping_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.deleteMapping(mapping_r4)); });
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const mapping_r4 = ctx.$implicit;
    const noInstitution_r5 = i0.ɵɵreference(11);
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(17, _c0, mapping_r4.id));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(mapping_r4.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", mapping_r4.description);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", mapping_r4.institution)("ngIfElse", noInstitution_r5);
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("status-badge--in-progress", mapping_r4.status === "in_progress")("status-badge--completed", mapping_r4.status === "completed");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getStatusLabel(mapping_r4.status), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(17, 14, mapping_r4.updatedAt, "dd.MM.yyyy HH:mm"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(19, _c0, mapping_r4.id));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.deletingMappingId === mapping_r4.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.deletingMappingId === mapping_r4.id ? "Siliniyor" : "Sil", " ");
} }
function DashboardPageComponent_div_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38)(1, "table", 39)(2, "thead")(3, "tr")(4, "th");
    i0.ɵɵtext(5, "Mapping Ad\u0131");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th");
    i0.ɵɵtext(7, "Kurum");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th");
    i0.ɵɵtext(9, "Durum");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th");
    i0.ɵɵtext(11, "Son G\u00FCncelleme");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th")(13, "span", 26);
    i0.ɵɵtext(14, "\u0130\u015Flemler");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(15, "tbody");
    i0.ɵɵtemplate(16, DashboardPageComponent_div_33_tr_16_Template, 24, 21, "tr", 40);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(16);
    i0.ɵɵproperty("ngForOf", ctx_r1.visibleMappings);
} }
function DashboardPageComponent_div_34_button_7_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 56);
    i0.ɵɵlistener("click", function DashboardPageComponent_div_34_button_7_Template_button_click_0_listener() { const page_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.goToPage(page_r8)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const page_r8 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("pagination__button--active", page_r8 === ctx_r1.currentPage);
    i0.ɵɵattribute("aria-current", page_r8 === ctx_r1.currentPage ? "page" : null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", page_r8, " ");
} }
function DashboardPageComponent_div_34_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 51)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "nav", 52)(4, "button", 53);
    i0.ɵɵlistener("click", function DashboardPageComponent_div_34_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.goToPage(ctx_r1.currentPage - 1)); });
    i0.ɵɵtext(5, " \u00D6nceki ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 54);
    i0.ɵɵtemplate(7, DashboardPageComponent_div_34_button_7_Template, 2, 4, "button", 55);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 53);
    i0.ɵɵlistener("click", function DashboardPageComponent_div_34_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.goToPage(ctx_r1.currentPage + 1)); });
    i0.ɵɵtext(9, " Sonraki ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3("", ctx_r1.firstVisibleMappingNumber, "\u2013", ctx_r1.lastVisibleMappingNumber, " / ", ctx_r1.filteredMappings.length, " g\u00F6steriliyor");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.currentPage === 1);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r1.pageNumbers);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.currentPage === ctx_r1.totalPages);
} }
export class DashboardPageComponent {
    constructor() {
        this.mappingApi = inject(MappingApiService);
        this.mappings = [];
        this.isLoading = false;
        this.deletingMappingId = '';
        this.errorMessage = '';
        this.mappingSearchTerm = '';
        this.selectedPatternFilter = 'all';
        this.currentPage = 1;
        this.pageSize = 5;
    }
    get filteredMappings() {
        const searchTerm = this.mappingSearchTerm.trim().toLocaleLowerCase('tr-TR');
        return this.mappings.filter(mapping => {
            const normalizedPattern = mapping.patternType === 'mtv' ? 'vergi_mtv' : mapping.patternType;
            const matchesPattern = this.selectedPatternFilter === 'all'
                || normalizedPattern === this.selectedPatternFilter;
            const matchesSearch = !searchTerm || [
                mapping.name,
                mapping.institution ?? '',
                mapping.description ?? '',
                this.getStatusLabel(mapping.status)
            ].join(' ').toLocaleLowerCase('tr-TR').includes(searchTerm);
            return matchesPattern && matchesSearch;
        });
    }
    get visibleMappings() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        return this.filteredMappings.slice(startIndex, startIndex + this.pageSize);
    }
    get totalPages() {
        return Math.max(1, Math.ceil(this.filteredMappings.length / this.pageSize));
    }
    get pageNumbers() {
        return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    }
    get firstVisibleMappingNumber() {
        return this.filteredMappings.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
    }
    get lastVisibleMappingNumber() {
        return Math.min(this.currentPage * this.pageSize, this.filteredMappings.length);
    }
    get totalMappings() {
        return this.mappings.length;
    }
    get activeMappings() {
        return this.mappings.filter(mapping => mapping.status === 'completed').length;
    }
    get draftMappings() {
        return this.mappings.filter(mapping => mapping.status === 'draft' || mapping.status === 'in_progress').length;
    }
    ngOnInit() {
        this.loadMappings();
    }
    getStatusLabel(status) {
        switch (status) {
            case 'completed':
                return 'Tamamlandı';
            case 'in_progress':
                return 'Devam Ediyor';
            default:
                return 'Devam Ediyor';
        }
    }
    updateMappingSearchTerm(event) {
        this.mappingSearchTerm = event.target.value;
        this.currentPage = 1;
    }
    updatePatternFilter(event) {
        this.selectedPatternFilter = event.target.value;
        this.currentPage = 1;
    }
    goToPage(page) {
        if (page < 1 || page > this.totalPages || page === this.currentPage) {
            return;
        }
        this.currentPage = page;
    }
    deleteMapping(mapping) {
        if (this.deletingMappingId || !window.confirm(`“${mapping.name}” mapping kaydı silinsin mi?`)) {
            return;
        }
        this.errorMessage = '';
        this.deletingMappingId = mapping.id;
        this.mappingApi.deleteMapping(mapping.id)
            .pipe(finalize(() => {
            this.deletingMappingId = '';
        }))
            .subscribe({
            next: () => {
                this.mappings = this.mappings.filter(item => item.id !== mapping.id);
                this.currentPage = Math.min(this.currentPage, this.totalPages);
            },
            error: (error) => {
                this.errorMessage = this.getErrorMessage(error, 'Mapping silinemedi.');
            }
        });
    }
    loadMappings() {
        this.isLoading = true;
        this.errorMessage = '';
        this.mappingApi.getMappings()
            .pipe(finalize(() => {
            this.isLoading = false;
        }))
            .subscribe({
            next: (mappings) => {
                this.mappings = [...mappings].sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime());
            },
            error: (error) => {
                this.errorMessage = this.getErrorMessage(error, 'Mapping listesi yüklenemedi.');
            }
        });
    }
    getErrorMessage(error, fallback) {
        if (error instanceof HttpErrorResponse) {
            return error.error?.title || fallback;
        }
        return fallback;
    }
    static { this.ɵfac = function DashboardPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DashboardPageComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DashboardPageComponent, selectors: [["app-dashboard-page"]], decls: 57, vars: 11, consts: [["noInstitution", ""], [1, "dashboard-page"], ["aria-labelledby", "dashboard-title", 1, "dashboard-shell"], [1, "dashboard-header"], [1, "dashboard-header__eyebrow"], ["id", "dashboard-title"], ["routerLink", "/mappings/create", 1, "create-card"], ["aria-hidden", "true", 1, "create-card__icon"], [1, "create-card__content"], ["aria-hidden", "true", 1, "create-card__arrow"], ["aria-labelledby", "recent-work-title", 1, "recent-work"], [1, "section-heading"], ["id", "recent-work-title"], [1, "section-heading__count"], ["class", "mapping-tools", 4, "ngIf"], ["class", "dashboard-state", 4, "ngIf"], ["class", "dashboard-state dashboard-state--error", 4, "ngIf"], ["class", "mapping-table-wrap", 4, "ngIf"], ["class", "mapping-list-footer", 4, "ngIf"], ["aria-label", "Mapping istatistikleri", 1, "stats-grid"], [1, "stat-card"], ["aria-hidden", "true", 1, "stat-card__mark"], ["aria-hidden", "true", 1, "stat-card__mark", "stat-card__mark--active"], ["aria-hidden", "true", 1, "stat-card__mark", "stat-card__mark--draft"], [1, "mapping-tools"], ["for", "dashboard-mapping-search", 1, "mapping-search"], [1, "visually-hidden"], ["id", "dashboard-mapping-search", "type", "search", "placeholder", "Mapping ad\u0131, kurum, a\u00E7\u0131klama veya durum ara...", 3, "input", "value"], ["for", "dashboard-pattern-filter", 1, "pattern-filter"], ["id", "dashboard-pattern-filter", 3, "change", "value"], ["value", "all"], ["value", "maas"], ["value", "tos"], ["value", "vergi_mtv"], ["value", "vergi_gumruk"], ["value", "vergi_toplu"], [1, "dashboard-state"], [1, "dashboard-state", "dashboard-state--error"], [1, "mapping-table-wrap"], [1, "mapping-table"], [4, "ngFor", "ngForOf"], [1, "mapping-name", 3, "routerLink"], ["aria-hidden", "true", 1, "mapping-name__icon"], [4, "ngIf"], ["class", "institution-name", 4, "ngIf", "ngIfElse"], [1, "status-badge"], [1, "row-actions"], [1, "row-action", "row-action--edit", 3, "routerLink"], ["type", "button", 1, "row-action", "row-action--delete", 3, "click", "disabled"], [1, "institution-name"], [1, "institution-empty"], [1, "mapping-list-footer"], ["aria-label", "Mapping sayfalar\u0131", 1, "pagination"], ["type", "button", 1, "pagination__button", "pagination__button--wide", 3, "click", "disabled"], [1, "pagination__numbers"], ["class", "pagination__button", "type", "button", 3, "pagination__button--active", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "pagination__button", 3, "click"]], template: function DashboardPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "main", 1)(1, "section", 2)(2, "header", 3)(3, "p", 4);
            i0.ɵɵtext(4, "MAPPING STUDIO");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1", 5);
            i0.ɵɵtext(6, "Mapping s\u00FCre\u00E7lerinizi tek noktadan y\u00F6netin.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p");
            i0.ɵɵtext(8, "Yeni bir \u00E7al\u0131\u015Fma ba\u015Flat\u0131n veya son mapping kay\u0131tlar\u0131n\u0131za kald\u0131\u011F\u0131n\u0131z yerden devam edin.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "a", 6)(10, "span", 7);
            i0.ɵɵtext(11, "+");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "span", 8)(13, "strong");
            i0.ɵɵtext(14, "Yeni Mapping Olu\u015Ftur");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span");
            i0.ɵɵtext(16, "Kaynak dosyan\u0131z\u0131 ekleyin, hedef yap\u0131y\u0131 tan\u0131mlay\u0131n ve e\u015Flemeye ba\u015Flay\u0131n.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "span", 9);
            i0.ɵɵtext(18, "\u2192");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "section", 10)(20, "div", 11)(21, "div")(22, "p");
            i0.ɵɵtext(23, "\u00C7ALI\u015EMA ALANI");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "h2", 12);
            i0.ɵɵtext(25, "Mappings");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(26, "span", 13);
            i0.ɵɵtext(27);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(28, DashboardPageComponent_div_28_Template, 21, 2, "div", 14)(29, DashboardPageComponent_p_29_Template, 2, 0, "p", 15)(30, DashboardPageComponent_p_30_Template, 2, 1, "p", 16)(31, DashboardPageComponent_div_31_Template, 5, 0, "div", 15)(32, DashboardPageComponent_div_32_Template, 3, 0, "div", 15)(33, DashboardPageComponent_div_33_Template, 17, 1, "div", 17)(34, DashboardPageComponent_div_34_Template, 10, 6, "div", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "section", 19)(36, "article", 20);
            i0.ɵɵelement(37, "span", 21);
            i0.ɵɵelementStart(38, "span")(39, "small");
            i0.ɵɵtext(40, "Toplam Mapping");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "strong");
            i0.ɵɵtext(42);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(43, "article", 20);
            i0.ɵɵelement(44, "span", 22);
            i0.ɵɵelementStart(45, "span")(46, "small");
            i0.ɵɵtext(47, "Tamamlanan Mapping");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "strong");
            i0.ɵɵtext(49);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(50, "article", 20);
            i0.ɵɵelement(51, "span", 23);
            i0.ɵɵelementStart(52, "span")(53, "small");
            i0.ɵɵtext(54, "Devam Eden Mapping");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "strong");
            i0.ɵɵtext(56);
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(27);
            i0.ɵɵtextInterpolate1("", ctx.totalMappings, " mapping");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.mappings.length > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.errorMessage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && !ctx.errorMessage && ctx.mappings.length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && !ctx.errorMessage && ctx.mappings.length > 0 && ctx.filteredMappings.length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.filteredMappings.length > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.filteredMappings.length > 0);
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.totalMappings);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.activeMappings);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.draftMappings);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, RouterLink, i1.DatePipe], styles: [".dashboard-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  padding: 76px 24px 48px;\n}\n\n.dashboard-shell[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 24px;\n  width: min(1120px, 100%);\n  margin: 0 auto;\n}\n\n.dashboard-header[_ngcontent-%COMP%] {\n  max-width: 760px;\n  padding-right: 180px;\n}\n\n.dashboard-header__eyebrow[_ngcontent-%COMP%], \n.section-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-size: .76rem;\n  font-weight: 850;\n  letter-spacing: .16em;\n}\n\n.dashboard-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  max-width: 720px;\n  margin: 0;\n  font-size: clamp(1.8rem, 3.7vw, 3.25rem);\n  font-weight: 900;\n  letter-spacing: -.045em;\n  line-height: 1.05;\n}\n\n.dashboard-header[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:last-child {\n  max-width: 640px;\n  margin: 18px 0 0;\n  font-size: 1.05rem;\n  font-weight: 600;\n  line-height: 1.6;\n}\n\n.create-card[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  gap: 20px;\n  align-items: center;\n  border: 2px solid #000;\n  border-radius: 18px;\n  background: #000;\n  color: #fff !important;\n  padding: 24px 28px;\n  text-decoration: none;\n  box-shadow: 8px 8px 0 rgb(255 255 255 / 72%);\n  transition: transform 160ms ease, box-shadow 160ms ease;\n}\n\n.create-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 12px 12px 0 rgb(255 255 255 / 78%);\n  transform: translate(-2px, -2px);\n}\n\n.create-card[_ngcontent-%COMP%]   *[_ngcontent-%COMP%] {\n  color: #fff !important;\n}\n\n.create-card__icon[_ngcontent-%COMP%] {\n  display: grid;\n  width: 56px;\n  height: 56px;\n  place-items: center;\n  border-radius: 14px;\n  background: #fcbd00;\n  color: #000 !important;\n  font-size: 2rem;\n  font-weight: 400;\n}\n\n.create-card__content[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 5px;\n}\n\n.create-card__content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n\n.create-card__content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #d1d5db !important;\n  line-height: 1.45;\n}\n\n.create-card__arrow[_ngcontent-%COMP%] {\n  font-size: 1.8rem;\n}\n\n.recent-work[_ngcontent-%COMP%] {\n  overflow: hidden;\n  border: 2px solid #000;\n  border-radius: 18px;\n  background: rgb(255 255 255 / 94%);\n  box-shadow: 0 16px 40px rgb(0 0 0 / 12%);\n}\n\n.section-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 20px;\n  border-bottom: 2px solid #000;\n  padding: 22px 26px 18px;\n}\n\n.section-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.55rem;\n}\n\n.section-heading__count[_ngcontent-%COMP%] {\n  border: 1px solid #000;\n  border-radius: 999px;\n  background: #ffd166;\n  font-size: .82rem;\n  font-weight: 800;\n  padding: 7px 11px;\n}\n\n.show-all-action[_ngcontent-%COMP%] {\n  border: 1px solid #000;\n  border-radius: 999px;\n  background: #000;\n  color: #fff !important;\n  cursor: pointer;\n  font-size: .82rem;\n  font-weight: 800;\n  padding: 7px 12px;\n}\n\n.mapping-tools[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(220px, 300px);\n  gap: 14px;\n  border-bottom: 1px solid #d6d2c8;\n  background: #fffdf7;\n  padding: 16px 24px;\n}\n\n.mapping-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.pattern-filter[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 44px;\n  border: 1px solid #000;\n  border-radius: 9px;\n  background: #fff;\n  padding: 10px 13px;\n}\n\n.mapping-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.pattern-filter[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 3px rgb(252 189 0 / 24%);\n  outline: none;\n}\n\n.pattern-filter[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr);\n  gap: 10px;\n  align-items: center;\n}\n\n.pattern-filter[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: .8rem;\n  font-weight: 800;\n}\n\n.mapping-list-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 14px;\n  border-top: 1px solid #d6d2c8;\n  padding: 14px 24px;\n}\n\n.mapping-list-footer[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: .82rem;\n  font-weight: 750;\n}\n\n.pagination[_ngcontent-%COMP%] {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  gap: 7px;\n}\n\n.pagination__numbers[_ngcontent-%COMP%] {\n  display: flex;\n  max-width: 430px;\n  gap: 5px;\n  overflow-x: auto;\n  padding: 3px;\n}\n\n.pagination__button[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 36px;\n  height: 36px;\n  flex: 0 0 auto;\n  place-items: center;\n  border: 1px solid #000;\n  border-radius: 8px;\n  background: #fff;\n  cursor: pointer;\n  font-size: .82rem;\n  font-weight: 800;\n  padding: 0 9px;\n}\n\n.pagination__button--wide[_ngcontent-%COMP%] {\n  min-width: 68px;\n}\n\n.pagination__button[_ngcontent-%COMP%]:hover:not(:disabled), \n.pagination__button--active[_ngcontent-%COMP%] {\n  background: #fcbd00;\n}\n\n.pagination__button--active[_ngcontent-%COMP%] {\n  box-shadow: inset 0 0 0 1px #000;\n}\n\n.pagination__button[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: .4;\n}\n\n.show-all-action[_ngcontent-%COMP%]:hover {\n  background: #fcbd00;\n  color: #000 !important;\n}\n\n.institution-name[_ngcontent-%COMP%] {\n  display: inline-flex;\n  border: 1px solid #000;\n  border-radius: 999px;\n  background: #fcbd00;\n  color: #000;\n  font-size: .78rem;\n  font-weight: 800;\n  padding: 5px 9px;\n}\n\n.institution-empty[_ngcontent-%COMP%] {\n  color: #7b8491;\n}\n\n.mapping-table-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n\n.mapping-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  text-align: left;\n}\n\n.mapping-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #f4f1e8;\n  font-size: .75rem;\n  letter-spacing: .08em;\n  padding: 13px 24px;\n  text-transform: uppercase;\n}\n\n.mapping-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  border-top: 1px solid #dedbd2;\n  padding: 16px 24px;\n  vertical-align: middle;\n}\n\n.mapping-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #fff8df;\n}\n\n.mapping-name[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  min-width: 230px;\n  text-decoration: none;\n}\n\n.mapping-name__icon[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 38px;\n  flex: 0 0 auto;\n  border: 2px solid #000;\n  border-radius: 3px;\n  background: #fcbd00;\n}\n\n.mapping-name[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n  display: grid;\n  gap: 3px;\n}\n\n.mapping-name[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  overflow: hidden;\n  max-width: 390px;\n  color: #5b6470 !important;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  border: 1px solid #8b6914;\n  border-radius: 999px;\n  background: #fff2bd;\n  font-size: .8rem;\n  font-weight: 800;\n  padding: 6px 10px;\n}\n\n.status-badge[_ngcontent-%COMP%]::before {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: #bd7b00;\n  content: '';\n}\n\n.status-badge--completed[_ngcontent-%COMP%] {\n  border-color: #9f3028;\n  background: #f7d9d5;\n}\n\n.status-badge--completed[_ngcontent-%COMP%]::before {\n  background: #c43c32;\n}\n\n.status-badge--in-progress[_ngcontent-%COMP%] {\n  border-color: #8b6914;\n  background: #fff2bd;\n}\n\n.status-badge--in-progress[_ngcontent-%COMP%]::before {\n  background: #bd7b00;\n}\n\n.row-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n\n.row-action[_ngcontent-%COMP%] {\n  min-height: 36px;\n  border: 1px solid #000;\n  border-radius: 8px;\n  background: #fff;\n  cursor: pointer;\n  font-size: .82rem;\n  font-weight: 800;\n  padding: 8px 11px;\n  text-decoration: none;\n}\n\n.row-action--edit[_ngcontent-%COMP%]:hover {\n  background: #fcbd00;\n}\n\n.row-action--delete[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #000;\n  color: #fff !important;\n}\n\n.row-action[_ngcontent-%COMP%]:disabled {\n  cursor: wait;\n  opacity: .55;\n}\n\n.dashboard-state[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 6px;\n  margin: 0;\n  padding: 32px 26px;\n}\n\n.dashboard-state--error[_ngcontent-%COMP%] {\n  color: #a1160a !important;\n}\n\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 16px;\n}\n\n.stat-card[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n  border: 2px solid #000;\n  border-radius: 14px;\n  background: rgb(255 255 255 / 91%);\n  padding: 18px 20px;\n}\n\n.stat-card__mark[_ngcontent-%COMP%] {\n  width: 13px;\n  height: 50px;\n  border: 2px solid #000;\n  border-radius: 4px;\n  background: #000;\n}\n\n.stat-card__mark--active[_ngcontent-%COMP%] {\n  background: #c43c32;\n}\n\n.stat-card__mark--draft[_ngcontent-%COMP%] {\n  background: #fcbd00;\n}\n\n.stat-card[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n  display: grid;\n  gap: 2px;\n}\n\n.stat-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-weight: 750;\n}\n\n.stat-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.8rem;\n  line-height: 1;\n}\n\n.visually-hidden[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0 0 0 0);\n  white-space: nowrap;\n}\n\n@media (max-width: 760px) {\n  .dashboard-page[_ngcontent-%COMP%] {\n    padding: 94px 16px 32px;\n  }\n\n  .dashboard-header[_ngcontent-%COMP%] {\n    padding-right: 0;\n  }\n\n  .create-card[_ngcontent-%COMP%] {\n    grid-template-columns: auto minmax(0, 1fr);\n    padding: 20px;\n  }\n\n  .create-card__arrow[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 520px) {\n  .create-card__icon[_ngcontent-%COMP%] {\n    width: 44px;\n    height: 44px;\n  }\n\n  .section-heading[_ngcontent-%COMP%] {\n    align-items: start;\n    flex-direction: column;\n  }\n\n  .mapping-tools[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    padding-right: 14px;\n    padding-left: 14px;\n  }\n\n  .pattern-filter[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 6px;\n  }\n\n  .mapping-list-footer[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .pagination[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .pagination__numbers[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n\n  .mapping-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n   .mapping-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding-right: 14px;\n    padding-left: 14px;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardPageComponent, [{
        type: Component,
        args: [{ selector: 'app-dashboard-page', standalone: true, imports: [CommonModule, RouterLink], template: "<main class=\"dashboard-page\">\n  <section class=\"dashboard-shell\" aria-labelledby=\"dashboard-title\">\n    <header class=\"dashboard-header\">\n      <p class=\"dashboard-header__eyebrow\">MAPPING STUDIO</p>\n      <h1 id=\"dashboard-title\">Mapping s\u00FCre\u00E7lerinizi tek noktadan y\u00F6netin.</h1>\n      <p>Yeni bir \u00E7al\u0131\u015Fma ba\u015Flat\u0131n veya son mapping kay\u0131tlar\u0131n\u0131za kald\u0131\u011F\u0131n\u0131z yerden devam edin.</p>\n    </header>\n\n    <a class=\"create-card\" routerLink=\"/mappings/create\">\n      <span class=\"create-card__icon\" aria-hidden=\"true\">+</span>\n      <span class=\"create-card__content\">\n        <strong>Yeni Mapping Olu\u015Ftur</strong>\n        <span>Kaynak dosyan\u0131z\u0131 ekleyin, hedef yap\u0131y\u0131 tan\u0131mlay\u0131n ve e\u015Flemeye ba\u015Flay\u0131n.</span>\n      </span>\n      <span class=\"create-card__arrow\" aria-hidden=\"true\">\u2192</span>\n    </a>\n\n    <section class=\"recent-work\" aria-labelledby=\"recent-work-title\">\n      <div class=\"section-heading\">\n        <div>\n          <p>\u00C7ALI\u015EMA ALANI</p>\n          <h2 id=\"recent-work-title\">Mappings</h2>\n        </div>\n        <span class=\"section-heading__count\">{{ totalMappings }} mapping</span>\n      </div>\n\n      <div class=\"mapping-tools\" *ngIf=\"!isLoading && mappings.length > 0\">\n        <label class=\"mapping-search\" for=\"dashboard-mapping-search\">\n          <span class=\"visually-hidden\">Mappinglerde ara</span>\n          <input\n            id=\"dashboard-mapping-search\"\n            type=\"search\"\n            placeholder=\"Mapping ad\u0131, kurum, a\u00E7\u0131klama veya durum ara...\"\n            [value]=\"mappingSearchTerm\"\n            (input)=\"updateMappingSearchTerm($event)\"\n          >\n        </label>\n        <label class=\"pattern-filter\" for=\"dashboard-pattern-filter\">\n          <span>Dosya Deseni</span>\n          <select\n            id=\"dashboard-pattern-filter\"\n            [value]=\"selectedPatternFilter\"\n            (change)=\"updatePatternFilter($event)\"\n          >\n            <option value=\"all\">T\u00FCm\u00FC</option>\n            <option value=\"maas\">Maa\u015F</option>\n            <option value=\"tos\">T\u00D6S</option>\n            <option value=\"vergi_mtv\">MTV</option>\n            <option value=\"vergi_gumruk\">G\u00FCmr\u00FCk Vergisi</option>\n            <option value=\"vergi_toplu\">Toplu Vergi</option>\n          </select>\n        </label>\n      </div>\n\n      <p class=\"dashboard-state\" *ngIf=\"isLoading\">Mapping kay\u0131tlar\u0131 y\u00FCkleniyor...</p>\n      <p class=\"dashboard-state dashboard-state--error\" *ngIf=\"errorMessage\">{{ errorMessage }}</p>\n      <div class=\"dashboard-state\" *ngIf=\"!isLoading && !errorMessage && mappings.length === 0\">\n        <strong>Hen\u00FCz mapping bulunmuyor.</strong>\n        <span>\u0130lk mapping \u00E7al\u0131\u015Fman\u0131z\u0131 olu\u015Fturmak i\u00E7in yukar\u0131daki kart\u0131 kullanabilirsiniz.</span>\n      </div>\n      <div class=\"dashboard-state\" *ngIf=\"!isLoading && !errorMessage && mappings.length > 0 && filteredMappings.length === 0\">\n        <strong>Arama ve filtreye uygun mapping bulunamad\u0131.</strong>\n      </div>\n\n      <div class=\"mapping-table-wrap\" *ngIf=\"!isLoading && filteredMappings.length > 0\">\n        <table class=\"mapping-table\">\n          <thead>\n            <tr>\n              <th>Mapping Ad\u0131</th>\n              <th>Kurum</th>\n              <th>Durum</th>\n              <th>Son G\u00FCncelleme</th>\n              <th><span class=\"visually-hidden\">\u0130\u015Flemler</span></th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr *ngFor=\"let mapping of visibleMappings\">\n              <td>\n                <a class=\"mapping-name\" [routerLink]=\"['/mappings', mapping.id, 'edit']\">\n                  <span class=\"mapping-name__icon\" aria-hidden=\"true\"></span>\n                  <span>\n                    <strong>{{ mapping.name }}</strong>\n                    <small *ngIf=\"mapping.description\">{{ mapping.description }}</small>\n                  </span>\n                </a>\n              </td>\n              <td>\n                <span class=\"institution-name\" *ngIf=\"mapping.institution; else noInstitution\">\n                  {{ mapping.institution }}\n                </span>\n                <ng-template #noInstitution><span class=\"institution-empty\">\u2014</span></ng-template>\n              </td>\n              <td>\n                <span\n                  class=\"status-badge\"\n                  [class.status-badge--in-progress]=\"mapping.status === 'in_progress'\"\n                  [class.status-badge--completed]=\"mapping.status === 'completed'\"\n                >\n                  {{ getStatusLabel(mapping.status) }}\n                </span>\n              </td>\n              <td>{{ mapping.updatedAt | date:'dd.MM.yyyy HH:mm' }}</td>\n              <td>\n                <div class=\"row-actions\">\n                  <a class=\"row-action row-action--edit\" [routerLink]=\"['/mappings', mapping.id, 'edit']\">D\u00FCzenle</a>\n                  <button\n                    class=\"row-action row-action--delete\"\n                    type=\"button\"\n                    [disabled]=\"deletingMappingId === mapping.id\"\n                    (click)=\"deleteMapping(mapping)\"\n                  >\n                    {{ deletingMappingId === mapping.id ? 'Siliniyor' : 'Sil' }}\n                  </button>\n                </div>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n      <div class=\"mapping-list-footer\" *ngIf=\"!isLoading && filteredMappings.length > 0\">\n        <span>{{ firstVisibleMappingNumber }}\u2013{{ lastVisibleMappingNumber }} / {{ filteredMappings.length }} g\u00F6steriliyor</span>\n        <nav class=\"pagination\" aria-label=\"Mapping sayfalar\u0131\">\n          <button\n            class=\"pagination__button pagination__button--wide\"\n            type=\"button\"\n            [disabled]=\"currentPage === 1\"\n            (click)=\"goToPage(currentPage - 1)\"\n          >\n            \u00D6nceki\n          </button>\n          <div class=\"pagination__numbers\">\n            <button\n              class=\"pagination__button\"\n              type=\"button\"\n              *ngFor=\"let page of pageNumbers\"\n              [class.pagination__button--active]=\"page === currentPage\"\n              [attr.aria-current]=\"page === currentPage ? 'page' : null\"\n              (click)=\"goToPage(page)\"\n            >\n              {{ page }}\n            </button>\n          </div>\n          <button\n            class=\"pagination__button pagination__button--wide\"\n            type=\"button\"\n            [disabled]=\"currentPage === totalPages\"\n            (click)=\"goToPage(currentPage + 1)\"\n          >\n            Sonraki\n          </button>\n        </nav>\n      </div>\n    </section>\n\n    <section class=\"stats-grid\" aria-label=\"Mapping istatistikleri\">\n      <article class=\"stat-card\">\n        <span class=\"stat-card__mark\" aria-hidden=\"true\"></span>\n        <span><small>Toplam Mapping</small><strong>{{ totalMappings }}</strong></span>\n      </article>\n      <article class=\"stat-card\">\n        <span class=\"stat-card__mark stat-card__mark--active\" aria-hidden=\"true\"></span>\n        <span><small>Tamamlanan Mapping</small><strong>{{ activeMappings }}</strong></span>\n      </article>\n      <article class=\"stat-card\">\n        <span class=\"stat-card__mark stat-card__mark--draft\" aria-hidden=\"true\"></span>\n        <span><small>Devam Eden Mapping</small><strong>{{ draftMappings }}</strong></span>\n      </article>\n    </section>\n  </section>\n</main>\n", styles: [".dashboard-page {\n  min-height: 100vh;\n  padding: 76px 24px 48px;\n}\n\n.dashboard-shell {\n  display: grid;\n  gap: 24px;\n  width: min(1120px, 100%);\n  margin: 0 auto;\n}\n\n.dashboard-header {\n  max-width: 760px;\n  padding-right: 180px;\n}\n\n.dashboard-header__eyebrow,\n.section-heading p {\n  margin: 0 0 8px;\n  font-size: .76rem;\n  font-weight: 850;\n  letter-spacing: .16em;\n}\n\n.dashboard-header h1 {\n  max-width: 720px;\n  margin: 0;\n  font-size: clamp(1.8rem, 3.7vw, 3.25rem);\n  font-weight: 900;\n  letter-spacing: -.045em;\n  line-height: 1.05;\n}\n\n.dashboard-header > p:last-child {\n  max-width: 640px;\n  margin: 18px 0 0;\n  font-size: 1.05rem;\n  font-weight: 600;\n  line-height: 1.6;\n}\n\n.create-card {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  gap: 20px;\n  align-items: center;\n  border: 2px solid #000;\n  border-radius: 18px;\n  background: #000;\n  color: #fff !important;\n  padding: 24px 28px;\n  text-decoration: none;\n  box-shadow: 8px 8px 0 rgb(255 255 255 / 72%);\n  transition: transform 160ms ease, box-shadow 160ms ease;\n}\n\n.create-card:hover {\n  box-shadow: 12px 12px 0 rgb(255 255 255 / 78%);\n  transform: translate(-2px, -2px);\n}\n\n.create-card * {\n  color: #fff !important;\n}\n\n.create-card__icon {\n  display: grid;\n  width: 56px;\n  height: 56px;\n  place-items: center;\n  border-radius: 14px;\n  background: #fcbd00;\n  color: #000 !important;\n  font-size: 2rem;\n  font-weight: 400;\n}\n\n.create-card__content {\n  display: grid;\n  gap: 5px;\n}\n\n.create-card__content strong {\n  font-size: 1.2rem;\n}\n\n.create-card__content span {\n  color: #d1d5db !important;\n  line-height: 1.45;\n}\n\n.create-card__arrow {\n  font-size: 1.8rem;\n}\n\n.recent-work {\n  overflow: hidden;\n  border: 2px solid #000;\n  border-radius: 18px;\n  background: rgb(255 255 255 / 94%);\n  box-shadow: 0 16px 40px rgb(0 0 0 / 12%);\n}\n\n.section-heading {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 20px;\n  border-bottom: 2px solid #000;\n  padding: 22px 26px 18px;\n}\n\n.section-heading h2 {\n  margin: 0;\n  font-size: 1.55rem;\n}\n\n.section-heading__count {\n  border: 1px solid #000;\n  border-radius: 999px;\n  background: #ffd166;\n  font-size: .82rem;\n  font-weight: 800;\n  padding: 7px 11px;\n}\n\n.show-all-action {\n  border: 1px solid #000;\n  border-radius: 999px;\n  background: #000;\n  color: #fff !important;\n  cursor: pointer;\n  font-size: .82rem;\n  font-weight: 800;\n  padding: 7px 12px;\n}\n\n.mapping-tools {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(220px, 300px);\n  gap: 14px;\n  border-bottom: 1px solid #d6d2c8;\n  background: #fffdf7;\n  padding: 16px 24px;\n}\n\n.mapping-search input,\n.pattern-filter select {\n  width: 100%;\n  min-height: 44px;\n  border: 1px solid #000;\n  border-radius: 9px;\n  background: #fff;\n  padding: 10px 13px;\n}\n\n.mapping-search input:focus,\n.pattern-filter select:focus {\n  box-shadow: 0 0 0 3px rgb(252 189 0 / 24%);\n  outline: none;\n}\n\n.pattern-filter {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr);\n  gap: 10px;\n  align-items: center;\n}\n\n.pattern-filter span {\n  font-size: .8rem;\n  font-weight: 800;\n}\n\n.mapping-list-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 14px;\n  border-top: 1px solid #d6d2c8;\n  padding: 14px 24px;\n}\n\n.mapping-list-footer > span {\n  font-size: .82rem;\n  font-weight: 750;\n}\n\n.pagination {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  gap: 7px;\n}\n\n.pagination__numbers {\n  display: flex;\n  max-width: 430px;\n  gap: 5px;\n  overflow-x: auto;\n  padding: 3px;\n}\n\n.pagination__button {\n  display: grid;\n  min-width: 36px;\n  height: 36px;\n  flex: 0 0 auto;\n  place-items: center;\n  border: 1px solid #000;\n  border-radius: 8px;\n  background: #fff;\n  cursor: pointer;\n  font-size: .82rem;\n  font-weight: 800;\n  padding: 0 9px;\n}\n\n.pagination__button--wide {\n  min-width: 68px;\n}\n\n.pagination__button:hover:not(:disabled),\n.pagination__button--active {\n  background: #fcbd00;\n}\n\n.pagination__button--active {\n  box-shadow: inset 0 0 0 1px #000;\n}\n\n.pagination__button:disabled {\n  cursor: not-allowed;\n  opacity: .4;\n}\n\n.show-all-action:hover {\n  background: #fcbd00;\n  color: #000 !important;\n}\n\n.institution-name {\n  display: inline-flex;\n  border: 1px solid #000;\n  border-radius: 999px;\n  background: #fcbd00;\n  color: #000;\n  font-size: .78rem;\n  font-weight: 800;\n  padding: 5px 9px;\n}\n\n.institution-empty {\n  color: #7b8491;\n}\n\n.mapping-table-wrap {\n  overflow-x: auto;\n}\n\n.mapping-table {\n  width: 100%;\n  border-collapse: collapse;\n  text-align: left;\n}\n\n.mapping-table th {\n  background: #f4f1e8;\n  font-size: .75rem;\n  letter-spacing: .08em;\n  padding: 13px 24px;\n  text-transform: uppercase;\n}\n\n.mapping-table td {\n  border-top: 1px solid #dedbd2;\n  padding: 16px 24px;\n  vertical-align: middle;\n}\n\n.mapping-table tbody tr:hover {\n  background: #fff8df;\n}\n\n.mapping-name {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  min-width: 230px;\n  text-decoration: none;\n}\n\n.mapping-name__icon {\n  width: 12px;\n  height: 38px;\n  flex: 0 0 auto;\n  border: 2px solid #000;\n  border-radius: 3px;\n  background: #fcbd00;\n}\n\n.mapping-name > span:last-child {\n  display: grid;\n  gap: 3px;\n}\n\n.mapping-name small {\n  overflow: hidden;\n  max-width: 390px;\n  color: #5b6470 !important;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.status-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  border: 1px solid #8b6914;\n  border-radius: 999px;\n  background: #fff2bd;\n  font-size: .8rem;\n  font-weight: 800;\n  padding: 6px 10px;\n}\n\n.status-badge::before {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: #bd7b00;\n  content: '';\n}\n\n.status-badge--completed {\n  border-color: #9f3028;\n  background: #f7d9d5;\n}\n\n.status-badge--completed::before {\n  background: #c43c32;\n}\n\n.status-badge--in-progress {\n  border-color: #8b6914;\n  background: #fff2bd;\n}\n\n.status-badge--in-progress::before {\n  background: #bd7b00;\n}\n\n.row-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n\n.row-action {\n  min-height: 36px;\n  border: 1px solid #000;\n  border-radius: 8px;\n  background: #fff;\n  cursor: pointer;\n  font-size: .82rem;\n  font-weight: 800;\n  padding: 8px 11px;\n  text-decoration: none;\n}\n\n.row-action--edit:hover {\n  background: #fcbd00;\n}\n\n.row-action--delete:hover:not(:disabled) {\n  background: #000;\n  color: #fff !important;\n}\n\n.row-action:disabled {\n  cursor: wait;\n  opacity: .55;\n}\n\n.dashboard-state {\n  display: grid;\n  gap: 6px;\n  margin: 0;\n  padding: 32px 26px;\n}\n\n.dashboard-state--error {\n  color: #a1160a !important;\n}\n\n.stats-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 16px;\n}\n\n.stat-card {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n  border: 2px solid #000;\n  border-radius: 14px;\n  background: rgb(255 255 255 / 91%);\n  padding: 18px 20px;\n}\n\n.stat-card__mark {\n  width: 13px;\n  height: 50px;\n  border: 2px solid #000;\n  border-radius: 4px;\n  background: #000;\n}\n\n.stat-card__mark--active {\n  background: #c43c32;\n}\n\n.stat-card__mark--draft {\n  background: #fcbd00;\n}\n\n.stat-card > span:last-child {\n  display: grid;\n  gap: 2px;\n}\n\n.stat-card small {\n  font-weight: 750;\n}\n\n.stat-card strong {\n  font-size: 1.8rem;\n  line-height: 1;\n}\n\n.visually-hidden {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0 0 0 0);\n  white-space: nowrap;\n}\n\n@media (max-width: 760px) {\n  .dashboard-page {\n    padding: 94px 16px 32px;\n  }\n\n  .dashboard-header {\n    padding-right: 0;\n  }\n\n  .create-card {\n    grid-template-columns: auto minmax(0, 1fr);\n    padding: 20px;\n  }\n\n  .create-card__arrow {\n    display: none;\n  }\n\n  .stats-grid {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 520px) {\n  .create-card__icon {\n    width: 44px;\n    height: 44px;\n  }\n\n  .section-heading {\n    align-items: start;\n    flex-direction: column;\n  }\n\n  .mapping-tools {\n    grid-template-columns: 1fr;\n    padding-right: 14px;\n    padding-left: 14px;\n  }\n\n  .pattern-filter {\n    grid-template-columns: 1fr;\n    gap: 6px;\n  }\n\n  .mapping-list-footer {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .pagination {\n    width: 100%;\n  }\n\n  .pagination__numbers {\n    flex: 1;\n  }\n\n  .mapping-table th,\n  .mapping-table td {\n    padding-right: 14px;\n    padding-left: 14px;\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DashboardPageComponent, { className: "DashboardPageComponent", filePath: "src/app/features/dashboard/dashboard-page.component.ts", lineNumber: 17 }); })();
//# sourceMappingURL=dashboard-page.component.js.map