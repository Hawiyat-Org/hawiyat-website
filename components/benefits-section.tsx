"use client"
import Link from "next/link"
import { GitMerge, Infinity, RocketIcon, Shield } from "lucide-react"

const BenefitsSection = () => {
  const benefits = [
    {
      title: "Exact-Match Caching",
      description:
        "Boilerplate, common scaffolding, repeat requests. Hawiyat Composer normalizes them, checks an in-memory cache, and serves the result in 2 to 5ms at zero cost.",
      image: Infinity,
      light: "/card-icons/ci-cd-white.svg"
    },
    {
      title: "Semantic Caching",
      description:
        "Ask the same thing a different way and Hawiyat Composer still knows. Vector search matches intent, not just exact text. Same cached result, no extra spend.",
      image: GitMerge
    },
    {
      title: "Smart Model Routing",
      description:
        "Simple tasks go to lightweight, cheaper models automatically. Complex reasoning hits frontier models. You don't switch anything. The gateway handles it.",
      image: RocketIcon
    },
  ]

  return (
    <section id="solutions" className="relative flex max-w-[100vw] flex-col place-content-center place-items-center overflow-hidden">
      <div className="mt-8 flex flex-col w-full h-full place-items-center gap-5">
        <div className="reveal-up mt-5 flex flex-col gap-3 text-center">
          <h2 className="text-6xl font-medium max-md:text-3xl p-2">How Hawiyat Composer Works</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl text-center">One gateway. Every model. A fraction of the cost.</p>
        </div>

        <div  className="mt-6 flex flex-col max-w-[1150px] max-lg:max-w-full h-full p-4 max-lg:place-content-center gap-8">
          <div className="max-xl:flex max-xl:flex-col place-items-center grid grid-cols-3 gap-8 place-content-center auto-rows-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="reveal-up w-[350px] h-[540px] flex max-md:w-full">
                <Link
                  href="/hawiyat-composer"
                  className="relative p-10 transition-all duration-300 group/card gap-5 flex flex-col w-full h-full bg-[#f6f7fb] dark: dark:bg-[#141414] rounded-3xl hover:scale-[1.02]"
                >
                  
                    <benefit.image className="w-20 h-20 text-black dark:text-white m-auto"/>
                  
                  <h3 className="text-3xl max-md:text-2xl font-medium">{benefit.title}</h3>
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
    href="/hawiyat-composer"
    className="relative p-10 transition-all duration-300 group/card gap-5 flex max-md:flex-col w-full h-full bg-[#f6f7fb] dark: dark:bg-[#141414] rounded-3xl hover:scale-[1.02]"
  >
    <div className="flex justify-center items-center w-full max-md:h-[180px]">
      <Shield className="w-32 h-32 text-black dark:text-white" />
    </div>
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl max-md:text-2xl font-medium">Cost-Aware Routing</h3>
      <p className="leading-normal text-gray-800 dark:text-gray-200">
        Smart routing keeps sensitive workloads on your preferred providers while general tasks hit the most cost-effective models. No manual switching. Hawiyat Composer handles the path selection.
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
