import { NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"

// In-memory cache
let cachedData: any = null
let cacheTimestamp = 0
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

export async function GET() {
  try {
    const now = Date.now()

    // Return cached data if still valid
    if (cachedData && now - cacheTimestamp < CACHE_DURATION) {
      return NextResponse.json(cachedData, {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      })
    }

    // Read fresh data from file
    const filePath = join(process.cwd(), "public", "hawiyat_templates.json")
    const fileContents = await readFile(filePath, "utf8")
    const templates = JSON.parse(fileContents)

    // Update cache
    cachedData = templates
    cacheTimestamp = now

    return NextResponse.json(templates, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("[v0] Error loading templates:", error)
    return NextResponse.json({ error: "Failed to load templates" }, { status: 500 })
  }
}
