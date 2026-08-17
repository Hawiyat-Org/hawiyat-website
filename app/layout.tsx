import type React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { SITE_URL } from "@/lib/seo";

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Hawiyat";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Hawiyat AI Composer | AI Infrastructure in Algeria`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "Hawiyat is the AI provider in Algeria — LLM API access to GPT, Claude, Gemini, and open models through the Composer execution layer, priced in DZD with local support.",
  applicationName: APP_NAME,
  authors: [{ name: `${APP_NAME} Team`, url: SITE_URL }],
  creator: `${APP_NAME} Team`,
  publisher: APP_NAME,
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: `${APP_NAME} | AI Execution Layer`,
    description:
      "Hawiyat AI Composer, the execution layer between frontier AI models and your business systems. Model-independent, priced in DZD, supported in Algeria.",
    url: SITE_URL,
    siteName: APP_NAME,
    images: [
      {
        url: `${SITE_URL}/hawiyat.png`,
        width: 2000,
        height: 2000,
        alt: `${APP_NAME} Platform`,
      },
    ],
    // Content is English; French and Arabic are support languages.
    locale: "en_US",
    alternateLocale: ["fr_DZ", "ar_DZ"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} | AI Execution Layer`,
    description:
      "Hawiyat AI Composer, the execution layer between frontier AI models and your business systems. Model-independent, priced in DZD, supported in Algeria.",
    images: [`${SITE_URL}/hawiyat.png`],
    creator: "@hawiyat",
  },
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favlogo.ico",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  other: {
    // AUDIT NOTE: split into two schema blocks below via <script> tags in
    // <head> instead  WebSite and Organization are different types and
    // contactPoint is not a valid WebSite property. See <head> below.
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: APP_NAME,
  url: SITE_URL,
};

// Organization schema, split out from WebSite per schema.org spec.
// contactPoint, logo, and sameAs belong here, not on WebSite.
// AUDIT NOTE: fill in foundingDate / foundingLocation if you want to
// strengthen the "Built in Algeria" / "Founded in Algiers" trust signal for
// Knowledge Panel eligibility.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: APP_NAME,
  alternateName: [
    "Hawiyat",
    "AI infrastructure Algeria",
    "AI execution layer Algeria",
    "AI infrastructure in Algeria",
    "Execution layer in Algeria",
    "AI en Algérie",
    "البنية التحتية للذكاء الاصطناعي في الجزائر",
  ],
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  keywords: [
    "AI infrastructure Algeria",
    "AI execution layer Algeria",
    "AI infrastructure in Algeria",
    "Execution layer in Algeria",
  ],
  foundingDate: "2025",
  foundingLocation: {
    "@type": "Place",
    name: "Algiers, Algeria",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Algiers",
    addressCountry: "DZ",
  },
  email: "contact@hawiyat.org",
  sameAs: [
    "https://www.linkedin.com/company/hawiyat",
    "https://github.com/Hawiyat-Org",
    "https://instagram.com/hawiyat.cloud",
    "https://www.youtube.com/@Hawiyat",
    "https://www.facebook.com/people/Hawiyat/61577698462110/",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+213-55-955-5951",
      contactType: "Customer Support",
      areaServed: "DZ",
      availableLanguage: ["English", "French", "Arabic"],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${space.variable} ${mono.variable} antialiased`}
    >
      <head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light dark" />
        <link rel="alternate" type="text/plain" href="/llms.txt" />


        {/* Organization + WebSite structured data, split per schema.org spec */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-paper text-ink dark:bg-paper font-sans">
        {/* accessibility: skip link targets #content, which sits BELOW
            the header in DOM order, so keyboard users actually skip navigation */}
        <Link
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 bg-surface text-ink border border-border p-2 rounded-md shadow focus:ring-2 focus:ring-signal/60"
        >
          Skip to content
        </Link>

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Header />
          <main id="content" tabIndex={-1} className="flex-1">
            {children}
          </main>

          <Footer />

          <noscript>
            <div className="p-2 text-sm bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100">
              This site works best with JavaScript enabled.
            </div>
          </noscript>
        </ThemeProvider>

        {/*
          Meta Pixel deferred to lazyOnload so it does not block the main
          thread during page load (was afterInteractive, still after interactive
          but after ALL resources are loaded).
        */}
        <Script id="meta-pixel" strategy="lazyOnload">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '1489709689056564');fbq('track', 'PageView');`}
        </Script>
      </body>
    </html>
  );
}