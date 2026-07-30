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
    const [category, setCategory] = useState("ALL");
    const [filteredTools, setFilteredTools] = useState(defaultTools);
    
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        if (!value) {
            onCategoryChange(category);
            return;
        }
        if (category === "ALL") {
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
                if (tool.category === category && (tool.name.toLowerCase().includes(value) || tool.description.toLowerCase().includes(value))) {
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
    const onCategoryChange = (value: string) => {
        setCategory(value);
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
              <Select value={category} onValueChange={onCategoryChange}>
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
            <div className="w-full sm:max-w-md space-y-2">
                <Label htmlFor="tool-search" className="sr-only">
                    Search tools
                </Label>
                <input
                    id="tool-search"
                    type="search"
                    placeholder="Search tools..."
                    onChange={handleSearchChange}
                    className="border border-input bg-background rounded-md p-2 w-full"
                />
            </div>
        </div>
        {categories.map((groupName) => {
            return filteredTools[groupName]?.length > 0 && <div key={groupName} className="p-4 w-full">
            <h2 className="text-2xl font-semibold">{groupName}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredTools[groupName].map((tool) => (
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