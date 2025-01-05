import jwtEncode from 'jwt-encode';
import { jwtDecode } from 'jwt-decode';

/**
 * Encode JWT Token with secret key, expiresIn in seconds (86400 = 1 day) default
 * @param data
 * @param secret
 * @param expiresIn
 * @returns
 */
export const JwtEncode = (data: any, secret: string, expiresIn = 86400) => {
  try {
    const exp = Math.floor(Date.now() / 1000) + expiresIn;
    const payload = { ...data, exp };
    const token = jwtEncode(payload, secret);
    return token;
  } catch (err) {
    console.error('Error encoding JWT:', err);
    throw new Error('Error encoding JWT');
  }
};

/**
 * Verify JWT token with secret
 * @param token
 * @param secret
 * @returns
 */
export const JwtVerify = (token: string, secret: string) => {
  if (token) {
    try {
      token = token.replace(/jwt |JWT |Bearer |bearer |BEARER /g, '');
      const decoded: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      // Check if token is expired
      if (decoded.exp && decoded.exp < currentTime) {
        throw new Error('Token has expired');
      }

      // Since `jwt-encode` doesn't provide signature verification, manually check if the payload matches.
      const regeneratedToken = jwtEncode(decoded, secret);
      if (token !== regeneratedToken) {
        throw new Error('Token is not valid');
      }

      return decoded;
    } catch (err) {
      console.error('Invalid JWT:', err);
      throw new Error('Token is not valid');
    }
  } else {
    throw new Error('Auth token is not supplied');
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
      const decoded = jwtDecode(token);
      return decoded;
    } catch (err) {
      console.error('Error decoding JWT:', err);
      throw new Error('Token is not valid');
    }
  } else {
    throw new Error('Auth token is not supplied');
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
    const decoded: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return !(decoded.exp && decoded.exp < currentTime);
  } catch (error) {
    console.error('Invalid JWT:', error);
    return false;
  }
};
