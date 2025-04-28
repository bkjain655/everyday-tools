"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ToolLayout from "@/components/tool-layout"
import { Download, FileImage } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import convert from "heic-convert/browser";
// Supported image formats
const inputFormats = [
  { value: "image/png", label: "PNG" },
  { value: "image/jpeg", label: "JPEG/JPG" },
  { value: "image/webp", label: "WEBP" },
  { value: "image/gif", label: "GIF" },
  { value: "image/heic", label: "HEIC" },
  { value: "image/bmp", label: "BMP" },
]

const outputFormats = [
  { value: "image/png", label: "PNG", extension: "png" },
  { value: "image/jpeg", label: "JPEG/JPG", extension: "jpg" },
  { value: "image/webp", label: "WEBP", extension: "webp" },
  { value: "image/gif", label: "GIF", extension: "gif" },
  { value: "image/bmp", label: "BMP", extension: "bmp" },
]

export default function ImageConverterLayout() {
  const [sourceImage, setSourceImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null)
  const [outputFormat, setOutputFormat] = useState("image/jpeg")
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [quality, setQuality] = useState(90)
  const [maintainSize, setMaintainSize] = useState(true)
  const [imageInfo, setImageInfo] = useState<{
    name: string
    size: string
    dimensions: string
    type: string
  } | null>(null)
  const [convertedInfo, setConvertedInfo] = useState<{
    size: string
    dimensions: string
    type: string
  } | null>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSourceImage(file)
    setConvertedUrl(null)
    setError(null)
    setConvertedInfo(null)

    try {
      // Handle HEIC format specially
      if (file.type === "image/heic" || file.name.toLowerCase().endsWith(".heic")) {
        const buffer = await file.arrayBuffer();
        const blob = await convert({
            buffer, // the HEIC file buffer
            format: 'JPEG',      // output format
            quality: 1           // the jpeg compression quality, between 0 and 1
        });

        const jpegFile = new File([blob], file.name.replace(/\.heic$/i, ".jpeg"), {
          type: "image/jpeg",
        })

        const url = URL.createObjectURL(jpegFile)
        setPreviewUrl(url)
        loadImageInfo(jpegFile, url)
      } else {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
        loadImageInfo(file, url)
      }
    } catch (err) {
      console.error("Error processing image:", err)
      setError("Failed to process the image. Please try another file.")
      setPreviewUrl(null)
      setImageInfo(null)
    }
  }

  const loadImageInfo = (file: File, url: string) => {
    const img = new Image()
    img.onload = () => {
      setImageInfo({
        name: file.name,
        size: formatFileSize(file.size),
        dimensions: `${img.width} × ${img.height}`,
        type: file.type || "Unknown",
      })
    }
    img.src = url
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB"
    else return (bytes / 1048576).toFixed(2) + " MB"
  }

  const convertImage = async () => {
    if (!sourceImage || !previewUrl) return

    setIsConverting(true)
    setError(null)

    try {
      // For HEIC format, we've already converted to JPEG in the upload handler
      const sourceUrl = previewUrl

      const img = new Image()
      img.crossOrigin = "anonymous"

      img.onload = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas dimensions
        canvas.width = img.width
        canvas.height = img.height

        // Draw image on canvas
        ctx.drawImage(img, 0, 0)

        // Convert canvas to blob
        const mimeType = outputFormat
        const imageQuality = mimeType === "image/jpeg" || mimeType === "image/webp" ? quality / 100 : 1

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              setError("Failed to convert the image. Please try again.")
              setIsConverting(false)
              return
            }

            const url = URL.createObjectURL(blob)
            setConvertedUrl(url)

            // Get converted image info
            const convertedImg = new Image()
            convertedImg.onload = () => {
              setConvertedInfo({
                size: formatFileSize(blob.size),
                dimensions: `${convertedImg.width} × ${convertedImg.height}`,
                type: blob.type,
              })
              setIsConverting(false)
            }
            convertedImg.src = url
          },
          mimeType,
          imageQuality,
        )
      }

      img.onerror = () => {
        setError("Failed to load the image for conversion.")
        setIsConverting(false)
      }

      img.src = sourceUrl
    } catch (err) {
      console.error("Conversion error:", err)
      setError("An error occurred during conversion. Please try again.")
      setIsConverting(false)
    }
  }

  const downloadConvertedImage = () => {
    if (!convertedUrl) return

    const extension = outputFormats.find((format) => format.value === outputFormat)?.extension || "jpg"
    const fileName = sourceImage
      ? sourceImage.name.replace(/\.[^/.]+$/, "") + "." + extension
      : "converted." + extension

    const a = document.createElement("a")
    a.href = convertedUrl
    a.download = fileName
    a.click()
  }

  return (
    <ToolLayout title="Image Converter" description="Convert images between different formats">
      <div className="grid gap-6">
        <Tabs defaultValue="upload">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload & Convert</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center">
                <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                />

                {previewUrl ? (
                <div className="space-y-4">
                    <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Uploaded"
                    width={256}
                    height={256}
                    className="max-h-64 max-w-full mx-auto rounded-lg object-contain"
                    />
                    {imageInfo && <div className="text-sm text-muted-foreground">
                        <p>{imageInfo.name}</p>
                        <p>
                          {imageInfo.dimensions} • {imageInfo.size}
                        </p>
                        <p>Format: {imageInfo.type}</p>
                    </div>}

                    {/* Label that looks like a button */}
                    <label htmlFor="image-upload" className="cursor-pointer">
                    <span className="inline-flex items-center px-4 py-2 border rounded-md bg-white text-sm font-medium text-gray-800 hover:bg-gray-100 transition">
                        Change Image
                    </span>
                    </label>
                </div>
                ) : (
                <label htmlFor="image-upload" className="cursor-pointer space-y-4">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                        <FileImage className="h-10 w-10 text-muted-foreground" />
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

            {previewUrl && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="output-format">Output Format</Label>
                    <Select value={outputFormat} onValueChange={setOutputFormat}>
                      <SelectTrigger id="output-format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        {outputFormats.map((format) => (
                          <SelectItem key={format.value} value={format.value}>
                            {format.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button onClick={convertImage} disabled={isConverting || !previewUrl} className="w-full">
                      {isConverting ? "Converting..." : "Convert Image"}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {convertedUrl && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Converted Image</h3>
                    <div className="flex flex-col items-center border rounded-lg p-6">
                      <img
                        src={convertedUrl || "/placeholder.svg"}
                        alt="Converted"
                        className="max-h-64 max-w-full mx-auto rounded-lg"
                      />
                      {convertedInfo && (
                        <div className="mt-4 text-sm text-muted-foreground text-center">
                          <p>
                            {convertedInfo.dimensions} • {convertedInfo.size}
                          </p>
                          <p>Format: {convertedInfo.type}</p>
                        </div>
                      )}
                      <Button onClick={downloadConvertedImage} className="mt-4">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="quality">Quality: {quality}%</Label>
                  <Slider
                    id="quality"
                    min={10}
                    max={100}
                    step={1}
                    value={[quality]}
                    onValueChange={(value) => setQuality(value[0])}
                  />
                  <p className="text-sm text-muted-foreground">
                    Applies to JPEG and WEBP formats. Higher quality means larger file size.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="maintain-size" checked={maintainSize} onCheckedChange={setMaintainSize} />
                  <Label htmlFor="maintain-size">Maintain original dimensions</Label>
                </div>
              </div>
            </Card>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Format Information</h3>
              <div className="text-sm space-y-2">
                <p>
                  <strong>PNG:</strong> Lossless format with transparency support. Best for graphics, logos, and images
                  with text.
                </p>
                <p>
                  <strong>JPEG/JPG:</strong> Lossy compression, smaller file size. Ideal for photographs and complex
                  images.
                </p>
                <p>
                  <strong>WEBP:</strong> Modern format with both lossy and lossless compression. Smaller than PNG and
                  JPEG with similar quality.
                </p>
                <p>
                  <strong>GIF:</strong> Supports animation and transparency. Limited to 256 colors.
                </p>
                <p>
                  <strong>HEIC:</strong> High Efficiency Image Format used by iOS devices. Offers better compression
                  than JPEG.
                </p>
                <p>
                  <strong>BMP:</strong> Uncompressed format. Large file size but no quality loss.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </ToolLayout>
  )
}
