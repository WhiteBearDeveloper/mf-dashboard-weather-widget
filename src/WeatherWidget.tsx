import React, { useCallback } from "react";
import { format, parseISO } from "date-fns";
import type { DashboardWidgetProps } from "@whitebeardeveloper/contracts";
import styles from "./WeatherWidget.module.scss";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import type { WttrResponse } from "./types/weather";
import {
  cities,
  City,
  useWeatherLocationStore,
} from "./store/weatherLocationStore";
import { SelectField } from "@whitebeardeveloper/ui";

const queryClient = new QueryClient();

const getWeather = async (location: City["value"]): Promise<WttrResponse> => {
  const response = await axios.get<WttrResponse>(
    `https://wttr.in/${location}`,
    {
      params: {
        format: "j1",
        lang: "ru",
      },
    },
  );

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
  const location = useWeatherLocationStore(state => state.location);
  const updateLocation = useWeatherLocationStore(state => state.updateLocation);

  const formattedDate = format(parseISO(date), "dd.MM.yyyy");

  const selectData = useCallback(
    (data: WttrResponse) => data.weather.filter(day => day.date === date)[0],
    [date],
  );

  const queryKey = ["weather", location.value] as const;

  const {
    data,
    isPending,
    isRefetching,
    isError,
    isRefetchError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: () => getWeather(location.value),
    staleTime: 1000 * 60,
    select: selectData,
  });

  const onCityChange = (value: string) => {
    const city = cities.filter(item => item.value === value)[0];
    updateLocation(city);
  };

  const refetchData = () => {
    refetch();
  };

  return (
    <section className={styles.content}>
      <SelectField
        label="Выберите город"
        onChange={onCityChange}
        options={cities}
        selectedValue={location.value}
      />
      {isPending && "Загружаем данные..."}
      {isRefetching && "Обновляем данные..."}
      {!isRefetching &&
        isRefetchError &&
        "Произошла ошибка обновления, попробуйте, позже"}
      {!isRefetchError && isError && (
        <>
          <div>Произошла ошибка, попробуйте, позже</div>
          <button onClick={refetchData}>Запросить снова</button>
        </>
      )}
      {!!data ? (
        <>
          <h2>Прогноз погоды {location.label}</h2>
          <p>Выбранная дата: {formattedDate}</p>
          <p>
            {data.mintempC} °C - {data.maxtempC} °C
          </p>
        </>
      ) : (
        isSuccess && <>По Вашему запросу данные не найдены</>
      )}
    </section>
  );
};

export default WeatherWidget;
