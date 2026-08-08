

const CallToAction = () => {



  return (
    <section 
   
      className="relative flex px-2 sm:px-4 py-8 max-w-6xl mx-auto w-full min-h-[60vh] flex-col place-content-center place-items-center overflow-hidden"
    >
      <div className="relative w-full rounded-xl sm:rounded-2xl lg:py-16 py-12 px-4 sm:px-8 bg-[#f6f7fb] dark:bg-[#3A3A40] place-content-center items-center flex flex-col gap-8 shadow-md dark:shadow-white/20 border border-gray-200/20 dark:border-gray-700/20 backdrop-blur-lg transition-all duration-300">
        
    


        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] rounded-xl sm:rounded-2xl" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl w-full">
          {/* Top decorative element */}
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-black/20 dark:to-white/20" />
            <div className="w-2 h-2 rounded-full bg-black/30 dark:bg-white/30 animate-pulse" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-black/20 dark:to-white/20" />
          </div>

          {/* Badge */}
          <div className="px-4 py-2 rounded-lg border border-gray-200/20 dark:border-gray-700/20 bg-white/50 dark:bg-black/30">
            <span className="text-sm font-medium dark:text-gray-300 text-gray-600">Deployment Made Simple</span>
          </div>

          <h2 className="reveal-up text-5xl dark:text-white/80 text-black/80 font-light max-md:text-3xl text-center leading-relaxed px-4">
            <span className="dark:text-white text-black font-semibold">Click </span>
            {' '}the button,{' '}
            <span className="dark:text-white text-black font-semibold">Ship</span>
            {' '}the app,{' '}
            <span className="dark:text-white text-black font-semibold">Done</span>
          </h2>

          {/* Subtitle */}
          <p className="text-center text-base dark:text-gray-300 text-gray-600 max-w-xl px-4">
            Deploy your app with one click. No complex config, no setup hell.
          </p>

          <div className="mt-6 relative flex max-lg:flex-col gap-5">
            <a
              href="/services?q=hosting"
           
              className="btn reveal-up !rounded-lg !px-6 !py-3 font-medium group relative overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              {/* Button text */}
              <span className="relative z-10 flex items-center gap-2 text-base">
                Get Started
                <svg 
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
          </div>


    
        </div>
      </div>

  
    </section>
  );
};

export default CallToAction;