import { Metadata } from "next";
import { interestCalculatorMetadata } from "@/lib/metadata_constants";
import { InterestCalculatorLayout } from "./InterestCalculatorLayout";

export const metadata: Metadata = interestCalculatorMetadata;
export default function InterestCalculatorPage() {
  return (
    <InterestCalculatorLayout />
  )
}
