import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Copyright and DMCA Takedown Policy",
  description: "How to submit copyright infringement and takedown notices to Hawiyat, including required information and counter-notice procedures.",
  alternates: { canonical: "/dmca" },
  other: {
    "article:modified_time": "2026-08-01",
  },
}

export default function DMCAPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-32">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">← Back to home</Link>
        <header className="mt-8 space-y-2">
          <h1 className="text-4xl font-semibold">Copyright and DMCA Takedown Policy</h1>
          <p className="text-muted-foreground">Effective: October 4, 2025</p>
          <p className="text-muted-foreground text-xs">Last Updated: August 2026</p>
        </header>
        <div className="mt-12 space-y-10 text-sm leading-relaxed text-muted-foreground">
          <section><h2 className="text-lg font-medium text-foreground">1. Overview</h2><p className="mt-3">Hawiyat respects intellectual property rights and responds to complete, valid copyright notices concerning content hosted through its services.</p></section>
          <section><h2 className="text-lg font-medium text-foreground">2. Submit a notice</h2><p className="mt-3">Send notices to <a href="mailto:copyright@hawiyat.org" className="underline">copyright@hawiyat.org</a>. Identify the protected work, the allegedly infringing material and its URL, your contact information, and the basis for your claim.</p></section>
          <section><h2 className="text-lg font-medium text-foreground">3. Required statements</h2><p className="mt-3">Include a good-faith statement, a statement that the information is accurate and that you are authorized to act, plus your physical or electronic signature.</p></section>
          <section><h2 className="text-lg font-medium text-foreground">4. Review and counter-notices</h2><p className="mt-3">We may request more information, remove or restrict access to material, notify the affected customer, and process a valid counter-notice where applicable.</p></section>
          <section><h2 className="text-lg font-medium text-foreground">5. Repeat infringers</h2><p className="mt-3">Users whose access has been terminated for copyright infringement are not eligible for reinstatement. Hawiyat may permanently disable accounts associated with repeated or egregious violations.</p></section>
          <section><h2 className="text-lg font-medium text-foreground">6. Important disclaimer</h2><p className="mt-3">Hawiyat&apos;s role is that of a hosting and infrastructure provider. We do not evaluate the truth of the claims in a notice or counter-notice, and we do not provide legal advice. We process procedurally valid notices in accordance with applicable law.</p></section>
          <section><h2 className="text-lg font-medium text-foreground">7. Legal contact</h2><p className="mt-3">For legal questions, email <a href="mailto:legal@hawiyat.org" className="underline">legal@hawiyat.org</a>. Submitting false or misleading claims may carry legal consequences.</p></section>
        </div>
      </div>
    </div>
  )
}
