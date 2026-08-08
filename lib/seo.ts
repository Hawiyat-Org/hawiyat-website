import type { Metadata } from "next"

export const SITE_URL = "https://www.hawiyat.org"
export const SITE_NAME = "Hawiyat"

export function createMetadata({
  title,
  description,
  path,
  image,
  publishedTime,
  modifiedTime,
}: {
  title: string
  description: string
  path: `/${string}` | "/"
  /** Optional service/product-specific image. Falls back to the default site image. */
  image?: string
  /** ISO date for article:published_time and OG publishedTime. */
  publishedTime?: string
  /** ISO date for article:modified_time and OG modifiedTime. */
  modifiedTime?: string
}): Metadata {
  const ogImage = image || "/hawiyat.png"

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: ogImage, width: 2000, height: 2000, alt: "Hawiyat AI services in Algeria" }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    ...(publishedTime || modifiedTime
      ? {
          other: {
            ...(publishedTime ? { "article:published_time": publishedTime } : {}),
            ...(modifiedTime ? { "article:modified_time": modifiedTime } : {}),
          },
        }
      : {}),
  }
}
