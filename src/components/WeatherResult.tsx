import { type WeatherData } from "../utils/api";

interface props {
    status: string[];
    data: WeatherData[];
}

export default function WeatherResult({ status, data }: props) {
    if ((!data || data.length === 0) && (!status || status.length === 0)) return null;

    const renderCard = (title: string, s?: string, d?: WeatherData) => (
        <div className="border rounded-lg p-3 bg-gray-50">
            <h3 className="font-semibold mb-1">{title}</h3>
            {s && <pre className="text-xs font-bold whitespace-pre-line">{s}</pre>}
            {d ? (
                <div className="mt-2 text-sm text-gray-700">
                    <p>🌧️ Curah Hujan: {d.rainSum?.toFixed(1)} mm</p>
                    <p>🌡️ Suhu: {d.temp?.toFixed(1)} °C</p>
                    <p>💧 Kelembapan Tanah: {(d.soilMoisture * 100)?.toFixed(1)}%</p>
                    <p>🌬️ Kecepatan Angin: {d.wind?.toFixed(1)} m/s</p>
                </div>
            ) : (
                <p className="text-sm text-gray-500 mt-2">Data tidak tersedia</p>
            )}
        </div>
    );

    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold m-2">Hasil Prediksi 7 Hari kedepan</h2>
            <div className="grid grid-cols-1 gap-3">
                {renderCard("Prediksi Tanam", status[0], data[0])}
                {renderCard("Prediksi Panen", status[1], data[1])}
            </div>
        </div>
    );
}
