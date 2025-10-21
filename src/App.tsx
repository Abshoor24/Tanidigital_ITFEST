import { useState } from "react";
import DropdownProvinsi from "./components/DropdownProvinsi";
import DropdownTanaman from "./components/DropdownTanaman";
import WeatherResult from "./components/WeatherResult";
import provinsiData from "./data/provinsi.json";
import { fetchWeatherData, type WeatherData } from "./utils/api";

export default function PrediksiPanen() {
  const [selectedProvinsi, setSelectedProvinsi] = useState("");
  const [selectedTanaman, setSelectedTanaman] = useState("");
  const [status, setStatus] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePrediksi = async (type: "tanam" | "panen") => {
    const prov = provinsiData.find((p) => p.nama === selectedProvinsi);
    if (!prov || !selectedTanaman) return alert("Pilih provinsi dan tanaman dulu!");

    setLoading(true);
    const data = await fetchWeatherData(prov.latitude, prov.longitude, type);
    setLoading(false);

    let hasil = "";

    if (selectedTanaman === "Padi") {
      if (type === "panen") {
        if (data.rainSum < 10 && data.soilMoisture >= 0.25 && data.soilMoisture <= 0.4)
          hasil = "🌾 Waktu Tepat untuk Panen Padi";
        else if (data.rainSum > 15) hasil = "☔ Tunda panen, curah hujan masih tinggi";
        else hasil = "🌤️ Cuaca cukup baik, periksa kondisi tanaman";
      } else {
        if (data.rainSum > 5 && data.soilMoisture >= 0.2)
          hasil = "🌱 Waktu Tepat untuk Menanam Padi";
        else hasil = "💧 Kondisi tanah kurang lembab untuk menanam padi";
      }
    } else if (selectedTanaman === "Jagung") {
      if (type === "panen") {
        if (data.rainSum < 5 && data.soilMoisture >= 0.15 && data.soilMoisture <= 0.3)
          hasil = "🌽 Waktu Tepat untuk Panen Jagung";
        else if (data.rainSum > 10) hasil = "🌧️ Terlalu lembab, tunda panen jagung";
        else hasil = "🌤️ Cuaca cukup baik untuk jagung";
      } else {
        if (data.rainSum > 3 && data.soilMoisture >= 0.15)
          hasil = "🌱 Waktu Tepat untuk Menanam Jagung";
        else hasil = "💧 Kondisi tanah belum optimal untuk jagung";
      }
    }

    setWeatherData(data);
    setStatus(hasil);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">🌾 Prediksi Tanam & Panen</h1>

      <div className="flex flex-col gap-4">
        <DropdownProvinsi selectedProvinsi={selectedProvinsi} onSelect={setSelectedProvinsi} />
        <DropdownTanaman selectedTanaman={selectedTanaman} onSelect={setSelectedTanaman} />

        <div className="flex justify-between mt-4">
          <button
            onClick={() => handlePrediksi("tanam")}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Prediksi Tanam"}
          </button>
          <button
            onClick={() => handlePrediksi("panen")}
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Prediksi Panen"}
          </button>
        </div>
      </div>

      <WeatherResult status={status} data={weatherData} />
    </div>
  );
}
