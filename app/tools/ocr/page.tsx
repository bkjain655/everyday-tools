import { Metadata } from "next";
import { ocrMetadata } from "@/lib/metadata_constants";
import { OcrToolLayout } from "./OcrToolLayout";

export const metadata: Metadata = ocrMetadata;
export default function OcrToolPage() {
  return (
    <OcrToolLayout />
  )
}
