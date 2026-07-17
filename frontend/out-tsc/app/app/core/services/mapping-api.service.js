import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import * as i0 from "@angular/core";
export class MappingApiService {
    constructor() {
        this.http = inject(HttpClient);
        this.baseUrl = '/api/mappings';
    }
    createMapping(request) {
        return this.http.post(this.baseUrl, request);
    }
    getMappings(patternType) {
        const url = patternType
            ? `${this.baseUrl}?patternType=${encodeURIComponent(patternType)}`
            : this.baseUrl;
        return this.http.get(url);
    }
    getMappingById(id) {
        return this.http.get(`${this.baseUrl}/${encodeURIComponent(id)}`);
    }
    updateMapping(id, request) {
        return this.http.put(`${this.baseUrl}/${encodeURIComponent(id)}`, request);
    }
    deleteMapping(id) {
        return this.http.delete(`${this.baseUrl}/${encodeURIComponent(id)}`);
    }
    saveSourceSchema(id, request) {
        return this.http.put(`${this.baseUrl}/${encodeURIComponent(id)}/source`, request);
    }
    saveTargetSchema(id, request) {
        return this.http.put(`${this.baseUrl}/${encodeURIComponent(id)}/target`, request);
    }
    saveMappings(id, request) {
        return this.http.put(`${this.baseUrl}/${encodeURIComponent(id)}/mappings`, request);
    }
    testMapping(id, request) {
        return this.http.post(`${this.baseUrl}/${encodeURIComponent(id)}/test`, request);
    }
    saveMappingOutput(id, request) {
        return this.http.post(`${this.baseUrl}/${encodeURIComponent(id)}/outputs`, request);
    }
    suggestMappingsWithAi(request) {
        return this.http.post(`${this.baseUrl}/ai-suggest`, request);
    }
    static { this.ɵfac = function MappingApiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MappingApiService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: MappingApiService, factory: MappingApiService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MappingApiService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=mapping-api.service.js.map