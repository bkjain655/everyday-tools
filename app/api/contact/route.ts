// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { z } from "zod"
import { getClientIp, rateLimit } from "@/lib/rate-limit"

const { EMAIL_USER, EMAIL_PASS } = process.env

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

  if (!EMAIL_USER || !EMAIL_PASS) {
    console.error("Contact form is not configured: EMAIL_USER/EMAIL_PASS missing")
    return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: EMAIL_USER, // Your Gmail
      pass: EMAIL_PASS, // Your App Password
    },
  })

  const mailOptions = {
    // Gmail only accepts the authenticated account as the sender; the visitor's
    // address goes on replyTo so it can never be injected into a header.
    from: EMAIL_USER,
    to: EMAIL_USER, // Send email to yourself
    replyTo: stripHeaderBreaks(email),
    subject: stripHeaderBreaks(`New message from ${name}`).slice(0, 150),
    text: `
Name: ${name}
Email: ${email}
Contact Number: ${contact}
Message: ${message}
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ success: true, message: "Email sent successfully" })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 })
  }
}
