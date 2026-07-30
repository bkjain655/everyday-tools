"use client"

import { useCallback, useEffect, useRef } from "react"
import { gaCustomEvent } from "./gtag_utils"

/**
 * Some tools recalculate on every keystroke, so firing an analytics event per
 * render would flood GA. This debounces usage into a single "tool used" event
 * and skips the initial mount so only real interaction is counted.
 */
export function useToolUsage(tool: string, label: string, delayMs = 1500) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const primed = useRef(false)

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  return useCallback(
    (value: Record<string, unknown> = {}) => {
      // The first call comes from the mount-time render, not from a user action.
      if (!primed.current) {
        primed.current = true
        return
      }
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        gaCustomEvent({
          action: "btn_click",
          category: "click",
          label,
          value: { tool, ...value },
        })
      }, delayMs)
    },
    [tool, label, delayMs],
  )
}
