export default function Footer() {
  const whatsappNumber = "628895762974";
  const message = encodeURIComponent("Halo, saya tertarik dengan Agro Vision!");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <footer className="flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-16 py-6 bg-gradient-to-r from-green-700 to-emerald-600 text-white">
      <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
        <h2 className="text-2xl font-bold tracking-wide">Agro Vision 🌱</h2>
        <p className="text-sm text-gray-200 max-w-md">
          Prediksi pertanian berbasis data untuk keputusan cerdas dan panen yang lebih pasti.
        </p>
      </div>

      <div className="flex items-center justify-center gap-6 mt-4 md:mt-0">
        <a
          href="#section1"
          className="hover:text-green-200 transition duration-300 hover:underline"
        >
          Beranda
        </a>
        <a
          href="#prediction"
          className="hover:text-green-200 transition duration-300 hover:underline"
        >
          Prediksi
        </a>
        <a
          href="#article"
          className="hover:text-green-200 transition duration-300 hover:underline"
        >
          Artikel
        </a>
      </div>

      <div className="mt-4 md:mt-0">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white text-green-700 font-semibold px-4 py-2 rounded-full shadow-md hover:bg-green-100 transition duration-300"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-5 h-5"
          />
          Hubungi Kami
        </a>
      </div>
    </footer>
  );
}