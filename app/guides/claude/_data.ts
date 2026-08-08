export interface SubSection {
  id: string
  label: string
  videoId?: string
}

export interface Section {
  id: string
  icon: string
  label: string
  title: string
  desc: string
  metaDesc: string
  videoId?: string
  subSections: SubSection[]
}

export const SECTIONS: Section[] = [
  {
    id: "installation",
    icon: "Terminal",
    label: "Installation",
    title: "Install Claude Code with Hawiyat Composer",
    desc: "Install Node.js, Claude Code, and activate Hawiyat.",
    metaDesc: "Install Node.js and Claude Code on macOS, Windows, or Linux, then activate your Hawiyat Composer subscription and VS Code extension to start building with AI.",
    videoId: "ewzeM6sYT0E",
    subSections: [
      { id: "installing-node", label: "Installing Node.js" },
      { id: "installing-claude", label: "Installing Claude Code" },
      { id: "activating-hawiyat", label: "Activating Hawiyat" },
      { id: "installing-vscode", label: "Installing VS Code Extension" },
    ],
  },
  {
    id: "co-work",
    icon: "Users",
    label: "Co Work",
    title: "Use Claude Co Work with Hawiyat Composer",
    desc: "Collaborate in real time with Claude Co Work connected to Hawiyat Composer.",
    metaDesc: "Set up Claude Co Work with Hawiyat Composer: install Claude Desktop, enable Developer Mode, and integrate Hawiyat for real-time collaboration with Claude.",
    videoId: "nA_DQk1ZaK4",
    subSections: [
      { id: "what-is-co-work", label: "What is Claude Co Work?" },
      { id: "install-claude-desktop", label: "Install Claude Desktop" },
      { id: "enable-developer-mode", label: "Enable Developer Mode" },
      { id: "integrate-hawiyat-composer", label: "Integrate Hawiyat Composer" },
    ],
  },
  {
    id: "skills",
    icon: "BookOpen",
    label: "Skills",
    title: "Claude Code Skills for n8n, Next.js, and shadcn/ui",
    desc: "n8n, Next.js Full Stack, shadcn/ui, and UI/UX Pro Max skills.",
    metaDesc: "Learn Claude Code skills for n8n, Next.js full-stack, shadcn/ui, and UI/UX design, then install and use them with Hawiyat Composer for faster builds.",
    videoId: "7ZDB75Y99aU",
    subSections: [
      { id: "what-are-skills", label: "What are Skills?" },
      { id: "n8n-skill", label: "n8n Skill" },
      { id: "nextjs-skill", label: "Next.js Full Stack Skill" },
      { id: "shadcn-skill", label: "shadcn/ui Skill" },
      { id: "uiux-skill", label: "UI/UX Pro Max Skill" },
      { id: "using-skills", label: "Using Skills" },
    ],
  },
  {
    id: "mcp-servers",
    icon: "Database",
    label: "MCP",
    title: "Connect MCP Servers to Claude Code",
    desc: "Connect Claude to external APIs instantly. No config files needed.",
    metaDesc: "Connect Claude Code to external APIs with MCP servers in minutes. Set up Meta Ads and popular servers with no config files, powered by Hawiyat Composer.",
    videoId: "PmgxterwxH0",
    subSections: [
      { id: "what-are-mcp", label: "What are MCP Servers?" },
      { id: "easy-setup", label: "Easiest Way to Add MCP" },
      { id: "meta-ads-mcp", label: "Meta Ads MCP" },
      { id: "popular-mcp", label: "Popular MCP Servers" },
    ],
  },
  {
    id: "integrations",
    icon: "Workflow",
    label: "Integrations",
    title: "Claude Code Integrations with n8n and Google Sheets",
    desc: "Hawiyat × n8n and Claude × Google Sheets.",
    metaDesc: "Integrate Claude Code with n8n and Google Sheets through Hawiyat Composer, plus full-stack app workflows for automating real projects end to end.",
    videoId: "",
    subSections: [
      { id: "hawiyat-n8n", label: "Claude × Hawiyat × n8n", videoId: "HnpW7kvaLLA" },
      { id: "claude-sheets", label: "Claude × Google Sheets", videoId: "1a161BJ3X_g" },
      { id: "fullstack-app", label: "Full Stack App", videoId: "3QgEQH-RcHo" },
    ],
  },
]
