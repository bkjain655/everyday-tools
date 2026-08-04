import { Metadata } from "next";
import { timeZoneConverterMetadata } from "@/lib/metadata_constants";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { TimeZoneConverterLayout } from "./TimeZoneConverterLayout";

export const metadata: Metadata = timeZoneConverterMetadata;
export default function TimezoneConverterPage() {
  return (
    <>
      <ToolJsonLd href="/tools/time-zone" />
      <TimeZoneConverterLayout />
    </>
  )
}
