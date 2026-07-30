"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ToolLayout from "@/components/tool-layout"
import { Label } from "@/components/ui/label"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToolUsage } from "@/lib/use-tool-usage"

export const ColorConverterLayout = () => {
  const trackUse = useToolUsage("color-converter", "color_converter_convert")
  const [hex, setHex] = useState("#1e90ff")
  const [rgb, setRgb] = useState({ r: 30, g: 144, b: 255 })
  const [hsl, setHsl] = useState({ h: 210, s: 100, l: 56 })
  const [copied, setCopied] = useState<string | null>(null)

  const convertHEXToRGB = (hex: string) => {
    trackUse({ from: "hex" })
    if (hex.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      // Convert HEX to RGB
      let r = 0,
        g = 0,
        b = 0

      if (hex.length === 4) {
        r = Number.parseInt(hex[1] + hex[1], 16)
        g = Number.parseInt(hex[2] + hex[2], 16)
        b = Number.parseInt(hex[3] + hex[3], 16)
      } else {
        r = Number.parseInt(hex.slice(1, 3), 16)
        g = Number.parseInt(hex.slice(3, 5), 16)
        b = Number.parseInt(hex.slice(5, 7), 16)
      }

      setRgb({ r, g, b })
      return { r, g, b }
    }
    return { r: 0, g: 0, b: 0 };
  }

  const convertRGBToHSL = (r: number, g: number, b: number) => {
    // Convert RGB to HSL
    const rNorm = r / 255
    const gNorm = g / 255
    const bNorm = b / 255

    const max = Math.max(rNorm, gNorm, bNorm)
    const min = Math.min(rNorm, gNorm, bNorm)
    const delta = max - min

    let h = 0,
      s = 0
    const l = (max + min) / 2

    if (delta !== 0) {
      s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)

      if (max === rNorm) {
        h = ((gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)) * 60
      } else if (max === gNorm) {
        h = ((bNorm - rNorm) / delta + 2) * 60
      } else {
        h = ((rNorm - gNorm) / delta + 4) * 60
      }
    }

    setHsl({
      h: Math.round(h),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    })
  }

  const convertRGBToHex = (r: number, g: number, b: number) => {
    // Convert RGB to HEX
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));

    const hexValue = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`

    if (hexValue !== hex) {
      setHex(hexValue)
    }
  }

  const convertHSLToRGB = (hsl: {h: number, s: number, l: number}) => {
    // Convert HSL to RGB
    const h = Math.min(360, Math.max(0, hsl.h)) / 360
    const s = Math.min(100, Math.max(0, hsl.s)) / 100
    const l = Math.min(100, Math.max(0, hsl.l)) / 100

    let r, g, b

    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q

      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }

    const rgbValue = {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    }

    if (rgbValue.r !== rgb.r || rgbValue.g !== rgb.g || rgbValue.b !== rgb.b) {
      setRgb(rgbValue)
    }
    return rgbValue
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <ToolLayout title="Color Converter" description="Convert between HEX, RGB, HSL color formats">
      <div className="grid gap-6">
        <div className="flex justify-center">
          <div className="w-32 h-32 rounded-md border" style={{ backgroundColor: hex }}></div>
        </div>

        <Tabs defaultValue="hex">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hex">HEX</TabsTrigger>
            <TabsTrigger value="rgb">RGB</TabsTrigger>
            <TabsTrigger value="hsl">HSL</TabsTrigger>
          </TabsList>

          <TabsContent value="hex" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hex-input">HEX Color</Label>
              <div className="flex gap-2">
                <Input
                  id="hex-input"
                  value={hex}
                  onChange={(e) => {
                    let {value} = e.target;
                    value = value.startsWith("#") ? value : `#${value}`;
                    setHex(value);
                    const rgb = convertHEXToRGB(value);
                    convertRGBToHSL(rgb.r, rgb.g, rgb.b);
                  }}
                  className="font-mono"
                />
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(hex, "hex")}>
                  {copied === "hex" ? (
                    <span className="text-xs text-green-500">Copied!</span>
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardContent className="p-4">
                  <div className="font-medium">RGB</div>
                  <div className="font-mono text-sm mt-1">
                    rgb({rgb.r}, {rgb.g}, {rgb.b})
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="font-medium">HSL</div>
                  <div className="font-mono text-sm mt-1">
                    hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rgb" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="rgb-r">Red</Label>
                <Input
                  id="rgb-r"
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.r}
                  onChange={(e) => {
                    const r = Number.parseInt(e.target.value) || 0
                    setRgb({ ...rgb, r })
                    convertRGBToHSL(
                      r,
                      rgb.g,
                      rgb.b
                    )
                    convertRGBToHex(
                      r,
                      rgb.g,
                      rgb.b
                    )
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rgb-g">Green</Label>
                <Input
                  id="rgb-g"
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.g}
                  onChange={(e) => {
                    const g = Number.parseInt(e.target.value) || 0
                    setRgb({ ...rgb, g })
                    convertRGBToHSL(
                      rgb.r,
                      g,
                      rgb.b
                    )
                    convertRGBToHex(
                      rgb.r,
                      g,
                      rgb.b
                    )
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rgb-b">Blue</Label>
                <Input
                  id="rgb-b"
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.b}
                  onChange={(e) => {
                    const b = Number.parseInt(e.target.value) || 0
                    setRgb({ ...rgb, b })
                    convertRGBToHSL(
                      rgb.r,
                      rgb.g,
                      b
                    )
                    convertRGBToHex(
                      rgb.r,
                      rgb.g,
                      b
                    )
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>RGB Value</Label>
              <div className="flex gap-2">
                <Input value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} readOnly className="font-mono" />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "rgb")}
                >
                  {copied === "rgb" ? (
                    <span className="text-xs text-green-500">Copied!</span>
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardContent className="p-4">
                  <div className="font-medium">HEX</div>
                  <div className="font-mono text-sm mt-1">{hex}</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="font-medium">HSL</div>
                  <div className="font-mono text-sm mt-1">
                    hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="hsl" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="hsl-h">Hue</Label>
                <Input
                  id="hsl-h"
                  type="number"
                  min="0"
                  max="360"
                  value={hsl.h}
                  onChange={(e) => {
                    const h = Number.parseInt(e.target.value) || 0;
                    setHsl({ ...hsl, h })
                    const rgbValue = convertHSLToRGB({
                      h,
                      s: hsl.s,
                      l: hsl.l
                    })
                    convertRGBToHex(
                      rgbValue.r,
                      rgbValue.g,
                      rgbValue.b
                    );
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hsl-s">Saturation</Label>
                <Input
                  id="hsl-s"
                  type="number"
                  min="0"
                  max="100"
                  value={hsl.s}
                  onChange={(e) => {
                    const s = Number.parseInt(e.target.value) || 0;
                    setHsl({ ...hsl, s })
                    const rgbValue = convertHSLToRGB({
                      h: hsl.h,
                      s,
                      l: hsl.l
                    })
                    convertRGBToHex(
                      rgbValue.r,
                      rgbValue.g,
                      rgbValue.b
                    );
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hsl-l">Lightness</Label>
                <Input
                  id="hsl-l"
                  type="number"
                  min="0"
                  max="100"
                  value={hsl.l}
                  onChange={(e) => {
                    const l = Number.parseInt(e.target.value) || 0;
                    setHsl({ ...hsl, l })
                    const rgbValue = convertHSLToRGB({
                      h: hsl.h,
                      s: hsl.s,
                      l
                    })
                    convertRGBToHex(
                      rgbValue.r,
                      rgbValue.g,
                      rgbValue.b
                    );
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>HSL Value</Label>
              <div className="flex gap-2">
                <Input value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} readOnly className="font-mono" />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "hsl")}
                >
                  {copied === "hsl" ? (
                    <span className="text-xs text-green-500">Copied!</span>
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardContent className="p-4">
                  <div className="font-medium">HEX</div>
                  <div className="font-mono text-sm mt-1">{hex}</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="font-medium">RGB</div>
                  <div className="font-mono text-sm mt-1">
                    rgb({rgb.r}, {rgb.g}, {rgb.b})
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Color Palette</h3>
          <div className="grid grid-cols-5 gap-2">
            {[0.1, 0.3, 0.5, 0.7, 0.9].map((lightness, index) => {
              const l = Math.round(lightness * 100)
              const color = `hsl(${hsl.h}, ${hsl.s}%, ${l}%)`

              return (
                <div
                  key={index}
                  className="aspect-square rounded-md border flex items-center justify-center text-xs"
                  style={{
                    backgroundColor: color,
                    color: l > 50 ? "#000" : "#fff",
                  }}
                >
                  {l}%
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
