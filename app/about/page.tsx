"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, Award, Building2, Rocket, Users, Globe } from "lucide-react"

export default function AboutPage() {

  const milestones = [
    {
      label: "Label Projet",
      title: "Project Label & Recognition",
      desc: "Hawiyat was officially recognized as an innovative tech project. This milestone marked our entry into the Algerian startup ecosystem.",
      image: "/assets/images/people/man.jpg",
      date: "2024",
      icon: Award,
    },
    {
      label: "Incubation by Itihad",
      title: "Incubation at Itihad",
      desc: "Accepted into Itihad's incubation program Algeria's leading tech accelerator. We gained mentorship, funding, and the infrastructure support to scale.",
      image: "/trust/itihad-logo.svg",
      date: "2024",
      icon: Building2,
      isLogo: true,
    },
    {
      label: "Platform Demo",
      title: "Presenting to Officials",
      desc: "We demonstrated the Hawiyat platform in front of government officials and industry leaders. Showcasing how local cloud infrastructure can power Algeria's digital future.",
      image: "/assets/images/people/women.jpg",
      date: "2025",
      icon: Users,
    },
    {
      label: "Composer Launch",
      title: "Hawiyat Composer Launch",
      desc: "The official release of Hawiyat Composer our AI-powered development gateway. A new era of intelligent infrastructure management begins.",
      image: "/assets/images/people/man2.jpg",
      date: "2025",
      icon: Rocket,
    },
  ]

  return (
    <div className="relative min-h-screen hero-bg-gradient overflow-hidden">
      {/* ── Hero ── */}
      <section className="relative flex min-h-[70vh] w-full max-w-[100vw] flex-col place-content-center place-items-center overflow-hidden">
        <div className="purple-bg-grad absolute left-[15%] top-[10%] h-[200px] w-[200px] max-md:h-[100px] max-md:w-[100px]" />
        <div className="purple-bg-grad absolute right-[10%] bottom-[20%] h-[150px] w-[150px] max-md:hidden" />

        <div className="flex flex-col place-content-center items-center gap-6 max-md:gap-4 p-[5%] max-lg:p-6 max-md:p-4">
          <h1 className="text-center text-6xl font-medium uppercase leading-[72px] max-lg:text-4xl max-md:text-3xl max-md:leading-tight">
            About{" "}
            <span className="font-thin font-serif">
              Us
            </span>
          </h1>

          <p className="mt-4 max-w-[600px] text-lg text-center text-gray-800 dark:text-white max-lg:max-w-full max-md:text-[15px]">
            Hawiyat is an Algerian cloud platform on a mission to simplify infrastructure
            for developers across the region. From incubation to launch this is our story.
          </p>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="relative flex w-full max-w-[100vw] flex-col place-content-center place-items-center overflow-hidden pb-24 max-md:pb-16">
        <div className="flex flex-col w-full h-full place-items-center gap-5 px-[5%] max-lg:px-6 max-md:px-4">
          <div className="mt-5 flex flex-col gap-3 text-center max-w-[700px]">
            <h2 className="text-6xl font-medium max-md:text-3xl">Our Journey</h2>
            <p className="text-base text-gray-800 dark:text-gray-200 max-md:text-sm">
              From a bold idea to a fully-fledged cloud platform every milestone shaped
              Hawiyat into what it is today.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-12 max-w-[1000px] w-full max-md:gap-8">
            {milestones.map((item, i) => (
              <div
                key={i}
                className="group relative flex max-md:flex-col gap-8 max-md:gap-6 p-6 md:p-10 bg-[#f6f7fb] dark:bg-[#141414] rounded-3xl hover:scale-[1.01] transition-all duration-300"
              >
                {/* Left - Image */}
                <div className="relative w-[280px] h-[200px] max-md:w-full max-md:h-[220px] shrink-0 rounded-2xl overflow-hidden bg-white dark:bg-black">
                  {item.isLogo ? (
                    <div className="w-full h-full flex items-center justify-center p-8">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={160}
                        height={80}
                        className="object-contain max-w-full max-h-full"
                      />
                    </div>
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Right - Content */}
                <div className="flex flex-col gap-3 flex-1 justify-center">
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-400" />
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-2xl max-md:text-xl font-medium">{item.title}</h3>
                  <p className="text-base leading-relaxed text-gray-800 dark:text-gray-200 max-w-[500px]">
                    {item.desc}
                  </p>
                </div>

                {/* Step number */}
                <div className="absolute top-4 right-4 text-6xl font-thin text-gray-200 dark:text-gray-800 leading-none pointer-events-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Location ── */}
      <section className="relative flex w-full max-w-[100vw] flex-col place-content-center place-items-center overflow-hidden pb-24 max-md:pb-16">
        <div className="purple-bg-grad absolute left-1/2 -translate-x-1/2 top-[10%] h-[160px] w-[160px] max-md:hidden" />

        <div className="flex flex-col w-full h-full place-items-center gap-5 px-[5%] max-lg:px-6 max-md:px-4">
          <div className="mt-5 flex flex-col gap-3 text-center">
            <h2 className="text-6xl font-medium max-md:text-3xl">Where We Are</h2>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1000px] w-full">
            {/* Map Card */}
            <div className="p-8 md:p-10 bg-[#f6f7fb] dark:bg-[#141414] rounded-3xl flex flex-col gap-5">
              <div className="w-12 h-12 rounded-2xl bg-black dark:bg-white flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white dark:text-black" />
              </div>
              <h3 className="text-2xl font-medium">Our Office</h3>
              <div className="flex flex-col gap-2 text-base text-gray-800 dark:text-gray-200">
                <p>Hawiyat HQ</p>
                <p>Algiers, Algeria</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  We operate out of Algiers, building cloud infrastructure
                  tailored for the Algerian and North African market.
                </p>
              </div>
            </div>

            {/* Reach Card */}
            <div className="p-8 md:p-10 bg-[#f6f7fb] dark:bg-[#141414] rounded-3xl flex flex-col gap-5">
              <div className="w-12 h-12 rounded-2xl bg-black dark:bg-white flex items-center justify-center">
                <Globe className="w-6 h-6 text-white dark:text-black" />
              </div>
              <h3 className="text-2xl font-medium">Our Reach</h3>
              <div className="flex flex-col gap-2 text-base text-gray-800 dark:text-gray-200">
                <p>Serving clients across Algeria & North Africa</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Local data centers, local support in Arabic & French,
                  and a team that understands the regional ecosystem.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-2">
                {["Algiers", "Oran", "Constantine", "Annaba"].map((city) => (
                  <span
                    key={city}
                    className="px-3 py-1.5 text-sm bg-foreground/5 border border-foreground/10 rounded-full"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section className="relative flex w-full max-w-[100vw] flex-col place-content-center place-items-center overflow-hidden pb-24 max-md:pb-16">
        <div className="flex flex-col w-full h-full place-items-center gap-5 px-[5%] max-lg:px-6 max-md:px-4">
          <div className="mt-5 flex flex-col gap-3 text-center">
            <h2 className="text-6xl font-medium max-md:text-3xl">Our Partners</h2>
          </div>

          <div className="mt-10 flex flex-wrap gap-8 place-content-center items-center max-w-[800px]">
            <div className="h-16 w-48 relative grayscale hover:grayscale-0 transition-all duration-300">
              <Image
                src="/trust/itihad-logo.svg"
                alt="Itihad"
                fill
                className="object-contain"
              />
            </div>
            <div className="h-12 w-36 relative grayscale hover:grayscale-0 transition-all duration-300">
              <Image
                src="/trust/estin-logo.svg"
                alt="ESTIN"
                fill
                className="object-contain"
              />
            </div>
            <div className="h-12 w-36 relative grayscale hover:grayscale-0 transition-all duration-300">
              <Image
                src="/trust/itsol.svg"
                alt="ITSOL"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative flex w-full max-w-[100vw] flex-col place-content-center place-items-center overflow-hidden pb-32 max-md:pb-20">
        <div className="flex flex-col place-items-center gap-6 text-center px-6">
          <h2 className="text-6xl font-medium max-md:text-3xl">Want to Work With Us?</h2>
          <p className="max-w-[500px] text-base text-gray-800 dark:text-gray-200">
            Whether you need cloud infrastructure, AI tools, or a reliable hosting partner —
            we'd love to hear from you.
          </p>
          <div className="flex gap-4 max-md:flex-col mt-4">
            <Link
              href="/services"
              className="btn max-md:!w-full flex gap-2 place-content-center shadow-lg !rounded-lg !py-4 max-md:!py-3.5 transition-all duration-[0.3s] hover:scale-x-[1.03] active:scale-95"
            >
              <span className="max-md:text-[15px] max-md:font-medium">Explore Services</span>
              <i className="bi bi-arrow-right group-hover:translate-x-1 duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
