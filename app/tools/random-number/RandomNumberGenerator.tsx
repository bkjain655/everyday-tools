"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, RefreshCw } from "lucide-react"
import ToolLayout from "@/components/tool-layout"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { gaCustomEvent } from "@/lib/gtag_utils"

export const RandomNumberGenerator = () => {
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [count, setCount] = useState(1)
  const [allowDuplicates, setAllowDuplicates] = useState(true)
  const [numbers, setNumbers] = useState<number[]>([])
  const [copied, setCopied] = useState(false)

  const generateNumbers = () => {
    if (min > max) {
      // Swap min and max if min is greater than max
      const temp = min
      setMin(max)
      setMax(temp)
    }

    const range = max - min + 1

    // Check if we can generate enough unique numbers
    if (!allowDuplicates && count > range) {
      alert(
        `Cannot generate ${count} unique numbers in the range ${min}-${max}. Please increase the range or reduce the count.`,
      )
      return
    }

    let result: number[] = []

    if (allowDuplicates) {
      // Generate random numbers with duplicates allowed
      for (let i = 0; i < count; i++) {
        result.push(Math.floor(Math.random() * range) + min)
      }
    } else {
      // Generate unique random numbers
      const allNumbers = Array.from({ length: range }, (_, i) => i + min)

      // Fisher-Yates shuffle algorithm
      for (let i = allNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[allNumbers[i], allNumbers[j]] = [allNumbers[j], allNumbers[i]]
      }

      result = allNumbers.slice(0, count)
    }

    setNumbers(result)
    setCopied(false)
    gaCustomEvent({ action: "btn_click", category: "click", label: "random_number_generate", value: { tool: "random-number", count, allowDuplicates } })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(numbers.join(", "))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolLayout title="Random Number Generator" description="Generate random numbers with custom ranges">
      <div className="grid gap-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="min">Minimum Value</Label>
            <Input id="min" type="number" value={min} onChange={(e) => setMin(Number.parseInt(e.target.value) || 0)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max">Maximum Value</Label>
            <Input id="max" type="number" value={max} onChange={(e) => setMax(Number.parseInt(e.target.value) || 0)} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="count">Number of Values: {count}</Label>
          </div>
          <Slider id="count" min={1} max={100} step={1} value={[count]} onValueChange={(value) => setCount(value[0])} />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="duplicates"
            checked={allowDuplicates}
            onCheckedChange={(checked) => setAllowDuplicates(checked as boolean)}
          />
          <Label htmlFor="duplicates">Allow Duplicate Values</Label>
        </div>

        <Button onClick={generateNumbers} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate Random Numbers
        </Button>

        {numbers.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Generated Numbers</h3>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                {copied ? (
                  "Copied!"
                ) : (
                  <>
                    <Copy className="mr-2 h-3 w-3" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {numbers.map((num, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center justify-center rounded-md bg-muted px-2.5 py-0.5 text-sm font-medium"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
