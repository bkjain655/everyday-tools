import { Skeleton } from "@/components/ui/skeleton"

export function ToolSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading tool…</span>
      <div className="space-y-2 text-center">
        <Skeleton className="h-9 w-64 mx-auto" />
        <Skeleton className="h-5 w-96 max-w-full mx-auto" />
      </div>
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}
