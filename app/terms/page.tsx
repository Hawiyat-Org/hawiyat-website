import type { ReactNode } from "react"
import Link from "next/link"

function Note({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 rounded-xl border border-border/60 bg-surface-dim/30 p-4 text-xs leading-relaxed">
      {children}
    </div>
  )
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-32">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          &larr; Back to home
        </Link>

        <div className="mt-8 space-y-2">
          <h1 className="text-4xl font-semibold">Terms of Use</h1>
          <p className="text-muted-foreground">Effective Date: August 2026</p>
          <p className="text-muted-foreground text-xs">Last Updated: August 6, 2026 &middot; Version 1.2</p>
        </div>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-muted-foreground">
            <section id="introduction" className="scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">1. Introduction and Acceptance</h2>
              <p className="mt-3">
                These Terms of Use (&quot;Terms&quot;) govern your access to and use of the software platform,
                APIs, documentation, tools, and services provided by Hawiyat (&quot;Hawiyat,&quot; &quot;we,&quot;
                &quot;us,&quot; or &quot;our&quot;). This includes the Hawiyat AI Composer platform, associated APIs,
                dashboards, and all related software and infrastructure (together, the &quot;Service&quot;).
              </p>
              <p className="mt-3">
                By creating an account, accessing, or using the Service, you agree to be bound by these Terms.
                If you do not agree, you must not access or use the Service.
              </p>
              <p className="mt-3">
                If you accept these Terms on behalf of a company, organization, or other legal entity
                (&quot;Entity&quot;), you represent and warrant that you have the authority to bind that Entity to
                these Terms. If you lack such authority, or if you do not agree to these Terms, you must not accept
                them on behalf of the Entity and may not use the Service.
              </p>
              <p className="mt-3">
                Review our{" "}
                <Link href="/privacy" className="text-foreground underline underline-offset-4 hover:no-underline transition-all">
                  Privacy Policy
                </Link>{" "}
                for details on how we collect, use, store, and protect your personal data.
              </p>
            </section>

            <section id="definitions" className="scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">2. Definitions</h2>
              <p className="mt-3">The following definitions apply throughout these Terms:</p>
              <ul className="mt-3 space-y-3">
                <li>
                  <span className="text-foreground font-medium">&quot;User,&quot; &quot;you,&quot; &quot;your.&quot;</span>{" "}
                  Any individual or Entity that accesses or uses the Service.
                </li>
                <li>
                  <span className="text-foreground font-medium">&quot;Account.&quot;</span>{" "}
                  Your registered Hawiyat account, created through our registration process.
                </li>
                <li>
                  <span className="text-foreground font-medium">&quot;API Key.&quot;</span>{" "}
                  A unique credential issued to you for authentication and access to Hawiyat&apos;s APIs and services.
                </li>
                <li>
                  <span className="text-foreground font-medium">&quot;Composer.&quot;</span>{" "}
                  Hawiyat&apos;s AI execution engine. Composer sits between your business systems and Frontier Models. For
                  each task it decides the best way to accomplish it: which model to route to, what context to carry,
                  which tools to call, and whether the result is good enough. It then executes, evaluates, and learns.
                  &quot;Hawiyat AI Composer&quot; and &quot;Composer&quot; refer to the same engine.
                </li>
                <li>
                  <span className="text-foreground font-medium">&quot;Execution Layer.&quot;</span>{" "}
                  The software Hawiyat operates between your systems and Frontier Models. It understands tasks, plans
                  execution, routes each run to the most appropriate model and tools, executes the work, evaluates the
                  result, and logs telemetry. Models are routes within the layer, never products sold separately.
                </li>
                <li>
                  <span className="text-foreground font-medium">&quot;Frontier Models.&quot;</span>{" "}
                  AI models provided by third-party model providers, including Anthropic (Claude), OpenAI (GPT),
                  Google (Gemini), and other frontier AI laboratories.
                </li>
                <li>
                  <span className="text-foreground font-medium">&quot;Inputs.&quot;</span>{" "}
                  Data, prompts, code, text, or other content you submit to the Service.
                </li>
                <li>
                  <span className="text-foreground font-medium">&quot;Outputs.&quot;</span>{" "}
                  Code suggestions, text, results, or other content generated by the Service in response to your Inputs.
                </li>
                <li>
                  <span className="text-foreground font-medium">&quot;Run.&quot;</span>{" "}
                  A unit of work executed by the Service. Each run flows through the execution pipeline
                  (understand, plan, route, execute, evaluate, result) and is logged with telemetry.
                </li>
                <li>
                  <span className="text-foreground font-medium">&quot;Plan.&quot;</span>{" "}
                  The service level you select for Composer or a managed service (e.g., Pro, MAX 5X, MAX 20X, or a
                  managed hosting plan), each with its own capacity and billing terms.
                </li>
                <li>
                  <span className="text-foreground font-medium">&quot;Subscription Period.&quot;</span>{" "}
                  The recurring billing cycle for your plan (monthly, unless otherwise specified).
                </li>
                <li>
                  <span className="text-foreground font-medium">&quot;DZD.&quot;</span>{" "}
                  Algerian Dinar, the currency in which all Hawiyat pricing and billing is denominated.
                </li>
                <li>
                  <span className="text-foreground font-medium">&quot;Content.&quot;</span>{" "}
                  Inputs and Outputs, taken together.
                </li>
              </ul>
            </section>

            <section id="eligibility" className="scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">3. Eligibility</h2>
              <p className="mt-3">
                You must be at least eighteen (18) years old, or the age of majority in your jurisdiction, whichever
                is greater, to use the Service. By accepting these Terms, you represent and warrant that:
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>You meet the age requirement described above;</li>
                <li>You have not previously been suspended or banned from the Service;</li>
                <li>Your registration and use of the Service comply with all applicable laws in your jurisdiction; and</li>
                <li>
                  You are not located in, under the control of, or a national or resident of any country subject to
                  comprehensive international sanctions.
                </li>
              </ul>
            </section>

            <section id="account" className="scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">4. Account Registration and Security</h2>

              <h3 className="mt-4 font-medium text-foreground">4.1 Account Creation</h3>
              <p className="mt-2">
                To use the Service, you must create an account. You agree to provide accurate, current, and complete
                information during registration, and to keep it up to date.
              </p>

              <h3 className="mt-4 font-medium text-foreground">4.2 Account Security</h3>
              <p className="mt-2">You are solely responsible for:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Keeping your account credentials (password and API Keys) confidential;</li>
                <li>All activities that occur under your Account, whether or not you authorized them;</li>
                <li>
                  Notifying Hawiyat immediately if you become aware of any unauthorized use of your Account.
                </li>
              </ul>
              <Note>
                <p className="text-foreground font-medium">Security Notice:</p>
                <p className="mt-1">
                  Treat your API Keys as you would a password. Do not expose them in client-side code, public
                  repositories, browsers, or shared documents. Hawiyat is not responsible for losses caused by
                  unauthorized use of your API Keys.
                </p>
              </Note>

              <h3 className="mt-4 font-medium text-foreground">4.3 Multi-Factor Authentication</h3>
              <p className="mt-2">
                Hawiyat may require or offer multi-factor authentication (&quot;MFA&quot;) for certain accounts or
                features. You agree to enable MFA when required and to keep your MFA credentials secure.
              </p>
            </section>

            <section id="service" className="scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">5. The Service: Hawiyat AI Composer</h2>

              <h3 className="mt-4 font-medium text-foreground">5.1 What Composer Is</h3>
              <p className="mt-2">
                Hawiyat AI Composer is the AI execution engine. It does not train, host, or operate the underlying AI
                models. Instead, it sits between your business systems and Frontier Model providers, deciding the best
                way to accomplish each task: which model to route to, what context to carry, which tools to call, and
                whether the result is good enough.
              </p>
              <p className="mt-2">
                Each unit of work is a Run. Composer understands the task, plans its execution, routes it across the
                most appropriate model and tools, executes it against your systems, evaluates the result, and logs the
                outcome with telemetry. Models are routes within the layer, not products sold separately.
              </p>
              <p className="mt-2">
                Hawiyat owns and runs the Execution Layer. The underlying AI models are owned and run by third-party
                providers (Anthropic, OpenAI, Google, and others). Your outputs are produced by those models, carried
                and evaluated by Hawiyat&apos;s execution layer.
              </p>

              <h3 className="mt-4 font-medium text-foreground">5.2 How It Works</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <span className="text-foreground font-medium">API Key Activation.</span>{" "}
                  When you subscribe, you receive an API Key. This key connects your account to the Service and
                  authenticates all your requests.
                </li>
                <li>
                  <span className="text-foreground font-medium">Task Understanding.</span>{" "}
                  When you submit Inputs, Composer determines what the task actually requires: the goal, the context
                  from your connected systems (WhatsApp, CRM, ERP, email, databases, workflows), and the tools needed
                  to complete it.
                </li>
                <li>
                  <span className="text-foreground font-medium">Planning and Routing.</span>{" "}
                  Composer plans the execution and routes the run to the most appropriate Frontier Model and tools
                  based on the task type, complexity, quality requirements, latency, and cost. This may include models
                  from Anthropic, OpenAI, Google, and other providers.
                </li>
                <li>
                  <span className="text-foreground font-medium">Execution and Evaluation.</span>{" "}
                  The run is executed against your systems, and the result is evaluated for quality, correctness, and
                  completeness before it is delivered to you. Telemetry and evaluation logs are available in the
                  Execution Console.
                </li>
                <li>
                  <span className="text-foreground font-medium">Learning.</span>{" "}
                  Composer uses the outcome of each run to refine routing and execution decisions over time, so
                  repeated work is handled more efficiently.
                </li>
              </ul>

              <h3 className="mt-4 font-medium text-foreground">5.3 Hawiyat&apos;s Relationship to Frontier Model Providers</h3>
              <p className="mt-2">Hawiyat acts as an intermediary between you and Frontier Model providers. Specifically:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Hawiyat does not own, control, or operate any Frontier Model;</li>
                <li>Hawiyat does not determine the capabilities, limitations, or training data of Frontier Models;</li>
                <li>
                  Hawiyat may change, add, or remove Frontier Model providers at any time without prior notice, as
                  long as comparable service levels are maintained;
                </li>
                <li>
                  Hawiyat is not responsible for changes to a Frontier Model provider&apos;s terms, pricing,
                  availability, or capabilities.
                </li>
              </ul>

              <h3 className="mt-4 font-medium text-foreground">5.4 Service Availability</h3>
              <p className="mt-2">
                Hawiyat will use commercially reasonable efforts to keep the Execution Layer available. The Service
                depends on third-party Frontier Model providers for output generation. Hawiyat is not liable for
                downtime, degradation, or unavailability caused by those providers, including API outages, rate limit
                changes, model deprecations, or policy changes by Anthropic, OpenAI, Google, or others.
              </p>

              <h3 className="mt-4 font-medium text-foreground">5.5 Support</h3>
              <p className="mt-2">
                Hawiyat provides customer support for all active subscribers. Support covers the Execution Layer and
                Composer interface. Support for Frontier Model-specific behavior is limited to how that behavior
                appears through the Execution Layer. Support is available in Arabic, French, and English through the
                channels in your subscription dashboard.
              </p>
            </section>

            <section id="api-keys" className="scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">6. API Key Terms</h2>

              <h3 className="mt-4 font-medium text-foreground">6.1 Issuance</h3>
              <p className="mt-2">
                After you subscribe, Hawiyat issues one or more API Keys. These are unique, cryptographically generated
                credentials that identify your Account and authorize access to the Service.
              </p>

              <h3 className="mt-4 font-medium text-foreground">6.2 Standard B2B Method</h3>
              <p className="mt-2">
                Hawiyat uses the industry-standard API Key authentication model, the same approach major AI providers
                (Anthropic, OpenAI, etc.) use for B2B access. Activation, usage tracking, and support are all tied to
                your API Key.
              </p>

              <h3 className="mt-4 font-medium text-foreground">6.3 Your Obligations</h3>
              <p className="mt-2">You must:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Keep your API Key(s) confidential and secure;</li>
                <li>Not share, publish, or expose your API Key(s) to any unauthorized party;</li>
                <li>
                  Not embed API Key(s) in client-side applications, public code repositories, or publicly accessible
                  locations;
                </li>
                <li>Contact support immediately to rotate your key if you suspect it has been compromised;</li>
                <li>Use API Keys only for purposes authorized under these Terms;</li>
                <li>
                  Accept responsibility for all usage and charges incurred through your API Key(s), whether you
                  authorized them or not.
                </li>
              </ul>

              <h3 className="mt-4 font-medium text-foreground">6.4 Key Rotation</h3>
              <p className="mt-2">
                Hawiyat may require API Key rotation at any time for security reasons. You will be notified in advance
                except in emergencies where immediate rotation is needed to protect the Service.
              </p>

              <h3 className="mt-4 font-medium text-foreground">6.5 Termination of Keys</h3>
              <p className="mt-2">
                When your Account or subscription is terminated, all associated API Keys are revoked immediately.
              </p>
            </section>

            <section id="payments" className="scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">7. Payment Terms (Algerian Dinar)</h2>

              <h3 className="mt-4 font-medium text-foreground">7.1 Currency</h3>
              <p className="mt-2">
                All fees, charges, prices, and payments under these Terms are in Algerian Dinar (DZD / DA). No other
                currency is accepted unless Hawiyat agrees in writing.
              </p>

              <h3 className="mt-4 font-medium text-foreground">7.2 Pricing</h3>
              <p className="mt-2">
                Hawiyat sets and may modify pricing for the Service. Current pricing is on our pricing page. Price
                changes are communicated in advance through the dashboard, email, or other reasonable means. Your
                continued use after a change takes effect means you accept the new pricing.
              </p>

              <h3 className="mt-4 font-medium text-foreground">7.3 Plans and Billing</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <span className="text-foreground font-medium">Composer Plans.</span>{" "}
                  Pro and MAX tiers are billed as a monthly subscription in DZD. Capacity is measured in execution
                  runs or tasks, as defined in the plan. Payment: DZD via approved methods.
                </li>
                <li>
                  <span className="text-foreground font-medium">AI Composer Access (pay-per-run).</span>{" "}
                  Billing: per-run or per-task usage. Payment: DZD via approved methods.
                </li>
                <li>
                  <span className="text-foreground font-medium">Managed Services.</span>{" "}
                  Hosting, n8n, and WhatsApp infrastructure plans are billed monthly or yearly in DZD, as defined in
                  the plan.
                </li>
              </ul>

              <h3 className="mt-4 font-medium text-foreground">7.4 Payment Methods</h3>
              <p className="mt-2">
                Payments are processed through Hawiyat&apos;s approved payment processors. You authorize Hawiyat and
                its payment processors to charge your designated payment method for all fees under your Account.
              </p>

              <h3 className="mt-4 font-medium text-foreground">7.5 Non-Refundable Fees</h3>
              <p className="mt-2">
                Unless stated otherwise or required by law, all fees are non-refundable, including fees for partially
                used subscription periods.
              </p>

              <h3 className="mt-4 font-medium text-foreground">7.6 Taxes</h3>
              <p className="mt-2">
                You are responsible for all taxes, levies, and duties imposed by taxing authorities in your
                jurisdiction, except taxes based on Hawiyat&apos;s net income.
              </p>

              <h3 className="mt-4 font-medium text-foreground">7.7 Late Payments</h3>
              <p className="mt-2">If any amount due is not paid by the due date, Hawiyat may:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Suspend your access to the Service until payment is received;</li>
                <li>Terminate your Account after thirty (30) days of non-payment;</li>
                <li>Recover reasonable collection costs, including legal fees.</li>
              </ul>
            </section>

            <section id="quota" className="scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">8. Usage and Capacity Policy</h2>
              <Note>
                <p>
                  This section applies to Composer Pro and MAX subscription plans. Pay-per-run AI Composer access and
                  managed services may use different usage models, as described at the time of purchase.
                </p>
              </Note>

              <h3 className="mt-4 font-medium text-foreground">8.1 Included Capacity</h3>
              <p className="mt-2">
                Composer Pro and MAX plans include a monthly capacity of execution, measured in runs or tasks as
                defined on our pricing page and varying by plan tier. This is the amount of work included in your
                monthly subscription.
              </p>
              <p className="mt-2">
                Your included capacity covers your usage for the full month. The limit stays as published on our
                pricing page and in your subscription dashboard until Hawiyat changes it. Any change to included
                capacity or pricing is communicated in advance through the dashboard, email, or other reasonable
                means, and takes effect in the next billing cycle.
              </p>

              <h3 className="mt-4 font-medium text-foreground">8.2 How Included Capacity Works</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Your included capacity is a fixed ceiling for the billing cycle. It does not expire early or reduce if unused;</li>
                <li>Usage is tracked against your capacity throughout the month;</li>
                <li>You receive a notification at 80% utilization;</li>
                <li>
                  At 100%, additional usage beyond the included capacity requires a separate arrangement under Section 8.3.
                </li>
              </ul>

              <h3 className="mt-4 font-medium text-foreground">8.3 Exceeding Your Included Capacity</h3>
              <p className="mt-2">
                If your usage exceeds the included capacity before the end of the billing cycle, or if you anticipate
                needing more than your plan provides, Hawiyat handles this through a charging process:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Contact Hawiyat support to request additional usage beyond your included capacity;</li>
                <li>Hawiyat reviews your usage pattern and provides a quotation for the additional usage, payable in DZD;</li>
                <li>Additional usage is activated only after you confirm and pay the quoted amount;</li>
                <li>
                  The charge covers additional usage for the remainder of the current billing cycle or as otherwise
                  agreed;
                </li>
                <li>The same terms, restrictions, and acceptable use policies apply to additional usage;</li>
                <li>Hawiyat may decline additional usage requests at its discretion.</li>
              </ul>
              <Note>
                <p className="text-foreground font-medium">No Automatic Overage Billing:</p>
                <p className="mt-1">
                  Hawiyat will never automatically charge you for exceeding your included capacity. If you hit your
                  limit, usage may be throttled or paused until you contact support and arrange additional capacity.
                  You control what you pay beyond your plan.
                </p>
              </Note>

              <h3 className="mt-4 font-medium text-foreground">8.4 Capacity Does Not Carry Over</h3>
              <p className="mt-2">
                Unused capacity does not carry over to the next billing cycle. Each month&apos;s capacity is
                independent. What you don&apos;t use this month does not add to next month.
              </p>

              <h3 className="mt-4 font-medium text-foreground">8.5 Changes to the Included Capacity</h3>
              <p className="mt-2">
                Hawiyat may modify the included capacity in each plan tier, and the pricing for additional usage.
                Changes are communicated at least thirty (30) days in advance through the dashboard, email, or other
                reasonable means. Your continued use after a change takes effect means you accept it. If you disagree,
                you may terminate your subscription before the change takes effect.
              </p>

              <h3 className="mt-4 font-medium text-foreground">8.6 Usage Monitoring</h3>
              <p className="mt-2">
                You can check your current usage, remaining allocation, and billing history through the Hawiyat
                Execution Console. Usage data is provided on a best-effort basis; actual billing is based on
                Hawiyat&apos;s internal records.
              </p>
            </section>

            <section id="prohibited-activities" className="scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">9. Usage Restrictions and Prohibited Activities</h2>
              <Note>
                <p className="text-foreground font-medium">Zero Tolerance:</p>
                <p className="mt-1">
                  Hawiyat has a strict policy against misuse of the Service. Violating any provision in this Section 9
                  may result in immediate suspension or termination of your Account, forfeiture of prepaid fees, and
                  referral to law enforcement where applicable.
                </p>
              </Note>

              <h3 className="mt-4 font-medium text-foreground">9.1 General Usage Restrictions</h3>
              <p className="mt-2">Except where prohibited by applicable law, you may not:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>
                  Reverse engineer, disassemble, decompile, decode, or otherwise attempt to derive the source code,
                  object code, or underlying structure of the Service;
                </li>
                <li>Reproduce, modify, translate, or create derivative works of the Service;</li>
                <li>Rent, lease, loan, sell, sublicense, or distribute the Service or any access to it;</li>
                <li>Remove, alter, or obscure any proprietary rights notices on the Service;</li>
                <li>
                  Use the Service or any Output to develop or train a competing AI model, or engage in model mining,
                  model distillation, or model stealing;
                </li>
                <li>
                  Provide any third party with access to the Service using your API Key, except as expressly
                  authorized;
                </li>
                <li>Share, resell, or transfer your subscription, API Key, or quota to any third party;</li>
                <li>
                  Use the Service for benchmarking or competitive analysis without Hawiyat&apos;s prior written consent;
                </li>
                <li>Collect, extract, scrape, or systematically retrieve data from the Service;</li>
                <li>
                  Use automated scripts, bots, crawlers, or other automated means to access the Service except through
                  the documented API;
                </li>
                <li>Exceed the rate limits or usage quotas of your plan;</li>
                <li>
                  Circumvent or attempt to circumvent any usage limitations, quotas, or security measures of the
                  Service.
                </li>
              </ul>

              <h3 className="mt-4 font-medium text-foreground">9.2 Prohibited Content</h3>
              <p className="mt-2">You may not use the Service to generate, store, transmit, or distribute content that:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Is illegal or violates any applicable law or regulation;</li>
                <li>
                  Infringes, misappropriates, or violates the intellectual property, privacy, or other rights of any
                  third party;
                </li>
                <li>
                  Contains or promotes malware, viruses, worms, Trojan horses, ransomware, spyware, adware, or other
                  malicious software;
                </li>
                <li>Is defamatory, obscene, pornographic, abusive, harassing, threatening, or hateful;</li>
                <li>Promotes discrimination, violence, or hatred against any individual or group;</li>
                <li>Is fraudulent, deceptive, or misleading;</li>
                <li>Constitutes unsolicited or unauthorized advertising, spam, or promotional material;</li>
                <li>
                  Contains personal or confidential information of any third party without authorization (e.g., Social
                  Security numbers, credit card numbers, passwords);
                </li>
                <li>
                  Is subject to specific protections under applicable laws (e.g., HIPAA, PCI-DSS, GLBA data) unless you
                  have obtained all necessary consents;
                </li>
                <li>Violates the terms of service of any third-party model provider accessed through the Service.</li>
              </ul>

              <h3 className="mt-4 font-medium text-foreground">9.3 Prohibited Use Cases</h3>
              <p className="mt-2">You may not use the Service for:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>
                  <span className="text-foreground">Cyberattack development:</span>{" "}
                  creating, improving, or assisting in tools, techniques, or code intended for unauthorized access to
                  computer systems, networks, or data;
                </li>
                <li>
                  <span className="text-foreground">Surveillance and espionage:</span>{" "}
                  building or operating surveillance tools, spyware, stalkerware, or systems for unauthorized
                  monitoring of individuals;
                </li>
                <li>
                  <span className="text-foreground">Weapons development:</span>{" "}
                  designing, developing, or improving weapons systems, including autonomous weapons, chemical weapons,
                  biological weapons, nuclear weapons, or their delivery systems;
                </li>
                <li>
                  <span className="text-foreground">Fraud and impersonation:</span>{" "}
                  creating content or code intended to defraud, impersonate, or deceive;
                </li>
                <li>
                  <span className="text-foreground">Election interference:</span>{" "}
                  generating content intended to influence elections, spread political disinformation, or suppress
                  voter participation;
                </li>
                <li>
                  <span className="text-foreground">Non-consensual content:</span>{" "}
                  generating intimate, explicit, or sexual content of or about individuals without their consent,
                  including non-consensual deepfakes;
                </li>
                <li>
                  <span className="text-foreground">Regulated activities:</span>{" "}
                  using the Service as a substitute for licensed professional advice in medical, legal, financial, or
                  other regulated fields without appropriate human oversight;
                </li>
                <li>
                  <span className="text-foreground">Mass automated abuse:</span>{" "}
                  using the Service to generate content at scale for spam, manipulation, or harassment;
                </li>
                <li>
                  <span className="text-foreground">Unauthorized resale:</span>{" "}
                  reselling access to the Service, API outputs, or generated content as a competing service without
                  Hawiyat&apos;s written authorization.
                </li>
              </ul>
            </section>

            <section id="security" className="scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">10. Security and Anti-Hacking Provisions</h2>
              <Note>
                <p className="text-foreground font-medium">Important:</p>
                <p className="mt-1">
                  This section contains mandatory security requirements. Violating these provisions is a material
                  breach of these Terms and may result in immediate termination, legal action, and referral to law
                  enforcement.
                </p>
              </Note>

              <h3 className="mt-4 font-medium text-foreground">10.1 Prohibited Security Activities</h3>
              <p className="mt-2">You must not, and must not attempt to, directly or indirectly:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>
                  Access or attempt to access any Account, server, system, network, database, or data you are not
                  authorized to access;
                </li>
                <li>
                  Probe, scan, or test the vulnerability of the Service or any related system or network without
                  Hawiyat&apos;s prior written authorization;
                </li>
                <li>
                  Circumvent, disable, interfere with, or attempt to circumvent any security feature, authentication
                  mechanism, rate limiter, or access control of the Service;
                </li>
                <li>
                  Launch or attempt any denial-of-service (DoS) or distributed denial-of-service (DDoS) attack against
                  the Service or any related infrastructure;
                </li>
                <li>Extract, copy, or exfiltrate data from the Service by any unauthorized means;</li>
                <li>
                  Attempt to gain unauthorized access through credential stuffing, brute force, password spraying, or
                  any other authentication bypass technique;
                </li>
                <li>
                  Attack, interfere with, or disrupt the Service&apos;s infrastructure, including DNS, load balancers,
                  containers, virtual machines, storage systems, or network equipment;
                </li>
                <li>
                  Introduce malicious code, backdoors, or vulnerabilities into any component of the Service, including
                  through compromised Inputs, dependencies, or integrations;
                </li>
                <li>
                  Attempt to gain unauthorized access to the Service or associated systems through social engineering
                  of Hawiyat employees, contractors, or other users;
                </li>
                <li>
                  Use the API in any manner that could damage, disable, overburden, or impair the Service, including
                  through excessive requests, malformed payloads, or resource exhaustion attacks.
                </li>
              </ul>

              <h3 className="mt-4 font-medium text-foreground">10.2 Security Incident Reporting</h3>
              <p className="mt-2">If you discover or suspect a security vulnerability in the Service, you must:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Not publicly disclose the vulnerability;</li>
                <li>Not exploit the vulnerability beyond what is necessary to demonstrate it;</li>
                <li>
                  Report it immediately to Hawiyat at{" "}
                  <a href="mailto:security@hawiyat.org" className="text-foreground underline underline-offset-4 hover:no-underline transition-all">
                    security@hawiyat.org
                  </a>{" "}
                  with detailed information;
                </li>
                <li>Cooperate with Hawiyat in investigating and resolving the issue.</li>
              </ul>
              <p className="mt-2">
                Hawiyat will acknowledge receipt within 48 hours and will work with you in good faith to resolve the
                issue. Hawiyat may, at its discretion, recognize responsible disclosure through its security
                recognition program.
              </p>

              <h3 className="mt-4 font-medium text-foreground">10.3 Your Security Obligations</h3>
              <p className="mt-2">You must:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>
                  Implement and maintain reasonable security measures for your Account, API Key(s), and any systems
                  that integrate with the Service;
                </li>
                <li>Use strong, unique passwords for your Account;</li>
                <li>Enable multi-factor authentication when available;</li>
                <li>Revoke and rotate API Keys promptly if a security incident is suspected;</li>
                <li>Not store API Keys in plaintext, version control systems, or insecure locations;</li>
                <li>Comply with all applicable data protection and cybersecurity laws;</li>
                <li>Review Account activity regularly and report suspicious behavior to Hawiyat.</li>
              </ul>

              <h3 className="mt-4 font-medium text-foreground">10.4 Monitoring and Enforcement</h3>
              <p className="mt-2">
                Hawiyat may monitor usage patterns to detect anomalous API usage, potential abuse, and security
                threats. Hawiyat may suspend or restrict access if it reasonably believes your Account or API Key has
                been compromised, or if your usage poses a security risk to the Service or other users.
              </p>
            </section>

            <section id="ip" className="scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">11. Intellectual Property</h2>

              <h3 className="mt-4 font-medium text-foreground">11.1 Hawiyat&apos;s IP</h3>
              <p className="mt-2">
                Hawiyat and its licensors retain all rights, title, and interest in the Execution Layer, including:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>The Composer execution pipeline, planning logic, and context management algorithms;</li>
                <li>Model routing and selection systems;</li>
                <li>Execution and evaluation systems;</li>
                <li>APIs, dashboards, documentation, and all associated software;</li>
                <li>Trademarks, trade names, and brand materials.</li>
              </ul>
              <p className="mt-2">
                No implied license is granted under these Terms. The license to you is limited to using the Service as
                described in these Terms.
              </p>

              <h3 className="mt-4 font-medium text-foreground">11.2 Frontier Model Providers&apos; IP</h3>
              <p className="mt-2">
                The underlying Frontier Models, their weights, architectures, training data, and related intellectual
                property belong to their respective providers (Anthropic, OpenAI, Google, and others). These Terms
                grant you no rights in or to the Frontier Models themselves. Your use of Frontier Models through the
                Execution Layer is subject to each provider&apos;s terms of service.
              </p>

              <h3 className="mt-4 font-medium text-foreground">11.3 Model Training (Frontier Model Providers)</h3>
              <p className="mt-2">
                Hawiyat does not control the training practices of Frontier Model providers. Each provider has its own
                data usage policies. Where technically feasible, Hawiyat configures the Execution Layer to route
                requests through API endpoints that opt out of provider-side training. Hawiyat cannot guarantee that a
                provider will not use data processed through its API in accordance with its own terms. You should
                review each provider&apos;s data usage policy.
              </p>

              <h3 className="mt-4 font-medium text-foreground">11.4 Feedback</h3>
              <p className="mt-2">
                If you provide feedback, suggestions, or ideas about the Service (&quot;Feedback&quot;), you grant
                Hawiyat a perpetual, irrevocable, worldwide, royalty-free license to use, modify, and incorporate that
                Feedback into the Service without restriction or compensation.
              </p>

              <h3 className="mt-4 font-medium text-foreground">11.5 Usage Data</h3>
              <p className="mt-2">
                Hawiyat may collect and analyze usage data (technical logs, performance metrics, usage patterns) for
                security, analytics, and service improvement. Usage data is disclosed to third parties only in
                aggregated or de-identified form that does not identify you.
              </p>
            </section>

            <section id="ai-limitations" className="scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">12. AI Model Limitations and Disclaimers</h2>

              <h3 className="mt-4 font-medium text-foreground">12.1 Two-Layer Architecture</h3>
              <p className="mt-2">The Service operates as a two-layer system:</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <span className="text-foreground font-medium">The Execution Layer (Hawiyat):</span>{" "}
                  Software that understands tasks, plans execution, routes each run across models and tools, executes
                  the work against your systems, and evaluates the result. It carries and delivers AI outputs but does
                  not generate the underlying model responses.
                </li>
                <li>
                  <span className="text-foreground font-medium">Frontier Models (Third-Party Providers):</span>{" "}
                  Large language models run by Anthropic, OpenAI, Google, and other providers. These produce the raw
                  AI outputs based on the context and tasks routed to them by the Execution Layer.
                </li>
              </ul>
              <p className="mt-2">
                Output quality depends on both layers. Hawiyat controls the Execution Layer but has no control over
                the Frontier Models.
              </p>

              <h3 className="mt-4 font-medium text-foreground">12.2 Limitations of Frontier Models</h3>
              <p className="mt-2">
                Outputs generated by Frontier Models, even after evaluation by Composer, may:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Contain errors, inaccuracies, hallucinations, or misleading information;</li>
                <li>Be similar or identical to outputs provided to other users of the same model;</li>
                <li>Produce repetitive, stereotypical, or biased content reflecting training data;</li>
                <li>Struggle with nuances of language, context, and intent;</li>
                <li>Have limitations in complex reasoning, judgment, and decision-making;</li>
                <li>
                  Generate code that looks correct but contains subtle bugs, security vulnerabilities, logical errors,
                  or dependency issues;
                </li>
                <li>
                  Reflect the policies, safety filters, and behavioral constraints of the underlying model provider.
                </li>
              </ul>

              <h3 className="mt-4 font-medium text-foreground">12.3 Limitations of the Execution Layer</h3>
              <p className="mt-2">Hawiyat&apos;s Execution Layer:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>May not plan or route every task perfectly. Execution planning is heuristic and best-effort;</li>
                <li>May select a Frontier Model that is not ideal for a specific use case;</li>
                <li>May add latency or overhead through the execution pipeline;</li>
                <li>
                  Cannot guarantee that routing or evaluation will improve every Output;
                </li>
                <li>Is subject to its own software limitations, bugs, and errors.</li>
              </ul>

              <h3 className="mt-4 font-medium text-foreground">12.4 Your Responsibility</h3>
              <p className="mt-2">
                You are solely responsible for evaluating all Outputs before use. You must review, test, and verify any
                code, content, or suggestions from the Service, whether produced by the Execution Layer or the
                underlying Frontier Models, before relying on them for production systems, business decisions, or any
                consequential purpose. Hawiyat does not guarantee the accuracy, completeness, or fitness for purpose of
                any Output.
              </p>

              <h3 className="mt-4 font-medium text-foreground">12.5 No Professional Advice</h3>
              <p className="mt-2">
                The Service does not provide legal, medical, financial, accounting, or other professional advice.
                Outputs are not a substitute for professional judgment.
              </p>

              <h3 className="mt-4 font-medium text-foreground">12.6 Model Provider Terms</h3>
              <p className="mt-2">
                Using the Service also means you accept the terms and policies of the underlying Frontier Model
                providers (Anthropic, OpenAI, Google, etc.). If there is a conflict between Hawiyat&apos;s Terms and a
                provider&apos;s terms, Hawiyat&apos;s Terms govern your relationship with Hawiyat. Frontier Model
                providers may impose additional restrictions on how their models are used, and you must follow those
                restrictions even when accessing models through the Execution Layer.
              </p>
            </section>

            <section id="third-party" className="scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">13. Third-Party Services and Providers</h2>

              <h3 className="mt-4 font-medium text-foreground">13.1 Frontier Model Providers</h3>
              <p className="mt-2">
                The Service depends on third-party Frontier Model providers for AI inference. These include, but are
                not limited to, Anthropic, OpenAI, Google, and other AI laboratories. Hawiyat acts as an intermediary
                between you and these providers through the Execution Layer.
              </p>
              <p className="mt-2">
                Hawiyat makes no representations or warranties about Frontier Model providers. Each provider has its
                own terms of service, acceptable use policies, privacy policies, and service level agreements. Using
                the Service does not create a direct contractual relationship between you and any Frontier Model
                provider. Your relationship for AI inference is with Hawiyat.
              </p>

              <h3 className="mt-4 font-medium text-foreground">13.2 Provider Changes</h3>
              <p className="mt-2">
                Hawiyat may add, remove, or replace Frontier Model providers at any time without prior notice. This may
                affect the availability, quality, cost, or behavior of Outputs. Hawiyat will use commercially
                reasonable efforts to maintain comparable service levels but does not guarantee that any particular
                model will remain available.
              </p>

              <h3 className="mt-4 font-medium text-foreground">13.3 Other Third-Party Services</h3>
              <p className="mt-2">
                The Service may also rely on other third-party services, such as payment processors and infrastructure
                providers. Hawiyat makes no representations or warranties about these services. Your use of
                third-party services is subject to their terms.
              </p>

              <h3 className="mt-4 font-medium text-foreground">13.4 Limitation of Responsibility</h3>
              <p className="mt-2">
                Hawiyat is not responsible for downtime, errors, rate limit changes, pricing changes, security
                incidents, policy changes, or service discontinuations by third-party Frontier Model providers or
                other third-party services.
              </p>
            </section>

            <section id="indemnification" className="scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">14. Indemnification</h2>
              <p className="mt-3">
                To the maximum extent permitted by applicable law, you agree to defend, indemnify, and hold harmless
                Hawiyat, its affiliates, and their respective officers, directors, employees, contractors, agents, and
                representatives (together, &quot;Hawiyat Parties&quot;) from and against any claims, liabilities,
                damages, losses, costs, and expenses (including reasonable attorneys&apos; fees) arising out of or
                relating to:
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>Your use of the Service, including any use that violates these Terms;</li>
                <li>
                  Your Inputs, including any claim that your Inputs infringe, misappropriate, or violate the
                  intellectual property, privacy, or other rights of any third party;
                </li>
                <li>Your violation of any applicable law, regulation, or third-party right;</li>
                <li>Your violation of any security obligations under Section 10;</li>
                <li>Any unauthorized use of your Account or API Key(s).</li>
              </ul>
            </section>

            <section id="liability" className="scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">15. Limitation of Liability</h2>

              <h3 className="mt-4 font-medium text-foreground">15.1 Disclaimer of Warranties</h3>
              <p className="mt-2 uppercase">
                The Service is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; without warranties of any kind,
                whether express, implied, or statutory, including but not limited to warranties of merchantability,
                fitness for a particular purpose, title, and non-infringement.
              </p>
              <p className="mt-2 uppercase">
                Hawiyat does not warrant that the Service will be uninterrupted, error-free, secure, or free of viruses
                or other harmful components.
              </p>

              <h3 className="mt-4 font-medium text-foreground">15.2 Limitation of Damages</h3>
              <p className="mt-2 uppercase">
                To the maximum extent permitted by applicable law, no Hawiyat Party will be liable for any indirect,
                incidental, special, consequential, or punitive damages, including loss of profits, data, business
                opportunities, or reputational harm, arising out of or related to these Terms or the Service, whether
                based on warranty, contract, tort (including negligence), or any other legal theory, even if Hawiyat
                has been advised of the possibility of such damages.
              </p>

              <h3 className="mt-4 font-medium text-foreground">15.3 Liability Cap</h3>
              <p className="mt-2 uppercase">
                To the maximum extent permitted by applicable law, the total liability of Hawiyat Parties arising out
                of or related to these Terms or the Service will not exceed the greater of: (A) the amount you have
                paid to Hawiyat in the twelve (12) months before the event giving rise to the claim, or (B) one million
                Algerian Dinars (1,000,000 DZD).
              </p>

              <h3 className="mt-4 font-medium text-foreground">15.4 Exceptions</h3>
              <p className="mt-2">
                The limitations in this Section 15 do not apply to: (a) Hawiyat&apos;s indemnification obligations
                under Section 14; (b) either party&apos;s breach of confidentiality obligations; (c) either
                party&apos;s willful misconduct or gross negligence; or (d) liability that cannot be excluded or
                limited under applicable law.
              </p>
            </section>

            <section id="termination" className="scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">16. Termination</h2>

              <h3 className="mt-4 font-medium text-foreground">16.1 By You</h3>
              <p className="mt-2">
                You may terminate your Account and stop using the Service at any time by contacting Hawiyat support or
                through your Account dashboard. Termination does not entitle you to a refund of fees already paid,
                except as required by applicable law.
              </p>

              <h3 className="mt-4 font-medium text-foreground">16.2 By Hawiyat</h3>
              <p className="mt-2">
                Hawiyat may suspend or terminate your access to the Service at any time, with or without notice, for
                any reason, including:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>
                  Violation of these Terms, including the usage restrictions in Section 9 or security provisions in
                  Section 10;
                </li>
                <li>Non-payment of fees;</li>
                <li>Requests by law enforcement or government agencies;</li>
                <li>Discontinuation of the Service, in whole or in part;</li>
                <li>Extended inactivity on your Account (twelve (12) months or more);</li>
                <li>Technical or security issues that pose a risk to the Service or other users.</li>
              </ul>

              <h3 className="mt-4 font-medium text-foreground">16.3 Effect of Termination</h3>
              <p className="mt-2">Upon termination:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Your API Key(s) are revoked immediately;</li>
                <li>Your access to the Service stops immediately;</li>
                <li>
                  Hawiyat may delete your Account data after a reasonable retention period (minimum 30 days);
                </li>
                <li>
                  Provisions that by their nature should survive termination will survive, including Sections 9, 10,
                  11, 12, 14, 15, and 18.
                </li>
              </ul>

              <h3 className="mt-4 font-medium text-foreground">16.4 Refund on Termination by Hawiyat</h3>
              <p className="mt-2">
                If Hawiyat terminates your subscription for reasons other than your breach of these Terms, Hawiyat will
                provide a pro-rata refund for the unused portion of your current billing period.
              </p>
            </section>

            <section id="modifications" className="scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">17. Modifications to Terms</h2>
              <p className="mt-3">
                Hawiyat may modify these Terms at any time. Material changes are communicated through the Service
                dashboard, email, or other reasonable means at least thirty (30) days before taking effect. Your
                continued use after the effective date means you accept the modified Terms.
              </p>
              <p className="mt-3">
                If you do not agree to the modified Terms, you must stop using the Service and terminate your Account
                before the changes take effect.
              </p>
            </section>

            <section id="disputes" className="scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">18. Dispute Resolution</h2>

              <h3 className="mt-4 font-medium text-foreground">18.1 Governing Law</h3>
              <p className="mt-2">
                These Terms are governed by the laws of the People&apos;s Democratic Republic of Algeria, without
                regard to its conflict of laws principles.
              </p>

              <h3 className="mt-4 font-medium text-foreground">18.2 Jurisdiction</h3>
              <p className="mt-2">
                Any dispute arising out of or relating to these Terms is subject to the exclusive jurisdiction of the
                competent courts of Algeria, subject to the dispute resolution procedures below.
              </p>

              <h3 className="mt-4 font-medium text-foreground">18.3 Amicable Resolution</h3>
              <p className="mt-2">
                The parties will first try to resolve any dispute through good-faith negotiation. If the dispute cannot
                be resolved within thirty (30) days, either party may initiate formal proceedings.
              </p>

              <h3 className="mt-4 font-medium text-foreground">18.4 Arbitration</h3>
              <p className="mt-2">
                Any dispute that cannot be resolved through amicable negotiation within thirty (30) days will be
                settled by arbitration under the rules of the Comite National de l&apos;Arbitrage (CNA) or another
                arbitration body agreed upon by both parties in Algeria. The arbitration will be conducted in Arabic or
                French, in Algiers, unless the parties agree on a different location. The arbitral award is final and
                binding on both parties.
              </p>

              <h3 className="mt-4 font-medium text-foreground">18.5 Equitable Relief</h3>
              <p className="mt-2">
                Notwithstanding the above, either party may seek injunctive or other equitable relief in any court of
                competent jurisdiction to prevent the actual or threatened infringement, misappropriation, or violation
                of intellectual property rights or confidentiality obligations.
              </p>
            </section>

            <section id="general" className="scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">19. General Provisions</h2>

              <h3 className="mt-4 font-medium text-foreground">19.1 Entire Agreement</h3>
              <p className="mt-2">
                These Terms, together with the Privacy Policy and any other agreements expressly incorporated by
                reference, are the entire agreement between you and Hawiyat regarding the Service.
              </p>

              <h3 className="mt-4 font-medium text-foreground">19.2 Severability</h3>
              <p className="mt-2">
                If any provision of these Terms is held to be invalid, illegal, or unenforceable, the remaining
                provisions continue in full force and effect.
              </p>

              <h3 className="mt-4 font-medium text-foreground">19.3 Waiver</h3>
              <p className="mt-2">
                Failure by Hawiyat to enforce any right or provision of these Terms does not constitute a waiver of
                that right or provision.
              </p>

              <h3 className="mt-4 font-medium text-foreground">19.4 Assignment</h3>
              <p className="mt-2">
                You may not assign or transfer these Terms or your rights under them without Hawiyat&apos;s prior
                written consent. Hawiyat may assign these Terms without restriction, including in connection with a
                merger, acquisition, or sale of assets.
              </p>

              <h3 className="mt-4 font-medium text-foreground">19.5 Force Majeure</h3>
              <p className="mt-2">
                Hawiyat will not be liable for any failure or delay in performance caused by events beyond its
                reasonable control, including natural disasters, war, terrorism, pandemics, government actions, power
                failures, internet disruptions, or failures of third-party model providers or infrastructure providers.
              </p>

              <h3 className="mt-4 font-medium text-foreground">19.6 No Agency</h3>
              <p className="mt-2">
                Nothing in these Terms creates a partnership, joint venture, agency, or employment relationship between
                you and Hawiyat.
              </p>

              <h3 className="mt-4 font-medium text-foreground">19.7 Language</h3>
              <p className="mt-2">
                These Terms are in English. If there is a conflict between the English version and any translated
                version, the English version prevails. Hawiyat may make these Terms available in Arabic and French for
                convenience, but only the English version is legally binding.
              </p>

              <h3 className="mt-4 font-medium text-foreground">19.8 Notices</h3>
              <p className="mt-2">
                Notices to Hawiyat under these Terms must be sent to{" "}
                <a href="mailto:legal@hawiyat.org" className="text-foreground underline underline-offset-4 hover:no-underline transition-all">
                  legal@hawiyat.org
                </a>{" "}
                and{" "}
                <a href="mailto:support@hawiyat.org" className="text-foreground underline underline-offset-4 hover:no-underline transition-all">
                  support@hawiyat.org
                </a>
                . Notices to you will be sent to the email address on your Account.
              </p>

              <h3 className="mt-4 font-medium text-foreground">19.9 Export Controls</h3>
              <p className="mt-2">
                You must comply with all applicable trade laws, including sanctions regimes and export control laws.
                The Service may not be used in, for the benefit of, or exported or re-exported to any country or
                territory subject to international sanctions, or to any individual or entity with whom dealings are
                prohibited under applicable trade laws.
              </p>
            </section>

            <section id="contact" className="scroll-mt-24">
              <h2 className="text-lg font-medium text-foreground">20. Contact Information</h2>
              <p className="mt-3">For questions about these Terms, contact:</p>
              <ul className="mt-3 space-y-1">
                <li>
                  <span className="text-foreground">General Inquiries:</span>{" "}
                  <a href="mailto:support@hawiyat.org" className="text-foreground underline underline-offset-4 hover:no-underline transition-all">
                    support@hawiyat.org
                  </a>
                </li>
                <li>
                  <span className="text-foreground">Legal:</span>{" "}
                  <a href="mailto:legal@hawiyat.org" className="text-foreground underline underline-offset-4 hover:no-underline transition-all">
                    legal@hawiyat.org
                  </a>
                </li>
                <li>
                  <span className="text-foreground">Security:</span>{" "}
                  <a href="mailto:security@hawiyat.org" className="text-foreground underline underline-offset-4 hover:no-underline transition-all">
                    security@hawiyat.org
                  </a>
                </li>
                <li>
                  <span className="text-foreground">Billing:</span>{" "}
                  <a href="mailto:billing@hawiyat.org" className="text-foreground underline underline-offset-4 hover:no-underline transition-all">
                    billing@hawiyat.org
                  </a>
                </li>
              </ul>
              <p className="mt-3">
                <span className="text-foreground">Hawiyat</span>, Algeria
                <br />
                Website:{" "}
                <a href="https://hawiyat.org" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 hover:no-underline transition-all">
                  https://hawiyat.org
                </a>
              </p>

              {/* Footer */}
              <div className="mt-8 rounded-xl border border-border/60 bg-surface-dim/30 p-6">
                <p className="text-sm font-medium text-foreground">HAWIYAT Terms of Use v1.2</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Effective Date: August 2026 &middot; Last Updated: August 6, 2026
                </p>
                <p className="mt-3 text-xs text-muted-foreground">&copy; 2026 Hawiyat. All rights reserved.</p>
              </div>
            </section>
        </div>
      </div>
    </div>
  )
}
