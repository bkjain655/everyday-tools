import { Metadata } from "next";
import { hashGeneratorMetadata } from "@/lib/metadata_constants";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { HashGeneratorLayout } from "./HashGeneratorLayout";

export const metadata: Metadata = hashGeneratorMetadata;
export default function HashGenerator() {
  return (
    <>
      <ToolJsonLd href="/tools/hash-generator" />
      <HashGeneratorLayout />
    </>
  )
}
