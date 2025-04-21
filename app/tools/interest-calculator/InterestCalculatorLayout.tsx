"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ToolLayout from "@/components/tool-layout"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const InterestCalculatorLayout = () => {
  // Simple Interest State
  const [simpleAmount, setSimpleAmount] = useState(10000)
  const [simpleRate, setSimpleRate] = useState(5)
  const [simpleTime, setSimpleTime] = useState(5)
  const [simpleTimeUnit, setSimpleTimeUnit] = useState("years")
  const [simpleInterest, setSimpleInterest] = useState(0)
  const [simpleTotal, setSimpleTotal] = useState(0)

  // Compound Interest State
  const [compoundAmount, setCompoundAmount] = useState(10000)
  const [compoundRate, setCompoundRate] = useState(5)
  const [compoundTime, setCompoundTime] = useState(5)
  const [compoundFrequency, setCompoundFrequency] = useState("yearly")
  const [compoundInterest, setCompoundInterest] = useState(0)
  const [compoundTotal, setCompoundTotal] = useState(0)
  const [compoundYearlyBreakdown, setCompoundYearlyBreakdown] = useState<{ year: number; amount: number }[]>([])

  // Calculate Simple Interest
  useEffect(() => {
    const calculateSimpleInterest = () => {
      let timeInYears = simpleTime
      if (simpleTimeUnit === "months") {
        timeInYears = simpleTime / 12
      } else if (simpleTimeUnit === "days") {
        timeInYears = simpleTime / 365
      }

      const interest = simpleAmount * (simpleRate / 100) * timeInYears
      setSimpleInterest(interest)
      setSimpleTotal(simpleAmount + interest)
    }

    calculateSimpleInterest()
  }, [simpleAmount, simpleRate, simpleTime, simpleTimeUnit])

  // Calculate Compound Interest
  useEffect(() => {
    const calculateCompoundInterest = () => {
      let frequencyPerYear = 1
      if (compoundFrequency === "semi-annually") frequencyPerYear = 2
      else if (compoundFrequency === "quarterly") frequencyPerYear = 4
      else if (compoundFrequency === "monthly") frequencyPerYear = 12
      else if (compoundFrequency === "daily") frequencyPerYear = 365

      const n = frequencyPerYear
      const r = compoundRate / 100
      const t = compoundTime
      const p = compoundAmount

      const amount = p * Math.pow(1 + r / n, n * t)
      const interest = amount - p

      setCompoundInterest(interest)
      setCompoundTotal(amount)

      // Calculate yearly breakdown
      const breakdown = []
      for (let year = 1; year <= t; year++) {
        const yearlyAmount = p * Math.pow(1 + r / n, n * year)
        breakdown.push({
          year,
          amount: yearlyAmount,
        })
      }
      setCompoundYearlyBreakdown(breakdown)
    }

    calculateCompoundInterest()
  }, [compoundAmount, compoundRate, compoundTime, compoundFrequency])

  return (
    <ToolLayout title="Interest Calculator" description="Calculate simple and compound interest">
      <Tabs defaultValue="simple">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="simple">Simple Interest</TabsTrigger>
          <TabsTrigger value="compound">Compound Interest</TabsTrigger>
        </TabsList>

        <TabsContent value="simple" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="simple-amount">Principal Amount</Label>
              <Input
                id="simple-amount"
                type="number"
                value={simpleAmount}
                onChange={(e) => setSimpleAmount(Number.parseFloat(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="simple-rate">Interest Rate (%)</Label>
              <Input
                id="simple-rate"
                type="number"
                value={simpleRate}
                onChange={(e) => setSimpleRate(Number.parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="simple-time">Time Period</Label>
              <Input
                id="simple-time"
                type="number"
                value={simpleTime}
                onChange={(e) => setSimpleTime(Number.parseFloat(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="simple-time-unit">Time Unit</Label>
              <Select value={simpleTimeUnit} onValueChange={setSimpleTimeUnit}>
                <SelectTrigger id="simple-time-unit">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="years">Years</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                  <SelectItem value="days">Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Interest Amount</p>
                <p className="text-3xl font-bold">{simpleInterest.toFixed(2)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-3xl font-bold">{simpleTotal.toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Simple Interest Formula</h3>
            <Card>
              <CardContent className="p-4">
                <p className="text-center font-medium">I = P × r × t</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Where:
                  <br />I = Interest
                  <br />P = Principal
                  <br />r = Rate of Interest (in decimal)
                  <br />t = Time Period (in years)
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compound" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="compound-amount">Principal Amount</Label>
              <Input
                id="compound-amount"
                type="number"
                value={compoundAmount}
                onChange={(e) => setCompoundAmount(Number.parseFloat(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="compound-rate">Interest Rate (%)</Label>
              <Input
                id="compound-rate"
                type="number"
                value={compoundRate}
                onChange={(e) => setCompoundRate(Number.parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="compound-time">Time (Years)</Label>
              <Input
                id="compound-time"
                type="number"
                value={compoundTime}
                onChange={(e) => setCompoundTime(Number.parseFloat(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="compound-frequency">Compounding Frequency</Label>
              <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
                <SelectTrigger id="compound-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yearly">Annually (1/year)</SelectItem>
                  <SelectItem value="semi-annually">Semi-annually (2/year)</SelectItem>
                  <SelectItem value="quarterly">Quarterly (4/year)</SelectItem>
                  <SelectItem value="monthly">Monthly (12/year)</SelectItem>
                  <SelectItem value="daily">Daily (365/year)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Interest Amount</p>
                <p className="text-3xl font-bold">{compoundInterest.toFixed(2)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-3xl font-bold">{compoundTotal.toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>

          {compoundYearlyBreakdown.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Yearly Breakdown</h3>
              <Card>
                <CardContent className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-medium">Year</TableHead>
                      <TableHead className="font-medium">Amount</TableHead>
                      <TableHead className="font-medium">Interest Earned</TableHead>  
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {compoundYearlyBreakdown.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell key={`year-${index}`}>{item.year}</TableCell>
                        <TableCell key={`amount-${index}`}>{item.amount.toFixed(2)}</TableCell>
                        <TableCell key={`interest-${index}`}>{(item.amount - compoundAmount).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Compound Interest Formula</h3>
            <Card>
              <CardContent className="p-4">
                <p className="text-center font-medium">A = P(1 + r/n)^(nt)</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Where:
                  <br />A = Final Amount
                  <br />P = Principal
                  <br />r = Annual Interest Rate (in decimal)
                  <br />n = Number of times interest is compounded per year
                  <br />t = Time Period (in years)
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </ToolLayout>
  )
}
