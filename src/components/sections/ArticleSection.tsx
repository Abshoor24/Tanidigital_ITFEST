import ArticleData from "../../data/artikel.json";
import ArticleCard from "../cards/ArticleCard";
import ArticleCardLarge from "../cards/ArticleCardLarge";

export default function ArticleSection() {
  return (
    <section className="flex flex-col items-center justify-start w-full gap-5 p-5">
      <div className="flex items-center justify-start w-full">
        <p className="text-2xl font-semibold text-green-700 border-b-2 border-green-700">
          Artikel Terkait
        </p>
      </div>
      <ArticleCard data={ArticleData} />
      <ArticleCardLarge data={ArticleData} />
    </section>
  );
}
