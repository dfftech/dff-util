export type SessionInfo = {
  id: string;
  email?: string;
  mobile?: string;
  name?: string;
  roles: string[];
  requestId?: string;
  type?: string;
  token?: string;
  iat?: number;
  exp?: number;
  key: string;
};

export type SessionUser = {
  id: string;
  email?: string;
  mobile?: string;
  name?: string;
  roles: string[];
  type?: string;
};

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

export type ResponseLimitType = {
  status?: string | number;
  data?: any;
  error?: any;
  count?: number;
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

export type LanguageType = {
  lang: string;        // Locale code (e.g., en-US, hi-IN)
  code: string;        // ISO 639-1 language code (e.g., en, hi)
  country: string;     // ISO 3166-1 alpha-2 country code (e.g., US, IN)
  name: string;        // English name of the language
  dir: "ltr" | "rtl";  // Text direction
  locale: string;      // Native name of the language
};

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
