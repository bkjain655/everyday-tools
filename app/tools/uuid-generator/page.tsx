"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, RefreshCw } from "lucide-react"
import ToolLayout from "@/components/tool-layout"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(5)
  const [version, setVersion] = useState<"v1" | "v4">("v4")
  const [copied, setCopied] = useState<number | null>(null)

  const generateUUIDs = () => {
    const newUuids: string[] = []

    for (let i = 0; i < count; i++) {
      if (version === "v4") {
        newUuids.push(crypto.randomUUID())
      } else {
        // Simple v1-like UUID (not true v1, just for demonstration)
        const now = new Date().getTime()
        const uuid = "xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
          const r = ((now + Math.random() * 16) % 16) | 0
          return (c === "x" ? r : (r & 0x3) | 0x8).toString(16)
        })
        newUuids.push(uuid)
      }
    }

    setUuids(newUuids)
    setCopied(null)
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopied(index)
    setTimeout(() => setCopied(null), 2000)
  }

  const copyAllToClipboard = () => {
    navigator.clipboard.writeText(uuids.join("\n"))
    setCopied(-1)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <ToolLayout title="UUID Generator" description="Generate random UUIDs">
      <div className="grid gap-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="count">Number of UUIDs</Label>
            <Input
              id="count"
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Number.parseInt(e.target.value) || 1)}
            />
          </div>

          <div className="flex-1 space-y-2">
            <Label>UUID Version</Label>
            <RadioGroup value={version} onValueChange={(v) => setVersion(v as "v1" | "v4")} className="flex">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="v4" id="v4" />
                <Label htmlFor="v4">Version 4 (Random)</Label>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <RadioGroupItem value="v1" id="v1" />
                <Label htmlFor="v1">Version 1 (Time-based)</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Button onClick={generateUUIDs} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate UUIDs
        </Button>

        {uuids.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Generated UUIDs</h3>
              <Button variant="outline" size="sm" onClick={copyAllToClipboard} className="text-xs">
                {copied === -1 ? "Copied!" : "Copy All"}
              </Button>
            </div>

            <div className="space-y-2">
              {uuids.map((uuid, index) => (
                <Card key={index}>
                  <CardContent className="p-3 flex justify-between items-center">
                    <code className="font-mono text-sm">{uuid}</code>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(uuid, index)}>
                      {copied === index ? (
                        <span className="text-xs text-green-500">Copied!</span>
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
