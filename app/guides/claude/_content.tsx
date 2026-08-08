"use client"

import Image from "next/image"
import { ChevronDown, ChevronUp, Github, Workflow, Code as CodeIcon, Cpu, Copy, Check, Users, Sparkles } from "lucide-react"
import { useState } from "react"

export function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="relative group rounded-lg overflow-hidden border border-border bg-[#1e1e2e] dark:bg-[#0d0d0d] my-3">
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d3d] dark:bg-[#1a1a1a] border-b border-border/50">
        <span className="text-xs text-gray-400 font-mono">{language}</span>
        <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-gray-200 font-mono leading-relaxed"><code>{code}</code></pre>
    </div>
  )
}

export function VideoEmbed({ videoId, title }: { videoId: string; title: string }) {
  if (!videoId) return null
  if (videoId.startsWith("PLACEHOLDER_")) {
    return (
      <div className="relative w-full max-w-full aspect-video rounded-xl overflow-hidden border border-dashed border-border bg-surface-dim/30 mb-6 sm:mb-8 flex items-center justify-center">
        <div className="text-center">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-mono font-bold mb-3">▶ Video</span>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
    )
  }
  return (
    <div className="relative w-full max-w-full aspect-video rounded-xl overflow-hidden border border-border bg-black mb-6 sm:mb-8">
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

export function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 sm:p-6 lg:p-8 ${className}`}>{children}</div>
}

export function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium hover:bg-surface-dim/50 transition-colors">
        {title}
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  )
}

function StepTag({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-mono font-bold mb-3">{children}</span>
}

function SubStep({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="mb-10 sm:mb-14 scroll-mt-24">
      <StepTag># {title}</StepTag>
      <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 sm:p-5 lg:p-6">
        {children}
      </div>
    </div>
  )
}

export function SectionContent({ sectionId }: { sectionId: string }) {
  switch (sectionId) {
    case "installation": return <InstallationContent />
    case "co-work": return <CoWorkContent />
    case "skills": return <SkillsContent />
    case "mcp-servers": return <MCPContent />
    case "mcp-usage": return <MCPContent />
    case "mcp-adding": return <MCPContent />
    case "integrations": return <IntegrationsContent />
    default: return <div className="text-muted-foreground">Section not found.</div>
  }
}

function InstallationContent() {
  return (
    <>
      <SubStep id="installing-node" title="Installing Node.js">
        <p className="text-sm text-muted-foreground mb-2">Node.js 18+ is required for Claude Code. Choose your platform:</p>
        <CodeBlock code="winget install OpenJS.NodeJS" language="bash" />
        <CodeBlock code="brew install node" language="bash" />
        <CodeBlock code="sudo apt install nodejs npm" language="bash" />
        <p className="text-xs text-muted-foreground mt-3">Verify installation: <code className="px-1.5 py-0.5 rounded bg-surface-dim text-xs font-mono">node --version</code></p>
        <div className="mt-4 p-3 sm:p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 text-sm">
          <p className="text-amber-500 font-medium mb-1">⚠ PowerShell Execution Policy</p>
          <p className="text-muted-foreground">On Windows, you may get a security error when running scripts. Fix it by running PowerShell as Administrator and executing:</p>
          <code className="block mt-2 px-3 py-1.5 rounded bg-black/10 dark:bg-white/5 text-xs font-mono break-all">Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser</code>
        </div>
      </SubStep>

      <SubStep id="installing-claude" title="Installing Claude Code">
        <p className="text-sm text-muted-foreground mb-2">Install Claude Code globally via npm:</p>
        <CodeBlock code="npm install -g @anthropic-ai/claude-code" />
        <p className="text-sm text-muted-foreground mb-2 mt-4">Verify the installation:</p>
        <CodeBlock code="claude --version" />
      </SubStep>

      <SubStep id="activating-hawiyat" title="Activating Hawiyat">
        <p className="text-sm text-muted-foreground mb-2">Activate your Hawiyat subscription with your unique token:</p>
        <CodeBlock code="npx @hawiyat-team/hawiyat-claude install --token sk-xxxx" />
        <p className="text-sm text-muted-foreground mt-2">Replace <code className="px-1.5 py-0.5 rounded bg-surface-dim text-xs font-mono">sk-xxxx</code> with the token from your receipt or Hawiyat dashboard.</p>
        <div className="mt-4 rounded-lg overflow-hidden border border-border">
          <Image src="/guides/claude/claude_hawiyat_composer.png" alt="Claude Code with Hawiyat Composer active" width={800} height={450} className="w-full h-auto" />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">You should see the Hawiyat Composer indicator in your Claude Code terminal.</p>
      </SubStep>

      <SubStep id="installing-vscode" title="Installing VS Code Extension">
        <p className="text-sm text-muted-foreground mb-2">Install the Claude Code extension for VS Code to get a native editor experience:</p>
        <CodeBlock code="code --install-extension anthropic.claude-code" language="bash" />
        <p className="text-sm text-muted-foreground mb-2 mt-4">Alternatively, install from the VS Code marketplace:</p>
        <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground mb-4">
          <li>Open VS Code</li>
          <li>Go to the Extensions view (<code className="px-1.5 py-0.5 rounded bg-surface-dim text-xs font-mono">Ctrl+Shift+X</code> / <code className="px-1.5 py-0.5 rounded bg-surface-dim text-xs font-mono">Cmd+Shift+X</code>)</li>
          <li>Search for <strong>Claude Code</strong></li>
          <li>Click <strong>Install</strong></li>
        </ol>
        <div className="mt-4 p-3 sm:p-4 rounded-lg bg-surface-dim/50 border border-border text-sm">
          <strong className="text-foreground">Pro tip:</strong> After installing, open the Command Palette (<code className="px-1.5 py-0.5 rounded bg-surface-dim text-xs font-mono">Ctrl+Shift+P</code> / <code className="px-1.5 py-0.5 rounded bg-surface-dim text-xs font-mono">Cmd+Shift+P</code>) and run <strong>Claude Code: Start Session</strong> to begin.
        </div>
      </SubStep>

      <div className="p-3 sm:p-4 rounded-lg bg-surface-dim/50 border border-border text-sm text-muted-foreground">
        <strong className="text-foreground">Pro tip:</strong> Run <code className="px-1.5 py-0.5 rounded bg-surface-dim text-xs font-mono">claude --help</code> to see all available commands.
      </div>
    </>
  )
}

function CoWorkContent() {
  return (
    <>
      <SubStep id="what-is-co-work" title="What is Claude Co Work?">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Users className="h-5 w-5" /></div>
          <div>
            <h3 className="text-sm font-semibold">Real-Time Collaboration</h3>
            <p className="text-xs text-muted-foreground">Work together with Claude and your team</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Claude Co Work is a collaborative feature that allows multiple users to work with Claude simultaneously in shared sessions. It enables real-time pair programming, code reviews, and team brainstorming all powered by Claude&apos;s AI capabilities.</p>
        <p className="text-sm text-muted-foreground mb-4">When combined with Hawiyat Composer, you get a seamless development experience where AI-assisted coding, deployment, and project management work together in one unified environment.</p>
        <div className="p-3 sm:p-4 rounded-lg bg-surface-dim/50 border border-border text-sm">
          <strong className="text-foreground">Key benefit:</strong> Share context, code suggestions, and deployment workflows across your team all powered by Hawiyat Composer.
        </div>
      </SubStep>

      <SubStep id="install-claude-desktop" title="Install Claude Desktop">
        <p className="text-sm text-muted-foreground mb-4">Claude Desktop provides a native app experience with Co Work support. Download and install it for your platform from <a href="https://claude.ai/download" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">claude.ai/download</a>.</p>
        <div className="space-y-3">
          <div className="p-3 sm:p-4 rounded-lg bg-surface-dim/30 border border-border">
            <h3 className="text-sm font-semibold mb-1">macOS</h3>
            <p className="text-xs text-muted-foreground">Download the .dmg installer or use Homebrew.</p>
          </div>
          <div className="p-3 sm:p-4 rounded-lg bg-surface-dim/30 border border-border">
            <h3 className="text-sm font-semibold mb-1">Windows</h3>
            <p className="text-xs text-muted-foreground">Download the installer directly from the Claude download page.</p>
          </div>
          <div className="p-3 sm:p-4 rounded-lg bg-surface-dim/30 border border-border">
            <h3 className="text-sm font-semibold mb-1">Linux</h3>
            <p className="text-xs text-muted-foreground">Download the AppImage or .deb package from the Claude download page.</p>
          </div>
        </div>
        <div className="mt-4 p-3 sm:p-4 rounded-lg bg-blue-500/5 border border-blue-500/20 text-sm">
          <p className="text-blue-500 font-medium mb-1">After Installation</p>
          <p className="text-muted-foreground">Sign in with your Anthropic account. Co Work features will be available once you&apos;re logged in.</p>
        </div>
      </SubStep>

      <SubStep id="enable-developer-mode" title="Enable Developer Mode">
        <p className="text-sm text-muted-foreground mb-4">Developer Mode unlocks advanced features in Claude Desktop, including third-party inference providers, custom MCP server configurations, and extended Co Work capabilities.</p>
        <div className="space-y-3">
          <div className="p-3 sm:p-4 rounded-lg bg-surface-dim/30 border border-border">
            <h3 className="text-sm font-semibold mb-1">macOS / Linux</h3>
            <p className="text-xs text-muted-foreground">Open Claude Desktop settings and toggle Developer Mode in the Advanced section.</p>
          </div>
          <div className="p-3 sm:p-4 rounded-lg bg-surface-dim/30 border border-border">
            <h3 className="text-sm font-semibold mb-1">Windows</h3>
            <p className="text-xs text-muted-foreground">Access settings via the gear icon, then enable Developer Mode under Advanced preferences.</p>
          </div>
        </div>
        <div className="mt-4 p-3 sm:p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 text-sm">
          <p className="text-amber-500 font-medium mb-1">Note</p>
          <p className="text-muted-foreground">Developer Mode is required to connect third-party providers like Hawiyat Composer and to configure custom MCP servers.</p>
        </div>
      </SubStep>

      <SubStep id="integrate-hawiyat-composer" title="Integrate Hawiyat Composer">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
          <div>
            <h3 className="text-sm font-semibold">Composer + Claude Desktop</h3>
            <p className="text-xs text-muted-foreground">Seamless AI-assisted collaboration</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Hawiyat Composer integrates with Claude Desktop as a third-party inference provider, extending Claude&apos;s capabilities with deployment, monitoring, and workflow automation.</p>
        <h3 className="text-sm font-semibold mb-2">How to Connect</h3>
        <p className="text-sm text-muted-foreground mb-3">Use your Hawiyat token to activate the integration. This links Claude Desktop with Hawiyat Composer&apos;s infrastructure.</p>
        <h3 className="text-sm font-semibold mb-2 mt-4">What You Get</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
          <li>Direct deployment from Claude Desktop to Hawiyat infrastructure</li>
          <li>Real-time monitoring and usage analytics</li>
          <li>Access to Hawiyat&apos;s managed services (n8n, Evolution API, etc.)</li>
          <li>Unified token management and billing</li>
        </ul>
        <div className="p-3 sm:p-4 rounded-lg bg-surface-dim/50 border border-border text-sm">
          <strong className="text-foreground">Tip:</strong> You can switch between Claude&apos;s native inference and Hawiyat Composer directly from the Claude Desktop settings.
        </div>
      </SubStep>
    </>
  )
}

function SkillsContent() {
  return (
    <>
      <SubStep id="what-are-skills" title="What are Skills?">
        <p className="text-sm text-muted-foreground mb-4">Skills are like plug-ins for Claude. They give Claude specialized knowledge for specific tasks like building n8n workflows, creating Next.js apps, or designing UIs.</p>
        <p className="text-sm text-muted-foreground mb-4">Skills are cloned from GitHub repos into Claude Code's skills directory. Copy the prompt below and paste it into Claude Code Claude handles the rest.</p>
        <div className="p-3 sm:p-4 rounded-lg bg-surface-dim/50 border border-border text-sm">
          <strong className="text-foreground">How it works:</strong> Click copy, paste into Claude Code, restart. That&apos;s it.
        </div>
      </SubStep>

      <SubStep id="n8n-skill" title="n8n Skill">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Workflow className="h-5 w-5" /></div>
          <div>
            <h3 className="text-sm font-semibold">Workflow Automation &amp; AI Agents</h3>
            <p className="text-xs text-muted-foreground">Build complex n8n pipelines with Claude</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">This skill teaches Claude to create valid n8n workflows with proper node connections, error handling, and best practices.</p>
        <h3 className="text-sm font-semibold mb-2">How to Install</h3>
        <p className="text-sm text-muted-foreground mb-2">Paste this into Claude Code:</p>
        <CodeBlock code={`Clone https://github.com/Hawiyat-Org/hawiyat-n8n-skill.git into my skills directory, then install the skill globally using the plugin system.\n\nSteps:\n1. Git clone the repo into ~/.claude/skills/hawiyat-n8n-skill/\n2. Run claude plugin init hawiyat-n8n --with skills --author "Hawiyat" --description "n8n workflow automation skill" to scaffold a proper plugin at ~/.claude/skills/hawiyat-n8n/ (this creates the .claude-plugin/plugin.json that auto-discovers on restart)\n3. Delete the example skill at ~/.claude/skills/hawiyat-n8n/skills/example/\n4. The .skill file in the repo is a ZIP. Extract hawiyat-n8n-evo.skill into ~/.claude/skills/hawiyat-n8n/skills/hawiyat-n8n-evo/ so SKILL.md lands at skills/hawiyat-n8n-evo/SKILL.md\n5. Confirm it loaded by checking the skills list after restart.`} language="text" />
        <p className="text-sm text-muted-foreground mt-3 mb-4">Claude uses <code className="px-1.5 py-0.5 rounded bg-surface-dim text-xs font-mono">claude plugin init</code> (which works from within Claude Code) to scaffold the proper <code className="px-1.5 py-0.5 rounded bg-surface-dim text-xs font-mono">.claude-plugin/plugin.json</code> structure that auto-discovers on restart. Restart after.</p>
      </SubStep>

      <SubStep id="nextjs-skill" title="Next.js Full Stack Skill">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><CodeIcon className="h-5 w-5" /></div>
          <div>
            <h3 className="text-sm font-semibold">Full-Stack React Framework</h3>
            <p className="text-xs text-muted-foreground">App Router, server components, API routes, Prisma</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Claude becomes a Next.js expert generating App Router components, server actions, API routes, and database schemas with Prisma.</p>
        <h3 className="text-sm font-semibold mb-2">How to Install</h3>
        <p className="text-sm text-muted-foreground mb-2">Paste this into Claude Code:</p>
        <CodeBlock code={`Install the Next.js developer skill globally using the plugin system.\n\nSteps:\n1. Git clone https://github.com/Jeffallan/claude-skills.git into ~/.claude/skills/claude-skills/\n2. Run claude plugin init nextjs-developer --with skills --author "Jeffallan" --description "Full-stack Next.js development skill with App Router, API routes, and Prisma" to scaffold a proper plugin at ~/.claude/skills/nextjs-developer/\n3. Delete the example skill at ~/.claude/skills/nextjs-developer/skills/example/\n4. Copy SKILL.md from ~/.claude/skills/claude-skills/ into ~/.claude/skills/nextjs-developer/skills/nextjs/\n5. Optionally delete the cloned ~/.claude/skills/claude-skills/ folder\n6. Confirm everything is in place so I just restart.`} language="text" />
        <p className="text-sm text-muted-foreground mt-3 mb-4">Claude uses <code className="px-1.5 py-0.5 rounded bg-surface-dim text-xs font-mono">claude plugin init</code> to scaffold the proper plugin structure, then moves the skill file in. Restart after.</p>
      </SubStep>

      <SubStep id="shadcn-skill" title="shadcn/ui Skill">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><CodeIcon className="h-5 w-5" /></div>
          <div>
            <h3 className="text-sm font-semibold">Component Library &amp; Theming</h3>
            <p className="text-xs text-muted-foreground">Radix UI primitives, Tailwind CSS, dark mode</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Claude masters shadcn/ui component installation, theming with CSS variables, form building with React Hook Form + Zod, data tables with TanStack Table, and responsive composable UI patterns.</p>
        <h3 className="text-sm font-semibold mb-2">How to Install</h3>
        <p className="text-sm text-muted-foreground mb-2">Paste this into Claude Code:</p>
        <CodeBlock code={`Install the shadcn/ui skill globally using the plugin system.\n\nSteps:\n1. Git clone https://github.com/capraidev/shadcn-claude-skill.git into ~/.claude/skills/shadcn-repo/\n2. Run claude plugin init shadcn --with skills --author "capraidev" --description "shadcn/ui component library and theming skill" to scaffold a proper plugin at ~/.claude/skills/shadcn/\n3. Delete the example skill at ~/.claude/skills/shadcn/skills/example/\n4. Copy SKILL.md from ~/.claude/skills/shadcn-repo/ into ~/.claude/skills/shadcn/skills/shadcn-ui/\n5. Optionally delete the cloned ~/.claude/skills/shadcn-repo/ folder\n6. Confirm everything is in place so I just restart.`} language="text" />
        <p className="text-sm text-muted-foreground mt-3 mb-4">Claude uses <code className="px-1.5 py-0.5 rounded bg-surface-dim text-xs font-mono">claude plugin init</code> to scaffold the proper plugin structure, then moves the skill file in. Restart after.</p>
      </SubStep>

      <SubStep id="uiux-skill" title="UI/UX Pro Max Skill">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Cpu className="h-5 w-5" /></div>
          <div>
            <h3 className="text-sm font-semibold">Advanced Design Systems</h3>
            <p className="text-xs text-muted-foreground">Tailwind CSS, shadcn/ui, Framer Motion</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Claude generates production-grade UI components with responsive layouts, micro-interactions, and accessible design patterns.</p>
        <h3 className="text-sm font-semibold mb-2">How to Install</h3>
        <p className="text-sm text-muted-foreground mb-2">Paste this into Claude Code:</p>
        <CodeBlock code={`Install the UI/UX Pro Max skill bundle globally using the plugin system.\n\nSteps:\n1. Git clone https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git into ~/.claude/skills/uiux-pro-max-repo/\n2. Run claude plugin init uiux-pro-max --with skills --author "Next Level Builder" --description "UI/UX design system with banner, brand, slides, and styling skills" to scaffold a proper plugin at ~/.claude/skills/uiux-pro-max/\n3. Delete the example skill at ~/.claude/skills/uiux-pro-max/skills/example/\n4. Copy all 5 skill directories (banner-design, brand, design-systems, slides, ui-styling) from ~/.claude/skills/uiux-pro-max-repo/.claude/skills/ into ~/.claude/skills/uiux-pro-max/skills/\n5. Optionally delete the cloned ~/.claude/skills/uiux-pro-max-repo/ folder\n6. Confirm everything is in place so I just restart.`} language="text" />
        <p className="text-sm text-muted-foreground mt-3 mb-4">Claude uses <code className="px-1.5 py-0.5 rounded bg-surface-dim text-xs font-mono">claude plugin init</code> to scaffold the proper plugin structure, then copies all 5 sub-skills in. Restart after.</p>
      </SubStep>

      <SubStep id="using-skills" title="Using Skills">
        <p className="text-sm text-muted-foreground mb-4">Once installed, skills work automatically. You don&apos;t need to activate them manually. Claude will recognize when a skill is relevant and apply it.</p>
        <h3 className="text-sm font-semibold mb-2">Tips</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
          <li>Skills are installed globally, so they work in any project</li>
          <li>Restart Claude Code after adding a new skill for it to load</li>
          <li>To update a skill, ask Claude: <code className="px-1.5 py-0.5 rounded bg-surface-dim text-xs font-mono">Update my n8n skill by running git pull in the skill folder</code></li>
          <li>To remove a skill, ask Claude: <code className="px-1.5 py-0.5 rounded bg-surface-dim text-xs font-mono">Remove the shadcn skill by deleting its folder from the skills directory</code></li>
        </ul>
        <div className="p-3 sm:p-4 rounded-lg bg-surface-dim/50 border border-border text-sm">
          <strong className="text-foreground">Need more skills?</strong> Check the Hawiyat dashboard or ask us for additional skill recommendations.
        </div>
      </SubStep>
    </>
  )
}

