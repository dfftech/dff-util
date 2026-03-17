export type QueryCondItem = {
  key: string;
  opt:
    | '='
    | '!='
    | '>'
    | '<'
    | '>='
    | '<='
    | 'in'
    | 'not in'
    | 'notin'
    | 'between'
    | 'isnull'
    | 'isnotnull'
    | 'is null'
    | 'is not null'
    | 'like'
    | 'ilike'
    | 'contains'
    | 'startswith'
    | 'endswith'
    | 'regex'
    | 'exists';
  value: any;
};

function splitTopLevel(input: string, delimiter: string): string[] {
  const parts: string[] = [];
  let buf = '';
  let quote: '"' | "'" | null = null;
  let escape = false;
  let square = 0;
  let curly = 0;
  let paren = 0;

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];

    if (escape) {
      buf += ch;
      escape = false;
      continue;
    }

    if (quote) {
      if (ch === '\\') {
        buf += ch;
        escape = true;
        continue;
      }
      buf += ch;
      if (ch === quote) quote = null;
      continue;
    }

    if (ch === '"' || ch === "'") {
      quote = ch;
      buf += ch;
      continue;
    }

    if (ch === '[') square++;
    if (ch === ']') square = Math.max(0, square - 1);
    if (ch === '{') curly++;
    if (ch === '}') curly = Math.max(0, curly - 1);
    if (ch === '(') paren++;
    if (ch === ')') paren = Math.max(0, paren - 1);

    if (ch === delimiter && square === 0 && curly === 0 && paren === 0) {
      const seg = buf.trim();
      if (seg) parts.push(seg);
      buf = '';
      continue;
    }

    buf += ch;
  }

  const last = buf.trim();
  if (last) parts.push(last);
  return parts;
}

function parseMaybeJson(raw: string): any {
  const s = raw.trim();
  if (!s) return '';

  if (s === 'null') return null;
  if (s === 'true') return true;
  if (s === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);

  const first = s[0];
  const last = s[s.length - 1];
  if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
    if (first === '"') {
      try {
        return JSON.parse(s);
      } catch {
        return s.slice(1, -1);
      }
    }
    const inner = s.slice(1, -1);
    return inner.replace(/\\'/g, "'").replace(/\\\\/g, '\\');
  }

  if ((first === '[' && last === ']') || (first === '{' && last === '}')) {
    try {
      return JSON.parse(s);
    } catch {
      if (s.includes("'") && !s.includes('"')) {
        try {
          return JSON.parse(s.replace(/'/g, '"'));
        } catch {
          return s;
        }
      }
      return s;
    }
  }

  return s;
}

function findTopLevelOpIndex(expr: string, ops: string[]): { op: string; idx: number } | null {
  let quote: '"' | "'" | null = null;
  let escape = false;
  let square = 0;
  let curly = 0;
  let paren = 0;

  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];

    if (escape) {
      escape = false;
      continue;
    }

    if (quote) {
      if (ch === '\\') {
        escape = true;
        continue;
      }
      if (ch === quote) quote = null;
      continue;
    }

    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }

    if (ch === '[') square++;
    else if (ch === ']') square = Math.max(0, square - 1);
    else if (ch === '{') curly++;
    else if (ch === '}') curly = Math.max(0, curly - 1);
    else if (ch === '(') paren++;
    else if (ch === ')') paren = Math.max(0, paren - 1);

    if (square !== 0 || curly !== 0 || paren !== 0) continue;

    for (const op of ops) {
      if (expr.startsWith(op, i)) {
        return { op, idx: i };
      }
    }
  }

  return null;
}

function findTopLevelTokenIndex(expr: string, token: string): number {
  let quote: '"' | "'" | null = null;
  let escape = false;
  let square = 0;
  let curly = 0;
  let paren = 0;

  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];

    if (escape) {
      escape = false;
      continue;
    }

    if (quote) {
      if (ch === '\\') {
        escape = true;
        continue;
      }
      if (ch === quote) quote = null;
      continue;
    }

    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }

    if (ch === '[') square++;
    else if (ch === ']') square = Math.max(0, square - 1);
    else if (ch === '{') curly++;
    else if (ch === '}') curly = Math.max(0, curly - 1);
    else if (ch === '(') paren++;
    else if (ch === ')') paren = Math.max(0, paren - 1);

    if (square !== 0 || curly !== 0 || paren !== 0) continue;

    if (expr.startsWith(token, i)) return i;
  }

  return -1;
}

