import { Metadata } from "next";
import { uuidMetadata } from "@/lib/metadata_constants";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolContent } from "@/components/tool-content";
import { UuidGeneratorLayout } from "./UuidGeneratorLayout";

export const metadata: Metadata = uuidMetadata;
export default function UuidGeneratorPage() {
  return (
    <>
      <ToolJsonLd href="/tools/uuid-generator" />
      <UuidGeneratorLayout />
      <ToolContent href="/tools/uuid-generator" />
    </>
  )
}
