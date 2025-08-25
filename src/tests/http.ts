// bun src/tests/http.ts

import { Http } from '../index';

Http.API_BASE_URL = 'http://localhost:4000';


const signinRun = async () => {
  const payload = {
  userid: 'aaa@anymail.com',
  password: '11111',
  type: 'admin',
  provider: 'email',
};

  try {
    const res = await Http.Post("/auth/signin", payload, {});
    console.log(res);
  } catch (e) {
    console.error(e);
  }
};

signinRun();

