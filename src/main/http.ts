export enum RespType {
  JSON = 'json',
  TEXT = 'text',
  BLOB = 'blob',
  FORM_DATA = 'formData',
  ARRAY_BUFFER = 'arrayBuffer',
}

export const HttpHeaders = {
  'Content-Type': 'application/json',
  authorization: null,
  'x-request-id': null,
};

export const BaseHeaders = {
  authorization: null,
  'x-request-id': null,
};

export class Http {
  static API_BASE_URL = process.env.API_BASE_URL;
  static TOKEN_URL = `/apisix/plugin/jwt/sign`;

  private static async RespData(response: Response, type: RespType = RespType.JSON) {
    if (!response.ok) {
      throw { status: response.status || 0, statusText: response.statusText || response };
    }
    switch (type) {
      case RespType.JSON:
        return await response?.json();
      case RespType.TEXT:
        return await response?.text();
      case RespType.BLOB:
        return await response?.blob();
      case RespType.FORM_DATA:
        return await response?.formData();
      case RespType.ARRAY_BUFFER:
        return await response?.arrayBuffer();
      case RespType.BLOB:
        return await response?.blob();
      default:
        return null;
    }
  }
  static async Get(url: string, params: any, headers: any, type: RespType = RespType.JSON) {
    url = Http.API_BASE_URL + url;
    const fullUrl = params ? `${url}?${new URLSearchParams(params).toString()}` : url;
    try {
      const requestOptions: any = { method: 'GET', headers: headers || HttpHeaders };
      const response = await fetch(fullUrl, requestOptions);
      return await Http.RespData(response, type);
    } catch (error: any) {
      console.error('HttpGet error: ', error);
      throw { url: fullUrl, requestId: HttpHeaders['x-request-id'], error: error };
    }
  }

  static async Post(url: string, data: any, headers: any, type: RespType = RespType.JSON) {
    url = Http.API_BASE_URL + url;
    try {
      const requestOptions: any = { method: 'POST', body: JSON.stringify(data || {}), headers: headers || HttpHeaders };
      const response = await fetch(url, requestOptions);
      return await Http.RespData(response, type);
    } catch (error: any) {
      console.error('HttpPost error: ', error);
      throw { url: url, requestId: HttpHeaders['x-request-id'], body: data, error: error };
    }
  }

  static async Put(url: string, data: any, headers: any, type: RespType = RespType.JSON) {
    url = Http.API_BASE_URL + url;
    try {
      const requestOptions: any = { method: 'PUT', body: JSON.stringify(data || {}), headers: headers || HttpHeaders };
      const response = await fetch(url, requestOptions);
      return await Http.RespData(response, type);
    } catch (error: any) {
      console.error('HttpPut error: ', error);
      throw { url: url, requestId: HttpHeaders['x-request-id'], body: data, error: error };
    }
  }

  static async Delete(url: string, params: any, headers: any, type: RespType = RespType.JSON) {
    url = Http.API_BASE_URL + url;
    const fullUrl = params ? `${url}?${new URLSearchParams(params).toString()}` : url;
    try {
      const requestOptions: any = { method: 'DELETE', headers: headers || HttpHeaders };
      const response = await fetch(fullUrl, requestOptions);
      return await Http.RespData(response, type);
    } catch (error: any) {
      console.error('HttpDelete error: ', error);
      throw { url: fullUrl, requestId: HttpHeaders['x-request-id'], error: error };
    }
  }

  static async Token(sessionInfo: any, appKey: string, apiKey?: string, type: RespType = RespType.TEXT) {
    const url = `${Http.API_BASE_URL}${Http.TOKEN_URL}`;
    const params = { key: appKey, payload: JSON.stringify(sessionInfo) };
    const fullUrl = `${url}?${new URLSearchParams(params).toString()}`;
    const headers = { ...Headers, 'X-API-KEY': apiKey || '' };
    try {
      const requestOptions: any = { method: 'GET', headers: headers };
      const response = await fetch(fullUrl, requestOptions);
      return await Http.RespData(response, type);
    } catch (error: any) {
      console.error('HttpToken error: ', error);
      throw { url: fullUrl, requestId: HttpHeaders['x-request-id'], error: error };
    }
  }

  static async FormUpload(
    fullUrl: string,
    file: File,
    isHeadersAddMultiForm: boolean = false,
    data: Record<string, any> = {},
    headers: any = BaseHeaders,
    method: 'POST' | 'PUT' = 'PUT',
    type: RespType = RespType.JSON,
  ) {
    const formData = new FormData();
    formData.append('file', file);

    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    }
    if (isHeadersAddMultiForm) {
      headers = { ...headers, 'Content-Type': headers['Content-Type'] || 'multipart/form-data' };
    }
    try {
      const requestOptions: any = {
        method: method,
        body: formData,
        headers: { ...headers },
      };
      console.log(requestOptions);
      const response = await fetch(fullUrl, requestOptions);
      return await Http.RespData(response, type);
    } catch (error: any) {
      console.error('HttpUpload error: ', error);
      throw { url: fullUrl, requestId: HttpHeaders['x-request-id'], error: error };
    }
  }

  static async CloudUpload(fullUrl: string, file: File, headers: any = null, method: 'POST' | 'PUT' = 'PUT') {
    headers = headers || {
      'Content-Type': file.type,
    };
    try {
      const requestOptions: any = {
        method: method,
        body: file,
        headers: { ...headers },
      };
      const response = await fetch(fullUrl, requestOptions);
      return response;
    } catch (error: any) {
      console.error('HttpUpload error: ', error);
      throw { url: fullUrl, requestId: HttpHeaders['x-request-id'], error: error };
    }
  }

  static async FileDownload(fullUrl: string, params: any, headers: any = HttpHeaders, method: string = 'GET') {
    fullUrl = params ? `${fullUrl}?${new URLSearchParams(params).toString()}` : fullUrl;
    try {
      const requestOptions: any = { method: method, headers: headers || HttpHeaders };
      const response = await fetch(fullUrl, requestOptions);
      const blob = await response.blob();
      const buffer = Buffer.from(await blob.arrayBuffer());
      return buffer;
    } catch (error: any) {
      console.error('HttpDownload error: ', error);
      throw { url: fullUrl, requestId: HttpHeaders['x-request-id'], error: error };
    }
  }
}
