import { tools } from "@/lib/tools"
import { SITE_NAME, SITE_URL } from "@/lib/constants"
import { HomeLayout } from "./HomeLayout"

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
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Everyday Tools</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A collection of useful tools for developers and everyday users
        </p>
      </section>

      <section>
        <HomeLayout />
      </section>
    </div>
  )
}
