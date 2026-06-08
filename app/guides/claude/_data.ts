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
  videoId?: string
  subSections: SubSection[]
}

export const SECTIONS: Section[] = [
  {
    id: "installation",
    icon: "Terminal",
    label: "Installation",
    title: "Installation",
    desc: "Install Node.js, Claude Code, and activate Hawiyat.",
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
    title: "Claude Co Work + Hawiyat Composer",
    desc: "Collaborate in real-time with Claude Co Work integrated with Hawiyat Composer.",
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
    title: "Skills",
    desc: "n8n, Next.js Full Stack, shadcn/ui, and UI/UX Pro Max skills.",
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
    title: "MCP Servers",
    desc: "Connect Claude to external APIs instantly  no config files needed.",
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
    title: "Integrations",
    desc: "Hawiyat × n8n and Claude × Google Sheets.",
    videoId: "",
    subSections: [
      { id: "hawiyat-n8n", label: "Claude × Hawiyat × n8n", videoId: "1a161BJ3X_g" },
      { id: "claude-sheets", label: "Claude × Google Sheets", videoId: "1a161BJ3X_g" },
      { id: "fullstack-app", label: "Full Stack App", videoId: "1a161BJ3X_g" },
    ],
  },
]
