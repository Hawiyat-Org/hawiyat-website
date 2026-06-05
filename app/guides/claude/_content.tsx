"use client"

import { ChevronDown, ChevronUp, Github, Workflow, Code as CodeIcon, Cpu, Copy, Check } from "lucide-react"
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
  return <div className={`rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 sm:p-8 ${className}`}>{children}</div>
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
    <div id={id} className="mb-8 scroll-mt-24">
      <StepTag># {title}</StepTag>
      {children}
    </div>
  )
}

const CODE_MCP_META = JSON.stringify({"mcpServers":{"meta-ads":{"command":"npx","args":["@hawiyat/mcp-meta-ads"],"env":{"META_ACCESS_TOKEN":"your-token"}}}}, null, 2)
const CODE_INTEGRATION_N8N = '// n8n Webhook -> Hawiyat\n// POST https://api.hawiyat.org/webhooks/n8n\n\n{\n  "action": "deploy",\n  "service": "my-app",\n  "token": "sk-xxxx",\n  "config": {\n    "region": "dze-01",\n    "scale": "auto"\n  }\n}'
const CODE_INTEGRATION_GSHEETS = '# Connect Claude to Google Sheets via MCP\nnpx @anthropic-ai/mcp-google-sheets --spreadsheet-id your-sheet-id\n\n# Then ask Claude:\n# "Add a new row to the sheet with todays sales data"\n# "Generate a monthly report from the Analytics sheet"\n# "Find all rows where conversion rate is below 2%"'

export function SectionContent({ sectionId }: { sectionId: string }) {
  switch (sectionId) {
    case "installation": return <InstallationContent />
    case "skills": return <SkillsContent />
    case "mcp-servers": return <MCPContent />
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
        <div className="mt-4 p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 text-sm">
          <p className="text-amber-500 font-medium mb-1">⚠ PowerShell Execution Policy</p>
          <p className="text-muted-foreground">On Windows, you may get a security error when running scripts. Fix it by running PowerShell as Administrator and executing:</p>
          <code className="block mt-2 px-3 py-1.5 rounded bg-black/10 dark:bg-white/5 text-xs font-mono">Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser</code>
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
      </SubStep>

      <div className="p-4 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground">
        <strong className="text-foreground">Pro tip:</strong> Run <code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">claude --help</code> to see all available commands.
      </div>
    </>
  )
}

function SkillsContent() {
  return (
    <>
      <SubStep title="What are Skills?">
        <p className="text-sm text-muted-foreground mb-4">Skills are specialized instruction sets for Claude Code. They tell Claude how to behave for specific tasks  from workflow automation to full-stack development. Each skill is a markdown file in your <code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">.claude/skills/</code> directory.</p>
      </SubStep>

      <SubStep title="n8n Skill">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Workflow className="h-5 w-5" /></div>
          <div>
            <h4 className="text-sm font-semibold">Workflow Automation & AI Agents</h4>
            <p className="text-xs text-muted-foreground">Build complex n8n pipelines with Claude</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3">This skill teaches Claude to generate valid n8n JSON workflows with proper node connections, error handling, and credential placeholders.</p>
        <CodeBlock code={"# Add to .claude/skills/n8n-expert.md\n\nYou are an n8n workflow expert. Always output:\n1. Valid n8n JSON workflow definitions\n2. Proper node connections (connections object)\n3. Correct node type IDs (n8n-nodes-base.*)\n4. Error handling where appropriate\n5. Credential references as placeholders"} />
      </SubStep>

      <SubStep title="Next.js Full Stack Skill">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><CodeIcon className="h-5 w-5" /></div>
          <div>
            <h4 className="text-sm font-semibold">Full-Stack React Framework</h4>
            <p className="text-xs text-muted-foreground">App Router, server components, API routes, Prisma</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3">Claude becomes a Next.js expert  generating App Router components, server actions, API routes, and database schemas with Prisma.</p>
        <CodeBlock code={"# Add to .claude/skills/nextjs-patterns.md\n\nNext.js 14 App Router conventions:\n- Server components by default\n- Use \"use client\" only when needed\n- API routes in app/api/[route]/route.ts\n- Use Prisma for database operations\n- Follow existing code style and conventions"} />
      </SubStep>

      <SubStep title="UI/UX Pro Max Skill">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Cpu className="h-5 w-5" /></div>
          <div>
            <h4 className="text-sm font-semibold">Advanced Design Systems</h4>
            <p className="text-xs text-muted-foreground">Tailwind CSS, shadcn/ui, Framer Motion</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3">Claude generates production-grade UI components with responsive layouts, micro-interactions, and accessible design patterns.</p>
        <CodeBlock code={"# Add to .claude/skills/ui-ux-pro-max.md\n\nUI/UX conventions:\n- Use Tailwind CSS for all styling\n- Use shadcn/ui components as base\n- Use cn() utility for className merging\n- Add Framer Motion for animations\n- Ensure responsive design (mobile-first)\n- Follow WCAG accessibility guidelines"} />
      </SubStep>

      <SubStep title="Using Skills">
        <p className="text-sm text-muted-foreground mb-2">Create a <code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">.claude/skills/</code> directory in your project root:</p>
        <CodeBlock code={".claude/skills/\n├── n8n-expert.md        # n8n workflow generation\n├── nextjs-patterns.md   # Next.js App Router patterns\n└── ui-ux-pro-max.md     # Design systems & animations"} />
      </SubStep>

      <div className="p-4 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground">
        <strong className="text-foreground">Pro tip:</strong> Keep your CLAUDE.md in version control. Share it with your team to ensure consistent AI behavior across all developers.
      </div>
    </>
  )
}

