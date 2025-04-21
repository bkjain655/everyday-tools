"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ToolLayout from "@/components/tool-layout"
import { Copy, FileText, Upload } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export const HashGeneratorLayout = () => {
  const [text, setText] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [hashes, setHashes] = useState({
    md5: "",
    sha1: "",
    sha256: "",
    sha512: "",
  })
  const [selectedHashes, setSelectedHashes] = useState({
    md5: true,
    sha1: true,
    sha256: true,
    sha512: true,
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const generateHashesFromText = async () => {
    if (!text) return

    setIsProcessing(true)
    const newHashes = { md5: "", sha1: "", sha256: "", sha512: "" }

    try {
      const textEncoder = new TextEncoder()
      const data = textEncoder.encode(text)

      if (selectedHashes.md5) {
        newHashes.md5 = await generateHash(data, "MD5")
      }

      if (selectedHashes.sha1) {
        newHashes.sha1 = await generateHash(data, "SHA-1")
      }

      if (selectedHashes.sha256) {
        newHashes.sha256 = await generateHash(data, "SHA-256")
      }

      if (selectedHashes.sha512) {
        newHashes.sha512 = await generateHash(data, "SHA-512")
      }

      setHashes(newHashes)
    } catch (error) {
      console.error("Hash generation error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const generateHashesFromFile = async () => {
    if (!file) return

    setIsProcessing(true)
    const newHashes = { md5: "", sha1: "", sha256: "", sha512: "" }

    try {
      const arrayBuffer = await file.arrayBuffer()
      const data = new Uint8Array(arrayBuffer)

      if (selectedHashes.md5) {
        newHashes.md5 = await generateHash(data, "MD5")
      }

      if (selectedHashes.sha1) {
        newHashes.sha1 = await generateHash(data, "SHA-1")
      }

      if (selectedHashes.sha256) {
        newHashes.sha256 = await generateHash(data, "SHA-256")
      }

      if (selectedHashes.sha512) {
        newHashes.sha512 = await generateHash(data, "SHA-512")
      }

      setHashes(newHashes)
    } catch (error) {
      console.error("Hash generation error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const generateHash = async (data: Uint8Array, algorithm: string) => {
    const hashBuffer = await crypto.subtle.digest(algorithm, data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setText("")
    }
  }

  const copyToClipboard = (hash: string, type: string) => {
    navigator.clipboard.writeText(hash)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <ToolLayout title="Hash Generator" description="Generate MD5, SHA-1, SHA-256, SHA-512 hashes">
      <Tabs defaultValue="text">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="file">File</TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-6">
          <div className="space-y-2">
            <Textarea
              placeholder="Enter text to hash..."
              className="min-h-[200px]"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="md5"
                checked={selectedHashes.md5}
                onCheckedChange={(checked) => setSelectedHashes({ ...selectedHashes, md5: checked as boolean })}
              />
              <Label htmlFor="md5">MD5</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="sha1"
                checked={selectedHashes.sha1}
                onCheckedChange={(checked) => setSelectedHashes({ ...selectedHashes, sha1: checked as boolean })}
              />
              <Label htmlFor="sha1">SHA-1</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="sha256"
                checked={selectedHashes.sha256}
                onCheckedChange={(checked) => setSelectedHashes({ ...selectedHashes, sha256: checked as boolean })}
              />
              <Label htmlFor="sha256">SHA-256</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="sha512"
                checked={selectedHashes.sha512}
                onCheckedChange={(checked) => setSelectedHashes({ ...selectedHashes, sha512: checked as boolean })}
              />
              <Label htmlFor="sha512">SHA-512</Label>
            </div>
          </div>

          <Button onClick={generateHashesFromText} disabled={!text || isProcessing} className="w-full">
            {isProcessing ? "Generating..." : "Generate Hashes"}
          </Button>
        </TabsContent>

        <TabsContent value="file" className="space-y-6">
          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center">
            <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
            <label htmlFor="file-upload" className="cursor-pointer">
              {file ? (
                <div className="space-y-4">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <FileText className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <Button variant="outline">Change File</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-medium">Upload a file</p>
                    <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
                  </div>
                  <Button variant="secondary">Select File</Button>
                </div>
              )}
            </label>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="file-md5"
                checked={selectedHashes.md5}
                onCheckedChange={(checked) => setSelectedHashes({ ...selectedHashes, md5: checked as boolean })}
              />
              <Label htmlFor="file-md5">MD5</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="file-sha1"
                checked={selectedHashes.sha1}
                onCheckedChange={(checked) => setSelectedHashes({ ...selectedHashes, sha1: checked as boolean })}
              />
              <Label htmlFor="file-sha1">SHA-1</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="file-sha256"
                checked={selectedHashes.sha256}
                onCheckedChange={(checked) => setSelectedHashes({ ...selectedHashes, sha256: checked as boolean })}
              />
              <Label htmlFor="file-sha256">SHA-256</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="file-sha512"
                checked={selectedHashes.sha512}
                onCheckedChange={(checked) => setSelectedHashes({ ...selectedHashes, sha512: checked as boolean })}
              />
              <Label htmlFor="file-sha512">SHA-512</Label>
            </div>
          </div>

          <Button onClick={generateHashesFromFile} disabled={!file || isProcessing} className="w-full">
            {isProcessing ? "Generating..." : "Generate Hashes"}
          </Button>
        </TabsContent>
      </Tabs>

      {(hashes.md5 || hashes.sha1 || hashes.sha256 || hashes.sha512) && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium">Generated Hashes</h3>

          {hashes.md5 && (
            <Card>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium">MD5</div>
                  <div className="font-mono text-sm break-all">{hashes.md5}</div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(hashes.md5, "md5")}>
                  {copied === "md5" ? (
                    <span className="text-xs text-green-500">Copied!</span>
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {hashes.sha1 && (
            <Card>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium">SHA-1</div>
                  <div className="font-mono text-sm break-all">{hashes.sha1}</div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(hashes.sha1, "sha1")}>
                  {copied === "sha1" ? (
                    <span className="text-xs text-green-500">Copied!</span>
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {hashes.sha256 && (
            <Card>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium">SHA-256</div>
                  <div className="font-mono text-sm break-all">{hashes.sha256}</div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(hashes.sha256, "sha256")}>
                  {copied === "sha256" ? (
                    <span className="text-xs text-green-500">Copied!</span>
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {hashes.sha512 && (
            <Card>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium">SHA-512</div>
                  <div className="font-mono text-sm break-all">{hashes.sha512}</div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(hashes.sha512, "sha512")}>
                  {copied === "sha512" ? (
                    <span className="text-xs text-green-500">Copied!</span>
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </ToolLayout>
  )
}
