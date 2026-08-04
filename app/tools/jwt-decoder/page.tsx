import { Metadata } from "next";
import { jwtDecoderMetadata } from "@/lib/metadata_constants";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolContent } from "@/components/tool-content";
import { JwtDecoderLayout } from "./JwtDecoderLayout";

export const metadata: Metadata = jwtDecoderMetadata;
export default function JwtDecoderPage() {
  return (
    <>
      <ToolJsonLd href="/tools/jwt-decoder" />
      <JwtDecoderLayout />
      <ToolContent href="/tools/jwt-decoder" />
    </>
  )
}
