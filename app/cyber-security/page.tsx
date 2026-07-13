"use client"

import Link from "next/link"
import Image from "next/image"
import { Shield, Cpu, Eye, Search, Bug, Lock, Globe, Server, Zap, Wifi, Bot, Layers, GitBranch, Workflow, Fingerprint } from "lucide-react"

const securityModels = [
  {
    name: "Claude Opus",
    focus: "Deep code reasoning & vulnerability analysis",
    badge: "Security Lead",
  },
  {
    name: "GPT-4o",
    focus: "Real-time threat detection & log analysis",
    badge: "Threat Intel",
  },
  {
    name: "Hawiyat Security Agent",
    focus: "Custom fine-tuned model for OWASP & CWE detection",
    badge: "Custom",
  },
  {
    name: "CodeQL Specialist",
    focus: "Semantic code querying for zero-day discovery",
    badge: "Static Analysis",
  },
]

const securityMCPs = [
  { name: "Code Execution Sandbox", icon: Cpu, desc: "Isolated environment to safely run and analyze suspicious code without risking your infrastructure." },
  { name: "File System Auditor", icon: Search, desc: "Deep file system scanning for permission issues, exposed secrets, and backdoor detection." },
  { name: "Dependency Scanner", icon: GitBranch, desc: "Cross-references every package against NVD, GitHub Advisory, and OSV databases." },
  { name: "Network Monitor", icon: Wifi, desc: "Tracks ingress/egress traffic patterns and flags anomalous behavior in real time." },
  { name: "Secret Hunter", icon: Eye, desc: "Regex + ML-based detection of API keys, tokens, and credentials in code and configs." },
  { name: "Compliance Checker", icon: Shield, desc: "Validates infrastructure against SOC 2, ISO 27001, GDPR, and Algerian data protection laws." },
]

const securitySkills = [
  "Static Application Security Testing (SAST)",
  "Dynamic Application Security Testing (DAST)",
  "Software Composition Analysis (SCA)",
  "Infrastructure as Code (IaC) Scanning",
  "Container Image Vulnerability Scanning",
  "Real-Time Log Correlation & Alerting",
  "Automated Security Patch Deployment",
  "OWASP Top 10 Coverage",
  "CWE Classification & Remediation",
  "SIEM Integration Ready",
]

