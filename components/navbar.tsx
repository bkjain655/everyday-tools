"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { tools } from "@/lib/tools"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const pages = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2 ml-4">
          <Link href="/" aria-label="Everyday Tools" className="flex items-center space-x-2">
            <Image src="/favicon/android-chrome-192x192.png" alt="" width={40} height={40} sizes="40px" priority />
            <span className="font-bold text-xl hidden sm:inline-block">Everyday Tools</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px]">
                  {tools.map((tool) => (
                    <li key={tool.name}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={tool.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            pathname === tool.href ? "bg-accent text-accent-foreground" : "",
                          )}
                        >
                          <div className="text-sm font-medium leading-none">{tool.name}</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {pages.map((page) => (
              <NavigationMenuItem key={page.name}>
                <Link href={page.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {page.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
        
        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 grid grid-cols-2 gap-2">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-md",
                  pathname === tool.href
                    ? "bg-secondary text-secondary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {tool.icon}
                <span>{tool.name}</span>
              </Link>
            ))}
          </div>
          <div className="container py-4 grid grid-cols-2 gap-2">
            {pages.map((page) => (
              <Link
                key={page.name}
                href={page.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-md",
                  pathname === page.href
                    ? "bg-secondary text-secondary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {page.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
