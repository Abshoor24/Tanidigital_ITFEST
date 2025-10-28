import ArticleData from "../../data/artikel.json";
import ArticleCard from "../cards/ArticleCard";
import ArticleCardLarge from "../cards/ArticleCardLarge";

export default function ArticleSection() {
  return (
    <section className="flex flex-col items-center justify-start w-full gap-8 p-5 md:p-10 bg-[#F7F8FA]">
      {/* Judul */}
      <div className="flex items-center justify-start w-full">
        <p className="text-2xl md:text-3xl font-semibold text-green-700 border-b-2 border-green-700 pb-1">
          Artikel Terkait
        </p>
      </div>
      {/* mobile dan respojnsive web */}
      <div className="block md:hidden w-full">
        <ArticleCard data={ArticleData} />
      </div>

      {/* default web */}
      <div className="hidden md:block w-full">
        <ArticleCardLarge data={ArticleData} />
      </div>
    </section>
  );
}