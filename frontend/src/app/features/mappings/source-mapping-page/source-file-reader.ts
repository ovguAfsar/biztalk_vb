import { MappingSourceType, SourceFieldType } from '../../../core/models/mapping.models';
import { readExcelColumns } from './excel-column-reader';

export type SourceFileFormat = 'excel' | 'json' | 'xml';

export interface SourceFieldImport {
  displayName: string;
  sampleValue: string;
  sourcePath: string;
  type: SourceFieldType;
}

export interface SourceFileImportResult {
  format: SourceFileFormat;
  fields: SourceFieldImport[];
}

export async function readSourceFile(file: File, expectedSourceType: MappingSourceType): Promise<SourceFileImportResult> {
  const format = detectSourceFileFormat(file.name);

  if (!format) {
    throw new Error('Desteklenen dosya formatları: .xlsx, .csv, .json, .xml');
  }

  validateExpectedFormat(format, expectedSourceType);

  switch (format) {
    case 'excel':
      return {
        format,
        fields: (await readExcelColumns(file)).map(column => ({
          displayName: column.header,
          sampleValue: column.sampleValue,
          sourcePath: column.column,
          type: inferScalarType(column.sampleValue)
        }))
      };
    case 'json':
      return {
        format,
        fields: readJsonFields(await file.text())
      };
    case 'xml':
      return {
        format,
        fields: readXmlFields(await file.text())
      };
  }
}

function detectSourceFileFormat(fileName: string): SourceFileFormat | null {
  const lowerName = fileName.toLowerCase();

  if (lowerName.endsWith('.xlsx') || lowerName.endsWith('.xls') || lowerName.endsWith('.csv')) {
    return 'excel';
  }

  if (lowerName.endsWith('.json')) {
    return 'json';
  }

  if (lowerName.endsWith('.xml')) {
    return 'xml';
  }

  return null;
}

function validateExpectedFormat(format: SourceFileFormat, expectedSourceType: MappingSourceType): void {
  if (expectedSourceType === 'file') {
    return;
  }

  if (expectedSourceType === 'excel' && format !== 'excel') {
    throw new Error('Excel kaynağı için .xlsx veya .csv dosyası seçin.');
  }

  if (expectedSourceType === 'json' && format !== 'json') {
    throw new Error('JSON kaynağı için .json dosyası seçin.');
  }

  if (expectedSourceType === 'xml' && format !== 'xml') {
    throw new Error('XML kaynağı için .xml dosyası seçin.');
  }

  if (!['excel', 'json', 'xml'].includes(expectedSourceType)) {
    throw new Error('Bu kaynak tipi için dosya içe aktarma desteklenmiyor.');
  }
}

function readJsonFields(text: string): SourceFieldImport[] {
  let parsed: unknown;

  try {
    parsed = JSON.parse(text) as unknown;
  } catch {
    throw new Error('JSON dosyası okunamadı. Dosya geçerli JSON formatında olmalıdır.');
  }

  const sample = getJsonSampleObject(parsed);
  const fields = Object.entries(sample.value).map(([key, value]) => ({
    displayName: key,
    sampleValue: stringifySampleValue(value),
    sourcePath: sample.basePath ? `${sample.basePath}.${key}` : key,
    type: inferValueType(value)
  }));

  if (fields.length === 0) {
    throw new Error('JSON dosyasında alan bulunamadı.');
  }

  return fields;
}

function getJsonSampleObject(value: unknown): { value: Record<string, unknown>; basePath: string } {
  if (Array.isArray(value)) {
    const firstObject = value.find(isPlainObject);
    if (firstObject) {
      return { value: firstObject, basePath: '[0]' };
    }
  }

  if (isPlainObject(value)) {
    const entries = Object.entries(value);
    const onlyEntry = entries.length === 1 ? entries[0] : undefined;

    if (onlyEntry && Array.isArray(onlyEntry[1])) {
      const firstObject = onlyEntry[1].find(isPlainObject);
      if (firstObject) {
        return { value: firstObject, basePath: `${onlyEntry[0]}[0]` };
      }
    }

    return { value, basePath: '' };
  }

  throw new Error('JSON dosyası object veya object listesi içermelidir.');
}

