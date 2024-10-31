export interface Logbook {
  id: number;
  description: string;
  status: string;
  start_time: string;
  end_time: string;
}

export interface LogbookResData {
  id: number;
  description: string;
  status: string;
  start_time: string;
  end_time: string;
}

export interface LogbookReqBody {
  attendance_id: number;
  description: string;
  status: string;
  start_time: string;
  end_time: string;
}
