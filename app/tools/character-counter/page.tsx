
import { Metadata } from "next"
import { characterCounterMetadata } from "@/lib/metadata_constants";
import { CharacterCounterLayout } from "./CharacterCounter"

export const metadata: Metadata = characterCounterMetadata
export default function CharacterCounter() {
  return (
    <CharacterCounterLayout />
  )
}
