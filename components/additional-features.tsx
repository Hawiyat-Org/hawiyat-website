"use client"
import { DatabaseBackupIcon, Expand, Fingerprint, GitFork, GitGraphIcon, Rocket, RocketIcon, TrendingUp } from "lucide-react";
import { useTheme } from "next-themes"
import Image from "next/image"

const AdditionalFeatures = () => {
  const { theme } = useTheme();

  const features = [
    {
      title: "One-Click Deployment",
      description:
        "Deploy your apps with a single click. Hawiyat automatically builds, tests, and releases so you can focus on innovating, not infrastructure.",
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
        "Always safe. Keep your data in store with automated backups — no risk of losing databases or logs.",
      image: DatabaseBackupIcon
    },
    {
      title: "Unified Identity",
      description:
        "Authentication and permissions were never easier. Hawiyat secures and centralizes identity management for teams and apps.",
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
        "Real-time insights into your projects and deployments. Track performance and issues with AI-powered analytics.",
      image: TrendingUp,
    },
  ]

  return (
    <section className="relative w-full flex flex-col items-center overflow-hidden py-12">
      <div className="w-full max-w-[1200px] flex flex-col items-center gap-4 p-4">
        <h3 className="reveal-up text-5xl font-medium max-md:text-3xl text-center leading-normal">
          Hawiyat Features
        </h3>

        {/* Responsive grid: 1 column on xs, 2 on sm, 3 on lg */}
        <div className="mt-8 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-stretch p-4">
          {features.map((feature, index) => {
            const Icon = feature.image; // <-- use a capitalized local component
            return (
              <div
                key={index}
                className="reveal-up w-full max-w-[420px] mx-auto rounded-md p-6 bg-[#f2f3f4] dark:bg-[#141414] dark:border-[#1f2123] flex flex-col gap-4 box-border"
              >
                <Icon className="w-16 h-16 text-black dark:text-white mx-auto" />
                <h3 className="text-2xl text-center">{feature.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 px-2 text-center text-sm break-words">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AdditionalFeatures
