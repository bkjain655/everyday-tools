import { Metadata } from "next";
import { genericMetadata } from "@/lib/metadata_constants";
import { RandomNumberGenerator } from "./RandomNumberGenerator";

export const metadata: Metadata = genericMetadata;
export default function RandomNumberPage() {
  return (
    <RandomNumberGenerator />
  )
}
