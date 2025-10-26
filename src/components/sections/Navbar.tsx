import React from "react";

interface NavbarProps {
  sectionRefs: React.RefObject<HTMLDivElement[] | null>;
}

export default function Navbar({ sectionRefs }: NavbarProps) {
  const navMenuRef = React.useRef<HTMLButtonElement[]>([]);
  const navbarMenu = [
    {
      title: "Prediksi Tanaman",
      target: "#prediction",
    },
    {
      title: "Artikel",
      target: "#article",
    },
  ];

  const handleScroll = (index: number) => {
    if (sectionRefs.current)
      sectionRefs.current[index].scrollIntoView({ behavior: "smooth" });
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
      { threshold: 0.5 }
    );
    sectionRefs.current?.forEach((el) => el && observer.observe(el));
  }, []);

  return (
    <nav className="flex items-center justify-between w-full h-20 bg-gray-600/70 px-10 p-2 backdrop-blur-sm border-b-2 border-green-500">
      <img
        src="/agrovision.png"
        alt="logo"
        className="w-16 h-16"
      />
      <div className="flex items-center justify-between text-white text-lg md:text-xl gap-5">
        {navbarMenu.map(({ title, target }, i) => {
          return (
            <button
              key={i}
              ref={(el) => {
                if (el) navMenuRef.current[i] = el;
              }}
              data-target={target}
              title={title}
              onClick={() => handleScroll(i)}
              className="hover:text-green-500 transition duration-700"
            >
              {title}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
