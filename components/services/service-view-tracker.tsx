"use client"

import { useEffect } from "react"
import { track } from "@/lib/analytics"

interface ServiceViewTrackerProps {
  serviceId: string
  slug: string
  plan?: string
}

export function ServiceViewTracker({ serviceId, slug, plan }: ServiceViewTrackerProps) {
  useEffect(() => {
    track("service_page_viewed", {
      service_id: serviceId,
      slug,
      ...(plan ? { plan } : {}),
    })
    // serviceId and slug change only on a real navigation to another service,
    // so a same-page re-render never re-fires the event.
  }, [serviceId, slug, plan])

  return null
}
