function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-8 text-center">
      <p className="font-mono text-4xl font-bold text-ink md:text-5xl">{value}</p>
      <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-ink">{label}</p>
    </div>
  )
}

const OurNumbers = () => (
  <section className="w-full py-16 md:py-20">
    <div className="mx-auto max-w-6xl px-6">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">Proof, not promises</p>
        <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
          Proof it works.
        </h2>
        <p className="mt-3 text-sm text-muted-ink">
          Straight from our own operations — we only print what&rsquo;s real.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard value="100+" label="businesses paying in DZD" />
        <StatCard value="10+" label="resellers" />
        <StatCard value="100B+" label="tokens" />
        <StatCard value="≈2.6M DZD" label="annual recurring revenue (DZD)" />
      </div>
    </div>
  </section>
)

export default OurNumbers
