import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { tools } from "@/lib/tools"

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">DevToolkit</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A collection of useful tools for developers and everyday users
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tools.map((tool) => (
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
      </section>
    </div>
  )
}
