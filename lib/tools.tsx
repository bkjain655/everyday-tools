import type { ReactNode } from "react"
import {
  FileText,
  FileImage,
  Hash,
  Fingerprint,
  Dice5,
  QrCode,
  Key,
  Percent,
  Calculator,
  Ruler,
  Clock,
  Calendar,
  BarChart,
  Palette,
  Binary,
  ImageIcon,
} from "lucide-react"
import { toolsMeta } from "./tools-meta"

// Icons keyed by href, kept separate from the pure metadata in tools-meta.ts.
const icons: Record<string, ReactNode> = {
  "/tools/ocr": <FileText className="h-4 w-4" />,
  "/tools/image-to-base64": <FileImage className="h-4 w-4" />,
  "/tools/image-converter": <ImageIcon className="h-4 w-4" />,
  "/tools/character-counter": <Hash className="h-4 w-4" />,
  "/tools/uuid-generator": <Fingerprint className="h-4 w-4" />,
  "/tools/random-number": <Dice5 className="h-4 w-4" />,
  "/tools/qr-code": <QrCode className="h-4 w-4" />,
  "/tools/jwt-decoder": <Key className="h-4 w-4" />,
  "/tools/interest-calculator": <Percent className="h-4 w-4" />,
  "/tools/loan-calculator": <Calculator className="h-4 w-4" />,
  "/tools/metric-converter": <Ruler className="h-4 w-4" />,
  "/tools/time-zone": <Clock className="h-4 w-4" />,
  "/tools/date-calculator": <Calendar className="h-4 w-4" />,
  "/tools/hash-generator": <BarChart className="h-4 w-4" />,
  "/tools/color-converter": <Palette className="h-4 w-4" />,
  "/tools/base-converter": <Binary className="h-4 w-4" />,
}

export const tools = toolsMeta.map((meta) => ({ ...meta, icon: icons[meta.href] }))
