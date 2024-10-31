import { ReportResData } from '../interfaces/report.dto';

export type StackParamList = {
  Splash: any;
  OnsiteMain: { profile_photo: string; NIK: string };
  CoordinatorMain: { profile_photo: string; NIK: string };
  OnsiteDetailPage: { dataRow: ReportResData };
};
