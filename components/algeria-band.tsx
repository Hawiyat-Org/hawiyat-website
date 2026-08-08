import Link from "next/link"
import {
  Landmark,
  MapPin,
  FileText,
  Languages,
  ShieldCheck,
  Award,
  MessageCircle,
  ArrowRight,
} from "lucide-react"

const AlgeriaBand = () => {
  const trustPoints = [
    {
      icon: Landmark,
      title: "Billed in DZD",
      body: "Algerian dinars with CCP or Baridi Mob — no foreign cards, no forex drift.",
    },
    {
      icon: MapPin,
      title: "Headquartered in Algiers",
      body: "Founded in Algiers and based at Itihad Campus, Boumerdes.",
    },
    {
      icon: FileText,
      title: "Registered Algerian société",
      body: "A registered Algerian company, issuing official invoices (facturation).",
    },
    {
      icon: ShieldCheck,
      title: "Model ownership",
      body: "Hawiyat does not claim an official partnership with any AI model vendor. Models are routes on the layer, and your data is never used to train them.",
    },
    {
      icon: Award,
      title: "Label Projet Innovant",
      body: "Label Projet Innovant from the Ministry of Knowledge Economy, and incubated by the Itihad accelerator.",
    },
    {
      icon: Languages,
      title: "Support in AR · FR · EN",
      body: "A local team in your timezone, in Arabic, French, and English.",
    },
  ]

  return (
    <section className="w-full py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-ink reveal-up">
            Built and supported in Algeria
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-ink md:text-5xl reveal-up">
            The execution layer, close to home.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-ink reveal-up">
            Hawiyat is an AI infrastructure company registered in Algeria — billing, support, and
            invoicing all run from the same timezone as your business.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 reveal-up">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="rounded-3xl border border-border bg-surface p-6 transition-transform duration-300 hover:scale-[0.98]"
            >
              <point.icon className="h-6 w-6 text-signal" />
              <h3 className="mt-4 text-lg font-semibold text-ink">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-ink">{point.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row reveal-up">
          <a
            href="https://wa.me/213559555951"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-signal px-8 py-3 text-sm font-semibold text-signal-text transition-transform duration-300 hover:scale-[1.03]"
          >
            Talk to the team
            <MessageCircle className="h-4 w-4" />
          </a>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-3 text-sm font-semibold text-ink transition-transform duration-300 hover:scale-[1.03]"
          >
            See services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AlgeriaBand
