import { Metadata } from "next";
import { imageToBase64Metadata } from "@/lib/metadata_constants";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolContent } from "@/components/tool-content";
import { ImageToBase64Layout } from "./ImageBase64Layout";

export const metadata: Metadata = imageToBase64Metadata;
export default function ImageToBase64Page() {
  return (
    <>
      <ToolJsonLd href="/tools/image-to-base64" />
      <ImageToBase64Layout />
      <ToolContent href="/tools/image-to-base64" />
    </>
  )
}
