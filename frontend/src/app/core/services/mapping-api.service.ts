import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AiMappingSuggestionRequest,
  AiMappingSuggestionResponse,
  MappingCreateRequest,
  MappingCreateResponse,
  MappingDetailsResponse,
  MappingPatternType,
  MappingUpdateRequest,
  SaveMappingsRequest,
  SaveMappingsResponse,
  SaveSourceSchemaRequest,
  SaveSourceSchemaResponse,
  SaveTargetSchemaRequest,
  SaveTargetSchemaResponse,
  TestMappingRequest,
  TestMappingResponse
} from '../models/mapping.models';

@Injectable({
  providedIn: 'root'
})
export class MappingApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/mappings';

  createMapping(request: MappingCreateRequest): Observable<MappingCreateResponse> {
    return this.http.post<MappingCreateResponse>(this.baseUrl, request);
  }

  getMappings(patternType?: MappingPatternType): Observable<MappingDetailsResponse[]> {
    const url = patternType
      ? `${this.baseUrl}?patternType=${encodeURIComponent(patternType)}`
      : this.baseUrl;
    return this.http.get<MappingDetailsResponse[]>(url);
  }

  getMappingById(id: string): Observable<MappingDetailsResponse> {
    return this.http.get<MappingDetailsResponse>(`${this.baseUrl}/${encodeURIComponent(id)}`);
  }

  updateMapping(id: string, request: MappingUpdateRequest): Observable<MappingDetailsResponse> {
    return this.http.put<MappingDetailsResponse>(`${this.baseUrl}/${encodeURIComponent(id)}`, request);
  }

  deleteMapping(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${encodeURIComponent(id)}`);
  }

  saveSourceSchema(id: string, request: SaveSourceSchemaRequest): Observable<SaveSourceSchemaResponse> {
    return this.http.put<SaveSourceSchemaResponse>(`${this.baseUrl}/${encodeURIComponent(id)}/source`, request);
  }

  saveTargetSchema(id: string, request: SaveTargetSchemaRequest): Observable<SaveTargetSchemaResponse> {
    return this.http.put<SaveTargetSchemaResponse>(`${this.baseUrl}/${encodeURIComponent(id)}/target`, request);
  }

  saveMappings(id: string, request: SaveMappingsRequest): Observable<SaveMappingsResponse> {
    return this.http.put<SaveMappingsResponse>(`${this.baseUrl}/${encodeURIComponent(id)}/mappings`, request);
  }

  testMapping(id: string, request: TestMappingRequest): Observable<TestMappingResponse> {
    return this.http.post<TestMappingResponse>(`${this.baseUrl}/${encodeURIComponent(id)}/test`, request);
  }

  suggestMappingsWithAi(request: AiMappingSuggestionRequest): Observable<AiMappingSuggestionResponse> {
    return this.http.post<AiMappingSuggestionResponse>(`${this.baseUrl}/ai-suggest`, request);
  }
}
