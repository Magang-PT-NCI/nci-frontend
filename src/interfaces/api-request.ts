export interface HeadersReq {
  authorization?: string;
  'Content-Type'?: string;
}

export interface ParamsReq {
  filter?: string;
  date?: string;
  keyword?: string;
  from?: string;
  to?: string;
}
