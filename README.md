## Http

```
Http calls

**note: if url start with http then it ignoring API_BASE_URL, logic is given below.
>>>> url = url.startsWith('http') ? url : Http.API_BASE_URL + url;

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

  ASC: 'ASC',
  DESC: 'DESC',

  LTR: 'ltr',
  RTL: 'rtl',

  AM: 'AM',
  PM: 'PM',

  LIGHT: 'light',
  DARK: 'dark',

  MonthNames: [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  ],

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
  type?: string;
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
  type?: string;
};
```

## ResponseType

```
ResponseType = {
  status?: string | number;
  data?: any;
  error?: any;
  total?: number;
};

```

## SearchByLimitType
```
export type SearchByLimitType = {
  limit: number;
  skip: number;
  query?: Record<string, any>;
  orderBy?: string;
  order: "ASC" | "DESC";
};
```

## CountryType
```
export type CountryType = {
  code: string;           // ISO 3166-1 alpha-2
  name: string;           // English country name
  locale: string;         // Native/local language name
  googleNames: string[];  // Common names
  currencyCode: string;   // ISO 4217 currency code
  currency: string;       // Currency symbol
  telCode: number;        // Numeric only (no +)
  flag: string;           // Emoji flag
};
```

## LangDirType, OrderType, ThemeType, UnixTimestampType, OptionType, FileType
```
export type LangDirType = "ltr" | "rtl";
export type OrderType = "ASC" | "DESC";
export type ThemeType = "light" | "dark";
export type UnixTimestampType = number & { __brand: "UnixTimestamp" };

export type OptionType = {
  label: string;
  key: string | number;
  disabled?: boolean;
  icon?: string;
  lang?: Record<string, string>;
};

export type FileType = {
  filename: string;
  mimetype: string;
  url: string;
};
```
## LanguageType
```
export type LanguageType = {
  lang: string;        // Locale code (e.g., en-US, hi-IN)
  code: string;        // ISO 639-1 language code (e.g., en, hi)
  country: string;     // ISO 3166-1 alpha-2 country code (e.g., US, IN)
  name: string;        // English name of the language
  dir: "ltr" | "rtl";  // Text direction
  locale: string;      // Native name of the language
};
```
## LangCountryType
```
export type LangCountryType = {
  lang: string; // Locale code (e.g., en-US, hi-IN)
  country: string; // ISO 3166-1 alpha-2 country code (e.g., US, IN)
  name: string; // English name of the language
  locale: string; // Native name of the language
  currencyCode: string; // ISO 4217 currency code
  currency: string; // Currency symbol
  telCode: number; // Numeric only (no +)
  flag: string; // Emoji flag
  dir: "ltr" | "rtl"; // Text direction
};
```

## Types
```
export type ResponseType = {
  status?: string | number;
  data?: any;
  error?: any;
};

export type SearchByType = {
  query?: Record<string, any>;
  orderBy?: string;
  order?: "ASC" | "DESC";
  searchTerm?: string;
};

export type PaginationResponseType = {
  status?: string | number;
  data?: any;
  error?: any;
  total?: number;
  skip?: number;
  limit?: number;
};

export type SearchByLimitType = {
  limit: number;
  skip: number;
  query?: Record<string, any>;
  orderBy?: string;
  order?: "ASC" | "DESC";
  searchTerm?: string;
};
```



## ConstMessages

