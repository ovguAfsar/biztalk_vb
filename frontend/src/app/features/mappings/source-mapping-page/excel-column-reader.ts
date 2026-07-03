export interface ExcelColumnImport {
  column: string;
  header: string;
  sampleValue: string;
}

interface ZipEntry {
  compressionMethod: number;
  compressedSize: number;
  localHeaderOffset: number;
}

class XlsxZipArchive {
  private readonly entries = new Map<string, ZipEntry>();
  private readonly decoder = new TextDecoder();

  private constructor(private readonly bytes: Uint8Array) {
    this.readCentralDirectory();
  }

  static from(buffer: ArrayBuffer): XlsxZipArchive {
    return new XlsxZipArchive(new Uint8Array(buffer));
  }

  async readText(path: string): Promise<string> {
    const bytes = await this.readBytes(path);
    return this.decoder.decode(bytes);
  }

  has(path: string): boolean {
    return this.entries.has(normalizeZipPath(path));
  }

  private async readBytes(path: string): Promise<Uint8Array> {
    const entry = this.entries.get(normalizeZipPath(path));
    if (!entry) {
      throw new Error('Excel dosyası beklenen çalışma sayfasını içermiyor.');
    }

    const view = new DataView(this.bytes.buffer, this.bytes.byteOffset, this.bytes.byteLength);
    if (view.getUint32(entry.localHeaderOffset, true) !== 0x04034b50) {
      throw new Error('Excel dosyası okunamadı.');
    }

    const fileNameLength = view.getUint16(entry.localHeaderOffset + 26, true);
    const extraLength = view.getUint16(entry.localHeaderOffset + 28, true);
    const dataStart = entry.localHeaderOffset + 30 + fileNameLength + extraLength;
    const data = this.bytes.slice(dataStart, dataStart + entry.compressedSize);

    if (entry.compressionMethod === 0) {
      return data;
    }

    if (entry.compressionMethod === 8) {
      return inflateRaw(data);
    }

    throw new Error('Excel dosyasındaki sıkıştırma formatı desteklenmiyor.');
  }

  private readCentralDirectory(): void {
    const view = new DataView(this.bytes.buffer, this.bytes.byteOffset, this.bytes.byteLength);
    const eocdOffset = findEndOfCentralDirectory(view);
    const entryCount = view.getUint16(eocdOffset + 10, true);
    let offset = view.getUint32(eocdOffset + 16, true);

    for (let index = 0; index < entryCount; index += 1) {
      if (view.getUint32(offset, true) !== 0x02014b50) {
        throw new Error('Excel dosyası okunamadı.');
      }

      const compressionMethod = view.getUint16(offset + 10, true);
      const compressedSize = view.getUint32(offset + 20, true);
      const fileNameLength = view.getUint16(offset + 28, true);
      const extraLength = view.getUint16(offset + 30, true);
      const commentLength = view.getUint16(offset + 32, true);
      const localHeaderOffset = view.getUint32(offset + 42, true);
      const fileNameStart = offset + 46;
      const fileName = this.decoder.decode(this.bytes.slice(fileNameStart, fileNameStart + fileNameLength));

      this.entries.set(normalizeZipPath(fileName), {
        compressionMethod,
        compressedSize,
        localHeaderOffset
      });

      offset = fileNameStart + fileNameLength + extraLength + commentLength;
    }
  }
}

export async function readExcelColumns(file: File): Promise<ExcelColumnImport[]> {
  const lowerName = file.name.toLowerCase();

  if (lowerName.endsWith('.csv')) {
    return readCsvColumns(await file.text());
  }

  if (lowerName.endsWith('.xls')) {
    throw new Error('Eski .xls formatı desteklenmiyor. Dosyayı .xlsx olarak kaydedip tekrar deneyin.');
  }

  if (!lowerName.endsWith('.xlsx')) {
    throw new Error('Excel için .xlsx dosyası seçin.');
  }

  const archive = XlsxZipArchive.from(await file.arrayBuffer());
  const workbookXml = await archive.readText('xl/workbook.xml');
  const relationshipsXml = await archive.readText('xl/_rels/workbook.xml.rels');
  const sheetPath = resolveFirstSheetPath(workbookXml, relationshipsXml);

  if (!archive.has(sheetPath)) {
    throw new Error('Excel dosyasında okunabilir çalışma sayfası bulunamadı.');
  }

  const sharedStrings = archive.has('xl/sharedStrings.xml')
    ? parseSharedStrings(await archive.readText('xl/sharedStrings.xml'))
    : [];
  const worksheetXml = await archive.readText(sheetPath);

  return parseWorksheetColumns(worksheetXml, sharedStrings);
}

function findEndOfCentralDirectory(view: DataView): number {
  const minimumOffset = Math.max(0, view.byteLength - 0xffff - 22);

  for (let offset = view.byteLength - 22; offset >= minimumOffset; offset -= 1) {
    if (view.getUint32(offset, true) === 0x06054b50) {
      return offset;
    }
  }

  throw new Error('Excel dosyası geçerli bir .xlsx arşivi değil.');
}

