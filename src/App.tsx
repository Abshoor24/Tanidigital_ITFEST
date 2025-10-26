import PredictionSection from "./components/sections/PredictSection";
import ArticleSection from "./components/sections/ArticleSection";
import Footer from "./components/sections/Footer";
import Navbar from "./components/sections/Navbar";
import React from "react";

export default function App() {
  const sectionRefs = React.useRef<HTMLDivElement[]>([]);

  const sectionsContainer = [
    {
      id: "prediction",
      Component: PredictionSection,
    },
    {
      id: "article",
      Component: ArticleSection,
    },
  ];

  return (
    <div className="flex flex-col bg-gray-200 overflow-hidden">
      <div className="fixed flex w-full z-50">
        <Navbar sectionRefs={sectionRefs} />
      </div>
      {sectionsContainer.map(({ id, Component }, i) => {
        return (
          <div
            key={i}
            id={id}
            ref={(el) => {
              if (el) sectionRefs.current[i] = el;
            }}
            className="flex w-full min-h-screen pt-20"
          >
            <Component />
          </div>
        );
      })}
      <div className="flex w-full">
        <Footer />
      </div>
    </div>
  );
}
