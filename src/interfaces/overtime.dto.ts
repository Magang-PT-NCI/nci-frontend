export interface OvertimeReq {
  nik: string;
}

export interface OvertimeResData {
  id: number;
  approved: boolean;
  attendance_id: number;
  date: string;
}
