import React from "react";
import type { DashboardWidgetProps } from "@whitebeardeveloper/contracts";
import styles from "./WeatherWidget.module.scss";

const WeatherWidget = ({ date }: DashboardWidgetProps) => {
  return (
    <section className={styles.content}>
      <h2>Прогноз погоды</h2>
      <p>Выбранная дата: {date}</p>
    </section>
  );
};

export default WeatherWidget;
