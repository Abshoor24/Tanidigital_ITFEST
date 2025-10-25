import React from "react";
import DropdownProvinsi from "../DropdownProvinsi";
import DropdownTanaman from "../DropdownTanaman";
import WeatherResult from "../WeatherResult";
import provinsiData from "../../data/provinsi.json";
import { PredictionLogicHandle } from "../../utils/tanaman.utils";
import type { WeatherData } from "../../utils/api";

export default function PredictionSection() {
  const [selectedProvinsi, setSelectedProvinsi] = React.useState<string>("");
  const [selectedPlantIndex, setSelectedPlantIndex] = React.useState<number>(0);
  const [status, setStatus] = React.useState<string[]>([]);
  const [weatherData, setWeatherData] = React.useState<WeatherData[]>([]);
  const [conclusion, setConclusion] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

  const handlePredict = async() => {
    await PredictionLogicHandle({ provinsiData,selectedProvinsi, selectedPlantIndex, setConclusion, setLoading,setStatus,setWeatherData })
  }

  return (
    <section className="max-w-6xl mx-auto mt-10 mb-16 px-4 md:px-6 min-h-[80vh]">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
          Prediksi Tanam & Panen
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-end mb-6">
          <div className="w-full">
            <DropdownProvinsi
              selectedProvinsi={selectedProvinsi}
              onSelect={setSelectedProvinsi}
            />
          </div>
          
          <div className="w-full">
            <DropdownTanaman
              selectedTanaman={selectedPlantIndex}
              onSelect={setSelectedPlantIndex}
            />
          </div>

          <div className="w-full flex justify-center md:justify-start">
            <button
              onClick={handlePredict}
              disabled={loading}
              className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg disabled:opacity-50 font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 disabled:hover:scale-100"
            >
              {loading ? "⏳ Memproses..." : "🔍 Prediksi"}
            </button>
          </div>
        </div>

        {/* Weather Result Section */}
        <WeatherResult
          status={status}
          data={weatherData}
          conclusion={conclusion}
        />
      </div>
    </section>
  );
}