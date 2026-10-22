import React from "react";
import type { DashboardWidgetProps } from "@whitebeardeveloper/contracts";
import styles from "./WeatherWidget.module.scss";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient();

const getWeather = async (date: string) => {
  const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
    params: {
      latitude: 53.35,
      longitude: 83.76,
      daily: "weather_code,temperature_2m_max,temperature_2m_min",
      start_date: date,
      end_date: date,
      timezone: "Asia/Barnaul",
    },
  });

  return response.data;
};

const WeatherWidget = (props: DashboardWidgetProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherContent {...props} />
    </QueryClientProvider>
  );
};

const WeatherContent = ({ date }: DashboardWidgetProps) => {
  const queryKey = ["weather", date] as const;

  const { isPending, isError, data } = useQuery({
    queryKey,
    queryFn: () => getWeather(date),
    staleTime: 1000 * 60,
  });

  return (
    <section className={styles.content}>
      {isPending ? (
        "Загружаем данные..."
      ) : isError ? (
        <>Произошла ошибка, попробуйте, позже</>
      ) : (
        <>
          <h2>Прогноз погоды</h2>
          <p>Выбранная дата: {date}</p>
          <p>
            {data.daily.temperature_2m_min} °C - {data.daily.temperature_2m_max}{" "}
            °C
          </p>
        </>
      )}
    </section>
  );
};

export default WeatherWidget;
