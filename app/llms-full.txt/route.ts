import { readFile } from "node:fs/promises"
import path from "node:path"

export const runtime = "nodejs"
export const dynamic = "force-static"

// Serves the full agent file at the spec-standard /llms-full.txt path, as an
// alias for the legacy public/llmsfull.txt asset (which stays in place for
// back-compat with existing links).
export async function GET() {
  const content = await readFile(
    path.join(process.cwd(), "public", "llmsfull.txt"),
    "utf8"
  )

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Vary": "Accept, Accept-Encoding",
    },
  })
}
