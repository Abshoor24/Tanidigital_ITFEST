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
  const renderCard = (data: {
    title: string;
    s?: string;
    d?: WeatherData;
    t: "plant" | "harvest";
  }) => (
    <div
      className={`${
        data.t === "plant"
          ? "hover:border-green-300 "
          : "hover:border-[#AB7500]"
      } border-2 border-gray-200 rounded-xl p-4 bg-gradient-to-br from-white to-gray-50 
      shadow-sm hover:shadow-lg transition-all duration-300
      flex flex-col justify-between h-full min-w-0`}
    >
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div
            className={`${
              data.t === "plant" ? "bg-green-500" : "bg-[#AB7500]"
            } w-3 h-3 rounded-full animate-pulse`}
          ></div>
          <h3
            className={`${
              data.t === "plant" ? "text-green-500" : "text-[#AB7500]"
            } font-bold text-lg`}
          >
            {data.title}
          </h3>
        </div>

        {data.s && (
          <div
            className={`${
              data.t === "plant"
                ? "bg-green-50 border-green-500"
                : "bg-[#AB7500]/20 border-[#AB7500]"
            } border-l-4 p-4 rounded-r-lg mb-4`}
          >
            <pre
              className={`text-sm font-semibold text-gray-800 whitespace-pre-line leading-relaxed`}
            >
              {data.s}
            </pre>
          </div>
        )}
      </div>

      {data.d ? (
        <div className="grid grid-cols-2 gap-4 mt-auto">
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="text-2xl mb-1">🌧️</div>
            <p className="text-xs text-gray-600">Curah Hujan</p>
            <p className="text-base font-bold text-blue-700">
              {data.d.rainSum?.toFixed(1)} mm
            </p>
          </div>

          <div className="bg-orange-50 p-3 rounded-lg text-center">
            <div className="text-2xl mb-1">🌡️</div>
            <p className="text-xs text-gray-600">Suhu</p>
            <p className="text-base font-bold text-orange-700">
              {data.d.temp?.toFixed(1)} °C
            </p>
          </div>

          <div className="bg-teal-50 p-3 rounded-lg text-center">
            <div className="text-2xl mb-1">💧</div>
            <p className="text-xs text-gray-600">Kelembapan Tanah</p>
            <p className="text-base font-bold text-teal-700">
              {((data.d.soilMoisture ?? 0) * 100).toFixed(1)}%
            </p>
          </div>

          <div className="bg-sky-50 p-3 rounded-lg text-center">
            <div className="text-2xl mb-1">🌬️</div>
            <p className="text-xs text-gray-600">Kecepatan Angin</p>
            <p className="text-base font-bold text-sky-700">
              {data.d.wind?.toFixed(1)} m/s
            </p>
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
    <div className="flex flex-col w-full h-full bg-white p-5 rounded-xl shadow-lg">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 shadow-md mb-6 text-center w-full">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white">
          📊 Hasil Prediksi
        </h2>
      </div>
      <div className="mb-6 p-3 bg-gradient-to-r from-amber-50 to-yellow-200 border-l-4 border-amber-400 rounded-r-lg w-full max-w-5xl mx-auto">
        <div className="flex items-start gap-3">
          <p className="text-base text-gray-700 leading-relaxed italic font-semibold">
            {conclusion || "Data Tidak Tersedia"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-5xl mx-auto items-stretch">
        {renderCard({
          title: "🌱 Prediksi Menanam",
          s: status[0],
          d: data[0],
          t: "plant",
        })}
        {renderCard({
          title: "🌾 Prediksi Panen",
          s: status[1],
          d: data[1],
          t: "harvest",
        })}
      </div>
    </div>
  );
}
