import { SITE_URL, SITE_NAME } from "./constants"
import { toolsMeta } from "./tools-meta"

interface Crumb {
  name: string
  path: string
}

/** BreadcrumbList schema. Pass the trail from Home down to the current page. */
export function breadcrumbLd(trail: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  }
}

/** SoftwareApplication schema for an individual tool page. */
export function toolAppLd({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: `${SITE_URL}${path}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  }
}

/** Breadcrumb + SoftwareApplication for a tool, looked up from the registry by href. */
export function toolStructuredData(href: string) {
  const tool = toolsMeta.find((t) => t.href === href)
  if (!tool) return []
  return [
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: tool.name, path: href },
    ]),
    toolAppLd({ name: tool.name, description: tool.description, path: href }),
  ]
}
