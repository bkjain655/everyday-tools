import { Metadata } from "next";
import { randomNumberGeneratorMetadata } from "@/lib/metadata_constants";
import { RandomNumberGenerator } from "./RandomNumberGenerator";

export const metadata: Metadata = randomNumberGeneratorMetadata;
export default function RandomNumberPage() {
  return (
    <RandomNumberGenerator />
  )
}
