export type CsvCell = string | null;

type ParsedField = {
  value: string;
  quoted: boolean;
};

function normalizeDelimiter(delimiter: string): string {
  if (typeof delimiter !== 'string' || delimiter.length === 0) {
    throw new Error('Invalid input: delimiter must be a non-empty string');
  }
  if (delimiter.includes('"') || delimiter.includes('\n') || delimiter.includes('\r')) {
    throw new Error('Invalid input: delimiter cannot contain quotes or line breaks');
  }
  return delimiter;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function needsQuotes(value: string, delimiter: string): boolean {
  return (
    value === '' ||
    value.includes('"') ||
    value.includes('\n') ||
    value.includes('\r') ||
    value.includes(delimiter)
  );
}

function encodeField(value: string, delimiter: string): string {
  if (needsQuotes(value, delimiter)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function encodeValue(value: unknown, delimiter: string): string {
  if (value === undefined || value === null) return '';
  if (typeof value === 'string') return encodeField(value, delimiter);
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
    return String(value);
  }
  if (value instanceof Date) return encodeField(value.toISOString(), delimiter);
  if (typeof value === 'object') return encodeField(JSON.stringify(value), delimiter);
  return encodeField(String(value), delimiter);
}

function decodeCell(field: ParsedField | undefined): CsvCell {
  if (!field) return null;
  if (field.quoted) return field.value;
  if (field.value === '') return null;
  return field.value;
}

function parseCsvRows(input: string, delimiter: string): ParsedField[][] {
  if (input.charCodeAt(0) === 0xfeff) input = input.slice(1);
  if (input.length === 0) return [];

  const rows: ParsedField[][] = [];
  let row: ParsedField[] = [];
  let field = '';
  let quoted = false;
  let inQuotes = false;
  const dLen = delimiter.length;

  const pushField = () => {
    row.push({ value: field, quoted });
    field = '';
    quoted = false;
  };

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];

    if (inQuotes) {
      if (ch === '"') {
        if (input[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"' && field === '') {
      inQuotes = true;
      quoted = true;
      continue;
    }

    if (input.startsWith(delimiter, i)) {
      pushField();
      i += dLen - 1;
      continue;
    }

    if (ch === '\n' || ch === '\r') {
      pushField();
      rows.push(row);
      row = [];
      if (ch === '\r' && input[i + 1] === '\n') i++;
      continue;
    }

    field += ch;
  }

  if (inQuotes) {
    throw new Error('Invalid CSV: unterminated quoted field');
  }

  if (!(input.endsWith('\n') || input.endsWith('\r'))) {
    pushField();
    rows.push(row);
  }

  return rows;
}

function isBlankLine(row: ParsedField[], columnCount: number): boolean {
  return row.length === 1 && row[0].value === '' && !row[0].quoted && columnCount > 1;
}

function isEmptyRow(row: ParsedField[]): boolean {
  return row.every((cell) => cell.value === '' && !cell.quoted);
}

/** Parse CSV text into an array of objects. The first row is used as header keys. */
export function CsvToJson(
  csv: string | null | undefined,
  delimiter = ',',
): Record<string, CsvCell>[] {
  if (csv === null || csv === undefined) return [];
  if (typeof csv !== 'string') {
    throw new Error('Invalid input: csv must be a string');
  }
  const rows = parseCsvRows(csv, normalizeDelimiter(delimiter));
  if (rows.length === 0 || (rows.length === 1 && isEmptyRow(rows[0]))) return [];

  const headers = rows[0].map((cell) => cell.value);
  const records: Record<string, CsvCell>[] = [];
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (isBlankLine(row, headers.length)) continue;
    const record: Record<string, CsvCell> = {};
    for (let c = 0; c < headers.length; c++) {
      const key = headers[c];
      if (key === '') continue;
      record[key] = decodeCell(row[c]);
    }
    records.push(record);
  }
  return records;
}

/** Serialize JSON objects as CSV text. Nested objects and arrays are JSON-stringified. */
export function JsonToCsv(
  data: string | Record<string, unknown> | Record<string, unknown>[] | null | undefined,
  delimiter = ',',
): string {
  const delim = normalizeDelimiter(delimiter);
  let records: unknown = data;
  if (typeof records === 'string') {
    if (records.trim() === '') return '';
    try {
      records = JSON.parse(records);
    } catch {
      throw new Error('Invalid input: data must be valid JSON');
    }
  }
  if (records === null || records === undefined) return '';
  if (!Array.isArray(records)) {
    if (!isPlainObject(records)) {
      throw new Error('Invalid input: data must be an object or an array of objects');
    }
    records = [records];
  }
  const rows = records as unknown[];
  if (rows.length === 0) return '';
  if (!rows.every((row) => row === null || row === undefined || isPlainObject(row))) {
    throw new Error('Invalid input: data must be an object or an array of objects');
  }

  const keys: string[] = [];
  const seen = new Set<string>();
  for (const record of rows) {
    if (!isPlainObject(record)) continue;
    for (const key of Object.keys(record)) {
      if (!seen.has(key)) {
        seen.add(key);
        keys.push(key);
      }
    }
  }
  if (keys.length === 0) return '';

  const lines = [keys.map((key) => encodeField(key, delim)).join(delim)];
  for (const record of rows) {
    if (record === null || record === undefined) {
      lines.push(keys.map(() => '').join(delim));
      continue;
    }
    const obj = record as Record<string, unknown>;
    lines.push(keys.map((key) => encodeValue(obj[key], delim)).join(delim));
  }
  return lines.join('\n');
}
