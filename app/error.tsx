"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground max-w-md">
        This tool hit an unexpected error. Trying again usually fixes it — nothing you entered was sent anywhere.
      </p>
      {error.digest && <p className="text-xs text-muted-foreground">Reference: {error.digest}</p>}
      <div className="flex gap-2">
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" asChild>
          <Link href="/">Back to tools</Link>
        </Button>
      </div>
    </div>
  )
}
