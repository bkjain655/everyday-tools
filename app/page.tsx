import { tools } from "@/lib/tools"
import { SITE_NAME, SITE_URL } from "@/lib/constants"
import { HomeLayout } from "./HomeLayout"
import { MakerCta } from "@/components/maker-cta"
import { Kbd } from "@/components/ui/kbd"

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  description:
    "A collection of free, privacy-friendly online tools for developers and everyday users — OCR, converters, calculators and generators that run entirely in your browser.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: tools.map((tool) => tool.name),
}

export default function Home() {
  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-4rem] h-[20rem] w-[36rem] -translate-x-1/2 rounded-full opacity-70 blur-[100px]"
          style={{ background: "radial-gradient(closest-side, hsl(var(--primary) / 0.18), transparent)" }}
        />
        <div className="relative mx-auto max-w-2xl py-16 text-center sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <span className="font-mono">{tools.length} tools</span> · free &amp; private
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">Everyday Tools</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            A collection of free, privacy-friendly utilities for developers and everyday users —
            everything runs right in your browser.
          </p>
          <p className="mt-6 text-sm text-muted-foreground">
            Tip: press <Kbd>⌘K</Kbd> anywhere to search tools
          </p>
        </div>
      </section>

      <section>
        <HomeLayout />
      </section>

      <MakerCta />
    </div>
  )
}