```
export const ConstMessages = {
  // Validation messages
  REQUIRED: 'Required',
  MIN_LENGTH_REQUIRED: 'Minimum length required',
  MAX_LENGTH_EXCEED: 'Maximum length exceeded',
  INVALID_DATA: 'Invalid data',
  FIELD_MUST_BE_NUMERIC: 'This field must be numeric',
  FIELD_MUST_BE_ALPHABETIC: 'This field must contain only letters',
  FIELD_MUST_BE_ALPHANUMERIC: 'This field must contain only letters and numbers',
  INVALID_EMAIL: 'Invalid email format',
  INVALID_PHONE: 'Invalid phone number',
  PASSWORD_TOO_WEAK: 'Password is too weak',
  PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
  INVALID_DATE_FORMAT: 'Invalid date format',
  DATE_OUT_OF_RANGE: 'Date is out of acceptable range',
  VALUE_TOO_LOW: 'Value is too low',
  VALUE_TOO_HIGH: 'Value is too high',
  EXCEEDS_MAX_CHARACTERS: 'Exceeds maximum character limit',
  INVALID_URL: 'Invalid URL format',
  INVALID_ZIP_CODE: 'Invalid zip/postal code',
  ONLY_POSITIVE_NUMBERS: 'Only positive numbers are allowed',
  INVALID_CREDIT_CARD: 'Invalid credit card number',
  INVALID_FILE_TYPE: 'Unsupported file type',
  FILE_TOO_LARGE: 'File size exceeds the maximum limit',

  // Success messages
  SUCCESS: 'Operation completed successfully',
  SAVED_SUCCESSFULLY: 'Data saved successfully',
  UPDATED_SUCCESSFULLY: 'Data updated successfully',
  DELETED_SUCCESSFULLY: 'Data deleted successfully',
  SUBMITTED_SUCCESSFULLY: 'Form submitted successfully',
  EMAIL_SENT: 'Email sent successfully',
  PASSWORD_CHANGED: 'Password changed successfully',
  LOGGED_IN: 'Logged in successfully',
  LOGGED_OUT: 'Logged out successfully',
  UPLOAD_SUCCESSFUL: 'File uploaded successfully',
  PAYMENT_SUCCESSFUL: 'Payment processed successfully',
  DATA_FETCHED: 'Data fetched successfully',
  DATA_LOADED: 'Data loaded successfully',
  ACTION_COMPLETED: 'Action completed successfully',

  // Error messages
  WENT_WRONG: 'Something went wrong, please try again',
  NOT_FOUND: 'Requested resource not found',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  FORBIDDEN: 'Access to this resource is forbidden',
  SERVER_ERROR: 'Internal server error, please contact support',
  CONNECTION_ERROR: 'Unable to connect, please check your internet connection',
  TIMEOUT_ERROR: 'The request timed out, please try again later',
  VALIDATION_FAILED: 'Validation failed, please check the input',
  DUPLICATE_ENTRY: 'Duplicate entry, please provide unique data',
  SESSION_EXPIRED: 'Your session has expired, please log in again',
  INVALID_SESSION: 'Invalid session, please authenticate',
  RATE_LIMIT_EXCEEDED: 'Too many requests, please try again later',
  RESOURCE_LOCKED: 'This resource is currently locked',
  DATA_CORRUPTED: 'Data is corrupted',
  SERVICE_UNAVAILABLE: 'Service is currently unavailable',
  PAYMENT_FAILED: 'Payment failed, please check your details',
  OPERATION_FAILED: 'Operation failed, please try again',
  ACCESS_DENIED: 'Access denied',
  INVALID_CREDENTIALS: 'Invalid credentials, please try again',
  INVALID_TOKEN: 'Invalid token, please try again',
  USER_NOT_FOUND: 'User not found, please try again',
  PASSWORD_RESET_FAILED: 'Password reset failed, please try again',

  // Informational Messages
  NO_DATA_FOUND: 'No data found',
  NO_RECORD_FOUND: 'No record found',
  NO_RECORDS_FOUND: 'No records found',
  NO_RECORDS_MATCHED: 'No records matched your search criteria',
  NO_RECORDS_MATCHED_FILTER: 'No records matched your filter criteria',
  LOADING: 'Loading, please wait...',
  FETCHING_DATA: 'Fetching data, please wait...',
  PROCESSING: 'Processing your request...',
  PLEASE_WAIT: 'Please wait...',
  NO_RESULTS_FOUND: 'No results found',
  NO_DATA_AVAILABLE: 'No data available',
  SEARCHING: 'Searching...',
  REDIRECTING: 'Redirecting, please wait...',
  CONNECTING: 'Connecting, please wait...',
  LOGGING_OUT: 'Logging out, please wait...',
  LOGGING_IN: 'Logging in, please wait...',
  PREPARING_DOWNLOAD: 'Preparing your download...',
  CHECKING_UPDATES: 'Checking for updates...',

  // Confirmation Messages
  CONFIRM_DELETE: 'Are you sure you want to delete this?',
  CONFIRM_SAVE: 'Do you want to save changes?',
  CONFIRM_SUBMIT: 'Do you want to submit this form?',
  CONFIRM_LOGOUT: 'Are you sure you want to log out?',
  CONFIRM_ACTION: 'Are you sure you want to proceed?',
  CONFIRM_CLOSE: 'Are you sure you want to close this window?',
  CONFIRM_CANCEL: 'Do you want to cancel this action?',
  CONFIRM_RESTART: 'Do you want to restart the process?',

  // Warning Messages
  UNSAVED_CHANGES: 'You have unsaved changes. Do you want to discard them?',
  LOW_BATTERY: 'Battery level is low, please connect your charger',
  HIGH_USAGE: 'High system usage detected',
  INCOMPLETE_FORM: 'The form is incomplete',
  LIMIT_REACHED: 'You have reached the maximum limit',
  OUTDATED_VERSION: 'You are using an outdated version of the application',

  // General Messages
  WELCOME: 'Welcome to the application',
  GOODBYE: 'Goodbye, have a great day!',
  HELLO: 'Hello, how can we help you today?',
  THANK_YOU: 'Thank you for using our service',
  TRY_AGAIN: 'Please try again',
  UNDER_MAINTENANCE: 'The system is under maintenance, please check back later',
  FEATURE_COMING_SOON: 'This feature is coming soon',
  CONTACT_SUPPORT: 'If the issue persists, please contact support',
  UPDATING: 'Updating, please wait...',
  INSTALLING: 'Installing, please wait...',
  RESTART_REQUIRED: 'A restart is required to apply changes',
  RESTARTING: 'Restarting, please wait...',
  LOADING_DATA: 'Loading data, please wait...',
  SAVING: 'Saving, please wait...',
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

### Call LangText, CallLangCountry, CurrencyConvert,
```
// bun run src/tests/util.ts

