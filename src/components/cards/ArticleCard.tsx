interface ArticleCardProps {
  data: {
    title: string;
    desc: string;
    image: string;
    link: string;
    by: string;
  }[];
}

export default function ArticleCard({ data }: ArticleCardProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-center w-full h-full gap-5">
      {data.map(({ title, link, image, desc, by }, i) => {
        return (
          <div
            key={i}
            className="flex flex-col w-52 xl:w-72 h-[320px] xl:h-[380px] rounded-2xl shadow-lg overflow-hidden hover:border hover:border-green-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out gap-1"
          >
            <img
              src={image || "/placeholder.jpg"}
              alt={title}
              className="w-full h-32 xl:h-44 object-cover"
            />
            <div className="p-5 md:p-4">
              <h3 className="text-[15px] xl:text-lg font-semibold mb-2 line-clamp-2">
                {title}
              </h3>
              <p className="text-[12px] xl:text-sm text-gray-600 mb-3 line-clamp-4 xl:line-clamp-3">
                {desc}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-[8px] xl:text-[10px] text-gray-500">
                  {by}
                </span>
                <a
                  href={link}
                  target="_blank"
                  className="px-3 py-1 text-[10px] xl:text-sm bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                >
                  Kunjungi
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
