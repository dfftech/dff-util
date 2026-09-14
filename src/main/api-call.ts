import { RequestBodyType } from './const-type';

// All API calls are synchronous and require XMLHttpRequest support.
function requestText(url: string, label: string, body?: RequestBodyType): string {
  if (typeof XMLHttpRequest === 'undefined') {
    throw new Error(`${label} requires a browser with synchronous XMLHttpRequest support`);
  }
  const request = new XMLHttpRequest();
  request.open(body === undefined ? 'GET' : 'POST', url, false);
  if (body !== undefined) request.setRequestHeader('Content-Type', 'application/json');
  request.send(body === undefined ? null : JSON.stringify(body));
  if (request.status < 200 || request.status >= 300) {
    const message = request.responseText;
    throw new Error(`${label} failed: ${request.status} ${request.statusText}${message ? `: ${message}` : ''}`);
  }
  return request.responseText;
}

/** Render an inline Handlebars template using the hosted HBS service. */
export function CallHbs(
  template: string,
  data: RequestBodyType | RequestBodyType[] | null | undefined,
  multi = false,
): string | string[] {
  if (typeof template !== 'string') {
    throw new Error('Invalid input: template must be a string');
  }
  // With no data, no request is made: return the template unchanged,
  // or a single-item array when rendering in multi mode.
  if (data === null || data === undefined) {
    return multi ? [template] : template;
  }
  const isObject = (value: unknown) => value !== null && typeof value === 'object' && !Array.isArray(value);
  if (!(Array.isArray(data) ? data.every(isObject) : isObject(data))) {
    throw new Error('Invalid input: data must be a JSON object or an array of JSON objects');
  }
  if (multi && !Array.isArray(data)) {
    throw new Error('Invalid input: data must be an array for multi rendering');
  }

  const text = requestText(
    `https://hbs.rndpro.in/${multi ? 'multi' : 'render'}`,
    'HBS rendering',
    { template, data },
  );
  if (!multi) return text;

  const rendered: unknown = JSON.parse(text);
  if (!Array.isArray(rendered) || !rendered.every((item) => typeof item === 'string')) {
    throw new Error('Invalid HBS response: expected an array of strings');
  }
  return rendered;
}

export const CallLangText = (data: string, source: string, target: string): string => {
  if (!data || !source || !target) {
    throw new Error('Invalid input: data, source, or target is missing');
  }
  const src = source.split('-')[0]; // e.g., "en-US" -> "en"
  const tgt = target.split('-')[0]; // e.g., "te-IN" -> "te"
  if (!/^[a-zA-Z]{2}$/.test(src) || !/^[a-zA-Z]{2}$/.test(tgt)) {
    throw new Error('Invalid language code format');
  }
  const encodedData = encodeURIComponent(data);
  const url = `https://lingva.ml/api/v1/${src}/${tgt}/${encodedData}`;
  const json = JSON.parse(requestText(url, 'Translation'));
  if (json.error) {
    throw new Error(`API error: ${json.error}`);
  }

  if (json.translation !== undefined && typeof json.translation !== 'string') {
    throw new Error('Invalid translation response: expected a string');
  }
  return json.translation || '';
};

/** Return the exchange rate for one unit of the source currency. */
export const CallCurrencyConvert = (from: string, to: string): number => {
  if (!from || !to) {
    throw new Error('Invalid input: from or to is missing');
  }
  if (from === to) return 1;
  const url = `https://api.frankfurter.dev/v1/latest?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
  const json = JSON.parse(requestText(url, 'Currency conversion'));
  const rate = json.rates?.[to];
  if (typeof rate !== 'number' || !Number.isFinite(rate)) {
    throw new Error('Invalid currency response: expected a numeric exchange rate');
  }
  return rate;
};
