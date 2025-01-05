import { SignJWT, jwtVerify, decodeJwt } from 'jose';

/**
 * Encode JWT Token with secret key, expiresIn in seconds (86400 = 1 day) default
 * @param data
 * @param secret
 * @param expiresIn
 * @returns
 */
export const JwtEncode = async (data: any, secret: string, expiresIn = 86400) => {
  const secretKey = new TextEncoder().encode(secret);
  const token = await new SignJWT(data)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(`${expiresIn}s`)
    .sign(secretKey);
  return token;
};

/**
 * Verify JWT token with secret
 * @param token
 * @param secret
 * @returns
 */
export const JwtVerify = async (token: string, secret: string) => {
  if (token) {
    try {
      token = token.replace(/jwt |JWT |Bearer |bearer |BEARER /g, '');
      const secretKey = new TextEncoder().encode(secret);
      const { payload } = await jwtVerify(token, secretKey, {
        algorithms: ['HS256'],
      });
      return payload;
    } catch (err) {
      throw { name: 'error', message: 'Token is not valid' };
    }
  } else {
    throw { name: 'error', message: 'Auth token is not supplied' };
  }
};

/**
 * Decode JWT Token without verification
 * @param token
 * @returns
 */
export const JwtDecode = (token: string) => {
  if (token) {
    try {
      token = token.replace(/jwt |JWT |Bearer |bearer |BEARER /g, '');
      return decodeJwt(token);
    } catch (err) {
      console.error(err);
      throw { name: 'error', message: 'Token is not valid' };
    }
  } else {
    throw { name: 'error', message: 'Auth token is not supplied' };
  }
};

/**
 * Check if token is expired or not
 * @param token
 * @returns
 */
export const JwtValid = (token: string) => {
  try {
    if (!token) {
      return false;
    }
    const payload = decodeJwt(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < currentTime) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Invalid JWT:', error);
    return false;
  }
};
