export interface NotificationResData {
  nik: string;
  name: string;
  message: string;
  date: string;
  file?: string;
  action_endpoint?: string;
}

export interface ApprovalReqBody {
  approved: boolean;
}

export interface ApprovalResData {
  id: number;
  approved: boolean;
}
