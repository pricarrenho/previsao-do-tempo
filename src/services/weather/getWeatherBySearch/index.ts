import { weatherApi } from "../weatherApi";
import { CardData, getWeatherBySearchProps } from "./types";

export async function getWeatherBySearch({
  name,
  uf,
}: getWeatherBySearchProps): Promise<CardData | undefined> {
  const params = {
    q: name,
    days: 6,
    aqi: "no",
    alerts: "no",
  };

  try {
    const response = await weatherApi.get("", { params });

    return {
      name: name,
      uf: uf,
      currentWeather: response.data.current.temp_c.toFixed(0),
      weatherCondition: response.data.current.condition.text,
      maxTemp: response.data.forecast.forecastday[0].day.maxtemp_c.toFixed(0),
      minTemp: response.data.forecast.forecastday[0].day.mintemp_c.toFixed(0),
      tempSensation: response.data.current.feelslike_c.toFixed(0),
      humidity: response.data.current.humidity,
      wind: response.data.forecast.forecastday[0].day.maxwind_kph.toFixed(0),
      nextFiveDays: response.data.forecast.forecastday,
    };
  } catch (error) {
    console.error(error);
  }
}
