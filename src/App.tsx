import { useState } from "react";
import DropdownProvinsi from "./components/DropdownProvinsi";
import DropdownTanaman from "./components/DropdownTanaman";
import WeatherResult from "./components/WeatherResult";
import provinsiData from "./data/provinsi.json";
import { fetchWeatherData, type WeatherData } from "./utils/api";

export default function PrediksiPanen() {
  const [selectedProvinsi, setSelectedProvinsi] = useState("");
  const [selectedTanaman, setSelectedTanaman] = useState("");
  const [status, setStatus] = useState<string[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [conclusion, setConclusion] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handlePrediksiTanamPanen = async () => {
    const prov = provinsiData.find((p) => p.nama === selectedProvinsi);
    if (!prov || !selectedTanaman) return alert("Pilih provinsi dan tanaman dulu!");

    setLoading(true);
    const dataTanam = await fetchWeatherData(prov.latitude, prov.longitude, "tanam");
    const dataPanen = await fetchWeatherData(prov.latitude, prov.longitude, "panen");
    setLoading(false);

    let hasilTanam = "";
    let hasilPanen = "";

    // logic prediksi tanam dan panen
    switch (selectedTanaman) {
      case "🌾 Padi":
        if (dataPanen.rainSum < 10 && dataPanen.soilMoisture >= 0.25 && dataPanen.soilMoisture <= 0.4)
          hasilPanen = `🌾 Waktu Tepat untuk Panen Padi\nCurah hujan: ${dataPanen.rainSum.toFixed(1)} mm, Kelembapan tanah: ${(dataPanen.soilMoisture * 100).toFixed(1)}%`;
        else if (dataPanen.rainSum > 15)
          hasilPanen = `☔ Tunda panen, curah hujan tinggi (${dataPanen.rainSum.toFixed(1)} mm)`;
        else hasilPanen = `🌤️ Cuaca cukup baik, pantau kondisi tanaman`;

        if (dataTanam.rainSum > 5 && dataTanam.soilMoisture >= 0.2)
          hasilTanam = `🌱 Waktu Tepat untuk Menanam Padi\nCurah hujan: ${dataTanam.rainSum.toFixed(1)} mm, Kelembapan tanah: ${(dataTanam.soilMoisture * 100).toFixed(1)}%`;
        else hasilTanam = `💧 Kondisi tanah kurang lembab untuk menanam padi`;
        break;

      case "🌽 Jagung":
        if (dataPanen.rainSum < 5 && dataPanen.soilMoisture >= 0.15 && dataPanen.soilMoisture <= 0.3)
          hasilPanen = `🌽 Waktu Tepat untuk Panen Jagung`;
        else if (dataPanen.rainSum > 10)
          hasilPanen = `🌧️ Terlalu lembab, tunda panen jagung`;
        else hasilPanen = `🌤️ Cuaca cukup baik untuk jagung`;

        if (dataTanam.rainSum > 3 && dataTanam.soilMoisture >= 0.15)
          hasilTanam = `🌱 Waktu Tepat untuk Menanam Jagung`;
        else hasilTanam = `💧 Kondisi tanah belum optimal untuk menanam jagung`;
        break;

      case "🌶️ Cabai":
        if (dataPanen.rainSum < 5 && dataPanen.soilMoisture >= 0.2 && dataPanen.soilMoisture <= 0.35)
          hasilPanen = `🌶️ Waktu Tepat untuk Panen Cabai`;
        else if (dataPanen.rainSum > 8)
          hasilPanen = `☔ Tunda panen, hujan bisa merusak kualitas cabai`;
        else hasilPanen = `🌤️ Cuaca cukup baik untuk panen cabai`;

        if (dataTanam.rainSum < 5 && dataTanam.soilMoisture >= 0.2)
          hasilTanam = `🌱 Waktu Tepat untuk Menanam Cabai (hindari musim hujan deras)`;
        else hasilTanam = `🌧️ Terlalu basah untuk menanam cabai, tunda beberapa hari`;
        break;

      case "🍅 Tomat":
        if (dataPanen.rainSum < 7 && dataPanen.soilMoisture >= 0.25 && dataPanen.soilMoisture <= 0.4)
          hasilPanen = `🍅 Waktu Tepat untuk Panen Tomat`;
        else if (dataPanen.rainSum > 12)
          hasilPanen = `🌧️ Tunda panen, curah hujan tinggi dapat menyebabkan busuk buah`;
        else hasilPanen = `🌤️ Cuaca cukup baik untuk panen tomat`;

        if (dataTanam.rainSum > 3 && dataTanam.soilMoisture >= 0.2)
          hasilTanam = `🌱 Waktu Tepat untuk Menanam Tomat`;
        else hasilTanam = `💧 Kondisi tanah belum ideal untuk menanam tomat`;
        break;

      case "☕ Kopi":
        if (dataPanen.rainSum < 10 && dataPanen.soilMoisture >= 0.25 && dataPanen.soilMoisture <= 0.5)
          hasilPanen = `☕ Waktu Tepat untuk Panen Kopi`;
        else if (dataPanen.rainSum > 15)
          hasilPanen = `🌧️ Tunda panen kopi, biji bisa rusak karena lembap tinggi`;
        else hasilPanen = `🌤️ Kondisi cukup baik, namun periksa kelembapan biji`;

        if (dataTanam.rainSum > 8 && dataTanam.soilMoisture >= 0.3)
          hasilTanam = `🌱 Waktu Tepat untuk Menanam Kopi (musim hujan ringan)`;
        else hasilTanam = `💧 Tanah belum cukup lembap untuk menanam kopi`;
        break;

      default:
        hasilTanam = "⚠️ Pilih tanaman terlebih dahulu";
        hasilPanen = "⚠️ Pilih tanaman terlebih dahulu";
    }

    setWeatherData([dataTanam, dataPanen]);
    setStatus([hasilTanam, hasilPanen]);
    setConclusion(`${hasilTanam}\n & \n${hasilPanen}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      <div className="max-w-md mx-auto mt-10 mb-10 p-6 border rounded-xl shadow-md bg-white">
          <h1 className="text-2xl font-bold mb-4 text-center">🌾 Prediksi Tanam & Panen</h1>

      <div className="flex flex-col gap-4">
        <DropdownProvinsi selectedProvinsi={selectedProvinsi} onSelect={setSelectedProvinsi} />
        <DropdownTanaman selectedTanaman={selectedTanaman} onSelect={setSelectedTanaman} />

        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrediksiTanamPanen}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Prediksi Tanam & Panen"}
          </button>
        </div>
      </div>

  <WeatherResult status={status} data={weatherData} conclusion={conclusion} />
      </div>
    </div>
  );
}