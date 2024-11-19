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
  denied_description?: string;
  approval_nik: string;
}

export interface ApprovalResData {
  id: number;
  approved: boolean;
}
