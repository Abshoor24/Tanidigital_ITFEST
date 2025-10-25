interface WeatherData {
  rainSum?: number;
  temp?: number;
  soilMoisture?: number;
  wind?: number;
}

interface Props {
  status: string[];
  data: WeatherData[];
  conclusion?: string;
}

export default function WeatherResult({ status, data, conclusion }: Props) {
  if ((!data || data.length === 0) && (!status || status.length === 0) && !conclusion) return null;

  const renderCard = (title: string, s?: string, d?: WeatherData) => (
    <div className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-white to-gray-50 
      shadow-sm hover:shadow-lg transition-all duration-300 hover:border-green-300 
      flex flex-col justify-between h-full min-w-0">
      
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          <h3 className="font-bold text-lg text-gray-800">{title}</h3>
        </div>

        {s && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-4">
            <pre className="text-sm font-semibold text-green-800 whitespace-pre-line leading-relaxed">{s}</pre>
          </div>
        )}
      </div>

      {d ? (
        <div className="grid grid-cols-2 gap-4 mt-auto">
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="text-2xl mb-1">🌧️</div>
            <p className="text-xs text-gray-600">Curah Hujan</p>
            <p className="text-base font-bold text-blue-700">{d.rainSum?.toFixed(1)} mm</p>
          </div>

          <div className="bg-orange-50 p-3 rounded-lg text-center">
            <div className="text-2xl mb-1">🌡️</div>
            <p className="text-xs text-gray-600">Suhu</p>
            <p className="text-base font-bold text-orange-700">{d.temp?.toFixed(1)} °C</p>
          </div>

          <div className="bg-teal-50 p-3 rounded-lg text-center">
            <div className="text-2xl mb-1">💧</div>
            <p className="text-xs text-gray-600">Kelembapan Tanah</p>
            <p className="text-base font-bold text-teal-700">{((d.soilMoisture ?? 0) * 100).toFixed(1)}%</p>
          </div>

          <div className="bg-sky-50 p-3 rounded-lg text-center">
            <div className="text-2xl mb-1">🌬️</div>
            <p className="text-xs text-gray-600">Kecepatan Angin</p>
            <p className="text-base font-bold text-sky-700">{d.wind?.toFixed(1)} m/s</p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 p-4 rounded-lg text-center mt-auto">
          <p className="text-sm text-gray-500">📊 Data tidak tersedia</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="mt-8 w-full">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 shadow-md mb-6 text-center w-full">
        <h2 className="text-2xl font-bold text-white">📊 Hasil Prediksi</h2>
      </div>

      {conclusion && (
        <div className="mb-6 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-400 rounded-r-lg w-full max-w-5xl mx-auto">
          <div className="flex items-start gap-3">
            <p className="text-base text-gray-700 leading-relaxed italic">{conclusion}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl mx-auto items-stretch">
        {renderCard("🌱 Prediksi Menanam", status[0], data[0])}
        {renderCard("🌾 Prediksi Panen", status[1], data[1])}
      </div>
    </div>
  );
}