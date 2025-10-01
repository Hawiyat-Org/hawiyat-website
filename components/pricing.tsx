import Link from "next/link"

const Pricing = () => {
  const plans = [
    {
      price: "3000 DA",
      period: "/M",
      vat: "no TVA",
      title: "Starter VPS – Perfect for small apps & projects",
      features: [
        { text: "4 GB RAM", included: true },
        { text: "2 vCores", included: true },
        { text: "100 GB SSD Storage", included: true },
        { text: "1 Gbps Bandwidth", included: true },
        { text: "Free Backups & Monitoring", included: true },
      ],
      buttonStyle: "!text-black !bg-transparent !border-[1px] border-black dark:border-white dark:!text-white",
      borderStyle: "border-[1px]",
    },
    {
      price: "5000 DA",
      period: "/M",
      vat: "no TVA",
      title: "Growth VPS – Scalable resources for production workloads",
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
      price: "8000 DA",
      period: "/M",
      vat: "no TVA",
      title: "Power VPS – High-performance for demanding apps",
      features: [
        { text: "16 GB RAM", included: true },
        { text: "8 vCores", included: true },
        { text: "400 GB SSD Storage", included: true },
        { text: "1 Gbps Bandwidth", included: true },
        { text: "Free Backups & Monitoring", included: true },
      ],
      buttonStyle: "!text-black !bg-transparent !border-[1px] border-black dark:border-white dark:!text-white",
      borderStyle: "border-[1px]",
    },
  ]

  return (
    <section className="mt-5 flex w-full flex-col gap-6 place-items-center p-[2%]" id="pricing">
      <h3 className="reveal-up text-5xl font-medium max-md:text-2xl">Choose your VPS plan</h3>

      <div className="mt-10 flex flex-wrap place-content-center gap-8 max-lg:flex-col">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`reveal-up flex w-[350px] flex-col place-items-center gap-2 rounded-lg ${plan.borderStyle} border-outlineColor bg-white dark:bg-[#080808] dark:border-[#1f2123] p-8 shadow-xl max-lg:w-[320px]`}
          >
            <h3>
              <span className="text-4xl max-md:text-2xl font-semibold">{plan.price}</span>
              <span className="text-xl text-gray-600 dark:text-gray-300">{plan.period}</span>
              <span className="text-sm text-gray-600 dark:text-gray-300"> {plan.vat}</span>
            </h3>
            <p className="mt-3 text-center text-gray-800 dark:text-gray-100">{plan.title}</p>
            <hr />
            <ul className="mt-4 flex flex-col gap-4 text-base text-gray-800 dark:text-gray-200">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex gap-2">
                  <i
                    className={`bi bi-check-circle-fill ${
                      !feature.included ? "text-gray-400 dark:text-gray-500" : ""
                    }`}
                  ></i>
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
            <Link
              href="#"
              className={`btn mt-auto !w-full transition-transform duration-[0.3s] hover:scale-x-[1.02] ${plan.buttonStyle}`}
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
