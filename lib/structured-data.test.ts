import { describe, it, expect } from "vitest"
import { breadcrumbLd, toolAppLd, toolStructuredData } from "./structured-data"
import { toolsMeta } from "./tools-meta"

describe("breadcrumbLd", () => {
  it("builds an ordered BreadcrumbList with absolute item URLs", () => {
    const ld = breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Hash Generator", path: "/tools/hash-generator" },
    ])
    expect(ld["@type"]).toBe("BreadcrumbList")
    expect(ld.itemListElement).toHaveLength(2)
    expect(ld.itemListElement[0]).toMatchObject({ position: 1, name: "Home" })
    expect(ld.itemListElement[1].position).toBe(2)
    expect(ld.itemListElement[1].item).toMatch(/\/tools\/hash-generator$/)
    expect(ld.itemListElement[1].item).toMatch(/^https?:\/\//)
  })
})

describe("toolAppLd", () => {
  it("produces a free SoftwareApplication schema", () => {
    const ld = toolAppLd({ name: "UUID Generator", description: "Generate UUIDs", path: "/tools/uuid-generator" })
    expect(ld["@type"]).toBe("SoftwareApplication")
    expect(ld.name).toBe("UUID Generator")
    expect(ld.applicationCategory).toBe("UtilitiesApplication")
    expect(ld.offers).toMatchObject({ price: "0", priceCurrency: "USD" })
    expect(ld.url).toMatch(/\/tools\/uuid-generator$/)
  })
})

describe("toolStructuredData", () => {
  it("returns breadcrumb + app schema for a known tool", () => {
    const [breadcrumb, app] = toolStructuredData("/tools/qr-code") as Array<Record<string, unknown>>
    expect(breadcrumb["@type"]).toBe("BreadcrumbList")
    expect(app["@type"]).toBe("SoftwareApplication")
    expect(app.name).toBe("QR Code Generator")
  })

  it("returns nothing for an unknown href", () => {
    expect(toolStructuredData("/tools/does-not-exist")).toEqual([])
  })

  it("covers every registered tool href", () => {
    for (const tool of toolsMeta) {
      expect(toolStructuredData(tool.href)).toHaveLength(2)
    }
  })
})
