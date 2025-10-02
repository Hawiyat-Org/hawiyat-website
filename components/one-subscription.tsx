import Image from "next/image"
import Link from "next/link"

const OneSubscription = () => {
  return (
    <section className="relative flex w-full min-h-[100vh] max-md:min-h-[80vh] flex-col place-content-center place-items-center overflow-hidden">
      <div className="w-full max-lg:max-w-full place-content-center place-items-center flex flex-col max-w-[80%] gap-4 p-4">
        <h3 className="reveal-up text-5xl font-medium max-md:text-3xl text-center leading-normal">
          One Subscription for it all
        </h3>
        <p className="reveal-up mt-3 max-w-[600px] text-center">
          Why pay for multiple expensive subscriptions when one subscription can do it all? Access multiple AI models
          and save 1000's of dollar per year.
        </p>

        <div className="mt-8 relative flex max-lg:flex-col gap-5">
          <div className="reveal-up flex w-full max-w-[650px] max-md:max-w-full flex-col place-items-center gap-2 rounded-lg border-[1px] border-outlineColor bg-white dark:bg-[#080808] dark:border-[#1f2123] p-2 shadow-xl max-lg:w-[320px]">
            <Image
              src="/oneSub/cost.webp"
              alt="Multi sub"
              width={650}
              height={400}
              className="object-cover"
            />
          </div>

          <div className="reveal-up flex w-full max-w-[650px] flex-col place-items-center gap-2 rounded-lg border-[1px] border-outlineColor bg-white dark:bg-[#080808] dark:border-[#1f2123] p-2 shadow-xl max-lg:w-[320px]">
            <Image
              src="/oneSub/hawiyat.webp"
              alt="Single sub"
              width={650}
              height={400}
            />
          </div>
        </div>

        <Link href="https://app.hawiyat.org/" className="reveal-up group shadow-xl btn flex gap-2 mt-10">
          <span>Start Now</span>
          <i className="bi bi-arrow-right duration-300 group-hover:translate-x-1"></i>
        </Link>
      </div>
    </section>
  )
}

export default OneSubscription