import { CurrencyConvert, LangCountryCode } from "../main/util";

const CallLangCountry = () => {
  const lang = "en-US";
  const country = LangCountryCode(lang);
  console.log("LangCountryCode:: ", country);
};

const CallLangText = async () => {
  const resp = await LangText("Hello, how are you?", "en-US", "te-IN");
  console.log("Resp Kannada:: ", resp);
}

const CallCurrencyConvert = async () => {
  const resp = await CurrencyConvert("INR", "USD");
  console.log("Resp Currency:: ", resp);
}

import { LangText } from "../main/util";

const run = async () => {
  await CallLangCountry();
  await CallLangText();
  await CallCurrencyConvert();
};

run();

```

### Type AllLanguageCodesType
```
export type AllLanguageCodesType =
  | "ps-AF"
  | "sq-AL"
  | "ar-DZ"
  | "ca-AD"
  | "pt-AO"
  | "en-AG"
  | "es-AR"
  | "hy-AM"
  | "en-AU"
  | "de-AT"
  | "az-AZ"
  | "en-BS"
  | "ar-BH"
  | "bn-BD"
  | "en-BB"
  | "be-BY"
  | "nl-BE"
  | "en-BZ"
  | "fr-BJ"
  | "dz-BT"
  | "es-BO"
  | "bs-BA"
  | "en-BW"
  | "pt-BR"
  | "ms-BN"
  | "bg-BG"
  | "fr-BF"
  | "rn-BI"
  | "pt-CV"
  | "km-KH"
  | "fr-CM"
  | "en-CA"
  | "fr-CF"
  | "fr-TD"
  | "es-CL"
  | "zh-CN"
  | "es-CO"
  | "ar-KM"
  | "fr-CG"
  | "fr-CD"
  | "es-CR"
  | "fr-CI"
  | "hr-HR"
  | "es-CU"
  | "el-CY"
  | "cs-CZ"
  | "da-DK"
  | "fr-DJ"
  | "en-DM"
  | "es-DO"
  | "es-EC"
  | "ar-EG"
  | "es-SV"
  | "es-GQ"
  | "ti-ER"
  | "et-EE"
  | "si-SZ"
  | "am-ET"
  | "en-FJ"
  | "fi-FI"
  | "fr-FR"
  | "fr-GA"
  | "en-GM"
  | "ka-GE"
  | "de-DE"
  | "en-GH"
  | "el-GR"
  | "en-GD"
  | "es-GT"
  | "fr-GN"
  | "pt-GW"
  | "en-GY"
  | "fr-HT"
  | "es-HN"
  | "hu-HU"
  | "is-IS"
  | "hi-IN"
  | "kn-IN"
  | "ta-IN"
  | "te-IN"
  | "bn-IN"
  | "mr-IN"
  | "gu-IN"
  | "ml-IN"
  | "pa-IN"
  | "or-IN"
  | "as-IN"
  | "id-ID"
  | "fa-IR"
  | "ar-IQ"
  | "ga-IE"
  | "he-IL"
  | "it-IT"
  | "en-JM"
  | "ja-JP"
  | "ar-JO"
  | "kk-KZ"
  | "sw-KE"
  | "en-KI"
  | "ko-KP"
  | "ko-KR"
  | "ar-KW"
  | "ky-KG"
  | "lo-LA"
  | "lv-LV"
  | "ar-LB"
  | "st-LS"
  | "en-LR"
  | "ar-LY"
  | "de-LI"
  | "lt-LT"
  | "fr-LU"
  | "mg-MG"
  | "ny-MW"
  | "ms-MY"
  | "dv-MV"
  | "fr-ML"
  | "mt-MT"
  | "en-MH"
  | "ar-MR"
  | "en-MU"
  | "es-MX"
  | "en-FM"
  | "ro-MD"
  | "fr-MC"
  | "mn-MN"
  | "sr-ME"
  | "ar-MA"
  | "pt-MZ"
  | "my-MM"
  | "en-NA"
  | "en-NR"
  | "ne-NP"
  | "nl-NL"
  | "en-NZ"
  | "es-NI"
  | "fr-NE"
  | "en-NG"
  | "yo-NG"
  | "ha-NG"
  | "ig-NG"
  | "en-NU"
  | "nb-NO"
  | "ar-OM"
  | "ur-PK"
  | "en-PW"
  | "ar-PS"
  | "es-PA"
  | "en-PG"
  | "es-PY"
  | "es-PE"
  | "tl-PH"
  | "pl-PL"
  | "pt-PT"
  | "ar-QA"
  | "ro-RO"
  | "ru-RU"
  | "rw-RW"
  | "en-KN"
  | "en-LC"
  | "en-VC"
  | "sm-WS"
  | "it-SM"
  | "pt-ST"
  | "ar-SA"
  | "fr-SN"
  | "sr-RS"
  | "en-SC"
  | "en-SL"
  | "en-SG"
  | "sk-SK"
  | "sl-SI"
  | "en-SB"
  | "so-SO"
  | "af-ZA"
  | "en-SS"
  | "es-ES"
  | "si-LK"
  | "ar-SD"
  | "nl-SR"
  | "sv-SE"
  | "de-CH"
  | "ar-SY"
  | "tg-TJ"
  | "sw-TZ"
  | "th-TH"
  | "pt-TL"
  | "fr-TG"
  | "to-TO"
  | "en-TT"
  | "ar-TN"
  | "tr-TR"
  | "tk-TM"
  | "en-TV"
  | "en-UG"
  | "uk-UA"
  | "ar-AE"
  | "en-GB"
  | "en-US"
  | "es-UY"
  | "uz-UZ"
  | "bi-VU"
  | "it-VA"
  | "es-VE"
  | "vi-VN"
  | "ar-YE"
  | "en-ZM"
  | "en-ZW";