export default function CyberSecurityPage() {
  return (
    <div className="relative min-h-screen hero-bg-gradient overflow-hidden">
      {/* ── Hero ── */}
      <section className="relative flex min-h-[90vh] w-full flex-col place-content-center overflow-hidden mt-[70px] md:mt-[100px]">
        <div className="purple-bg-grad absolute left-[5%] top-[15%] h-[250px] w-[250px] max-md:hidden" />
        <div className="purple-bg-grad absolute right-[10%] bottom-[15%] h-[150px] w-[150px] max-md:hidden" />

        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex max-lg:flex-col items-center gap-16 max-lg:gap-10">
            {/* Left */}
            <div className="flex flex-col gap-6 flex-1 max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-foreground/60 text-sm font-medium w-fit">
                <Shield className="w-4 h-4" />
                AI-Powered Security Suite
              </div>
              <h1 className="text-6xl max-lg:text-4xl font-medium uppercase leading-[80px] max-lg:leading-tight">
                Cyber{" "}
                <span className="font-thin font-serif">
                  Security
                </span>
              </h1>
              <p className="text-lg text-gray-800 dark:text-white leading-relaxed">
                A dedicated security layer powered by multiple AI models, specialized MCP servers,
                and a skill set built to protect your codebase from the first commit to production.
              </p>
              <div className="flex gap-4 max-md:flex-col justify-start mt-2">
                <Link
                  href="https://wa.me/213559555951"
                  target="_blank"
                  className="btn max-md:!w-full flex gap-2 place-content-center shadow-lg !rounded-lg !py-4 max-md:!py-3.5 transition-all duration-[0.3s] hover:scale-x-[1.03] active:scale-95"
                >
                  <span className="max-md:text-[15px] max-md:font-medium">Contact Us</span>
                  <i className="bi bi-whatsapp"></i>
                </Link>
                <Link
                  href="#stack"
                  className="btn max-md:!w-full flex gap-2 place-content-center !rounded-lg !py-4 max-md:!py-3.5 !bg-transparent !text-black dark:!text-white border-[1px] border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 active:scale-95"
                >
                  <span className="max-md:text-[15px] max-md:font-medium">See the Stack</span>
                </Link>
              </div>
            </div>

            {/* Right - Visual representation of security layers */}
            <div className="flex-shrink-0 w-[400px] max-lg:w-[280px] max-md:w-[220px] relative">
              <div className="absolute inset-0 bg-foreground/[0.02] rounded-full blur-3xl animate-shield-pulse" />
              <div className="relative flex items-center justify-center">
                {/* Outer ring emits slowest */}
                <div className="w-80 h-80 max-md:w-60 max-md:h-60 rounded-full border border-foreground/20 flex items-center justify-center animate-ring-outer-pulse">
                  {/* Middle ring emits medium */}
                  <div className="w-56 h-56 max-md:w-44 max-md:h-44 rounded-full border-2 border-foreground/25 flex items-center justify-center animate-ring-pulse" style={{ animationDelay: "0.2s" }}>
                    {/* Inner ring emits fastest */}
                    <div className="w-36 h-36 max-md:w-28 max-md:h-28 rounded-full border-2 border-foreground/30 flex items-center justify-center animate-ring-pulse" style={{ animationDelay: "0.4s" }}>
                      {/* Shield core steady pulse */}
                      <div className="w-20 h-20 max-md:w-16 max-md:h-16 rounded-full bg-foreground/10 flex items-center justify-center animate-shield-pulse">
                        <Shield className="w-10 h-10 text-foreground/70" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating labels */}
              <span className="absolute top-6 -right-0 text-[10px] font-medium bg-background dark:bg-foreground/5 px-3 py-1.5 rounded-full border border-foreground/10 shadow-sm">Models</span>
              <span className="absolute bottom-12 -left-4 text-[10px] font-medium bg-background dark:bg-foreground/5 px-3 py-1.5 rounded-full border border-foreground/10 shadow-sm">MCPs</span>
              <span className="absolute -bottom-1 right-10 text-[10px] font-medium bg-background dark:bg-foreground/5 px-3 py-1.5 rounded-full border border-foreground/10 shadow-sm">Skills</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Security Models ─── */}
      <section className="w-full py-20 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-col gap-4 mb-14">
            <span className="text-xs text-foreground/40 uppercase tracking-widest">The Brains</span>
            <h2 className="text-5xl max-md:text-3xl font-medium">AI Models for Security</h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-xl">
              Each model is specialized for a different security layer from code analysis to runtime threat detection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {securityModels.map((model, i) => (
              <div
                key={i}
                className="p-6 bg-[#f6f7fb] dark:bg-[#141414] rounded-2xl border border-transparent hover:border-foreground/10 transition-all duration-300 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-black dark:bg-white flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white dark:text-black" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-foreground/5 text-foreground/50">
                    {model.badge}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{model.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{model.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MCP Servers ─── */}
      <section id="stack" className="w-full py-20 md:py-28 bg-foreground/[0.01] border-y border-foreground/5">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-col gap-4 mb-14">
            <span className="text-xs text-foreground/40 uppercase tracking-widest">The Tools</span>
            <h2 className="text-5xl max-md:text-3xl font-medium">Security MCP Servers</h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-xl">
              Model Context Protocol servers that give AI agents direct access to your infrastructure for real-time security operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {securityMCPs.map((mcp, i) => (
              <div
                key={i}
                className="group p-6 bg-[#f6f7fb] dark:bg-[#141414] rounded-2xl hover:border-foreground/10 transition-all duration-300 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center">
                    <mcp.icon className="w-5 h-5 text-foreground/70" />
                  </div>
                  <h3 className="text-base font-semibold">{mcp.name}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{mcp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Security Skills ─── */}
      <section className="w-full py-20 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex max-lg:flex-col gap-16 max-lg:gap-10 items-start">
            <div className="flex flex-col gap-4 max-w-sm sticky top-32 max-lg:static">
              <span className="text-xs text-foreground/40 uppercase tracking-widest">The Expertise</span>
              <h2 className="text-5xl max-md:text-3xl font-medium leading-tight">Skills That Protect Your Codebase</h2>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Pre-configured security capabilities that run across every stage of your development lifecycle.
              </p>
            </div>

            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {securitySkills.map((skill, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 bg-[#f6f7fb] dark:bg-[#141414] rounded-xl"
                  >
                    <div className="w-7 h-7 rounded-full bg-foreground/5 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-foreground/50">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <span className="text-sm leading-tight">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pipeline Flow ─── */}
      <section className="w-full py-20 md:py-28 bg-foreground/[0.01] border-y border-foreground/5">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-col gap-4 mb-14 text-center">
            <h2 className="text-5xl max-md:text-3xl font-medium">From Commit to Deployment</h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
              How Hawiyat Composer secures your pipeline at every step.
            </p>
          </div>

          <div className="flex max-lg:flex-col items-start justify-center gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Code Scanning", desc: "Every commit triggers static analysis across all languages. Secrets, hardcoded credentials, and insecure patterns are flagged instantly.", icon: Search },
              { step: "02", title: "Dependency Check", desc: "Package manifests are cross-referenced against vulnerability databases. Outdated or compromised dependencies are blocked from entering builds.", icon: GitBranch },
              { step: "03", title: "Runtime Monitoring", desc: "Deployed services are continuously observed. Behavioral analysis detects anomalies, unauthorized access, and potential breaches in real time.", icon: Eye },
              { step: "04", title: "Automated Response", desc: "When a threat is detected, Composer can automatically isolate affected services, roll back deployments, and notify your team.", icon: Zap },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-3 flex-1 text-center max-lg:max-w-md">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-black dark:bg-white flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-white dark:text-black" />
                </div>
                <span className="text-sm text-foreground/40 font-mono">{item.step}</span>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="w-full py-28 md:py-36">
        <div className="mx-auto w-full max-w-6xl px-6 flex flex-col items-center gap-8 text-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center">
              <Shield className="w-6 h-6 text-foreground/70" />
            </div>
          </div>
          <h2 className="text-6xl max-md:text-3xl font-medium">
            Let's Secure Your Stack
          </h2>
          <p className="max-w-lg text-lg text-gray-800 dark:text-white">
            Get in touch with our team. We'll set up a security audit of your codebase
            and infrastructure completely free.
          </p>

          <div className="flex gap-4 max-md:flex-col justify-center mt-4">
            <Link
              href="https://wa.me/213559555951"
              target="_blank"
              className="btn max-md:!w-full flex gap-2 place-content-center shadow-lg !rounded-lg !py-4 max-md:!py-3.5 transition-all duration-[0.3s] hover:scale-x-[1.03] active:scale-95"
            >
              <span className="max-md:text-[15px] max-md:font-medium">Contact Us on WhatsApp</span>
              <i className="bi bi-whatsapp"></i>
            </Link>
            <Link
              href="mailto:contact@hawiyat.org"
              className="btn max-md:!w-full flex gap-2 place-content-center !rounded-lg !py-4 max-md:!py-3.5 !bg-transparent !text-black dark:!text-white border-[1px] border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 active:scale-95"
            >
              <span className="max-md:text-[15px] max-md:font-medium">Email Us</span>
              <i className="bi bi-envelope"></i>
            </Link>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
            No commitment required. We'll show you exactly what needs fixing.
          </p>
        </div>
      </section>
    </div>
  )
}
