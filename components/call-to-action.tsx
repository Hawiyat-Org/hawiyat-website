import Link from "next/link"

const CallToAction = () => {
  return (
    <section className="relative flex p-2 max-w-7xl  mx-auto w-full min-h-[60vh] flex-col place-content-center place-items-center overflow-hidden">
      <div className="reveal-up w-full h-full min-h-[450px] max-lg:max-w-full rounded-md lg:py-[5%] bg-[#f6f7fb] dark:bg-[#171717] place-content-center items-center flex flex-col max-w-[80%] gap-4 p-4">
        <h3 className="reveal-up text-5xl dark:text-white/80 text-black/80 font-light max-md:text-3xl text-center leading-normal">
        <span className="dark:text-white text-black font-semibold">Click</span> the Button
        <span className="dark:text-white text-black font-semibold">, </span> 
        <span className="dark:text-white text-black font-semibold">Ship </span>
        the App
        <span className="dark:text-white text-black font-semibold">,</span>
        <span className="dark:text-white text-black font-semibold"> Done</span> 
        </h3>

        <div className="mt-8 relative flex max-lg:flex-col gap-5">
          <Link href="#" className="btn reveal-up !rounded-full !p-4 font-medium">
            Deploy App
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