function MCPContent() {
  return (
    <>
      <SubStep id="what-are-mcp" title="What are MCP Servers?">
        <p className="text-sm text-muted-foreground mb-4">MCP (Model Context Protocol) lets Claude talk to external services  databases, APIs, Google Sheets, Meta Ads, and more. Think of it as plugging a USB cable into Claude.</p>
        <p className="text-sm text-muted-foreground mb-4">With MCP, Claude can:</p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
          <li>Read and write your Google Sheets</li>
          <li>Query your PostgreSQL database</li>
          <li>Pull Meta Ads campaign data</li>
          <li>Search the web, manage GitHub, and more</li>
        </ul>
      </SubStep>

      <SubStep id="easy-setup" title="Easiest Way to Add MCP">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-500"><Sparkles className="h-5 w-5" /></div>
          <div>
            <h3 className="text-sm font-semibold">No config files needed</h3>
            <p className="text-xs text-muted-foreground">Just tell Claude what you want</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Forget editing JSON files or hunting down config paths. Just tell Claude what you want to connect and give it the MCP link. Claude installs the MCP server automatically.</p>
        <p className="text-sm text-muted-foreground mb-2">Paste something like this into Claude (replace the link with your MCP server URL):</p>
        <CodeBlock code={`Set up the Meta Ads MCP server in this Next.js project. Use the official HTTP MCP endpoint at https://mcp.facebook.com/ads. Configure it in .mcp.json, run /mcp to trigger the OAuth login flow, and verify the tools are available. I have a Facebook Business Manager account with ads_management and ads_read permissions. If any scopes are missing, tell me exactly what to request.`} language="text" />
        <p className="text-sm text-muted-foreground mt-3 mb-4">Claude handles everything  configures the server, walks you through OAuth, and verifies the tools work.</p>
         <div className="p-3 sm:p-4 rounded-lg bg-blue-500/5 border border-blue-500/20 text-sm">
          <p className="text-blue-500 font-medium mb-1">After it&apos;s done</p>
          <p className="text-muted-foreground">Quit Claude (<code className="px-1.5 py-0.5 rounded bg-surface-dim text-xs font-mono">Ctrl+C</code>) and enter again. Then run <code className="px-1.5 py-0.5 rounded bg-surface-dim text-xs font-mono">/mcp</code> to trigger the browser-based OAuth flow. The MCP server will be active and ready to use.</p>
        </div>
      </SubStep>

      <SubStep id="meta-ads-mcp" title="Meta Ads MCP">
        <p className="text-sm text-muted-foreground mb-4">Connect Claude to Meta Ads Manager for campaign analytics, audience insights, and ad performance monitoring.</p>
        <p className="text-sm text-muted-foreground mb-2">Paste this into Claude to set up Meta Ads MCP:</p>
        <CodeBlock code={`Add the Meta Ads MCP server globally using the CLI run this exact command:

claude mcp add --transport http meta-ads https://mcp.facebook.com/ads

Then edit ~/.claude.json to make sure the meta-ads server has "enableAllProjectMcpServers": true set in its project config so it connects without a trust prompt.

Also, this project is a Next.js app drop a .mcp.json in the project root (create one if it doesn't exist):

{
  "mcpServers": {
    "meta-ads": {
      "type": "http",
      "url": "https://mcp.facebook.com/ads"
    }
  }
}

And in .claude/settings.local.json, add "enableAllProjectMcpServers": true and "enabledMcpjsonServers": ["meta-ads"].

I already have a Facebook Business Manager account with ads_read and ads_management permissions, so OAuth scopes should be fine. Once the config is in place, tell me to restart Claude and run /mcp that'll trigger the browser-based OAuth login flow.`} language="text" />
        <p className="text-sm text-muted-foreground mt-3 mb-4">Claude configures the MCP server, walks you through OAuth, and verifies the tools work. Then you can ask things like:</p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>&ldquo;Show me my top 5 campaigns this month&rdquo;</li>
          <li>&ldquo;Which ad sets have the best ROI?&rdquo;</li>
          <li>&ldquo;Pull audience insights for the last 30 days&rdquo;</li>
        </ul>
      </SubStep>

      <SubStep id="popular-mcp" title="Popular MCP Servers">
        <p className="text-sm text-muted-foreground mb-4">Same approach for any service. Paste the prompt with the MCP link into Claude and it handles the setup:</p>
        <div className="space-y-3">
          <div className="p-3 sm:p-4 rounded-lg bg-surface-dim/30 border border-border">
            <h3 className="text-sm font-semibold mb-1">Google Sheets</h3>
            <p className="text-xs text-muted-foreground">Local only  <code className="px-1.5 py-0.5 rounded bg-surface-dim text-xs font-mono">github.com/xing5/mcp-google-sheets</code></p>
          </div>
          <div className="p-3 sm:p-4 rounded-lg bg-surface-dim/30 border border-border">
            <h3 className="text-sm font-semibold mb-1">GitHub</h3>
            <p className="text-xs text-muted-foreground">Remote hosted  <code className="px-1.5 py-0.5 rounded bg-surface-dim text-xs font-mono">https://api.githubcopilot.com/mcp/</code></p>
          </div>
          <div className="p-3 sm:p-4 rounded-lg bg-surface-dim/30 border border-border">
            <h3 className="text-sm font-semibold mb-1">Notion</h3>
            <p className="text-xs text-muted-foreground">Remote hosted, one-click OAuth  <code className="px-1.5 py-0.5 rounded bg-surface-dim text-xs font-mono">https://mcp.notion.com/mcp</code></p>
          </div>
          <div className="p-3 sm:p-4 rounded-lg bg-surface-dim/30 border border-border">
            <h3 className="text-sm font-semibold mb-1">Figma</h3>
            <p className="text-xs text-muted-foreground">Remote hosted, OAuth via share link  <code className="px-1.5 py-0.5 rounded bg-surface-dim text-xs font-mono">https://mcp.figma.com/mcp</code></p>
          </div>
          <div className="p-3 sm:p-4 rounded-lg bg-surface-dim/30 border border-border">
            <h3 className="text-sm font-semibold mb-1">Canva</h3>
            <p className="text-xs text-muted-foreground">Remote hosted  <code className="px-1.5 py-0.5 rounded bg-surface-dim text-xs font-mono">https://mcp.canva.com/mcp</code></p>
          </div>
          <div className="p-3 sm:p-4 rounded-lg bg-surface-dim/30 border border-border">
            <h3 className="text-sm font-semibold mb-1">Supabase</h3>
            <p className="text-xs text-muted-foreground">Remote hosted  <code className="px-1.5 py-0.5 rounded bg-surface-dim text-xs font-mono">https://mcp.supabase.com/sse</code></p>
          </div>
        </div>
      </SubStep>
    </>
  )
}

