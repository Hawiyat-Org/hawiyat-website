import type React from "react"
import type { Metadata } from "next"
import { Inter, Dancing_Script, Ubuntu } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import LayoutWrapper from "@/components/layout-wrapper"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-ubuntu",
})

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dancing",
})

export const metadata: Metadata = {
  title: "All your AI models in one place - Try Pixa Playground",
  description: "Get all your AI models and tools in one place",
  openGraph: {
    title: "All your AI models in one place - Try Pixa Playground",
    description: "Get all your AI models and tools in one place",
    type: "website",
    url: "https://github.com/PaulleDemon",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${ubuntu.variable} ${dancingScript.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/font/bootstrap-icons.min.css"
          integrity="sha512-dPXYcDub/aeb08c63jRq/k6GaKccl256JQy/AnOq7CAnEZ9FzSL9wSbcZkMp4R26vBsMLFYH4kQ67/bbV8XaCQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-white text-black dark:bg-black dark:text-white font-ubuntu">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