function readXmlFields(text: string): SourceFieldImport[] {
  const document = parseXml(text);
  const recordElement = getXmlRecordElement(document.documentElement);
  const fields: SourceFieldImport[] = [];

  for (const attribute of Array.from(recordElement.attributes)) {
    fields.push({
      displayName: attribute.name,
      sampleValue: attribute.value,
      sourcePath: `@${attribute.name}`,
      type: inferScalarType(attribute.value)
    });
  }

  const childGroups = groupElementsByName(getDirectElementChildren(recordElement));
  for (const [name, elements] of childGroups.entries()) {
    const firstElement = elements[0];
    const sampleValue = readXmlElementSampleValue(firstElement);

    fields.push({
      displayName: name,
      sampleValue,
      sourcePath: getXmlElementPath(firstElement),
      type: elements.length > 1 ? 'array' : inferXmlElementType(firstElement)
    });
  }

  if (fields.length === 0) {
    throw new Error('XML dosyasında alan bulunamadı.');
  }

  return fields;
}

function parseXml(text: string): Document {
  const document = new DOMParser().parseFromString(text, 'application/xml');
  const parseError = document.getElementsByTagName('parsererror')[0];

  if (parseError) {
    throw new Error('XML dosyası okunamadı. Dosya geçerli XML formatında olmalıdır.');
  }

  return document;
}

function getXmlRecordElement(root: Element): Element {
  const children = getDirectElementChildren(root);

  if (children.length === 0) {
    return root;
  }

  const firstChild = children[0];
  const allChildrenHaveSameName = children.every(child => child.localName === firstChild.localName);

  if (allChildrenHaveSameName && getDirectElementChildren(firstChild).length > 0) {
    return firstChild;
  }

  if (children.length === 1 && getDirectElementChildren(firstChild).length > 0) {
    return firstChild;
  }

  return root;
}

function groupElementsByName(elements: Element[]): Map<string, Element[]> {
  return elements.reduce((groups, element) => {
    const key = element.localName;
    groups.set(key, [...groups.get(key) ?? [], element]);
    return groups;
  }, new Map<string, Element[]>());
}

function getDirectElementChildren(element: Element): Element[] {
  return Array.from(element.children);
}

function getXmlElementPath(element: Element): string {
  const parts: string[] = [];
  let current: Element | null = element;

  while (current) {
    parts.unshift(current.localName);
    current = current.parentElement;
  }

  return parts.join('.');
}

function inferXmlElementType(element: Element): SourceFieldType {
  if (getDirectElementChildren(element).length > 0) {
    return 'object';
  }

  return inferScalarType(element.textContent?.trim() ?? '');
}

function readXmlElementSampleValue(element: Element): string {
  const children = getDirectElementChildren(element);

  if (children.length === 0) {
    return element.textContent?.trim() ?? '';
  }

  const sampleObject = children.reduce<Record<string, string>>((result, child) => {
    result[child.localName] = child.textContent?.trim() ?? '';
    return result;
  }, {});

  return JSON.stringify(sampleObject);
}

function inferValueType(value: unknown): SourceFieldType {
  if (Array.isArray(value)) {
    return 'array';
  }

  if (value !== null && typeof value === 'object') {
    return 'object';
  }

  return inferScalarType(stringifySampleValue(value));
}

function inferScalarType(value: string): SourceFieldType {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return 'text';
  }

  if (trimmedValue === 'true' || trimmedValue === 'false') {
    return 'boolean';
  }

  if (/^-?\d+(\.\d+)?$/.test(trimmedValue)) {
    return 'number';
  }

  if (/^\d{4}-\d{2}-\d{2}/.test(trimmedValue)) {
    return 'date';
  }

  return 'text';
}

function stringifySampleValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && !Array.isArray(value) && typeof value === 'object';
}
