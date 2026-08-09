const testimonialSlots = [
  { id: "slot-1" },
  { id: "slot-2" },
  { id: "slot-3" },
]

const Testimonials = () => (
  <section className="w-full py-16 md:py-20">
    <div className="mx-auto max-w-6xl px-6">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">Social proof</p>
        <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
          What clients say
        </h2>
        <p className="mt-3 text-sm text-muted-ink">
          Real operators running on the Hawiyat execution layer.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
        {testimonialSlots.map((slot) => (
          <div
            key={slot.id}
            className="flex flex-col rounded-lg border border-border bg-surface p-6"
          >
            <p className="flex-1 text-sm italic leading-relaxed text-muted-ink">
              Client quote coming soon
            </p>
            <div className="mt-6 border-t border-border pt-4">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ink">
                Client name
              </p>
              <p className="mt-1 text-xs text-muted-ink">Company / role</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-xl text-center font-mono text-[11px] uppercase tracking-widest text-muted-ink">
        Testimonials are anonymized customer quotes, shared with permission.
      </p>
    </div>
  </section>
)

export default Testimonials
