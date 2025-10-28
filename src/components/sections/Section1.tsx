import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PlantImage from "../../assets/sect1.png";

export default function Section1() {
  const [text, setText] = useState("");
  const [titleText, setTitleText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const fullText =
    "Ubah cara bercocok tanam dengan teknologi prediksi berbasis data. Agro Vision membantu Anda menentukan waktu tanam, panen, dan strategi pertanian terbaik melalui data dan prediksi cuaca.";
  const titleFullText = "AGRO VISION";

  // Efek ketikan deskripsi (sekali jalan)
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  // Efek ketikan judul + hapus (loop)
  useEffect(() => {
    let i = 0;
    let isDeleting = false;

    const interval = setInterval(() => {
      if (!isDeleting && i < titleFullText.length) {
        setTitleText(titleFullText.slice(0, i + 1));
        i++;
        setIsTyping(true);
      } else if (!isDeleting && i >= titleFullText.length) {
        setTimeout(() => (isDeleting = true), 2000);
        setIsTyping(false);
      } else if (isDeleting && i > 0) {
        i--;
        setTitleText(titleFullText.slice(0, i));
        setIsTyping(true);
      } else if (isDeleting && i === 0) {
        isDeleting = false;
        setIsTyping(true);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between w-full min-h-screen bg-gradient-to-br from-[#F7F8FA] via-green-50/40 to-[#F7F8FA] px-6 md:px-16 py-16 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-green-100 via-emerald-50 to-green-200 opacity-40 -z-30"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />

      <div className="flex-1 text-center md:text-left space-y-4 md:space-y-6 z-10">
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative text-5xl md:text-7xl  font-extrabold"
        >
          <span className="invisible block">{titleFullText}</span>
          <span className="absolute left-0 top-0 whitespace-nowrap text-green-600">
            {titleText}
            <span
              className={`ml-[2px] border-r-2 ${
                isTyping ? "border-black" : "border-transparent"
              } animate-blink`}
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto md:mx-0"
        >
          {text}
        </motion.p>

        <motion.h5
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-2xl text-gray-800 font-bold flex items-center justify-center md:justify-start gap-2 mt-4"
        >
          Prediksi Cerdas. Panen Lebih Pasti.
        </motion.h5>
      </div>

      <div className="flex-1 flex justify-center mb-10 md:mb-0 relative">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-green-300 via-emerald-200 to-green-100 opacity-40 blur-3xl -z-10"
          animate={{
            scale: [1, 1.05, 1],
            x: [0, 10, -10, 0],
            y: [0, -10, 10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.img
          src={PlantImage}
          alt="Plant"
          className="w-72 md:w-96 lg:w-[600px] object-contain drop-shadow-xl z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
    </section>
  );
}
