"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ToolLayout from "@/components/tool-layout"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { gaCustomEvent } from "@/lib/gtag_utils"

// base64url -> UTF-8 JSON string. `atob` needs standard base64 with padding.
const decodeBase64Url = (segment: string): string => {
  const base64 = segment.replace(/-/g, "+").replace(/_/g, "/")
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=")
  const binary = atob(padded)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder("utf-8").decode(bytes)
}

interface JwtPayload {
  sub?: string
  iss?: string
  aud?: string | string[]
  exp?: number
  nbf?: number
  iat?: number
  jti?: string
  [key: string]: unknown
}

export const JwtDecoderLayout = () => {
  const [jwt, setJwt] = useState("")
  const [decodedHeader, setDecodedHeader] = useState<Record<string, unknown> | null>(null)
  const [decodedPayload, setDecodedPayload] = useState<JwtPayload | null>(null)
  const [error, setError] = useState<string | null>(null)

  const decodeJwt = () => {
    try {
      setError(null)

      if (!jwt.trim()) {
        setError("Please enter a JWT token")
        setDecodedHeader(null)
        setDecodedPayload(null)
        return
      }

      const parts = jwt.split(".")
      if (parts.length !== 3) {
        setError("Invalid JWT format. A JWT consists of three parts separated by dots.")
        setDecodedHeader(null)
        setDecodedPayload(null)
        return
      }

      // Decode header
      const header = JSON.parse(decodeBase64Url(parts[0]))

      // Decode payload
      const payload = JSON.parse(decodeBase64Url(parts[1]))

      setDecodedHeader(header)
      setDecodedPayload(payload)
      gaCustomEvent({
        action: "btn_click",
        category: "click",
        label: "jwt_decoder_decode",
        value: { tool: "jwt-decoder", alg: header?.alg ?? "unknown" },
      })

      // Check if token is expired
      if (payload.exp) {
        const expiryDate = new Date(payload.exp * 1000)
        const now = new Date()

        if (now > expiryDate) {
          setError(`Token expired on ${expiryDate.toLocaleString()}`)
        }
      }
    } catch {
      setError("Failed to decode JWT. Make sure it's a valid token.")
    }
  }

  return (
    <ToolLayout title="JWT Decoder" description="Decode JWT headers and payloads in your browser">
      <div className="grid gap-6">
        <div className="space-y-2">
          <Textarea
            placeholder="Paste your JWT token here..."
            className="font-mono min-h-[100px]"
            value={jwt}
            onChange={(e) => setJwt(e.target.value)}
          />
        </div>

        <Button onClick={decodeJwt} className="w-full">
          Decode JWT
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {decodedPayload && !error && decodedPayload.exp && new Date() < new Date(decodedPayload.exp * 1000) && (
          <Alert variant="default" className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Token Not Expired</AlertTitle>
            <AlertDescription>
              This token expires on {new Date(decodedPayload.exp * 1000).toLocaleString()}. The signature is not
              verified by this tool.
            </AlertDescription>
          </Alert>
        )}

        {(decodedHeader || decodedPayload) && (
          <Tabs defaultValue="payload">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="payload">Payload</TabsTrigger>
              <TabsTrigger value="header">Header</TabsTrigger>
            </TabsList>

            <TabsContent value="payload" className="space-y-4">
              <h3 className="text-lg font-medium">Decoded Payload</h3>
              <Card>
                <CardContent className="p-4">
                  <pre className="whitespace-pre-wrap break-all text-sm">{JSON.stringify(decodedPayload, null, 2)}</pre>
                </CardContent>
              </Card>

              {decodedPayload && (
                <div className="space-y-4">
                  <h4 className="text-md font-medium">Common Claims</h4>
                  <div className="grid gap-2">
                    {decodedPayload.sub && <ClaimItem name="Subject (sub)" value={decodedPayload.sub} />}
                    {decodedPayload.iss && <ClaimItem name="Issuer (iss)" value={decodedPayload.iss} />}
                    {decodedPayload.aud && (
                      <ClaimItem
                        name="Audience (aud)"
                        value={Array.isArray(decodedPayload.aud) ? decodedPayload.aud.join(", ") : decodedPayload.aud}
                      />
                    )}
                    {decodedPayload.exp && (
                      <ClaimItem
                        name="Expiration Time (exp)"
                        value={new Date(decodedPayload.exp * 1000).toLocaleString()}
                      />
                    )}
                    {decodedPayload.nbf && (
                      <ClaimItem name="Not Before (nbf)" value={new Date(decodedPayload.nbf * 1000).toLocaleString()} />
                    )}
                    {decodedPayload.iat && (
                      <ClaimItem name="Issued At (iat)" value={new Date(decodedPayload.iat * 1000).toLocaleString()} />
                    )}
                    {decodedPayload.jti && <ClaimItem name="JWT ID (jti)" value={decodedPayload.jti} />}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="header">
              <h3 className="text-lg font-medium">Decoded Header</h3>
              <Card>
                <CardContent className="p-4">
                  <pre className="whitespace-pre-wrap break-all text-sm">{JSON.stringify(decodedHeader, null, 2)}</pre>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </ToolLayout>
  )
}

function ClaimItem({ name, value }: { name: string; value: string }) {
  return (
    <div className="grid grid-cols-3 gap-2 p-2 border rounded-md">
      <div className="font-medium">{name}</div>
      <div className="col-span-2 font-mono text-sm break-all">{value}</div>
    </div>
  )
}
