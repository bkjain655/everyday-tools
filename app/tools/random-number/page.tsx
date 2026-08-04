import { Metadata } from "next";
import { randomNumberGeneratorMetadata } from "@/lib/metadata_constants";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolContent } from "@/components/tool-content";
import { RandomNumberGenerator } from "./RandomNumberGenerator";

export const metadata: Metadata = randomNumberGeneratorMetadata;
export default function RandomNumberPage() {
  return (
    <>
      <ToolJsonLd href="/tools/random-number" />
      <RandomNumberGenerator />
      <ToolContent href="/tools/random-number" />
    </>
  )
}
