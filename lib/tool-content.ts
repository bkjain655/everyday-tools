// Long-form, unique content for each tool page. This is what makes the pages
// rank (depth + intent coverage) and pass ad-network content review — so keep it
// genuinely useful and specific, never spun boilerplate. Keyed by tool href.

export interface Faq {
  question: string
  answer: string
}

export interface UseCase {
  title: string
  description: string
}

export interface ToolContent {
  /** 2 paragraphs: what it does, how it works, why it's safe. */
  intro: string[]
  howTo: string[]
  useCases: UseCase[]
  faqs: Faq[]
  /** hrefs of related tools for internal linking. */
  related: string[]
}

export const TOOL_CONTENT: Record<string, ToolContent> = {
  "/tools/ocr": {
    intro: [
      "OCR (optical character recognition) turns an image of text — a screenshot, a scanned page, a photo of a receipt — into editable, copy-pasteable text. Instead of retyping, you extract the words directly.",
      "This tool runs OCR entirely in your browser using a WebAssembly engine, so your images are never uploaded to a server. It works on common formats like JPG and PNG, and can also read text from PDF pages.",
    ],
    howTo: [
      "Upload or drag in an image (or PDF) containing text.",
      "Wait a moment while the recognition engine processes it locally.",
      "Review the extracted text and fix any misreads (OCR isn't perfect on low-quality scans).",
      "Copy the text or download it for use elsewhere.",
    ],
    useCases: [
      { title: "Digitising receipts & documents", description: "Pull text out of scanned paperwork without retyping it." },
      { title: "Grabbing text from screenshots", description: "Extract copy from an image where you can't select the text." },
      { title: "Accessibility", description: "Convert an image of text into a format screen readers and search can use." },
    ],
    faqs: [
      { question: "Are my images uploaded anywhere?", answer: "No. Recognition runs in your browser via WebAssembly, so images never leave your device — safe for private documents." },
      { question: "Why isn't the extracted text perfect?", answer: "OCR accuracy depends on image quality. Clear, high-contrast, straight text reads best; blurry photos, handwriting, or unusual fonts produce more errors." },
      { question: "Which languages are supported?", answer: "The engine reads Latin-script languages (like English) well out of the box. Very stylised fonts or non-Latin scripts may need a specialised model." },
      { question: "Can it read PDFs?", answer: "Yes — PDF pages are rendered and then recognised. Multi-page or image-only (scanned) PDFs work; text-based PDFs are usually better copied directly." },
    ],
    related: ["/tools/image-to-base64", "/tools/image-converter"],
  },
  "/tools/image-to-base64": {
    intro: [
      "Base64 encoding turns a binary file, like an image, into a plain-text string. That string can be embedded directly in HTML, CSS, JSON, or a data URI — no separate image request needed.",
      "This converter reads your image in the browser and returns its Base64 data URI instantly. Nothing is uploaded, so it's safe for private assets. Note that Base64 is ~33% larger than the raw file, so it suits small icons, not large photos.",
    ],
    howTo: [
      "Upload or drop in an image (PNG, JPG, GIF, SVG, etc.).",
      "The tool encodes it to a Base64 data URI in your browser.",
      "Copy the string, or the ready-to-use `<img src=…>` / CSS `url(…)` snippet.",
      "Paste it into your HTML, CSS, or JSON.",
    ],
    useCases: [
      { title: "Inlining small icons", description: "Embed a tiny logo or icon in CSS/HTML to save an HTTP request." },
      { title: "Email templates", description: "Some email workflows need images inlined as data URIs." },
      { title: "Embedding in JSON/config", description: "Ship a small image inside a JSON payload or config file." },
    ],
    faqs: [
      { question: "When should I NOT use Base64 for images?", answer: "For large images. Base64 inflates size by ~33% and can't be cached separately, so big photos load slower inline than as normal files." },
      { question: "Is my image uploaded?", answer: "No. The file is read and encoded locally in your browser — nothing is sent to a server." },
      { question: "What's a data URI?", answer: "A string like data:image/png;base64,XXXX that embeds the file inline. Browsers treat it as if it were a real image URL." },
      { question: "Can I decode Base64 back to an image?", answer: "Yes — paste a data URI into an image src, or use a Base64 decoder. This tool focuses on encoding." },
    ],
    related: ["/tools/image-converter", "/tools/ocr"],
  },
  "/tools/image-converter": {
    intro: [
      "This tool converts images between the common web formats — PNG, JPG, WEBP and HEIC. HEIC (from iPhones) in particular often needs converting to JPG or PNG before other apps will accept it.",
      "All conversion happens in your browser, so your images are never uploaded. WEBP typically gives the smallest files for the web; PNG preserves transparency; JPG is best for photos where small size matters more than perfect fidelity.",
    ],
    howTo: [
      "Upload or drop in one or more images.",
      "Pick the output format (PNG, JPG, or WEBP).",
      "Convert — everything runs locally in your browser.",
      "Download the converted image(s).",
    ],
    useCases: [
      { title: "HEIC → JPG", description: "Make iPhone photos usable in apps and sites that don't accept HEIC." },
      { title: "Shrinking for the web", description: "Convert PNG/JPG to WEBP to reduce page weight." },
      { title: "Needing transparency", description: "Convert to PNG when you need a transparent background." },
    ],
    faqs: [
      { question: "Are my images uploaded?", answer: "No. Conversion runs entirely in your browser — your files never leave your device." },
      { question: "Which format should I choose?", answer: "WEBP for the smallest web images, PNG when you need transparency or lossless quality, JPG for photos where a small file matters most." },
      { question: "Why convert HEIC?", answer: "HEIC is Apple's efficient photo format, but many apps, sites and Windows tools can't open it. Converting to JPG or PNG makes it universally usable." },
      { question: "Will converting reduce quality?", answer: "Converting to a lossy format (JPG/WEBP) can slightly reduce quality; PNG is lossless. Re-encoding repeatedly compounds any loss." },
    ],
    related: ["/tools/image-to-base64", "/tools/ocr"],
  },
  "/tools/character-counter": {
    intro: [
      "A character counter tallies the characters, words, sentences and lines in a block of text in real time. It's essential wherever there's a limit — tweets, meta descriptions, SMS, form fields, essays.",
      "This tool counts as you type, entirely in your browser. It distinguishes characters with and without spaces, so you can match whatever limit a platform actually enforces.",
    ],
    howTo: [
      "Type or paste your text into the box.",
      "Watch the character, word, sentence and line counts update live.",
      "Trim to fit the limit you're targeting.",
    ],
    useCases: [
      { title: "Hitting platform limits", description: "Stay under Twitter/X, SMS, or meta-description character caps." },
      { title: "Writing SEO metadata", description: "Keep titles ~60 and descriptions ~155 characters for clean search snippets." },
      { title: "Essays & assignments", description: "Meet word-count requirements without guessing." },
    ],
    faqs: [
      { question: "Does it count spaces?", answer: "It shows both: characters including spaces and excluding spaces, since different platforms count differently." },
      { question: "How are words counted?", answer: "Words are runs of non-whitespace characters, so it matches most word-processor counts." },
      { question: "Is my text sent anywhere?", answer: "No. Counting happens in your browser as you type — nothing is transmitted." },
      { question: "What character limits should I aim for?", answer: "Common ones: SEO title ~60, meta description ~155, tweet 280, single SMS 160 characters." },
    ],
    related: ["/tools/hash-generator", "/tools/base-converter"],
  },
  "/tools/uuid-generator": {
    intro: [
      "A UUID (universally unique identifier) is a 128-bit value used as an ID that's practically guaranteed not to collide — even across different systems generating them independently. They look like 550e8400-e29b-41d4-a716-446655440000.",
      "This generator creates version-4 UUIDs (random) in your browser. Because v4 UUIDs are random, you can generate them offline and trust they won't clash, which is why they're the default for database keys, request IDs and more.",
    ],
    howTo: [
      "Open the tool — a fresh UUID is generated instantly.",
      "Generate more, or a batch, as needed.",
      "Copy the UUID(s) for use as IDs.",
    ],
    useCases: [
      { title: "Database primary keys", description: "Use UUIDs instead of auto-increment IDs to avoid coordination across services." },
      { title: "Request / correlation IDs", description: "Tag logs and traces so a request can be followed across systems." },
      { title: "Idempotency keys", description: "Give each operation a unique key to safely retry it." },
    ],
    faqs: [
      { question: "Will two UUIDs ever collide?", answer: "Practically never. A v4 UUID has 122 random bits; you'd need to generate billions per second for many years before a collision became likely." },
      { question: "What's the difference between v1 and v4?", answer: "v1 is based on timestamp + MAC address (ordered but leaks info); v4 is fully random. v4 is the safe default for most uses." },
      { question: "Are the UUIDs generated privately?", answer: "Yes. They're created in your browser using its cryptographic random source — nothing is sent anywhere." },
      { question: "Can I use a UUID as a database key?", answer: "Yes, and it's common. Note random UUIDs can fragment some indexes; UUIDv7 or ULIDs are alternatives when insert order matters." },
    ],
    related: ["/tools/random-number", "/tools/hash-generator"],
  },
  "/tools/random-number": {
    intro: [
      "A random number generator produces a number within a range you choose. Useful for games, draws, sampling, simulations, or just making an unbiased decision.",
      "This tool generates numbers in your browser. For casual use its randomness is more than enough; for security-sensitive needs (keys, tokens) use a dedicated cryptographic tool instead.",
    ],
    howTo: [
      "Set the minimum and maximum of your range.",
      "Choose how many numbers to generate (and whether duplicates are allowed).",
      "Generate — the result appears instantly.",
      "Copy the number(s).",
    ],
    useCases: [
      { title: "Giveaways & draws", description: "Pick a winner fairly from a numbered list." },
      { title: "Sampling & testing", description: "Generate random inputs for tests or simulations." },
      { title: "Everyday decisions", description: "Break a tie or make an unbiased choice." },
    ],
    faqs: [
      { question: "Is this suitable for security (passwords, tokens)?", answer: "No. Use a purpose-built cryptographic generator for secrets. This tool is for general-purpose randomness, not security." },
      { question: "Can I get unique (non-repeating) numbers?", answer: "Yes — enable the no-duplicates option to draw distinct numbers from your range, like a lottery." },
      { question: "Is the range inclusive?", answer: "Yes, both the minimum and maximum you set are possible results." },
      { question: "Is anything sent to a server?", answer: "No. Numbers are generated locally in your browser." },
    ],
    related: ["/tools/uuid-generator", "/tools/base-converter"],
  },
  "/tools/qr-code": {
    intro: [
      "A QR code is a scannable square barcode that encodes text — most often a URL, but also Wi-Fi credentials, contact details, or any short string. Point a phone camera at it and it opens instantly.",
      "This generator creates a QR code from your text in the browser and lets you download it as an image. Nothing is uploaded, so it's fine for private links.",
    ],
    howTo: [
      "Enter the URL or text you want to encode.",
      "The QR code renders instantly as you type.",
      "Download it as an image (PNG/SVG) to print or share.",
    ],
    useCases: [
      { title: "Linking to a site", description: "Put a scannable link on a poster, business card, or product." },
      { title: "Sharing Wi-Fi", description: "Encode network credentials so guests can join by scanning." },
      { title: "Menus & events", description: "Point people to a menu, ticket, or signup page with a scan." },
    ],
    faqs: [
      { question: "Do QR codes expire?", answer: "No — the code itself is static and encodes your text forever. If it points to a URL, only the destination page can change or go away." },
      { question: "How much text can a QR code hold?", answer: "Up to a few thousand characters, but the more you encode the denser (harder to scan) it gets. Short URLs scan most reliably." },
      { question: "Is my data uploaded?", answer: "No. The QR code is generated entirely in your browser." },
      { question: "What size should I print it?", answer: "Bigger is more reliable. As a rule of thumb, keep the printed code at least 2×2 cm, larger for scanning from a distance." },
    ],
    related: ["/tools/image-to-base64", "/tools/random-number"],
  },
  "/tools/jwt-decoder": {
    intro: [
      "A JWT (JSON Web Token) is a compact, signed token — three Base64url parts separated by dots — used to carry authentication and authorization data between a client and server. Decoding one reveals its header and payload (the claims).",
      "This decoder splits and Base64url-decodes the token in your browser so you can inspect the claims (issuer, subject, expiry, roles). It never uploads your token. Important: decoding is not verifying — anyone can read a JWT's contents; only the server with the secret can confirm it's authentic.",
    ],
    howTo: [
      "Paste your JWT into the input.",
      "The header and payload are decoded and shown as readable JSON.",
      "Inspect the claims — especially `exp` (expiry), `iss` (issuer) and any roles.",
    ],
    useCases: [
      { title: "Debugging auth", description: "See exactly what claims a token carries and whether it's expired." },
      { title: "Checking expiry", description: "Read the `exp` claim to confirm a token is still valid." },
      { title: "Learning JWTs", description: "Understand the header/payload/signature structure by example." },
    ],
    faqs: [
      { question: "Does decoding verify the token?", answer: "No. Decoding just reads the (unencrypted) header and payload. Verifying the signature requires the secret/public key and is done server-side." },
      { question: "Is a JWT encrypted?", answer: "Usually not — a standard JWT is signed, not encrypted. Its payload is only Base64-encoded, so never put secrets in a JWT payload." },
      { question: "Is my token sent anywhere?", answer: "No. Decoding happens entirely in your browser, which matters because tokens are sensitive credentials." },
      { question: "What does the `exp` claim mean?", answer: "It's the expiry time as a Unix timestamp. After that moment the token should be rejected by the server." },
    ],
    related: ["/tools/hash-generator", "/tools/base-converter"],
  },
  "/tools/interest-calculator": {
    intro: [
      "This calculator works out both simple and compound interest on a principal amount over time. Simple interest is charged only on the original principal; compound interest is charged on the principal plus previously accrued interest — which grows much faster.",
      "Enter your principal, rate and duration and it computes the interest and final amount in your browser. It's handy for comparing savings, fixed deposits, or the true cost of borrowing.",
    ],
    howTo: [
      "Enter the principal amount.",
      "Enter the annual interest rate and the time period.",
      "Choose simple or compound (and, for compound, the compounding frequency).",
      "Read off the interest earned and the final total.",
    ],
    useCases: [
      { title: "Comparing savings/FDs", description: "See how much a deposit grows at a given rate and term." },
      { title: "Understanding loan cost", description: "Estimate the interest you'll pay on borrowed money." },
      { title: "Financial planning", description: "Project the future value of an investment." },
    ],
    faqs: [
      { question: "What's the difference between simple and compound interest?", answer: "Simple interest is calculated only on the principal. Compound interest is calculated on the principal plus accumulated interest, so it grows faster over time." },
      { question: "How does compounding frequency matter?", answer: "More frequent compounding (monthly vs yearly) yields slightly more interest, because interest starts earning interest sooner." },
      { question: "Is this financial advice?", answer: "No — it's a math tool. It shows the arithmetic; it doesn't account for taxes, fees, or changing rates." },
      { question: "Are my figures sent anywhere?", answer: "No. The calculation runs entirely in your browser." },
    ],
    related: ["/tools/loan-calculator", "/tools/metric-converter"],
  },
  "/tools/loan-calculator": {
    intro: [
      "An EMI (equated monthly instalment) calculator tells you the fixed monthly payment on a loan, plus the total interest you'll pay over its life. It uses the standard amortisation formula based on principal, interest rate and tenure.",
      "Enter your loan details and it computes the EMI, total interest, and total repayment in your browser. Use it to compare loan offers or check what a given loan will actually cost you each month.",
    ],
    howTo: [
      "Enter the loan amount (principal).",
      "Enter the annual interest rate and the tenure (in months or years).",
      "Read the monthly EMI, total interest, and total amount payable.",
      "Adjust the numbers to compare scenarios.",
    ],
    useCases: [
      { title: "Home / car loans", description: "See the monthly EMI before you commit to a loan." },
      { title: "Comparing offers", description: "Weigh two loans by their true total cost, not just the rate." },
      { title: "Budgeting", description: "Check that an EMI fits your monthly budget." },
    ],
    faqs: [
      { question: "How is EMI calculated?", answer: "With the standard formula EMI = P·r·(1+r)^n / ((1+r)^n − 1), where P is principal, r the monthly rate, and n the number of months." },
      { question: "Does a longer tenure reduce the EMI?", answer: "Yes — a longer tenure lowers the monthly EMI but increases the total interest you pay over the life of the loan." },
      { question: "Does this include fees or insurance?", answer: "No. It computes the pure principal-and-interest EMI; processing fees, insurance and taxes are extra." },
      { question: "Is my data private?", answer: "Yes. The calculation happens entirely in your browser." },
    ],
    related: ["/tools/interest-calculator", "/tools/metric-converter"],
  },
  "/tools/metric-converter": {
    intro: [
      "A metric/unit converter changes a measurement from one unit to another — length, mass, volume, temperature, and more. It removes the guesswork (and the risk of a costly mistake) when you need feet in metres or Fahrenheit in Celsius.",
      "This converter does the maths in your browser across common categories. Pick a category, enter a value, and see it in every related unit at once.",
    ],
    howTo: [
      "Choose the measurement category (length, weight, temperature, etc.).",
      "Enter a value and its unit.",
      "Read the equivalent in the target unit(s).",
    ],
    useCases: [
      { title: "Cooking & recipes", description: "Convert cups, grams, ounces and millilitres." },
      { title: "Travel", description: "Switch between miles/kilometres and °F/°C." },
      { title: "DIY & engineering", description: "Convert inches, feet, and metres accurately." },
    ],
    faqs: [
      { question: "How is temperature converted?", answer: "Temperature uses offset formulas, not simple ratios — e.g. °C = (°F − 32) × 5/9 — which the tool applies for you." },
      { question: "Are the conversions exact?", answer: "They use standard conversion factors. Displayed results are rounded for readability, so very high-precision work may need more decimal places." },
      { question: "Is anything uploaded?", answer: "No. All conversions are computed locally in your browser." },
      { question: "What's the difference between mass and weight?", answer: "Colloquially they're used interchangeably; this tool converts mass units (grams, kilograms, pounds) as most people expect." },
    ],
    related: ["/tools/base-converter", "/tools/time-zone"],
  },
  "/tools/time-zone": {
    intro: [
      "A time zone converter shows what a given time is in another part of the world, accounting for each zone's UTC offset (and daylight saving where it applies). It's the fix for scheduling across regions without mental arithmetic.",
      "Pick a time and two zones and this tool converts between them in your browser. It's ideal for booking calls, coordinating remote teams, or catching a live event happening elsewhere.",
    ],
    howTo: [
      "Pick the source time zone and time.",
      "Pick the destination time zone.",
      "Read the converted time.",
    ],
    useCases: [
      { title: "Scheduling meetings", description: "Find a time that works across regions before you send the invite." },
      { title: "Remote teams", description: "Know a teammate's local time before pinging them." },
      { title: "Live events", description: "Convert a broadcast or launch time to your zone." },
    ],
    faqs: [
      { question: "Does it handle daylight saving time?", answer: "Yes — conversions use each zone's current rules, including DST where it applies, so the result reflects the real local time." },
      { question: "What is UTC?", answer: "Coordinated Universal Time is the global reference. Every time zone is defined as an offset from UTC (e.g. UTC+5:30 for India)." },
      { question: "Why do offsets sometimes change?", answer: "Because of daylight saving: many regions shift their clocks seasonally, so the same zone can be a different offset at different times of year." },
      { question: "Is my data private?", answer: "Yes. Conversion runs entirely in your browser." },
    ],
    related: ["/tools/date-calculator", "/tools/metric-converter"],
  },
  "/tools/date-calculator": {
    intro: [
      "A date calculator finds the difference between two dates, or adds/subtracts days, weeks, months or years from a date. It handles the awkward bits — varying month lengths and leap years — so you don't have to count on a calendar.",
      "Enter your dates or a date and a duration, and this tool computes the result in your browser. Useful for deadlines, ages, anniversaries and project planning.",
    ],
    howTo: [
      "To find a gap: pick a start date and an end date; read the difference.",
      "To shift a date: pick a date, enter a number of days/months/years to add or subtract.",
      "Read the resulting date or duration.",
    ],
    useCases: [
      { title: "Deadlines & due dates", description: "Find the date N days from now, or days remaining until a deadline." },
      { title: "Ages & anniversaries", description: "Work out an exact age or a milestone date." },
      { title: "Project planning", description: "Add durations to a start date to schedule phases." },
    ],
    faqs: [
      { question: "Does it account for leap years?", answer: "Yes. Differences and additions handle leap years and varying month lengths correctly." },
      { question: "Are both endpoints counted in a difference?", answer: "The tool reports the number of days between the two dates; whether you count the end date is up to how you interpret the range." },
      { question: "Can I add months, not just days?", answer: "Yes — you can add or subtract days, weeks, months or years, and month arithmetic respects month lengths." },
      { question: "Is anything uploaded?", answer: "No. All date math happens in your browser." },
    ],
    related: ["/tools/time-zone", "/tools/interest-calculator"],
  },
  "/tools/hash-generator": {
    intro: [
      "A hash function turns any input into a fixed-length string (the hash or digest). The same input always produces the same hash, but you can't reverse a hash back to the input — which makes hashes useful for verifying integrity and fingerprinting data.",
      "This tool computes common hashes (MD5, SHA-1, SHA-256, SHA-512) from your text in the browser. Nothing is uploaded. Note: MD5 and SHA-1 are fine for checksums but are broken for security — use SHA-256 or stronger where security matters.",
    ],
    howTo: [
      "Enter or paste the text you want to hash.",
      "The hashes are computed instantly for each algorithm.",
      "Copy the digest you need (e.g. SHA-256).",
    ],
    useCases: [
      { title: "File / data integrity", description: "Compare a computed hash against a published checksum to confirm nothing changed." },
      { title: "Fingerprinting", description: "Detect duplicate or changed content by comparing hashes." },
      { title: "Learning cryptography", description: "See how different algorithms produce different-length digests." },
    ],
    faqs: [
      { question: "Can a hash be reversed?", answer: "No. Hashing is one-way. You can't recover the input from a hash — though weak inputs can be guessed via brute force or rainbow tables." },
      { question: "Is MD5 safe to use?", answer: "Only for non-security checksums. MD5 and SHA-1 are cryptographically broken (collisions are feasible); use SHA-256 or SHA-512 for anything security-related." },
      { question: "Should I hash passwords with this?", answer: "No. Passwords need a slow, salted algorithm like bcrypt/argon2, not a raw fast hash. This tool is for checksums and fingerprints." },
      { question: "Is my input sent anywhere?", answer: "No. Hashes are computed locally in your browser." },
    ],
    related: ["/tools/uuid-generator", "/tools/base-converter"],
  },
  "/tools/color-converter": {
    intro: [
      "This tool converts a colour between the formats you use in design and code — HEX (#4c6ef5), RGB (rgb(76,110,245)) and HSL (hsl(228,89%,63%)). Each describes the same colour in a different way, and different tools expect different formats.",
      "Enter a colour in any format and see it in the others instantly, with a live preview, all in your browser. HSL is especially handy for tweaking a colour by hue, saturation or lightness.",
    ],
    howTo: [
      "Enter a colour as HEX, RGB, or HSL (or pick one).",
      "See the equivalent values in the other formats and a live swatch.",
      "Copy the format your CSS or design tool needs.",
    ],
    useCases: [
      { title: "CSS & theming", description: "Get the exact HEX/RGB/HSL a stylesheet or design token expects." },
      { title: "Adjusting shades", description: "Use HSL to nudge lightness/saturation for hover and active states." },
      { title: "Matching brand colours", description: "Translate a brand HEX into RGB for other software." },
    ],
    faqs: [
      { question: "What's the benefit of HSL over HEX?", answer: "HSL describes hue, saturation and lightness separately, so it's intuitive to make a colour lighter or less saturated — much harder to do by eye in HEX." },
      { question: "Do the formats describe the same colours?", answer: "HEX and RGB are equivalent (both sRGB). HSL is a different representation of the same sRGB colours, so conversions are exact aside from rounding." },
      { question: "Can I convert a colour with transparency?", answer: "Alpha is expressed as RGBA/HSLA or an 8-digit HEX. This tool focuses on the opaque HEX/RGB/HSL trio." },
      { question: "Is anything uploaded?", answer: "No. Conversion runs entirely in your browser." },
    ],
    related: ["/tools/base-converter", "/tools/image-converter"],
  },
  "/tools/base-converter": {
    intro: [
      "A base (radix) converter changes a number between numeral systems — binary (base 2), octal (base 8), decimal (base 10) and hexadecimal (base 16). Programmers hop between these constantly: hex for colours and memory, binary for bit flags, decimal for humans.",
      "Enter a number in any base and see it in the others instantly, in your browser. It saves you the error-prone manual conversion and handy for debugging, low-level programming, and learning how number systems work.",
    ],
    howTo: [
      "Enter a number and select its current base.",
      "Read the equivalent value in binary, octal, decimal and hex.",
      "Copy the representation you need.",
    ],
    useCases: [
      { title: "Programming", description: "Convert between hex, decimal and binary while debugging or working with bitmasks." },
      { title: "Colour & memory values", description: "Read a hex colour or address as decimal, or vice versa." },
      { title: "Learning number systems", description: "See how the same value looks across bases." },
    ],
    faqs: [
      { question: "Why do programmers use hexadecimal?", answer: "Hex maps neatly to binary — each hex digit is exactly 4 bits — so it's a compact, readable way to write binary values like colours and memory addresses." },
      { question: "What do the letters in hex mean?", answer: "Hex digits go 0–9 then A–F, where A=10 up to F=15, because base 16 needs sixteen distinct symbols." },
      { question: "Can it convert fractions or negatives?", answer: "It focuses on non-negative integers, which covers the vast majority of base-conversion needs in programming." },
      { question: "Is my input sent anywhere?", answer: "No. Conversion is done locally in your browser." },
    ],
    related: ["/tools/hash-generator", "/tools/color-converter"],
  },
}
