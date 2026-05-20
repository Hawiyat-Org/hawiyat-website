"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

const services = [
  {
    name: "Claude Code",
    description: "AI-powered coding assistant",
    icon: "bi-cpu-fill",
    badge: "Best Value",
    badgeColor: "bg-green-500",
    featured: true,
    features: ["AI-Powered", "Code Reviews", "Multi-Language"],
    useCases: "Context-aware suggestions, automated code reviews, documentation generation, bug detection & fixes.",
    price: "2,000",
    priceUnit: "DA/month",
  },
  {
    name: "n8n Hosting",
    description: "Managed workflow automation platform",
    icon: "bi-lightning-fill",
    badge: "Most Popular",
    badgeColor: "bg-orange-400",
    featured: false,
    features: ["Instant Deployment", "24/7 Uptime", "Fully Managed"],
    useCases: "Automating WhatsApp replies, connecting CRMs, triggering actions from form submissions, AI pipelines, scheduled tasks.",
    price: "8,000",
    priceUnit: "DA/year",
  },
  {
    name: "Evolution API",
    description: "WhatsApp Business API solution",
    icon: "bi-chat-dots-fill",
    featured: false,
    features: [],
    useCases: "",
    price: "7,000",
    priceUnit: "DA/year",
  },
]

const featureIcons: Record<number, string> = {
  0: "bi-lightning-fill",
  1: "bi-clock",
  2: "bi-shield",
}

export default function ServicesTeaser() {
  return (
    <section className="relative mt-10 max-md:mt-8 flex min-h-[60vh] w-full max-w-[100vw] flex-col items-center lg:p-6 max-md:px-4 max-md:py-8">
      <div className="reveal-up mt-[5%] max-md:mt-0 flex h-full w-full justify-center gap-2 p-4 max-md:p-0 max-lg:max-w-full max-lg:flex-col">

        {/* Left sticky heading */}
        <div className="relative flex max-w-[30%] max-lg:max-w-full flex-col items-start max-md:items-center gap-4 p-2 max-md:p-0 max-lg:items-center max-lg:justify-center max-lg:w-full">
          <div className="top-40 max-md:top-0 flex flex-col lg:sticky items-center max-h-fit max-w-[850px] max-lg:max-h-fit max-lg:max-w-[320px] max-md:max-w-full overflow-hidden max-md:mb-6">
            <h2 className="text-5xl font-serif text-center font-medium max-md:text-2xl max-md:leading-tight max-md:px-2">
              Powerful Services
            </h2>
            <p className="text-gray-800 dark:text-gray-100 max-md:text-[14px] max-md:leading-relaxed mt-4 text-center max-w-md">
              Deploy, automate, and scale with our managed services. Built for developers, designed for growth.
            </p>
            <Link
              href="/services"
              className="btn !mt-8 max-md:!mt-6 max-md:!w-[90%] max-md:!rounded-lg max-md:!py-3.5 max-md:!text-[15px] max-md:!font-medium !bg-transparent !text-black !border-[1px] !border-black dark:!border-white dark:!text-white transition-all duration-300 active:scale-95 inline-flex items-center gap-2"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Cards column */}
        <div className="flex flex-col gap-10 max-md:gap-4 h-full max-w-1/2 max-lg:max-w-full px-[10%] max-lg:px-4 max-md:px-0 lg:top-[20%] items-center max-md:w-full">
          {services.map((service, index) => (
            <div
              key={index}
              className="reveal-up w-[450px] max-md:w-full relative group"
            >
              {/* Badge (default state only) */}
              {service.badge && (
                <span
                  className={`absolute top-3 right-3 z-10 text-white text-xs font-semibold px-3 py-1 rounded-full group-hover:hidden ${service.badgeColor}`}
                >
                  {service.badge}
                </span>
              )}

              {/* Default card — hidden on hover */}
              <div
                className={`flex w-full gap-8 max-md:gap-4 rounded-xl max-md:rounded-lg duration-300 transition-all p-8 max-md:p-5 active:scale-[0.98] group-hover:hidden
                  ${
                    service.featured
                      ? "bg-[#1a1a1a] text-white dark:bg-white dark:text-black shadow-lg"
                      : "border border-gray-100 dark:border-[#1f2123] dark:bg-[#080808]"
                  }`}
              >
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-lg flex-shrink-0
                    ${service.featured ? "bg-white dark:bg-black" : "bg-black dark:bg-white"}`}
                >
                  <i
                    className={`bi ${service.icon} text-xl ${
                      service.featured ? "text-black dark:text-white" : "text-white dark:text-black"
                    }`}
                  ></i>
                </div>

                <div className="flex flex-col gap-4 max-md:gap-3 justify-center">
                  <h3 className="text-xl font-semibold">{service.name}</h3>
                  <p
                    className={`max-md:text-[14px] max-md:leading-relaxed ${
                      service.featured ? "text-gray-300 dark:text-gray-700" : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {service.description}
                  </p>
                  <p className="text-sm font-medium mt-1">
                    Hover for details <span className="ml-1">→</span>
                  </p>
                </div>
              </div>

              {/* Expanded hover card — shown on hover, fully self-contained, no fixed height */}
              <Link
                href="/services"
                className="hidden group-hover:flex flex-col w-full rounded-xl overflow-hidden bg-[#2a2a2a] text-white shadow-2xl duration-300 transition-all active:scale-[0.98]"
              >
                {/* Content */}
                <div className="flex flex-col gap-4 p-6">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-lg flex-shrink-0">
                      <i className={`bi ${service.icon} text-lg text-white`}></i>
                    </div>
                    <h3 className="text-xl font-semibold">{service.name}</h3>
                    {service.badge && (
                      <span className={`text-white text-xs font-semibold px-2 py-0.5 rounded-full ${service.badgeColor}`}>
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>

                  {/* Features */}
                  {service.features.length > 0 && (
                    <div className="flex flex-col gap-2 mt-1">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-white/10 rounded-md flex-shrink-0">
                            <i className={`bi ${featureIcons[i] ?? "bi-check"} text-sm text-white`}></i>
                          </div>
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Use Cases */}
                  {service.useCases && (
                    <div className="bg-white/10 rounded-lg p-4 mt-1">
                      <p className="text-xs font-semibold text-gray-300 mb-1">Use Cases:</p>
                      <p className="text-sm text-gray-300 leading-relaxed">{service.useCases}</p>
                    </div>
                  )}

                  {/* Price */}
                  <div className="mt-1">
                    <span className="text-3xl font-bold">{service.price}</span>
                    <span className="text-sm text-gray-400 ml-1">{service.priceUnit}</span>
                  </div>
                </div>

                {/* Get Started — inside the card, never outside */}
                <div className="bg-white text-black font-semibold text-sm flex items-center justify-center gap-2 py-4">
                  Get Started <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}