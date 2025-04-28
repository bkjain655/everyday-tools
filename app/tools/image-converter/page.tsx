import { Metadata } from "next";
import { imageConverterMetadata } from "@/lib/metadata_constants";
import ImageConverterLayout from "./ImageConverterLayout";

export const metadata: Metadata = imageConverterMetadata;
export default function ImageConverter() {
  return (
    <ImageConverterLayout />
  )
}
