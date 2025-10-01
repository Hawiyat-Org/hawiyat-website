"use client"
import { DatabaseBackupIcon, Expand, Fingerprint, GitFork, GitGraphIcon, Rocket, RocketIcon, TrendingUp } from "lucide-react";
import { useTheme } from "next-themes"
import Image from "next/image"

const AdditionalFeatures = () => {
  const {theme} = useTheme();

  const features = [
    {
      title: "One-Click Deployment",
      description:
        "Deploy your apps with a single click. Hawiyat automatically builds, tests, and releases. So you can focus on innovating, not infrastrucre.",
      image: RocketIcon
    },
    {
      title: "GitHub Integration",
      description:
        "From push to production with CI/CD pipelines. Connect your repos to Hawiyat, modify the code, ship in no time.",
      image: GitFork,
    },
    {
      title: "Automated Backups",
      description:
        "Always safe. Keep your data in store with automated backups. No risk of losing databases nor logs.",
      image: DatabaseBackupIcon
    },
    {
      title: "Unified Identity",
      description:
        "Authentication and permission were never easier. Hawiyat secures, centralizes identity management for teams and applications.",
      image: Fingerprint,
    },
    {
      title: "Scalable Hosting",
      description:
        "We grow with you. Hawiyat's infrastructure scales to fit your needs, making sure you're up at all times.",
      image: Expand,

    },
    {
      title: "Smart Analytics",
      description:
        "Real-time insights into your projects and deployments. Tracking performance and issues with AI-powered analytics.",
      image: TrendingUp,

    },
  ]

  return (
    <section className="relative flex w-full min-h-[110vh] max-md:min-h-[80vh] flex-col place-content-center place-items-center overflow-hidden">
      <div className="w-full max-lg:max-w-full place-content-center items-center flex flex-col max-w-[80%] gap-4 p-4">
        <h3 className="reveal-up text-5xl font-medium max-md:text-3xl text-center leading-normal">
          Hawiyat Features
        </h3>

        <div className="mt-8 relative gap-12 p-4 grid  place-items-center grid-cols-3 max-lg:flex max-lg:flex-col">
          {features.map((feature, index) => (
            <div
              key={index}
              className="reveal-up w-[350px] px-2  h-[400px] rounded-md place-items-center p-4 bg-[#f2f3f4] max-md:w-[320px] dark:bg-[#141414] dark:border-[#1f2123] flex flex-col gap-3"
            >
               <feature.image className="w-20 h-20 text-black dark:text-white my-auto" />
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
