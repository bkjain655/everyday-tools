// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"
import { getClientIp, rateLimit } from "@/lib/rate-limit"

// Anything that reaches a mail header must not be able to start a new one.
const stripHeaderBreaks = (value: string) => value.replace(/[\r\n]+/g, " ").trim()

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("A valid email is required").max(254),
  contact: z.string().trim().max(30).optional().default(""),
  message: z.string().trim().min(1, "Message is required").max(5000),
  // Honeypot: hidden in the UI, so only bots fill it in.
  website: z.string().max(0).optional().default(""),
})

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers)
  const limit = rateLimit(`contact:${ip}`)
  if (!limit.success) {
    return NextResponse.json(
      { success: false, message: "Too many messages. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    )
  }

  const { name, email, contact, message, website } = parsed.data

  // Honeypot tripped: pretend everything is fine, send nothing.
  if (website) {
    return NextResponse.json({ success: true, message: "Email sent successfully" })
  }

  // Read config at request time (not module scope) so Vercel's runtime env is
  // always used. Log exactly which var is missing to make setup issues obvious.
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL
  const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    const missing = [
      !RESEND_API_KEY && "RESEND_API_KEY",
      !CONTACT_TO_EMAIL && "CONTACT_TO_EMAIL",
      !CONTACT_FROM_EMAIL && "CONTACT_FROM_EMAIL",
    ].filter(Boolean)
    console.error(`Contact form is not configured — missing: ${missing.join(", ")}`)
    return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 503 })
  }

  const resend = new Resend(RESEND_API_KEY)

  try {
    // `from` is a verified sender we control; the visitor's address is only ever
    // used as replyTo so it can never be injected into a header.
    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: stripHeaderBreaks(email),
      subject: stripHeaderBreaks(`[Everyday Tools] New message from ${name}`).slice(0, 150),
      text: `
Name: ${name}
Email: ${email}
Contact Number: ${contact}
Message: ${message}
    `,
    })

    if (error) {
      console.error("Resend rejected the contact email:", error)
      return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 502 })
    }

    return NextResponse.json({ success: true, message: "Email sent successfully" })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 })
  }
}
