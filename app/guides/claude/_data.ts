export interface SubSection {
  id: string
  label: string
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
    videoId: "ewzeM6sYT0E",
    subSections: [
      { id: "what-is-co-work", label: "What is Claude Co Work?" },
      { id: "setting-up-co-work", label: "Setting Up Co Work" },
      { id: "hawiyat-composer-integration", label: "Hawiyat Composer Integration" },
      { id: "collaborative-workflows", label: "Collaborative Workflows" },
      { id: "best-practices", label: "Best Practices" },
    ],
  },
  {
    id: "skills",
    icon: "BookOpen",
    label: "Skills",
    title: "Skills",
    desc: "n8n, Next.js Full Stack, and UI/UX Pro Max skills.",
    subSections: [
      { id: "what-are-skills", label: "What are Skills?" },
      { id: "n8n-skill", label: "n8n Skill" },
      { id: "nextjs-skill", label: "Next.js Full Stack Skill" },
      { id: "uiux-skill", label: "UI/UX Pro Max Skill" },
      { id: "using-skills", label: "Using Skills" },
    ],
  },
  {
    id: "mcp-servers",
    icon: "Database",
    label: "MCP",
    title: "MCP Servers",
    desc: "Connect Claude to external APIs via MCP.",
    subSections: [
      { id: "what-are-mcp", label: "What are MCP Servers?" },
      { id: "meta-ads-mcp", label: "Meta Ads MCP" },
      { id: "usage-examples", label: "Usage Examples" },
      { id: "adding-more", label: "Adding More MCP Servers" },
    ],
  },
  {
    id: "integrations",
    icon: "Workflow",
    label: "Integrations",
    title: "Integrations",
    desc: "Hawiyat × n8n and Claude × Google Sheets.",
    subSections: [
      { id: "hawiyat-n8n", label: "Hawiyat × n8n" },
      { id: "claude-sheets", label: "Claude × Google Sheets" },
      { id: "combining", label: "Combining Integrations" },
    ],
  },
]
