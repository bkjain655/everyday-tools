"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Upload } from "lucide-react"
import ToolLayout from "@/components/tool-layout"
import { gaCustomEvent } from "@/lib/gtag_utils"

export const ImageToBase64Layout = () => {
  const [image, setImage] = useState<string | null>(null)
  const [base64, setBase64] = useState("")
  const [fileName, setFileName] = useState("")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setImage(result)
      setBase64(result)
      gaCustomEvent({
        action: "btn_click",
        category: "click",
        label: "image_to_base64_convert",
        value: { tool: "image-to-base64", type: file.type },
      })
    }
    reader.readAsDataURL(file)
  }

  return (
    <ToolLayout title="Image to Base64" description="Convert images to base64 encoding">
      <div className="grid gap-6">
      <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center">
        <input
          type="file"
          id="image-upload"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {image ? (
          <div className="space-y-4">
            {/* eslint-disable-next-line @next/next/no-img-element -- client-generated blob:/data: URL, not optimisable by next/image */}
            <img
              src={image || "/placeholder.svg"}
              alt="Uploaded"
              width={256}
              height={256}
              className="max-h-64 max-w-full mx-auto rounded-lg object-contain"
            />
            <p className="text-sm text-muted-foreground">{fileName}</p>

            {/* Label that looks like a button */}
            <label htmlFor="image-upload" className="cursor-pointer">
              <span className="inline-flex items-center px-4 py-2 border rounded-md bg-secondary text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition">
                Change Image
              </span>
            </label>
          </div>
        ) : (
          <label htmlFor="image-upload" className="cursor-pointer space-y-4">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Upload className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-medium">Upload an image</p>
              <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
            </div>
            <span className="inline-flex items-center px-4 py-2 border rounded-md bg-secondary text-sm font-medium hover:bg-secondary/80 transition">
              Select Image
            </span>
          </label>
        )}
      </div>
        {base64 && (
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Base64 Output</h3>
            <Card className="p-4">
              <Textarea value={base64} readOnly className="min-h-[200px] font-mono text-xs" />
            </Card>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => navigator.clipboard.writeText(base64)}>
                Copy to Clipboard
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const blob = new Blob([base64], { type: "text/plain" })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement("a")
                  a.href = url
                  a.download = `${fileName.split(".")[0]}-base64.txt`
                  a.click()
                }}
              >
                Download as Text
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
