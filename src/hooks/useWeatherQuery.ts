import { useQuery } from "@tanstack/react-query";
import { useWeatherLocationStore } from "../store/weatherLocationStore";
import { getWeather } from "../api/weatherApi";
import { useCallback } from "react";
import type { WttrResponse } from "../types/weather";
import type { DashboardDate } from "@whitebeardeveloper/contracts";

export const useWeatherQuery = (date: DashboardDate) => {
  const location = useWeatherLocationStore(state => state.location);

  const selectData = useCallback(
    (data: WttrResponse) => data.weather.find(day => day.date === date),
    [date],
  );

  const queryKey = ["weather", location.value] as const;

  return useQuery({
    queryKey,
    queryFn: () => getWeather(location.value),
    staleTime: 1000 * 60,
    select: selectData,
  });
};
