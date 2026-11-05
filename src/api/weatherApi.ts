import axios from "axios";
import type { WttrResponse } from "../types/weather";

export const getWeather = async (location: string): Promise<WttrResponse> => {
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
