import Image from "next/image"

const AdditionalFeatures = () => {
  const features = [
    {
      title: "One-Click Deployment",
      description:
        "Deploy your apps with a single click. Hawiyat automates build, testing, and release so you can focus on innovation, not infrastructure.",
      image: "/placeholder.svg?height=250&width=350&text=Deployment",
    },
    {
      title: "GitHub Integration",
      description:
        "Seamlessly connect your repositories with Hawiyat. Push code, trigger CI/CD pipelines, and watch your changes go live instantly.",
      image: "/placeholder.svg?height=250&width=350&text=GitHub+Integration",
    },
    {
      title: "Automated Backups",
      description:
        "Keep your data and applications safe with automated daily backups and quick recovery options, all managed within the dashbpakrd.",
      image: "/placeholder.svg?height=250&width=350&text=Backups",
    },
    {
      title: "Unified Identity",
      description:
        "Manage authentication and permissions with ease. Hawiyat provides secure, centralized identity management for teams and applications.",
      image: "/placeholder.svg?height=250&width=350&text=Identity",
    },
    {
      title: "Scalable Hosting",
      description:
        "Start small and grow big—Hawiyat’s infrastructure scales with your needs, ensuring performance and reliability at every stage.",
      image: "/placeholder.svg?height=250&width=350&text=Scalability",
    },
    {
      title: "Smart Analytics",
      description:
        "Get real-time insights into your deployments and usage. Track performance, detect issues, and make data-driven decisions with AI-powered analytics.",
      image: "/placeholder.svg?height=250&width=350&text=Analytics",
    },
  ]

  return (
    <section className="relative flex w-full min-h-[110vh] max-md:min-h-[80vh] flex-col place-content-center place-items-center overflow-hidden">
      <div className="w-full max-lg:max-w-full place-content-center items-center flex flex-col max-w-[80%] gap-4 p-4">
        <h3 className="reveal-up text-5xl font-medium max-md:text-3xl text-center leading-normal">
          Additional Hawiyat Features
        </h3>

        <div className="mt-8 relative gap-10 p-4 grid place-items-center grid-cols-3 max-lg:flex max-lg:flex-col">
          {features.map((feature, index) => (
            <div
              key={index}
              className="reveal-up w-[350px] px-2 border-[1px] h-[400px] rounded-md place-items-center p-4 bg-[#f2f3f4] max-md:w-[320px] dark:bg-[#141414] dark:border-[#1f2123] flex flex-col gap-3"
            >
              <div className="w-full h-[250px] p-4 rounded-xl backdrop-blur-2xl overflow-hidden flex place-content-center">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  width={350}
                  height={250}
                  className="w-auto h-full object-contain"
                />
              </div>
              <h3 className="text-2xl">{feature.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 px-4 text-center text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdditionalFeatures
