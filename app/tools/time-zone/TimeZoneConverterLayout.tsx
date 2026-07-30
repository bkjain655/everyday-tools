"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import ToolLayout from "@/components/tool-layout"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Plus, Trash2 } from "lucide-react"
import { useToolUsage } from "@/lib/use-tool-usage"

// List of time zones
const timeZones = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Moscow",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Australia/Sydney",
  "Pacific/Auckland",
]

export const TimeZoneConverterLayout = () => {
  const trackUse = useToolUsage("time-zone", "time_zone_convert")
  const [date, setDate] = useState<Date>(new Date())
  const [sourceTime, setSourceTime] = useState("")
  const [sourceDate, setSourceDate] = useState("")
  const [sourceTimeZone, setSourceTimeZone] = useState("UTC")
  const [targetTimeZones, setTargetTimeZones] = useState<string[]>(["America/New_York", "Europe/London", "Asia/Tokyo"])
  const [convertedTimes, setConvertedTimes] = useState<{ zone: string; time: string; date: string }[]>([])

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Set initial source time and date
  useEffect(() => {
    const now = new Date()
    setSourceTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }))
    setSourceDate(now.toISOString().split("T")[0])
  }, [])

  // Convert time when inputs change
  useEffect(() => {
    if (!sourceTime || !sourceDate) return

    try {
      // Parse source date and time
      const [hours, minutes] = sourceTime.split(":").map(Number)
      const [year, month, day] = sourceDate.split("-").map(Number)

      // Create date in source timezone
      const sourceDateTime = new Date(Date.UTC(year, month - 1, day, hours, minutes))

      // Adjust for source timezone offset
      const sourceOffset = getTimezoneOffset(sourceTimeZone, sourceDateTime)
      sourceDateTime.setTime(sourceDateTime.getTime() - sourceOffset)

      // Convert to target timezones
      const converted = targetTimeZones.map((zone) => {
        const targetOffset = getTimezoneOffset(zone, sourceDateTime)
        const targetTime = new Date(sourceDateTime.getTime() + targetOffset)

        return {
          zone,
          time: targetTime.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }),
          date: targetTime.toISOString().split("T")[0],
        }
      })

      setConvertedTimes(converted)
    } catch (error) {
      console.error("Time conversion error:", error)
    }
    trackUse({ targets: targetTimeZones.length })
  }, [sourceTime, sourceDate, sourceTimeZone, targetTimeZones, trackUse])

  // Helper function to get timezone offset in milliseconds
  const getTimezoneOffset = (timeZone: string, date: Date) => {
    const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }))
    const tzDate = new Date(date.toLocaleString("en-US", { timeZone }))
    return utcDate.getTime() - tzDate.getTime()
  }

  // Add a new target timezone
  const addTargetTimeZone = () => {
    // Find a timezone that's not already in the list
    const availableZones = timeZones.filter((zone) => zone !== sourceTimeZone && !targetTimeZones.includes(zone))

    if (availableZones.length > 0) {
      setTargetTimeZones([...targetTimeZones, availableZones[0]])
    }
  }

  // Remove a target timezone
  const removeTargetTimeZone = (index: number) => {
    const newZones = [...targetTimeZones]
    newZones.splice(index, 1)
    setTargetTimeZones(newZones)
  }

  // Format timezone for display
  const formatTimeZone = (zone: string) => {
    return zone.replace("_", " ").replace(/\//g, " / ")
  }

  return (
    <ToolLayout title="Time Zone Converter" description="Convert times between different time zones">
      <div className="grid gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-6">
              <div className="text-center">
                <h3 className="text-lg font-medium">Current Time</h3>
                <div className="text-3xl font-bold mt-2">{date.toLocaleTimeString()}</div>
                <div className="text-sm text-muted-foreground">
                  {date.toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="source-date">Source Date</Label>
                  <Input
                    id="source-date"
                    type="date"
                    value={sourceDate}
                    onChange={(e) => setSourceDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="source-time">Source Time</Label>
                  <Input
                    id="source-time"
                    type="time"
                    value={sourceTime}
                    onChange={(e) => setSourceTime(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="source-timezone">Source Time Zone</Label>
                  <Select value={sourceTimeZone} onValueChange={setSourceTimeZone}>
                    <SelectTrigger id="source-timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeZones.map((zone) => (
                        <SelectItem key={zone} value={zone}>
                          {formatTimeZone(zone)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Converted Times</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={addTargetTimeZone}
            disabled={targetTimeZones.length >= timeZones.length - 1}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Time Zone
          </Button>
        </div>

        <div className="grid gap-4">
          {convertedTimes.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{formatTimeZone(item.zone)}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.date} {item.time}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Select
                    value={item.zone}
                    onValueChange={(newZone) => {
                      const newZones = [...targetTimeZones]
                      newZones[index] = newZone
                      setTargetTimeZones(newZones)
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeZones
                        .filter(
                          (zone) => zone !== sourceTimeZone && (!targetTimeZones.includes(zone) || zone === item.zone),
                        )
                        .map((zone) => (
                          <SelectItem key={zone} value={zone}>
                            {formatTimeZone(zone)}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTargetTimeZone(index)}
                    disabled={targetTimeZones.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-sm text-muted-foreground">
          <h3 className="font-medium mb-2">Time Zone Information:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              UTC (Coordinated Universal Time) is the primary time standard by which the world regulates clocks and
              time.
            </li>
            <li>EST (Eastern Standard Time) is UTC-5:00, EDT (Eastern Daylight Time) is UTC-4:00.</li>
            <li>PST (Pacific Standard Time) is UTC-8:00, PDT (Pacific Daylight Time) is UTC-7:00.</li>
            <li>GMT (Greenwich Mean Time) is UTC+0:00.</li>
            <li>IST (Indian Standard Time) is UTC+5:30.</li>
            <li>JST (Japan Standard Time) is UTC+9:00.</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  )
}
