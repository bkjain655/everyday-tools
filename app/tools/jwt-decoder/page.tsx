import { Metadata } from "next";
import { jwtDecoderMetadata } from "@/lib/metadata_constants";
import { JwtDecoderLayout } from "./JwtDecoderLayout";

export const metadata: Metadata = jwtDecoderMetadata;
export default function JwtDecoderPage() {
  return (
    <JwtDecoderLayout />
  )
}
