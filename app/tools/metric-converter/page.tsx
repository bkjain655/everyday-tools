import { Metadata } from "next";
import { metricConverterMetadata } from "@/lib/metadata_constants";
import { MetricConverterLayout } from "./MetricConverterLayout";

export const metadata: Metadata = metricConverterMetadata;
export default function MetricsConverterPage() {
  return (
    <MetricConverterLayout />
  )
}
