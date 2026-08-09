import { Loader2 } from "lucide-react"

export default function LoadingSpinner() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-[50vh] items-center justify-center"
    >
      <Loader2
        className="h-8 w-8 animate-spin motion-reduce:animate-none text-signal"
        aria-hidden
      />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
