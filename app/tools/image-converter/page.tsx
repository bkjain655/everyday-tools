import { Metadata } from "next";
import { imageConverterMetadata } from "@/lib/metadata_constants";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolContent } from "@/components/tool-content";
import ImageConverterLayout from "./ImageConverterLayout";

export const metadata: Metadata = imageConverterMetadata;
export default function ImageConverter() {
  return (
    <>
      <ToolJsonLd href="/tools/image-converter" />
      <ImageConverterLayout />
      <ToolContent href="/tools/image-converter" />
    </>
  )
}
