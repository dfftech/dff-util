// ts-node test/http.ts

import { Http, HttpHeaders, RespType } from '../src/main/http';
import { SessionInfo } from '../src/main/const-type';
import { JwtEncode, JwtDecode } from '../src/main/jwt-util';

let token: string = 'ey';

let sessionInfo: SessionInfo = {
  id: '123',
  email: 'a@a.com',
  name: 'a',
  mobile: '123456789',
  role: 'admin',
};

// token = JwtEncode(sessionInfo, '123456789');
// console.log('JwtEncode :: ', token);
// sessionInfo.token = token;
// const decode = JwtDecode(sessionInfo.token);
// console.log('JwtDecode :: ', decode);

Http.API_BASE_URL = 'http://apidev.apix.co';
Http.TOKEN_URL = '/apisix/plugin/jwt/sign';
const main = async () => {
  // const resp = await Http.Token(sessionInfo, 'userkey');
  try {
    // const params = { key: 'userkey11', payload: JSON.stringify(sessionInfo) };
    // const resp = await Http.Get(Http.TOKEN_URL, params, null, RespType.TEXT);
    const resp = await Http.Token(sessionInfo, 'userkey');
    console.log('Http.Token :: ', resp);
    const decode = JwtDecode(resp);
    console.log('Data :: ', decode);
  } catch (error) {
    console.error('Http.Token error:', error);
  }
};

main();
