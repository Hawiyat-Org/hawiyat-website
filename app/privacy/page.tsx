"use client"

import { useState, useEffect } from "react"

const sections = [
  { id: "introduction", title: "Introduction", icon: "bi-shield-check" },
  { id: "data-collection", title: "Information We Collect", icon: "bi-database" },
  { id: "data-usage", title: "How We Use Your Data", icon: "bi-gear" },
  { id: "data-sharing", title: "How We Share Your Data", icon: "bi-share" },
  { id: "security", title: "Data Security", icon: "bi-lock" },
  { id: "your-rights", title: "Your Rights & Choices", icon: "bi-person-check" },
  { id: "data-retention", title: "Data Retention", icon: "bi-clock-history" },
  { id: "contact", title: "Contact Us", icon: "bi-envelope" },
]


const NavLink = ({ section, isActive }: { section: typeof sections[0]; isActive: boolean }) => (  <a
    href={`#${section.id}`}
    className={`flex items-center rounded-xl gap-3 px-4 py-3 text-sm xl:text-base transition-all duration-200 ${
      isActive
        ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium shadow-sm"
        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900/50"
    }`}
  >
    <i className={`${section.icon} text-lg xl:text-xl flex-shrink-0`} />
    <span className="leading-tight">{section.title}</span>
  </a>
)

