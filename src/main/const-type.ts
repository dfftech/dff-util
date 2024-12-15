export type SessionInfo = {
  id: string;
  email?: string;
  mobile?: string;
  name?: string;
  roles: string[];
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
  roles: string[];
};

export type ResponseType = {
  status?: string | number;
  data?: any;
  error?: any;
};
