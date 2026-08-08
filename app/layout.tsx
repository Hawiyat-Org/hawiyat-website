import type React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";

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
const SITE_URL = "https://www.hawiyat.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Hawiyat AI Composer | Execution Layer for Business AI`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "Execution layer between frontier AI models and business systems. Hawiyat Composer routes each task to the best model, context, and tools. Priced in DZD.",
  applicationName: APP_NAME,
  keywords: [
    APP_NAME, "cloud deployment", "serverless", "CI/CD", "edge network",
    "scalability dz", "deploy dz", "managed databases", "DevOps",
    "web applications", "global deployment", "developer tools",
    // AI infrastructure / execution-layer keywords
    "ai gateway", "llm gateway", "ai infrastructure algeria", "execution layer",
    "ai execution layer", "model gateway", "model routing dz", "ai platform algeria",
    "hawiyat ai composer", "llm gateway dz", "ai algerie", "intelligence artificielle algerie",
    // Entity alias phrasings (machine-readable; used by AI search & engines)
    "ai infrastructure algeria", "ai execution layer algeria", "AI infrastructure in Algeria",
    "execution layer in Algeria", "AI execution layer in Algeria", "AI en Algérie", "infrastructure IA algérie", "البنية التحتية للذكاء الاصطناعي في الجزائر",
    // Model keywords all major providers
    "gpt-4o", "gpt-4o-mini", "gpt-4", "gpt-4-turbo", "gpt-3.5-turbo", "o1", "o1-mini", "o3", "o3-mini",
    "claude", "claude 4", "claude 3.5 sonnet", "claude opus", "claude sonnet", "claude haiku",
    "gemini", "gemini 2.5 pro", "gemini 2.0 flash", "gemini 1.5 pro", "gemini 1.5 flash",
    "llama", "llama 4", "llama 3", "meta llama",
    "deepseek", "deepseek v3", "deepseek r1",
    "mistral", "mistral large", "mistral small",
    "openai models", "anthropic models", "google models", "meta models",
  ],
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
    title: `${APP_NAME} — AI Execution Layer`,
    description:
      "Hawiyat AI Composer — the execution layer between frontier AI models and your business systems. Model-independent, priced in DZD, supported in Algeria.",
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
    // Primary audience is Algerian developers/businesses: French is the
    // most common working language, with English and Arabic as alternates.
    locale: "fr_DZ",
    alternateLocale: ["en_US", "ar_DZ"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} — AI Execution Layer`,
    description:
      "Hawiyat AI Composer — the execution layer between frontier AI models and your business systems. Model-independent, priced in DZD, supported in Algeria.",
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
  foundingLocation: {
    "@type": "Place",
    name: "Algiers, Algeria",
  },
  sameAs: [
    "https://www.linkedin.com/company/hawiyat",
    "https://github.com/Hawiyat-Org",
    "https://x.com/hawiyat",
    "https://instagram.com/hawiyat.cloud",
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
        {/* accessibility: skip link — targets #content, which sits BELOW
            the header in DOM order, so keyboard users actually skip navigation */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 bg-surface text-ink border border-border p-2 rounded-md shadow focus:ring-2 focus:ring-signal/60"
        >
          Skip to content
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Header />
          <main id="content" className="flex-1">
            {children}
          </main>

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