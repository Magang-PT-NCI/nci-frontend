export interface EmployeeResData {
  nik: string;
  name: string;
  area: string;
  role: string;
  position: string;
}

export interface ValidateTokenResData {
  nik: string;
  profile_photo: string;
  user_role: string;
}

export interface LoginResdata extends ValidateTokenResData {
  token: string;
}

export interface AttendanceCheckRes {
  time: string;
  photo: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface PermitResData {
  id: number;
  reason: string;
  start_date: string;
  end_date: string;
  duration: number;
  permission_letter: string;
  approved: boolean;
}

export interface Activity {
  id: number;
  description: string;
  status: string;
  start_time: string;
  end_time: string;
}

export interface AttendanceResData {
  id: number;
  date: string;
  status: string;
  overtime: string | null;
  late: string | null;
  working_hours: string;
  checkIn: AttendanceCheckRes | null;
  checkOut: AttendanceCheckRes | null;
  permit: Permit | null;
  activities: Activity[];
}

export interface LogbookResData {
  id: number;
  description: string;
  status: string;
  start_time: string;
  end_time: string;
}
