import { Metadata } from "next";
import { metricConverterMetadata } from "@/lib/metadata_constants";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolContent } from "@/components/tool-content";
import { MetricConverterLayout } from "./MetricConverterLayout";

export const metadata: Metadata = metricConverterMetadata;
export default function MetricsConverterPage() {
  return (
    <>
      <ToolJsonLd href="/tools/metric-converter" />
      <MetricConverterLayout />
      <ToolContent href="/tools/metric-converter" />
    </>
  )
}
