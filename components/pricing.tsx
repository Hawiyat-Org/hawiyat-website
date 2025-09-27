import Link from "next/link"

const Pricing = () => {
  const plans = [
    {
      price: "$9",
      period: "/mo",
      title: "Essential AI tools for everyday use",
      features: [
        { text: "1,000 AI powered chat messages", included: true },
        { text: "30 premium image generations", included: true },
        { text: "10 premium music generation", included: true },
        { text: "Access to all premium AI models", included: false },
        { text: "Early access to new features", included: false },
      ],
      buttonStyle: "!text-black !bg-transparent !border-[1px] border-black dark:border-white dark:!text-white",
      borderStyle: "border-[1px]",
    },
    {
      price: "$17",
      period: "/mo",
      title: "Advanced features for serious AI enthusiasts.",
      features: [
        { text: "5,000 AI powered chat messages", included: true },
        { text: "100 premium image generations", included: true },
        { text: "40 premium music generation", included: true },
        { text: "Access to all premium AI models", included: true },
        { text: "Early access to new features", included: false },
      ],
      buttonStyle: "",
      borderStyle: "border-2 dark:border-[#595858]",
    },
    {
      price: "$29",
      period: "/mo",
      title: "Unlimited potential for power users",
      features: [
        { text: "10,000 AI powered chat messages", included: true },
        { text: "300 premium image generations", included: true },
        { text: "100 premium music generations", included: true },
        { text: "Access to all premium AI models", included: true },
        { text: "Early access to new features", included: true },
      ],
      buttonStyle: "!text-black !bg-transparent !border-[1px] border-black dark:border-white dark:!text-white",
      borderStyle: "border-[1px]",
    },
  ]

  return (
    <section className="mt-5 flex w-full flex-col gap-6 place-items-center p-[2%]" id="pricing">
      <h3 className="reveal-up text-5xl font-medium max-md:text-2xl">Choose the right plan for you</h3>

      <div className="mt-10 flex flex-wrap place-content-center gap-8 max-lg:flex-col">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`reveal-up flex w-[350px] flex-col place-items-center gap-2 rounded-lg ${plan.borderStyle} border-outlineColor bg-white dark:bg-[#080808] dark:border-[#1f2123] p-8 shadow-xl max-lg:w-[320px]`}
          >
            <h3>
              <span className="text-5xl max-md:text-3xl font-semibold">{plan.price}</span>
              <span className="text-2xl text-gray-600 dark:text-gray-300">{plan.period}</span>
            </h3>
            <p className="mt-3 text-center text-gray-800 dark:text-gray-100">{plan.title}</p>
            <hr />
            <ul className="mt-4 flex flex-col gap-4 text-base text-gray-800 dark:text-gray-200">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex gap-2">
                  <i
                    className={`bi bi-check-circle-fill ${!feature.included ? "text-gray-400 dark:text-gray-500" : ""}`}
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
