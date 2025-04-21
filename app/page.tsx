import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { tools } from "@/lib/tools"

export default function Home() {
  const categorizedTools = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = []
    }
    acc[tool.category].push(tool)
    return acc
  }, {} as Record<string, typeof tools>)
  const categories = Object.keys(categorizedTools).sort();
  return (
    <div className="space-y-8">
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Everyday Tools</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A collection of useful tools for developers and everyday users
        </p>
      </section>

      <section>
        <div className="flex flex-col items-center mb-4 gap-2">
        {categories.map((category) => (
          <div key={category} className="px-8 w-full">
            <h2 className="text-2xl font-semibold">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {categorizedTools[category].map((tool) => (
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
        ))}
        </div>
      </section>
    </div>
  )
}
