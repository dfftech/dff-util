## Http

```
Http calls
```

## util

```
=> Random number generate.
AppRandomString(length, charset);

=> Generate code with Upper case without special char
AppUniqueCode();

=> Key give Upper case without special char by type
AppCodeByType(name, type);

=> Key give Upper case without special char
AppCode(name);

AppDaysBack(date, addDays, isDays);

AppAddDays(date, addDays, isDays);

AppUUID4();
```

## JWT

#### Encode JWT Token with secret key, expiresIn in seconds (86400 = 1 day) default

```
JwtEncode(data, secret, expiresIn);
```

#### Deocde JWT Token

```
JwtDecode(token);
```

#### Verify JWT token with secret

```
JwtVerify(data, secret);
```

#### Check token expires or not

```
JwtValid(token);
```

#### JWT examples

```
import { JwtEncode, JwtVerify, JwtDecode, JwtValid } from '../src/index';

const runJwtExamples = async () => {
  const secret = 'your-secret-key';
  const payload = { userId: '123', role: 'admin' };

  // 1. Encode a JWT
  const token = await JwtEncode(payload, secret, 3600);
  console.log('Encoded JWT Token:', token);

  // 2. Verify the JWT
  try {
    const verifiedPayload = await JwtVerify(token, secret);
    console.log('Verified Payload:', verifiedPayload);
  } catch (error: any) {
    console.error('Verification Error:', error.message);
  }

  // 3. Decode the JWT without verification
  const decodedPayload = JwtDecode(token);
  console.log('Decoded Payload (without verification):', decodedPayload);

  // 4. Check if the JWT is valid
  const isValid = JwtValid(token);
  console.log('Is JWT valid:', isValid);
};

runJwtExamples();

```

## Constant Values

```
ConstValue = {
  // Logical operators
  AND: '&&',
  OR: '||',
  NOT: '!',

  // Common special characters
  AT: '@',
  HASH: '#',
  DOLLAR: '$',
  PERCENT: '%',
  CARET: '^',
  AMPERSAND: '&',
  ASTERISK: '*',
  TILDE: '~',
  COLON: ':',
  SEMICOLON: ';',
  DOUBLE_QUOTE: '"',
  SINGLE_QUOTE: "'",
  COMMA: ',',
  PERIOD: '.',
  SLASH: '/',
  QUESTION_MARK: '?',
  PLUS: '+',
  UNDERSCORE: '_',
  HYPHEN: '-',
  EQUALS: '=',
  BACKSLASH: '\\',
  PIPE: '|',

  // Space
  SPACE: ' ',
  EMPTY: '',

  // Other
  TRUE: 'true',
  FALSE: 'false',
  NULL: 'null',
  UNDEFINED: 'undefined',

  STR_AND: 'AND',
  STR_OR: 'OR',
  STR_NOT: 'NOT',
};
```

## Regx

