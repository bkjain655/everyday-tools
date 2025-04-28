import { tools } from "@/lib/tools"
import { HomeLayout } from "./HomeLayout"

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
        <HomeLayout />
      </section>
    </div>
  )
}
