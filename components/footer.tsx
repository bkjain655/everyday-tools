import Image from "next/image";
import Link from "next/link"
import { AUTHOR_NAME, AUTHOR_URL, JSONFORGE_URL } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-evenly gap-6 md:flex-row text-center">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Image src="/favicon/android-chrome-192x192.png" alt="" width={40} height={40} sizes="40px" />
          <span className="text-sm font-semibold">Everyday Tools</span>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <Link href="/about" className="hover:underline">
            About Us
          </Link>
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="hover:underline">
            Terms & Conditions
          </Link>
          <Link href="/contact-us" className="hover:underline">
            Contact Us
          </Link>
          <a href={JSONFORGE_URL} target="_blank" rel="noopener noreferrer" className="hover:underline">
            JSONForge
          </a>
        </div>

        {/* Copyright Section */}
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>&copy; {currentYear} Everyday Tools. All rights reserved.</p>
          <p>
            Built by{" "}
            <a href={AUTHOR_URL} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
              {AUTHOR_NAME}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
