export interface DaySummary {
  presence: number;
  permit: number;
  absent: number;
}

export interface WeeklySummary {
  monday: DaySummary;
  tuesday: DaySummary;
  wednesday: DaySummary;
  thursday: DaySummary;
  friday: DaySummary;
  saturday: DaySummary;
}

export interface DashboardResData {
  date: string;
  total_presence: number;
  total_permit: number;
  total_absent: number;
  weekly_summary: WeeklySummary;
}
