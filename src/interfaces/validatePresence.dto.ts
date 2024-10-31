export interface ValidatePresenceRes {
  id: number;
  attendance_id: number;
  type: string;
  description: string;
  attachment: string;
  approved: boolean;
  reason: string;
}
