import { SelectFieldOption } from "@whitebeardeveloper/ui";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type City = SelectFieldOption;

type State = {
  location: City;
};

type Action = {
  updateLocation: (location: City) => void;
};

export const cities: SelectFieldOption[] = [
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
