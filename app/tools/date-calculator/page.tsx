import { Metadata } from "next";
import { dateCalculatorMetadata } from "@/lib/metadata_constants";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { DateCalculatorLayout } from "./DateCalculatorLayout";

export const metadata: Metadata = dateCalculatorMetadata;
export default function DateCalculator() {
  return (
    <>
      <ToolJsonLd href="/tools/date-calculator" />
      <DateCalculatorLayout />
    </>
  )
}
