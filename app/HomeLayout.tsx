"use client";
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"
import { tools } from "@/lib/tools"
import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"

export const HomeLayout = () => {
  const categories = useMemo(() => ["ALL", ...Array.from(new Set(tools.map((t) => t.category))).sort()], [])
  const [category, setCategory] = useState("ALL")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return tools.filter((t) => {
      const inCategory = category === "ALL" || t.category === category
      const inQuery = !q || `${t.name} ${t.description}`.toLowerCase().includes(q)
      return inCategory && inQuery
    })
  }, [category, query])

  // Group the visible tools by category, preserving category order.
  const grouped = useMemo(() => {
    const order = Array.from(new Set(tools.map((t) => t.category)))
    return order
      .map((cat) => ({ cat, items: filtered.filter((t) => t.category === cat) }))
      .filter((g) => g.items.length > 0)
  }, [filtered])

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={cn(
                "rounded-full border px-3 py-1 text-sm font-medium transition-colors",
                category === cat
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              {cat === "ALL" ? "All" : cat}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            aria-label="Search tools"
            placeholder="Search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {grouped.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No tools match your search.</p>
      ) : (
        grouped.map(({ cat, items }) => (
          <div key={cat}>
            <h2 className="mb-4 text-lg font-semibold tracking-tight">{cat}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((tool) => (
                <Link key={tool.href} href={tool.href} className="group block">
                  <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                    <CardContent className="p-5">
                      <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg border border-border bg-secondary text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
                        {tool.icon}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold tracking-tight">{tool.name}</h3>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{tool.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
