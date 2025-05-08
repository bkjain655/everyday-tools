import type { Metadata } from "next"
import ContactUs from "@/components/ui/contactus";
import { SITE_URL } from "@/lib/constants";

// At the top of your app/contact-us/page.tsx
export const metadata: Metadata = {
    title: "Contact Us - Everyday Tools | Get in Touch",
    description: "Have questions, feedback, or suggestions? Contact Everyday Tools. We're here to help with all your tool needs!",
    keywords: [
      "Contact Everyday Tools",
      "Everyday Tools support",
      "Connect with Everyday Tools",
      "Everyday tool feedback",
      "Everyday Tools queries",
      "Everyday Tools contact",
      "Reach Everyday Tools",
      "Everyday Tools email",
      "Support Everyday Tools"
    ],
    openGraph: {
        title: "Contact Us - Everyday Tools | Get in Touch",
        description: "Have questions, feedback, or suggestions? Contact Everyday Tools. We're here to help with all your JSON tool needs!",
        url: `${SITE_URL}/contact-us`,
        siteName: "Everyday Tools",
        type: "website",
    },
}

export default function ContactUsPage() {
  return <ContactUs />
}

