"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Home, Info, Mail, Sun, Moon, Laptop } from "lucide-react"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { tools } from "@/lib/tools"

const OPEN_EVENT = "open-command-palette"

/** Open the command palette from anywhere (also reachable with ⌘K / Ctrl+K). */
export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

// Group the registry by category so the palette mirrors the site's structure.
const categories = Array.from(new Set(tools.map((t) => t.category)))

export function AppCommandPalette() {
  const router = useRouter()
  const { setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    const onOpen = () => setOpen(true)
    document.addEventListener("keydown", onKey)
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => {
      document.removeEventListener("keydown", onKey)
      window.removeEventListener(OPEN_EVENT, onOpen)
    }
  }, [])

  const run = (fn: () => void) => () => {
    setOpen(false)
    fn()
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search tools, pages, theme…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem value="home" onSelect={run(() => router.push("/"))}>
            <Home className="mr-2 h-4 w-4" /> Home
          </CommandItem>
        </CommandGroup>

        {categories.map((category) => (
          <CommandGroup key={category} heading={`${category} tools`}>
            {tools
              .filter((t) => t.category === category)
              .map((tool) => (
                <CommandItem
                  key={tool.href}
                  value={`${tool.name} ${tool.description} ${tool.category}`}
                  onSelect={run(() => router.push(tool.href))}
                >
                  <span className="mr-2 flex h-4 w-4 items-center justify-center">{tool.icon}</span>
                  {tool.name}
                </CommandItem>
              ))}
          </CommandGroup>
        ))}

        <CommandGroup heading="Pages">
          <CommandItem value="about" onSelect={run(() => router.push("/about"))}>
            <Info className="mr-2 h-4 w-4" /> About
          </CommandItem>
          <CommandItem value="contact" onSelect={run(() => router.push("/contact-us"))}>
            <Mail className="mr-2 h-4 w-4" /> Contact
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Theme">
          <CommandItem value="light theme" onSelect={run(() => setTheme("light"))}>
            <Sun className="mr-2 h-4 w-4" /> Light theme
          </CommandItem>
          <CommandItem value="dark theme" onSelect={run(() => setTheme("dark"))}>
            <Moon className="mr-2 h-4 w-4" /> Dark theme
          </CommandItem>
          <CommandItem value="system theme" onSelect={run(() => setTheme("system"))}>
            <Laptop className="mr-2 h-4 w-4" /> System theme
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
