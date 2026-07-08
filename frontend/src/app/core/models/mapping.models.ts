export type MappingSourceType = 'file' | 'excel' | 'txt' | 'json' | 'xml' | 'api' | 'database' | 'manual';
export type MappingTargetType = 'json' | 'xml' | 'api' | 'database' | 'file';
export type MappingStatus = 'draft' | 'completed';
export type SourceFieldType = 'text' | 'number' | 'date' | 'boolean' | 'object' | 'array';
export type MappingTransformType = 'direct' | 'concat' | 'constant' | 'dateFormat' | 'uppercase' | 'lowercase' | 'trim';
export type TargetFieldAlign = 'left' | 'right';

export interface MappingCreateRequest {
  name: string;
  description?: string;
  sourceType: MappingSourceType;
  targetType: MappingTargetType;
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
  sourceType: MappingSourceType;
  targetType: MappingTargetType;
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
}

export interface SaveMappingsResponse {
  id: string;
  mappings: MappingDefinition[];
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
