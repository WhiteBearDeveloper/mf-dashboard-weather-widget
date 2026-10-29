import { createRoot } from "react-dom/client";
import { format } from "date-fns";
import WeatherWidget from "./WeatherWidget";
import { SurfaceBlock } from "@whitebeardeveloper/ui";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Не найден элемент #root");
}

createRoot(rootElement).render(
  <SurfaceBlock>
    <WeatherWidget date={format(new Date(), "yyyy-MM-dd")} />
  </SurfaceBlock>,
);
