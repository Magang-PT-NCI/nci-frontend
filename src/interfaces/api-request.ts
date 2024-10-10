export interface LoginReqBody {
  nik: string;
  password: string;
}

export interface ValidateTokenReqBody {
  token: string;
}

export interface HeadersReq {
  authorization?: string;
  "Content-Type"?: string;
}

export interface ParamsReq {
  filter?: string;
  date?: string;
}

export interface LogbookReqBody {
  attendance_id: number;
  description: string;
  status: string;
  start_time: string;
  end_time: string;
}

export interface AttendanceReqBody {
  nik: string;
  location: string;
  type: string;
  photo: string;
}

export interface PermitReqBody {
  nik: string;
  reason: string;
  start_date: string;
  duration: number;
  permission_letter: string;
}
