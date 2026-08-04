// Pure tool metadata — no JSX, so it's safe to import in tests, server helpers,
// and sitemap generation. lib/tools.tsx attaches the icons for UI use.

export interface ToolMeta {
  name: string
  description: string
  href: string
  category: string
}

export const toolsMeta: ToolMeta[] = [
  { name: "OCR Tool", description: "Extract text from images", href: "/tools/ocr", category: "Image" },
  { name: "Image to Base64", description: "Convert images to base64 encoding", href: "/tools/image-to-base64", category: "Image" },
  { name: "Image Converter", description: "Convert between image formats", href: "/tools/image-converter", category: "Image" },
  { name: "Character Counter", description: "Count characters, words, and lines in text", href: "/tools/character-counter", category: "Utility" },
  { name: "UUID Generator", description: "Generate random UUIDs", href: "/tools/uuid-generator", category: "Developer" },
  { name: "Random Number", description: "Generate random numbers with custom ranges", href: "/tools/random-number", category: "Developer" },
  { name: "QR Code Generator", description: "Create QR codes from text or URLs", href: "/tools/qr-code", category: "Developer" },
  { name: "JWT Decoder", description: "Decode and verify JWT tokens", href: "/tools/jwt-decoder", category: "Developer" },
  { name: "Interest Calculator", description: "Calculate simple and compound interest", href: "/tools/interest-calculator", category: "Finance" },
  { name: "Loan EMI Calculator", description: "Calculate loan EMIs and payment schedules", href: "/tools/loan-calculator", category: "Finance" },
  { name: "Metric Converter", description: "Convert between different units of measurement", href: "/tools/metric-converter", category: "Utility" },
  { name: "Time Zone Converter", description: "Convert times between different time zones", href: "/tools/time-zone", category: "Utility" },
  { name: "Date Calculator", description: "Calculate differences between dates", href: "/tools/date-calculator", category: "Utility" },
  { name: "Hash Generator", description: "Generate MD5, SHA-1, SHA-256 hashes", href: "/tools/hash-generator", category: "Developer" },
  { name: "Color Converter", description: "Convert between HEX, RGB, HSL color formats", href: "/tools/color-converter", category: "Design" },
  { name: "Base Converter", description: "Convert numbers between different bases", href: "/tools/base-converter", category: "Developer" },
]
