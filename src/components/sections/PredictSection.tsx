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

  const handlePredict = async () => {
    await PredictionLogicHandle({
      provinsiData,
      selectedProvinsi,
      selectedPlantIndex,
      setConclusion,
      setLoading,
      setStatus,
      setWeatherData,
    });
  };

  return (
    <section className="flex flex-col xl:flex-row mx-auto mt-6 mb-16 px-4 md:px-6 w-full min-h-[80vh] gap-5">
      <div className="relative flex flex-col w-full h-full xl:max-w-[35%] bg-white rounded-xl shadow-lg p-5 backdrop-blur-sm">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 shadow-md mb-6 text-center w-full">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white">
            🌱 Prediksi Tanam dan Panen
          </h2>
        </div>

        <div className="flex flex-col w-full h-full md:grid-cols-3 gap-4 md:gap-6 items-center justify-between mb-6">
          <section className="flex flex-col w-full gap-10">
            <div className="w-full h-20">
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
          </section>
          <div className="w-full flex self-end">
            <button
              onClick={handlePredict}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg disabled:opacity-50 font-semibold transition-all 
              duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              {loading ? "⏳ Memproses..." : "🔍 Prediksi"}
            </button>
          </div>
        </div>
      </div>
      {/* Weather Result Section */}
      <WeatherResult
        status={status}
        data={weatherData}
        conclusion={conclusion}
      />
    </section>
  );
}
