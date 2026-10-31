"use client"

import { useTheme } from "next-themes"

import { Toaster as SonnerToaster, type ToasterProps } from "sonner"

/**
 * Site-wide toast host.
 *
 * Sonner is client-only, so it lives behind this small client boundary instead
 * of forcing app/layout.tsx (a server component) to become a client component.
 * Theme comes from next-themes (the site toggles dark mode with a class), and
 * `font-sans` is the only style override: colour, radius, and contrast already
 * fit in both themes.
 */
export function Toaster(props: ToasterProps) {
  const { theme = "system" } = useTheme()

  return (
    <SonnerToaster
      theme={theme as ToasterProps["theme"]}
      className="toaster group font-sans"
      position="top-center"
      // The header is fixed and ~80px tall, so the default 32px offset would park
      // the toast on top of it.
      offset={88}
      richColors
      closeButton
      {...props}
    />
  )
}
