import { AllLanguageCodes } from "./const-value";

export function toCamelCase(str: string): string {
  return str
    .replace(/[_\s-]+(.)?/g, (_, chr) => (chr ? chr.toUpperCase() : ''))
    .replace(/^[A-Z]/, (chr) => chr.toLowerCase());
}

export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')  // camelCase → camel_Case
    .replace(/[\s-]+/g, '_')                 // space/dash → underscore
    .replace(/__+/g, '_')                    // collapse multiple underscores
    .toLowerCase();
}

export function toPascalCase(str: string): string {
  return str
    .replace(/[_\s-]+/g, ' ')
    .replace(/\w+/g, (word) =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .replace(/\s+/g, '');
}

export function toUpperCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2') // camelCase to snake_case
    .replace(/[\s-]+/g, '_')                // spaces/hyphens to underscores
    .replace(/([A-Z]+)/g, '_$1')            // handle acronyms (optional)
    .replace(/^_+|_+$/g, '')                // trim leading/trailing _
    .toUpperCase();
}

export function toLowerCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .replace(/([A-Z]+)/g, '_$1')
    .replace(/^_+|_+$/g, '')
    .toLowerCase();
}

function isPlainObject(obj: any): obj is Record<string, any> {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

const LANGUAGE_CODE_SET = new Set<string>(AllLanguageCodes as unknown as string[]);

function isLanguageMap(value: unknown) {
  if (!isPlainObject(value)) return false;
  const keys = Object.keys(value);
  if (keys.length === 0) return false;
  return keys.every((k) => LANGUAGE_CODE_SET.has(k));
}

export function toViewMapper(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(toViewMapper);
  }
  if (isLanguageMap(obj)) {
    return obj;
  }
  if (isPlainObject(obj)) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        toCamelCase(key === '_id' ? 'id' : key),
        toViewMapper(value),
      ])
    );
  }
  return obj; // Date, Buffer, Map, etc. returned as-is
}

export function toEntityMapper<T = any>(obj: T): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => toEntityMapper(v));
  }

  if (isLanguageMap(obj)) {
    return obj; // preserve language codes exactly
  }

  if (isPlainObject(obj)) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => {
        const mappedKey = toSnakeCase(key);
        return [mappedKey, toEntityMapper(value)];
      })
    );
  }

  return obj; // primitives, Date, Buffer, etc.
}


export function toSchemaMapper(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(toEntityMapper);
  }

  if (isLanguageMap(obj)) {
    return obj; // do not transform language code keys
  }

  if (isPlainObject(obj)) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        toSnakeCase(key === 'id' ? '_id' : key),
        toEntityMapper(value),
      ])
    );
  }
  return obj; // Date, Buffer, Map, etc. returned as-is
}
