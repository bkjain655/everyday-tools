
import { Metadata } from "next"
import { characterCounterMetadata } from "@/lib/metadata_constants";
import { ToolJsonLd } from "@/components/tool-json-ld";
import { ToolContent } from "@/components/tool-content";
import { CharacterCounterLayout } from "./CharacterCounter"

export const metadata: Metadata = characterCounterMetadata
export default function CharacterCounter() {
  return (
    <>
      <ToolJsonLd href="/tools/character-counter" />
      <CharacterCounterLayout />
      <ToolContent href="/tools/character-counter" />
    </>
  )
}
