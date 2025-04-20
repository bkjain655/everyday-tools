"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, PlusCircleIcon, Trash2Icon } from "lucide-react"
import ToolLayout from "@/components/tool-layout"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {QRCodeCanvas} from "qrcode.react"

export default function QrCodeGenerator() {
  const [text, setText] = useState("https://example.com")
  const [size, setSize] = useState(200);
  const [contentType, setContentType] = useState("SINGLE");
  const [contents, setContents] = useState<string[]>(["https://example.com"])

  const [bgColor, setBgColor] = useState("#FFFFFF")
  const [fgColor, setFgColor] = useState("#000000")
  const [errorLevel, setErrorLevel] = useState("M")
  const qrRef = useRef<HTMLDivElement>(null)

  const handleAdd = () => {
    setContents((prev) => [...prev, '']);
    setText("");
  }

  const handleDelete = (index: number) => {
    setContents((prev) => prev.slice(index, -1));
  }

  const handleChange = (index: number, value: string) => {
    setContents((prev) => {
      const newContents = [...prev];
      newContents[index] = value;
      return newContents;
    });
  }
  const multipleInputs = (content: string, index: number) => {
    return (
      <div className="flex items-end space-x-3 w-full">
      {/* Label and Input */}
      <div className="flex flex-col w-full">
        <Label htmlFor="text" className="text-sm text-slate-700 mb-1">
          Text or URL
        </Label>
        <input
          id="text"
          value={content}
          onChange={(e) => handleChange(index, e.target.value)}
          placeholder="Enter text or URL"
          className="border border-slate-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm"
        />
      </div>

      {/* Action Icons */}
      <button
        onClick={handleAdd}
        className="p-2 rounded-md hover:bg-slate-100 transition-colors"
        title="Add"
        type="button"
      >
        <PlusCircleIcon className="text-blue-600" size={20} />
      </button>

      <button
        onClick={() => handleDelete(index)}
        className="p-2 rounded-md hover:bg-slate-100 transition-colors"
        title="Delete"
        type="button"
      >
        <Trash2Icon className="text-red-500" size={20} />
      </button>
    </div>
    );
  }
  const qrCodeContent = () => {
    return (
      <>
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-700">Content Type:</p>
          
          <RadioGroup
            className="flex flex-row gap-6"
            name="contentType"
            value={contentType}
            onValueChange={(value) => {
              setContentType(value);
            }}
          >
            <RadioGroupItem value="SINGLE" />
            <Label htmlFor="SINGLE">Single </Label>
            <RadioGroupItem value="MULTIPLE" /> 
            <Label htmlFor="MULTIPLE">Multiple</Label>
          </RadioGroup>
        </div>
        {contentType === 'SINGLE' && <div className="space-y-2">
          <Label htmlFor="text">Text or URL</Label>
          <Input id="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text or URL" />
        </div>}
        {contentType === 'MULTIPLE' && 
          (contents.map((content, index) => multipleInputs(content, index)))
        }
      </>
    );
  }
  const downloadQRCode = () => {
    if (!qrRef.current) return

    const canvas = qrRef.current.querySelector("canvas")
    if (!canvas) return

    const url = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = "qrcode.png"
    link.href = url
    link.click()
  }

  return (
    <ToolLayout title="QR Code Generator" description="Create QR codes from text or URLs">
      <Tabs defaultValue="basic">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="text">Text or URL</Label>
            <Input id="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text or URL" />
          </div>

          <div className="flex justify-center" ref={qrRef}>
            <QRCodeCanvas
              value={text || " "}
              size={size}
              bgColor={bgColor}
              fgColor={fgColor}
              level={errorLevel as "L" | "M" | "Q" | "H"}
              marginSize={2}
              title={text}
            />
          </div>

          <Button onClick={downloadQRCode} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download QR Code
          </Button>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="advanced-text">Text or URL</Label>
            <Input
              id="advanced-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text or URL"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="size">Size (px)</Label>
              <Input
                id="size"
                type="number"
                min="100"
                max="1000"
                value={size}
                onChange={(e) => setSize(Number.parseInt(e.target.value) || 200)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="error-level">Error Correction Level</Label>
              <Select value={errorLevel} onValueChange={setErrorLevel}>
                <SelectTrigger id="error-level">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">Low (7%)</SelectItem>
                  <SelectItem value="M">Medium (15%)</SelectItem>
                  <SelectItem value="Q">Quartile (25%)</SelectItem>
                  <SelectItem value="H">High (30%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fg-color">Foreground Color</Label>
              <div className="flex gap-2">
                <Input
                  id="fg-color"
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-12 p-1 h-10"
                />
                <Input value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="flex-1" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bg-color">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="bg-color"
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-12 p-1 h-10"
                />
                <Input value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="flex-1" />
              </div>
            </div>
          </div>

          <div className="flex justify-center" ref={qrRef}>
            <QRCodeCanvas
              value={text || " "}
              size={size}
              bgColor={bgColor}
              fgColor={fgColor}
              level={errorLevel as "L" | "M" | "Q" | "H"}
              marginSize={2}
              title={text}
            />
          </div>

          <Button onClick={downloadQRCode} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download QR Code
          </Button>
        </TabsContent>
      </Tabs>
    </ToolLayout>
  )
}
