import ArticleData from "../../data/artikel.json";
import ArticleCard from "../cards/ArticleCard";

export default function ArticleSection() {
  return (
    <section className="flex flex-col gap-5 p-5">
      <div className="flex items-center justify-start w-full">
        <p className="text-2xl font-semibold text-green-400 border-b-4 border-green-500">
          Artikel Terkait :
        </p>
      </div>
      <ArticleCard data={ArticleData} />
    </section>
  );
}
