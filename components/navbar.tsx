"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X, Search, ChevronDown, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { ModeToggle } from "@/components/mode-toggle"
import { openCommandPalette } from "@/components/app-command-palette"
import { tools } from "@/lib/tools"
import { AUTHOR_NAME, AUTHOR_URL } from "@/lib/constants"
import { cn } from "@/lib/utils"

const categories = Array.from(new Set(tools.map((t) => t.category)))

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
    setToolsOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center gap-6">
          {/* Logo */}
          <Link href="/" aria-label="Everyday Tools home" className="flex items-center gap-2.5">
            <Image src="/favicon/android-chrome-192x192.png" alt="" width={32} height={32} sizes="32px" priority className="rounded-lg" />
            <span className="text-[15px] font-semibold tracking-tight">Everyday Tools</span>
          </Link>

          {/* Desktop nav — left-aligned */}
          <nav className="hidden items-center gap-1 md:flex">
            <NavLink href="/" active={pathname === "/"}>Home</NavLink>
            <div className="relative" onMouseEnter={() => setToolsOpen(true)} onMouseLeave={() => setToolsOpen(false)}>
              <button
                className={cn(
                  "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                  pathname.startsWith("/tools") && "text-foreground",
                )}
                aria-expanded={toolsOpen}
                onClick={() => setToolsOpen((v) => !v)}
              >
                Tools <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", toolsOpen && "rotate-180")} />
              </button>
              {toolsOpen && (
                <div className="absolute left-0 top-full w-[640px] pt-2">
                  <div className="grid grid-cols-3 gap-4 rounded-xl border border-border bg-popover p-4 shadow-lg">
                    {categories.map((category) => (
                      <div key={category}>
                        <p className="mb-1 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{category}</p>
                        {tools.filter((t) => t.category === category).map((tool) => (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            className={cn(
                              "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                              pathname === tool.href && "bg-secondary text-foreground",
                            )}
                          >
                            <span className="text-muted-foreground">{tool.icon}</span>
                            {tool.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right cluster */}
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={openCommandPalette}
              aria-label="Open command palette"
              className="hidden h-9 items-center gap-2 rounded-md border border-border bg-secondary/60 px-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:flex"
            >
              <Search className="h-4 w-4" />
              <span className="hidden lg:inline">Search…</span>
              <Kbd>⌘K</Kbd>
            </button>

            <a
              href={AUTHOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground lg:flex"
            >
              Built by {AUTHOR_NAME}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <ModeToggle />

            <div className="md:hidden">
              <Button variant="outline" size="icon" aria-label="Toggle menu" onClick={() => setMobileOpen((v) => !v)}>
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">Home</Link>
            {categories.map((category) => (
              <div key={category}>
                <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{category}</p>
                {tools.filter((t) => t.category === category).map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground",
                      pathname === tool.href && "bg-secondary text-foreground",
                    )}
                  >
                    {tool.icon}
                    {tool.name}
                  </Link>
                ))}
              </div>
            ))}
            <a href={AUTHOR_URL} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-1 rounded-md px-3 py-2.5 text-sm font-medium text-primary">
              Built by {AUTHOR_NAME} <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

function NavLink({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
        active && "text-foreground",
      )}
    >
      {children}
    </Link>
  )
}
