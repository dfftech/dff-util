import assert from 'node:assert/strict';
import { CallLangText, CallCurrencyConvert } from '../index';

const originalFetch = globalThis.fetch;
let body = '';
let status = 200;
let statusText = 'OK';
let url = '';
let method = '';
let count = 0;
globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  count++;
  url = String(input);
  method = init?.method || 'GET';
  assert.equal(init?.body, undefined);
  return new Response(body, { status, statusText });
};

async function run() {
  try {
    body = JSON.stringify({ translation: 'నమస్కారం' });
    assert.equal(await CallLangText('Hello / world?', 'en-US', 'te-IN'), 'నమస్కారం');
    assert.equal(method, 'GET');
    assert.equal(url, 'https://lingva.ml/api/v1/en/te/Hello%20%2F%20world%3F');
    await assert.rejects(() => CallLangText('', 'en', 'te'), /Invalid input/);
    await assert.rejects(() => CallLangText('hello', '../', 'te'), /Invalid language/);
    body = JSON.stringify({ error: 'Unsupported language' });
    await assert.rejects(() => CallLangText('hello', 'en', 'te'), /Unsupported language/);
    body = JSON.stringify({ rates: { USD: 0.012 } });
    assert.equal(await CallCurrencyConvert('INR', 'USD'), 0.012);
    assert.equal(method, 'GET');
    assert.equal(url, 'https://api.frankfurter.dev/v1/latest?from=INR&to=USD');
    const before = count;
    assert.equal(await CallCurrencyConvert('USD', 'USD'), 1);
    assert.equal(count, before);
    await assert.rejects(() => CallCurrencyConvert('', 'USD'), /Invalid input/);
    body = '{}';
    await assert.rejects(() => CallCurrencyConvert('INR', 'USD'), /numeric exchange rate/);
    status = 503;
    statusText = 'Service Unavailable';
    body = 'Service unavailable';
    await assert.rejects(() => CallCurrencyConvert('INR', 'USD'), /503.*Service unavailable/);
    await assert.rejects(() => CallLangText('hello', 'en', 'te'), /503.*Service unavailable/);
    status = 200;
    statusText = 'OK';
    body = 'invalid json';
    await assert.rejects(() => CallCurrencyConvert('INR', 'USD'), SyntaxError);
    await assert.rejects(() => CallLangText('hello', 'en', 'te'), SyntaxError);
    delete (globalThis as any).fetch;
    await assert.rejects(() => CallCurrencyConvert('INR', 'USD'), /requires a runtime with fetch support/);
    await assert.rejects(() => CallLangText('hello', 'en', 'te'), /requires a runtime with fetch support/);
    console.log('API call tests passed');
  } finally {
    globalThis.fetch = originalFetch;
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
