import type { DashboardDate } from "@whitebeardeveloper/contracts";

export interface WttrForecastDay {
  date: DashboardDate;
  mintempC: string;
  maxtempC: string;
}

export interface WttrResponse {
  weather: WttrForecastDay[];
}
