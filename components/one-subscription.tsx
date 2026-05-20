import Image from "next/image"
import Link from "next/link"

const OneSubscription = () => {
  return (
    <section className="relative flex w-full min-h-[100vh] max-md:min-h-[80vh] flex-col justify-center items-center overflow-hidden max-md:py-12">
      <div className="w-full flex flex-col items-center max-w-[80%] max-md:max-w-full gap-4 p-4 max-md:px-4 max-md:gap-6">
        <h3 className="reveal-up text-5xl font-medium max-md:text-2xl text-center leading-normal max-md:leading-tight max-md:px-2">
          One Subscription for it all
        </h3>
        <p className="reveal-up mt-3 max-md:mt-2 max-w-[600px] text-center max-md:text-[15px] max-md:leading-relaxed max-md:px-2">
          Why pay for multiple expensive subscriptions when one subscription can do it all? Access multiple AI models
          and save 1000&apos;s of dollars per year.
        </p>

        {/* Desktop: Row | Mobile: Column */}
        <div className="mt-8 max-md:mt-6 w-full flex flex-row max-md:flex-col justify-center items-center gap-5 max-md:gap-4">
          {/* Cost */}
          <div className="reveal-up flex flex-col w-full max-w-[650px] max-md:max-w-[90%] rounded-lg max-md:rounded-lg border border-outlineColor bg-white dark:bg-[#080808] dark:border-[#1f2123] shadow-xl max-md:shadow-lg overflow-hidden">
            <Image
              src="/oneSub/cost.webp"
              alt="Multi sub"
              width={650}
              height={400}
              className="object-cover dark:hidden w-full h-auto"
            />
            <Image
              src="/oneSub/cost-dark.webp"
              alt="Multi sub dark"
              width={650}
              height={400}
              className="object-cover hidden dark:block w-full h-auto"
            />
          </div>

          {/* Hawiyat */}
          <div className="reveal-up flex flex-col w-full max-w-[650px] max-md:max-w-[90%] rounded-lg max-md:rounded-lg border border-outlineColor bg-white dark:bg-[#080808] dark:border-[#1f2123] shadow-xl max-md:shadow-lg overflow-hidden">
            <Image
              src="/oneSub/hawiyat.webp"
              alt="Single sub"
              width={650}
              height={400}
              className="object-cover dark:hidden w-full h-auto"
            />
            <Image
              src="/oneSub/hawiyat-dark.webp"
              alt="Single sub dark"
              width={650}
              height={400}
              className="object-cover hidden dark:block w-full h-auto"
            />
          </div>
        </div>

        <Link
          href="/services"
          className="reveal-up group shadow-xl btn flex gap-2 justify-center mt-10 max-md:mt-6 max-md:w-[90%] max-md:!rounded-lg max-md:!py-3.5 max-md:text-[15px] max-md:font-medium transition-all duration-300 active:scale-95"
        >
          <span>Start Now</span>
          <i className="bi bi-arrow-right duration-300 group-hover:translate-x-1 max-md:text-lg"></i>
        </Link>
      </div>
    </section>
  )
}

export default OneSubscription