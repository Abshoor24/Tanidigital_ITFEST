import { type WeatherData } from "../utils/api";

interface props {
    status: string;
    data: WeatherData | null;
}

export default function WeatherResult({ status, data }: props) {
    if (!data) return null;
    

    return (
        <div className="border rounded-lg p-4 mt-4 bg-white shadow">
            <h2 className="text-xl font-bold m-2">Hasil Prediksi</h2>
            <p className="text-xs font-bold">{status}</p>
            <div className="mt-3 text-sm text-gray-700">
                    <p>🌧️ Curah Hujan: {data.rainSum.toFixed(1)} mm</p>
                    <p>🌡️ Suhu: {data.temp.toFixed(1)} °C</p>
                    <p>💧 Kelembapan Tanah: {(data.soilMoisture * 100).toFixed(1)}%</p>
                    <p>🌬️ Kecepatan Angin: {data.wind.toFixed(1)} m/s</p>
                  </div>
        </div>
    )
}