import { Metadata } from "next";
import { timeZoneConverterMetadata } from "@/lib/metadata_constants";
import { TimeZoneConverterLayout } from "./TimeZoneConverterLayout";

export const metadata: Metadata = timeZoneConverterMetadata;
export default function TimezoneConverterPage() {
  return (
    <TimeZoneConverterLayout />
  )
}