function parseBetweenValue(raw: string): any {
  const s = raw.trim();
  if (!s) return [];

  if (s.startsWith('[') && s.endsWith(']')) {
    const parsed = parseMaybeJson(s);
    if (Array.isArray(parsed)) return parsed.slice(0, 2);
  }

  const idx = findTopLevelTokenIndex(s, '..');
  if (idx >= 0) {
    const left = s.slice(0, idx).trim();
    const right = s.slice(idx + 2).trim();
    return [parseMaybeJson(left), parseMaybeJson(right)];
  }

  return [parseMaybeJson(s)];
}

function normalizeOpt(opt: string): QueryCondItem['opt'] {
  const o = opt.trim().toLowerCase();
  if (o === '==') return '=';
  if (o === 'notin') return 'not in';
  if (o === 'is null') return 'is null';
  if (o === 'is not null') return 'is not null';
  if (o === 'isnull') return 'is null';
  if (o === 'isnotnull') return 'is not null';
  if (o === 'in') return 'in';
  if (o === 'not in') return 'not in';
  if (o === 'notin') return 'not in';
  if (o === 'between') return 'between';
  if (o === 'like') return 'like';
  if (o === 'ilike') return 'ilike';
  if (o === 'contains') return 'contains';
  if (o === 'startswith') return 'startswith';
  if (o === 'endswith') return 'endswith';
  if (o === 'regex') return 'regex';
  if (o === 'exists') return 'exists';
  if (opt === '>=') return '>=';
  if (opt === '<=') return '<=';
  if (opt === '!=') return '!=';
  if (opt === '>') return '>';
  if (opt === '<') return '<';
  return '=';
}

function parseOneCond(segment: string): QueryCondItem | null {
  const s = segment.trim();
  if (!s) return null;

  const unaryMatch = s.match(/^(.+?)\s+(isnull|isnotnull|is\s+null|is\s+not\s+null)\s*$/i);
  if (unaryMatch) {
    const key = unaryMatch[1].trim();
    const opt = normalizeOpt(unaryMatch[2]);
    return { key, opt, value: null };
  }

  const keywordMatch = s.match(
    /^(.+?)\s+(not\s+in|notin|in|between|ilike|like|contains|startswith|endswith|regex)\s+([\s\S]+)$/i
  );
  if (keywordMatch) {
    const key = keywordMatch[1].trim();
    const opt = normalizeOpt(keywordMatch[2]);
    const rawVal = keywordMatch[3].trim();
    const value = opt === 'between' ? parseBetweenValue(rawVal) : parseMaybeJson(rawVal);
    return { key, opt, value };
  }

  const opInfo = findTopLevelOpIndex(s, ['>=', '<=', '!=', '==', '>', '<', '=']);
  if (opInfo) {
    const key = s.slice(0, opInfo.idx).trim();
    const rhs = s.slice(opInfo.idx + opInfo.op.length).trim();
    let opt = normalizeOpt(opInfo.op);
    let value: any = rhs ? parseMaybeJson(rhs) : null;

    if (opt === '=' && Array.isArray(value)) opt = 'in';
    if (opt === '!=' && Array.isArray(value)) opt = 'not in';
    if (opt === '=' && value === null) opt = 'is null';
    if (opt === '!=' && value === null) opt = 'is not null';

    return { key, opt, value };
  }

  if (/^!\s*\w/.test(s)) {
    const key = s.replace(/^!\s*/, '').trim();
    return { key, opt: 'exists', value: false };
  }

  return { key: s, opt: 'exists', value: true };
}

export function QueryCond(input: string): QueryCondItem[] {
  if (!input) return [];
  const segments = splitTopLevel(input, ',');
  return segments.map(parseOneCond).filter((x): x is QueryCondItem => Boolean(x));
}
