"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import ToolLayout from "@/components/tool-layout"

export default function CharacterCounter() {
  const [text, setText] = useState("")
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
  })

  useEffect(() => {
    // Count characters
    const characters = text.length

    // Count characters without spaces
    const charactersNoSpaces = text.replace(/\s/g, "").length

    // Count words
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length

    // Count sentences
    const sentences = text === "" ? 0 : text.split(/[.!?]+/).filter(Boolean).length

    // Count paragraphs
    const paragraphs = text === "" ? 0 : text.split(/\n+/).filter(Boolean).length

    // Count lines
    const lines = text === "" ? 0 : text.split("\n").length

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
    })
  }, [text])

  return (
    <ToolLayout title="Character Counter" description="Count characters, words, and more in your text">
      <div className="grid gap-6">
        <Textarea
          placeholder="Type or paste your text here..."
          className="min-h-[300px] font-mono"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <StatCard title="Characters" value={stats.characters} />
          <StatCard title="Characters (no spaces)" value={stats.charactersNoSpaces} />
          <StatCard title="Words" value={stats.words} />
          <StatCard title="Sentences" value={stats.sentences} />
          <StatCard title="Paragraphs" value={stats.paragraphs} />
          <StatCard title="Lines" value={stats.lines} />
        </div>
      </div>
    </ToolLayout>
  )
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardContent className="p-4 text-center">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}
