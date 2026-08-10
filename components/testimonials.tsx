import { Sprout, BarChart3, Workflow, ShieldCheck, Globe, type LucideIcon } from "lucide-react"

type Testimonial = {
  id: string
  quote: string
  role: string
  icon: LucideIcon
}

const testimonials: Testimonial[] = [
  {
    id: "green-duty",
    quote:
      "Very good, it works really well. Our greenhouse automation just runs, day after day.",
    role: "Startup, agrotech (greenhouse IoT and industrial automation)",
    icon: Sprout,
  },
  {
    id: "moncef",
    quote:
      "I came in as a beginner and support walked me through every step. When I needed more tokens, they topped me up. Support 100/10.",
    role: "Data analyst",
    icon: BarChart3,
  },
  {
    id: "benar",
    quote:
      "We started with n8n hosting and came back six months later for Composer MAX 5X. When a provider grows with you, you stay.",
    role: "Automation agency",
    icon: Workflow,
  },
  {
    id: "johnny",
    quote:
      "I had never touched Claude Code before. They explained it step by step until I understood what was actually running.",
    role: "Security analyst",
    icon: ShieldCheck,
  },
  {
    id: "samy",
    quote:
      "I did not know n8n at all and had no time to babysit servers. They set it up hosted and ready, so I could get back to client work.",
    role: "International developer and freelancer",
    icon: Globe,
  },
]

// Two identical halves so the -50% marquee loop wraps seamlessly.
const marqueeHalves = [testimonials, testimonials]

const Testimonials = () => (
  <section className="w-full py-16 md:py-24">
    <div className="mx-auto max-w-6xl px-6">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">Social proof</p>
        <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
          What clients say
        </h2>
        <p className="mt-3 text-sm text-muted-ink">
          Real people, running real work on the Hawiyat execution layer.
        </p>
      </div>

      <div className="marquee relative w-full overflow-hidden">
        <div className="marquee-track testimonials-track flex w-max">
          {marqueeHalves.map((half, halfIndex) => (
            <div
              key={halfIndex}
              aria-hidden={halfIndex === 1 || undefined}
              className="flex shrink-0 items-stretch gap-5 pr-5"
            >
              {half.map((t) => (
                <div
                  key={t.id}
                  className="relative flex w-[300px] shrink-0 flex-col rounded-lg border border-border bg-surface p-6 transition-colors duration-300 hover:border-signal/40 md:w-[360px]"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-5 top-3 select-none font-mono text-5xl leading-none text-signal/10"
                  >
                    &rdquo;
                  </span>

                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-dim">
                    <t.icon className="h-5 w-5 text-signal" strokeWidth={1.5} />
                  </div>

                  <p className="flex-1 text-[15px] leading-relaxed text-ink">
                    {t.quote}
                  </p>

                  <div className="mt-6 border-t border-border pt-4">
                    <span className="text-sm font-medium text-ink">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-xl text-center font-mono text-[11px] uppercase tracking-widest text-muted-ink">
        Customer quotes shared with permission. Roles shown, names kept private.
      </p>
    </div>
  </section>
)

export default Testimonials