async function inflateRaw(data: Uint8Array): Promise<Uint8Array> {
  if (typeof DecompressionStream === 'undefined') {
    throw new Error('Bu tarayıcı Excel dosyası okumayı desteklemiyor.');
  }

  const DecompressionStreamConstructor = DecompressionStream as unknown as new (format: string) => DecompressionStream;
  const buffer = new ArrayBuffer(data.byteLength);
  new Uint8Array(buffer).set(data);
  const stream = new Blob([buffer]).stream().pipeThrough(new DecompressionStreamConstructor('deflate-raw'));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

function parseSharedStrings(xml: string): string[] {
  const document = parseXml(xml);

  return getElementsByLocalName(document, 'si').map(item => {
    const textParts = getElementsByLocalName(item, 't')
      .map(textElement => textElement.textContent ?? '');

    return textParts.join('');
  });
}

function resolveFirstSheetPath(workbookXml: string, relationshipsXml: string): string {
  const workbook = parseXml(workbookXml);
  const relationships = parseXml(relationshipsXml);
  const firstSheet = getElementsByLocalName(workbook, 'sheet')[0];
  const relationshipId = firstSheet?.getAttribute('r:id')
    ?? firstSheet?.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'id');

  if (!relationshipId) {
    return 'xl/worksheets/sheet1.xml';
  }

  const relationship = getElementsByLocalName(relationships, 'Relationship')
    .find(item => item.getAttribute('Id') === relationshipId);
  const target = relationship?.getAttribute('Target');

  return target ? resolveZipPath('xl', target) : 'xl/worksheets/sheet1.xml';
}

function parseWorksheetColumns(xml: string, sharedStrings: string[]): ExcelColumnImport[] {
  const document = parseXml(xml);
  const rows = getElementsByLocalName(document, 'row')
    .map(row => parseWorksheetRow(row, sharedStrings))
    .filter(row => row.some(cell => cell.value.trim()));

  const headerRow = rows[0];
  if (!headerRow) {
    throw new Error('Excel dosyasında kolon başlıkları bulunamadı.');
  }

  const headerColumnIndexes = headerRow.map(cell => cell.columnIndex);
  const sampleRow = rows
    .slice(1)
    .find(row => rowHasDataInColumns(row, headerColumnIndexes));

  if (!sampleRow) {
    throw new Error('Excel dosyasında başlıklardan sonra veri satırı bulunamadı.');
  }

  validateHeaderCells(headerRow, 'Excel', Math.max(
    ...headerRow.map(cell => cell.columnIndex),
    ...sampleRow.map(cell => cell.columnIndex)
  ));

  const sampleByColumn = new Map(sampleRow.map(cell => [cell.columnIndex, cell.value]));
  const columns = headerRow
    .map(cell => ({
      column: cell.column,
      header: cell.value.trim(),
      sampleValue: sampleByColumn.get(cell.columnIndex)?.trim() ?? ''
    }));

  if (columns.length === 0) {
    throw new Error('Excel dosyasında kolon başlıkları bulunamadı.');
  }

  return columns;
}

function validateHeaderCells(
  headerRow: Array<{ column: string; columnIndex: number; value: string }>,
  fileType: 'Excel' | 'CSV',
  maxColumnIndex = headerRow[headerRow.length - 1]?.columnIndex ?? 0)
{
  const firstColumnIndex = headerRow[0]?.columnIndex ?? 1;
  const cellsByColumn = new Map(headerRow.map(cell => [cell.columnIndex, cell]));
  const seenHeaders = new Set<string>();

  for (let columnIndex = firstColumnIndex; columnIndex <= maxColumnIndex; columnIndex += 1) {
    const cell = cellsByColumn.get(columnIndex);
    const header = cell?.value.trim() ?? '';

    if (!header) {
      const columnName = cell?.column ?? getColumnNameFromIndex(columnIndex);
      throw new Error(`${fileType} dosyasında kolon adı boş olamaz. Boş kolon: ${columnName}`);
    }

    const normalizedHeader = header.toLowerCase();
    if (seenHeaders.has(normalizedHeader)) {
      throw new Error(`${fileType} dosyasında tekrarlı kolon başlığı var: ${header}`);
    }

    seenHeaders.add(normalizedHeader);
  }
}

function parseWorksheetRow(row: Element, sharedStrings: string[]): Array<{
  column: string;
  columnIndex: number;
  value: string;
}> {
  return getDirectChildrenByLocalName(row, 'c')
    .map(cell => {
      const cellRef = cell.getAttribute('r') ?? '';
      const column = getColumnName(cellRef);

      return {
        column,
        columnIndex: getColumnIndex(column),
        value: readCellValue(cell, sharedStrings)
      };
    })
    .sort((left, right) => left.columnIndex - right.columnIndex);
}

