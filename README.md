# dff-util

Utilities for HTTP requests, JWT tokens, application constants, shared types, text formatting, and data conversion.

Select a topic below to view its reference and examples.

**[Utilities](#utilities)**

|  |  |  |  |  |  |  |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| [AppRandomString](#general-utilities) | [AppUniqueCode](#general-utilities) | [AppCodeByType](#general-utilities) | [AppCode](#general-utilities) | [AppDaysBack](#general-utilities) | [AppAddDays](#general-utilities) | [AppUUID4](#general-utilities) |
| [TruncateText](#text-and-date-formatting) | [DateTime24HrFormat](#text-and-date-formatting) | [DateTime12HrFormat](#text-and-date-formatting) | [DateAndTime](#text-and-date-formatting) | [TimeAgo](#text-and-date-formatting) | [toCamelCase](#case-conversion-and-object-mapping) | [toSnakeCase](#case-conversion-and-object-mapping) |
| [toLowerCase](#case-conversion-and-object-mapping) | [toUpperCase](#case-conversion-and-object-mapping) | [toPascalCase](#case-conversion-and-object-mapping) | [toViewMapper](#case-conversion-and-object-mapping) | [toEntityMapper](#case-conversion-and-object-mapping) | [toSchemaMapper](#case-conversion-and-object-mapping) | [QueryCond](#query-conditions-querycond) |

**[Http](#http)**

|  |  |  |  |  |  |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [Get](#json-requests) | [Post](#json-requests) | [Put](#json-requests) | [Delete](#json-requests) | [Token](#retrieve-a-token) | [FormUpload](#multipart-form-upload) |
| [CloudUpload](#upload-a-file-directly) | [FileDownload](#download-a-file) | [HttpHeaders](#headers-and-request-ids) | [BaseHeaders](#headers-and-request-ids) | [RespType](#response-formats) | [ErrorWrapper](#handle-errors) |

**[Call Api](#call-api)**

|  |  |  |
| :--- | :--- | :--- |
| [CallHbs](#handlebars-rendering-callhbs) | [CallLangText](#language-translation-calllangtext) | [CallCurrencyConvert](#currency-conversion-callcurrencyconvert) |

**[Tokens and encryption](#tokens-and-encryption)**

|  |  |  |  |  |  |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [JwtEncode](#encode-a-token) | [JwtDecode](#decode-a-token) | [JwtVerify](#verify-a-token-with-a-secret) | [JwtValid](#check-token-expiration) | [Encrypt](#encryption-and-encoding) | [Decrypt](#encryption-and-encoding) |
| [EncodeBase64](#base64-url-and-safe-encoding) | [DecodeBase64](#base64-url-and-safe-encoding) | [EncodeURL](#base64-url-and-safe-encoding) | [DecodeURL](#base64-url-and-safe-encoding) | [SafeEncode](#base64-url-and-safe-encoding) | [SafeDecode](#base64-url-and-safe-encoding) |

**[Language and country reference](#language-and-country-reference)**

|  |  |  |  |  |  |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [LangCountryCode](#language-and-country-lookup-langcountrycode) | [CountryType](#country-data-countrytype) | [Countries](#country-list) | [LanguageType](#language-metadata-languagetype) | [LangCountryType](#language-and-country-metadata-langcountrytype) | [AllLanguageCodesType](#supported-language-codes-alllanguagecodestype) |

**[Shared types](#shared-types)**

|  |  |  |  |  |
| :--- | :--- | :--- | :--- | :--- |
| [LangDirType](#common-types) | [OrderType](#common-types) | [ThemeType](#common-types) | [UnixTimestampType](#common-types) | [OptionType](#common-types) |
| [FileType](#common-types) | [ResponseType](#request-and-response-types) | [SearchType](#request-and-response-types) | [KeyValueType](#request-and-response-types) | [JsonValueType](#request-and-response-types) |
| [RequestBodyType](#request-and-response-types) | [RequestQueryType](#request-and-response-types) | [RequestByIdType](#request-and-response-types) | [SessionUser](#session-user-sessionuser) | [SessionInfo](#session-information-sessioninfo) |

**[Constants and validation](#constants-and-validation)**

|  |  |  |
| :--- | :--- | :--- |
| [ConstValue](#constants-constvalue) | [ConstMessages](#application-messages-constmessages) | [RegExp](#regular-expressions-regexp) |

## Utilities

### General utilities

```typescript
// Generate a random string with the given length and character set.
AppRandomString(length, charset);

// Generate an uppercase code.
AppUniqueCode();

// Generate an uppercase key using a type or generated suffix.
AppCodeByType(name, type);

// Convert a name to an uppercase key with underscore separators.
AppCode(name);

AppDaysBack(date, addDays, isDays);

AppAddDays(date, addDays, isDays);

AppUUID4();
```

### Text and date formatting

Available helpers:

- `TruncateText`
- `DateTime24HrFormat`
- `DateTime12HrFormat`
- `DateAndTime`
- `TimeAgo`

### Case conversion and object mapping

#### String case conversion

| Function | Purpose | Input → output examples |
| :--- | :--- | :--- |
| `toCamelCase` | Join words in camel case | `user_name` → `userName`; `user-name` → `userName`; `User Name` → `userName`; `USER_NAME` → `uSERNAME` |
| `toSnakeCase` | Separate words with underscores and lowercase | `userName` → `user_name`; `UserName` → `user_name`; `user name` → `user_name`; `user-name` → `user_name` |
| `toLowerCase` | Convert word separators to underscores and lowercase | `user-name` → `user_name`; `userName` → `user__name`; `UserName` → `user__name` |
| `toUpperCase` | Convert word separators to underscores and uppercase | `user-name` → `USER_NAME`; `user name` → `USER_NAME`; `userName` → `USER__NAME`; `UserName` → `USER__NAME` |
| `toPascalCase` | Capitalize each separated word and join | `user_name` → `UserName`; `user name` → `UserName`; `user-name` → `UserName`; `USER_NAME` → `UserName` |

These examples reflect the current implementation. `toCamelCase` preserves internal uppercase letters; `toLowerCase` and `toUpperCase` can produce double underscores before uppercase letters.

#### Object mapping

| Function | Key conversion | Example input | Example output |
| :--- | :--- | :--- | :--- |
| `toViewMapper` | Convert keys to camel case and `_id` to `id` recursively | `{ _id: 'abc123', user_name: 'prasad', address_info: { city_name: 'hyderabad' } }` | `{ id: 'abc123', userName: 'prasad', addressInfo: { cityName: 'hyderabad' } }` |
| `toEntityMapper` | Convert keys to snake case recursively; preserve `id` | `{ id: 'abc123', userName: 'prasad', addressInfo: { cityName: 'hyderabad' } }` | `{ id: 'abc123', user_name: 'prasad', address_info: { city_name: 'hyderabad' } }` |
| `toSchemaMapper` | Convert top-level `id` to `_id` and keys to snake case; nested values use `toEntityMapper` | `{ id: 'abc123', userName: 'prasad', addressInfo: { cityName: 'hyderabad' } }` | `{ _id: 'abc123', user_name: 'prasad', address_info: { city_name: 'hyderabad' } }` |

All three preserve language maps whose keys are recognized language codes. Primitive and non-plain-object values are returned unchanged. `toViewMapper` and `toEntityMapper` process array items recursively; `toSchemaMapper` uses `toEntityMapper` for array items, so their `id` keys remain `id`.

### Query conditions (QueryCond)

Parse a filter expression into an array of conditions. The example below includes comparison, membership, null, range, text, and existence filters.

```typescript
 const got = QueryCond(input);

 example:
QueryCond input: isApproved=true,status!=false,age>18,score<100,height>=170,weight<=80,type=["accept","inprogress"],type!=["accept","inprogress"],role in ["admin","editor"],role not in ["admin","editor"],role notin ["admin","editor"],deletedAt is null,deletedAt is not null,deletedAt isnull,updatedAt isnotnull,deletedAt=null,deletedAt!=null,age between [18,30],createdAt between 2020-01-01..2020-01-31,name like "Jo%",email ilike "%@gmail.com",title contains "hello",code startswith "AB",code endswith "99",path regex "^/api/.*$",archivedAt,!archivedAt,name="a,b",meta={"a":1,"b":true},tags=["x,y","z"]
QueryCond output: [
  {
    "key": "isApproved",
    "opt": "=",
    "value": true
  },
  {
    "key": "status",
    "opt": "!=",
    "value": false
  },
  {
    "key": "age",
    "opt": ">",
    "value": 18
  },
  {
    "key": "score",
    "opt": "<",
    "value": 100
  },
  {
    "key": "height",
    "opt": ">=",
    "value": 170
  },
  {
    "key": "weight",
    "opt": "<=",
    "value": 80
  },
  {
    "key": "type",
    "opt": "in",
    "value": [
      "accept",
      "inprogress"
    ]
  },
  {
    "key": "type",
    "opt": "not in",
    "value": [
      "accept",
      "inprogress"
    ]
  },
  {
    "key": "role",
    "opt": "in",
    "value": [
      "admin",
      "editor"
    ]
  },
  {
    "key": "role",
    "opt": "not in",
    "value": [
      "admin",
      "editor"
    ]
  },
  {
    "key": "role",
    "opt": "not in",
    "value": [
      "admin",
      "editor"
    ]
  },
  {
    "key": "deletedAt",
    "opt": "is null",
    "value": null
  },
  {
    "key": "deletedAt",
    "opt": "is not null",
    "value": null
  },
  {
    "key": "deletedAt",
    "opt": "is null",
    "value": null
  },
  {
    "key": "updatedAt",
    "opt": "is not null",
    "value": null
  },
  {
    "key": "deletedAt",
    "opt": "is null",
    "value": null
  },
  {
    "key": "deletedAt",
    "opt": "is not null",
    "value": null
  },
  {
    "key": "age",
    "opt": "between",
    "value": [
      18,
      30
    ]
  },
  {
    "key": "createdAt",
    "opt": "between",
    "value": [
      "2020-01-01",
      "2020-01-31"
    ]
  },
  {
    "key": "name",
    "opt": "like",
    "value": "Jo%"
  },
  {
    "key": "email",
    "opt": "ilike",
    "value": "%@gmail.com"
  },
  {
    "key": "title",
    "opt": "contains",
    "value": "hello"
  },
  {
    "key": "code",
    "opt": "startswith",
    "value": "AB"
  },
  {
    "key": "code",
    "opt": "endswith",
    "value": "99"
  },
  {
    "key": "path",
    "opt": "regex",
    "value": "^/api/.*$"
  },
  {
    "key": "archivedAt",
    "opt": "exists",
    "value": true
  },
  {
    "key": "archivedAt",
    "opt": "exists",
    "value": false
  },
  {
    "key": "name",
    "opt": "=",
    "value": "a,b"
  },
  {
    "key": "meta",
    "opt": "=",
    "value": {
      "a": 1,
      "b": true
    }
  },
  {
    "key": "tags",
    "opt": "in",
    "value": [
      "x,y",
      "z"
    ]
  }
]
```

## Http

### HTTP requests

`Http` provides static helpers built on `fetch` for JSON requests, token retrieval, uploads, and downloads. Use a runtime that provides `fetch`, `FormData`, and `File` for the corresponding operations. Examples using `await` belong in an async function or a module that supports top-level await.

#### Configuration

```typescript
import { Http, HttpHeaders, RespType } from 'dff-util';

Http.API_BASE_URL = 'https://api.example.com'; // Default: empty string
Http.TOKEN_URL = '/apisix/plugin/jwt/sign'; // Default token endpoint

// Create a fresh headers object for each request.
const createHeaders = () => ({
  ...HttpHeaders,
  authorization: 'Bearer YOUR_ACCESS_TOKEN',
});
```

`Get`, `Post`, `Put`, `Delete`, and `FormUpload` prepend `API_BASE_URL` unless the URL starts with `http`. Paths are concatenated directly, so use a base URL without a trailing slash and a path beginning with `/`.

`Token` always joins `API_BASE_URL` and `TOKEN_URL`. `CloudUpload` and `FileDownload` use the supplied URL directly.

#### Methods

| Method | Arguments, in order | Result |
| :--- | :--- | :--- |
| `Get` | `url, params, headers, type = RespType.JSON` | Parsed response |
| `Post` | `url, data, headers, type = RespType.JSON` | Parsed response |
| `Put` | `url, data, headers, type = RespType.JSON` | Parsed response |
| `Delete` | `url, params, headers, type = RespType.JSON` | Parsed response |
| `Token` | `sessionInfo, appKey, apiKey?, type = RespType.TEXT` | Token text by default |
| `FormUpload` | `url, file, isHeadersAddMultiForm = false, data = {}, headers = BaseHeaders, method = 'PUT', type = RespType.JSON` | Parsed response |
| `CloudUpload` | `fullUrl, file, headers = null, method = 'PUT'` | Raw `Response` |
| `FileDownload` | `fullUrl, params, headers = HttpHeaders, method = 'GET'` | `Blob` |

For `Get` and `Delete`, pass `null` when no query parameters are needed. For the four JSON request methods, pass `null` for headers to use `HttpHeaders`; these positional arguments are required in the TypeScript signatures. Upload methods accept `'POST'` or `'PUT'`.

#### Headers and request IDs

- `HttpHeaders` contains `Content-Type: application/json`, plus `authorization` and `request-id` initialized to `null`.
- `BaseHeaders` contains the same authorization and request ID fields without a content type, for multipart uploads.
- Custom headers replace the defaults; spread `HttpHeaders` when you want to retain the JSON content type.
- Each helper assigns `request-id` when the supplied header value is missing or falsy. An existing ID is preserved.
- Headers are mutated when an ID is assigned. Reusing a headers object, including the shared defaults, can reuse that ID. Pass a fresh object for each request when you want distinct IDs.

#### JSON requests

```typescript
const users = await Http.Get(
  '/users',
  { limit: 10, skip: 0, searchTerm: 'Jane Doe' },
  createHeaders(),
);

const user = await Http.Get('/users/123', null, createHeaders());

const created = await Http.Post(
  '/users',
  { name: 'Jane Doe', email: 'jane@example.com' },
  createHeaders(),
);

const updated = await Http.Put(
  '/users/123',
  { name: 'Jane Smith' },
  createHeaders(),
);

// TEXT also works for an endpoint returning an empty success body.
const deleted = await Http.Delete(
  '/users/123',
  null,
  createHeaders(),
  RespType.TEXT,
);
```

`Get` and `Delete` serialize parameters with `URLSearchParams` and append `?` followed by the query string. Supply a URL without an existing query string when passing `params`. `Post` and `Put` serialize `data` with `JSON.stringify`.

#### Response formats

| Value | Response parser | Returned value |
| :--- | :--- | :--- |
| `RespType.JSON` | `response.json()` | Parsed JSON |
| `RespType.TEXT` | `response.text()` | String |
| `RespType.BLOB` | `response.blob()` | `Blob` |
| `RespType.FORM_DATA` | `response.formData()` | `FormData` |
| `RespType.ARRAY_BUFFER` | `response.arrayBuffer()` | `ArrayBuffer` |

```typescript
const text = await Http.Get('/health', null, createHeaders(), RespType.TEXT);
const image = await Http.Get('/image', null, createHeaders(), RespType.BLOB);
```

JSON is the default for ordinary requests and form uploads. Select a matching format for other response bodies; an empty response cannot be parsed as JSON. These helpers return the parsed body directly, without adding a `ResponseType` wrapper.

#### Retrieve a token

```typescript
const token = await Http.Token(
  { id: 'user-123', roles: ['user'] },
  'YOUR_APP_KEY',
  'YOUR_API_KEY',
);
```

`Token` sends a GET request to the configured token endpoint with `key` and a JSON-serialized `payload` in the query string. It sets `X-API-KEY` to the supplied API key, or an empty string when omitted, and returns text by default.

#### Handle errors

For ordinary requests, token retrieval, and form uploads, non-success HTTP responses and response-parsing failures are caught and wrapped. The rejected value is a plain object:

```typescript
try {
  await Http.Post('/users', { name: 'Jane' }, createHeaders());
} catch (failure: any) {
  console.error('Request URL:', failure.url);
  console.error('Request ID:', failure.requestId);
  console.error('Message:', failure.error.message);
  console.error('Original message:', failure.error.main_message);
  console.error('Submitted body:', failure.body); // Post and Put only
}
```

`Http.ErrorWrapper(errorData)` copies the error fields and sets `message` from `internal_message`, then `message`, then `ConstKeys.INVALID_DATA`. It sets `main_message` from the original `message`, or the same fallback. Plain-text error responses may therefore appear as the fallback message rather than their original text.

`CloudUpload` returns the raw response without checking `response.ok`; check it yourself. `FileDownload` reads the body as a blob without checking the status, so an HTTP error body can also be returned as a blob. Both wrap caught fetch/read failures with `url`, `requestId`, and `error`.

### File uploads and downloads

#### Multipart form upload

`FormUpload` sends the file in a multipart field named `file`. Additional fields with non-null, non-undefined values are appended from `data`.

```typescript
import { BaseHeaders, Http } from 'dff-util';

// Browser example: obtain a File from a file input.
const input = document.querySelector<HTMLInputElement>('#file-input');
const file = input?.files?.[0];

if (file) {
  const result = await Http.FormUpload(
    '/files',
    file,
    false,
    { folder: 'documents' },
    { ...BaseHeaders, authorization: 'Bearer YOUR_ACCESS_TOKEN' },
    'POST',
  );
  console.log(result);
}
```

Keep `isHeadersAddMultiForm` set to `false` and omit `Content-Type` so `fetch` supplies the multipart boundary. Setting this flag to `true` adds `multipart/form-data` when no content type is supplied, but does not add the boundary. The default upload method is `PUT`; the example explicitly uses `POST`.

#### Upload a file directly

`CloudUpload` sends the file itself as the request body, using its MIME type as the default `Content-Type`. Supply the complete destination URL.

```typescript
async function uploadFile(uploadUrl: string, file: File) {
  const response = await Http.CloudUpload(uploadUrl, file);
  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status}`);
  }
  return response;
}
```

Custom headers replace the default file content type. The destination must accept the headers sent by the helper, including `request-id`.

#### Download a file

`FileDownload` returns a `Blob`; it does not save the file to disk or trigger a browser download.

```typescript
const fileBlob = await Http.FileDownload(
  'https://api.example.com/files/report.pdf',
  null,
  { authorization: 'Bearer YOUR_ACCESS_TOKEN' },
);
```

To reject non-success HTTP statuses before returning a blob, use `Get` with `RespType.BLOB`:

```typescript
const fileBlob = await Http.Get(
  '/files/report.pdf',
  null,
  { authorization: 'Bearer YOUR_ACCESS_TOKEN' },
  RespType.BLOB,
);
```

## Call Api

These helpers are defined in `src/main/api-call.ts` and exported from `dff-util`. All three use synchronous `XMLHttpRequest`: they return values directly and throw errors synchronously. No `await` is needed. Browser XHR support and server CORS permission are required; requests block while waiting.

The former names `Hbs`, `LangText`, and `CurrencyConvert` are now `CallHbs`, `CallLangText`, and `CallCurrencyConvert`. Import them from `dff-util` or `main/api-call` instead of `main/util`.

### Handlebars rendering (CallHbs)

`CallHbs` renders inline templates through `https://hbs.rndpro.in`, using the same request format as the HBS service. It uses synchronous `XMLHttpRequest` and sends the template and data to that service. It returns directly, without a Promise. Standard Node.js does not provide `XMLHttpRequest`.

Synchronous requests block the browser while waiting and are deprecated on the main thread. The service must permit your browser origin and JSON POST requests through CORS. See [synchronous XHR limitations](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Synchronous_and_Asynchronous_Requests).

| Call | Endpoint | Return type |
| :--- | :--- | :--- |
| `CallHbs(template, data)` | `POST /render` | `string` |
| `CallHbs(template, items, true)` | `POST /multi` | `string[]` |

The TypeScript return type is `string | string[]`; the table shows the result for each mode.

#### Supported inputs and rendering modes

Based on the `dff-hbs` service in the local `hbs` repository (`src/models.rs`, `src/controller.rs`, and `src/service.rs`). The client accepts objects or arrays of objects; the server model itself accepts any JSON value.

| Input or mode | Type | Behavior / example |
| :--- | :--- | :--- |
| `template` | `string` | Inline Handlebars text, such as `Hello, {{name}}!`; not a registered template name |
| `data` with `multi = false` (default) | `RequestBodyType` | One object used as the template context: `{ name: 'Prasad' }` |
| `data` with `multi = false` | `RequestBodyType[]` | One array context; iterate using `{{#each this}}{{name}}{{/each}}` |
| `data` with `multi = true` | `RequestBodyType[]` | Render the same template for each object in one `/multi` request |
| Object property values | JSON string, number, boolean, null, object, or array | Nested data is supported, for example `{ user: { name: 'Prasad' }, active: true }` |
| Single result | `string` | Rendered text from `/render` |
| Batch result | `string[]` | Rendered strings in input order from `/multi`; an empty array returns `[]` |
| `data` is `null`/`undefined` | no request | Returns `template` unchanged; `[template]` when `multi = true` |

#### Template helper reference

The service registers `handlebars_misc_helpers::string_helpers` and `handlebars_switch::SwitchHelper`. The following string helpers are listed in the HBS repository's README. Use these expressions inside the `template` argument; they apply to both rendering modes.

| Helper | Purpose | Template expression | Example (input → output) |
| :--- | :--- | :--- | :--- |
| `replace` | Replace text | `{{replace name "old" "new"}}` | `Hello old` → `Hello new` |
| `to_lower_case` | Lowercase text | `{{to_lower_case name}}` | `Admin` → `admin` |
| `to_upper_case` | Uppercase text | `{{to_upper_case name}}` | `Admin` → `ADMIN` |
| `to_camel_case` | camelCase | `{{to_camel_case name}}` | `admin_user` → `adminUser` |
| `to_pascal_case` | PascalCase | `{{to_pascal_case name}}` | `admin_user` → `AdminUser` |
| `to_snake_case` | snake_case | `{{to_snake_case name}}` | `AdminUser` → `admin_user` |
| `to_screaming_snake_case` | SCREAMING_SNAKE_CASE | `{{to_screaming_snake_case name}}` | `AdminUser` → `ADMIN_USER` |
| `to_kebab_case` | kebab-case | `{{to_kebab_case name}}` | `AdminUser` → `admin-user` |
| `to_train_case` | Train-Case | `{{to_train_case name}}` | `admin_user` → `Admin-User` |
| `to_sentence_case` | Sentence case | `{{to_sentence_case name}}` | `admin_user` → `Admin user` |
| `to_title_case` | Title Case | `{{to_title_case name}}` | `admin_user` → `Admin User` |
| `to_class_case` | Class-name conversion | `{{to_class_case name}}` | `admin_users` → `AdminUser` |
| `to_table_case` | Table-name conversion | `{{to_table_case name}}` | `AdminUser` → `admin_users` |
| `to_plural` | Pluralize a word | `{{to_plural name}}` | `user` → `users` |
| `to_singular` | Singularize a word | `{{to_singular name}}` | `users` → `user` |
| `to_foreign_key` | Foreign-key name conversion | `{{to_foreign_key name}}` | `AdminUser` → `admin_user_id` |
| `demodulize` | Remove module qualification | `{{demodulize "Test::Foo::Bar"}}` | `Test::Foo::Bar` → `Bar` |
| `ordinalize` | Convert a number to ordinal text | `{{ordinalize "9"}}` | `9` → `9th` |
| `deordinalize` | Remove ordinal suffix | `{{deordinalize "9th"}}` | `9th` → `9` |
| `trim` | Remove surrounding whitespace | `{{trim name}}` | `" Admin "` → `"Admin"` |
| `trim_start` | Remove leading whitespace | `{{trim_start name}}` | `" Admin "` → `"Admin "` |
| `trim_end` | Remove trailing whitespace | `{{trim_end name}}` | `" Admin "` → `" Admin"` |
| `unquote` | Remove surrounding quotes | `{{unquote name}}` | `"Admin"` → `Admin` |
| `quote` | Add quotes using the default delimiter | `{{quote "" name}}` | `Admin` → `"Admin"` |
| `first_non_empty` | Select the first nonempty value | `{{first_non_empty nickname name "Guest"}}` | `nickname: "", name: "Admin"` → `Admin` |
| `switch`, `case`, `default` | Choose output based on a value | `{{#switch access}}{{#case "admin"}}Admin{{/case}}{{#default}}User{{/default}}{{/switch}}` | `access: "admin"` → `Admin`; `access: "user"` → `User` |

Helpers can be nested, for example `{{to_upper_case (first_non_empty nickname name "Guest")}}`.


Quote examples show the helper value before any HTML escaping. The registered helper is `quote`; the HBS repository README calls it `enquote`, but its dependency registers `quote`.

#### Render a single template

```typescript
import { CallHbs } from 'dff-util';

const rendered = CallHbs('Hello, {{to_pascal_case name}}!', {
  name: 'prasad',
});
console.log(rendered); // Hello, Prasad!
```

#### Render multiple data items in one request

```typescript
const rendered = CallHbs(
  'Hello, {{to_pascal_case name}}!',
  [{ name: 'prasad' }, { name: 'monika' }],
  true,
);
console.log(rendered); // ['Hello, Prasad!', 'Hello, Monika!']
```

The third argument defaults to `false`. Set it to `true` to render the same template once per array item, preserving order. An empty batch returns `[]`. With `false`, an array is treated as a single template context, for example with `{{#each this}}`.

Both endpoints receive JSON in the form `{ template, data }`. Templates can use the string helpers and `switch` helper registered by HBS. Data must be a JSON object or an array of JSON objects; batch rendering requires an array of objects. If `data` is `null` or `undefined`, no request is made and the template is returned unchanged, or as `[template]` when `multi = true`. Empty templates are allowed. Omitting `multi` is equivalent to passing `false`.

#### Handle failures

```typescript
try {
  const result = CallHbs('Hello, {{name}}!', { name: 'Prasad' });
  console.log(result);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
}
```

Non-success HTTP responses throw an error containing the status and response text. The service returns `400` for invalid requests and `500` for rendering failures; a failing batch reports the item index and rejects the entire batch. Network, CORS, and JSON-parsing errors propagate to the caller. Successful batch responses are checked to ensure they contain an array of strings.

### Language translation (CallLangText)

`CallLangText(text, sourceLocale, targetLocale)` returns the translated text as a `string`.

```typescript
import { CallLangText } from 'dff-util';

try {
  const translated = CallLangText('Hello, how are you?', 'en-US', 'te-IN');
  console.log(translated);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
}
```

Uses `https://lingva.ml/api/v1`, taking the two-letter language prefix from each locale. Text is URL-encoded. Empty inputs, invalid language codes, unsuccessful HTTP responses, and service-reported errors throw.

### Currency conversion (CallCurrencyConvert)

`CallCurrencyConvert(fromCurrency, toCurrency)` returns the exchange rate as a `number`: the target-currency value of one source-currency unit.

```typescript
import { CallCurrencyConvert } from 'dff-util';

try {
  const rate = CallCurrencyConvert('INR', 'USD');
  console.log(rate);
  console.log(CallCurrencyConvert('USD', 'USD')); // 1; no HTTP request
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
}
```

Uses `https://api.frankfurter.dev/v1/latest`. Missing inputs, unsuccessful HTTP responses, and missing or nonnumeric rates throw. Network and JSON-parsing errors propagate to the caller.

## Tokens and encryption

### JWT tokens

#### Encode a token

Sign a payload with a secret key. `expiresIn` is measured in seconds and defaults to `86400` (one day).

```typescript
JwtEncode(data, secret, expiresIn);
```

#### Decode a token

```typescript
JwtDecode(token);
```

#### Verify a token with a secret

```typescript
JwtVerify(token, secret);
```

#### Check token expiration

`JwtValid` checks whether the token can be decoded and has expired; use `JwtVerify` to verify its signature.

```typescript
JwtValid(token);
```

#### Example

```typescript
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

### Encryption and encoding

```typescript
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

```typescript
import * as crypto from 'crypto';
export const Encrypt = (text: string, key: string) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};
```

```typescript
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

#### Base64, URL, and safe encoding

```typescript

// Base64
const text = "Hello World!";
const encodedBase64 = EncodeBase64(text); // "SGVsbG8gV29ybGQh"
const decodedBase64 = DecodeBase64(encodedBase64); // "Hello World!"

console.log(encodedBase64, decodedBase64);

// URL Encode/Decode
const url = "https://example.com/query?name=John Doe&city=New York";

// First encode
const encodedURL1 = EncodeURL(url);
console.log(encodedURL1);
// Output: "https%3A%2F%2Fexample.com%2Fquery%3Fname%3DJohn%20Doe%26city%3DNew%20York"

// Encode again (idempotent)
const encodedURL2 = EncodeURL(encodedURL1);
console.log(encodedURL2 === encodedURL1); // true ✅

// Decode
const decodedURL1 = DecodeURL(encodedURL1);
console.log(decodedURL1); // "https://example.com/query?name=John Doe&city=New York"

// Decode again (idempotent)
const decodedURL2 = DecodeURL(decodedURL1);
console.log(decodedURL2 === decodedURL1); // true ✅

const original = "Hello World! @#$% 😊";

// Encode
const safe = SafeEncode(original);
console.log(safe);
// Output: "U0dWc2JHOGdWMjl5YkdRPQ%3D%3D"

// Decode
const decoded = SafeDecode(safe);
console.log(decoded);
// Output: "Hello World! @#$% 😊"

// Multiple encode/decode calls (idempotent)
console.log(SafeEncode(SafeDecode(safe)) === safe); // true

```

## Language and country reference

### Language and country lookup (LangCountryCode)

Look up country and language metadata locally without an API request.

```typescript
import { LangCountryCode } from 'dff-util';

const country = LangCountryCode('en-US');
console.log(country);
```

### Country data (CountryType)

```typescript
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

#### Country list
```typescript
import { Countries } from 'dff-util';

const countriesList = Countries;

// Countries is a CountryType[] containing country metadata.
```

### Language metadata (LanguageType)

```typescript
export type LanguageType = {
  lang: string;        // Locale code (e.g., en-US, hi-IN)
  code: string;        // ISO 639-1 language code (e.g., en, hi)
  country: string;     // ISO 3166-1 alpha-2 country code (e.g., US, IN)
  name: string;        // English name of the language
  dir: "ltr" | "rtl";  // Text direction
  locale: string;      // Native name of the language
};
```

### Language and country metadata (LangCountryType)

```typescript
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

### Supported language codes (AllLanguageCodesType)

```typescript
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

## Shared types

### Common types

```typescript
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

### Request and response types

```typescript
export type ResponseType = {
  status?: string | number;
  data?: any;
  error?: any;
  total?: number;
  skip?: number;
  limit?: number;
  meta?: {
    requestId?: string | number;
    timestamp?: string | number;
    duration?: number;
  };
}

export type SearchType = {
  limit?: number;
  skip?: number;
  orderBy?: string;
  order?: 'ASC' | 'DESC';
  searchTerm?: string;
  active?: boolean;
  filters?: string;
};

export type KeyValueType = {
  [key: string]: any;
}

export type JsonValueType = string | number | boolean | null | JsonValueType[] | { [key: string]: JsonValueType };
export type RequestBodyType = Record<string, JsonValueType>;
export type RequestQueryType = Record<string, string | number | boolean | null>;
export type RequestByIdType = {
  id: string | number;
};

```

### Session user (SessionUser)

```typescript
export type SessionUser = {
  id: string;
  email?: string;
  mobile?: string;
  name?: string;
  roles: string[];
  type?: string;
};
```

### Session information (SessionInfo)

```typescript
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

## Constants and validation

### Constants (ConstValue)

```typescript
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

### Application messages (ConstMessages)

```typescript
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

### Regular expressions (RegExp)

```typescript
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
