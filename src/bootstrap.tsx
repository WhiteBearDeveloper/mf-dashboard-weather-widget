import { createRoot } from "react-dom/client";
import { format } from "date-fns";
import WeatherWidget from "./WeatherWidget";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Не найден элемент #root");
}

createRoot(rootElement).render(
  <WeatherWidget date={format(new Date(), "yyyy-MM-dd")} />,
);
