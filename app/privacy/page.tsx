import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Hawiyat Privacy Policy. How we collect, use, and protect your personal data in compliance with Algerian Law 18-07 and GDPR.",
  alternates: {
    canonical: "/privacy",
  },
}

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "dpo", label: "Data Protection Officer" },
  { id: "what-we-collect", label: "What We Collect" },
  { id: "how-we-use", label: "How We Use It" },
  { id: "legal-basis", label: "Legal Basis" },
  { id: "data-retention", label: "Data Retention" },
  { id: "data-sharing", label: "Data Sharing" },
  { id: "international-transfers", label: "International Transfers" },
  { id: "security", label: "Security" },
  { id: "automated-decisions", label: "Automated Decisions" },
  { id: "your-rights", label: "Your Rights" },
  { id: "cookies", label: "Cookies" },
  { id: "children", label: "Children" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-32">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          &larr; Back to home
        </Link>

        <div className="mt-8 space-y-2">
          <h1 className="text-4xl font-semibold">Privacy Policy</h1>
          <p className="text-muted-foreground">Effective: July 29, 2026</p>
        </div>

        <div className="mt-12 flex gap-12 lg:gap-20 relative">
          {/* Table of Contents - Sidebar */}
          <nav className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32 space-y-1 border-l border-border pl-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                On this page
              </p>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                >
                  {section.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Main Content */}
          <div className="flex-1 min-w-0 max-w-3xl text-sm leading-relaxed text-muted-foreground space-y-10">
            <section id="introduction">
              <h2 className="text-lg font-medium text-foreground">1. Introduction</h2>
              <p className="mt-3">
                Hawiyat (we, our, or us) operates hawiyat.org and provides AI infrastructure services
                including the Hawiyat Composer API gateway, virtual private servers, and managed hosting.
                We are based in Algiers, Algeria.
              </p>
              <p className="mt-3">
                This Privacy Policy explains what personal data we collect, how we process it, and what rights
                you have over your data. It covers our website, API services, and any related platforms we
                operate. By using our services or visiting our website, you acknowledge the practices described
                in this policy.
              </p>
              <p className="mt-3">
                We process your data in accordance with Algerian Law No. 18-07 on the protection of natural
                persons in the processing of personal data (as amended by Law No. 25-11 of July 2025), and
                where applicable, the EU General Data Protection Regulation (GDPR). Our processing activities
                have been declared to the ANPDP (Autorite Nationale de Protection des Donnees a Caractere
                Personnel) as required by law. If anything below is unclear, contact us at
                privacy@hawiyat.org and we will respond within seven days.
              </p>
            </section>

            <section id="dpo">
              <h2 className="text-lg font-medium text-foreground">2. Data Protection Officer</h2>
              <p className="mt-3">
                In accordance with Law No. 25-11 of July 24, 2025, Hawiyat has appointed a Data Protection
                Officer (DPO). The DPO is responsible for overseeing our compliance with Law 18-07 and
                Law 25-11, advising on Data Protection Impact Assessments, and serving as the contact point
                for the ANPDP and for data subjects.
              </p>
              <p className="mt-3">
                The DPO acts independently in the exercise of their duties and may be contacted at:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Email: privacy@hawiyat.org</li>
                <li>Mail: Hawiyat, Legal Department, Algiers, Algeria</li>
              </ul>
              <p className="mt-3 text-xs">
                The DPO's contact details have been communicated to the ANPDP in accordance with
                ANPDP Decision No. 01 of December 24, 2025.
              </p>
            </section>

            <section id="what-we-collect">
              <h2 className="text-lg font-medium text-foreground">3. What We Collect</h2>
              <p className="mt-3">We collect only the data needed to operate and improve our services. Data is collected directly from you (when you sign up, contact us, or use our services) and automatically through our systems (such as IP addresses and usage logs).</p>

              <h3 className="mt-4 font-medium text-foreground">Account Information</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Name, company name, and username</li>
                <li>Email address and phone number</li>
                <li>Account credentials and authentication data</li>
              </ul>

              <h3 className="mt-4 font-medium text-foreground">Usage and Service Data</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>API request metadata (timestamps, model IDs, token counts, latency, HTTP status codes)</li>
                <li>VPS configuration and deployment metadata</li>
                <li>Support ticket content and diagnostic information</li>
              </ul>
              <p className="mt-2 text-xs">We do not log API prompt or completion content by default.</p>

              <h3 className="mt-4 font-medium text-foreground">Payment Information</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Billing details and invoices in Algerian Dinar (DZD)</li>
                <li>Payment processor references (Stripe transaction IDs)</li>
              </ul>
              <p className="mt-2 text-xs">
                Full payment card details are handled by our payment processor (Stripe) and never reach our
                servers. We only store a reference to the payment method.
              </p>

              <h3 className="mt-4 font-medium text-foreground">Technical Data</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>IP address, browser type, device information, and referring URL</li>
                <li>Session activity logs and error reports</li>
              </ul>

              <p className="mt-4">
                We do not process special categories of personal data (sensitive data such as health
                information, political opinions, religious beliefs, or biometric data) as defined under
                Article 18 of Law 18-07. If you provide such data to us inadvertently, contact us and
                we will delete it where required by law.
              </p>
            </section>

            <section id="how-we-use">
              <h2 className="text-lg font-medium text-foreground">4. How We Use It</h2>
              <p className="mt-3">We use your personal data for the following purposes:</p>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>
                  <span className="text-foreground">Provide and Operate Services.</span>
                  {" "}Provision VPS instances, route API requests through Hawiyat Composer, manage your
                  account, and maintain platform availability.
                </li>
                <li>
                  <span className="text-foreground">Billing and Account Management.</span>
                  {" "}Process payments in Algerian Dinar, generate invoices, prevent fraud, and enforce our
                  Terms of Service.
                </li>
                <li>
                  <span className="text-foreground">Security and Abuse Prevention.</span>
                  {" "}Monitor for unauthorized access, detect abuse, enforce rate limits, and protect the
                  integrity of our infrastructure.
                </li>
                <li>
                  <span className="text-foreground">Analytics and Improvement.</span>
                  {" "}Analyze usage patterns to improve our products, optimize performance, and plan
                  infrastructure. Analytics data is aggregated where possible.
                </li>
                <li>
                  <span className="text-foreground">Communications.</span>
                  {" "}Send service notifications, security alerts, and billing reminders. Marketing
                  communications are sent only with your consent, and you can opt out at any time.
                </li>
                <li>
                  <span className="text-foreground">Legal Compliance.</span>
                  {" "}Comply with legal obligations we are subject to, including tax and accounting
                  record-keeping requirements under Algerian law.
                </li>
              </ul>
            </section>

            <section id="legal-basis">
              <h2 className="text-lg font-medium text-foreground">5. Legal Basis for Processing</h2>
              <p className="mt-3">
                Under Algerian Law 18-07, processing of personal data requires a valid legal basis. Our
                primary basis is your express consent. Where consent is not the applicable basis, we rely
                on one of the following exceptions permitted by law:
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>
                  <span className="text-foreground">Express Consent (Article 7, Law 18-07).</span>
                  {" "}You have given clear, specific, and informed consent to the processing. You may
                  withdraw your consent at any time without affecting the lawfulness of processing carried
                  out before withdrawal.
                </li>
                <li>
                  <span className="text-foreground">Contract Performance.</span>
                  {" "}Processing necessary to provide the services you signed up for, handle billing, and
                  manage your account.
                </li>
                <li>
                  <span className="text-foreground">Legal Obligation.</span>
                  {" "}Processing required to comply with legal obligations, including tax and accounting
                  record-keeping under Algerian law.
                </li>
                <li>
                  <span className="text-foreground">Legitimate Interest.</span>
                  {" "}Fraud prevention, network security, and service analytics, where our interest does
                  not override your fundamental rights and freedoms.
                </li>
              </ul>
            </section>

            <section id="data-retention">
              <h2 className="text-lg font-medium text-foreground">6. Data Retention</h2>
              <p className="mt-3">
                We keep your personal data only as long as necessary for the purposes described in this
                policy, or as required by law. After the retention period ends, data is deleted or
                anonymized.
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>
                  <span className="text-foreground">API Request Payloads (prompts and completions).</span>
                  {" "}Not stored. Discarded immediately after the response is sent.
                </li>
                <li>
                  <span className="text-foreground">Request Metadata.</span>
                  {" "}Kept for 7 days, then deleted. Aggregated token totals are retained for billing and
                  statistics.
                </li>
                <li>
                  <span className="text-foreground">Account and Billing Records.</span>
                  {" "}Kept for the lifetime of your account plus the period required by Algerian tax and
                  commercial law (up to 10 years for accounting records).
                </li>
                <li>
                  <span className="text-foreground">Support Logs and Diagnostics.</span>
                  {" "}Kept for up to 2 years after the issue is resolved.
                </li>
                <li>
                  <span className="text-foreground">Backup Copies.</span>
                  {" "}Limited in retention and deleted as soon as feasible, typically within 90 days.
                </li>
              </ul>
            </section>

            <section id="data-sharing">
              <h2 className="text-lg font-medium text-foreground">7. Data Sharing</h2>
              <p className="mt-3">
                We do not sell your personal data. We share data only with trusted third parties necessary
                to operate our services, and only under written contracts that require them to process data
                solely on our instructions, maintain confidentiality, and implement appropriate security
                measures, as required by Article 38 of Law 18-07.
              </p>

              <h3 className="mt-4 font-medium text-foreground">Sub-processors</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Cloud infrastructure and hosting providers</li>
                <li>Payment processors (Stripe) for billing transactions</li>
                <li>Email delivery services for notifications and support</li>
                <li>Monitoring and error tracking services</li>
              </ul>

              <h3 className="mt-4 font-medium text-foreground">Legal and Safety Disclosures</h3>
              <p className="mt-2">
                We may disclose personal data when required by law, to respond to valid legal requests from
                public authorities, to prevent fraud or imminent harm, or to protect our rights and property.
              </p>

              <h3 className="mt-4 font-medium text-foreground">Upstream AI Providers</h3>
              <p className="mt-2">
                When you use Hawiyat Composer to call an AI model, your request is forwarded to the provider
                you selected (OpenAI, Anthropic, Google, or others). Each provider has its own privacy policy
                that applies once the request leaves our infrastructure. Where available, we negotiate
                zero-retention terms with these providers.
              </p>
            </section>

            <section id="international-transfers">
              <h2 className="text-lg font-medium text-foreground">8. International Transfers</h2>
              <p className="mt-3">
                Our sub-processors and the AI model providers you use may be located outside Algeria,
                including in the United States and the European Union. Under Article 44 of Law 18-07,
                transfers of personal data to a foreign state require prior authorization from the ANPDP
                and an adequate level of protection in the recipient country.
              </p>
              <p className="mt-3">
                Where we transfer personal data across borders, we ensure compliance through one or more
                of the following:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>An adequacy determination by the ANPDP that the receiving country ensures sufficient
                protection of privacy and fundamental rights</li>
                <li>Prior authorization from the ANPDP for the specific transfer or category of transfers</li>
                <li>Your explicit consent, where applicable and where the transfer is not otherwise restricted
                by law</li>
                <li>One of the statutory exceptions under Law 18-07 (contract performance, legal obligation,
                public interest, or judicial cooperation)</li>
              </ul>
              <p className="mt-3">
                We do not transfer personal data to any jurisdiction where such transfer would endanger
                public security or the vital interests of the state, as such transfers are prohibited
                under Article 44 of Law 18-07.
              </p>
            </section>

            <section id="security">
              <h2 className="text-lg font-medium text-foreground">9. Security</h2>
              <p className="mt-3">
                We implement technical and organizational measures to protect personal data against
                accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access,
                as required by Article 38 of Law 18-07 and Article 45 bis 8 of Law 25-11.
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>Encryption in transit (TLS 1.3) for all data transmitted to and from our services</li>
                <li>Encryption at rest (AES-256) for stored data where applicable</li>
                <li>Role-based access controls, multi-factor authentication, and audit logging for production
                systems</li>
                <li>Regular security assessments, vulnerability scanning, and incident response procedures</li>
                <li>Data Protection Impact Assessments (DPIAs) for high-risk processing as required by
                Law 25-11</li>
              </ul>
              <p className="mt-3">
                In the event of a personal data breach, we will notify the ANPDP within five days of
                becoming aware of it, as required by Law 25-11. If the breach is likely to result in a
                high risk to your rights and freedoms, we will notify you without undue delay, describing
                the nature of the breach, the likely consequences, and the measures we have taken or
                propose to take. If you suspect a breach, contact us immediately at privacy@hawiyat.org.
              </p>
            </section>

            <section id="automated-decisions">
              <h2 className="text-lg font-medium text-foreground">10. Automated Decision-Making</h2>
              <p className="mt-3">
                Law 25-11 introduced provisions on profiling and automated decision-making. Hawiyat does
                not make decisions based solely on automated processing of personal data that produce legal
                effects concerning you or similarly significantly affect you. Where we use automated systems
                for fraud detection or rate limiting, these are subject to human oversight and do not
                constitute solely automated decisions with legal effect.
              </p>
            </section>

            <section id="your-rights">
              <h2 className="text-lg font-medium text-foreground">11. Your Rights</h2>
              <p className="mt-3">
                Under Law 18-07 and where applicable the GDPR, you have the following rights regarding your
                personal data:
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>
                  <span className="text-foreground">Right of Information (Article 32).</span>
                  {" "}To be informed, before data is collected, of the identity of the controller, the
                  purposes of processing, the recipients of the data, your rights, and whether data will
                  be transferred abroad.
                </li>
                <li>
                  <span className="text-foreground">Right of Access (Articles 33-34).</span>
                  {" "}To obtain confirmation of whether we process your data, and to receive a copy of
                  the personal data we hold about you, along with information on the purposes, categories
                  of data, and recipients.
                </li>
                <li>
                  <span className="text-foreground">Right to Rectification.</span>
                  {" "}To request correction of inaccurate or incomplete data. We will respond to
                  rectification requests within 10 days as required by Algerian law.
                </li>
                <li>
                  <span className="text-foreground">Right to Object.</span>
                  {" "}To object to the processing of your data for direct marketing purposes, or on
                  grounds relating to your particular situation for other processing.
                </li>
                <li>
                  <span className="text-foreground">Right to Withdraw Consent.</span>
                  {" "}To withdraw your consent at any time where processing is based on consent.
                  Withdrawal does not affect the lawfulness of processing carried out before withdrawal.
                </li>
                <li>
                  <span className="text-foreground">Right to Erasure.</span>
                  {" "}To request deletion of your personal data where it is no longer necessary for the
                  purposes for which it was collected, or where processing is based on consent and you
                  withdraw that consent, subject to our legal obligations (such as tax and accounting
                  retention requirements).
                </li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, email us at privacy@hawiyat.org. We may ask you to verify
                your identity before processing your request. We will respond within the timeframe required
                by applicable law. You also have the right to lodge a complaint with the ANPDP (Autorite
                Nationale de Protection des Donnees a Caractere Personnel) or your local data protection
                authority.
              </p>
            </section>

            <section id="cookies">
              <h2 className="text-lg font-medium text-foreground">12. Cookies</h2>
              <p className="mt-3">
                Our website uses a limited set of cookies. Algerian law requires express, specific, and
                informed consent before placing non-essential cookies. We apply the following categories:
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>
                  <span className="text-foreground">Strictly Necessary Cookies.</span>
                  {" "}Required for authentication, session management, and load balancing. These are
                  exempt from consent requirements as they are essential for the functioning of the
                  website.
                </li>
                <li>
                  <span className="text-foreground">Analytics Cookies.</span>
                  {" "}Privacy-focused analytics to understand how our website is used. These are placed
                  only after we obtain your express, granular consent through a cookie consent banner.
                  You may withdraw consent at any time.
                </li>
              </ul>
              <p className="mt-3">
                We do not use third-party advertising cookies. You can control cookies through your browser
                settings or through the consent banner on our website. Disabling strictly necessary cookies
                will break core functionality such as signing in to your account.
              </p>
            </section>

            <section id="children">
              <h2 className="text-lg font-medium text-foreground">13. Children</h2>
              <p className="mt-3">
                Our services are not directed to minors. Under Algerian law, processing of a child's
                personal data requires the consent of their legal representative. We do not knowingly
                process personal data of minors without such consent. If you believe a child has provided
                personal information to us without appropriate consent, contact us at privacy@hawiyat.org
                and we will delete it.
              </p>
            </section>

            <section id="changes">
              <h2 className="text-lg font-medium text-foreground">14. Changes to This Policy</h2>
              <p className="mt-3">
                When we make material changes to this policy, we will post the updated version here and
                notify active users by email. Your continued use of our services after the change takes
                effect means you accept the updated policy. We encourage you to review this page periodically.
              </p>
            </section>

            <section id="contact" className="scroll-mt-20">
              <h2 className="text-lg font-medium text-foreground">15. Contact</h2>
              <p className="mt-3">
                If you have questions, complaints, or requests regarding your personal data, or wish to
                contact our Data Protection Officer:
              </p>
              <ul className="mt-3 space-y-1">
                <li>DPO / Privacy: privacy@hawiyat.org</li>
                <li>Support: support@hawiyat.org</li>
                <li>WhatsApp: +213-55-955-5951</li>
                <li>Website: hawiyat.org</li>
                <li>Mail: Hawiyat, Legal Department, Algiers, Algeria</li>
              </ul>
              <p className="mt-3">
                We respond to privacy inquiries within seven days. You may also escalate a complaint to the
                ANPDP (Autorite Nationale de Protection des Donnees a Caractere Personnel) or your local
                data protection authority.
              </p>

              {/* Contact CTA */}
              <div className="mt-8 rounded-xl border border-border/60 bg-muted/30 dark:bg-secondary/30 p-6">
                <p className="text-sm font-medium text-foreground">Have a question about your data?</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  We answer privacy emails within seven days.
                </p>
                <a
                  href="mailto:privacy@hawiyat.org"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 hover:no-underline transition-all"
                >
                  privacy@hawiyat.org
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
