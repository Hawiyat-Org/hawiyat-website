import type { Metadata } from "next"

export const SITE_URL = "https://www.hawiyat.org"
export const SITE_NAME = "Hawiyat"

export function createMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: `/${string}` | "/"
}): Metadata {
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
      images: [{ url: "/hawiyat.png", width: 2000, height: 2000, alt: "Hawiyat AI services in Algeria" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/hawiyat.png"],
    },
  }
}
