export const WHATSAPP_NUMBER = "213559555951"
export const CONTACT_EMAIL = "contact@hawiyat.org"
export function waLink(message = ""): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
