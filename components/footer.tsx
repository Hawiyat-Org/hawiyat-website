import Image from "next/image"
import Link from "next/link"
import { Github, Instagram, Facebook, Mail, Linkedin } from "lucide-react"

const isExternal = (href: string) =>
  href.startsWith("http://") || href.startsWith("https://")

const Footer = () => {
  const footerSections = [
    {
      title: "The Layer",
      links: [
        { name: "AI Composer", href: "/composer" },
        { name: "Services", href: "/services" },
        { name: "About", href: "/about" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "Support", href: "https://wa.me/213559555951" },
        { name: "FAQ", href: "/faq" },
        { name: "Github", href: "https://github.com/Hawiyat-Org" },
      ],
      
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "DMCA - Content Takedown", href: "/dmca" },
      ],
    },
  ]

  const socialLinks = [
    { name: "Github", href: "https://github.com/Hawiyat-Org", Icon: Github },
    { name: "Instagram", href: "https://instagram.com/hawiyat.cloud", Icon: Instagram },
    { name: "Facebook", href: "https://www.facebook.com/people/Hawiyat/61577698462110/", Icon: Facebook },
    { name: "Email", href: "mailto:contact@hawiyat.org", Icon: Mail },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/hawiyat", Icon: Linkedin },
  ]

  return (
    <footer className="mt-auto flex flex-col w-full gap-4 text-sm pt-[5%] pb-10 px-[10%] text-ink max-md:flex-col">
      <div className="flex max-md:flex-col max-md:gap-6 gap-3 w-full place-content-around">
        {/* Logo and Social Links */}
        <div className="flex h-full w-[250px] flex-col place-items-center gap-6 max-md:w-full">
          <Link href="/" className="w-full place-items-center flex flex-col gap-6" aria-label="Hawiyat homepage">
            <Image src="/logo.png" alt="Hawiyat" width={120} height={120} className="max-w-[120px]" />
            <div className="max-w-[120px] text-center text-3xl h-fit">Hawiyat</div>
          </Link>

          <div className="flex gap-4 text-lg">
            {socialLinks.map((social) => {
              const external = isExternal(social.href)
              return (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="footer-link hover:opacity-80 transition-opacity duration-200"
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <social.Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex max-md:flex-col flex-wrap gap-6 h-full w-full justify-around">
          {footerSections.map((section) => (
            <div key={section.title} className="flex h-full w-[200px] flex-col gap-4">
              <h2 className="text-xl">{section.title}</h2>
              <div className="flex flex-col gap-3">
                {section.links.map((link) =>
                  isExternal(link.href) ? (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link hover:opacity-80 transition-opacity duration-200"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="footer-link hover:opacity-80 transition-opacity duration-200"
                    >
                      {link.name}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="mt-8" />

      <div className="mt-2 flex gap-2 flex-col text-muted-ink place-items-center text-[12px] w-full text-center place-content-around">
        <span>Copyright © 2025-2026 Hawiyat</span>
        <span>All trademarks and copyrights belong to their respective owners.</span>
      </div>
    </footer>
  )
}

export default Footer
