import { Server, GitBranch, DatabaseBackup, Gauge, ShieldCheck, Cloud } from "lucide-react"

const Testimonials = () => {
  const testimonials = [
    {
      name: "BoudNoureddine Bouderbala",
      company: "Full stack developer",
      icon: <GitBranch className="h-10 w-10 text-green-500" />,
      content:
        "With Hawiyat one-click deployment and CI/CD, we cut release times from hours to minutes. Our team ships updates daily with zero downtime.",
    },
    {
      name: "Sarah M.",
      company: "CTO, Innovexa",
      icon: <Server className="h-10 w-10 text-blue-500" />,
      content:
        "Running our applications on Hawiyat VPS is effortless. The performance is unmatched, and scaling is literally one click away.",
    },
    {
      name: "Yacine L.",
      company: "Founder, CloudNest",
      icon: <DatabaseBackup className="h-10 w-10 text-purple-500" />,
      content:
        "Automated backups saved us more than once. Knowing our data is secure and recoverable with Hawiyat gives us complete peace of mind.",
    },
    {
      name: "Rania B.",
      company: "Product Manager, NextWave",
      icon: <Gauge className="h-10 w-10 text-pink-500" />,
      content:
        "The unified dashboard is a game-changer. From deployment to monitoring, everything is centralized—making management super easy.",
    },
    {
      name: "Houssem T.",
      company: "CEO, BrightApps",
      icon: <Cloud className="h-10 w-10 text-cyan-500" />,
      content:
        "We scaled from a few users to thousands without touching infrastructure. Hawiyat handled everything in the background, flawlessly.",
    },
    {
      name: "Nadia F.",
      company: "Data Engineer, Flowlytics",
      icon: <ShieldCheck className="h-10 w-10 text-orange-500" />,
      content:
        "The identity management and monitoring tools are super insightful. We now spot issues before they impact users—something we never had before Hawiyat.",
    },
  ]

  return (
    <section className="flex min-h-[100vh] w-full flex-col place-content-center place-items-center p-[2%]">
      <h3 className="reveal-up text-4xl font-medium text-center max-md:text-2xl">
        Trusted by professionals building on Hawiyat
      </h3>

      <div className="mt-20 gap-10 space-y-8 max-md:columns-1 lg:columns-2 xl:columns-3">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="reveal-up flex h-fit w-[350px] break-inside-avoid flex-col gap-4 rounded-lg border-[1px] bg-[#f6f7fb] dark:bg-[#080808] dark:border-[#1f2123] p-4 max-lg:w-[320px]"
          >
            <div className="flex place-items-center gap-3">
              <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                {testimonial.icon}
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-gray-700 dark:text-gray-300">{testimonial.company}</div>
              </div>
            </div>

            <p className="mt-4 text-gray-800 dark:text-gray-200">{testimonial.content}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
