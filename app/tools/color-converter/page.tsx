import { Metadata } from "next";
import { ColorConverterLayout } from "./ColorConverterLayout";
import { colorConverterMetadata } from "@/lib/metadata_constants";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolContent } from "@/components/tool-content";

export const metadata: Metadata = colorConverterMetadata;
export default function ColorConverter() {
  return (
    <>
      <ToolJsonLd href="/tools/color-converter" />
      <ColorConverterLayout />
      <ToolContent href="/tools/color-converter" />
    </>
  )
}
