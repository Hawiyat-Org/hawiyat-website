import Link from "next/link"

export default function DMCAPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-32">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to home
        </Link>

        <div className="mt-8 space-y-2">
          <h1 className="text-4xl font-semibold">Copyright & Takedown Policy</h1>
          <p className="text-muted-foreground">Effective: Oct 4, 2025</p>
        </div>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-medium text-foreground">1. Overview</h2>
            <p className="mt-3">
              Hawiyat respects the intellectual property rights of others and expects our users to do the same.
              This policy describes how Hawiyat responds to claims of copyright infringement and counter-notices.
              Note: the U.S. Digital Millennium Copyright Act (DMCA) informs the structure of this policy, but it is
              not a substitute for local legal requirements. Rights-holders in Algeria and other jurisdictions may
              rely on their local law as well.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground">2. How to File a Copyright Notice</h2>
            <p className="mt-3">
              To report alleged infringement, send a written notice to our designated copyright agent:
            </p>
            <ul className="mt-3 space-y-1">
              <li>Email: <a href="mailto:copyright@hawiyat.org" className="text-foreground underline">copyright@hawiyat.org</a></li>
              <li>Mail: Legal Dept — Hawiyat, Algeria</li>
              <li>Subject line: "Copyright Notice"</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground">3. Required Elements of a Notice</h2>
            <p className="mt-3">A valid notice should include:</p>
            <ol className="mt-3 list-decimal pl-5 space-y-1">
              <li>Your full name and contact information (email, postal address, telephone number).</li>
              <li>A statement that you are the copyright owner or authorized to act on behalf of the owner.</li>
              <li>Identification of the copyrighted work claimed to be infringed and the URL or location of the allegedly infringing material on our Service.</li>
              <li>A statement that you have a good-faith belief the use is unauthorized.</li>
              <li>A statement under penalty of perjury that the information in the notice is accurate.</li>
              <li>Your electronic or physical signature (typed name is acceptable for email notices).</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground">4. How We Process Notices</h2>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              <li>We will acknowledge receipt of your notice by email where contact details are provided.</li>
              <li>Where appropriate we will remove or disable access to the allegedly infringing material pending investigation.</li>
              <li>We will notify the account holder whose content was removed and provide information about how to submit a counter-notice.</li>
              <li>We may preserve relevant logs and cooperate with law enforcement or rights-holders when required by law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground">5. Counter-Notice</h2>
            <p className="mt-3">
              If your content was removed and you believe it was a mistake, you may submit a counter-notice including:
            </p>
            <ol className="mt-3 list-decimal pl-5 space-y-1">
              <li>Your name, contact information, and identification of the removed material and its location prior to removal.</li>
              <li>A statement under penalty of perjury that you have a good-faith belief the material was removed by mistake or misidentification.</li>
              <li>Your consent to jurisdiction of the applicable forum and contact info for receiving notices.</li>
              <li>Your physical or electronic signature.</li>
            </ol>
            <p className="mt-3">
              After receiving a valid counter-notice we will generally restore the content unless the rights-holder
              files a court action seeking to restrain the allegedly infringing activity.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground">6. Repeat Infringers</h2>
            <p className="mt-3">
              We terminate accounts of users who are repeat infringers in appropriate circumstances. A "repeat infringer"
              is a user who has received multiple valid infringement notices or who otherwise repeatedly violates our
              policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground">7. Contact & Agent</h2>
            <ul className="mt-3 space-y-1">
              <li>Email: <a href="mailto:copyright@hawiyat.org" className="text-foreground underline">copyright@hawiyat.org</a></li>
              <li>Legal: <a href="mailto:legal@hawiyat.org" className="text-foreground underline">legal@hawiyat.org</a></li>
              <li>Mail: Legal Dept — Hawiyat, Algeria</li>
            </ul>
            <p className="mt-3">
              Note: This policy is a procedural tool to help rights-holders and users resolve copyright issues on our
              platform. It does not replace remedies under local law. If you are unsure about your rights, consult
              local counsel.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
