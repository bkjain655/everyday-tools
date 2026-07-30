import { ImageResponse } from "next/og"

export const alt = "Everyday Tools - Free Online Utility Tools for Everyone"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #0b3b5c 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#7dd3fc",
          }}
        >
          everydaytools
        </div>
        <div style={{ display: "flex", fontSize: 88, fontWeight: 700, marginTop: 24, lineHeight: 1.05 }}>
          Everyday Tools
        </div>
        <div style={{ display: "flex", fontSize: 36, marginTop: 24, color: "#cbd5e1", maxWidth: 900 }}>
          Free, private, browser-based utilities for developers and everyday users.
        </div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 48, color: "#94a3b8" }}>
          OCR · Converters · Calculators · Generators
        </div>
      </div>
    ),
    size,
  )
}
