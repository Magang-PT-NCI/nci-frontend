import {PermitResData} from "./permit.dto";

export interface AttendanceCheckRes {
    time: string;
    photo: string;
    location: {
        latitude: number;
        longitude: number;
    };
}

export interface AttendancePostRes extends  AttendanceCheckRes{
    nik: string;
    type: string;
    date: string;
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
    permit: PermitResData | null;
    activities: Activity[];
}