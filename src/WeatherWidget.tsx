import { format, parseISO } from "date-fns";
import type { DashboardWidgetProps } from "@whitebeardeveloper/contracts";
import styles from "./WeatherWidget.module.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cities, useWeatherLocationStore } from "./store/weatherLocationStore";
import { SelectField } from "@whitebeardeveloper/ui";
import { useWeatherQuery } from "./hooks/useWeatherQuery";
import { WeatherForecast } from "./components/WeatherForecast";

const queryClient = new QueryClient();

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

  const {
    data,
    isPending,
    isRefetching,
    isError,
    isRefetchError,
    isSuccess,
    refetch,
  } = useWeatherQuery(date);

  const onCityChange = (value: string) => {
    const city = cities.find(item => item.value === value);
    if (city) {
      updateLocation(city);
    }
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
          <button onClick={() => refetch()}>Запросить снова</button>
        </>
      )}
      {!!data ? (
        <WeatherForecast
          city={location.label}
          date={formattedDate}
          minTemp={data.mintempC}
          maxTemp={data.maxtempC}
        />
      ) : (
        isSuccess && <>По Вашему запросу данные не найдены</>
      )}
    </section>
  );
};

export default WeatherWidget;
