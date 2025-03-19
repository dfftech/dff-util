export const RegExp = {
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
