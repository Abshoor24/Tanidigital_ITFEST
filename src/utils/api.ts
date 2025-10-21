import { fetchWeatherApi } from "openmeteo";

// tipe untuk data cuaca yang diambil dari API
export interface WeatherData {
  rainSum: number;
  temp: number;
  soilMoisture: number;
  wind: number;
}

// bawaan fungsi untuk mengambil data cuaca dari API Open-Meteo
export async function fetchWeatherData(
  latitude: number,
  longitude: number,
  type: "tanam" | "panen"
): Promise<WeatherData> {
  const params = {
    latitude,
    longitude,
    daily: ["rain_sum"],
    hourly: [
      "temperature_2m",
      "soil_temperature_0cm",
      "soil_moisture_0_to_1cm",
      "precipitation_probability",
      "wind_speed_10m",
    ],
    current: ["relative_humidity_2m", "temperature_2m"],
    past_days: type === "panen" ? 14 : 0,
    forecast_days: type === "tanam" ? 7 : 0,
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();
  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  const rainSum = daily.variables(0)?.valuesArray()?.[0] ?? 0;
  const temp = hourly.variables(0)?.valuesArray()?.[0] ?? 0;
  const soilMoisture = hourly.variables(2)?.valuesArray()?.[0] ?? 0;
  const wind = hourly.variables(4)?.valuesArray()?.[0] ?? 0;

  return { rainSum, temp, soilMoisture, wind };
}