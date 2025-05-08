"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { tools } from "@/lib/tools"
import { useState } from "react"

export const HomeLayout = () => {
    const defaultTools = tools.reduce((acc, tool) => {
        if (!acc[tool.category]) {
            acc[tool.category] = []
        }
        acc[tool.category].push(tool)
        return acc
    }, {} as Record<string, typeof tools>);
    const [inputBase, setInputBase] = useState("ALL");
    const [filteredTools, setFilteredTools] = useState(defaultTools);
    
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        if (!value) {
            onInputBaseChange(inputBase);
            return;
        }
        if (inputBase === "ALL") {
            const newFilteredTools = tools.reduce((acc, tool) => {
                if (tool.name.toLowerCase().includes(value) || tool.description.toLowerCase().includes(value)) {
                    if (!acc[tool.category]) {
                        acc[tool.category] = []
                    }
                    acc[tool.category].push(tool)
                }
                return acc;
            }
            , {} as Record<string, typeof tools>);
            setFilteredTools(newFilteredTools);
        } else {
            const newFilteredTools = tools.reduce((acc, tool) => {
                if (tool.category === inputBase && (tool.name.toLowerCase().includes(value) || tool.description.toLowerCase().includes(value))) {
                    if (!acc[tool.category]) {
                        acc[tool.category] = []
                    }
                    acc[tool.category].push(tool)
                }
                return acc;
            }
            , {} as Record<string, typeof tools>);
            setFilteredTools(newFilteredTools);
        }
    };
    const onInputBaseChange = (value: string) => {
        setInputBase(value);
        if (value === "ALL") {
            setFilteredTools(defaultTools);
            return;
        }
        const newFilteredTools = tools.reduce((acc, tool) => {
            if (tool.category === value) {
                if (!acc[tool.category]) {
                    acc[tool.category] = []
                }
                acc[tool.category].push(tool)
            }
            return acc;
        }
        , {} as Record<string, typeof tools>);  
        setFilteredTools(newFilteredTools);
    };
    const categories = Object.keys(defaultTools).sort();

    return <div className="flex flex-col items-center mb-4 gap-2">
        <div className="flex flex-row justify-end items-end mb-4 gap-2 w-full">
            <div className="space-y-2">
              <Label htmlFor="input-base">Input Base</Label>
              <Select value={inputBase} onValueChange={onInputBaseChange}>
                <SelectTrigger id="input-base">
                  <SelectValue placeholder="Select base" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem key='ALL' value='ALL'>
                      All
                    </SelectItem>
                    {categories.map((value) => (
                        <SelectItem key={value} value={value}>
                        {value}
                        </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <input
                type="text"
                placeholder="Search tools..."
                onChange={handleSearchChange}
                className="border border-gray-300 rounded-md p-2 w-full max-w-md"
            />
        </div>
        {categories.map((category) => {
            return filteredTools[category]?.length > 0 && <div key={category} className="p-4 w-full">
            <h2 className="text-2xl font-semibold">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredTools[category].map((tool) => (
                <Card key={tool.href} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                        {tool.icon}
                        {tool.name}
                    </CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Link href={tool.href} passHref>
                        <Button className="w-full">Open Tool</Button>
                    </Link>
                    </CardContent>
                </Card>
                ))}
            </div>
            </div>
        })}
    </div>
}