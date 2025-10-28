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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full">
      {data.map(({ title, link, image, desc, by }, i) => (
        <div
          key={i}
          className="flex flex-col w-full h-[360px] sm:h-[380px] rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white"
        >
          <img
            src={image || "/placeholder.jpg"}
            alt={title}
            className="w-full h-40 object-cover"
          />

          <div className="flex flex-col justify-between flex-1 p-4">
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 line-clamp-2">
                {title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-4 sm:line-clamp-3">
                {desc}
              </p>
            </div>

            <div className="flex justify-between items-center mt-auto">
              <span className="text-xs text-gray-500">{by}</span>
              <a
                href={link}
                target="_blank"
                className="px-3 py-1 text-xs sm:text-sm bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
              >
                Kunjungi
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}