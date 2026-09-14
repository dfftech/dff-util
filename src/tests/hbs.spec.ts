import assert from 'node:assert/strict';
import { CallHbs } from '../index';

const originalFetch = globalThis.fetch;
const calls: { url: string; method: string; headers: HeadersInit | undefined; body: any }[] = [];
let response = { text: 'Hello, k7m2x9!', status: 200, statusText: 'OK' };
let networkError = false;
globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  if (networkError) throw new Error('Network unavailable');
  assert.equal(init?.method, 'POST');
  const headers = new Headers(init?.headers);
  assert.equal(headers.get('Content-Type'), 'application/json');
  const url = String(input);
  calls.push({ url, method: init?.method || 'GET', headers: init?.headers, body: JSON.parse(String(init?.body)) });
  return new Response(response.text, { status: response.status, statusText: response.statusText });
};

async function run() {
  try {
    const template = 'Hello, {{to_pascal_case name}}!';
    assert.equal(await CallHbs(template, { name: 'k7m2x9' }), 'Hello, k7m2x9!');
    assert.deepEqual(calls.pop(), {
      url: 'https://hbs.rndpro.in/render',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { template, data: { name: 'k7m2x9' } },
    });
    response = { text: JSON.stringify(['Hello, k7m2x9!', 'Hello, n4t9pw!']), status: 200, statusText: 'OK' };
    const items = [{ name: 'k7m2x9' }, { name: 'n4t9pw' }];
    assert.deepEqual(await CallHbs(template, items, true), ['Hello, k7m2x9!', 'Hello, n4t9pw!']);
    assert.deepEqual(calls.pop(), {
      url: 'https://hbs.rndpro.in/multi',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { template, data: items },
    });
    response = { text: '[]', status: 200, statusText: 'OK' };
    assert.deepEqual(await CallHbs(template, [], true), []);
    response = { text: 'k7m2x9n4t9pw', status: 200, statusText: 'OK' };
    assert.equal(await CallHbs('{{#each this}}{{name}}{{/each}}', items), 'k7m2x9n4t9pw');
    assert.equal(calls.pop()?.url, 'https://hbs.rndpro.in/render');
    response = { text: '', status: 200, statusText: 'OK' };
    assert.equal(await CallHbs('', {}), '');
    // data null / undefined returns the template unchanged, without any network request
    const before = calls.length;
    assert.equal(await CallHbs(template, null), template);
    assert.equal(await CallHbs(template, undefined), template);
    assert.deepEqual(await CallHbs(template, null, true), [template]);
    assert.deepEqual(await CallHbs(template, undefined, true), [template]);
    assert.equal(calls.length, before);
    const count = calls.length;
    for (const invalid of ['text', 42, true, [null], ['text'], [[]]]) {
      await assert.rejects(() => CallHbs(template, invalid as any), /JSON object/);
    }

    await assert.rejects(() => CallHbs(template, {}, true), /data must be an array/);
    assert.equal(calls.length, count);
    response = { text: 'render error at index 1: missing helper', status: 500, statusText: 'Internal Server Error' };
    await assert.rejects(() => CallHbs(template, items, true), /500.*render error at index 1/);
    response = { text: 'Cloudflare challenge', status: 403, statusText: 'Forbidden' };
    await assert.rejects(() => CallHbs(template, {}), /403.*Cloudflare challenge/);
    response = { text: '{}', status: 200, statusText: 'OK' };
    await assert.rejects(() => CallHbs(template, items, true), /expected an array of strings/);
    networkError = true;
    await assert.rejects(() => CallHbs(template, {}), /Network unavailable/);
    delete (globalThis as any).fetch;
    await assert.rejects(() => CallHbs(template, {}), /requires a runtime with fetch support/);
    console.log('CallHbs tests passed');
  } finally {
    globalThis.fetch = originalFetch;
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
