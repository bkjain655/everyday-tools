import { Metadata } from "next";
import Script from "next/script";
import { ocrMetadata } from "@/lib/metadata_constants";
import { PDFJS_CDN_BASE } from "@/lib/ocr_utils/PerformOCR";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolContent } from "@/components/tool-content";
import { OcrToolLayout } from "./OcrToolLayout";

export const metadata: Metadata = ocrMetadata;
export default function OcrToolPage() {
  return (
    <>
      <ToolJsonLd href="/tools/ocr" />
      {/* pdf.js (~1 MB) is only needed for PDF input, so it is scoped to this route
          and deferred until the page is idle. */}
      <Script
        id="pdfjs-core"
        src={`${PDFJS_CDN_BASE}/pdf.min.js`}
        strategy="lazyOnload"
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <OcrToolLayout />
      <ToolContent href="/tools/ocr" />
    </>
  )
}
