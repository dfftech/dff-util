import * as jwt from 'jsonwebtoken';

/**
 * Encode JWT Token with secret key, expiresIn in seconds (86400 = 1 day) default
 * @param data
 * @param token
 * @param expiresIn
 * @returns
 */
export const JwtEncode = (data: any, secret: string, expiresIn = 86400) => {
  return jwt.sign(data, secret, {
    expiresIn: expiresIn,
  });
};

/**
 * Verify JWT token with secret
 * @param data
 * @param token
 * @returns
 */
export const JwtVerify = (data: string, secret: string) => {
  if (data) {
    try {
      data = data.replace('jwt ', '').replace('JWT ', '');
      data = data.replace('Bearer ', '').replace('bearer ', '').replace('BEARER', '');
      return jwt.verify(data, secret);
    } catch (err) {
      throw { name: 'error', message: 'Token is not valid' };
    }
  } else {
    throw { name: 'error', message: 'Auth token is not supplied' };
  }
};

/**
 * Deocde JWT Token
 * @param token
 * @returns
 */
export const JwtDecode = (token: string) => {
  if (token) {
    try {
      token = token.replace('jwt ', '').replace('JWT ', '');
      token = token.replace('Bearer ', '').replace('bearer ', '').replace('BEARER', '');
      return jwt.decode(token);
    } catch (err) {
      console.log(err);
      throw { name: 'error', message: 'Token is not valid' };
    }
  } else {
    throw { name: 'error', message: 'Auth token is not supplied' };
  }
};
/**
 * checking token expires or not
 * @param token
 * @returns
 */
export const JwtValid = (token: string) => {
  try {
    if (!token) {
      return false;
    }
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
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
