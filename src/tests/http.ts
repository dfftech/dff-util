// bun src/tests/http.ts

import { Http } from '../index';

const url = '/auth/partner/signin';
const reqBody = { language: 'en-US', mobile: '111111111', provider: 'mobile', telCode: '+91' };

const runHttpExample = async () => {
  try {
    const res = await Http.Post(url, reqBody, null);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

runHttpExample();
