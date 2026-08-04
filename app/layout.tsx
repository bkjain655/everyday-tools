import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Script from "next/script";
import { GA_TRACKING_ID } from "@/lib/gtag_utils"
import { GoogleAnalyticsProvider } from "@/hooks/GoogleAnalyticsProvider"
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ToasterWrapper } from "@/components/toaster-wrapper"
import { AppCommandPalette } from "@/components/app-command-palette"
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
        {GA_TRACKING_ID && (
          <>
            <Script id="ga-analytics"
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}>
            </Script>
            <Script id="ga-analytics-init" strategy="afterInteractive">
                {
                    // send_page_view: false - GoogleAnalyticsProvider owns pageviews,
                    // including the initial one, so they are not counted twice.
                    `window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}', { send_page_view: false });`
                }
            </Script>
          </>
        )}
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lg focus:ring-2 focus:ring-ring"
            >
              Skip to content
            </a>
            <Navbar />
            <main id="main-content" className="flex-1 container mx-auto px-4 py-6">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <SpeedInsights />
        {GA_TRACKING_ID && <GoogleAnalyticsProvider />}
        <Analytics />
        <ToasterWrapper />
        <AppCommandPalette />
      </body>
    </html>
  )
}