import assert from 'node:assert/strict';
import { CallLangText, CallCurrencyConvert } from '../index';

const original = Object.getOwnPropertyDescriptor(globalThis, 'XMLHttpRequest');
let body = '';
let status = 200;
let url = '';
let count = 0;
class MockXHR {
  status = 0;
  statusText = '';
  responseText = '';
  open(method: string, target: string, async: boolean) {
    assert.equal(method, 'GET');
    assert.equal(async, false);
    url = target;
  }
  send(data: null) {
    assert.equal(data, null);
    count++;
    this.status = status;
    this.responseText = body;
  }
}
Object.defineProperty(globalThis, 'XMLHttpRequest', { configurable: true, value: MockXHR });
try {
  body = JSON.stringify({ translation: 'నమస్కారం' });
  assert.equal(CallLangText('Hello / world?', 'en-US', 'te-IN'), 'నమస్కారం');
  assert.equal(url, 'https://lingva.ml/api/v1/en/te/Hello%20%2F%20world%3F');
  assert.throws(() => CallLangText('', 'en', 'te'), /Invalid input/);
  assert.throws(() => CallLangText('hello', '../', 'te'), /Invalid language/);
  body = JSON.stringify({ error: 'Unsupported language' });
  assert.throws(() => CallLangText('hello', 'en', 'te'), /Unsupported language/);
  body = JSON.stringify({ rates: { USD: 0.012 } });
  assert.equal(CallCurrencyConvert('INR', 'USD'), 0.012);
  assert.equal(url, 'https://api.frankfurter.dev/v1/latest?from=INR&to=USD');
  const before = count;
  assert.equal(CallCurrencyConvert('USD', 'USD'), 1);
  assert.equal(count, before);
  assert.throws(() => CallCurrencyConvert('', 'USD'), /Invalid input/);
  body = '{}';
  assert.throws(() => CallCurrencyConvert('INR', 'USD'), /numeric exchange rate/);
  status = 503;
  body = 'Service unavailable';
  assert.throws(() => CallCurrencyConvert('INR', 'USD'), /503.*Service unavailable/);
  assert.throws(() => CallLangText('hello', 'en', 'te'), /503.*Service unavailable/);
  status = 200;
  body = 'invalid json';
  assert.throws(() => CallCurrencyConvert('INR', 'USD'), SyntaxError);
  assert.throws(() => CallLangText('hello', 'en', 'te'), SyntaxError);
  delete (globalThis as any).XMLHttpRequest;
  assert.throws(() => CallCurrencyConvert('INR', 'USD'), /requires a browser/);
  assert.throws(() => CallLangText('hello', 'en', 'te'), /requires a browser/);
  console.log('API call tests passed');
} finally {
  if (original) Object.defineProperty(globalThis, 'XMLHttpRequest', original);
  else delete (globalThis as any).XMLHttpRequest;
}
