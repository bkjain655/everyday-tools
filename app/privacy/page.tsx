import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="text-xl text-muted-foreground">How we handle your data</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Our Privacy Commitment</CardTitle>
          <CardDescription>Last updated: April 13, 2023</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            At Everyday Tools, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect
            your information when you use our website.
          </p>

          <h3 className="text-lg font-medium">Information We Don't Collect</h3>
          <p>
            Everyday Tools is designed with privacy in mind. All processing happens directly in your browser, and we do not
            collect, store, or transmit:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your personal information</li>
            <li>The content you process with our tools</li>
            <li>Files you upload for processing</li>
            <li>Generated outputs from our tools</li>
          </ul>

          <h3 className="text-lg font-medium">Information We Do Collect</h3>
          <p>We collect anonymous usage data to help us improve our service, including:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Which tools are most frequently used</li>
            <li>Basic browser and device information</li>
            <li>Performance metrics</li>
          </ul>
          <p>
            This information is collected using privacy-focused analytics that anonymize your data and do not track you
            across websites.
          </p>

          <h3 className="text-lg font-medium">Cookies</h3>
          <p>
            We use essential cookies to remember your preferences, such as dark/light mode settings. These cookies are
            stored locally on your device and are not used for tracking or advertising purposes.
          </p>

          <h3 className="text-lg font-medium">Third-Party Services</h3>
          <p>Everyday Tools may use the following third-party services:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Vercel - For hosting our website</li>
            <li>Simple Analytics - For privacy-focused, anonymous usage statistics</li>
          </ul>
          <p>These services have their own privacy policies, and we encourage you to review them.</p>

          <h3 className="text-lg font-medium">Changes to This Policy</h3>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
