"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ToolLayout from "@/components/tool-layout"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToolUsage } from "@/lib/use-tool-usage"

interface AmortizationRow {
  payment: number
  emi: number
  principal: number
  interest: number
  totalPrincipal: number
  totalInterest: number
  balance: number
}

export const LoanCalculatorLayout = () => {
  const trackUse = useToolUsage("loan-calculator", "loan_calculator_calculate")
  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState(100000)
  const [interestRate, setInterestRate] = useState(8)
  const [loanTerm, setLoanTerm] = useState(5)
  const [loanTermUnit, setLoanTermUnit] = useState("years")
  const [emi, setEmi] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([])

  // Calculate EMI and Amortization Schedule
  useEffect(() => {
    const calculateLoan = () => {
      // Convert term to months
      let termInMonths = loanTerm
      if (loanTermUnit === "years") {
        termInMonths = loanTerm * 12
      }

      // Monthly interest rate
      const monthlyRate = interestRate / 100 / 12

      // Calculate EMI
      const emiValue =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termInMonths)) /
        (Math.pow(1 + monthlyRate, termInMonths) - 1)

      setEmi(emiValue)

      // Calculate total payment and interest
      const totalPaymentValue = emiValue * termInMonths
      const totalInterestValue = totalPaymentValue - loanAmount

      setTotalPayment(totalPaymentValue)
      setTotalInterest(totalInterestValue)

      // Generate amortization schedule
      const schedule = []
      let remainingPrincipal = loanAmount
      let totalPrincipalPaid = 0
      let totalInterestPaid = 0

      for (let i = 1; i <= termInMonths; i++) {
        const interestForMonth = remainingPrincipal * monthlyRate
        const principalForMonth = emiValue - interestForMonth
        remainingPrincipal -= principalForMonth

        totalPrincipalPaid += principalForMonth
        totalInterestPaid += interestForMonth

        // Only add yearly entries to keep the table manageable
        if (i % 12 === 0 || i === termInMonths || i === 1) {
          schedule.push({
            payment: i,
            emi: emiValue,
            principal: principalForMonth,
            interest: interestForMonth,
            totalPrincipal: totalPrincipalPaid,
            totalInterest: totalInterestPaid,
            balance: Math.max(0, remainingPrincipal),
          })
        }
      }

      setAmortizationSchedule(schedule)
    }

    calculateLoan()
    trackUse({ loanTermUnit })
  }, [loanAmount, interestRate, loanTerm, loanTermUnit, trackUse])

  return (
    <ToolLayout title="Loan EMI Calculator" description="Calculate loan EMIs and payment schedules">
      <Tabs defaultValue="emi">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="emi">EMI Calculator</TabsTrigger>
          <TabsTrigger value="schedule">Amortization Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="emi" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="loan-amount">Loan Amount: {loanAmount.toLocaleString()}</Label>
              </div>
              <Slider
                id="loan-amount"
                min={1000}
                max={10000000}
                step={1000}
                value={[loanAmount]}
                onValueChange={(value) => setLoanAmount(value[0])}
              />
              <Input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value) || 0)}
                className="mt-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="interest-rate">Interest Rate: {interestRate}%</Label>
              </div>
              <Slider
                id="interest-rate"
                min={1}
                max={30}
                step={0.1}
                value={[interestRate]}
                onValueChange={(value) => setInterestRate(value[0])}
              />
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                className="mt-2"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="loan-term">Loan Term</Label>
                <Input
                  id="loan-term"
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loan-term-unit">Term Unit</Label>
                <Select value={loanTermUnit} onValueChange={setLoanTermUnit}>
                  <SelectTrigger id="loan-term-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="years">Years</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Monthly EMI</p>
                <p className="text-3xl font-bold">{emi.toFixed(2)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Total Interest</p>
                <p className="text-3xl font-bold">{totalInterest.toFixed(2)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Total Payment</p>
                <p className="text-3xl font-bold">{totalPayment.toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">EMI Formula</h3>
            <Card>
              <CardContent className="p-4">
                <p className="text-center font-medium">EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Where:
                  <br />
                  EMI = Equated Monthly Installment
                  <br />P = Principal Loan Amount
                  <br />r = Monthly Interest Rate (Annual Rate ÷ 12 ÷ 100)
                  <br />n = Loan Term in Months
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Amortization Schedule</h3>
            <Card>
              <CardContent className="p-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment #</TableHead>
                        <TableHead>EMI</TableHead>
                        <TableHead>Principal</TableHead>
                        <TableHead>Interest</TableHead>
                        <TableHead>Balance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {amortizationSchedule.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.payment}</TableCell>
                          <TableCell>{item.emi.toFixed(2)}</TableCell>
                          <TableCell>{item.principal.toFixed(2)}</TableCell>
                          <TableCell>{item.interest.toFixed(2)}</TableCell>
                          <TableCell>{item.balance.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Total Principal</p>
                <p className="text-3xl font-bold">{loanAmount.toFixed(2)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Total Interest</p>
                <p className="text-3xl font-bold">{totalInterest.toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Note: This amortization schedule shows key payments throughout the loan term. The first payment, last
              payment, and yearly milestones are displayed to keep the table manageable.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </ToolLayout>
  )
}
