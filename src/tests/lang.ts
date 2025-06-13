// bun run src/tests/lang.ts

import { LangData } from "../main/util";

const run = async () => {
  try {
    const resp = await LangData("Hello, how are you?", "en-US", "ka-IN");
    console.log("Resp Kannada:: ", resp);

    const resp1 = await LangData("Hello, how are you?", "en-US", "ar-SA");
    console.log("Resp Arabic:: ", resp1);

    const resp2 = await LangData("Hello, how are you?", "en-US", "te-IN");
    console.log("Resp Telugu:: ", resp2);

    const resp3 = await LangData("Hello, how are you?", "en-US", "ta-IN");
    console.log("Resp Tamil:: ", resp3);

  } catch (error) {
    console.log(error);
  }
};

run();
