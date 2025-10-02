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

export const metadata: Metadata = {
  metadataBase: new URL('https://hawiyat.org'),
  title: {
    default: 'Hawiyat Deploy & Scale Your Apps',
    template: '%s | Hawiyat',
  },
  description: 'Hawiyat is an all-in-one platform for developers to deploy, manage, and scale applications globally with serverless functions, managed databases, CI/CD, and edge networking.',
  applicationName: 'Hawiyat Platform',
  keywords: [
    'vps algerie', 'vps dz', 'hebergement agl', 'Hawiyat', 'cloud deployment',
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
    { name: 'Hawiyat Team', url: 'https://hawiyat.org' }
  ],
  creator: 'Hawiyat Team',
  publisher: 'Hawiyat',
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
    title: 'Hawiyat Deploy & Scale Your Apps',
    description: 'All-in-one platform for deploying, managing, and scaling web applications with global edge infrastructure.',
    url: 'https://hawiyat.org',
    siteName: 'Hawiyat',
    images: [
      {
        url: 'https://hawiyat.org/hawiyat.png',
        width: 2000,
        height: 2000,
        alt: 'Hawiyat Platform',
      }
    ],
    locale: 'en_DZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hawiyat Deploy & Scale Your Apps',
    description: 'Your central hub for cloud deployments, serverless functions, and edge scaling.',
    images: ['https://hawiyat.org/hawiyat.png'],
    creator: '@hawiyat',
  },
  alternates: {
    canonical: 'https://hawiyat.org',
    languages: {
      'en-US': 'https://hawiyat.org',
      'fr-DZ': 'https://hawiyat.org/fr'
    }
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/logo.ico',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  manifest: '/site.webmanifest',
  other: {
    'application/ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Hawiyat",
      "url": "https://hawiyat.org",
      "logo": "https://hawiyat.org/logo.svg",
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
  },
  viewport: 'width=device-width, initial-scale=1.0'
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
