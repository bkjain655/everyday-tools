import { Metadata } from "next";
import { uuidMetadata } from "@/lib/metadata_constants";
import { UuidGeneratorLayout } from "./UuidGeneratorLayout";

export const metadata: Metadata = uuidMetadata;
export default function UuidGeneratorPage() {
  return (
    <UuidGeneratorLayout />
  )
}
