import { MappingSourceType, SourceFieldType } from '../../../core/models/mapping.models';
import { readExcelColumns } from './excel-column-reader';

export type SourceFileFormat = 'excel' | 'txt';

export interface SourceFieldImport {
  displayName: string;
  sampleValue: string;
  sourcePath: string;
  type: SourceFieldType;
}

export interface SourceFileImportResult {
  format: SourceFileFormat;
  fields: SourceFieldImport[];
  records: Record<string, string>[];
}

export async function readSourceFile(file: File, expectedSourceType: MappingSourceType): Promise<SourceFileImportResult> {
  const format = detectSourceFileFormat(file.name);

  if (!format) {
    throw new Error('Desteklenen dosya formatları: .xlsx, .xls, .csv, .txt');
  }

  validateExpectedFormat(format, expectedSourceType);

  switch (format) {
    case 'excel':
      const excelImport = await readExcelColumns(file);
      return {
        format,
        fields: excelImport.columns.map(column => ({
          displayName: column.header,
          sampleValue: column.sampleValue,
          sourcePath: column.column,
          type: inferScalarType(column.sampleValue)
        })),
        records: excelImport.records
      };
    case 'txt':
      return readTxtFile(await file.text(), format);
  }
}

function detectSourceFileFormat(fileName: string): SourceFileFormat | null {
  const lowerName = fileName.toLowerCase();

  if (lowerName.endsWith('.xlsx') || lowerName.endsWith('.xls') || lowerName.endsWith('.csv')) {
    return 'excel';
  }

  if (lowerName.endsWith('.txt')) {
    return 'txt';
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

  if (expectedSourceType === 'txt' && format !== 'txt') {
    throw new Error('TXT kaynağı için .txt dosyası seçin.');
  }

  if (!['excel', 'txt'].includes(expectedSourceType)) {
    throw new Error('Bu kaynak tipi için dosya içe aktarma desteklenmiyor.');
  }
}

function readTxtFile(text: string, format: SourceFileFormat): SourceFileImportResult {
  const lines = text
    .replace(/^\uFEFF/, '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .filter(line => line.length > 0);

  if (lines.length === 0) {
    throw new Error('TXT dosyasında alan bulunamadı.');
  }

  const keyValueFields = readTxtKeyValueFields(lines);
  if (keyValueFields.length > 0) {
    return {
      format,
      fields: keyValueFields,
      records: [keyValueFields.reduce<Record<string, string>>((record, field) => {
        record[field.sourcePath] = field.sampleValue;
        return record;
      }, {})]
    };
  }

  const delimitedImport = readTxtDelimitedFields(lines);
  if (delimitedImport) {
    return { format, ...delimitedImport };
  }

  return {
    format,
    ...readFixedWidthRawLines(lines)
  };
}

function readFixedWidthRawLines(lines: string[]): { fields: SourceFieldImport[]; records: Record<string, string>[] } {
  return {
    fields: [],
    records: lines.map(line => ({ line }))
  };
}

function readTxtKeyValueFields(lines: string[]): SourceFieldImport[] {
  const pairs = lines
    .map(line => line.match(/^([^:=]+)\s*[:=]\s*(.*)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match));

  if (pairs.length === 0 || pairs.length !== lines.length) {
    return [];
  }

  return pairs.map(pair => ({
    displayName: pair[1].trim(),
    sampleValue: pair[2].trim(),
    sourcePath: pair[1].trim(),
    type: inferScalarType(pair[2].trim())
  }));
}

function readTxtDelimitedFields(lines: string[]): { fields: SourceFieldImport[]; records: Record<string, string>[] } | null {
  const delimiter = detectTxtDelimiter(lines[0]);
  if (!delimiter) {
    return null;
  }

  const headers = splitTxtLine(lines[0], delimiter);
  if (headers.length < 2 || headers.some(header => !header)) {
    return null;
  }

  const sampleValues = lines.length > 1 ? splitTxtLine(lines[1], delimiter) : [];

  return {
    fields: headers.map((header, index) => ({
    displayName: header,
    sampleValue: sampleValues[index] ?? '',
    sourcePath: header,
    type: inferScalarType(sampleValues[index] ?? '')
    })),
    records: lines.slice(1)
      .map(line => splitTxtLine(line, delimiter))
      .filter(values => values.some(value => value))
      .map(values => headers.reduce<Record<string, string>>((record, header, index) => {
        record[header] = values[index] ?? '';
        return record;
      }, {}))
  };
}

function detectTxtDelimiter(line: string): string {
  const candidates = ['\t', ';', '|', ','];
  return candidates
    .map(delimiter => ({ delimiter, count: line.split(delimiter).length }))
    .filter(candidate => candidate.count > 1)
    .sort((left, right) => right.count - left.count)[0]?.delimiter ?? '';
}

function splitTxtLine(line: string, delimiter: string): string[] {
  return line.split(delimiter).map(value => value.trim());
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
