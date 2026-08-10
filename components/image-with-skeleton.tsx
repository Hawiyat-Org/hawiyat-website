"use client"

import { useState } from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

type SkeletonImageProps = {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
  loading?: "lazy" | "eager"
  /** Classes for the wrapping box (must give it the image's dimensions). */
  className?: string
  /** Classes applied to the <img> itself. */
  imgClassName?: string
  /** Inline styles applied to the <img> itself. */
  imgStyle?: React.CSSProperties
}

export function SkeletonImage({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes,
  priority,
  loading = "lazy",
  className,
  imgClassName,
  imgStyle,
}: SkeletonImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={cn("relative overflow-hidden", fill && "h-full w-full", className)}>
      {!loaded && <Skeleton className="absolute inset-0 rounded-none" aria-hidden="true" />}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        priority={priority}
        loading={loading}
        onLoad={() => setLoaded(true)}
        className={cn(
          "transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
          imgClassName
        )}
        style={imgStyle}
      />
    </div>
  )
}

export default SkeletonImage