function MCPContent() {
  return (
    <>
      <SubStep title="What are MCP Servers?">
        <p className="text-sm text-muted-foreground mb-4">MCP (Model Context Protocol) servers let Claude connect to external services directly. Instead of just chatting, Claude can query APIs, read databases, and interact with real-world tools  all through natural language.</p>
        <p className="text-sm text-muted-foreground">Add MCP servers to your <code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">claude.json</code> configuration file.</p>
      </SubStep>

      <SubStep title="Meta Ads MCP">
        <p className="text-sm text-muted-foreground mb-2">Connect Claude to Meta Ads Manager for campaign analytics, audience insights, and ad performance monitoring.</p>
        <CodeBlock code={CODE_MCP_META} language="json" />
        <p className="text-sm text-muted-foreground mt-2">Replace <code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">your-token</code> with your Meta Ads access token.</p>
      </SubStep>

      <SubStep title="Usage Examples">
        <p className="text-sm text-muted-foreground mb-3">Once configured, ask Claude natural language questions:</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          <li><strong className="text-foreground">Campaign analytics:</strong> &ldquo;Show me last week&rsquo;s ad performance by campaign&rdquo;</li>
          <li><strong className="text-foreground">Audience insights:</strong> &ldquo;What&rsquo;s our best-performing audience segment?&rdquo;</li>
          <li><strong className="text-foreground">Optimization:</strong> &ldquo;Suggest budget reallocation across campaigns&rdquo;</li>
          <li><strong className="text-foreground">Reports:</strong> &ldquo;Generate a weekly performance report&rdquo;</li>
        </ul>
      </SubStep>

      <SubStep title="Adding More MCP Servers">
        <p className="text-sm text-muted-foreground mb-2">You can add multiple MCP servers to the same configuration:</p>
        <CodeBlock code={`{\n  "mcpServers": {\n    "meta-ads": { ... },\n    "google-sheets": { ... },\n    "github": { ... }\n  }\n}`} language="json" />
      </SubStep>
    </>
  )
}

function IntegrationsContent() {
  return (
    <>
      <SubStep title="Hawiyat × n8n">
        <p className="text-sm text-muted-foreground mb-4">Trigger Hawiyat workflows from n8n via webhooks. Manage tokens, monitor usage, and automate deployment pipelines  all from within your n8n workflows.</p>
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

      <SubStep title="Claude × Google Sheets">
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

      <SubStep title="Combining Integrations">
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
