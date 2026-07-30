"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700 }}>Something went wrong</h1>
        <p style={{ maxWidth: "32rem", opacity: 0.7 }}>
          Everyday Tools failed to load. Please reload the page.
        </p>
        {error.digest && <p style={{ fontSize: "0.75rem", opacity: 0.6 }}>Reference: {error.digest}</p>}
        <button
          onClick={reset}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            border: "1px solid currentColor",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
