import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import './globals.css'
import Script from "next/script";
import { GA_TRACKING_ID } from "@/lib/gtag_utils"
import { GoogleAnalyticsProvider } from "@/hooks/GoogleAnalyticsProvider"
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/toaster"
import { ToasterWrapper } from "@/components/toaster-wrapper"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DevToolbox - All-in-One Developer & User Tools",
  description:
    "Free online tools for developers and everyday users including OCR, UUID generator, QR code generator, color converter, calculators, and more.",
  keywords: "developer tools, OCR, base64, UUID generator, QR code, JWT decoder, calculator, metric conversion, hash generator",
  authors: [{ name: "BKJ Tech World" }],
  creator: "BKJ_Tech_World",
  publisher: "BKJ Tech World",
  metadataBase: new URL("https://devtoolbox.yourdomain.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devtoolbox.yourdomain.com",
    title: "DevToolbox - All-in-One Developer & User Tools",
    description: "Free online tools for developers and everyday users including OCR, UUID generator, QR code generator, JSON formatter, color converter, calculators, and more.",
    siteName: "DevToolbox",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevToolbox - All-in-One Developer & User Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevToolbox - All-in-One Developer & User Tools",
    description: "Free online tools for developers and everyday users including OCR, UUID generator, QR code generator, JSON formatter, color converter, calculators, and more.",
    images: ["/twitter-image.png"],
    creator: "@yourtwitterhandle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="ga-analytics" 
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}>
        </Script>
        <Script id="ga-analytics-init" strategy="afterInteractive">
            {
                `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });`
            }
        </Script>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1302626070893007"
          crossOrigin="anonymous"></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <SpeedInsights />
        <GoogleAnalyticsProvider />
        <Analytics />
        <ToasterWrapper />
      </body>
    </html>
  )
}