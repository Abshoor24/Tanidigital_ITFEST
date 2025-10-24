import React from "react";
import DropdownProvinsi from "../DropdownProvinsi";
import DropdownTanaman from "../DropdownTanaman";
import WeatherResult from "../WeatherResult";
import provinsiData from "../../data/provinsi.json";
import { fetchWeatherData, type WeatherData } from "../../utils/api";
import Toast from "react-hot-toast";

export default function PredictionSection() {
  const [selectedProvinsi, setSelectedProvinsi] = React.useState("");
  const [selectedTanaman, setSelectedTanaman] = React.useState("");
  const [status, setStatus] = React.useState<string[]>([]);
  const [weatherData, setWeatherData] = React.useState<WeatherData[]>([]);
  const [conclusion, setConclusion] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

  const handlePrediksiTanamPanen = async () => {
    const prov = provinsiData.find((p) => p.nama === selectedProvinsi);
    if (!prov || !selectedTanaman) {
      Toast.error("Pilih provinsi dan tanaman terlebih dahulu.");
      return;
    }
      
    setLoading(true);
    const dataTanam = await fetchWeatherData(
      prov.latitude,
      prov.longitude,
      "tanam"
    );
    const dataPanen = await fetchWeatherData(
      prov.latitude,
      prov.longitude,
      "panen"
    );
    setLoading(false);

    let hasilTanam = "";
    let hasilPanen = "";

    // logic prediksi tanam dan panen
    switch (selectedTanaman) {
      case "padi":
        if (
          dataPanen.rainSum < 10 &&
          dataPanen.soilMoisture >= 0.25 &&
          dataPanen.soilMoisture <= 0.4
        )
          hasilPanen = `🌾 Waktu Tepat untuk Panen Padi\nCurah hujan: ${dataPanen.rainSum.toFixed(
            1
          )} mm, Kelembapan tanah: ${(dataPanen.soilMoisture * 100).toFixed(
            1
          )}%`;
        else if (dataPanen.rainSum > 15)
          hasilPanen = `☔ Tunda panen, curah hujan tinggi (${dataPanen.rainSum.toFixed(
            1
          )} mm)`;
        else hasilPanen = `🌤️ Cuaca cukup baik, pantau kondisi tanaman`;

        if (dataTanam.rainSum > 5 && dataTanam.soilMoisture >= 0.2)
          hasilTanam = `🌱 Waktu Tepat untuk Menanam Padi\nCurah hujan: ${dataTanam.rainSum.toFixed(
            1
          )} mm, Kelembapan tanah: ${(dataTanam.soilMoisture * 100).toFixed(
            1
          )}%`;
        else hasilTanam = `💧 Kondisi tanah kurang lembab untuk menanam padi`;
        break;

      case "jagung":
        if (
          dataPanen.rainSum < 5 &&
          dataPanen.soilMoisture >= 0.15 &&
          dataPanen.soilMoisture <= 0.3
        )
          hasilPanen = `🌽 Waktu Tepat untuk Panen Jagung`;
        else if (dataPanen.rainSum > 10)
          hasilPanen = `🌧️ Terlalu lembab, tunda panen jagung`;
        else hasilPanen = `🌤️ Cuaca cukup baik untuk jagung`;

        if (dataTanam.rainSum > 3 && dataTanam.soilMoisture >= 0.15)
          hasilTanam = `🌱 Waktu Tepat untuk Menanam Jagung`;
        else hasilTanam = `💧 Kondisi tanah belum optimal untuk menanam jagung`;
        break;

      case "cabai":
        if (
          dataPanen.rainSum < 5 &&
          dataPanen.soilMoisture >= 0.2 &&
          dataPanen.soilMoisture <= 0.35
        )
          hasilPanen = `🌶️ Waktu Tepat untuk Panen Cabai`;
        else if (dataPanen.rainSum > 8)
          hasilPanen = `☔ Tunda panen, hujan bisa merusak kualitas cabai`;
        else hasilPanen = `🌤️ Cuaca cukup baik untuk panen cabai`;

        if (dataTanam.rainSum < 5 && dataTanam.soilMoisture >= 0.2)
          hasilTanam = `🌱 Waktu Tepat untuk Menanam Cabai (hindari musim hujan deras)`;
        else
          hasilTanam = `🌧️ Terlalu basah untuk menanam cabai, tunda beberapa hari`;
        break;

      case "tomat":
        if (
          dataPanen.rainSum < 7 &&
          dataPanen.soilMoisture >= 0.25 &&
          dataPanen.soilMoisture <= 0.4
        )
          hasilPanen = `🍅 Waktu Tepat untuk Panen Tomat`;
        else if (dataPanen.rainSum > 12)
          hasilPanen = `🌧️ Tunda panen, curah hujan tinggi dapat menyebabkan busuk buah`;
        else hasilPanen = `🌤️ Cuaca cukup baik untuk panen tomat`;

        if (dataTanam.rainSum > 3 && dataTanam.soilMoisture >= 0.2)
          hasilTanam = `🌱 Waktu Tepat untuk Menanam Tomat`;
        else hasilTanam = `💧 Kondisi tanah belum ideal untuk menanam tomat`;
        break;

      case "kopi":
        if (
          dataPanen.rainSum < 10 &&
          dataPanen.soilMoisture >= 0.25 &&
          dataPanen.soilMoisture <= 0.5
        )
          hasilPanen = `☕ Waktu Tepat untuk Panen Kopi`;
        else if (dataPanen.rainSum > 15)
          hasilPanen = `🌧️ Tunda panen kopi, biji bisa rusak karena lembap tinggi`;
        else
          hasilPanen = `🌤️ Kondisi cukup baik, namun periksa kelembapan biji`;

        if (dataTanam.rainSum > 8 && dataTanam.soilMoisture >= 0.3)
          hasilTanam = `🌱 Waktu Tepat untuk Menanam Kopi (musim hujan ringan)`;
        else hasilTanam = `💧 Tanah belum cukup lembap untuk menanam kopi`;
        break;

      case "teh":
        if (
          dataPanen.rainSum < 10 &&
          dataPanen.soilMoisture >= 0.3 &&
          dataPanen.soilMoisture <= 0.6
        )
          hasilPanen = `🍃 Waktu Tepat untuk Panen Teh`;
        else if (dataPanen.rainSum > 15)
          hasilPanen = `🌧️ Tunda panen, kelembapan tinggi dapat menurunkan kualitas daun teh`;
        else hasilPanen = `🌤️ Cuaca cukup baik untuk panen teh`;

        if (dataTanam.rainSum > 8 && dataTanam.soilMoisture >= 0.3)
          hasilTanam = `🌱 Waktu Tepat untuk Menanam Teh (musim hujan ringan)`;
        else hasilTanam = `💧 Tanah belum cukup lembap untuk menanam teh`;
        break;

      case "bawang-merah":
        if (
          dataPanen.rainSum < 5 &&
          dataPanen.soilMoisture >= 0.2 &&
          dataPanen.soilMoisture <= 0.35
        )
          hasilPanen = `🧅 Waktu Tepat untuk Panen Bawang Merah`;
        else if (dataPanen.rainSum > 8)
          hasilPanen = `☔ Tunda panen, curah hujan tinggi bisa membuat bawang membusuk`;
        else hasilPanen = `🌤️ Cuaca cukup baik untuk panen bawang merah`;

        if (dataTanam.rainSum < 5 && dataTanam.soilMoisture >= 0.2)
          hasilTanam = `🌱 Waktu Tepat untuk Menanam Bawang Merah (hindari hujan deras)`;
        else hasilTanam = `🌧️ Terlalu basah untuk menanam bawang merah`;
        break;

      case "singkong":
        if (
          dataPanen.rainSum < 10 &&
          dataPanen.soilMoisture >= 0.2 &&
          dataPanen.soilMoisture <= 0.4
        )
          hasilPanen = `🌿 Waktu Tepat untuk Panen Singkong`;
        else if (dataPanen.rainSum > 15)
          hasilPanen = `🌧️ Tunda panen, tanah terlalu lembap bisa membuat umbi busuk`;
        else hasilPanen = `🌤️ Cuaca cukup baik untuk panen singkong`;

        if (dataTanam.rainSum > 5 && dataTanam.soilMoisture >= 0.25)
          hasilTanam = `🌱 Waktu Tepat untuk Menanam Singkong`;
        else hasilTanam = `💧 Tanah belum cukup lembap untuk menanam singkong`;
        break;

      case "kelapa-sawit":
        if (
          dataPanen.rainSum < 15 &&
          dataPanen.soilMoisture >= 0.3 &&
          dataPanen.soilMoisture <= 0.6
        )
          hasilPanen = `🌴 Waktu Tepat untuk Panen Kelapa Sawit`;
        else if (dataPanen.rainSum > 20)
          hasilPanen = `🌧️ Curah hujan tinggi, tunda panen agar tidak mengganggu pemanenan`;
        else hasilPanen = `🌤️ Cuaca cukup baik untuk panen sawit`;

        if (dataTanam.rainSum > 10 && dataTanam.soilMoisture >= 0.35)
          hasilTanam = `🌱 Waktu Tepat untuk Menanam Kelapa Sawit (musim hujan ringan)`;
        else hasilTanam = `💧 Tanah belum cukup lembap untuk menanam sawit`;
        break;

      case "tembakau":
        if (
          dataPanen.rainSum < 5 &&
          dataPanen.soilMoisture >= 0.15 &&
          dataPanen.soilMoisture <= 0.3
        )
          hasilPanen = `🚬 Waktu Tepat untuk Panen Tembakau (musim kering ideal)`;
        else if (dataPanen.rainSum > 8)
          hasilPanen = `🌧️ Tunda panen, kelembapan tinggi dapat menurunkan kualitas daun`;
        else hasilPanen = `🌤️ Cuaca cukup baik untuk panen tembakau`;

        if (dataTanam.rainSum < 5 && dataTanam.soilMoisture >= 0.2)
          hasilTanam = `🌱 Waktu Tepat untuk Menanam Tembakau (hindari musim hujan)`;
        else hasilTanam = `🌧️ Terlalu lembap untuk menanam tembakau`;
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
          selectedTanaman={selectedTanaman}
          onSelect={setSelectedTanaman}
        />

        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrediksiTanamPanen}
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
