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
    <section className="max-w-md mx-auto mt-10 mb-10 p-6 border rounded-xl shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Prediksi Tanam & Panen
      </h1>

      <div className="flex flex-col gap-4">
        <DropdownProvinsi
          selectedProvinsi={selectedProvinsi}
          onSelect={setSelectedProvinsi}
        />
        <DropdownTanaman
          selectedTanaman={selectedPlantIndex}
          onSelect={setSelectedPlantIndex}
        />

        <div className="flex justify-center mt-4">
          <button
            onClick={handlePredict}
            disabled={loading}
            className="bg-green-500 hover:bg-green-300 text-white px-4 py-2 rounded-lg disabled:opacity-50 font-semibold transition duration-700"
          >
            {loading ? "Memproses..." : "Prediksi Tanam & Panen"}
          </button>
        </div>
      </div>

      <WeatherResult
        status={status}
        data={weatherData}
        conclusion={conclusion}
      />
    </section>
  );
}
