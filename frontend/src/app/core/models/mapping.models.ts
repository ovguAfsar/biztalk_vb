export type MappingSourceType = 'file' | 'excel' | 'txt' | 'json' | 'xml' | 'api' | 'database' | 'manual';
export type MappingTargetType = 'json' | 'xml' | 'api' | 'database' | 'file';
export type MappingStatus = 'draft' | 'in_progress' | 'completed';
export type MappingPatternType = 'maas' | 'tos' | 'mtv' | 'vergi_mtv' | 'vergi_gumruk' | 'vergi_toplu';
export type SourceFieldType = 'text' | 'number' | 'date' | 'boolean' | 'object' | 'array';
export type MappingTransformType = 'direct' | 'concat' | 'constant' | 'dateFormat' | 'uppercase' | 'lowercase' | 'trim';
export type TargetFieldAlign = 'left' | 'right';

export interface MappingCreateRequest {
  name: string;
  description?: string;
  institution?: string;
  templateMappingId?: string;
  sourceType: MappingSourceType;
  targetType: MappingTargetType;
  patternType?: MappingPatternType;
  patternSettings?: PatternSettings;
}

export interface MappingUpdateRequest extends MappingCreateRequest {
  status?: MappingStatus;
}

export interface SourceField {
  name: string;
  displayName?: string;
  type: SourceFieldType;
  required: boolean;
  sampleValue?: string;
  startPosition?: number;
  endPosition?: number;
  length?: number;
}

export interface TargetField {
  name: string;
  displayName?: string;
  type: SourceFieldType;
  required: boolean;
  sampleValue?: string;
  length?: number;
  startPosition?: number;
  format?: string;
  align?: TargetFieldAlign;
  padChar?: string;
  fixedValue?: string;
  requiredForOutput?: boolean;
}

export interface PatternSettings {
  mtvHeader?: MtvHeaderSettings;
  tosHeader?: TosHeaderSettings;
}

export interface MtvHeaderSettings {
  subeKodu?: string;
  kurumKodu?: string;
  dosyaTarihi?: string;
  kurumHesapNo?: string;
}

export interface TosHeaderSettings {
  subeKodu?: string;
  kurumKodu?: string;
  dosyaTarihi?: string;
  kurumHesapNo?: string;
}

export interface SourceSchemaDetails {
  sourceName: string;
  fields: SourceField[];
  records?: Record<string, string>[];
}

export interface TargetSchemaDetails {
  targetName: string;
  fields: TargetField[];
}

export interface MappingDefinition {
  sourceField: string;
  targetField: string;
  transformType: MappingTransformType;
}

export interface MappingCreateResponse {
  id: string;
  name: string;
  description?: string;
  institution?: string;
  sourceType: MappingSourceType;
  targetType: MappingTargetType;
  patternType: MappingPatternType;
  patternSettings?: PatternSettings;
  status: MappingStatus;
  sourceSchema?: SourceSchemaDetails;
  targetSchema?: TargetSchemaDetails;
  mappingDefinitions?: MappingDefinition[];
  createdAt: string;
  updatedAt: string;
}

export interface MappingDetailsResponse extends MappingCreateResponse {}

export interface SaveSourceSchemaRequest {
  sourceName: string;
  sourceType?: MappingSourceType;
  fields: SourceField[];
  records?: Record<string, string>[];
}

export interface SaveSourceSchemaResponse {
  id: string;
  sourceName: string;
  sourceType: MappingSourceType;
  fields: SourceField[];
  records?: Record<string, string>[];
  updatedAt: string;
}

export interface SaveTargetSchemaRequest {
  targetName: string;
  fields: TargetField[];
}

export interface SaveTargetSchemaResponse {
  id: string;
  targetName: string;
  targetType: MappingTargetType;
  fields: TargetField[];
  updatedAt: string;
}

export interface SaveMappingsRequest {
  mappings: MappingDefinition[];
  confirmWarnings?: boolean;
  allowIncomplete?: boolean;
}

export interface SaveMappingsResponse {
  id: string;
  mappings: MappingDefinition[];
  warnings: string[];
  updatedAt: string;
}

export interface TestMappingRequest {
  input: Record<string, unknown> | Record<string, unknown>[];
}

export interface TestMappingResponse {
  id: string;
  output: unknown;
  warnings: string[];
  errors: string[];
}

export interface AiMappingField {
  name: string;
  displayName?: string;
  type: SourceFieldType;
}

export interface AiMappingSuggestionRequest {
  patternType?: MappingPatternType;
  sourceFields: AiMappingField[];
  targetFields: AiMappingField[];
}

export interface AiMappingSuggestion {
  sourceField: string;
  targetField: string;
  confidence?: number;
  reason?: string;
}

export interface AiMappingSuggestionResponse {
  isAvailable: boolean;
  message?: string;
  suggestions: AiMappingSuggestion[];
}
