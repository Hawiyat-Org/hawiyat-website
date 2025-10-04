"use client"

import { useState, useEffect } from "react"
import type { ReactNode } from "react";
const sections = [
  { id: "overview", title: "Overview", icon: "bi-c-circle" },
  { id: "notice", title: "How to File a Notice", icon: "bi-exclamation-diamond" },
  { id: "required", title: "Required Elements", icon: "bi-list-check" },
  { id: "processing", title: "How We Process Notices", icon: "bi-gear" },
  { id: "counter", title: "Counter-Notice", icon: "bi-arrow-counterclockwise" },
  { id: "repeat", title: "Repeat Infringers", icon: "bi-shield-lock" },
  { id: "contact", title: "Contact & Agent", icon: "bi-envelope" },
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

const Block = ({children} : { children: ReactNode }) => (
  <div className="border border-gray-200 dark:border-gray-800 rounded-xl lg:rounded-2xl p-5 sm:p-6 lg:p-7 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
    {children}
  </div>
)

const CopyrightPolicyPage = () => {
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
                <i className="bi bi-c-circle text-xl xl:text-2xl text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg xl:text-xl text-gray-900 dark:text-white">Copyright</h3>
                <p className="text-xs xl:text-sm text-gray-500 dark:text-gray-400">Copyright & Takedown Policy</p>
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
              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl bg-purple-100 dark:bg-purple-900/30">
                  <i className="bi bi-c-circle text-2xl sm:text-3xl lg:text-4xl text-purple-600 dark:text-purple-400" />
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Copyright & Takedown Policy
                </h1>

                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
                  We respect copyright and other intellectual property rights. This page explains how to submit
                  claims and how we handle them.
                </p>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm lg:text-base text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <i className="bi bi-calendar3 text-sm sm:text-base" />
                    <span>Effective: Oct 4, 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 bg-white dark:bg-black w-full">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 lg:py-16 xl:py-20 space-y-12 sm:space-y-16 lg:space-y-20 xl:space-y-24">

              {/* Overview */}
              <section id="overview" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader icon="bi-c-circle" iconColor="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" title="1. Overview" />

                <Block>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    Hawiyat respects the intellectual property rights of others and expects our users to do the same.
                    This policy describes how Hawiyat responds to claims of copyright infringement and counter-notices.
                    Note: the U.S. Digital Millennium Copyright Act (DMCA) informs the structure of this policy, but it is
                    not a substitute for local legal requirements. Rights-holders in Algeria and other jurisdictions may
                    rely on their local law as well.
                  </p>
                </Block>
              </section>

              {/* How to File */}
              <section id="notice" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader icon="bi-exclamation-diamond" iconColor="bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400" title="2. How to File a Copyright Notice" />

                <Block>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    To report alleged infringement, send a written notice to our designated copyright agent. Include the
                    required elements listed in the next section. Notices should be sent to:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>
                      Email: <a href="mailto:copyright@hawiyat.org" className="underline">copyright@hawiyat.org</a>
                    </li>
                    <li>Mail: Legal Dept — Hawiyat, [street address], Algeria</li>
                    <li>Subject line: "Copyright Notice"</li>
                  </ul>
                </Block>
              </section>

              {/* Required Elements */}
              <section id="required" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader icon="bi-list-check" iconColor="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400" title="3. Required Elements of a Notice" />

                <Block>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    A valid notice should include the following elements (provide as much information as possible):
                  </p>
                  <ol className="mt-3 list-decimal pl-5 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>Your full name and contact information (email, postal address, telephone number).</li>
                    <li>A statement that you are the copyright owner or authorized to act on behalf of the owner.</li>
                    <li
                      >Identification of the copyrighted work claimed to be infringed (or a representative example) and the
                      URL or location of the allegedly infringing material on our Service.</li>
                    <li>A statement that you have a good-faith belief the use is unauthorized.</li>
                    <li>A statement under penalty of perjury that the information in the notice is accurate.
                    </li>
                    <li>Your electronic or physical signature (typed name is acceptable for email notices).</li>
                  </ol>
                </Block>
              </section>

              {/* Processing */}
              <section id="processing" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader icon="bi-gear" iconColor="bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400" title="4. How We Process Notices" />

                <Block>
                  <ul className="space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>We will acknowledge receipt of your notice by email where contact details are provided.</li>
                    <li>Where appropriate we will remove or disable access to the allegedly infringing material pending
                      investigation.</li>
                    <li>We will notify the account holder whose content was removed and provide information about how to
                      submit a counter-notice.</li>
                    <li>We may preserve relevant logs and cooperate with law enforcement or rights-holders when required by law.</li>
                  </ul>
                </Block>
              </section>

              {/* Counter-notice */}
              <section id="counter" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader icon="bi-arrow-counterclockwise" iconColor="bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400" title="5. Counter-Notice" />

                <Block>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    If your content was removed and you believe it was a mistake, you may submit a counter-notice. A valid
                    counter-notice should include:
                  </p>
                  <ol className="mt-3 list-decimal pl-5 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>Your name, contact information, and identification of the removed material and its location prior to removal.</li>
                    <li>A statement under penalty of perjury that you have a good-faith belief the material was removed by mistake or misidentification.</li>
                    <li>Your consent to jurisdiction of the applicable forum and contact info for receiving notices.</li>
                    <li>Your physical or electronic signature.</li>
                  </ol>
                  <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    After receiving a valid counter-notice we will generally restore the content unless the rights-holder
                    files a court action seeking to restrain the allegedly infringing activity.
                  </p>
                </Block>
              </section>

              {/* Repeat infringers */}
              <section id="repeat" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader icon="bi-shield-lock" iconColor="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400" title="6. Repeat Infringers" />

                <Block>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    We terminate accounts of users who are repeat infringers in appropriate circumstances. "Repeat infringer"
                    is a user who has received multiple valid infringement notices or who otherwise repeatedly violates our
                    policies.
                  </p>
                </Block>
              </section>

              {/* Contact */}
              <section id="contact" className="section space-y-6 lg:space-y-8 scroll-mt-32 lg:scroll-mt-24">
                <SectionHeader icon="bi-envelope" iconColor="bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400" title="7. Contact & Agent" />

                <Block>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    Designated agent for copyright notices and counter-notices:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <li>Email: <a href="mailto:copyright@hawiyat.org" className="underline">copyright@hawiyat.org</a></li>
                    <li>Legal: <a href="mailto:legal@hawiyat.org" className="underline">legal@hawiyat.org</a></li>
                    <li>Mail: Legal Dept — Hawiyat, [street address], Algeria</li>
                    <li>Phone: [+213] XXX XXX XXX (replace with your number)</li>
                  </ul>

                  <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    Note: This policy is a procedural tool to help rights-holders and users resolve copyright issues on our
                    platform. It does not replace remedies under local law. If you are unsure about your rights, consult
                    local counsel.
                  </p>
                </Block>
              </section>

              <footer className="border-t w-full border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 lg:py-20 xl:py-24 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl lg:rounded-2xl bg-gradient-to-br from-purple-100 to-cyan-100 dark:from-purple-900/30 dark:to-cyan-900/30 border border-purple-200 dark:border-purple-800/30 mb-6 sm:mb-8">
                    <i className="bi bi-rocket-takeoff text-2xl sm:text-3xl lg:text-4xl text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">Need help?</h3>
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed">If you need assistance filing a notice or have legal questions contact our Legal team at <a href="mailto:legal@hawiyat.org" className="underline">legal@hawiyat.org</a>.</p>
                </div>
              </footer>

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CopyrightPolicyPage
