import { generate } from "randomstring";
import { RegExp } from "./reg-exr";
import { CountryType, LangCountryType, LanguageType } from "./const-type";
import { countries } from "./countries";
import { languages } from "./languages";

export const AppRandomString = (length: number, charset: string) => {
  return generate({ length: length, charset: charset });
};

let uniqueId: number = 0;
export const AppUniqueCode = () => {
  let time: number = new Date().getTime();
  if (uniqueId == time) {
    while (new Date().getTime() < 1 + time) {}
    time = new Date().getTime();
  }
  uniqueId = time;
  return time.toString(36).toUpperCase();
};

export const AppCodeByType = (name: string, type = null) => {
  let str: string = "";
  if (type) {
    str = type + "_" + name;
  } else {
    str = name + "_" + AppUniqueCode();
  }
  str = str.replace(RegExp.NON_ALPHA_NUMERIC, "_");
  str = str.replace(/\s/g, "_");
  str = str.substr(0, 128);

  return str.toUpperCase();
};

export const AppCode = (name: string) => {
  if (name == null) return null;
  let str: string = "";
  str = name.trim();
  str = str.replace(RegExp.NON_ALPHA_NUMERIC, "_");
  str = str.replace(/\s/g, "_");
  return str.toUpperCase();
};

export const AppDaysBack = (
  date: Date,
  backValue: number,
  isDays: boolean = true,
) => {
  date = new Date(date);
  if (isDays) {
    date.setDate(date.getDate() - backValue);
  } else {
    date.setMilliseconds(date.getMilliseconds() - backValue);
  }
  date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return date;
};

export const AppAddDays = (
  date: Date,
  addDays: number,
  isDays: boolean = true,
) => {
  date = new Date(date);
  if (isDays) {
    date.setDate(date.getDate() + addDays);
  } else {
    date.setMilliseconds(date.getMilliseconds() + addDays);
  }
  date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return date;
};

export const AppUUID4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const LangText = async (
  data: string,
  source: string,
  target: string,
) => {
  if (!data || !source || !target) {
    throw new Error("Invalid input: data, source, or target is missing");
  }
  const src = source.split("-")[0]; // e.g., "en-US" -> "en"
  const tgt = target.split("-")[0]; // e.g., "te-IN" -> "te"
  if (!/^[a-zA-Z]{2}$/.test(src) || !/^[a-zA-Z]{2}$/.test(tgt)) {
    throw new Error("Invalid language code format");
  }
  const encodedData = encodeURIComponent(data);
  const url = `https://lingva.ml/api/v1/${src}/${tgt}/${encodedData}`;
  const res = await fetch(url, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error(`Translation failed: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  if (json.error) {
    throw new Error(`API error: ${json.error}`);
  }

  return json.translation || "";
};

export const CurrencyConvert = async (from: string, to: string): Promise<number> => {
  if (!from || !to) {
    throw new Error("Invalid input: from or to is missing");
  }
  if (from === to) {
    return 1;
  }
  try {
    const url = `https://api.frankfurter.app/latest?from=${from}&to=${to}`;
    const res = await fetch(url, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`Currency conversion failed: ${res.status} ${res.statusText}`);
    }
    const json = await res.json();
    return json.rates[to];
  } catch (error) {
    throw new Error(`Currency conversion failed: ${error}`);
  }
};

export const LangCountryCode = (lang: string) : LangCountryType => {
  const countryCode = lang.split("-")[1];
  const country = countries.find((c) => c.code === countryCode) || {} as CountryType;
  const language = languages.find((l) => l.lang === lang) || {} as LanguageType;
  return {
    lang: lang,
    country: countryCode,
    name: language.name,
    locale: language.locale,
    currencyCode: country.currencyCode,
    currency: country.currency,
    telCode: country.telCode,
    flag: country.flag,
    dir: language.dir,
  };
};
