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

export function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 sm:p-6 lg:p-8 ${className}`}>{children}</div>
}

export function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium hover:bg-muted/50 transition-colors">
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

const CODE_MCP_META = JSON.stringify({"mcpServers":{"meta-ads":{"command":"npx","args":["@hawiyat/mcp-meta-ads"],"env":{"META_ACCESS_TOKEN":"your-token"}}}}, null, 2)
const CODE_INTEGRATION_N8N = '// n8n Webhook -> Hawiyat\n// POST https://api.hawiyat.org/webhooks/n8n\n\n{\n  "action": "deploy",\n  "service": "my-app",\n  "token": "sk-xxxx",\n  "config": {\n    "region": "dze-01",\n    "scale": "auto"\n  }\n}'
const CODE_INTEGRATION_GSHEETS = '# Connect Claude to Google Sheets via MCP\nnpx @anthropic-ai/mcp-google-sheets --spreadsheet-id your-sheet-id\n\n# Then ask Claude:\n# "Add a new row to the sheet with todays sales data"\n# "Generate a monthly report from the Analytics sheet"\n# "Find all rows where conversion rate is below 2%"'

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
        <p className="text-xs text-muted-foreground mt-3">Verify installation: <code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">node --version</code></p>
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
        <p className="text-sm text-muted-foreground mt-2">Replace <code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">sk-xxxx</code> with the token from your receipt or Hawiyat dashboard.</p>
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
          <li>Go to the Extensions view (<code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">Ctrl+Shift+X</code> / <code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">Cmd+Shift+X</code>)</li>
          <li>Search for <strong>Claude Code</strong></li>
          <li>Click <strong>Install</strong></li>
        </ol>
        <div className="mt-4 p-3 sm:p-4 rounded-lg bg-muted/50 border border-border text-sm">
          <strong className="text-foreground">Pro tip:</strong> After installing, open the Command Palette (<code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">Ctrl+Shift+P</code> / <code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">Cmd+Shift+P</code>) and run <strong>Claude Code: Start Session</strong> to begin.
        </div>
      </SubStep>

      <div className="p-3 sm:p-4 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground">
        <strong className="text-foreground">Pro tip:</strong> Run <code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">claude --help</code> to see all available commands.
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
            <h4 className="text-sm font-semibold">Real-Time Collaboration</h4>
            <p className="text-xs text-muted-foreground">Work together with Claude and your team</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Claude Co Work is a collaborative feature that allows multiple users to work with Claude simultaneously in shared sessions. It enables real-time pair programming, code reviews, and team brainstorming all powered by Claude&apos;s AI capabilities.</p>
        <p className="text-sm text-muted-foreground mb-4">When combined with Hawiyat Composer, you get a seamless development experience where AI-assisted coding, deployment, and project management work together in one unified environment.</p>
        <div className="p-3 sm:p-4 rounded-lg bg-muted/50 border border-border text-sm">
          <strong className="text-foreground">Key benefit:</strong> Share context, code suggestions, and deployment workflows across your team all powered by Hawiyat Composer.
        </div>
      </SubStep>

      <SubStep id="install-claude-desktop" title="Install Claude Desktop">
        <p className="text-sm text-muted-foreground mb-4">Claude Desktop provides a native app experience with Co Work support. Download and install it for your platform:</p>
        <div className="space-y-3">
          <div className="p-3 sm:p-4 rounded-lg bg-muted/30 border border-border">
            <h4 className="text-sm font-semibold mb-2">macOS</h4>
            <CodeBlock code="brew install --cask claude" language="bash" />
            <p className="text-xs text-muted-foreground mt-2">Or download from <a href="https://claude.ai/download" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">claude.ai/download</a></p>
          </div>
          <div className="p-3 sm:p-4 rounded-lg bg-muted/30 border border-border">
            <h4 className="text-sm font-semibold mb-2">Windows</h4>
            <CodeBlock code="winget install Anthropic.Claude" language="bash" />
            <p className="text-xs text-muted-foreground mt-2">Or download the installer from <a href="https://claude.ai/download" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">claude.ai/download</a></p>
          </div>
          <div className="p-3 sm:p-4 rounded-lg bg-muted/30 border border-border">
            <h4 className="text-sm font-semibold mb-2">Linux</h4>
            <p className="text-xs text-muted-foreground mb-2">Download the AppImage or .deb package from <a href="https://claude.ai/download" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">claude.ai/download</a></p>
            <CodeBlock code="chmod +x Claude-Desktop.AppImage\n./Claude-Desktop.AppImage" language="bash" />
          </div>
        </div>
        <div className="mt-4 p-3 sm:p-4 rounded-lg bg-blue-500/5 border border-blue-500/20 text-sm">
          <p className="text-blue-500 font-medium mb-1">ℹ After Installation</p>
          <p className="text-muted-foreground">Sign in with your Anthropic account. Co Work features will be available once you&apos;re logged in.</p>
        </div>
      </SubStep>

      <SubStep id="integrate-hawiyat-composer" title="Integrate Hawiyat Composer">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
          <div>
            <h4 className="text-sm font-semibold">Composer + Claude Desktop</h4>
            <p className="text-xs text-muted-foreground">Seamless AI-assisted collaboration</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Hawiyat Composer integrates with Claude Desktop as a third-party inference provider, extending Claude&apos;s capabilities with deployment, monitoring, and workflow automation.</p>
        <h4 className="text-sm font-semibold mb-2">Step 1: Install Hawiyat Composer</h4>
        <CodeBlock code="npx @hawiyat-team/hawiyat-claude install --token sk-xxxx" />
        <p className="text-sm text-muted-foreground mt-2 mb-4">Replace <code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">sk-xxxx</code> with your Hawiyat token.</p>
        <h4 className="text-sm font-semibold mb-2">Step 2: Configure as Third-Party Inference</h4>
        <p className="text-sm text-muted-foreground mb-2">Add Hawiyat Composer to your Claude Desktop configuration:</p>
        <CodeBlock code={`{\n  "inferenceProviders": {\n    "hawiyat": {\n      "endpoint": "https://api.hawiyat.org/v1",\n      "apiKey": "sk-xxxx",\n      "models": ["hawiyat-composer-v1"]\n    }\n  }\n}`} language="json" />
        <h4 className="text-sm font-semibold mb-2 mt-4">Step 3: Verify Integration</h4>
        <CodeBlock code="npx @hawiyat-team/hawiyat-claude verify" />
        <p className="text-sm text-muted-foreground mt-2 mb-4">You should see a success message confirming the connection between Claude Desktop and Hawiyat Composer.</p>
        <h4 className="text-sm font-semibold mb-2">What You Get</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
          <li>Direct deployment from Claude Desktop to Hawiyat infrastructure</li>
          <li>Real-time monitoring and usage analytics</li>
          <li>Access to Hawiyat&apos;s managed services (n8n, Evolution API, etc.)</li>
          <li>Unified token management and billing</li>
        </ul>
        <div className="p-3 sm:p-4 rounded-lg bg-muted/50 border border-border text-sm">
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
        <p className="text-sm text-muted-foreground mb-4">Skills are specialized instruction sets for Claude Code. They tell Claude how to behave for specific tasks from workflow automation to full-stack development. Each skill is a markdown file in your <code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono break-all">.claude/skills/</code> directory.</p>
        <p className="text-sm text-muted-foreground mb-4">Skills work alongside your <code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono break-all">CLAUDE.md</code> file. While CLAUDE.md sets project-wide context, skills provide domain-specific expertise that Claude can reference when needed.</p>
        <div className="p-3 sm:p-4 rounded-lg bg-muted/50 border border-border text-sm">
          <strong className="text-foreground">Key difference:</strong> CLAUDE.md = project context. Skills = specialized capabilities.
        </div>
      </SubStep>

      <SubStep id="n8n-skill" title="n8n Skill">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Workflow className="h-5 w-5" /></div>
          <div>
            <h4 className="text-sm font-semibold">Workflow Automation &amp; AI Agents</h4>
            <p className="text-xs text-muted-foreground">Build complex n8n pipelines with Claude</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3">This skill teaches Claude to generate valid n8n JSON workflows with proper node connections, error handling, and credential placeholders.</p>
        <h4 className="text-sm font-semibold mb-2">Skill File Content</h4>
        <CodeBlock code={"# .claude/skills/n8n-expert.md\n\nYou are an n8n workflow expert. When asked to create or modify workflows:\n\n## Output Format\n1. Always output valid n8n JSON workflow definitions\n2. Include proper node connections (connections object)\n3. Use correct node type IDs (n8n-nodes-base.*)\n4. Add error handling where appropriate\n5. Include credential references as placeholders\n\n## Common Node Types\n- HTTP Request: n8n-nodes-base.httpRequest\n- Webhook: n8n-nodes-base.webhook\n- Set: n8n-nodes-base.set\n- IF: n8n-nodes-base.if\n- Switch: n8n-nodes-base.switch\n- Code: n8n-nodes-base.code\n- Cron: n8n-nodes-base.cronTrigger\n\n## Best Practices\n- Use descriptive node names\n- Add notes to complex nodes\n- Include error workflows\n- Use environment variables for secrets"} />
        <h4 className="text-sm font-semibold mb-2 mt-4">Useful Commands</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>&ldquo;Create an n8n workflow that fetches data from an API every hour&rdquo;</li>
          <li>&ldquo;Add error handling to this workflow&rdquo;</li>
          <li>&ldquo;Convert this workflow to use environment variables&rdquo;</li>
          <li>&ldquo;Generate a webhook trigger for WooCommerce orders&rdquo;</li>
        </ul>
      </SubStep>

      <SubStep id="nextjs-skill" title="Next.js Full Stack Skill">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><CodeIcon className="h-5 w-5" /></div>
          <div>
            <h4 className="text-sm font-semibold">Full-Stack React Framework</h4>
            <p className="text-xs text-muted-foreground">App Router, server components, API routes, Prisma</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3">Claude becomes a Next.js expert generating App Router components, server actions, API routes, and database schemas with Prisma.</p>
        <h4 className="text-sm font-semibold mb-2">Skill File Content</h4>
        <CodeBlock code={"# .claude/skills/nextjs-patterns.md\n\nNext.js 14+ App Router conventions:\n\n## Component Rules\n- Server components by default\n- Use \"use client\" only when needed (interactivity, browser APIs)\n- Keep client components leaf nodes in the tree\n\n## File Conventions\n- page.tsx UI for a route\n- layout.tsx Shared UI for a route segment\n- loading.tsx Loading UI\n- error.tsx Error boundary\n- not-found.tsx Not found UI\n- route.ts API route handler\n\n## Data Fetching\n- Use server components for data fetching\n- Use fetch() with caching options\n- Use React.cache() for deduplication\n- Use server actions for mutations\n\n## Database\n- Use Prisma for database operations\n- Run prisma generate after schema changes\n- Use transactions for related writes"} />
        <h4 className="text-sm font-semibold mb-2 mt-4">Useful Commands</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>&ldquo;Create a product listing page with server components&rdquo;</li>
          <li>&ldquo;Add a server action for form submission&rdquo;</li>
          <li>&ldquo;Generate a Prisma schema for a blog&rdquo;</li>
          <li>&ldquo;Create an API route for webhooks&rdquo;</li>
        </ul>
      </SubStep>

      <SubStep id="uiux-skill" title="UI/UX Pro Max Skill">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Cpu className="h-5 w-5" /></div>
          <div>
            <h4 className="text-sm font-semibold">Advanced Design Systems</h4>
            <p className="text-xs text-muted-foreground">Tailwind CSS, shadcn/ui, Framer Motion</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3">Claude generates production-grade UI components with responsive layouts, micro-interactions, and accessible design patterns.</p>
        <h4 className="text-sm font-semibold mb-2">Skill File Content</h4>
        <CodeBlock code={"# .claude/skills/ui-ux-pro-max.md\n\nUI/UX conventions for modern web apps:\n\n## Styling\n- Use Tailwind CSS for all styling\n- Use shadcn/ui components as base\n- Use cn() utility for className merging\n- Follow mobile-first responsive design\n\n## Animations\n- Use Framer Motion for complex animations\n- Use CSS transitions for simple hover states\n- Respect prefers-reduced-motion\n- Keep animations under 300ms\n\n## Accessibility\n- Use semantic HTML elements\n- Add aria-labels to interactive elements\n- Ensure color contrast ratio ≥ 4.5:1\n- Test with keyboard navigation\n\n## Component Patterns\n- Compound components for complex UI\n- Render props for flexible composition\n- Custom hooks for shared logic"} />
        <h4 className="text-sm font-semibold mb-2 mt-4">Useful Commands</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>&ldquo;Create a responsive pricing table with 3 tiers&rdquo;</li>
          <li>&ldquo;Add a fade-in animation to this section&rdquo;</li>
          <li>&ldquo;Make this form accessible with proper labels&rdquo;</li>
          <li>&ldquo;Create a dark mode toggle with smooth transition&rdquo;</li>
        </ul>
      </SubStep>
    </>
  )
}

function MCPContent() {
  return (
    <>
      <SubStep id="what-are-mcp" title="What are MCP Servers?">
        <p className="text-sm text-muted-foreground mb-4">MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems. Think of it like a USB-C port for AI it provides a standardized way to connect Claude to data sources, tools, and workflows.</p>
        <p className="text-sm text-muted-foreground mb-4">With MCP, Claude can:</p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
          <li>Access your Google Calendar, Notion, and databases</li>
          <li>Query APIs and external services in real-time</li>
          <li>Perform actions on your behalf (with approval)</li>
          <li>Read and write files, search the web, and more</li>
        </ul>
        <div className="p-4 rounded-lg bg-muted/50 border border-border text-sm">
          <strong className="text-foreground">Key concept:</strong> MCP servers expose <em>tools</em> that Claude can use. Each tool has a name, description, and input schema.
        </div>
      </SubStep>

      <SubStep id="configuring-mcp" title="Configuring MCP Servers">
        <p className="text-sm text-muted-foreground mb-4">MCP servers are configured in your Claude configuration file. The location depends on your platform:</p>
        <div className="rounded-lg bg-[#1e1e2e] dark:bg-[#0d0d0d] border border-border overflow-hidden mb-3">
          <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d3d] dark:bg-[#1a1a1a] border-b border-border/50"><span className="text-xs text-gray-400 font-mono">macOS / Linux</span></div>
          <pre className="p-3 sm:p-4 overflow-x-auto text-xs sm:text-sm text-gray-200 font-mono break-all">~/Library/Application Support/Claude/claude_desktop_config.json</pre>
        </div>
        <div className="rounded-lg bg-[#1e1e2e] dark:bg-[#0d0d0d] border border-border overflow-hidden mb-3">
          <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d3d] dark:bg-[#1a1a1a] border-b border-border/50"><span className="text-xs text-gray-400 font-mono">Windows</span></div>
          <pre className="p-3 sm:p-4 overflow-x-auto text-xs sm:text-sm text-gray-200 font-mono break-all">%APPDATA%\Claude\claude_desktop_config.json</pre>
        </div>
        <p className="text-sm text-muted-foreground mt-2">Create the file if it doesn&apos;t exist. Claude will automatically detect and load MCP servers on restart.</p>
      </SubStep>

      <SubStep id="meta-ads-mcp" title="Meta Ads MCP">
        <p className="text-sm text-muted-foreground mb-2">Connect Claude to Meta Ads Manager for campaign analytics, audience insights, and ad performance monitoring.</p>
        <h4 className="text-sm font-semibold mb-2">Configuration</h4>
        <CodeBlock code={CODE_MCP_META} language="json" />
        <p className="text-sm text-muted-foreground mt-2">Replace <code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">your-token</code> with your Meta Ads access token from the Meta Developer Portal.</p>
        <h4 className="text-sm font-semibold mb-2 mt-4">Available Tools</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li><strong>get_campaigns</strong> List all active campaigns</li>
          <li><strong>get_adset_insights</strong> Get performance metrics for ad sets</li>
          <li><strong>get_audience_insights</strong> Analyze audience demographics</li>
          <li><strong>get_ad_creatives</strong> Fetch ad creative details</li>
        </ul>
      </SubStep>

      <SubStep id="popular-mcp-servers" title="Popular MCP Servers">
        <p className="text-sm text-muted-foreground mb-4">Here are some popular MCP servers you can add to your configuration:</p>
        <div className="space-y-3">
          <div className="p-3 sm:p-4 rounded-lg bg-muted/30 border border-border">
            <h4 className="text-sm font-semibold mb-1">Google Sheets</h4>
            <p className="text-xs text-muted-foreground mb-2">Read and write spreadsheet data</p>
            <CodeBlock code={`{\n  "command": "npx",\n  "args": ["-y", "@modelcontextprotocol/server-google-sheets"]\n}`} language="json" />
          </div>
          <div className="p-3 sm:p-4 rounded-lg bg-muted/30 border border-border">
            <h4 className="text-sm font-semibold mb-1">Brave Search</h4>
            <p className="text-xs text-muted-foreground mb-2">Web search capabilities</p>
            <CodeBlock code={`{\n  "command": "npx",\n  "args": ["-y", "@modelcontextprotocol/server-brave-search"],\n  "env": { "BRAVE_API_KEY": "your-key" }\n}`} language="json" />
          </div>
          <div className="p-3 sm:p-4 rounded-lg bg-muted/30 border border-border">
            <h4 className="text-sm font-semibold mb-1">GitHub</h4>
            <p className="text-xs text-muted-foreground mb-2">Access repositories, issues, and PRs</p>
            <CodeBlock code={`{\n  "command": "npx",\n  "args": ["-y", "@modelcontextprotocol/server-github"],\n  "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token" }\n}`} language="json" />
          </div>
          <div className="p-3 sm:p-4 rounded-lg bg-muted/30 border border-border">
            <h4 className="text-sm font-semibold mb-1">PostgreSQL</h4>
            <p className="text-xs text-muted-foreground mb-2">Query databases directly</p>
            <CodeBlock code={`{\n  "command": "npx",\n  "args": ["-y", "@modelcontextprotocol/server-postgres"],\n  "env": { "DATABASE_URL": "postgresql://..." }\n}`} language="json" />
          </div>
        </div>
      </SubStep>

      <SubStep id="mcp-best-practices" title="Best Practices & Tips">
        <h4 className="text-sm font-semibold mb-2">Security</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
          <li>Never commit API keys or tokens to version control</li>
          <li>Use environment variables for sensitive configuration</li>
          <li>Review tool permissions before granting access</li>
          <li>Use separate tokens for development and production</li>
        </ul>
        <h4 className="text-sm font-semibold mb-2">Performance</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
          <li>Only enable MCP servers you actively use</li>
          <li>Each server adds startup time keep it minimal</li>
          <li>Use local servers when possible for faster response</li>
        </ul>
        <h4 className="text-sm font-semibold mb-2">Troubleshooting</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>Check Claude logs for server connection errors</li>
          <li>Verify absolute paths in configuration</li>
          <li>Ensure required environment variables are set</li>
          <li>Restart Claude after configuration changes</li>
        </ul>
      </SubStep>
    </>
  )
}

function IntegrationsContent() {
  return (
    <>
      <SubStep id="hawiyat-n8n" title="Hawiyat × n8n">
        <p className="text-sm text-muted-foreground mb-4">Trigger Hawiyat workflows from n8n via webhooks. Manage tokens, monitor usage, and automate deployment pipelines all from within your n8n workflows.</p>
        <h4 className="text-sm font-semibold mb-2">Webhook Payload</h4>
        <CodeBlock code={CODE_INTEGRATION_N8N} language="json" />
        <h4 className="text-sm font-semibold mb-2 mt-4">Common n8n Use Cases</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>Auto-deploy when a GitHub PR is merged</li>
          <li>Scale services based on traffic alerts</li>
          <li>Monitor usage and send Slack notifications</li>
          <li>Rotate tokens on a schedule</li>
        </ul>
      </SubStep>

      <SubStep id="claude-sheets" title="Claude × Google Sheets">
        <p className="text-sm text-muted-foreground mb-4">Read and write Google Sheets data directly from Claude. Generate reports, automate spreadsheet tasks, and analyze data using natural language commands.</p>
        <h4 className="text-sm font-semibold mb-2">Setup</h4>
        <CodeBlock code={CODE_INTEGRATION_GSHEETS} />
        <h4 className="text-sm font-semibold mb-2 mt-4">Example Commands</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>&ldquo;Add a new row with today&rsquo;s sales data&rdquo;</li>
          <li>&ldquo;Generate a monthly summary report&rdquo;</li>
          <li>&ldquo;Find all rows where conversion rate is below 2%&rdquo;</li>
          <li>&ldquo;Create a chart from column A and B&rdquo;</li>
        </ul>
      </SubStep>

      <SubStep id="combining" title="Combining Integrations">
        <p className="text-sm text-muted-foreground mb-3">The real power comes from combining both integrations:</p>
        <div className="rounded-lg bg-muted/30 border border-border p-4 text-sm">
          <p className="text-muted-foreground mb-2"><strong className="text-foreground">Workflow:</strong></p>
          <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
            <li>n8n collects data from multiple sources (APIs, webhooks, databases)</li>
            <li>Stores processed data in Google Sheets</li>
            <li>Claude analyzes the sheet and generates insights</li>
            <li>Claude triggers Hawiyat deployment based on analysis</li>
          </ol>
        </div>
      </SubStep>

      <div className="p-4 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground">
        <strong className="text-foreground">Tip:</strong> Start with one integration, get it working, then add more. Test each connection before combining them.
      </div>
    </>
  )
}
