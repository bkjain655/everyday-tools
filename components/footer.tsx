import Image from "next/image";
import Link from "next/link"
import { AUTHOR_NAME, AUTHOR_URL, JSONFORGE_URL } from "@/lib/constants";

const footerLinks = [
  { name: "About", href: "/about" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms-and-conditions" },
  { name: "Contact", href: "/contact-us" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-start">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <Image src="/favicon/android-chrome-192x192.png" alt="" width={32} height={32} sizes="32px" className="rounded-lg" />
            <div>
              <span className="text-sm font-semibold">Everyday Tools</span>
              <p className="text-xs text-muted-foreground">Free online utilities for everyone.</p>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
                {link.name}
              </Link>
            ))}
            <a href={JSONFORGE_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
              JSON Forge ↗
            </a>
          </nav>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground md:text-right">
            <p>&copy; {currentYear} Everyday Tools</p>
            <p className="mt-0.5">
              Built by{" "}
              <a
                href={AUTHOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {AUTHOR_NAME}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
