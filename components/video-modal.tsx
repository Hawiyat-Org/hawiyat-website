"use client"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
}

const VideoModal = ({ isOpen, onClose }: VideoModalProps) => {
  if (!isOpen) return null

  return (
    <div
      className={`fixed bg-[#000000af] dark:bg-[#80808085] top-0 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-300 ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"} p-2 w-full h-full flex place-content-center place-items-center`}
    >
      <div
        className={`max-w-[80vw] max-lg:max-w-full max-lg:w-full ${isOpen ? "scale-100" : "scale-0"} transition-transform duration-500 p-6 rounded-xl max-lg:px-2 w-full gap-2 shadow-md h-[90vh] max-lg:h-auto max-lg:min-h-[400px] bg-white dark:bg-[#16171A] max-h-full`}
      >
        <div className="w-full flex">
          <button type="button" onClick={onClose} className="ml-auto text-xl" title="close">
            <i className="bi bi-x-circle-fill"></i>
          </button>
        </div>

        <div className="flex w-full rounded-xl px-[5%] max-md:px-2 min-h-[300px] max-h-[90%] h-full">
          <div className="relative bg-black min-w-full min-h-full overflow-clip rounded-md">
            <iframe
              className="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] w-full h-full"
              src="https://www.youtube.com/embed/6j4fPVkA3EA?si=llcTrXPRM-MRXDZB&controls=0&rel=0&showinfo=0&autoplay=1&loop=1&mute=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoModal
