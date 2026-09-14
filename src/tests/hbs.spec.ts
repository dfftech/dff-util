import assert from 'node:assert/strict';
import { CallHbs } from '../index';

const originalXHR = Object.getOwnPropertyDescriptor(globalThis, 'XMLHttpRequest');
const calls: { url: string; body: any }[] = [];
let response = { text: 'Hello, Prasad!', status: 200 };
let networkError = false;
class MockXHR {
  status = 0;
  statusText = '';
  responseText = '';
  url = '';
  open(method: string, url: string, async: boolean) {
    assert.equal(method, 'POST');
    assert.equal(async, false);
    this.url = url;
  }
  setRequestHeader(name: string, value: string) {
    assert.equal(name, 'Content-Type');
    assert.equal(value, 'application/json');
  }
  send(body: string) {
    if (networkError) throw new Error('Network unavailable');
    calls.push({ url: this.url, body: JSON.parse(body) });
    this.status = response.status;
    this.responseText = response.text;
  }
}
Object.defineProperty(globalThis, 'XMLHttpRequest', { configurable: true, writable: true, value: MockXHR });

function run() {
  try {
    const template = 'Hello, {{to_pascal_case name}}!';
    assert.equal(CallHbs(template, { name: 'prasad' }), 'Hello, Prasad!');
    assert.deepEqual(calls.pop(), {
      url: 'https://hbs.rndpro.in/render',
      body: { template, data: { name: 'prasad' } },
    });
    response = { text: JSON.stringify(['Hello, Prasad!', 'Hello, Monika!']), status: 200 };
    const items = [{ name: 'prasad' }, { name: 'monika' }];
    assert.deepEqual(CallHbs(template, items, true), ['Hello, Prasad!', 'Hello, Monika!']);
    assert.deepEqual(calls.pop(), { url: 'https://hbs.rndpro.in/multi', body: { template, data: items } });
    response = { text: '[]', status: 200 };
    assert.deepEqual(CallHbs(template, [], true), []);
    response = { text: 'PrasadMonika', status: 200 };
    assert.equal(CallHbs('{{#each this}}{{name}}{{/each}}', items), 'PrasadMonika');
    assert.equal(calls.pop()?.url, 'https://hbs.rndpro.in/render');
    response = { text: '', status: 200 };
    assert.equal(CallHbs('', {}), '');
    // data null / undefined returns the template unchanged, without any network request
    const before = calls.length;
    assert.equal(CallHbs(template, null), template);
    assert.equal(CallHbs(template, undefined), template);
    assert.deepEqual(CallHbs(template, null, true), [template]);
    assert.deepEqual(CallHbs(template, undefined, true), [template]);
    assert.equal(calls.length, before);
    const count = calls.length;
    for (const invalid of ['text', 42, true, [null], ['text'], [[]]]) {
      assert.throws(() => CallHbs(template, invalid as any), /JSON object/);
    }

    assert.throws(() => CallHbs(template, {}, true), /data must be an array/);
    assert.equal(calls.length, count);
    response = { text: 'render error at index 1: missing helper', status: 500 };
    assert.throws(() => CallHbs(template, items, true), /500.*render error at index 1/);
    response = { text: 'Cloudflare challenge', status: 403 };
    assert.throws(() => CallHbs(template, {}), /403.*Cloudflare challenge/);
    response = { text: '{}', status: 200 };
    assert.throws(() => CallHbs(template, items, true), /expected an array of strings/);
    networkError = true;
    assert.throws(() => CallHbs(template, {}), /Network unavailable/);
    delete (globalThis as any).XMLHttpRequest;
    assert.throws(() => CallHbs(template, {}), /requires a browser/);
    console.log('CallHbs tests passed');
  } finally {
    if (originalXHR) Object.defineProperty(globalThis, 'XMLHttpRequest', originalXHR);
    else delete (globalThis as any).XMLHttpRequest;
  }
}
run();
