import sect2 from "../../assets/sect2.png";
import { BarChart3, MonitorSmartphone, User2 } from "lucide-react";

export default function Section2() {
  return (
    <section className="bg-white py-16 px-6 md:px-20 w-full min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Gambar kiri */}
        <div className="flex-1 flex justify-center md:justify-start">
          <img
            src={sect2}
            alt="Agriculture Illustration"
            className="w-72 md:w-[420px] drop-shadow-lg"
          />
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-[#4ADE80] text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 size={28} />
              <h3 className="font-semibold text-lg">Realtime Prediksi</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Memungkinkan pengguna mengambil keputusan cepat berdasarkan data
              terkini.
            </p>
          </div>

          <div className="bg-[#4ADE80] text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <MonitorSmartphone size={28} />
              <h3 className="font-semibold text-lg">UI/UX Friendly</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Desain antarmuka dibuat sederhana, intuitif, dan modern.
            </p>
          </div>

          <div className="bg-[#4ADE80] text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow sm:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <User2 size={28} />
              <h3 className="font-semibold text-lg">Mudah Digunakan</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Fitur dan menu disusun secara jelas sehingga mudah diakses siapa
              pun.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