```
RegExp = {
  // Matches any non-alphanumeric characters
  NON_ALPHA_NUMERIC: /[^\w\s]/g,

  // Matches only numeric digits (0-9)
  DIGITS_ONLY: /^\d+$/,

  // Matches only alphabets (case-insensitive)
  ALPHABETS_ONLY: /^[a-zA-Z]+$/,

  // Matches alphanumeric characters (letters and digits)
  ALPHA_NUMERIC: /^[a-zA-Z0-9]+$/,

  // Matches an email address
  EMAIL: /^[\w.%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,

  // Matches a URL
  URL: /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6}\.?)(\/[\w.-]*)*\/?$/i,

  // Matches a US phone number (formats like (123) 456-7890, 123-456-7890, etc.)
  PHONE_US: /^(\(\d{3}\)\s?|\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}$/,

  // Matches a password with at least one lowercase, one uppercase, one digit, and one special character
  STRONG_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,

  // Matches whitespace characters
  WHITESPACE: /\s+/g,

  // Matches any HTML tags
  HTML_TAG: /<\/?[\w\s="/.':;#-\/\?]+>/gi,

  // Matches IPv4 addresses
  IPV4: /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/,

  // Matches dates in YYYY-MM-DD format
  DATE_YYYY_MM_DD: /^\d{4}-\d{2}-\d{2}$/,

  // Matches time in HH:MM 24-hour format
  TIME_HH_MM: /^([01]\d|2[0-3]):([0-5]\d)$/,

  // Matches ISO 8601 datetime format (e.g., 2023-08-15T13:45:30Z, 2023-08-15T13:45:30+05:30)
  ISO_DATETIME: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/,

  // Matches a hexadecimal color code
  HEX_COLOR: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,

  // Matches a UUID (version 4)
  UUID_V4: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,

  // Matches non-ASCII characters
  NON_ASCII: /[^\x00-\x7F]/g,

  // Matches line breaks (newlines)
  LINE_BREAK: /\r?\n/g,

  // Matches amounts in decimal format (e.g., 123.45, 0.99, 1000)
  AMOUNT_DECIMAL: /^\d+(\.\d{1,2})?$/,

  // Matches percentages from 0-100 or in decimal format (e.g., 25%, 99.99%, 100, 0.5)
  PERCENTAGE: /^(100(\.0{1,2})?|0|0?\.\d{1,2}|[1-9]?\d(\.\d{1,2})?)%?$/,
};
```

## Session Info

```
export type SessionInfo = {
  id: string;
  email?: string;
  mobile?: string;
  name?: string;
  roles: string[];
  requestId?: string;
  token?: string;
  iat?: number;
  exp?: number;
  key: string;
};
```

## SessionUser

```
export type SessionUser = {
  id: string;
  email?: string;
  mobile?: string;
  name?: string;
  roles: string[];
};
```

## ResponseType

```
ResponseType = {
  status?: string | number;
  data?: any;
  error?: any;
};

```

## file upload test

```
// ts-node test/fileupload.ts

import fs from 'fs/promises';
import { Http } from '../src';
import path from 'path';

const url = '/file';
const filename = 'testing2.xlsx';
const filePath = path.join(__dirname, filename);
console.log(filePath);
const main = async () => {
  const data = await fs.readFile(filePath);
  const resp = await Http.Upload(
    url,
    new File([data], filePath, {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      lastModified: Date.now(),
    }),
  );
  console.log('Http.Upload :: ', resp);
};

main();
```

## crypto

```
const hexStringToArrayBuffer = (hex: string) => {
  const hexMatches = hex.match(/.{1,2}/g) || [];
  const typedArray = new Uint8Array(hexMatches.map((byte) => parseInt(byte, 16)));
  return typedArray.buffer;
};

export const Decrypt = async (text: string, key: string) => {
  const [ivHex, dataHex] = text.split(':');
  const iv = hexStringToArrayBuffer(ivHex);
  const data = hexStringToArrayBuffer(dataHex);
  const alg = { name: 'AES-CBC', iv: iv };
  const cryptoKey = await crypto.subtle.importKey('raw', hexStringToArrayBuffer(key), alg, false, ['decrypt']);
  const decrypted = await crypto.subtle.decrypt(alg, cryptoKey, data);
  const dec = new TextDecoder();
  return dec.decode(decrypted);
};
```

```
import * as crypto from 'crypto';
export const Encrypt = (text: string, key: string) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};
```

```
// ts-node test/test.ts
import crypto from 'crypto';

import { Encrypt, Decrypt } from '../src/index';

//const key = crypto.randomBytes(32).toString('hex');
const key = '7e0a0ef142de22eb787b5001b36f188f3e7378abf250fc87bf38a4bda197236ef';

console.log(key);

const password = Encrypt('Admin!Admin', key);

console.log(password);

const main = async () => {
  const resp = await Decrypt(password, key);
  console.log(resp);
};

main();
```
