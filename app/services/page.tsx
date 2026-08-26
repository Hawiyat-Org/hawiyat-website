import { redirect } from "next/navigation"

// The services hub is retired — the catalog lives on /pricing.
// next.config.mjs also redirects /services → /pricing at the edge.
export default function ServicesPage() {
  redirect("/pricing")
}
