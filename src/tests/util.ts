// bun run src/tests/util.ts

import { CurrencyConvert, LangCountryCode } from "../main/util";

const CallLangCountry = () => {
  const lang = "en-US";
  const country = LangCountryCode(lang);
  console.log("LangCountryCode:: ", country);
};

const CallLangText = async () => {
  const resp = await LangText("Hello, how are you?", "en-US", "hi-IN");
  console.log("Resp Kannada:: ", resp);
}

const CallCurrencyConvert = async () => {
  const resp = await CurrencyConvert("USD", "INR");
  console.log("Resp Currency:: ", resp);
}

import { LangText } from "../main/util";

const run = async () => {
  // await CallLangCountry();
  // await CallLangText();
  await CallCurrencyConvert();
};

run();