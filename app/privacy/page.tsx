import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-32">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to home
        </Link>

        <div className="mt-8 space-y-2">
          <h1 className="text-4xl font-semibold">Privacy Policy</h1>
          <p className="text-muted-foreground">Effective: Oct 4, 2025</p>
        </div>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-medium text-foreground">1. Introduction</h2>
            <p className="mt-3">
              Hawiyat ("we", "our", or "us") operates https://hawiyat.org and provides virtual private servers (VPS)
              configured with our Platform-as-a-Service (PaaS). This Privacy Policy explains how we collect, use,
              disclose, and protect personal information in connection with our services, and your rights in
              relation to that information. By using our website or services you accept the terms of this Privacy
              Policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground">2. Information We Collect</h2>
            <h3 className="mt-4 font-medium text-foreground">Account & Identity</h3>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Name, company name, username</li>
              <li>Email address and phone number</li>
              <li>Registration and authentication data</li>
            </ul>

            <h3 className="mt-4 font-medium text-foreground">Service & Usage Data</h3>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>VPS configuration, deployment metadata</li>
              <li>API calls, logs, telemetry and usage metrics</li>
              <li>Support ticket content and diagnostic information</li>
            </ul>

            <h3 className="mt-4 font-medium text-foreground">Payment & Technical</h3>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Billing details (invoices recorded in DZD)</li>
              <li>Transaction and payment processor references</li>
              <li>IP address, device/browser information</li>
            </ul>

            <p className="mt-4">
              We do not knowingly collect special categories of personal data (sensitive data). If you provide
              such data inadvertently, contact us and we will delete it where required by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground">3. How We Use Your Data</h2>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              <li><span className="text-foreground">Provide & Operate Services</span> — Provision VPSs, manage your account, deploy your PaaS configurations, and maintain platform availability.</li>
              <li><span className="text-foreground">Billing & Account Management</span> — Process payments billed in Algerian Dinar (DZD), generate invoices, prevent fraud, and enforce our Terms.</li>
              <li><span className="text-foreground">Analytics & Improvement</span> — Analyze usage to improve our products, detect abuse, and run diagnostics. Analytics may be aggregated and pseudonymized.</li>
              <li><span className="text-foreground">Communications & Marketing</span> — Send account notices, security alerts, and — with your consent where required — promotional communications. You may opt out of marketing messages.</li>
            </ul>
            <p className="mt-3">
              Legal bases for processing include performance of contract, compliance with legal obligations,
              legitimate interests (for security, analytics and fraud prevention), and consent where required.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground">4. How We Share Your Data</h2>
            <p className="mt-3">
              We will not sell your personal information. We may share data with trusted third parties only to the
              extent necessary to operate the Service or comply with law.
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              <li><span className="text-foreground">Service Providers</span> — Payment processors, hosting and data center operators, monitoring and security providers, and professional advisors under written agreements.</li>
              <li><span className="text-foreground">Legal & Safety</span> — When required by law, to respond to lawful requests from public authorities, to prevent fraud, or to protect the rights, property or safety of Hawiyat.</li>
            </ul>
            <p className="mt-3">
              Where data is transferred outside Algeria we will apply appropriate safeguards and will inform you where the transfer requires notice or consent under applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground">5. Data Security</h2>
            <p className="mt-3">
              We implement reasonable technical and organizational measures to protect personal data against
              accidental or unlawful destruction, loss, alteration, unauthorized disclosure or access:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              <li>Encryption in transit (TLS) and at rest where applicable</li>
              <li>Access controls, role-based permissions and logging</li>
              <li>Periodic security assessments and incident response planning</li>
            </ul>
            <p className="mt-3">
              If you suspect a data breach affecting your account, notify us immediately at <a href="mailto:privacy@hawiyat.org" className="text-foreground underline">privacy@hawiyat.org</a>. We
              will investigate and notify affected persons and authorities as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground">6. Your Rights & Choices</h2>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              <li><span className="text-foreground">Access</span> — Request a copy of personal data we hold about you.</li>
              <li><span className="text-foreground">Correction</span> — Request corrections to inaccurate or incomplete information.</li>
              <li><span className="text-foreground">Deletion</span> — Request deletion of your personal data where permitted by law, subject to our legal obligations (e.g., tax/accounting retention).</li>
            </ul>
            <p className="mt-3">
              To exercise rights, contact us at <a href="mailto:privacy@hawiyat.org" className="text-foreground underline">privacy@hawiyat.org</a>. We may require identity verification before
              responding.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground">7. Data Retention</h2>
            <p className="mt-3">
              We retain personal data only as long as necessary to provide services, comply with legal obligations
              (including accounting and tax laws), resolve disputes and enforce our agreements. Typical retention
              periods include: account and billing records — up to 7 years where required for tax purposes; support
              logs and diagnostic data — up to 2 years; backup copies — limited and deleted as soon as feasible.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground">8. Contact Us</h2>
            <ul className="mt-3 space-y-1">
              <li>Privacy: <a href="mailto:privacy@hawiyat.org" className="text-foreground underline">privacy@hawiyat.org</a></li>
              <li>Support: <a href="mailto:support@hawiyat.org" className="text-foreground underline">support@hawiyat.org</a></li>
              <li>Website: <a href="https://hawiyat.org" className="text-foreground underline">hawiyat.org</a></li>
              <li>Mail: Legal Dept — Hawiyat, Algeria</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
