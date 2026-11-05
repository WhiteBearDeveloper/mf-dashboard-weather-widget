import { create } from "zustand";
import { persist } from "zustand/middleware";

export type City = {
  value: string;
  label: string;
};

type State = {
  location: City;
};

type Action = {
  updateLocation: (location: City) => void;
};

export const cities: City[] = [
  {
    value: "Barnaul",
    label: "Барнаул",
  },
  {
    value: "Novosibirsk",
    label: "Новосибирск",
  },
  {
    value: "Moscow",
    label: "Москва",
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
