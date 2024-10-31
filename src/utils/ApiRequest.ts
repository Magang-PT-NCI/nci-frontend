import axios, { AxiosHeaders } from 'axios';
import { ATTENDANCE_URL, EMPLOYEE_URL } from '../config/app.config';
import { ApiError } from '../interfaces/api-error';
import { Endpoint } from '../enums/endpoint-class';
import { HeadersReq } from '../interfaces/api-request';

export default class ApiRequest<Treq, Tres> {
  private url: string = '';
  private status: number = 0;
  private data: Tres | null = null;
  private reqbody: Treq | null = null;
  private token: string = '';
  private params: Treq | null = null;
  private contentType: string = '';
  private pathParam: string = '';

  public constructor(endpoint?: string) {
    this.url = endpoint;
  }

  public setReqBody(reqbody: Treq) {
    this.reqbody = reqbody;
    return this;
  }

  public setToken(token: string) {
    this.token = token;
    return this;
  }

  public setParams(params: Treq) {
    this.params = params;
    return this;
  }

  public setPathParam(path: string) {
    this.pathParam = path;
    return this;
  }

  public setContentType(type: string) {
    this.contentType = type;
    return this;
  }

  public setURL(url: string) {
    this.url = url;
    return this;
  }

  // POST-METHOD
  public async post(
    success?: (data: Tres) => void,
    error?: (data: ApiError) => void,
  ) {
    try {
      const headers: HeadersReq = {};

      if (this.token !== '') {
        headers.authorization = 'bearer ' + this.token;
      }

      if (this.contentType !== '') {
        headers['Content-Type'] = this.contentType;
      }

      const response = await axios.post(this.url, this.reqbody, {
        headers: headers as AxiosHeaders,
      });
      this.status = response.status;
      this.data = response.data;

      if (success) success(response.data);
    } catch (e: any) {
      console.log(e.stack);
      this.status = e.response.status;
      this.data = e.response.data;
      if (error) error(e.response.data);
    }
    return this;
  }

  // GET-METHOD
  public async get() {
    try {
      const headers: HeadersReq = {};

      if (this.token !== '') {
        headers.authorization = 'bearer ' + this.token;
      }

      const response = await axios.get(this.url + '/' + this.pathParam, {
        headers: headers as AxiosHeaders,
        params: this.params,
      });

      this.status = response.status;
      this.data = response.data;
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      this.status = error.response.status;
      this.data = error.response.data;
    }
    return this;
  }

  // PATCH-METHOD
  public async patch(
    success?: (data: Tres) => void,
    error?: (data: ApiError) => void,
  ) {
    try {
      const headers: HeadersReq = {};

      if (this.token !== '') {
        headers.authorization = 'bearer ' + this.token;
      }

      const response = await axios.patch(this.url, this.reqbody, {
        headers: headers as AxiosHeaders,
      });

      this.status = response.status;
      this.data = response.data;

      if (success) success(response.data);
    } catch (e: any) {
      this.status = e.response.status;
      this.data = e.response.data;
      if (error) error(e.response.data);
    }
    return this;
  }

  public getStatus() {
    return this.status;
  }

  public getData() {
    return this.data as Tres;
  }
}
