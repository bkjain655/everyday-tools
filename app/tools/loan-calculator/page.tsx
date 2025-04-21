import { Metadata } from "next";
import { emiMetadata } from "@/lib/metadata_constants";
import { LoanCalculatorLayout } from "./LoanCalculatorLayout";

export const metadata: Metadata = emiMetadata;
export default function LoanCalculator() {
  return (
    <LoanCalculatorLayout />
  )
}
