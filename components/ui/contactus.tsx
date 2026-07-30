// components/ContactUs.tsx

"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { JSONFORGE_URL } from "@/lib/constants"

export default function ContactUs() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
    // Honeypot — hidden from real users, checked server-side.
    website: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
  
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
  
      const result = await response.json()
      if (response.ok && result.success) {
        toast.success("Message sent", { description: "Thanks for reaching out — we'll get back to you soon." })
        setFormData({ name: "", email: "", contact: "", message: "", website: "" })
        setOpen(false)
      } else {
        toast.error("Failed to send message", {
          description: result?.message || "Please try again later.",
        })
      }
    } catch (error) {
      console.error("Submit error:", error)
      toast.error("Something went wrong", { description: "Please check your connection and try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center p-6 bg-card text-card-foreground rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Contact Everyday Tools</h1>
        <p className="mb-4 text-center">
            Have a question, feedback, or need assistance? 
        </p>
        <p className="mb-4 text-center">
            We&apos;d love to hear from you!
            <br/>
            Whether it&apos;s a query about Everyday tools or suggestions for new features, feel free to reach out.  
            <br />
            Our team is ready to help you make the most of Everyday Tools.
        </p>
        <Button className="mt-6" onClick={() => setOpen(true)} disabled={loading}>
          Send a Message
        </Button>
        <p className="mt-6 text-sm text-muted-foreground">
          Working with JSON?{" "}
          <a href={JSONFORGE_URL} target="_blank" rel="noopener noreferrer" className="underline">
            JSONForge
          </a>{" "}
          is our sister site for formatting and validating JSON.
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Get in Touch</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                type="tel"
                required
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            {/* Honeypot field — hidden from humans and assistive tech. */}
            <div className="hidden" aria-hidden="true">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Submit"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
