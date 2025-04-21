import { Metadata } from "next";
import { ColorConverterLayout } from "./ColorConverterLayout";
import { colorConverterMetadata } from "@/lib/metadata_constants";

export const metadata: Metadata = colorConverterMetadata;
export default function ColorConverter() {
  return (
    <ColorConverterLayout />
  )
}
