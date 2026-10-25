import React, { useCallback } from "react";
import type { DashboardWidgetProps } from "@whitebeardeveloper/contracts";
import styles from "./WeatherWidget.module.scss";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import type { WttrResponse } from "./types/weather";

const queryClient = new QueryClient();

const getWeather = async (): Promise<WttrResponse> => {
  const response = await axios.get<WttrResponse>("https://wttr.in/Barnaul", {
    params: {
      format: "j1",
      lang: "ru",
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
  const selectData = useCallback(
    (data: WttrResponse) => data.weather.filter(day => day.date === date)[0],
    [date],
  );

  const queryKey = ["weather"] as const;

  const { isPending, isError, data } = useQuery({
    queryKey,
    queryFn: () => getWeather(),
    staleTime: 1000 * 60,
    select: selectData,
  });

  return (
    <section className={styles.content}>
      {isPending && "Загружаем данные..."}
      {isError && "Произошла ошибка, попробуйте, позже"}
      {!isPending && !isError && (
        <>
          <h2>Прогноз погоды</h2>
          <p>Выбранная дата: {date}</p>
          <p>
            {data.mintempC} °C - {data.maxtempC} °C
          </p>
        </>
      )}
    </section>
  );
};

export default WeatherWidget;
