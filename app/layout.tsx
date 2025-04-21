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
import { ToasterWrapper } from "@/components/toaster-wrapper"
import { genericMetadata } from "@/lib/metadata_constants"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = genericMetadata

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