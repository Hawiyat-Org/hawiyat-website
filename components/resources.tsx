import Image from "next/image"
import Link from "next/link"

const Resources = () => {
  const articles = [
    {
      title: "COSI 2025",
      category: "First Public Appearance",
      date: "2025",
      image: "/aboutus/Cosi-2025/image1.webp",
      href: "/about",
    },
    {
      title: "Label Projet Innovant",
      category: "Ministry of Knowledge Economy",
      date: "2026",
      image: "/aboutus/label-projet-inovant.webp",
      href: "/about",
      wide: true,
    },
    {
      title: "Itihad Incubation Program",
      category: "Accelerator",
      date: "2025",
      image: "/aboutus/itihad-incubation.webp",
      href: "/about",
    },
  ]

  return (
    <section className="mt-5 flex min-h-[80vh] w-full flex-col place-content-center place-items-center p-[2%] max-lg:p-3">
      <h2 className="reveal-up text-4xl font-medium max-md:text-2xl">
        Our Story
      </h2>
      <p className="reveal-up mt-3 text-gray-500 dark:text-gray-400 text-center max-w-md">
        From a small team in Algiers to a recognized AI infrastructure company.
      </p>

      <div className="reveal-up mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1.6fr_1fr] gap-3 w-full max-w-[1200px]">
        {articles.map((article, index) => (
          <Link
            key={index}
            href={article.href}
            className="flex h-[500px] flex-col gap-2 overflow-clip rounded-lg p-4 duration-300"
          >
            <div className="h-[350px] min-h-[350px] w-full overflow-hidden rounded-2xl">
              <Image
                src={article.image}
                alt={`${article.title} - ${article.category}`}
                width={400}
                height={350}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.3]"
                style={index === 2 ? { objectPosition: "15% center" } : undefined}
              />
            </div>

            <div className="text-gray-600 dark:text-gray-300 justify-between flex gap-2">
              <div className="text-gray-800 dark:text-gray-200">{article.category}</div>
              <div className="text-gray-600 dark:text-gray-400">{article.date}</div>
            </div>
            <h3 className="mt-1 font-medium text-xl max-md:text-xl">
              {article.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Resources
