import { Metadata } from "next";
import { hashGeneratorMetadata } from "@/lib/metadata_constants";
import { HashGeneratorLayout } from "./HashGeneratorLayout";

export const metadata: Metadata = hashGeneratorMetadata;
export default function HashGenerator() {
  return (
    <HashGeneratorLayout />
  )
}
