"use client"
import { DatabaseBackupIcon, Expand, Fingerprint, GitFork, Layers, Database,Users, RocketIcon, TrendingUp } from "lucide-react";


const AdditionalFeatures = () => {


  const features = [
    {
      title: "One-Click Deployment",
      description:
        "Deploy with one click. Hawiyat builds, tests, and releases so you focus on building, not on infrastructure.",
      image: RocketIcon
    },
    {
      title: "GitHub Integration",
      description:
        "Push to production with CI/CD. Connect your repos, change the code, ship it.",
      image: GitFork,
    },
    {
      title: "Automated Backups",
      description:
        "Your data, backed up automatically. Restore databases and logs whenever, no risk of losing anything.",
      image: DatabaseBackupIcon
    },
    {
      title: "Unified Identity",
      description:
        "Centralized authentication and permissions for teams and apps. Simple identity management.",
      image: Fingerprint,
    },
    {
      title: "Scalable Hosting",
      description:
        "We scale as you grow. Infrastructure that handles your traffic, keeps you up, no surprises.",
      image: Expand,
    },
    {
      title: "Smart Analytics",
      description:
        "Real-time insights on your projects and deployments. AI-powered analytics for performance and issues.",
      image: TrendingUp,
    },
    {
      title: "300+ Ready-to-Use Templates",
      description:
        "Over 300 ready-to-go templates for popular stacks, frameworks, and services. Skip the boilerplate.",
      image: Layers,
    },
    {
      title: "Built-in Databases",
      description:
        "Provision databases in seconds. PostgreSQL, MySQL, MongoDB. Ready to plug into your apps.",
      image: Database,
    },
    {
      title: "Team Collaboration",
      description:
        "Invite teammates, assign roles, collaborate on deployments. All from one dashboard.",
      image: Users,
    }
  ]

  return (
    <section id="features" className=" relative w-full flex flex-col items-center overflow-hidden py-12">
      <div className="w-full max-w-[1200px] flex flex-col items-center gap-4 p-4">
        <h2 className="reveal-up text-5xl font-medium max-md:text-3xl text-center leading-normal">
          Hawiyat Cloud Features
        </h2>

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
