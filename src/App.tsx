import { useState } from "react";
import DropdownProvinsi from "./components/DropdownProvinsi";
import DropdownTanaman from "./components/DropdownTanaman";
import WeatherResult from "./components/WeatherResult";
import provinsiData from "./data/provinsi.json";
import { fetchWeatherData, type WeatherData } from "./utils/api";
import PredictionSection from "./components/sections/PredictSection";

export default function PrediksiPanen() {

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-2">
      <PredictionSection/>
    </div>
  );
}
