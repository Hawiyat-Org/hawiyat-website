import Link from "next/link"

const Pricing = () => {
  const plans = [
    {
      price: "2999 DA",
      period: "/M",
      vat: "no TVA",
      title: "Starter – Perfect for small apps & projects",
      features: [
        { text: "4 GB RAM", included: true },
        { text: "2 vCores", included: true },
        { text: "100 GB SSD Storage", included: true },
        { text: "1 Gbps Bandwidth", included: true },
        { text: "Free Backups & Monitoring", included: true },
      ],
      buttonStyle:
        "!text-black !bg-transparent !border-[1px] border-black dark:border-white dark:!text-white",
      borderStyle: "border-[1px]",
    },
    {
      price: "4999 DA",
      period: "/M",
      vat: "no TVA",
      title: "Growth – Scalable resources for production workloads",
      features: [
        { text: "8 GB RAM", included: true },
        { text: "4 vCores", included: true },
        { text: "200 GB SSD Storage", included: true },
        { text: "1 Gbps Bandwidth", included: true },
        { text: "Free Backups & Monitoring", included: true },
      ],
      buttonStyle: "",
      borderStyle: "border-2 dark:border-[#595858]",
    },
    {
      price: "7999 DA",
      period: "/M",
      vat: "no TVA",
      title: "Power – High-performance for demanding apps",
      features: [
        { text: "16 GB RAM", included: true },
        { text: "8 vCores", included: true },
        { text: "400 GB SSD Storage", included: true },
        { text: "1 Gbps Bandwidth", included: true },
        { text: "Free Backups & Monitoring", included: true },
      ],
      buttonStyle:
        "!text-black !bg-transparent !border-[1px] border-black dark:border-white dark:!text-white",
      borderStyle: "border-[1px]",
    },
  ]

  return (
    <section className="mt-10 flex w-full flex-col gap-12 items-center p-[5%]" id="pricing">
      <h3 className="text-5xl font-semibold tracking-tight max-md:text-3xl text-center">
        Choose your plan
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-[1100px] w-full">
  {plans.map((plan, index) => (
    <div
      key={index}
      className={`flex flex-col items-center rounded-lg ${plan.borderStyle} border-outlineColor bg-white dark:bg-[#0a0a0a] dark:border-[#1f2123] p-10 shadow-sm hover:shadow-md transition-shadow duration-300`}
    >
      <h3 className="mb-4 text-center">
        <span className="text-5xl font-bold">{plan.price}</span>
        <span className="ml-1 text-lg text-gray-500 dark:text-gray-400">{plan.period}</span>
        <span className="ml-2 text-sm text-gray-400">{plan.vat}</span>
      </h3>

      <p className="text-lg text-center text-gray-800 dark:text-gray-100 font-medium leading-relaxed">
        {plan.title}
      </p>

      <ul className="mt-8 flex flex-col gap-3 text-gray-700 dark:text-gray-300 w-full">
        {plan.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-center gap-3">
            <i className="bi bi-check-circle-fill text-black-500"></i>
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

      <Link
        href="https://app.hawiyat.org"
        className={`btn mt-4 !w-full transition-transform duration-[0.3s] hover:scale-x-[1.02] ${plan.buttonStyle}`}
      >
        Choose plan
      </Link>
    </div>
  ))}
</div>

    </section>
  )
}

export default Pricing
