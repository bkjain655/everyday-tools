import Image from "next/image";
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-evenly gap-6 md:flex-row text-center">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Image src="/favicon/android-chrome-192x192.png" alt="Logo" width={40} height={40} />
          <span className="text-sm font-semibold">Everyday Tools</span>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <Link href="/about-us" className="hover:underline">
            About Us
          </Link>
          {/* <Link href="/connect" className="hover:underline">
            Connect with Me
          </Link> */}
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="hover:underline">
            Terms & Conditions
          </Link>
          <Link href="/contact-us" className="hover:underline">
            Contact Us
          </Link>
        </div>

        {/* Copyright Section */}
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Everyday Tools. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
