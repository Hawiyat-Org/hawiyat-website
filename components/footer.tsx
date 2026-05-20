import Image from "next/image"
import Link from "next/link"

const appUrl = process.env.NEXT_PUBLIC_APP_URL
const docsUrl = process.env.NEXT_PUBLIC_DOCS_URL
const blogUrl = process.env.NEXT_PUBLIC_BLOG_URL

const Footer = () => {
  const footerSections = [
    {
      title: "Resources",
      links: [
        { name: "Blog", href: blogUrl || "https://blog.hawiyat.org" },
        { name: "Docs", href: docsUrl || "https://docs.hawiyat.org" },
        { name: "Templates", href: "/templates" },
        { name: "Services", href: "/services" },
        { name: "Features", href: "/#features" },
        { name: "Pricing", href: "/#pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "Support", href: "tel:+213559555951" },
        { name: "Github", href: "https://github.com/hawiyat-corp" },
      ],
      
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "DCMA - Content Takedown", href: "/dcma" },
      ],
    },
  ]

  const socialLinks = [
    { name: "Github", href: "https://github.com/hawiyat-corp", icon: "bi-github" },
    { name: "Discord", href: "https://discord.gg/yourinvite", icon: "bi-discord" },
    { name: "Instagram", href: "https://instagram.com/hawiyat.cloud", icon: "bi-instagram" },
    { name: "Facebook", href: "https://www.facebook.com/people/Hawiyat/61577698462110/", icon: "bi-facebook" },
    { name: "TikTok", href: "https://www.tiktok.com/@hawiyat5", icon: "bi-tiktok" },
    { name: "Email", href: "mailto:contact@hawiyat.org", icon: "bi-envelope" },
    { name: "X (Twitter)", href: "https://x.com/hawiyat", icon: "bi-twitter-x" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/hawiyat", icon: "bi-linkedin" },
  ]

  return (
    <footer className="mt-auto flex flex-col w-full gap-4 text-sm pt-[5%] pb-10 px-[10%] text-black dark:text-white max-md:flex-col">
      <div className="flex max-md:flex-col max-md:gap-6 gap-3 w-full place-content-around">
        {/* Logo and Social Links */}
        <div className="flex h-full w-[250px] flex-col place-items-center gap-6 max-md:w-full">
          <Link href={appUrl || "https://blog.hawiyat.org"} className="w-full place-items-center flex flex-col gap-6">
            <Image src="/logo.png" alt="logo" width={120} height={120} className="max-w-[120px]" />
            <div className="max-w-[120px] text-center text-3xl h-fit">Hawiyat</div>
          </Link>

          <div className="flex gap-4 text-lg">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="footer-link hover:scale-110 transition-transform duration-200"
              >
                <i className={`bi ${social.icon}`}></i>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex max-md:flex-col flex-wrap gap-6 h-full w-full justify-around">
          {footerSections.map((section) => (
            <div key={section.title} className="flex h-full w-[200px] flex-col gap-4">
              <h2 className="text-xl">{section.title}</h2>
              <div className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="footer-link hover:translate-x-1 transition-transform duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="mt-8" />

      <div className="mt-2 flex gap-2 flex-col text-gray-700 dark:text-gray-300 place-items-center text-[12px] w-full text-center place-content-around">
        <span>Copyright © 2023-2025 Hawiyat</span>
        <span>All trademarks and copyrights belong to their respective owners.</span>
      </div>
    </footer>
  )
}

export default Footer
