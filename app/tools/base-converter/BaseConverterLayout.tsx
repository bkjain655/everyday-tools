"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import ToolLayout from "@/components/tool-layout"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToolUsage } from "@/lib/use-tool-usage"

const bases = [
    { value: "2", label: "Binary (Base 2)" },
    { value: "8", label: "Octal (Base 8)" },
    { value: "10", label: "Decimal (Base 10)" },
    { value: "16", label: "Hexadecimal (Base 16)" },
    { value: "32", label: "Base 32" },
    { value: "64", label: "Base 64" },
];

export const BaseConverterLayout = () => {
  const trackUse = useToolUsage("base-converter", "base_converter_convert")
    const [inputBase, setInputBase] = useState("10")
    const [outputBase, setOutputBase] = useState("2")
    const [inputValue, setInputValue] = useState("42")
    const [outputValue, setOutputValue] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [copied, setCopied] = useState<string | null>(null)
  
    // Convert between bases
    useEffect(() => {
      try {
        setError(null)
  
        if (!inputValue.trim()) {
          setOutputValue("")
          return
        }
  
        // Special handling for base64
        if (inputBase === "64") {
          if (outputBase === "10") {
            // Base64 to decimal (via binary)
            const binary = atob(inputValue)
            let decimal = 0
            for (let i = 0; i < binary.length; i++) {
              decimal = decimal * 256 + binary.charCodeAt(i)
            }
            setOutputValue(decimal.toString())
          } else {
            setError("Base64 can only be converted to decimal")
          }
          return
        }
  
        if (outputBase === "64") {
          if (inputBase === "10") {
            // Decimal to base64
            const num = Number.parseInt(inputValue, 10)
            const binary = String.fromCharCode(...new Uint8Array([num]))
            setOutputValue(btoa(binary))
          } else {
            setError("Only decimal can be converted to Base64")
          }
          return
        }
  
        // For other bases
        const decimal = Number.parseInt(inputValue, Number.parseInt(inputBase))
  
        if (isNaN(decimal)) {
          setError(`Invalid number for base ${inputBase}`)
          setOutputValue("")
          return
        }
  
        const result = decimal.toString(Number.parseInt(outputBase))
        setOutputValue(result)
      } catch (err) {
        setError(`Conversion error: ${(err as Error).message}`)
        setOutputValue("")
      }
      trackUse({ inputBase, outputBase })
    }, [inputValue, inputBase, outputBase, trackUse])
  
    const copyToClipboard = (text: string, type: string) => {
      navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    }
  
    const swapBases = () => {
      const tempBase = inputBase
      setInputBase(outputBase)
      setOutputBase(tempBase)
  
      const tempValue = inputValue
      setInputValue(outputValue)
      setOutputValue(tempValue)
    }
  
    return (
      <ToolLayout title="Base Converter" description="Convert numbers between different bases">
        <div className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="input-base">Input Base</Label>
              <Select value={inputBase} onValueChange={setInputBase}>
                <SelectTrigger id="input-base">
                  <SelectValue placeholder="Select base" />
                </SelectTrigger>
                <SelectContent>
                  {bases.map((base) => (
                    <SelectItem key={base.value} value={base.value}>
                      {base.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
  
            <div className="space-y-2">
              <Label htmlFor="output-base">Output Base</Label>
              <Select value={outputBase} onValueChange={setOutputBase}>
                <SelectTrigger id="output-base">
                  <SelectValue placeholder="Select base" />
                </SelectTrigger>
                <SelectContent>
                  {bases.map((base) => (
                    <SelectItem key={base.value} value={base.value}>
                      {base.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
  
          <div className="grid gap-4 sm:grid-cols-2 items-end">
            <div className="space-y-2">
              <Label htmlFor="input-value">Input Value</Label>
              <div className="flex gap-2">
                <Input
                  id="input-value"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="font-mono"
                />
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(inputValue, "input")}>
                  {copied === "input" ? (
                    <span className="text-xs text-green-500">Copied!</span>
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
  
            <Button variant="outline" onClick={swapBases} className="w-full sm:w-auto">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Swap
            </Button>
  
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="output-value">Output Value</Label>
              <div className="flex gap-2">
                <Input id="output-value" value={outputValue} readOnly className="font-mono" />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(outputValue, "output")}
                  disabled={!outputValue}
                >
                  {copied === "output" ? (
                    <span className="text-xs text-green-500">Copied!</span>
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
  
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
  
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Common Number Representations</h3>
  
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-2 p-2 border rounded-md">
                  <div className="font-medium">Decimal (Base 10)</div>
                  <div className="font-mono">42</div>
                </div>
  
                <div className="grid grid-cols-2 gap-2 p-2 border rounded-md">
                  <div className="font-medium">Binary (Base 2)</div>
                  <div className="font-mono">101010</div>
                </div>
  
                <div className="grid grid-cols-2 gap-2 p-2 border rounded-md">
                  <div className="font-medium">Octal (Base 8)</div>
                  <div className="font-mono">52</div>
                </div>
  
                <div className="grid grid-cols-2 gap-2 p-2 border rounded-md">
                  <div className="font-medium">Hexadecimal (Base 16)</div>
                  <div className="font-mono">2A</div>
                </div>
              </div>
  
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Different number bases are used in various computing contexts:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Binary (Base 2) is used in digital circuits and low-level computing</li>
                  <li>Octal (Base 8) is used in some Unix file permissions</li>
                  <li>Decimal (Base 10) is our standard counting system</li>
                  <li>Hexadecimal (Base 16) is used for memory addresses, colors, and more</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    )
  }