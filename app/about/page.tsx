"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, MessageCircle, Package } from "lucide-react"

export default function AboutPage() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ─── Hero + Gallery ─── */}
      <section className="relative flex min-h-[85vh] w-full flex-col place-content-center overflow-hidden mt-[70px] md:mt-[100px]">
        <div className="mx-auto w-full max-w-6xl px-6 flex max-lg:flex-col items-center justify-center gap-8 max-lg:gap-6 min-h-[85vh] py-10">
          {/* Left  Text */}
          <div className="flex flex-col gap-5 flex-1 max-w-lg">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-foreground/60 text-sm w-fit">
              Built in Algeria 🇩🇿
            </div>
            <h1 className="text-5xl max-lg:text-3xl max-md:text-2xl font-medium uppercase">
              About <span className="font-light">Us</span>
            </h1>
            <p className="text-base text-ink leading-relaxed max-md:text-sm">
              Hawiyat is the AI infrastructure platform based in Algeria. We build and run the execution layer between frontier AI models and the systems businesses rely on — WhatsApp, CRM, ERP, email, databases, workflows. Our Composer engine plans, routes, and executes every task: the best model, the right context, automatic fallbacks, and an evaluated result — priced in DZD, on our own cloud.
            </p>
            <p className="text-sm text-muted-ink">
              Founded in Algiers • Incubated by Itihad • 100+ clients
            </p>
            <div className="flex gap-4 max-md:flex-col justify-start mt-1">
              <Link
                href="/services"
                className="btn max-md:!w-full flex gap-2 place-content-center shadow-lg !rounded-lg !py-3.5 max-md:!py-3 text-sm transition-all duration-300 hover:scale-x-[1.03] active:scale-95"
              >
                <span>Explore Services</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="https://wa.me/213559555951"
                target="_blank"
                className="btn max-md:!w-full flex gap-2 place-content-center !rounded-lg !py-3.5 max-md:!py-3 text-sm !bg-transparent !text-black dark:!text-white border-[1px] border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 active:scale-95"
              >
                <span>Contact Us</span>
                <MessageCircle className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right  Simple image grid */}
          <div className="flex-shrink-0 w-[440px] max-lg:w-[360px] max-md:w-full">
            <div className="grid grid-cols-3 gap-2 auto-rows-[80px] max-md:auto-rows-[65px]">
              {/* Row 1-2 col 1-2  Label */}
              <div className="relative rounded-lg overflow-hidden bg-foreground/5 col-span-2 row-span-2">
                <Image src="/aboutus/label-projet-inovant.webp" alt="Label" fill className="object-cover" />
              </div>
              {/* Row 1-2 col 3  Composer1 */}
              <div className="relative rounded-lg overflow-hidden bg-foreground/5 row-span-2">
                <Image src="/aboutus/hawiyat-composer/image1.webp" alt="Composer" fill className="object-cover" />
              </div>
              {/* Row 3 col 1  Itihad */}
              <div className="relative rounded-lg overflow-hidden bg-foreground/5">
                <Image src="/aboutus/itihad-incubation.webp" alt="Incubation" fill className="object-cover" />
              </div>
              {/* Row 3 col 2  Week1 */}
              <div className="relative rounded-lg overflow-hidden bg-foreground/5">
                <Image src="/aboutus/semaine-enteurprunariat-international/image1.webp" alt="Week" fill className="object-cover" />
              </div>
              {/* Row 3 col 3  Week2 */}
              <div className="relative rounded-lg overflow-hidden bg-foreground/5">
                <Image src="/aboutus/semaine-enteurprunariat-international/image2.webp" alt="Event" fill className="object-cover" />
              </div>
              {/* Row 4 col 1  Week3 */}
              <div className="relative rounded-lg overflow-hidden bg-foreground/5">
                <Image src="/aboutus/semaine-enteurprunariat-international/image3.webp" alt="Event" fill className="object-cover" />
              </div>
              {/* Row 4 col 2  Comp2 */}
              <div className="relative rounded-lg overflow-hidden bg-foreground/5">
                <Image src="/aboutus/hawiyat-composer/image2.webp" alt="Composer" fill className="object-cover" />
              </div>
              {/* Row 4 col 3  Nexus1 */}
              <div className="relative rounded-lg overflow-hidden bg-foreground/5">
                <Image src="/aboutus/Sponsoring-nexus-cybersecurty-club/image1.webp" alt="Nexus" fill className="object-cover" />
              </div>
              {/* Row 5-6 col 1  Green Duty (bottom left, tall) */}
              <div className="relative rounded-lg overflow-hidden bg-foreground/5 row-span-2">
                <Image src="/aboutus/certiifcations/greenduty.webp" alt="Green Duty" fill className="object-cover" />
              </div>
              {/* Row 5 col 2  COSI1 */}
              <div className="relative rounded-lg overflow-hidden bg-foreground/5">
                <Image src="/aboutus/Cosi-2025/image1.webp" alt="COSI" fill className="object-cover" />
              </div>
              {/* Row 5 col 3  Comp3 */}
              <div className="relative rounded-lg overflow-hidden bg-foreground/5">
                <Image src="/aboutus/hawiyat-composer/image3.webp" alt="Composer" fill className="object-cover" />
              </div>
              {/* Row 6 col 2  Nexus2 */}
              <div className="relative rounded-lg overflow-hidden bg-foreground/5">
                <Image src="/aboutus/Sponsoring-nexus-cybersecurty-club/image2.webp" alt="Nexus" fill className="object-cover" />
              </div>
              {/* Row 6 col 3  COSI2 */}
              <div className="relative rounded-lg overflow-hidden bg-foreground/5">
                <Image src="/aboutus/Cosi-2025/image2.webp" alt="COSI" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Timeline ─── */}
      <section className="w-full py-16 md:py-24 bg-foreground/[0.01] border-y border-foreground/5">
        <div className="mx-auto max-w-6xl px-6 relative">
          <div className="mb-14">
            <span className="text-xs text-foreground/40 uppercase tracking-widest">Our Story</span>
            <h2 className="text-5xl max-md:text-3xl font-medium mt-2">From a small team in Algiers to a recognized AI infrastructure company.</h2>
          </div>

          <div className="flex max-lg:flex-col gap-6">
            {[
              {
                year: "2025",
                title: "COSI 2025",
                body: "First Public Appearance",
                img: "/aboutus/Cosi-2025/image1.webp",
              },
              {
                year: "2026",
                title: "Label Projet Innovant",
                body: "Ministry of Knowledge Economy",
                img: "/aboutus/label-projet-inovant.webp",
              },
              {
                year: "2025",
                title: "Itihad Incubation Program",
                body: "Accelerator",
                img: "/aboutus/itihad-incubation.webp",
              },
            ].map((event, i) => (
              <div key={i} className="flex-1 relative group">
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] mb-4 bg-white dark:bg-black">
                  <Image
                    src={event.img}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    style={event.img.includes("label-projet") ? { objectPosition: "70% center" } : event.img.includes("itihad-incubation") ? { objectPosition: "30% center" } : undefined}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-xs text-white/60 font-mono">{event.year}</span>
                    <h3 className="text-lg font-semibold text-white mt-1">{event.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-muted-ink leading-relaxed">{event.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Certifications ─── */}
      <section className="w-full py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14">
            <span className="text-xs text-foreground/40 uppercase tracking-widest">Credentials</span>
            <h2 className="text-5xl max-md:text-3xl font-medium mt-2">Certifications</h2>
          </div>

          <div className="flex max-md:flex-col gap-5 items-stretch">
            {/* Left  4 certs in a 2x2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-[2.2]">
              {[
                {
                  title: "Label Projet Innovant",
                  by: "Ministry of Knowledge Economy",
                  img: "/aboutus/certiifcations/label.webp",
                },
                {
                  title: "Attestation d'Incubation",
                  by: "Itihad Accelerator",
                  img: "/aboutus/certiifcations/itihad-attestation-incubation-1.webp",
                },
                {
                  title: "Oracle DevOps Certified",
                  by: "Oracle",
                  img: "/aboutus/certiifcations/oracle.webp",
                },
                {
                  title: "CKE Certification",
                  by: "Certified Kubernetes Expert",
                  img: "",
                  isIcon: true,
                },
              ].map((cert, i) => (
                <div key={i} className="group bg-surface-dim rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                  {cert.isIcon ? (
                    <div className="aspect-[4/3] flex items-center justify-center bg-foreground/[0.02]">
                      <Package className="h-12 w-12 text-foreground/20" />
                    </div>
                  ) : (
                    <div className="relative aspect-[4/3] overflow-hidden bg-white dark:bg-black">
                      <Image src={cert.img} alt={cert.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-1">{cert.title}</h3>
                    <p className="text-[11px] leading-relaxed text-foreground/50">{cert.by}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right  Green Duty tall card spanning 2 rows */}
            <div className="flex-[1.25] max-md:w-full">
              <div className="group bg-surface-dim rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col shadow-md">
                <div className="relative flex-1 min-h-[300px] overflow-hidden bg-white dark:bg-black">
                  <Image src="/aboutus/certiifcations/greenduty.webp" alt="Attestation de Bonne Exécution" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1">Attestation de Bonne Exécution</h3>
                  <p className="text-[11px] leading-relaxed text-foreground/50">Green Duty  AI delivered via Hawiyat Composer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trusted By ─── */}
      <section className="w-full py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl max-md:text-2xl">Trusted by</h2>
          </div>

          <div className="grid grid-cols-3 gap-12 md:gap-16 lg:gap-20 max-md:gap-8">
            {[
              { name: "Itihad", logo: "/trust/itihad-logo.svg", url: "https://itihad.group" },
              { name: "ESTIN", logo: "/trust/estin-logo.svg", url: "https://estin.dz/" },
              { name: "IT Solutions", logo: mounted && (resolvedTheme === "dark" || theme === "dark") ? "/trust/itsol-dark.svg" : "/trust/itsol.svg", url: "https://itsolutions.dz/" },
            ].map((brand) => (
              <div key={brand.name} className="group relative flex items-center justify-center">
                <a href={brand.url} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  <div className="relative w-full h-32 md:h-40 lg:h-52 max-md:h-28 transition-transform duration-500 ease-out group-hover:scale-110">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain transition-all duration-500 drop-shadow-[0_0_12px_rgba(0,0,0,0.2)] dark:hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]"
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Collaborations ─── */}
      <section className="w-full py-20 md:py-28 relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-4 mb-14">
            <span className="text-xs text-foreground/40 uppercase tracking-widest">People</span>
            <h2 className="text-5xl max-md:text-3xl font-medium">Collaborations</h2>
            <p className="text-muted-ink max-w-md text-sm">
              People we work with.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Mrz",
                image: "/aboutus/Partners/mrz.webp",
                role: "CEO & Co-Founder @ MERCUS.AI",
                url: "https://www.instagram.com/itstherealmr_z/",
                desc: "Founder in the AI automation space and a valued member of Hawiyat's professional network.",
              },
              {
                name: "Mus Automation",
                image: "/aboutus/Partners/mus.webp",
                role: "Automation Agency",
                url: "https://www.instagram.com/mus_automation/",
                desc: "AI automation agency collaborating with businesses to build intelligent workflows and automation solutions.",
              },
              {
                name: "Brahim",
                image: "/aboutus/Partners/brahim.webp",
                role: "AI Automation Creator",
                url: "https://www.instagram.com/brahim_amro/",
                desc: "Content creator focused on AI automation, education, and the growth of the local AI ecosystem.",
              },
            ].map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-surface-dim rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-500"
              >
                <div className="relative h-56 max-md:h-48 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-transparent to-transparent" />
                </div>
                <div className="relative -mt-12 px-6 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white dark:border-surface-dim shadow-lg shrink-0 -mt-7">
                      <Image src={p.image} alt={p.name} width={56} height={56} className="w-full h-full object-cover" />
                    </div>
                    <div className="pt-4">
                      <h3 className="font-semibold text-lg">{p.name}</h3>
                      <span className="text-xs font-medium text-foreground/50 uppercase tracking-wider">{p.role}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-ink leading-relaxed mt-4">{p.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Location ─── */}
      <section className="w-full py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12">
            <span className="text-xs text-foreground/40 uppercase tracking-widest">HQ</span>
            <h2 className="text-5xl max-md:text-3xl font-medium mt-2">Where We&apos;re At</h2>
          </div>
          <div className="flex max-md:flex-col gap-5">
            <div className="flex-1 bg-surface-dim rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200.3!2d3.4671314!3d36.7607705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e69f0bb134dd5%3A0x5c74ae92a333fc22!2sItihad!5e1!3m2!1sen!2sdz!4v1"
                width="100%"
                height="100%"
                style={{ minHeight: "280px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
            <div className="flex-1 bg-surface-dim rounded-2xl p-8 flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-black dark:bg-white flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-white dark:text-black" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Hawiyat HQ</h3>
                <p className="text-muted-ink leading-relaxed">
                  Itihad Campus, Boumerdes. Based out of Itihad&apos;s innovation hub, building cloud infrastructure for North Africa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative w-full py-32 md:py-44 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/[0.02] to-foreground/[0.05]" />

        {/* Grid lines overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-6 flex flex-col items-center gap-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-foreground/60 text-xs uppercase tracking-widest">
            Ready to scale?
          </div>

          <h2 className="text-7xl md:text-8xl max-md:text-4xl font-medium leading-[1.1] tracking-tight">
            Let&apos;s Build<br />
            <span className="font-light">Together</span>
          </h2>

          <p className="max-w-xl text-lg text-muted-ink leading-relaxed">
            Cloud infrastructure, AI tooling, or a hosting partner. If you need any
            of it, we want to hear from you.
          </p>

          <div className="flex gap-5 max-md:flex-col justify-center mt-6">
            <Link
              href="/services"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-medium hover:opacity-90 transition-all duration-300 active:scale-[0.97]"
            >
              <span>Explore Services</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="https://wa.me/213559555951"
              target="_blank"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-foreground/20 text-foreground/80 hover:bg-foreground/5 hover:border-foreground/40 transition-all duration-300 active:scale-[0.97]"
            >
              <span>Contact Us</span>
              <MessageCircle className="h-4 w-4" />
            </Link>
          </div>

          <p className="text-xs text-foreground/30 mt-8">
            No commitment. Free consultation. Algerian team.
          </p>
        </div>
      </section>
    </div>
  )
}
