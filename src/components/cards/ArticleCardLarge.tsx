interface ArticleCardLargeProps {
  data: {
    title: string;
    desc: string;
    image: string;
    link: string;
    by: string;
  }[];
}

export default function ArticleCardLarge({ data }: ArticleCardLargeProps) {
  return (
    <div className="hidden md:flex flex-col w-full h-full gap-5">
      {data?.map(({ title, link, desc, image, by }, i) => {
        return (
          <div key={i} className="flex items-center justify-between w-full max-h-80 bg-white p-5 gap-5">
            <div className="flex flex-col justify-between w-full h-full max-w-[70%]">
              <section className="flex flex-col w-full gap-2">
                <h1 className="font-semibold text-black text-2xl line-clamp-2">
                  {title}
                </h1>
                <p className="text-lg">{desc}</p>
              </section>
              <section className="flex items-center justify-between w-full">
                <p className="">{by}</p>
                <a
                  href={link}
                  target="_blank"
                  className="bg-green-500 hover:bg-green-400 font-semibold text-white p-2 px-3 rounded-md transition duration-700"
                >
                  Kunjungi
                </a>
              </section>
            </div>
            <img
              className="w-96 h-60 rounded-md object-cover border-2 border-black"
              src={image}
              alt={title}
            />
          </div>
        );
      })}
    </div>
  );
}
