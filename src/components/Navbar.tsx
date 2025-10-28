import React from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  sectionRefs: React.RefObject<HTMLDivElement[] | null>;
}

export default function Navbar({ sectionRefs }: NavbarProps) {
  const navMenuRef = React.useRef<HTMLButtonElement[]>([]);
  const [isOpen, setIsOpen] = React.useState(false); // state baut menu mobile

  const navbarMenu = [
    { title: "Beranda", target: "#section1" },
    { title: "Fitur", target: "#section2" },
    { title: "Prediksi Tanaman", target: "#prediction" },
    { title: "Artikel", target: "#article" },
  ];

  const handleScroll = (index: number) => {
    if (sectionRefs.current) {
      sectionRefs.current[index].scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); // tutup menu pas user klik salah satu item di mobile
    }
  };

  // Ini untuk handle button text color saat scroll
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navMenuRef.current.forEach((el) => {
              if (!el) return;
              el.classList.remove("text-green-400");
              el.classList.remove("font-semibold");
              el.classList.remove("scale-105");
              const targetId = el?.getAttribute("data-target");
              if (targetId === `#${entry.target.id}`) {
                el.classList.add("text-green-400");
                el.classList.add("font-semibold");
                el.classList.add("scale-105");
              }
            });
          }
        });
      },
      { threshold: [0.25, 0.5, 0.75] }
    );
    sectionRefs.current?.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-500/70 backdrop-blur-sm border-b-2 border-green-500">
      <div className="flex items-center justify-between h-20 px-5 md:px-10 text-white">
        <div className="flex items-center gap-2">
          <img src="/agrovision.png" alt="logo" className="w-14 h-14" />
          <h1 className="font-bold text-xl md:text-2xl tracking-wide">
            Agro Vision
          </h1>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden md:flex gap-6 text-lg">
          {navbarMenu.map(({ title, target }, i) => (
            <button
              key={i}
              ref={(el) => {
                if (el) navMenuRef.current[i] = el;
              }}
              data-target={target}
              onClick={() => handleScroll(i)}
              className="hover:text-green-400 transition duration-300 hover:underline"
            >
              {title}
            </button>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col items-center md:hidden bg-gray-800/90 backdrop-blur-md py-5 space-y-4 text-white animate-fadeIn">
          {navbarMenu.map(({ title, target }, i) => (
            <button
              key={i}
              ref={(el) => {
                if (el) navMenuRef.current[i] = el;
              }}
              data-target={target}
              onClick={() => handleScroll(i)}
              className="text-lg hover:text-green-400 transition duration-300"
            >
              {title}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
