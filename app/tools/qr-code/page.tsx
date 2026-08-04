import { Metadata } from "next";
import { qrCodeMetadata } from "@/lib/metadata_constants";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { QrCodeGeneratorLayout } from "./QrCodeGeneratorLayout";

export const metadata: Metadata = qrCodeMetadata;
export default function QrCodeGeneratorPage() {
  return (
    <>
      <ToolJsonLd href="/tools/qr-code" />
      <QrCodeGeneratorLayout />
    </>
  )
}
