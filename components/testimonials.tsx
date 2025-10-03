import { User } from "lucide-react"

const Testimonials = () => {
  const testimonials = [
    {
      name: "DZ DEVELOPER ADMIN",
      company: "CTO at Charjily",
      content:
        "With Hawiyat’s VPS, our infrastructure became rock-solid. Deployment is seamless, uptime is guaranteed, and we scale resources instantly. Hawiyat has transformed our operations.",
    },
    {
      name: "Sofiane Fzeghouli",
      company: "IT Solutions Lead",
      content:
        "Thanks to Hawiyat’s automated backup and recovery tools, we’ve eliminated data loss risk. Our backups are reliable, instantaneous, and fully managed — we sleep easier now.",
    },
    {
      name: "Chekroune",
      company: "Engineer at ESTIN",
      content:
        "In an academic environment with high load, Hawiyat’s performance and resource management ensured no downtime — even during peak periods. It’s a game changer for education systems.",
    },
    {
      name: "Khalil",
      company: "IT Operations Manager",
      content:
        "We’ve streamlined our delivery cycles with Hawiyat’s tools. Features like environment snapshots and scalable infrastructure helped us cut lead time by half.",
    },
    {
      name: "Azouaou Faical",
      company: "Professor at ESTIN",
      content:
        "Teaching, research, and real-world projects demand reliable infrastructure. Hawiyat gives me predictability, performance, and control — so I can focus on innovation, not servers.",
    },
    {
      name: "Djawer Hacker",
      company: "Cybersecurity Expert (10+ years)",
      content:
        "From a security perspective, Hawiyat is outstanding. Granular access, encryption, and real-time alerts make it feel like our data center is always under 24/7 protection.",
    },
  ]

  return (
    <section className="flex min-h-[100vh] w-full flex-col items-center justify-center p-[2%]">
      <h3 className="reveal-up text-4xl font-medium text-center max-md:text-2xl">
        Trusted by professionals building on Hawiyat
      </h3>

      <div id="testimonies" className="mt-20 grid w-full max-w-6xl gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="reveal-up flex flex-col justify-between rounded-lg border bg-[#f6f7fb] dark:bg-[#080808] dark:border-[#1f2123] p-6 shadow-md"
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <User className="h-8 w-8 text-gray-600 dark:text-gray-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">{testimonial.name}</span>
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  {testimonial.company}
                </span>
              </div>
            </div>

            {/* Content */}
            <p className="mt-4 text-gray-800 dark:text-gray-200 text-sm leading-relaxed flex-1">
              {testimonial.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
