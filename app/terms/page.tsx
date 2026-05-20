import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-32">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to home
        </Link>

        <div className="mt-8 space-y-2">
          <h1 className="text-4xl font-semibold">Terms of Use</h1>
          <p className="text-muted-foreground">Effective: Oct 4, 2025</p>
        </div>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-medium text-foreground">1. Introduction</h2>
            <p className="mt-3">
              These Terms of Use ("Terms") govern your use of Hawiyat's website, services and software (collectively,
              the "Service"). Please read carefully. By using the Service or creating an account you agree to these
              Terms. If you do not agree, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground">2. Acceptance of Terms</h2>
            <p className="mt-3">
              By accessing or using the Service you accept and agree to be bound by these Terms and our Privacy Policy.
              You also represent you have authority to accept these Terms on behalf of any organization you represent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground">3. Services</h2>
            <p className="mt-3">
              Hawiyat provides virtual private servers (VPS) configured with our PaaS, management dashboard, APIs, and
              related services. Service descriptions, limits, and features are published on our website and may be
              updated from time to time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground">4. Orders & Billing</h2>
            <p className="mt-3">
              All prices are displayed and charged in Algerian Dinar (DZD) unless otherwise specified. By placing an order
              you authorize us to charge your chosen payment method. Billing cycles, renewal, cancellation and refund
              policies are set out during checkout and in your order confirmation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground">5. Acceptable Use</h2>
            <p className="mt-3">You agree not to use the Service to:</p>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              <li>Violate laws, regulations, or third-party rights (including intellectual property).</li>
              <li>Host or distribute malware, illegal material, or facilitate unlawful activities.</li>
              <li>Send spam, conduct denial-of-service attacks, or abuse network resources.</li>
              <li>Attempt unauthorized access to other systems or data.</li>
            </ul>
            <p className="mt-4">
              Hawiyat may suspend or terminate accounts that engage in prohibited activity. We will attempt to notify
              account holders where practicable unless immediate action is required to mitigate harm.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground">6. Customer Content</h2>
            <p className="mt-3">
              "Customer Content" means any content you upload, store or transmit using the Service. You retain all rights
              in your Customer Content. You grant Hawiyat a limited license to host, transmit, and provide the Service.
            </p>
            <p className="mt-3">
              You are responsible for backing up Customer Content and ensuring you have necessary rights and consents.
              Hawiyat is not responsible for loss of Customer Content except where caused by our gross negligence.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground">7. Intellectual Property</h2>
            <p className="mt-3">
              All intellectual property rights in the Service (software, website, trademarks) belong to Hawiyat or its
              licensors. You are granted a non-exclusive, non-transferable license to use the Service in accordance
              with these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground">8. Liability & Warranties</h2>
            <p className="mt-3">
              The Service is provided "AS IS" and "AS AVAILABLE". Hawiyat disclaims all warranties to the fullest extent
              permitted by law. We do not warrant uninterrupted service or that the Service will meet all your
              requirements.
            </p>
            <p className="mt-3">
              To the maximum extent permitted by applicable law, Hawiyat's total liability arising out of or related to
              these Terms shall not exceed the amounts you paid to Hawiyat in the 12 months preceding the claim. We
              are not liable for indirect, special, incidental or consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground">9. Termination</h2>
            <p className="mt-3">
              Either party may terminate the service in accordance with account settings and billing terms. Hawiyat may
              suspend or terminate accounts for violation of these Terms, non-payment, or legal reasons. Upon termination
              you are responsible for exporting your data. We may delete account data after the retention period described
              in our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground">10. Governing Law & Disputes</h2>
            <p className="mt-3">
              These Terms are governed by the laws of the People's Democratic Republic of Algeria. You and Hawiyat agree
              to attempt to resolve disputes amicably before pursuing litigation in Algerian courts, unless otherwise
              agreed in writing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground">11. Contact</h2>
            <p className="mt-3">For questions regarding these Terms or to provide legal notices:</p>
            <ul className="mt-3 space-y-1">
              <li>Email: <a href="mailto:legal@hawiyat.org" className="text-foreground underline">legal@hawiyat.org</a></li>
              <li>Billing: <a href="mailto:billing@hawiyat.org" className="text-foreground underline">billing@hawiyat.org</a></li>
              <li>Privacy: <a href="mailto:privacy@hawiyat.org" className="text-foreground underline">privacy@hawiyat.org</a></li>
              <li>Mail: Legal Dept — Hawiyat, Algeria</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
