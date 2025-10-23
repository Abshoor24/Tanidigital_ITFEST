import PredictionSection from "./components/sections/PredictSection";
import ArticleSection from "./components/sections/ArticleSection";
import Footer from "./components/sections/Footer";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="flex flex-col bg-gray-100">
      <Toaster 
      toastOptions={{ 
        duration: 2000,
       }}
      
      />
      <div className="flex w-full min-h-screen">
        <PredictionSection />
      </div>
      <div className="flex w-full">
        <ArticleSection />
      </div>
      <div className="flex w-full">
        <Footer />
      </div>
    </div>
  );
}
