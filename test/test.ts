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
