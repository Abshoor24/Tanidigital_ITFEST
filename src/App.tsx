import PredictionSection from "./components/sections/PredictSection";
import ArticleSection from "./components/sections/ArticleSection";

export default function App() {
  return (
    <div className="flex flex-col bg-gray-100 p-2">
      <div className="flex w-full min-h-screen">
        <PredictionSection />
      </div>
      <div className="flex w-full">
        <ArticleSection />
      </div>
    </div>
  );
}
