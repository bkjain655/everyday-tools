import { Metadata } from "next";
import { jwtDecoderMetadata } from "@/lib/metadata_constants";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { JwtDecoderLayout } from "./JwtDecoderLayout";

export const metadata: Metadata = jwtDecoderMetadata;
export default function JwtDecoderPage() {
  return (
    <>
      <ToolJsonLd href="/tools/jwt-decoder" />
      <JwtDecoderLayout />
    </>
  )
}