function IntegrationsContent() {
  return (
    <>
      <SubStep id="hawiyat-n8n" title="Claude × Hawiyat × n8n">
        <VideoEmbed videoId="HnpW7kvaLLA" title="Claude × Hawiyat × n8n" />
        <p className="text-sm text-muted-foreground mb-4">The n8n skill gives Claude deep knowledge of n8n workflow patterns, node configurations, webhook setups, and Hawiyat API integration. It should already be installed from the Skills section.</p>

        <h3 className="text-sm font-semibold mb-2">How It Works</h3>
        <p className="text-sm text-muted-foreground mb-4">You describe the automation you want  the workflow, the triggers, the actions. Claude uses the n8n skill to determine what nodes are needed, how to connect them, and what the Hawiyat integration requires. It will ask you for any missing details like API tokens, instance URLs, or specific configuration values.</p>

        <h3 className="text-sm font-semibold mb-2">Step-by-Step</h3>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground mb-4">
          <li><strong>Describe your workflow</strong>  Tell Claude what you want to automate. Be as specific or as high-level as you like.</li>
          <li><strong>Answer questions</strong>  The skill will ask for tokens, URLs, or credentials it needs. Paste them in.</li>
          <li><strong>Review the workflow</strong>  Claude generates the n8n workflow JSON. Review it, ask questions, request changes.</li>
          <li><strong>Deploy</strong>  Once you&apos;re happy, Claude can push the workflow to your n8n instance or export it as a file.</li>
        </ol>

        <div className="rounded-lg bg-surface-dim/30 border border-border p-4 mb-4">
          <p className="text-sm text-muted-foreground"><strong className="text-foreground">Example workflow:</strong> &ldquo;I want an n8n workflow that watches for new orders in Hawiyat and sends a WhatsApp notification via Evolution API. Also log every order to a Google Sheet.&rdquo;</p>
          <p className="text-sm text-muted-foreground mt-2">Claude will ask for your Evolution API instance URL and token, your Google Sheet ID, and the Hawiyat webhook URL  then build the entire workflow node by node.</p>
        </div>

        <div className="p-3 sm:p-4 rounded-lg bg-blue-500/5 border border-blue-500/20 text-sm">
          <p className="text-blue-500 font-medium mb-1">Pro tip</p>
          <p className="text-muted-foreground">Start simple. Get one trigger working first (e.g., &ldquo;send me a Slack message when a new user signs up&rdquo;), then layer on more complexity.</p>
        </div>
      </SubStep>

      <SubStep id="claude-sheets" title="Claude × Google Sheets">
        <div className="relative w-full max-w-full aspect-video rounded-xl overflow-hidden border border-border bg-[#0d0d0d] mb-6 sm:mb-8 flex items-center justify-center">
          <div className="text-center">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-mono font-bold mb-3">▶ Video</span>
            <p className="text-sm text-gray-400">Will be available soon</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Claude can read, write, and analyze your Google Sheets data using natural language. No formulas, no scripts  just tell Claude what you need.</p>

        <h3 className="text-sm font-semibold mb-2">How to Connect</h3>
        <p className="text-sm text-muted-foreground mb-2">Claude connects to Google Sheets through MCP. The easiest way is to just ask:</p>
        <CodeBlock code={`claude "connect to my Google Sheets"`} language="bash" />
        <p className="text-sm text-muted-foreground mt-2 mb-4">Claude will guide you through the OAuth flow  a browser window opens, you authorize, and it&apos;s done. No tokens to copy, no config files to edit.</p>

        <h3 className="text-sm font-semibold mb-2">What You Can Do</h3>
        <div className="space-y-3 mb-4">
          <div className="p-3 sm:p-4 rounded-lg bg-surface-dim/30 border border-border">
            <h3 className="text-sm font-semibold mb-1">Read &amp; Query</h3>
            <p className="text-xs text-muted-foreground">&ldquo;Show me all rows where revenue is above $1000&rdquo; &bull; &ldquo;What was the total sales last month?&rdquo; &bull; &ldquo;Find duplicates in column B&rdquo;</p>
          </div>
          <div className="p-3 sm:p-4 rounded-lg bg-surface-dim/30 border border-border">
            <h3 className="text-sm font-semibold mb-1">Write &amp; Update</h3>
            <p className="text-xs text-muted-foreground">&ldquo;Add a new row with today&rsquo;s data&rdquo; &bull; &ldquo;Update the status column for row 5 to Done&rdquo; &bull; &ldquo;Append these 10 records from my CSV&rdquo;</p>
          </div>
          <div className="p-3 sm:p-4 rounded-lg bg-surface-dim/30 border border-border">
            <h3 className="text-sm font-semibold mb-1">Analyze &amp; Report</h3>
            <p className="text-xs text-muted-foreground">&ldquo;Generate a monthly summary report&rdquo; &bull; &ldquo;Create a chart from columns A and B&rdquo; &bull; &ldquo;Find trends in this year&rsquo;s data&rdquo;</p>
          </div>
        </div>

        <div className="p-3 sm:p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 text-sm">
          <p className="text-amber-500 font-medium mb-1">Tip</p>
          <p className="text-muted-foreground">You can reference multiple sheets in the same conversation. Claude keeps track of which sheet is which and can cross-reference data between them.</p>
        </div>
      </SubStep>

      <SubStep id="fullstack-app" title="Full Stack App">
        <VideoEmbed videoId="3QgEQH-RcHo" title="Full Stack App" />
        <p className="text-sm text-muted-foreground mb-4">Build a complete full-stack application using the <strong>nextjs-developer</strong> and <strong>shadcn-ui</strong> skills together. The two skills work in tandem  one handles architecture, routing, and data; the other handles UI components and theming.</p>

        <h3 className="text-sm font-semibold mb-2">Recommended Workflow: Frontend First</h3>
        <p className="text-sm text-muted-foreground mb-4">Start by building the frontend until you&apos;re satisfied with how it looks and feels. Once the UI matches your vision, add the backend layer. This way you validate the user experience before committing to data models and API logic.</p>

        <div className="space-y-4 mb-4">
          <div className="rounded-lg bg-surface-dim/30 border border-border p-4">
            <h3 className="text-sm font-semibold mb-2">Step 1: Scaffold &amp; Design the Frontend</h3>
            <p className="text-sm text-muted-foreground mb-2">Tell Claude what you want to build. Focus on pages, layout, and components. Paste this into Claude:</p>
            <CodeBlock code={`I want a SaaS landing page with a blog, auth pages (login/signup), and a dashboard. Use Next.js App Router with shadcn/ui. Start with the frontend only  I'll handle the backend after.`} language="text" />
            <p className="text-sm text-muted-foreground mt-2">Claude scaffolds the project, sets up routing, builds UI components, and applies theming. Review the result, request changes, iterate on the design until it feels right.</p>
          </div>

          <div className="rounded-lg bg-surface-dim/30 border border-border p-4">
            <h3 className="text-sm font-semibold mb-2">Step 2: Iterate Until You&apos;re Happy</h3>
            <p className="text-sm text-muted-foreground mb-2">Keep refining the frontend. Change layouts, swap components, adjust colors, add animations:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>&ldquo;Change the dashboard layout to a sidebar navigation&rdquo;</li>
              <li>&ldquo;Add a dark mode toggle&rdquo;</li>
              <li>&ldquo;Make the hero section responsive with a mobile menu&rdquo;</li>
              <li>&ldquo;Use a data table instead of a list for the analytics page&rdquo;</li>
            </ul>
          </div>

          <div className="rounded-lg bg-surface-dim/30 border border-border p-4">
            <h3 className="text-sm font-semibold mb-2">Step 3: Add the Backend</h3>
            <p className="text-sm text-muted-foreground mb-2">Once the frontend is solid, paste this into Claude to wire up the backend:</p>
            <CodeBlock code={`Now add the backend: set up Prisma with PostgreSQL, create User and Post models, add API routes for CRUD, and wire up NextAuth for authentication.`} language="text" />
            <p className="text-sm text-muted-foreground mt-2">Claude adds the data layer, connects it to your frontend components, and handles all the wiring.</p>
          </div>
        </div>

        <div className="p-3 sm:p-4 rounded-lg bg-surface-dim/50 border border-border text-sm">
          <strong className="text-foreground">Why frontend first?</strong> You can see and feel the product immediately. Backend decisions (data models, API design) become easier when you already know exactly what the UI needs. It also means you have something demo-worthy from day one.
        </div>
      </SubStep>
    </>
  )
}


