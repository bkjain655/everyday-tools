import { Metadata } from "next";
import { emiMetadata } from "@/lib/metadata_constants";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { LoanCalculatorLayout } from "./LoanCalculatorLayout";

export const metadata: Metadata = emiMetadata;
export default function LoanCalculator() {
  return (
    <>
      <ToolJsonLd href="/tools/loan-calculator" />
      <LoanCalculatorLayout />
    </>
  )
}
