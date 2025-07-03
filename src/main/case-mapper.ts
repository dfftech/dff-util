export function toCamelCase(str: string): string {
  return str
    .replace(/[_\s-]+(.)?/g, (_, chr) => (chr ? chr.toUpperCase() : ''))
    .replace(/^[A-Z]/, (chr) => chr.toLowerCase());
}

export function toSnakeCase(str: string, isMongoId: boolean = false): string {
  if (str === 'id' && isMongoId) return '_id';
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

export function toViewMapper(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(toViewMapper);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        toCamelCase(key),
        toViewMapper(value),
      ])
    );
  }
  return obj;
}


export function toEntityMapper(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(toEntityMapper);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        toSnakeCase(key),
        toEntityMapper(value),
      ])
    );
  }
  return obj;
}

export function toSchemaMapper(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(toSchemaMapper);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        toSnakeCase(key, true),
        toSchemaMapper(value),
      ])
    );
  }
  return obj;
}
