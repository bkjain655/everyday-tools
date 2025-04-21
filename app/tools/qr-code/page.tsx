import { Metadata } from "next";
import { qrCodeMetadata } from "@/lib/metadata_constants";
import { QrCodeGeneratorLayout } from "./QrCodeGeneratorLayout";

export const metadata: Metadata = qrCodeMetadata;
export default function QrCodeGeneratorPage() {
  return (
    <QrCodeGeneratorLayout />
  )
}
