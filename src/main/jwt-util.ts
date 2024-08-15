import * as jwt from 'jsonwebtoken';

export const JwtEncode = (data: any, token: string, expiresIn = 86400) => {
  return jwt.sign(data, token, {
    expiresIn: expiresIn,
  });
};

export const JwtVerify = (data: any, token: string) => {
  if (data) {
    try {
      data = data.replace('jwt ', '').replace('JWT ', '');
      data = data.replace('Bearer ', '').replace('bearer ', '').replace('BEARER', '');
      return jwt.verify(data, token);
    } catch (err) {
      throw { name: 'error', message: 'Token is not valid' };
    }
  } else {
    throw { name: 'error', message: 'Auth token is not supplied' };
  }
};

export const JwtDecode = (token: any) => {
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
