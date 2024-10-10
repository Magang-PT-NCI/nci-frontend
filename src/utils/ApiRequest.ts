import axios, { AxiosHeaders } from "axios";
import { ATTENDANCE_URL, EMPLOYEE_URL } from "../config/app.config";
import { ApiError } from "../interfaces/api-error";
import { Endpoint } from "../enums/api-enum";
import { HeadersReq } from "../interfaces/api-request";

export default class ApiRequest<Treq, Tres> {
  private url: string = "";
  private status: number = 0;
  private data: Tres | null = null;
  private reqbody: Treq | null = null;
  private token: string = "";
  private params: Treq | null = null;
  private contentType: string = "";
  private pathParam: string = "";

  public constructor(endpoint: Endpoint) {
    switch (endpoint) {
      case Endpoint.Login:
        this.url = `${EMPLOYEE_URL}/login`;
        break;
      case Endpoint.ValidateToken:
        this.url = `${EMPLOYEE_URL}/validate_token`;
        break;
      case Endpoint.GetEmployee:
        this.url = `${EMPLOYEE_URL}/employee`;
        break;
      case Endpoint.Attendance:
        this.url = `${ATTENDANCE_URL}/attendance`;
        break;
      case Endpoint.Logbook:
        this.url = `${ATTENDANCE_URL}/logbook`;
        break;
      case Endpoint.Permit:
        this.url = `${ATTENDANCE_URL}/permit`;
        break;

      default:
        break;
    }
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

  // POST-METHOD
  public async post(
    success?: (data: Tres) => void,
    error?: (data: ApiError) => void
  ) {
    try {
      const headers: HeadersReq = {};

      if (this.token !== "") {
        headers.authorization = "bearer " + this.token;
      }

      if (this.contentType !== "") {
        headers["Content-Type"] = this.contentType;
      }

      const response = await axios.post(this.url, this.reqbody, {
        headers: headers as AxiosHeaders,
      });
      this.status = response.status;
      this.data = response.data;

      if (success) success(response.data);
    } catch (e: any) {
      console.log(e);
      console.log(EMPLOYEE_URL);
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

      if (this.token !== "") {
        headers.authorization = "bearer " + this.token;
      }

      const response = await axios.get(this.url + "/" + this.pathParam, {
        headers: headers as AxiosHeaders,
        params: this.params,
      });

      this.status = response.status;
      this.data = response.data;
    } catch (error: any) {
      this.status = error.response.status;
      this.data = error.response.data;
    }
    return this;
  }

  public getStatus() {
    return this.status;
  }

  public getData() {
    return this.data as Tres;
  }

  public getError() {
    return this.data as ApiError;
  }
}