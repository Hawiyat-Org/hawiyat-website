import Link from "next/link"
const docsUrl = process.env.NEXT_PUBLIC_DOCS_URL

const PrebuiltTools = () => {
  const tools = [
    {
      icon: "bi-code-square",
      title: "CI/CD & Deployment",
      description:
        "Automated pipelines with one-click deployments. Hawiyat ensures seamless updates, zero downtime, and GitHub integration so your projects move from code to production instantly.",
    },
    {
      icon: "bi-file-earmark-lock2-fill",
      title: "Secure Identity",
      description:
        "Hawiyat provides a unified digital identity layer. Manage authentication, permissions, and privacy with full control—your data, secured and simplified.",
    },
    {
      icon: "bi-cloud-arrow-up-fill",
      title: "Backups & Recovery",
      description:
        "Never lose progress. Hawiyat automatically backs up your applications and data, allowing instant recovery whenever needed, keeping your operations safe and reliable.",
    },
    {
      icon: "bi-bar-chart-line-fill",
      title: "AI Insights",
      description:
        "Integrated analytics powered by AI. Track system health, monitor usage, and receive actionable insights to improve performance and decision-making across your platform.",
    },
    {
      icon: "bi-diagram-3-fill",
      title: "Unified Dashboard",
      description:
        "All your tools, services, and deployments in one place. Hawiyat simplifies management with a single dashboard, so you spend less time switching platforms and more time building.",
    },
    {
      icon: "bi-lightning-fill",
      title: "Scalable Infrastructure",
      description:
        "From startups to enterprises, Hawiyat grows with you. Deploy applications across scalable infrastructure with reliability, speed, and cost-efficiency built in.",
    },
  ]

  return (
    <section className="relative mt-10 max-md:mt-8 flex min-h-[100vh] w-full max-w-[100vw] flex-col items-center lg:p-6 max-md:px-4 max-md:py-8">
      <div className="reveal-up mt-[5%] max-md:mt-0 flex h-full w-full justify-center gap-2 p-4 max-md:p-0 max-lg:max-w-full max-lg:flex-col">
        <div className="relative flex max-w-[30%] max-lg:max-w-full flex-col items-start max-md:items-center gap-4 p-2 max-md:p-0 max-lg:items-center max-lg:justify-center max-lg:w-full">
          <div className="top-40 max-md:top-0 flex flex-col lg:sticky items-center max-h-fit max-w-[850px] max-lg:max-h-fit max-lg:max-w-[320px] max-md:max-w-full overflow-hidden max-md:mb-6">
            <h2 className="text-5xl font-serif text-center font-medium max-md:text-2xl max-md:leading-tight max-md:px-2">
              Hawiyat Pre-Built Tools
            </h2>

            <Link
              href={docsUrl || "https://docs.hawiyat.org/"}
              className="btn !mt-8 max-md:!mt-6 max-md:!w-[90%] max-md:!rounded-lg max-md:!py-3.5 max-md:!text-[15px] max-md:!font-medium !bg-transparent !text-black !border-[1px] !border-black dark:!border-white dark:!text-white transition-all duration-300 active:scale-95"
            >
              Explore Tools
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-10 max-md:gap-4 h-full max-w-1/2 max-lg:max-w-full px-[10%] max-lg:px-4 max-md:px-0 lg:top-[20%] items-center max-md:w-full">
          {tools.map((tool, index) => (
            <div key={index} className="reveal-up h-[240px] max-md:h-auto w-[450px] max-md:w-full">
              <Link
                href={docsUrl || "https://docs.hawiyat.org/"}
                className="flex w-full h-full gap-8 max-md:gap-4 rounded-xl max-md:rounded-lg dark:shadow-[#171717] duration-300 transition-all p-8 max-md:p-5 group/card  max-md:dark:bg-[#080808]  max-md:border-gray-200 max-md:dark:border-[#1f2123]  active:scale-[0.98]"
              >
                <div className="text-4xl max-md:text-3xl max-md:flex-shrink-0">
                  <i className={`bi ${tool.icon}`}></i>
                </div>

                <div className="flex flex-col gap-4 max-md:gap-3">
                  <h3 className="text-2xl max-md:text-lg max-md:font-semibold">{tool.title}</h3>
                  <p className="text-gray-800 dark:text-gray-100 max-md:text-[14px] max-md:leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="mt-auto flex gap-2 underline underline-offset-4 max-md:text-[14px] max-md:font-medium">
                    <span>Learn more</span>
                    <i className="bi bi-arrow-up-right group-hover/card:-translate-y-1 group-hover/card:translate-x-1 duration-300 transition-transform"></i>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PrebuiltTools