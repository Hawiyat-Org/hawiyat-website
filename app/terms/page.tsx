"use client"

import { useState, useEffect } from "react"
import type { ReactNode } from "react";
const sections = [
  { id: "introduction", title: "Introduction", icon: "bi-journal-bookmark" },
  { id: "acceptance", title: "Acceptance of Terms", icon: "bi-check2-circle" },
  { id: "services", title: "Services", icon: "bi-cloud" },
  { id: "orders", title: "Orders & Billing", icon: "bi-receipt" },
  { id: "use-restrictions", title: "Acceptable Use", icon: "bi-slash-circle" },
  { id: "customer-content", title: "Customer Content", icon: "bi-folder-symlink" },
  { id: "intellectual-property", title: "Intellectual Property", icon: "bi-award" },
  { id: "liability", title: "Liability & Warranties", icon: "bi-exclamation-triangle" },
  { id: "termination", title: "Termination", icon: "bi-power" },
  { id: "governing-law", title: "Governing Law", icon: "bi-geo-alt" },
  { id: "contact", title: "Contact", icon: "bi-envelope" },
]

const NavLink = ({ section, isActive }: { section: typeof sections[0]; isActive: boolean }) => (
      <a
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

const SectionHeader = ({ icon, iconColor, title }: { 
    icon: string; 
    iconColor: string; 
    title: string;
  }) => (
  <div className="flex items-center gap-3 sm:gap-4">
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

const InfoBlock = ({ children }: { children: ReactNode }) => (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl lg:rounded-2xl p-5 sm:p-6 lg:p-7 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      {children}
    </div>
  );

const TermsOfUsePage = () => {
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
      `}</style>

      <aside className="hidden lg:flex lg:flex-col w-64 xl:w-72 2xl:w-80 fixed left-0 top-0 h-screen border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black z-40">
        <div className="flex flex-col h-full p-4 xl:p-6">
          <div className="mb-6 xl:mb-8 h-16 xl:h-20 flex items-center flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <i className="bi bi-journal-bookmark text-xl xl:text-2xl text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg xl:text-xl text-gray-900 dark:text-white">Terms</h3>
                <p className="text-xs xl:text-sm text-gray-500 dark:text-gray-400">Terms of Use</p>
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
          <header className="border-b w-full border-gray-200 dark:border-gray-800 bg-white dark:bg-black  top-0 z-30 backdrop-blur-lg bg-white/95 dark:bg-black/95">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8 lg:py-12 xl:py-16">
              <div className="flex items-center justify-between lg:hidden mb-6">
                <a href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  <i className="bi bi-arrow-left text-base" />
                  <span>Back</span>
                </a>

                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 rounded-xl"
                >
                  <i className={`bi ${isMobileMenuOpen ? "bi-x-lg" : "bi-list"} text-lg`} />
                  <span>Menu</span>
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl bg-purple-100 dark:bg-purple-900/30">
                  <i className="bi bi-journal-bookmark text-2xl sm:text-3xl lg:text-4xl text-purple-600 dark:text-purple-400" />
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Terms of Use
                </h1>

                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
                  These Terms of Use govern your access to and use of Hawiyat services. Please read them carefully.
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

          {isMobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="absolute inset-x-0 top-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-2xl max-h-[80vh] overflow-y-auto scrollbar" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between  top-0 bg-white dark:bg-black z-10">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">Sections</h3>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                    <i className="bi bi-x-lg text-xl" />
                  </button>
                </div>

                <nav className="p-4 space-y-2">
                  {sections.map((section) => (
                    <a key={section.id} href={`#${section.id}`} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center rounded-xl gap-3 px-4 py-4 text-base ${activeSection === section.id ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900/50'}`}>
                      <i className={`${section.icon} text-xl flex-shrink-0`} />
                      <span className="leading-tight">{section.title}</span>
                    </a>
                  ))}
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-gray-800  bottom-0 bg-white dark:bg-black">
                  <a href="https://app.hawiyat.org/" className="flex items-center justify-center w-full px-4 py-4 text-base font-medium text-white bg-black dark:bg-white dark:text-black rounded-xl shadow-lg">
                    <i className="bi bi-arrow-left mr-2" />
                    Back to App
                  </a>
                </div>
              </div>
            </div>
          )}

          <nav className="lg:hidden  top-[180px] sm:top-[200px] z-20 backdrop-blur-lg bg-white/95 dark:bg-black/95 border-b border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="px-4 py-3 overflow-x-auto scrollbar">
              <div className="flex gap-2 min-w-max pb-1">
                {sections.map((section) => (
                  <a key={section.id} href={`#${section.id}`} className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap ${activeSection === section.id ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 shadow-sm' : 'bg-gray-100 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'}`}>
                    {section.title}
                  </a>
                ))}
              </div>
            </div>
          </nav>

          <div className="flex-1 bg-white dark:bg-black w-full">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 lg:py-16 xl:py-20 space-y-12 sm:space-y-16 lg:space-y-20 xl:space-y-24">

              {/* Introduction */}
              <section id="introduction" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader icon="bi-journal-bookmark" iconColor="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" title="1. Introduction" />

                <InfoBlock>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    These Terms of Use ("Terms") govern your use of Hawiyat's website, services and software (collectively,
                    the "Service"). Please read carefully. By using the Service or creating an account you agree to these
                    Terms. If you do not agree, do not use the Service.
                  </p>
                </InfoBlock>
              </section>

              {/* Acceptance */}
              <section id="acceptance" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader icon="bi-check2-circle" iconColor="bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400" title="2. Acceptance of Terms" />

                <InfoBlock>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    By accessing or using the Service you accept and agree to be bound by these Terms and our Privacy Policy.
                    You also represent you have authority to accept these Terms on behalf of any organization you represent.
                  </p>
                </InfoBlock>
              </section>

              {/* Services */}
              <section id="services" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader icon="bi-cloud" iconColor="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" title="3. Services" />

                <InfoBlock>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    Hawiyat provides virtual private servers (VPS) configured with our PaaS, management dashboard, APIs, and
                    related services. Service descriptions, limits, and features are published on our website and may be
                    updated from time to time.
                  </p>
                </InfoBlock>
              </section>

              {/* Orders & Billing */}
              <section id="orders" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader icon="bi-receipt" iconColor="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400" title="4. Orders & Billing" />

                <InfoBlock>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    All prices are displayed and charged in Algerian Dinar (DZD) unless otherwise specified. By placing an order
                    you authorize us to charge your chosen payment method. Billing cycles, renewal, cancellation and refund
                    policies are set out during checkout and in your order confirmation.
                  </p>
                </InfoBlock>
              </section>

              {/* Acceptable Use */}
              <section id="use-restrictions" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader icon="bi-slash-circle" iconColor="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" title="5. Acceptable Use" />

                <InfoBlock>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    You agree not to use the Service to:
                  </p>
                  <ul className="mt-3 list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>Violate laws, regulations, or third-party rights (including intellectual property).</li>
                    <li>Host or distribute malware, illegal material, or facilitate unlawful activities.</li>
                    <li>Send spam, conduct denial-of-service attacks, or abuse network resources.</li>
                    <li>Attempt unauthorized access to other systems or data.</li>
                  </ul>

                  <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Hawiyat may suspend or terminate accounts that engage in prohibited activity. We will attempt to notify
                    account holders where practicable unless immediate action is required to mitigate harm.
                  </p>
                </InfoBlock>
              </section>

              {/* Customer Content */}
              <section id="customer-content" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader icon="bi-folder-symlink" iconColor="bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400" title="6. Customer Content" />

                <InfoBlock>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    "Customer Content" means any content you upload, store or transmit using the Service. You retain all rights
                    in your Customer Content. You grant Hawiyat a limited license to host, transmit, and provide the Service.
                  </p>

                  <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    You are responsible for backing up Customer Content and ensuring you have necessary rights and consents.
                    Hawiyat is not responsible for loss of Customer Content except where caused by our gross negligence.
                  </p>
                </InfoBlock>
              </section>

              {/* IP */}
              <section id="intellectual-property" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader icon="bi-award" iconColor="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" title="7. Intellectual Property" />

                <InfoBlock>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    All intellectual property rights in the Service (software, website, trademarks) belong to Hawiyat or its
                    licensors. You are granted a non-exclusive, non-transferable license to use the Service in accordance
                    with these Terms.
                  </p>
                </InfoBlock>
              </section>

              {/* Liability & Warranties */}
              <section id="liability" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader icon="bi-exclamation-triangle" iconColor="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400" title="8. Liability & Warranties" />

                <InfoBlock>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    The Service is provided "AS IS" and "AS AVAILABLE". Hawiyat disclaims all warranties to the fullest extent
                    permitted by law. We do not warrant uninterrupted service or that the Service will meet all your
                    requirements.
                  </p>

                  <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    To the maximum extent permitted by applicable law, Hawiyat's total liability arising out of or related to
                    these Terms shall not exceed the amounts you paid to Hawiyat in the 12 months preceding the claim. We
                    are not liable for indirect, special, incidental or consequential damages.
                  </p>
                </InfoBlock>
              </section>

              {/* Termination */}
              <section id="termination" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader icon="bi-power" iconColor="bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400" title="9. Termination" />

                <InfoBlock>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    Either party may terminate the service in accordance with account settings and billing terms. Hawiyat may
                    suspend or terminate accounts for violation of these Terms, non-payment, or legal reasons. Upon termination
                    you are responsible for exporting your data. We may delete account data after the retention period described
                    in our Privacy Policy.
                  </p>
                </InfoBlock>
              </section>

              {/* Governing Law */}
              <section id="governing-law" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader icon="bi-geo-alt" iconColor="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400" title="10. Governing Law & Disputes" />

                <InfoBlock>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    These Terms are governed by the laws of the People's Democratic Republic of Algeria. You and Hawiyat agree
                    to attempt to resolve disputes amicably before pursuing litigation in Algerian courts, unless otherwise
                    agreed in writing.
                  </p>
                </InfoBlock>
              </section>

              {/* Contact */}
              <section id="contact" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader icon="bi-envelope" iconColor="bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400" title="11. Contact" />

                <InfoBlock>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    For questions regarding these Terms or to provide legal notices contact us at:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>Email: legal@hawiyat.org</li>
                    <li>Billing: billing@hawiyat.org</li>
                    <li>Privacy: privacy@hawiyat.org</li>
                    <li>Address: Legal Dept — Hawiyat, [street address], Algeria (replace with your registered address)</li>
                  </ul>
                </InfoBlock>

                <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  Replace placeholders with your company details before publishing. Consider translating these Terms into
                  Arabic and French for local enforceability and clarity.
                </p>
              </section>

              <footer className="border-t w-full border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 lg:py-20 xl:py-24 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl lg:rounded-2xl bg-gradient-to-br from-purple-100 to-cyan-100 dark:from-purple-900/30 dark:to-cyan-900/30 border border-purple-200 dark:border-purple-800/30 mb-6 sm:mb-8">
                    <i className="bi bi-rocket-takeoff text-2xl sm:text-3xl lg:text-4xl text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">Ready to Deploy?</h3>
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed">Review our Privacy Policy and start building with Hawiyat's platform.</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 lg:gap-5 max-w-md mx-auto">
                    <a href="/privacy" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 lg:px-8 lg:py-4 border-2 border-gray-300 dark:border-gray-700 rounded-xl lg:rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-all font-medium text-sm sm:text-base lg:text-lg text-gray-900 dark:text-white active:scale-98 shadow-sm hover:shadow-md">
                      <i className="bi bi-shield-check text-lg" />
                      <span>Privacy Policy</span>
                    </a>
                    <a href="https://app.hawiyat.org/" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 lg:px-8 lg:py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl active:scale-98">
                      <span>Get Started</span>
                      <i className="bi bi-arrow-right text-lg" />
                    </a>
                  </div>
                </div>
              </footer>

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TermsOfUsePage
