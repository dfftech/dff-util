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

export type ResponseType = {
  status?: string | number;
  data?: any;
  error?: any;
};