```

###  Available methods TruncateText, DateTime24HrFormat,DateTime12HrFormat, DateAndTime, TimeAgo

### Case
```
toCamelCase("user_name")       // "userName"
toCamelCase("user-name")       // "userName"
toCamelCase("User Name")       // "userName"
toCamelCase("USER_NAME")       // "userName"

toSnakeCase("userName")        // "user_name"
toSnakeCase("UserName")        // "user_name"
toSnakeCase("user name")       // "user_name"
toSnakeCase("user-name")       // "user_name"

toLowerCase("userName")       // "user_name"
toLowerCase("UserName")       // "user_name"
toLowerCase("user-name")      // "user_name"

toUpperCase("userName")       // "USER_NAME"
toUpperCase("user name")      // "USER_NAME"
toUpperCase("user-name")      // "USER_NAME"
toUpperCase("UserName")       // "USER_NAME"

toPascalCase("user_name")      // "UserName"
toPascalCase("user name")      // "UserName"
toPascalCase("user-name")      // "UserName"
toPascalCase("USER_NAME")      // "UserName"

input:
    const mongoDoc = {
      _id: 'abc123',
      user_name: 'prasad',
      address_info: {
        city_name: 'hyderabad'
      }
    };

toViewMapper(mongoDoc) -->
{
  id: 'abc123',
  userName: 'prasad',
  addressInfo: {
    cityName: 'hyderabad'
  }
}


const viewObj = {
  id: 'abc123',
  userName: 'prasad',
  addressInfo: {
    cityName: 'hyderabad'
  }
}

toEntityMapper(viewObj) -->
{
  id: 'abc123',
  user_name: 'prasad',
  address_info: {
    city_name: 'hyderabad'
  }
}

toSchemaMapper(viewObj)  -->
{
  _id: 'abc123',
  user_name: 'prasad',
  address_info: {
    city_name: 'hyderabad'
  }
}

```