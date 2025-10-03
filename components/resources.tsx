import Image from "next/image"
import Link from "next/link"
const docsUrl = process.env.NEXT_PUBLIC_DOCS_URL
const appUrl = process.env.NEXT_PUBLIC_APP_URL
const Resources = () => {
  const articles = [
    {
      title: "Getting started with Hawiyat CLI",
      category: "Developer Tools",
      date: "Aug 5, 2025",
      image: "/assets/images/home/article1.webp",
      href: {docsUrl},
    },
    {
      title: "Optimizing container deployments on Hawiyat",
      category: "Deployment",
      date: "Jul 20, 2025",
      image: "/assets/images/home/article2.webp",
      href: {docsUrl},
    },
    {
      title: "Auto-scale architectures: Theory & practice",
      category: "Infrastructure",
      date: "Jun 15, 2025",
      image: "/assets/images/home/article3.webp",
      href: {docsUrl},
    },
  ]

  return (
    <section className="mt-5 flex min-h-[80vh] w-full flex-col place-content-center place-items-center p-[2%] max-lg:p-3">
      <h3 className="reveal-up text-4xl font-medium max-md:text-2xl">
        Hawiyat Resources by Our Engineers 🚀
      </h3>

      {/* 🔥 changed flex-wrap to grid */}
      <div className="reveal-up mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-[1200px]">
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
