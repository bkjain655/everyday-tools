"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ToolLayout from "@/components/tool-layout"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight } from "lucide-react"

// Conversion factors for different units
const lengthUnits = {
  meter: 1,
  kilometer: 1000,
  centimeter: 0.01,
  millimeter: 0.001,
  mile: 1609.34,
  yard: 0.9144,
  foot: 0.3048,
  inch: 0.0254,
}

const weightUnits = {
  kilogram: 1,
  gram: 0.001,
  milligram: 0.000001,
  pound: 0.453592,
  ounce: 0.0283495,
  ton: 1000,
  "us-ton": 907.185,
}

const volumeUnits = {
  liter: 1,
  milliliter: 0.001,
  "cubic-meter": 1000,
  "cubic-centimeter": 0.001,
  gallon: 3.78541,
  quart: 0.946353,
  pint: 0.473176,
  "fluid-ounce": 0.0295735,
}

const areaUnits = {
  "square-meter": 1,
  "square-kilometer": 1000000,
  "square-centimeter": 0.0001,
  "square-millimeter": 0.000001,
  "square-mile": 2589988.11,
  "square-yard": 0.836127,
  "square-foot": 0.092903,
  "square-inch": 0.00064516,
  acre: 4046.86,
  hectare: 10000,
}

const temperatureUnits = {
  celsius: "celsius",
  fahrenheit: "fahrenheit",
  kelvin: "kelvin",
}

const timeUnits = {
  second: 1,
  minute: 60,
  hour: 3600,
  day: 86400,
  week: 604800,
  month: 2592000, // 30 days
  year: 31536000, // 365 days
}

export const MetricConverterLayout = () => {
  const [category, setCategory] = useState("length")
  const [fromUnit, setFromUnit] = useState("")
  const [toUnit, setToUnit] = useState("")
  const [fromValue, setFromValue] = useState(1)
  const [toValue, setToValue] = useState(0)

  // Set default units when category changes
  useEffect(() => {
    switch (category) {
      case "length":
        setFromUnit("meter")
        setToUnit("foot")
        break
      case "weight":
        setFromUnit("kilogram")
        setToUnit("pound")
        break
      case "volume":
        setFromUnit("liter")
        setToUnit("gallon")
        break
      case "area":
        setFromUnit("square-meter")
        setToUnit("square-foot")
        break
      case "temperature":
        setFromUnit("celsius")
        setToUnit("fahrenheit")
        break
      case "time":
        setFromUnit("hour")
        setToUnit("minute")
        break
    }
  }, [category])

  // Convert values when inputs change
  useEffect(() => {
    if (!fromUnit || !toUnit) return

    const convert = () => {
      if (category === "temperature") {
        // Special handling for temperature
        if (fromUnit === "celsius" && toUnit === "fahrenheit") {
          setToValue((fromValue * 9) / 5 + 32)
        } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
          setToValue(((fromValue - 32) * 5) / 9)
        } else if (fromUnit === "celsius" && toUnit === "kelvin") {
          setToValue(fromValue + 273.15)
        } else if (fromUnit === "kelvin" && toUnit === "celsius") {
          setToValue(fromValue - 273.15)
        } else if (fromUnit === "fahrenheit" && toUnit === "kelvin") {
          setToValue(((fromValue - 32) * 5) / 9 + 273.15)
        } else if (fromUnit === "kelvin" && toUnit === "fahrenheit") {
          setToValue(((fromValue - 273.15) * 9) / 5 + 32)
        } else {
          setToValue(fromValue) // Same unit
        }
      } else {
        // For other categories, use conversion factors
        const units = getUnitsForCategory(category)
        if (!units) return

        const fromFactor = units[fromUnit]
        const toFactor = units[toUnit]

        if (fromFactor && toFactor) {
          const result = (fromValue * fromFactor) / toFactor
          setToValue(result)
        }
      }
    }

    convert()
  }, [category, fromUnit, toUnit, fromValue])

  const getUnitsForCategory = (cat: string) => {
    switch (cat) {
      case "length":
        return lengthUnits
      case "weight":
        return weightUnits
      case "volume":
        return volumeUnits
      case "area":
        return areaUnits
      case "temperature":
        return temperatureUnits
      case "time":
        return timeUnits
      default:
        return null
    }
  }

  const formatUnitName = (unit: string) => {
    return unit
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <ToolLayout title="Metric Converter" description="Convert between different units of measurement">
      <Tabs value={category} onValueChange={setCategory}>
        <TabsList className="grid grid-cols-3 sm:grid-cols-6">
          <TabsTrigger value="length">Length</TabsTrigger>
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="volume">Volume</TabsTrigger>
          <TabsTrigger value="area">Area</TabsTrigger>
          <TabsTrigger value="temperature">Temperature</TabsTrigger>
          <TabsTrigger value="time">Time</TabsTrigger>
        </TabsList>

        {["length", "weight", "volume", "area", "temperature", "time"].map((cat) => (
          <TabsContent key={cat} value={cat} className="space-y-6">
            <Card className="p-6">
              <div className="grid gap-6 sm:grid-cols-5 items-end">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor={`from-value-${cat}`}>From</Label>
                  <Input
                    id={`from-value-${cat}`}
                    type="number"
                    value={fromValue}
                    onChange={(e) => setFromValue(Number.parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div className="hidden sm:flex justify-center items-center">
                  <ArrowRight className="h-5 w-5" />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor={`to-value-${cat}`}>To</Label>
                  <Input id={`to-value-${cat}`} type="number" value={toValue} readOnly />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-5 items-end mt-6">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor={`from-unit-${cat}`}>Unit</Label>
                  <Select value={fromUnit} onValueChange={setFromUnit}>
                    <SelectTrigger id={`from-unit-${cat}`}>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(getUnitsForCategory(cat) || {}).map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {formatUnitName(unit)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="hidden sm:block"></div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor={`to-unit-${cat}`}>Unit</Label>
                  <Select value={toUnit} onValueChange={setToUnit}>
                    <SelectTrigger id={`to-unit-${cat}`}>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(getUnitsForCategory(cat) || {}).map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {formatUnitName(unit)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <div className="text-sm text-muted-foreground">
              <h3 className="font-medium mb-2">Common Conversions:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {cat === "length" && (
                  <>
                    <li>1 meter = 3.28084 feet</li>
                    <li>1 kilometer = 0.621371 miles</li>
                    <li>1 inch = 2.54 centimeters</li>
                  </>
                )}
                {cat === "weight" && (
                  <>
                    <li>1 kilogram = 2.20462 pounds</li>
                    <li>1 pound = 16 ounces</li>
                    <li>1 ton = 2000 pounds</li>
                  </>
                )}
                {cat === "volume" && (
                  <>
                    <li>1 liter = 0.264172 gallons</li>
                    <li>1 gallon = 4 quarts</li>
                    <li>1 cubic meter = 1000 liters</li>
                  </>
                )}
                {cat === "area" && (
                  <>
                    <li>1 square meter = 10.7639 square feet</li>
                    <li>1 acre = 43,560 square feet</li>
                    <li>1 hectare = 2.47105 acres</li>
                  </>
                )}
                {cat === "temperature" && (
                  <>
                    <li>0°C = 32°F = 273.15K</li>
                    <li>100°C = 212°F = 373.15K</li>
                    <li>-40°C = -40°F</li>
                  </>
                )}
                {cat === "time" && (
                  <>
                    <li>1 day = 24 hours</li>
                    <li>1 week = 7 days</li>
                    <li>1 year = 365 days (non-leap year)</li>
                  </>
                )}
              </ul>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </ToolLayout>
  )
}
