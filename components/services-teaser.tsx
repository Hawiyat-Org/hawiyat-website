"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

const services = [
  {
    name: "n8n Hosting",
    description: "Managed workflow automation",
    icon: "bi-lightning-fill",
  },
  {
    name: "Claude Code",
    description: "AI-powered coding assistant",
    icon: "bi-cpu-fill",
  },
  {
    name: "WhatsApp API",
    description: "Business messaging at scale",
    icon: "bi-chat-dots-fill",
  },
]

export default function ServicesTeaser() {
  return (
    <section className="relative mt-10 max-md:mt-8 flex min-h-[60vh] w-full max-w-[100vw] flex-col items-center lg:p-6 max-md:px-4 max-md:py-8">
      <div className="reveal-up mt-[5%] max-md:mt-0 flex h-full w-full justify-center gap-2 p-4 max-md:p-0 max-lg:max-w-full max-lg:flex-col">
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

        <div className="flex flex-col gap-10 max-md:gap-4 h-full max-w-1/2 max-lg:max-w-full px-[10%] max-lg:px-4 max-md:px-0 lg:top-[20%] items-center max-md:w-full">
          {services.map((service, index) => (
            <div key={index} className="reveal-up h-[200px] max-md:h-auto w-[450px] max-md:w-full">
              <Link
                href="/services"
                className="flex w-full h-full gap-8 max-md:gap-4 rounded-xl max-md:rounded-lg dark:shadow-[#171717] duration-300 transition-all p-8 max-md:p-5 group/card  max-md:dark:bg-[#080808]  max-md:border-gray-200 max-md:dark:border-[#1f2123]  active:scale-[0.98]"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-black dark:bg-white rounded-lg flex-shrink-0">
                  <i className={`bi ${service.icon} text-xl text-white dark:text-black`}></i>
                </div>

                <div className="flex flex-col gap-4 max-md:gap-3 justify-center">
                  <h3 className="text-xl font-semibold">{service.name}</h3>
                  <p className="text-gray-800 dark:text-gray-100 max-md:text-[14px] max-md:leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
