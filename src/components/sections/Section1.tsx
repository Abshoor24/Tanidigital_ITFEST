import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PlantImage from "../../assets/sect1.png";

export default function Section1() {
  const [text, setText] = useState("");
  const [titleText, setTitleText] = useState("");
  const fullText =
    "Platform prediksi pertanian berbasis data yang membantu petani dan pengusaha agrikultur mengambil keputusan cerdas.";
  const titleFullText = "AGRO VISION";

  // Efek ketikan untuk deskripsi
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

  // Efek ketikan untuk judul dengan repeat infinity
  useEffect(() => {
    let i = 0;
    let isDeleting = false;
    
    const interval = setInterval(() => {
      if (!isDeleting && i < titleFullText.length) {
        setTitleText(titleFullText.slice(0, i + 1));
        i++;
      } else if (!isDeleting && i >= titleFullText.length) {
        setTimeout(() => {
          isDeleting = true;
        }, 1000); // Jeda 1 detik sebelum mulai menghapus
      } else if (isDeleting && i > 0) {
        i--;
        setTitleText(titleFullText.slice(0, i));
      } else if (isDeleting && i === 0) {
        isDeleting = false;
        setTimeout(() => {}, 500); // jedi
      }
    }, 160); // keceepatan ngetik 

    return () => clearInterval(interval);
  }, []);

 return (
   <section className="relative flex flex-col-reverse md:flex-row items-center justify-between w-full min-h-screen bg-gradient-to-br from-[#F7F8FA] via-green-50/40 to-[#F7F8FA] px-6 md:px-24 py-16 overflow-visible">
     <motion.div
       className="absolute inset-0 bg-gradient-to-br from-green-100 via-emerald-50 to-green-200 opacity-30 -z-30"
       animate={{
         backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
       }}
       transition={{
         duration: 20,
         repeat: Infinity,
         ease: "linear",
       }}
       style={{
         backgroundSize: "200% 200%",
       }}
     />
    {/* KIRI TEXT */}
     <div className="flex-1 text-center md:text-left space-y-4 md:space-y-6 z-10">
       <motion.h1
         initial={{ x: -50, opacity: 0 }}
         animate={{ x: 0, opacity: 1 }}
         transition={{ duration: 0.8 }}
         className="relative text-4xl md:text-6xl font-extrabold text-green-600"
       >
         <span className="invisible block">{titleFullText}</span>
         <span className="absolute left-0 top-0">{titleText}</span>
       </motion.h1>

       <motion.p
         initial={{ x: -50, opacity: 0 }}
         animate={{ x: 0, opacity: 1 }}
         transition={{ delay: 0.3, duration: 0.8 }}
         className="text-gray-700 text-base md:text-lg leading-relaxed max-w-lg mx-auto md:mx-0"
       >
         {text}
       </motion.p>

       <motion.h5
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1.5 }}
         className="text-xl text-gray-800 font-bold flex items-center justify-center md:justify-start gap-2 mt-3"
       >
         Prediksi Cerdas. Panen Lebih Pasti.
       </motion.h5>
     </div>
    {/* Bagian kanan (gambar + animasi) */}
     <motion.div
       initial={{ scale: 0.8, opacity: 0 }}
       animate={{ scale: 1, opacity: 1 }}
       transition={{ delay: 0.4, duration: 0.8 }}
       className="flex-1 flex justify-center mb-10 md:mb-0 relative"
     >
       <motion.div
         className="absolute w-[420px] h-[420px] md:w-[480px] md:h-[480px] rounded-full border-[12px] border-green-400/40 blur-2xl z-0"
         animate={{
           scale: [1, 1.1, 1],
           opacity: [0.6, 0.8, 0.6],
         }}
         transition={{
           duration: 6,
           repeat: Infinity,
           ease: "easeInOut",
         }}
       />
 
       <motion.div
         className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-green-400 via-emerald-300 to-green-100 opacity-50 blur-3xl z-[-10]"
         animate={{
           x: [0, 30, -30, 0],
           y: [0, -20, 20, 0],
           scale: [1, 1.05, 1],
         }}
         transition={{
           duration: 6,
           repeat: Infinity,
           ease: "easeInOut",
         }}
       />
 
       <img
         src={PlantImage}
         alt="Plant"
         className="w-64 md:w-80 lg:w-[500px] object-contain drop-shadow-xl z-10"
       />
     </motion.div>
   </section>
 );
}