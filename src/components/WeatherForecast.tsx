interface Props {
  city: string;
  date: string;
  minTemp: string;
  maxTemp: string;
}

export const WeatherForecast = ({ city, date, minTemp, maxTemp }: Props) => {
  return (
    <>
      <h2>Прогноз погоды {city}</h2>
      <p>Выбранная дата: {date}</p>
      <p>
        {minTemp} °C - {maxTemp} °C
      </p>
    </>
  );
};
