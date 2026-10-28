import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface City {
  value: string;
  name: string;
}

type State = {
  location: City;
};

type Action = {
  updateLocation: (location: City) => void;
};

export const cities: City[] = [
  {
    value: "Barnaul",
    name: "Барнаул",
  },
  {
    value: "Novosibirsk",
    name: "Новосибирск",
  },
  {
    value: "Moscow",
    name: "Москва",
  },
];

export const useWeatherLocationStore = create<State & Action>()(
  persist(
    set => ({
      location: cities[0],
      updateLocation: location => set(() => ({ location })),
    }),
    {
      name: "weather-storage",
    },
  ),
);
