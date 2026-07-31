// Set NEXT_PUBLIC_SITE_URL in the deployment environment (e.g. a custom domain).
// Falls back to the current production deployment.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://tools.bkjlabs.com").replace(/\/$/, "")

export const SITE_NAME = "Everyday Tools"

// Sister project — cross-linked from the UI, deliberately kept out of this site's keywords.
export const JSONFORGE_URL = "https://www.jsonforge.com/"

export const AUTHOR_NAME = "Bhavesh Kumar"
export const AUTHOR_URL = "https://bkjtech-world.vercel.app/"
