import { Metadata } from "next";
import { SITE_URL } from "./constants";

// Generic metadata applicable to all pages
  export const genericMetadata: Metadata = {
    title: "Everyday Tools - Free Online Utility Tools for Everyone",
    description:
      "A powerful collection of free online tools for daily tasks including OCR, calculators, formatters, converters, and more. Designed for developers and everyday users alike.",
    keywords:
      "online tools, everyday tools, OCR, UUID generator, QR code, calculator, image to text, base64, color converter, hash generator, EMI calculator, date calculator",
    authors: [{ name: "BKJ Labs" }],
    creator: "Bhavesh Kumar",
    publisher: "BKJ Labs",
    metadataBase: new URL(SITE_URL),
    // Google Search Console "HTML tag" verification (unset = no tag emitted).
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    alternates: {
      canonical: "/",
    },
    icons: "/favicon/favicon.ico",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SITE_URL,
      title: "Everyday Tools - Free Online Utility Tools for Everyone",
      description:
        "Use Everyday Tools to simplify your daily tasks — from OCR to interest calculators, all in one place. Perfect for devs and non-tech users alike.",
      siteName: "Everyday Tools",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Everyday Tools - Free Online Utility Tools for Everyone",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Everyday Tools - Free Online Utility Tools for Everyone",
      description:
        "Access powerful online tools like OCR, image converters, calculators, QR generators, and more with Everyday Tools.",
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
  
  // Tool-specific metadata
  export const uuidMetadata = {
    title: "UUID Generator - Generate UUID v1, v4 Online | Everyday Tools",
    description: "Create random UUIDs instantly using our online UUID Generator. Supports UUID v1 and v4 with copy and reset features.",
    keywords: "UUID generator, online UUID, generate UUID v1, UUID v4 tool, random UUID, unique identifier",
    alternates: {
      canonical: "/tools/uuid-generator",
    },
  };
  
  export const qrCodeMetadata = {
    title: "QR Code Generator - Free Online QR Code Creator | Everyday Tools",
    description: "Generate custom QR codes for text, URLs, and more. Download your QR code instantly and use it anywhere.",
    keywords: "QR code generator, generate QR code, online QR, QR for URL, QR code image, free QR code maker",
    alternates: {
      canonical: "/tools/qr-code",
    },
  };
  
  export const jwtDecoderMetadata = {
    title: "JWT Decoder - Decode JWT Tokens Online | Everyday Tools",
    description: "Decode and inspect JWT headers, payloads and claims entirely in your browser. Nothing is uploaded.",
    keywords: "JWT decoder, decode JWT, token decoder, JWT inspector, JWT claims viewer",
    alternates: {
      canonical: "/tools/jwt-decoder",
    },
  };
  
  export const ocrMetadata = {
    title: "OCR Online - Extract Text from Images | Everyday Tools",
    description: "Convert images to text instantly using our powerful OCR tool. Supports JPG, PNG, and more.",
    keywords: "OCR tool, image to text, extract text from image, online OCR, JPG to text, PNG to text",
    alternates: {
      canonical: "/tools/ocr",
    },
  };
  
  
  export const emiMetadata = {
    title: "Loan EMI Calculator - Calculate EMI Instantly | Everyday Tools",
    description: "Calculate your monthly loan EMI, interest payable, and amortization schedule using our easy EMI calculator.",
    keywords: "EMI calculator, loan calculator, interest calculator, amortization, home loan EMI, car loan EMI",
    alternates: {
      canonical: "/tools/loan-calculator",
    },
  };
  
  export const baseConverterMetadata = {
    title: "Base Converter - Convert Number Bases Online | Everyday Tools",
    description: "Easily convert numbers between binary, decimal, octal, and hexadecimal formats using our base converter tool.",
    keywords: "base converter, binary to decimal, hex to binary, octal to decimal, number base conversion",
    alternates: {
      canonical: "/tools/base-converter",
    },
  };
  
  export const hashGeneratorMetadata = {
    title: "Hash Generator - Create MD5, SHA Hashes Online | Everyday Tools",
    description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes quickly and securely for your input strings.",
    keywords: "hash generator, MD5 hash, SHA256 generator, online hash tool, secure hash",
    alternates: {
      canonical: "/tools/hash-generator",
    },
  };
  
  export const imageToBase64Metadata = {
    title: "Image to Base64 Converter - Online Tool | Everyday Tools",
    description: "Convert images to Base64 format instantly with our free online tool. Supports JPG, PNG, and more.",
    keywords: "image to base64, base64 converter, convert image to base64, PNG to base64, JPG to base64",
    alternates: {
      canonical: "/tools/image-to-base64",
    },
  };
  
  export const characterCounterMetadata = {
    title: "Character Counter - Count Characters, Words & More | Everyday Tools",
    description: "Count characters, words, and lines in your text using our simple online character counter tool.",
    keywords: "character counter, word counter, online text counter, text length calculator",
    alternates: {
      canonical: "/tools/character-counter",
    },
  };
  
  export const interestCalculatorMetadata = {
    title: "Interest Calculator - Simple & Compound Interest | Everyday Tools",
    description: "Calculate simple and compound interest for any principal amount using our intuitive interest calculator.",
    keywords: "interest calculator, simple interest, compound interest, calculate interest",
    alternates: {
      canonical: "/tools/interest-calculator",
    },
  };
  
  export const metricConverterMetadata = {
    title: "Metric Converter - Convert Units Online | Everyday Tools",
    description: "Convert metric units like length, mass, volume, and temperature with our free unit converter.",
    keywords: "metric converter, unit conversion, convert length, convert weight, temperature converter",
    alternates: {
      canonical: "/tools/metric-converter",
    },
  };
  
  export const timeZoneConverterMetadata = {
    title: "Time Zone Converter - Convert Time Across Zones | Everyday Tools",
    description: "Easily convert time between different time zones worldwide. Great for meetings, planning, and scheduling.",
    keywords: "time zone converter, convert time, world time, timezone calculator, meeting planner",
    alternates: {
      canonical: "/tools/time-zone",
    },
  };
  
  export const dateCalculatorMetadata = {
    title: "Date Calculator - Add/Subtract Days, Find Difference | Everyday Tools",
    description: "Calculate date differences, add or subtract days, months, or years from a specific date.",
    keywords: "date calculator, add days, subtract days, date difference, date tool",
    alternates: {
      canonical: "/tools/date-calculator",
    },
  };
  
  export const colorConverterMetadata = {
    title: "Color Converter - HEX, RGB, HSL Color Conversion | Everyday Tools",
    description: "Convert color values between HEX, RGB, and HSL formats with this handy online tool.",
    keywords: "color converter, HEX to RGB, RGB to HSL, color code converter",
    alternates: {
      canonical: "/tools/color-converter",
    },
  };

  export const randomNumberGeneratorMetadata: Metadata = {
    title: "Random Number Generator - Generate Random Numbers Instantly",
    description:
      "Generate truly random numbers instantly for any range. Useful for games, simulations, or everyday decisions. Customize your min and max range with ease.",
    keywords:
      "random number generator, generate random number, number picker, randomizer, RNG, lucky number generator, number generator tool",
    alternates: {
      canonical: "/tools/random-number",
    },
  }  

  export const imageConverterMetadata: Metadata = {
    title: "Free Online Image Converter | Convert PNG, JPG, WEBP, HEIC | EverydayTools",
    description:
      "Convert images between PNG, JPG, WEBP and HEIC. Free online image converter with no watermarks or registration required. All processing happens in your browser for complete privacy.",
    keywords:
      "image converter, png to jpg, jpg to png, webp converter, heic converter, image format converter, online image converter, free image converter, convert heic to jpg, convert webp to jpg",
    openGraph: {
      title: "Free Online Image Converter | Convert PNG, JPG, WEBP, HEIC | Everyday Tools",
      description:
        "Convert images between PNG, JPG, WEBP and HEIC. Free online tool with no watermarks or registration.",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Free Online Image Converter | Convert PNG, JPG, WEBP, HEIC",
      description:
        "Convert images between PNG, JPG, WEBP and HEIC. Free online tool with no watermarks.",
      images: ["/opengraph-image"],
      site: SITE_URL,
    },
    alternates: {
      canonical: "/tools/image-converter",
    }
  }