import assert from 'node:assert/strict';
import { CsvToJson, JsonToCsv } from '../index';

function run() {
  assert.deepEqual(CsvToJson('name,city\nk7m2x9,Hyderabad'), [{ name: 'k7m2x9', city: 'Hyderabad' }]);
  assert.deepEqual(CsvToJson('name,city\r\nk7m2x9,Hyderabad\r\n'), [{ name: 'k7m2x9', city: 'Hyderabad' }]);
  assert.deepEqual(CsvToJson(''), []);
  assert.deepEqual(CsvToJson('name,city\n'), []);
  assert.deepEqual(CsvToJson('name,city'), []);

  // Quoted delimiter, doubled quotes, and embedded newlines (RFC 4180)
  assert.deepEqual(CsvToJson('name,note\n"Doe, John","He said ""hello"""'), [
    { name: 'Doe, John', note: 'He said "hello"' },
  ]);
  assert.deepEqual(CsvToJson('title,body\n"Line 1","first\nsecond"'), [
    { title: 'Line 1', body: 'first\nsecond' },
  ]);
  assert.deepEqual(
    CsvToJson('name,bio\nk7m2x9,"line1\nline2"\nn4t9pw,"a\nb\nc"\n"Doe, John","ok\r\nthere"'),
    [
      { name: 'k7m2x9', bio: 'line1\nline2' },
      { name: 'n4t9pw', bio: 'a\nb\nc' },
      { name: 'Doe, John', bio: 'ok\r\nthere' },
    ],
  );
  assert.deepEqual(CsvToJson('a,b,c\n"","x",'), [{ a: '', b: 'x', c: null }]);
  assert.deepEqual(CsvToJson('a,b\n1,2\n\n3,4'), [
    { a: '1', b: '2' },
    { a: '3', b: '4' },
  ]);

  // Custom delimiter
  assert.deepEqual(CsvToJson('name;city\nk7m2x9;Hyderabad', ';'), [{ name: 'k7m2x9', city: 'Hyderabad' }]);
  assert.deepEqual(CsvToJson('name\tcity\n"Doe, John"\tHyderabad', '\t'), [
    { name: 'Doe, John', city: 'Hyderabad' },
  ]);
  assert.deepEqual(CsvToJson('name||city\n"a||b"||Hyderabad', '||'), [{ name: 'a||b', city: 'Hyderabad' }]);

  // BOM and extra columns / missing cells
  assert.deepEqual(CsvToJson('\uFEFFname,city\nk7m2x9,Hyderabad'), [{ name: 'k7m2x9', city: 'Hyderabad' }]);
  assert.deepEqual(CsvToJson('name,city\nk7m2x9,Hyderabad,extra'), [{ name: 'k7m2x9', city: 'Hyderabad' }]);
  assert.deepEqual(CsvToJson('name,city,country\nk7m2x9,Hyderabad'), [
    { name: 'k7m2x9', city: 'Hyderabad', country: null },
  ]);

  const escaped = JsonToCsv([
    { name: 'Doe, John', note: 'He said "hello"' },
    { name: 'k7m2x9', note: 'line1\nline2' },
  ]);
  assert.equal(escaped, 'name,note\n"Doe, John","He said ""hello"""\nk7m2x9,"line1\nline2"');
  assert.deepEqual(CsvToJson(escaped), [
    { name: 'Doe, John', note: 'He said "hello"' },
    { name: 'k7m2x9', note: 'line1\nline2' },
  ]);

  const prettyJson = `[
  { "name": "k7m2x9", "note": "line1\\nline2" },
  { "name": "n4t9pw", "note": "hello\\r\\nworld" }
]`;
  assert.equal(
    JsonToCsv(prettyJson),
    'name,note\nk7m2x9,"line1\nline2"\nn4t9pw,"hello\r\nworld"',
  );
  assert.deepEqual(CsvToJson(JsonToCsv(prettyJson)), [
    { name: 'k7m2x9', note: 'line1\nline2' },
    { name: 'n4t9pw', note: 'hello\r\nworld' },
  ]);

  assert.equal(
    JsonToCsv([{ name: 'k7m2x9', city: 'Hyderabad' }, { name: 'n4t9pw' }]),
    'name,city\nk7m2x9,Hyderabad\nn4t9pw,',
  );
  assert.equal(JsonToCsv({ name: 'k7m2x9', city: 'Hyderabad' }), 'name,city\nk7m2x9,Hyderabad');
  assert.equal(JsonToCsv('[{"name":"k7m2x9","city":"Hyderabad"}]'), 'name,city\nk7m2x9,Hyderabad');
  assert.equal(JsonToCsv([{ name: 'k7m2x9', city: 'Hyderabad' }], ';'), 'name;city\nk7m2x9;Hyderabad');
  assert.equal(JsonToCsv([]), '');
  assert.equal(JsonToCsv(null), '');
  assert.equal(JsonToCsv(undefined), '');
  assert.deepEqual(CsvToJson(null), []);
  assert.deepEqual(CsvToJson(undefined), []);

  const withNulls = [{ a: 1, b: true, c: null, d: undefined, e: '' }];
  assert.equal(JsonToCsv(withNulls), 'a,b,c,d,e\n1,true,,,""');
  assert.deepEqual(CsvToJson(JsonToCsv(withNulls)), [
    { a: '1', b: 'true', c: null, d: null, e: '' },
  ]);
  assert.deepEqual(CsvToJson('a,b,c\n,,""'), [{ a: null, b: null, c: '' }]);
  assert.equal(JsonToCsv([{ a: 1 }, null, { a: 2 }]), 'a\n1\n\n2');
  assert.deepEqual(CsvToJson('a\n1\n\n2'), [{ a: '1' }, { a: null }, { a: '2' }]);

  assert.equal(JsonToCsv([{ a: 1, b: true, c: null, d: { n: 2 } }]), 'a,b,c,d\n1,true,,"{""n"":2}"');
  assert.deepEqual(CsvToJson(JsonToCsv([{ a: 1, b: true, c: null, d: { n: 2 } }])), [
    { a: '1', b: 'true', c: null, d: '{"n":2}' },
  ]);

  // Header that itself needs quoting
  assert.equal(JsonToCsv([{ 'he said "hi"': 'x', 'a,b': 'y' }]), '"he said ""hi""","a,b"\nx,y');
  assert.deepEqual(CsvToJson('"he said ""hi""","a,b"\nx,y'), [{ 'he said "hi"': 'x', 'a,b': 'y' }]);

  assert.throws(() => CsvToJson('"unterminated'), /unterminated quoted field/);
  assert.throws(() => CsvToJson('a,b', ''), /non-empty string/);
  assert.throws(() => CsvToJson('a,b', '"'), /cannot contain quotes/);
  assert.throws(() => JsonToCsv('not-json'), /valid JSON/);
  assert.throws(() => JsonToCsv([1, 2] as any), /array of objects/);
  assert.throws(() => CsvToJson(42 as any), /csv must be a string/);

  console.log('CSV tests passed');
}

run();
