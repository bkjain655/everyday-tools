import { JsonLd } from "@/components/json-ld"
import { toolStructuredData } from "@/lib/structured-data"

/**
 * Emits BreadcrumbList + SoftwareApplication JSON-LD for a tool page, resolved
 * from the tools registry by href. Server-rendered, so it lands in crawled HTML.
 */
export function ToolJsonLd({ href }: { href: string }) {
  return (
    <>
      {toolStructuredData(href).map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}
    </>
  )
}
