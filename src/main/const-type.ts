export type SessionInfo = {
  id: string;
  email?: string;
  mobile?: string;
  name?: string;
  role: string;
  requestId?: string;
  token?: string;
  iat?: number;
  exp?: number;
  key: string;
};

export type SessionUser = {
  id: string;
  email?: string;
  mobile?: string;
  name?: string;
  role: string;
};

export const ErrorResponse = (message: string, error?: any) => {
  return {
    status: 0,
    type: 'ERROR',
    message: message,
    error: error,
  };
};

export const SuccessResponse = (data: any) => {
  return {
    status: 1,
    type: 'SUCCESS',
    data: data,
  };
};
