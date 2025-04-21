import { Metadata } from "next"
import { baseConverterMetadata } from "@/lib/metadata_constants"
import { BaseConverterLayout } from "./BaseConverterLayout";

export const metadata: Metadata = baseConverterMetadata;
export default function BaseConverter() {
  return (
    <BaseConverterLayout />
  )
}