const InfoCard = ({ icon, iconColor, title, children }: { 
  icon: string; 
  iconColor: string; 
  title: string; 
  children: React.ReactNode;
}) => (
  <div className="info-card border border-gray-200 dark:border-gray-800 rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black h-full">
    <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${iconColor} flex items-center justify-center mb-3 sm:mb-4`}>
      <i className={`${icon} text-xl sm:text-2xl`} />
    </div>
    <h4 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white mb-2 sm:mb-3 leading-tight">
      {title}
    </h4>
    {children}
  </div>
)

const SectionHeader = ({ icon, iconColor, title }: { 
  icon: string; 
  iconColor: string; 
  title: string;
}) => (  <div className="flex items-center gap-3 sm:gap-4">
    <div
      className={`w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl ${iconColor} flex items-center justify-center flex-shrink-0`}
    >
      <i className={`${icon} text-xl sm:text-2xl lg:text-3xl`} />
    </div>
    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
      {title}
    </h2>
  </div>
)

const PrivacyPolicyPage = () => {
  const [activeSection, setActiveSection] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3, rootMargin: "-100px 0px -50% 0px" },
    )

    document.querySelectorAll(".section").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  return (
    <div className="flex w-full min-h-screen bg-white dark:bg-black">
      <style jsx global>{`
        .scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .scrollbar::-webkit-scrollbar-track { border-radius: 25px; background: transparent; }
        .scrollbar::-webkit-scrollbar-thumb { background: #d7d7d7; border-radius: 25px; }
        .dark .scrollbar::-webkit-scrollbar-thumb { background: #4a4a4a; }
        .info-card { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .info-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12); }
        .dark .info-card:hover { box-shadow: 0 8px 24px rgba(255, 255, 255, 0.08); }
        
        @media (max-width: 1023px) {
          .info-card:active { transform: scale(0.98); }
        }
        
        /* Better mobile tap highlights */
        * {
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0.05);
        }
        
        /* Smooth scrolling for mobile */
        html {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
      `}</style>

      <aside className="hidden lg:flex lg:flex-col w-64 xl:w-72 2xl:w-80 fixed left-0 top-0 h-screen border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black z-40">
        <div className="flex flex-col h-full p-4 xl:p-6">
          <div className="mb-6 xl:mb-8 h-16 xl:h-20 flex items-center flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <i className="bi bi-shield-check text-xl xl:text-2xl text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg xl:text-xl text-gray-900 dark:text-white">Privacy</h3>
                <p className="text-xs xl:text-sm text-gray-500 dark:text-gray-400">Policy</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto scrollbar pr-2">
            <div className="flex flex-col gap-1.5 xl:gap-2">
              {sections.map((section) => (
                <NavLink key={section.id} section={section} isActive={activeSection === section.id} />
              ))}
            </div>
          </nav>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
            <a
              href="https://app.hawiyat.org/"
              className="flex items-center justify-center w-full px-4 py-3 xl:py-3.5 text-sm xl:text-base font-medium text-white bg-black dark:bg-white dark:text-black rounded-xl hover:opacity-90 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <i className="bi bi-arrow-left mr-2" />
              Back to App
            </a>
          </div>
        </div>
      </aside>

      <main className="flex-1 lg:ml-64 xl:ml-72 2xl:ml-80 w-full">
        <div className="flex flex-col max-w-7xl mx-auto justify-start items-start min-h-screen">
          <header className="border-b w-full border-gray-200 dark:border-gray-800 bg-white dark:bg-black  top-0 z-30 lg:static backdrop-blur-lg lg:backdrop-blur-none bg-white/95 dark:bg-black/95 lg:bg-white lg:dark:bg-black">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8 lg:py-12 xl:py-16">
          

              <a
                href="https://app.hawiyat.org/"
                className="hidden lg:inline-flex items-center gap-2 text-sm xl:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors mb-8 xl:mb-10 group"
              >
                <i className="bi bi-arrow-left transition-transform group-hover:-translate-x-1" />
                <span>Back to Home</span>
              </a>

              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl lg:rounded-3xl bg-purple-100 dark:bg-purple-900/30">
                  <i className="bi bi-shield-check text-2xl sm:text-3xl lg:text-4xl text-purple-600 dark:text-purple-400" />
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight text-balance">
                  Privacy Policy
                </h1>

                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
                  We are committed to protecting your privacy and personal information. This policy explains how we
                  collect, use, and safeguard your data.
                </p>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm lg:text-base text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <i className="bi bi-calendar3 text-sm sm:text-base" />
                    <span>Effective: Oct 4, 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="bi bi-pencil text-sm sm:text-base" />
                    <span>Updated: Oct 4, 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

         

          <div className="flex-1 bg-white dark:bg-black w-full">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 lg:py-16 xl:py-20 space-y-12 sm:space-y-16 lg:space-y-20 xl:space-y-24">
              {/* Introduction */}
              <section id="introduction" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader
                  icon="bi-shield-check"
                  iconColor="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                  title="1. Introduction"
                />

                <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/10 border border-purple-200 dark:border-purple-800/30 rounded-xl lg:rounded-2xl p-5 sm:p-6 lg:p-8">
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    Hawiyat ("we", "our", or "us") operates https://hawiyat.org and provides virtual private servers (VPS)
                    configured with our Platform-as-a-Service (PaaS). This Privacy Policy explains how we collect, use,
                    disclose, and protect personal information in connection with our services, and your rights in
                    relation to that information. By using our website or services you accept the terms of this Privacy
                    Policy.
                  </p>
                </div>
              </section>

              {/* Data Collection */}
              <section id="data-collection" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader
                  icon="bi-database"
                  iconColor="bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400"
                  title="2. Information We Collect"
                />

                <div className="space-y-8 lg:space-y-10">
                  <div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-white">
                      2.1 Categories of Data
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                      <InfoCard
                        icon="bi bi-person"
                        iconColor="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                        title="Account & Identity"
                      >
                        <ul className="text-sm sm:text-base text-gray-600 dark:text-gray-400 space-y-2 leading-relaxed">
                          <li>• Name, company name, username</li>
                          <li>• Email address and phone number</li>
                          <li>• Registration and authentication data</li>
                        </ul>
                      </InfoCard>

                      <InfoCard
                        icon="bi bi-activity"
                        iconColor="bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400"
                        title="Service & Usage Data"
                      >
                        <ul className="text-sm sm:text-base text-gray-600 dark:text-gray-400 space-y-2 leading-relaxed">
                          <li>• VPS configuration, deployment metadata</li>
                          <li>• API calls, logs, telemetry and usage metrics</li>
                          <li>• Support ticket content and diagnostic information</li>
                        </ul>
                      </InfoCard>

                      <InfoCard
                        icon="bi bi-cpu"
                        iconColor="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                        title="Payment & Technical"
                      >
                        <ul className="text-sm sm:text-base text-gray-600 dark:text-gray-400 space-y-2 leading-relaxed">
                          <li>• Billing details (invoices recorded in DZD)</li>
                          <li>• Transaction and payment processor references</li>
                          <li>• IP address, device/browser information</li>
                        </ul>
                      </InfoCard>
                    </div>

                    <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      We do not knowingly collect special categories of personal data (sensitive data). If you provide
                      such data inadvertently, contact us and we will delete it where required by law.
                    </p>
                  </div>
                </div>
              </section>

              {/* Data Usage */}
              <section id="data-usage" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader
                  icon="bi-gear"
                  iconColor="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                  title="3. How We Use Your Data"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                  <InfoCard
                    icon="bi bi-server"
                    iconColor="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                    title="Provide & Operate Services"
                  >
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      We use your data to provision VPSs, manage your account, deploy your PaaS configurations, and
                      maintain platform availability and performance.
                    </p>
                  </InfoCard>

                  <InfoCard
                    icon="bi bi-person-badge"
                    iconColor="bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400"
                    title="Billing & Account Management"
                  >
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      Process payments billed in Algerian Dinar (DZD), generate invoices, prevent fraud, and enforce our
                      Terms.
                    </p>
                  </InfoCard>

                  <InfoCard
                    icon="bi bi-graph-up"
                    iconColor="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                    title="Analytics & Improvement"
                  >
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      Analyze usage to improve our products and services, detect abuse, and run diagnostics. Where
                      required, analytics may be aggregated and pseudonymized.
                    </p>
                  </InfoCard>

                  <InfoCard
                    icon="bi bi-megaphone"
                    iconColor="bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                    title="Communications & Marketing"
                  >
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      Send account notices, security alerts, and — with your consent where required — promotional
                      communications. You may opt out of marketing messages.
                    </p>
                  </InfoCard>
                </div>

                <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  Legal bases for processing include performance of contract, compliance with legal obligations,
                  legitimate interests (for security, analytics and fraud prevention), and consent where required.
                </p>
              </section>

              {/* Data Sharing */}
              <section id="data-sharing" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader
                  icon="bi-share"
                  iconColor="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  title="4. How We Share Your Data"
                />

                <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  We will not sell your personal information. We may share data with trusted third parties only to the
                  extent necessary to operate the Service or comply with law.
                </p>

                <div className="space-y-4 sm:space-y-5">
                  <div className="border border-gray-200 dark:border-gray-800 rounded-xl lg:rounded-2xl p-5 sm:p-6 lg:p-7 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black transition-all hover:shadow-lg">
                    <h4 className="font-semibold text-base sm:text-lg lg:text-xl text-gray-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
                      <i className="bi bi-people text-xl sm:text-2xl text-purple-600 dark:text-purple-400" />
                      Service Providers & Processors
                    </h4>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                      Payment processors, hosting and data center operators, monitoring and security providers, and
                      professional advisors under written agreements that require them to protect your data.
                    </p>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-800 rounded-xl lg:rounded-2xl p-5 sm:p-6 lg:p-7 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black transition-all hover:shadow-lg">
                    <h4 className="font-semibold text-base sm:text-lg lg:text-xl text-gray-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
                      <i className="bi bi-bank text-xl sm:text-2xl text-green-600 dark:text-green-400" />
                      Legal & Safety
                    </h4>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                      When required by law, to respond to lawful requests from public authorities, to prevent fraud, or
                      to protect the rights, property or safety of Hawiyat, our customers, or others.
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  Cross-border transfers: where data is transferred outside Algeria we will apply appropriate
                  safeguards, and we will inform you where the transfer requires notice or consent under applicable
                  law.
                </p>
              </section>

              {/* Security */}
              <section id="security" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader
                  icon="bi-lock"
                  iconColor="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                  title="5. Data Security"
                />

                <div className="bg-gradient-to-r from-red-50 to-red-100/50 dark:from-red-950/20 dark:to-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl lg:rounded-2xl p-5 sm:p-6 lg:p-8">
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-red-900 dark:text-red-200 font-medium mb-4 sm:mb-6">
                    We implement reasonable technical and organizational measures to protect personal data against
                    accidental or unlawful destruction, loss, alteration, unauthorized disclosure or access.
                  </p>
                  <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg text-red-800 dark:text-red-300">
                    <li className="flex items-start gap-3">
                      <i className="bi bi-lock-fill text-red-600 dark:text-red-400 mt-1 flex-shrink-0 text-lg" />
                      <span className="leading-relaxed">Encryption in transit (TLS) and at rest where applicable</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <i className="bi bi-lock-fill text-red-600 dark:text-red-400 mt-1 flex-shrink-0 text-lg" />
                      <span className="leading-relaxed">Access controls, role-based permissions and logging</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <i className="bi bi-lock-fill text-red-600 dark:text-red-400 mt-1 flex-shrink-0 text-lg" />
                      <span className="leading-relaxed">Periodic security assessments and incident response planning</span>
                    </li>
                  </ul>

                  <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    If you suspect a data breach affecting your account, notify us immediately at privacy@hawiyat.org. We
                    will investigate and notify affected persons and authorities as required by law.
                  </p>
                </div>
              </section>

              {/* Your Rights */}
              <section id="your-rights" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader
                  icon="bi-person-check"
                  iconColor="bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                  title="6. Your Rights & Choices"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                  <InfoCard
                    icon="bi bi-eye"
                    iconColor="bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                    title="Access"
                  >
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      You may request a copy of personal data we hold about you.
                    </p>
                  </InfoCard>

                  <InfoCard
                    icon="bi bi-pencil-square"
                    iconColor="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                    title="Correction"
                  >
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      Request corrections to inaccurate or incomplete information.
                    </p>
                  </InfoCard>

                  <InfoCard
                    icon="bi bi-trash"
                    iconColor="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                    title="Deletion"
                  >
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      Request deletion of your personal data where permitted by law and subject to our legal
                      obligations (e.g., tax/accounting retention requirements).
                    </p>
                  </InfoCard>
                </div>

                <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  To exercise rights, contact us at privacy@hawiyat.org. We may require identity verification before
                  responding. If you are in Algeria you may also contact the national supervisory authority for data
                  protection.
                </p>
              </section>

              {/* Data Retention */}
              <section id="data-retention" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader
                  icon="bi-clock-history"
                  iconColor="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                  title="7. Data Retention"
                />

                <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  We retain personal data only as long as necessary to provide services, comply with legal obligations
                  (including accounting and tax laws), resolve disputes and enforce our agreements. Typical retention
                  periods include: account and billing records — up to 7 years where required for tax purposes; support
                  logs and diagnostic data — up to 2 years; backup copies — limited and deleted as soon as feasible.
                </p>

                <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  Specific retention periods may vary by jurisdiction and legal requirement; contact privacy@hawiyat.org
                  for details about a particular category of data.
                </p>
              </section>

              {/* Contact */}
              <section id="contact" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader
                  icon="bi-envelope"
                  iconColor="bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400"
                  title="8. Contact Us"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                  <InfoCard
                    icon="bi bi-envelope-fill"
                    iconColor="bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400"
                    title="Privacy Email"
                  >
                    <a
                      href="mailto:privacy@hawiyat.org"
                      className="text-sm sm:text-base text-cyan-600 dark:text-cyan-400 hover:underline break-all leading-relaxed"
                    >
                      privacy@hawiyat.org
                    </a>
                  </InfoCard>

                  <InfoCard
                    icon="bi bi-headset"
                    iconColor="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                    title="Support"
                  >
                    <a
                      href="mailto:support@hawiyat.org"
                      className="text-sm sm:text-base text-purple-600 dark:text-purple-400 hover:underline break-all leading-relaxed"
                    >
                      support@hawiyat.org
                    </a>
                  </InfoCard>

                  <InfoCard
                    icon="bi bi-globe"
                    iconColor="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                    title="Website"
                  >
                    <a
                      href="https://hawiyat.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-green-600 dark:text-green-400 hover:underline break-all leading-relaxed"
                    >
                      hawiyat.org
                    </a>
                  </InfoCard>
                </div>

                <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  For legal notices or data protection enquiries send mail to: Legal Dept — Hawiyat, [street address],
                  Algeria. Replace the placeholder with your registered address before publishing.
                </p>
              </section>
            </div>
          </div>

          <footer className="border-t w-full border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 lg:py-20 xl:py-24 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl lg:rounded-2xl bg-gradient-to-br from-purple-100 to-cyan-100 dark:from-purple-900/30 dark:to-cyan-900/30 border border-purple-200 dark:border-purple-800/30 mb-6 sm:mb-8">
                <i className="bi bi-rocket-takeoff text-2xl sm:text-3xl lg:text-4xl text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white text-balance">
                Ready to Deploy?
              </h3>
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed text-pretty">
                Review our Terms of Service and start building with Hawiyat's platform.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 lg:gap-5 max-w-md mx-auto">
                <a
                  href="/terms"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 lg:px-8 lg:py-4 border-2 border-gray-300 dark:border-gray-700 rounded-xl lg:rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-all font-medium text-sm sm:text-base lg:text-lg text-gray-900 dark:text-white active:scale-98 shadow-sm hover:shadow-md"
                >
                  <i className="bi bi-file-text text-lg" />
                  <span>Terms of Service</span>
                </a>
                <a
                  href="https://app.hawiyat.org/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 lg:px-8 lg:py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl lg:rounded-2xl transition-all font-medium text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl active:scale-98"
                >
                  <span>Get Started</span>
                  <i className="bi bi-arrow-right text-lg" />
                </a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}

export default PrivacyPolicyPage
