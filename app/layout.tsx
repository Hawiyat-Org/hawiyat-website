import type React from "react";
import type { Metadata } from "next";
import {
  Space_Grotesk,
  Playfair_Display,
  Dancing_Script,
  Ubuntu,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import LayoutWrapper from "@/components/layout-wrapper";
import Header from "@/components/header";
const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-ubuntu",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dancing",
  display: "swap",
});

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'Hawiyat';
const NEXT_URL = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.hawiyat.org';
const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL ?? 'https://docs.hawiyat.org';

export const metadata: Metadata = {
  metadataBase: new URL(NEXT_URL),
  title: {
    default: `${APP_NAME} Deploy & Scale Your Apps`,
    template: '%s | ' + APP_NAME,
  },
  description: 'Hawiyat is an all-in-one platform for developers to deploy, manage, and scale applications globally with serverless functions, managed databases, CI/CD, and edge networking.',
  applicationName: APP_NAME,
  keywords: [
    'paas ', 'platform as service','paas algerien','paas dz','dz paas','platform as a service in algeria',
    'platform as a service dz','scalability dz','scalability soltion in algeri','deploy dz',
    'vps algerie', 'vps dz', 'hebergement agl', APP_NAME, 'cloud deployment',
    'serverless', 'CI/CD', 'edge network', 'managed databases', 'DevOps',
    'web applications', 'global deployment', 'developer tools',
    'hebergement algerie', 'hebergement web algerie', 'hebergeur algerien',
    'serveur vps algerie', 'vps pas cher algerie', 'hebergement site web algerie',
    'serveur dedie algerie', 'vps algerie prix', 'cloud vps algerie',
    'hebergement professionnel algerie', 'hebergeur vps algerien',
    'machine virtuelle algerie', 'hebergement vps algerie', 'vps local algerie',
    'hebergement web local', 'vps illimité algerie', 'hebergement vps web',
    'heberger site en algerie'
  ],
  
  authors: [
    { name: `${APP_NAME} Team`, url: NEXT_URL }
  ],
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
      "max-snippet": -1
    }
  },
  openGraph: {
    title: `${APP_NAME} Deploy & Scale Your Apps`,
    description: 'All-in-one platform for deploying, managing, and scaling web applications with global edge infrastructure.',
    url: NEXT_URL,
    siteName: APP_NAME,
    images: [
      {
        url: `${NEXT_URL}/hawiyat.png`,
        width: 2000,
        height: 2000,
        alt: `${APP_NAME} Platform`,
      }
    ],
    // use dash in locale to match common format
    locale: 'en-DZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP_NAME} Deploy & Scale Your Apps`,
    description: 'Your central hub for cloud deployments, serverless functions, and edge scaling.',
    images: [`${NEXT_URL}/hawiyat.png`],
    creator: '@hawiyat',
  },
  alternates: {
    canonical: NEXT_URL,
    languages: {
      'en-US': NEXT_URL,
      'fr-DZ': `${NEXT_URL}/fr`
    }
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: `${NEXT_URL}/logo.ico`,
    shortcut: `${NEXT_URL}/logo.svg`,
    apple: `${NEXT_URL}/logo.svg`,
  },
  manifest: `${NEXT_URL}/site.webmanifest`,
  other: {
    'application/ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": APP_NAME,
      "url": NEXT_URL,
      "logo": `${NEXT_URL}/logo.svg`,
      "sameAs": [
        "https://twitter.com/hawiyat",
        "https://github.com/Hawiyat-Corp"
      ],
      "contactPoint": [{
        "@type": "ContactPoint",
        "telephone": "+213-XX-XXX-XXXX",
        "contactType": "Customer Support",
        "areaServed": "DZ"
      }]
    })
  }
};

// Export viewport separately so Next.js App Router won't warn about unsupported viewport in metadata
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${space.variable} ${playfair.variable} ${ubuntu.variable} ${dancingScript.variable} antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/font/bootstrap-icons.min.css"
          integrity="sha512-dPXYcDub/aeb08c63jRq/k6GaKccl256JQy/AnOq7CAnEZ9FzSL9wSbcZkMp4R26vBsMLFYH4kQ67/bbV8XaCQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light dark" />
        {/* note: viewport is handled by export const viewport above - remove manual meta viewport to avoid duplication */}
      </head>
      <body className="min-h-screen flex flex-col hero-bg-gradient text-black  dark:bg-black dark:text-white font-app-sans">
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
          {/* main content anchor for skip-link */}
          <main id="content" className="flex-1 hero-bg-gradient">
            <LayoutWrapper>
         
            <Header />
              {children}
              </LayoutWrapper>
          </main>

          <noscript>
            <div className="p-2 text-sm bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100">
              This site works best with JavaScript enabled.
            </div>
          </noscript>
        </ThemeProvider>
      </body>
    </html>
  );
}
