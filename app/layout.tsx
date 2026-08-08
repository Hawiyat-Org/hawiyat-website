import type React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Hawiyat";
const SITE_URL = "https://www.hawiyat.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `AI Provider in Algeria and Hawiyat Composer | ${APP_NAME}`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "AI services in Algeria for developers and businesses: Hawiyat Composer, AI subscriptions in DZD, automation, hosting, and local support.",
  applicationName: APP_NAME,
  keywords: [
    "paas", "platform as service", "paas algerien", "paas dz", "dz paas",
    "platform as a service in algeria", "platform as a service dz",
    "scalability dz", "deploy dz", "vps algerie", "vps dz", "hebergement algerie",
    APP_NAME, "cloud deployment", "serverless", "CI/CD", "edge network",
    "managed databases", "DevOps", "web applications", "global deployment",
    "developer tools", "hebergement web algerie", "hebergeur algerien",
    "serveur vps algerie", "vps pas cher algerie", "hebergement site web algerie",
    "serveur dedie algerie", "vps algerie prix", "cloud vps algerie",
    "hebergement professionnel algerie", "hebergeur vps algerien",
    "machine virtuelle algerie", "hebergement vps algerie", "vps local algerie",
    "hebergement web local", "vps illimité algerie", "hebergement vps web",
    "heberger site en algerie",
    // AI-first keywords
    "ai gateway", "llm gateway", "ai infrastructure algeria", "reduce ai costs",
    "llm caching", "model routing dz", "ai platform algeria", "hawiyat composer",
    "llm gateway dz", "ai algerie", "intelligence artificielle algerie",
    // Entity alias phrasings (machine-readable; used by AI search & engines)
    "Algeria's AI Provider", "Algeria AI Provider", "AI provider in Algeria",
    "AI in Algeria", "B2B AI Algeria", "AI provider algeria", "fournisseur IA algerie",
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
    title: `${APP_NAME}: Built to Ship`,
    description:
      "AI services in Algeria: Hawiyat Composer, subscriptions in DZD, automation, hosting, and local technical support.",
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
    title: `${APP_NAME}: Built to Ship`,
    description:
      "AI services in Algeria: Hawiyat Composer, subscriptions in DZD, automation, hosting, and local technical support.",
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
    "Algeria's AI Provider",
    "Algeria AI Provider",
    "AI Provider in Algeria",
    "AI in Algeria",
    "B2B AI Algeria",
    "AI provider algerie",
    "Fournisseur IA en Algérie",
    "مزود الذكاء الاصطناعي في الجزائر",
  ],
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  keywords: [
    "Algeria's AI Provider",
    "Algeria AI Provider",
    "AI provider in Algeria",
    "AI in Algeria",
    "B2B AI Algeria",
    "AI provider algeria",
    "fournisseur IA algerie",
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
      className={`${space.variable} antialiased`}
    >
      <head>
        {/*
          AUDIT NOTE: full Bootstrap Icons CDN stylesheet loaded site-wide
          for what's likely a handful of icons. lucide-react is already in
          your dependency tree elsewhere in the app (tree-shakeable, no
          extra network origin, no unused icon payload). Recommend
          replacing bootstrap-icons usages with lucide-react and removing
          this stylesheet entirely once migrated.
        */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/font/bootstrap-icons.min.css"
          integrity="sha512-dPXYcDub/aeb08c63jRq/k6GaKccl256JQy/AnOq7CAnEZ9FzSL9wSbcZkMp4R26vBsMLFYH4kQ67/bbV8XaCQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

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
      <body className="min-h-screen flex flex-col hero-bg-gradient text-black dark:bg-black dark:text-white font-sans">
        {/* accessibility: skip link */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 bg-white dark:bg-black p-2 rounded shadow"
        >
          Skip to content
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <main id="content" className="flex-1 hero-bg-gradient">
            <Header />
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