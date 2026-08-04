import { Metadata } from "next"
import { baseConverterMetadata } from "@/lib/metadata_constants"
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolContent } from "@/components/tool-content";
import { BaseConverterLayout } from "./BaseConverterLayout";

export const metadata: Metadata = baseConverterMetadata;
export default function BaseConverter() {
  return (
    <>
      <ToolJsonLd href="/tools/base-converter" />
      <BaseConverterLayout />
      <ToolContent href="/tools/base-converter" />
    </>
  )
}
