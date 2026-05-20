"use client"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { GitMerge, Infinity, RocketIcon ,DatabaseBackup } from "lucide-react"
const docsUrl = process.env.NEXT_PUBLIC_DOCS_URL || "https://docs.hawiyat.org/"
const BenefitsSection = () => {
  const {theme} = useTheme();
  const benefits = [
    {
      title: "CI/CD ",
      description:
        "Automate your build, test, and deployment workflows with a powerful CI/CD pipeline. Deliver updates faster, reduce errors, and ensure smooth releases with every commit.",
      image:  Infinity ,
      light: "/card-icons/ci-cd-white.svg"
    },
    
    {
      title: " GitHub Integration",
      description:
        "Connect your projects directly with GitHub for effortless version control. Deploy, track changes, and collaborate with your team without leaving the platform.",
      image: GitMerge
    },
    {
      title: "1 Click Deployment",
      description:
        "Deploy your apps with a single click. From staging to production, our platform ensures fast, secure, and reliable deployments—backed by automated monitoring and rollbacks.",
      image: RocketIcon
    },
  ]

  return (
    <section id="solutions" className="relative flex max-w-[100vw] flex-col place-content-center place-items-center overflow-hidden">
      <div className="mt-8 flex flex-col w-full h-full place-items-center gap-5">
        <div className="reveal-up mt-5 flex flex-col gap-3 text-center">
          <h2 className="text-6xl font-medium max-md:text-3xl p-2">Everything you need, in one place</h2>
        </div>

        <div  className="mt-6 flex flex-col max-w-[1150px] max-lg:max-w-full h-full p-4 max-lg:place-content-center gap-8">
          <div className="max-xl:flex max-xl:flex-col place-items-center grid grid-cols-3 gap-8 place-content-center auto-rows-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="reveal-up w-[350px] h-[540px] flex max-md:w-full">
                <Link
                  href={docsUrl || "https://docs.hawiyat.org/"} 
                  className="relative p-10 transition-all duration-300 group/card gap-5 flex flex-col w-full h-full bg-[#f6f7fb] dark:bg-[#3A3A40] rounded-3xl hover:scale-[1.02]"
                >
                  
                    <benefit.image className="w-20 h-20 text-black dark:text-white m-auto"/>
                  
                  <h2 className="text-3xl max-md:text-2xl font-medium">{benefit.title}</h2>
                  <p className="text-base leading-normal text-gray-800 dark:text-gray-200">{benefit.description}</p>
                  <div className="flex items-center gap-2 mt-auto">
                    <span>Learn more</span>
                    <i className="bi bi-arrow-right transform transition-transform duration-300 group-hover/card:translate-x-2"></i>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="reveal-up w-full md:h-[350px] max-md:min-h-[350px] flex">
  <Link
    href={docsUrl || "https://docs.hawiyat.org/"} 
    className="relative p-10 transition-all duration-300 group/card gap-5 flex max-md:flex-col w-full h-full bg-[#f6f7fb] dark:bg-[#3A3A40] rounded-3xl hover:scale-[1.02]"
  >
    <div className="flex justify-center items-center w-full max-md:h-[180px]">
      <DatabaseBackup className="w-32 h-32 text-black dark:text-white" />
    </div>
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl max-md:text-2xl font-medium">Backups</h2>
      <p className="leading-normal text-gray-800 dark:text-gray-200">
        Keep your data safe with regular automated backups. Restore your projects anytime with just a click,
        ensuring peace of mind and uninterrupted workflows.
      </p>
      <div className="flex items-center gap-2 mt-auto">
        <span>Learn more</span>
        <i className="bi bi-arrow-right transform transition-transform duration-300 group-hover/card:translate-x-2"></i>
      </div>
    </div>
  </Link>
</div>


        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
