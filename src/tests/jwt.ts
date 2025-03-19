// bun run src/tests/jwt.ts

import { JwtEncode, JwtVerify, JwtDecode, JwtValid } from '../index';

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
