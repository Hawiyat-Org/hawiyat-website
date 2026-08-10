const testimonials = [
  {
    id: "green-duty",
    quote:
      "Very good, it works really well. Très bien, ça marche très bien.",
    role: "Startup, agrotech (greenhouse IoT and industrial automation)",
    verified: true,
  },
  {
    id: "moncef",
    quote:
      "Support 100/10. I was a beginner and they walked me through everything step by step, even topped up my tokens when I needed more.",
    role: "Data analyst",
    verified: true,
  },
  {
    id: "benar",
    quote:
      "Started with n8n hosting, came back six months later for Composer MAX 5X. That is what the layer does, it grows with you.",
    role: "Automation agency",
    verified: true,
  },
  {
    id: "johnny",
    quote:
      "I had never touched Claude Code before. They walked me through it step by step until it clicked.",
    role: "Security analyst",
    verified: false,
  },
  {
    id: "samy",
    quote:
      "I did not know n8n at all. They set it up hosted and ready to use, so I could get back to running my business.",
    role: "International developer and freelancer",
    verified: false,
  },
]

// Two identical halves so the -50% marquee loop wraps seamlessly.
const marqueeHalves = [testimonials, testimonials]

const Testimonials = () => (
  <section className="w-full py-16 md:py-20">
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
                  className="flex w-[300px] shrink-0 flex-col justify-between rounded-lg border border-border bg-surface p-6 md:w-[360px]"
                >
                  <p className="text-sm leading-relaxed text-muted-ink">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="text-sm font-medium text-ink">{t.role}</p>
                    {t.verified && (
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ok">
                        Verified customer
                      </p>
                    )}
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
