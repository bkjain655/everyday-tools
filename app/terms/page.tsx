import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Terms of Service</h1>
        <p className="text-xl text-muted-foreground">Rules and guidelines for using DevToolkit</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Terms of Service</CardTitle>
          <CardDescription>Last updated: April 13, 2023</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Welcome to DevToolkit. By accessing or using our website, you agree to be bound by these Terms of Service.
          </p>

          <h3 className="text-lg font-medium">1. Acceptance of Terms</h3>
          <p>
            By accessing or using DevToolkit, you agree to be bound by these Terms of Service and all applicable laws
            and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing
            this site.
          </p>

          <h3 className="text-lg font-medium">2. Use License</h3>
          <p>
            Permission is granted to temporarily use DevToolkit for personal, non-commercial purposes. This is the grant
            of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software contained on DevToolkit</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>

          <h3 className="text-lg font-medium">3. Disclaimer</h3>
          <p>
            The materials on DevToolkit are provided on an 'as is' basis. DevToolkit makes no warranties, expressed or
            implied, and hereby disclaims and negates all other warranties including, without limitation, implied
            warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
            intellectual property or other violation of rights.
          </p>

          <h3 className="text-lg font-medium">4. Limitations</h3>
          <p>
            In no event shall DevToolkit or its suppliers be liable for any damages (including, without limitation,
            damages for loss of data or profit, or due to business interruption) arising out of the use or inability to
            use the materials on DevToolkit, even if DevToolkit or a DevToolkit authorized representative has been
            notified orally or in writing of the possibility of such damage.
          </p>

          <h3 className="text-lg font-medium">5. Accuracy of Materials</h3>
          <p>
            The materials appearing on DevToolkit could include technical, typographical, or photographic errors.
            DevToolkit does not warrant that any of the materials on its website are accurate, complete or current.
            DevToolkit may make changes to the materials contained on its website at any time without notice.
          </p>

          <h3 className="text-lg font-medium">6. Links</h3>
          <p>
            DevToolkit has not reviewed all of the sites linked to its website and is not responsible for the contents
            of any such linked site. The inclusion of any link does not imply endorsement by DevToolkit of the site. Use
            of any such linked website is at the user's own risk.
          </p>

          <h3 className="text-lg font-medium">7. Modifications</h3>
          <p>
            DevToolkit may revise these terms of service for its website at any time without notice. By using this
            website you are agreeing to be bound by the then current version of these terms of service.
          </p>

          <h3 className="text-lg font-medium">8. Governing Law</h3>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws and you irrevocably
            submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
