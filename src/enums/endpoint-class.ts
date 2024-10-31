import { ATTENDANCE_URL, EMPLOYEE_URL } from '../config/app.config';

export class Endpoint {
  public static Login = `${EMPLOYEE_URL}/login`;
  public static ValidateToken = `${EMPLOYEE_URL}/validate_token`;
  public static GetEmployee = `${EMPLOYEE_URL}/employee`;
  public static Attendance = `${ATTENDANCE_URL}/attendance`;
  public static Logbook = `${ATTENDANCE_URL}/logbook`;
  public static Monitoring = `${ATTENDANCE_URL}/monitoring`;
  public static Permit = `${ATTENDANCE_URL}/permit`;
  public static Notification = `${ATTENDANCE_URL}/notification`;
  public static Overtime = `${ATTENDANCE_URL}/attendance/overtime`;
  public static ValidatePresence = `${ATTENDANCE_URL}/attendance/confirmation`;
}
