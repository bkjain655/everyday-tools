import { Metadata } from "next";
import { dateCalculatorMetadata } from "@/lib/metadata_constants";
import { DateCalculatorLayout } from "./DateCalculatorLayout";

export const metadata: Metadata = dateCalculatorMetadata;
export default function DateCalculator() {
  return (
    <DateCalculatorLayout />
  )
}
