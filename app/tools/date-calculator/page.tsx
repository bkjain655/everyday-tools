"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ToolLayout from "@/components/tool-layout"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function DateCalculator() {
  // Date Difference State
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [dateDifference, setDateDifference] = useState({
    days: 0,
    months: 0,
    years: 0,
    totalDays: 0,
    totalHours: 0,
    totalMinutes: 0,
    totalSeconds: 0,
  })

  // Date Add/Subtract State
  const [baseDate, setBaseDate] = useState<Date | undefined>(new Date())
  const [operation, setOperation] = useState("add")
  const [amount, setAmount] = useState(1)
  const [unit, setUnit] = useState("days")
  const [resultDate, setResultDate] = useState<Date | null>(null)

  // Calculate date difference
  useEffect(() => {
    if (!startDate || !endDate) return

    const start = new Date(startDate)
    const end = new Date(endDate)

    // Calculate total difference in milliseconds
    const diffMs = Math.abs(end.getTime() - start.getTime())

    // Calculate total days, hours, minutes, seconds
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60))
    const totalMinutes = Math.floor(diffMs / (1000 * 60))
    const totalSeconds = Math.floor(diffMs / 1000)

    // Calculate years, months, days
    let years = end.getFullYear() - start.getFullYear()
    let months = end.getMonth() - start.getMonth()

    if (months < 0) {
      years--
      months += 12
    }

    let days = end.getDate() - start.getDate()

    if (days < 0) {
      const lastMonthDate = new Date(end.getFullYear(), end.getMonth(), 0).getDate()
      days += lastMonthDate
      months--

      if (months < 0) {
        years--
        months += 12
      }
    }

    setDateDifference({
      days,
      months,
      years,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
    })
  }, [startDate, endDate])

  // Calculate date add/subtract
  useEffect(() => {
    if (!baseDate) return

    const date = new Date(baseDate)

    switch (unit) {
      case "days":
        date.setDate(date.getDate() + (operation === "add" ? amount : -amount))
        break
      case "weeks":
        date.setDate(date.getDate() + (operation === "add" ? amount * 7 : -amount * 7))
        break
      case "months":
        date.setMonth(date.getMonth() + (operation === "add" ? amount : -amount))
        break
      case "years":
        date.setFullYear(date.getFullYear() + (operation === "add" ? amount : -amount))
        break
    }

    setResultDate(date)
  }, [baseDate, operation, amount, unit])

  return (
    <ToolLayout title="Date Calculator" description="Calculate differences between dates and add/subtract time">
      <Tabs defaultValue="difference">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="difference">Date Difference</TabsTrigger>
          <TabsTrigger value="add-subtract">Add/Subtract Time</TabsTrigger>
        </TabsList>

        <TabsContent value="difference" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Date Difference</h3>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="text-center p-3 bg-muted rounded-md">
                  <div className="text-3xl font-bold">{dateDifference.years}</div>
                  <div className="text-sm text-muted-foreground">Years</div>
                </div>

                <div className="text-center p-3 bg-muted rounded-md">
                  <div className="text-3xl font-bold">{dateDifference.months}</div>
                  <div className="text-sm text-muted-foreground">Months</div>
                </div>

                <div className="text-center p-3 bg-muted rounded-md">
                  <div className="text-3xl font-bold">{dateDifference.days}</div>
                  <div className="text-sm text-muted-foreground">Days</div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-md font-medium mb-2">Total</h4>
                <div className="grid gap-2">
                  <div className="flex justify-between p-2 border rounded-md">
                    <span>Total Days:</span>
                    <span className="font-medium">{dateDifference.totalDays}</span>
                  </div>

                  <div className="flex justify-between p-2 border rounded-md">
                    <span>Total Hours:</span>
                    <span className="font-medium">{dateDifference.totalHours}</span>
                  </div>

                  <div className="flex justify-between p-2 border rounded-md">
                    <span>Total Minutes:</span>
                    <span className="font-medium">{dateDifference.totalMinutes}</span>
                  </div>

                  <div className="flex justify-between p-2 border rounded-md">
                    <span>Total Seconds:</span>
                    <span className="font-medium">{dateDifference.totalSeconds}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add-subtract" className="space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Base Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !baseDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {baseDate ? format(baseDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={baseDate} onSelect={setBaseDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="operation">Operation</Label>
                <Select value={operation} onValueChange={setOperation}>
                  <SelectTrigger id="operation">
                    <SelectValue placeholder="Select operation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="add">Add</SelectItem>
                    <SelectItem value="subtract">Subtract</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(Number.parseInt(e.target.value) || 1)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger id="unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="weeks">Weeks</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                    <SelectItem value="years">Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Result Date</h3>

              {resultDate && (
                <div className="text-center">
                  <div className="text-3xl font-bold">{format(resultDate, "PPP")}</div>
                  <div className="text-sm text-muted-foreground mt-2">{format(resultDate, "EEEE, h:mm a")}</div>
                </div>
              )}

              <div className="mt-6">
                <h4 className="text-md font-medium mb-2">Common Date Calculations</h4>
                <div className="grid gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setOperation("add")
                      setAmount(1)
                      setUnit("days")
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Tomorrow
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setOperation("add")
                      setAmount(7)
                      setUnit("days")
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Next Week
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setOperation("add")
                      setAmount(1)
                      setUnit("months")
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Next Month
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setOperation("add")
                      setAmount(1)
                      setUnit("years")
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Next Year
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ToolLayout>
  )
}
