import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">About us</h1>
        <p className="text-xl text-muted-foreground">A collection of useful tools for developers and everyday users</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
          <CardDescription>Simplifying everyday tasks with accessible tools</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Everyday Tools was created to provide a comprehensive set of utilities that developers and everyday users need,
            all in one place. Our goal is to eliminate the need to search for and trust multiple websites for simple
            tasks like generating UUIDs, converting colors, or calculating loan payments.
          </p>
          <p>We believe that these tools should be:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Free and accessible</strong> - Available to everyone without paywalls or subscriptions
            </li>
            <li>
              <strong>Privacy-focused</strong> - All processing happens in your browser, no data is sent to our servers
            </li>
            <li>
              <strong>Fast and reliable</strong> - Built with modern web technologies for optimal performance
            </li>
            <li>
              <strong>Open source</strong> - Transparent and community-driven development
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
          <CardDescription>What makes Everyday Tools special</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Developer Tools</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>UUID Generator</li>
                <li>JWT Decoder</li>
                <li>Hash Generator</li>
                <li>Base Converter</li>
                <li>QR Code Generator</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Everyday Utilities</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>OCR Text Extraction</li>
                <li>Character Counter</li>
                <li>Metric Converter</li>
                <li>Date Calculator</li>
                <li>Time Zone Converter</li>
                <li>Financial Calculators</li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Technical Details</h3>
            <p>
              Everyday Tools is built with Next.js 14, Tailwind CSS, and React, providing a fast and responsive experience
              across all devices. We use client-side processing for all tools, ensuring your data never leaves your
              browser.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Get Started</CardTitle>
          <CardDescription>Explore our collection of tools</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Ready to explore? Check out our collection of tools and start simplifying your workflow today.
          </p>
          <Link href="/" className="inline-block">
            <div className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
              Browse Tools
            </div>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
