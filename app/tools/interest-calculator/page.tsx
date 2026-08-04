import { Metadata } from "next";
import { interestCalculatorMetadata } from "@/lib/metadata_constants";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolContent } from "@/components/tool-content";
import { InterestCalculatorLayout } from "./InterestCalculatorLayout";

export const metadata: Metadata = interestCalculatorMetadata;
export default function InterestCalculatorPage() {
  return (
    <>
      <ToolJsonLd href="/tools/interest-calculator" />
      <InterestCalculatorLayout />
      <ToolContent href="/tools/interest-calculator" />
    </>
  )
}
