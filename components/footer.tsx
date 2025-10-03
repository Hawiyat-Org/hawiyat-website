import Image from "next/image"
import Link from "next/link"
const appUrl = process.env.NEXT_PUBLIC_APP_URL
const docsUrl = process.env.NEXT_PUBLIC_DOCS_URL
const blogUrl = process.env.NEXT_PUBLIC_Blog_URL
const Footer = () => {
  const footerSections = [
    {
      title: "Resources",
      links: [
        { name: "Getting started", href: {} },
        { name: "API Docs", href: {} },
        { name: "API Endpoints", href: "#" },
        { name: "Health status", href: "#" },
        { name: "Pricing", href: "#pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "Support channels", href: "#" },
        { name: "Systems", href: "#" },
        { name: "Blog", href: "https://blog.hawiyat.org" },
        { name: "Twitter", href: "https://twitter.com/pauls_freeman" },
        { name: "Github", href: "https://github.com/Haiwyat-Corp" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of service", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "DCMA - Content Takedown", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { name: "Github", href: "https://github.com/hawiyat-corp/", icon: "bi-github" },
    { name: "Twitter", href: "https://twitter.com/pauls_freeman", icon: "bi-twitter" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/hawiyat", icon: "bi-linkedin" },
  ]

  return (
    <footer className="mt-auto flex flex-col w-full gap-4 text-sm pt-[5%] pb-10 px-[10%] text-black dark:text-white max-md:flex-col">
      <div className="flex max-md:flex-col max-md:gap-6 gap-3 w-full place-content-around">
        {/* Logo and Social Links */}
        <div className="flex h-full w-[250px] flex-col place-items-center gap-6 max-md:w-full">
          <Link href="#" className="w-full place-items-center flex flex-col gap-6">
            <Image src="/logo.png" alt="logo" width={120} height={120} className="max-w-[120px] " />
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
        <span>Copyright © 2023-2025</span>
        <span>All trademarks and copyrights belong to their respective owners.</span>
      </div>
    </footer>
  )
}

export default Footer