function rowHasDataInColumns(
  row: Array<{ columnIndex: number; value: string }>,
  columnIndexes: number[]
): boolean {
  const allowedColumns = new Set(columnIndexes);
  return row.some(cell => allowedColumns.has(cell.columnIndex) && cell.value.trim());
}

function readCellValue(cell: Element, sharedStrings: string[]): string {
  const type = cell.getAttribute('t');

  if (type === 'inlineStr') {
    return getElementsByLocalName(cell, 't')
      .map(textElement => textElement.textContent ?? '')
      .join('');
  }

  const value = getDirectChildrenByLocalName(cell, 'v')[0]?.textContent ?? '';

  if (type === 's') {
    const sharedStringIndex = Number(value);
    return Number.isInteger(sharedStringIndex) ? sharedStrings[sharedStringIndex] ?? '' : '';
  }

  return value;
}

function readCsvColumns(text: string): ExcelColumnImport[] {
  const rows = parseCsvRows(text).filter(row => row.some(cell => cell.trim()));
  const headerRow = rows[0];

  if (!headerRow) {
    throw new Error('CSV dosyasında kolon başlıkları bulunamadı.');
  }

  const headerCells = headerRow.map((header, index) => ({
    column: getColumnNameFromIndex(index + 1),
    columnIndex: index + 1,
    value: header
  }));
  const sampleRow = rows
    .slice(1)
    .find(row => row.some((cell, index) => index < headerRow.length && cell.trim()));

  if (!sampleRow) {
    throw new Error('CSV dosyasında başlıklardan sonra veri satırı bulunamadı.');
  }

  validateHeaderCells(headerCells, 'CSV', Math.max(headerCells.length, sampleRow.length));

  const columns = headerRow
    .map((header, index) => ({
      column: getColumnNameFromIndex(index + 1),
      header: header.trim(),
      sampleValue: sampleRow[index]?.trim() ?? ''
    }));

  if (columns.length === 0) {
    throw new Error('CSV dosyasında kolon başlıkları bulunamadı.');
  }

  return columns;
}

function parseCsvRows(text: string): string[][] {
  const delimiter = chooseCsvDelimiter(text);
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let insideQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const nextCharacter = text[index + 1];

    if (character === '"') {
      if (insideQuotes && nextCharacter === '"') {
        currentCell += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (character === delimiter && !insideQuotes) {
      currentRow.push(currentCell);
      currentCell = '';
      continue;
    }

    if ((character === '\n' || character === '\r') && !insideQuotes) {
      currentRow.push(currentCell);
      rows.push(currentRow);
      currentRow = [];
      currentCell = '';

      if (character === '\r' && nextCharacter === '\n') {
        index += 1;
      }
      continue;
    }

    currentCell += character;
  }

  currentRow.push(currentCell);
  rows.push(currentRow);

  return rows;
}

function chooseCsvDelimiter(text: string): string {
  const firstLine = text.split(/\r?\n/, 1)[0] ?? '';
  const commaCount = countOccurrences(firstLine, ',');
  const semicolonCount = countOccurrences(firstLine, ';');

  return semicolonCount > commaCount ? ';' : ',';
}

function countOccurrences(value: string, character: string): number {
  return [...value].filter(item => item === character).length;
}

function parseXml(xml: string): Document {
  const document = new DOMParser().parseFromString(xml, 'application/xml');
  const parseError = document.getElementsByTagName('parsererror')[0];

  if (parseError) {
    throw new Error('Excel dosyasındaki XML içeriği okunamadı.');
  }

  return document;
}

function getElementsByLocalName(parent: Document | Element, localName: string): Element[] {
  return Array.from(parent.getElementsByTagName('*'))
    .filter(element => element.localName === localName);
}

function getDirectChildrenByLocalName(parent: Element, localName: string): Element[] {
  return Array.from(parent.children)
    .filter(element => element.localName === localName);
}

function getColumnName(cellRef: string): string {
  return cellRef.match(/[A-Z]+/i)?.[0]?.toUpperCase() ?? 'A';
}

function getColumnIndex(column: string): number {
  return [...column].reduce((total, character) => total * 26 + character.charCodeAt(0) - 64, 0);
}

function getColumnNameFromIndex(index: number): string {
  let column = '';
  let current = index;

  while (current > 0) {
    current -= 1;
    column = String.fromCharCode(65 + (current % 26)) + column;
    current = Math.floor(current / 26);
  }

  return column;
}

function normalizeZipPath(path: string): string {
  return path.replace(/^\/+/, '');
}

function resolveZipPath(baseDirectory: string, target: string): string {
  if (target.startsWith('/')) {
    return normalizeZipPath(target);
  }

  const parts = `${baseDirectory}/${target}`.split('/');
  const resolved: string[] = [];

  for (const part of parts) {
    if (!part || part === '.') {
      continue;
    }

    if (part === '..') {
      resolved.pop();
      continue;
    }

    resolved.push(part);
  }

  return resolved.join('/');
}
