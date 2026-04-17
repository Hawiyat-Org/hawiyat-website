# Hawiyat Website - Comprehensive Design Document

## Table of Contents
1. [Project Overview](#project-overview)
2. [Design System](#design-system)
3. [Color Palette](#color-palette)
4. [Typography](#typography)
5. [Spacing System](#spacing-system)
6. [Components Architecture](#components-architecture)
7. [Page Structure](#page-structure)
8. [Interactive Behaviors](#interactive-behaviors)
9. [Animations & Effects](#animations--effects)
10. [Responsive Breakpoints](#responsive-breakpoints)
11. [Accessibility Guidelines](#accessibility-guidelines)

---

## Project Overview

**Project Name:** Hawiyat Website  
**Type:** Marketing Website + SaaS Platform Landing Page  
**Purpose:** Algeria's first autonomous deployment platform - a VPS hosting provider offering affordable, fast, and reliable cloud servers with one-click deployment, GitHub integration, backups, and CI/CD support.  
**Target Audience:** Developers, startups, enterprises in Algeria and North Africa  
**Framework:** Next.js 14 with React 18, Tailwind CSS, Framer Motion

---

## Design System

### Color Palette

#### Light Mode
| Variable | Hex Code | Usage |
|----------|----------|-------|
| `--background` | `#ffffff` | Page background |
| `--foreground` | `#0a0a0a` | Primary text |
| `--primary` | `#000000` | Primary actions, buttons |
| `--primary-foreground` | `#ffffff` | Text on primary |
| `--secondary` | `#f5f5f5` | Secondary backgrounds |
| `--secondary-foreground` | `#0a0a0a` | Secondary text |
| `--muted` | `#f5f5f5` | Muted backgrounds |
| `--muted-foreground` | `#737373` | Muted text |
| `--accent` | `#f5f5f5` | Accent backgrounds |
| `--accent-foreground` | `#0a0a0a` | Accent text |
| `--destructive` | `#dc2626` | Error states |
| `--destructive-foreground` | `#ffffff` | Error text |
| `--border` | `#e5e5e5` | Borders |
| `--input` | `#e5e5e5` | Input borders |
| `--ring` | `#0a0a0a` | Focus rings |

#### Dark Mode
| Variable | Hex Code | Usage |
|----------|----------|-------|
| `--background` | `#000000` | Page background |
| `--foreground` | `#fafafa` | Primary text |
| `--primary` | `#fafafa` | Primary actions |
| `--primary-foreground` | `#000000` | Text on primary |
| `--secondary` | `#1a1a1a` | Secondary backgrounds |
| `--secondary-foreground` | `#fafafa` | Secondary text |
| `--muted` | `#1a1a1a` | Muted backgrounds |
| `--muted-foreground` | `#a3a3a3` | Muted text |
| `--accent` | `#1a1a1a` | Accent backgrounds |
| `--accent-foreground` | `#fafafa` | Accent text |
| `--destructive` | `#dc2626` | Error states |
| `--destructive-foreground` | `#fafafa` | Error text |
| `--border` | `#262626` | Borders |
| `--input` | `#262626` | Input borders |
| `--ring` | `#fafafa` | Focus rings |

#### Brand Colors
| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Purple Gradient Start | `#7e22ce` | Hero gradient effects |
| Purple Gradient Mid | `#625aaf` | Gradient transitions |
| Purple Gradient End | `#54d2d0` | Gradient accent |
| Success Green | `#22c55e` | Success states |
| Warning Yellow | `#eab308` | Warning states |
| Info Blue | `#3b82f6` | Information states |

#### UI Element Colors
| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Header Background | `#edececa5` | `#232323a5` |
| Card Background | `#ffffff` | `#0a0a0a` |
| Hero Gradient Start | `#fcfcfc` | `#000000` |
| Hero Background Image | `/dots-dark.svg` | `/dots.svg` |
| Button Background | `#000000` | `#ffffff` |
| Button Text | `#ffffff` | `#000000` |
| Footer Link | `#282828` | `#cfcfcf` |
| Footer Link Hover | `#000000` | `#ffffff` |

---

## Typography

### Font Families
| Font | Variable | Usage |
|------|----------|-------|
| Space Grotesk | `--font-space` | Primary heading, body text |
| Playfair Display | `--font-playfair` | Decorative headings, accent text |
| Ubuntu | `--font-ubuntu` | UI elements, buttons |
| Dancing Script | `--font-dancing` | Special decorative elements |

### Font Weights
| Weight | Value | Usage |
|--------|-------|-------|
| Thin | 300 | Large decorative headings |
| Regular | 400 | Body text, descriptions |
| Medium | 500 | Subheadings, labels |
| Semibold | 600 | Navigation, emphasis |
| Bold | 700 | CTAs, strong emphasis |

### Font Sizes
| Size | Value | Usage |
|------|-------|-------|
| Hero Title | 7xl (3.75rem) | Main hero headline |
| H1 | 5xl (3rem) | Section headings |
| H2 | 4xl (2.25rem) | Subsection headings |
| H3 | 3xl (1.875rem) | Card titles |
| H4 | 2xl (1.5rem) | Feature titles |
| Body Large | lg (1.125rem) | Lead paragraphs |
| Body | base (1rem) | Regular text |
| Small | sm (0.875rem) | Captions, labels |
| XS | xs (0.75rem) | Badges, metadata |

### Line Heights
| Element | Line Height |
|----------|-------------|
| Hero Title | 90px |
| Headings | tight (1.1) |
| Body | relaxed (1.6) |
| Descriptions | normal (1.5) |

---

## Spacing System

### Base Unit
- Base unit: 4px
- Common scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128

### Section Spacing
| Section | Vertical Padding | Horizontal Padding |
|---------|------------------|-------------------|
| Hero | 100vh (min-height) | 5% |
| Features | 80-100vh | 5-10% |
| Benefits | 60vh | 5% |
| Pricing | 32 (py-32) | 6 (px-6) |
| FAQ | 5% | 10% |
| Footer | 10% (pt-10), 40px (pb-10) | 10% |

### Component Spacing
| Component | Gap/Padding |
|-----------|-------------|
| Cards | p-6 to p-10 |
| Grid Gap | gap-6 to gap-8 |
| Button Padding | py-3 to py-4, px-4 to px-6 |
| Input Padding | p-2 to p-4 |

---

## Components Architecture

### 1. Header Component
**File:** `components/header.tsx`

**Structure:**
- Fixed positioning at top (z-50)
- Max width: 6xl (72rem)
- Centered horizontally
- Background: white/80 with backdrop-blur-lg
- Border radius: xl (0.75rem) to 2xl (1rem)
- Border: 1px subtle gray

**Elements:**
- Logo (left) - SVG image, 40-48px height
- Navigation (center, desktop only)
  - Solutions, Features, Pricing links
  - Hover: background gray-100, rounded-md
- Actions (right, desktop)
  - Theme toggle button (sun/moon icons)
  - Sign In button (primary style)
- Mobile Actions
  - Theme toggle
  - Mobile menu toggle (hamburger/X icon)

**Mobile Menu:**
- Slide-down animation (max-h transition)
- Full-width navigation links
- CTA button at bottom
- Background overlay with blur

### 2. Hero Section Component
**File:** `components/hero-section.tsx`

**Structure:**
- Full viewport height (min-h-[100vh])
- Margin top: 70px (mobile), 100px (desktop) to account for header
- Background: hero-bg-gradient with dots pattern

**Elements:**
1. **Main Headline**
   - Size: 7xl (desktop), 4xl (mobile)
   - Font: Space Grotesk
   - Animation: reveal-up
   - Text: "All of your Infrastructure in one place"

2. **Subheadline**
   - Size: 18px (desktop), 15px (mobile)
   - Max-width: 450px
   - Description of platform value

3. **CTA Buttons**
   - "Watch video" button - outline style
   - "Get started" button - primary style
   - Hover: scale transform

4. **AI Playground Dashboard**
   - Container: max-w-[80%], max-h 650px (desktop)
   - 3D perspective transform effect
   - Animated border with gradient
   - Contains AI Playground component

### 3. AI Playground Component
**File:** `components/ai-playground.tsx`

**Structure:**
- Sidebar (250px width, hidden on mobile)
- Main chat area (flex-1)
- Fixed bottom input bar

**Elements:**
1. **Sidebar**
   - Logo at top
   - Navigation items: Deployments, Agents, Docs & CLI
   - Signup button at bottom
   - Dark background: #171717

2. **Chat Area**
   - Empty state: Logo watermark + typed text animation
   - Messages: User (right-aligned, gray), Assistant (left-aligned, gradient border)
   - Loading state: "Thinking..." with pulse animation
   - Overflow: scrollable

3. **Input Bar**
   - Model dropdown (top-left)
   - Text input (expandable)
   - Submit button (arrow icon)
   - Background: #f3f4f6

4. **Model Selector Dropdown**
   - Models: Hawiyat CLI, Claude Sonnet, GPT 4o, Gemini
   - Icons: Bootstrap icons
   - Colors for each model

5. **Signup Popup**
   - Trigger: After 3 messages
   - Blur backdrop
   - "Join developers" messaging
   - CTA: Sign up button

### 4. Trusted Brands Section
**File:** `components/trusted-brands.tsx`

**Structure:**
- Section padding: py-20 to py-32
- 3-column grid (desktop)

**Elements:**
- Section title: "Trusted by"
- Brand logos: Itihad, ESTIN, IT Solutions
- Image: next/image with object-contain
- Hover: scale animation (scale-110)
- Dark mode: Some logos have dark variant

### 5. Benefits Section
**File:** `components/benefits-section.tsx`

**Structure:**
- Grid layout: 3 columns (desktop)
- Cards: 350px width, 540px height
- Gap: 8

**Cards (4 total):**
1. CI/CD - Infinity icon
2. GitHub Integration - GitMerge icon
3. 1 Click Deployment - RocketIcon
4. Backups - DatabaseBackup icon

**Card Style:**
- Background: #f6f7fb (light), #171717 (dark)
- Border radius: 3xl
- Hover: scale-[1.02]
- Content: Icon (80x80), Title (3xl), Description, "Learn more" link

### 6. Build AI Apps Section
**File:** `components/build-ai-apps.tsx`

**Structure:**
- Min-height: 100vh (80vh mobile)
- Centered content
- Purple gradient background element

**Elements:**
- Title: "Launch Your SaaS with Hawiyat Cloud"
- Description paragraph
- CTA button: "Explore Hawiyat Cloud"

### 7. Prebuilt Tools Section
**File:** `components/prebuilt-tools.tsx`

**Structure:**
- Two-column layout (desktop)
- Left: Section title + CTA (sticky)
- Right: Tool cards (vertical list)

**Tools (6 total):**
1. CI/CD & Deployment - bi-code-square
2. Secure Identity - bi-file-earmark-lock2-fill
3. Backups & Recovery - bi-cloud-arrow-up-fill
4. AI Insights - bi-bar-chart-line-fill
5. Unified Dashboard - bi-diagram-3-fill
6. Scalable Infrastructure - bi-lightning-fill

**Card Style:**
- Full height: 240px
- Gap between icon and text: 8
- Hover: scale-[0.98]
- Icon size: 4xl
- "Learn more" link with arrow animation

### 8. Additional Features Section
**File:** `components/additional-features.tsx`

**Structure:**
- Section id: "features"
- 3-column grid (desktop), 2-column (tablet), 1-column (mobile)
- Max-width: 1200px

**Features (9 total):**
1. One-Click Deployment - RocketIcon
2. GitHub Integration - GitFork
3. Automated Backups - DatabaseBackupIcon
4. Unified Identity - Fingerprint
5. Scalable Hosting - Expand
6. Smart Analytics - TrendingUp
7. 300+ Ready-to-Use Templates - Layers
8. Built-in Databases - Database
9. Team Collaboration - Users

**Card Style:**
- Background: #f2f3f4 (light), #141414 (dark)
- Border radius: md
- Padding: 6
- Icon size: 64x64, centered

### 9. One Subscription Section
**File:** `components/one-subscription.tsx`

**Structure:**
- Min-height: 100vh (80vh mobile)
- Flex row (desktop), flex column (mobile)
- Gap: 5

**Elements:**
- Section title: "One Subscription for it all"
- Description paragraph
- Two comparison images:
  - Cost (multiple subscriptions)
  - Hawiyat (single subscription)
- Image style: rounded-lg, shadow-xl, object-cover
- Dark mode: Alternative images
- CTA: "Start Now"

### 10. Pricing Section
**File:** `components/pricing.tsx`

**Structure:**
- Section id: "pricing"
- 2-column grid (Individual | Enterprise)
- Animation: staggered reveal

**Plan Cards:**

**Individual Hosting:**
- Width: 2/5 (md:col-span-2)
- Background: #f2f3f4 (light)
- Features list:
  - Single-click Deployment
  - 300+ Ready-to-use Templates
  - AI Assistance
  - Automatic Domain Setup
  - Free SSL included
  - Scales up to 500 clients

**Enterprise Hosting:**
- Width: 3/5 (md:col-span-3)
- Background: var(--muted) with shadow
- Features:
  - Custom sizing & capacity planning
  - SLA & support guarantees
  - Dedicated onboarding
  - Free migration assistance
  - Scales up to 10,000 clients
  - Priority support & monitoring
- CTA: "Schedule a Meeting"

### 11. Testimonials Section (Commented Out)
**File:** `components/testimonials.tsx`

**Structure:**
- 3-column grid
- Section id: "testimonies"

**Elements:**
- 6 testimonials with:
  - Avatar (User icon)
  - Name and company
  - Content paragraph

### 12. Resources Section
**File:** `components/resources.tsx`

**Structure:**
- 3-column grid (articles)
- Card height: 500px

**Articles (3 total):**
1. "Getting started with Hawiyat CLI" - Developer Tools
2. "Optimizing container deployments on Hawiyat" - Deployment
3. "Auto-scale architectures: Theory & practice" - Infrastructure

**Card Elements:**
- Image (350px height, overflow-hidden)
- Category (top)
- Date (right of category)
- Title (bottom)
- Hover: image scale-[1.3] with transition

### 13. FAQ Section
**File:** `components/faq.tsx`

**Structure:**
- Max-width: 850px
- Centered

**Questions (4 total):**
1. What is Hawiyat?
2. Can I upgrade my plan later?
3. Do you provide backups?
4. Is there CI/CD and GitHub integration?

**Style:**
- Accordion pattern
- Border-bottom dividers
- Plus icon rotates to X on open
- Max-height transition: 0 to 96px

### 14. Call to Action Section
**File:** `components/call-to-action.tsx`

**Structure:**
- Min-height: 60vh
- Centered content
- Background: #f6f7fb (light), #171717 (dark)
- Grid pattern overlay

**Elements:**
- Decorative top element (dots)
- Badge: "Deployment Made Simple"
- Headline: "Click the button, Ship the app, Done"
- Description paragraph
- CTA: "Deploy APP" with shine animation

### 15. Newsletter Section
**File:** `components/newsletter.tsx`

**Structure:**
- Max-width: 6xl
- Horizontal layout (desktop), vertical (mobile)
- Background: #F6F7FB (light), #171717 (dark)

**Elements:**
- Heading: "Join our newsletter"
- Subheading: "Get product insights and updates."
- Email input field
- Submit button: "Join"
- States: loading spinner, success message, error message
- Success: Green background with waitlist position number

### 16. Footer Component
**File:** `components/footer.tsx`

**Structure:**
- 3-column layout (desktop), stacked (mobile)
- Gap: 6
- Horizontal rule separator
- Copyright at bottom

**Sections:**
1. Resources: Blog, Docs, Templates, Features, Pricing
2. Company: Support (tel), Github
3. Legal: Terms, Privacy, DCMA

**Social Links (8 total):**
- Github, Discord, Instagram, Facebook, TikTok, Email, X (Twitter), LinkedIn
- Bootstrap icons
- Hover: scale-110

### 17. Chatwoot Widget Component
**File:** `components/chatwoot-widget.tsx`

**Structure:**
- Fixed position: bottom-6, right-6
- Floating action button

**Elements:**
- Circular button: gradient background
- Icon: MessageCircle (closed), X (open)
- Hover: scale-110, shadow-xl

### 18. Scroll Animations Component
**File:** `components/scroll-animations.tsx`

**Functionality:**
- GSAP ScrollTrigger integration
- Reveal-up class animation:
  - Initial: opacity: 0, y: 100%
  - Final: opacity: 1, y: 0
- Dashboard element: 3D transform on scroll
- Stagger: 0.2s between elements

### 19. Video Modal Component
**File:** `components/video-modal.tsx`

**Structure:**
- Full-screen backdrop (black overlay)
- Modal container: max-w-[80vw], max-h-[90vh]
- Close button (top-right)
- YouTube embed (iframe)

**Behavior:**
- Open: scale animation, opacity transition
- Embedded video: Hawiyat demo video
- Auto-play enabled, controls disabled

### 20. Schedule Page Components
**File:** `app/schedule/page.tsx` + components/schedule/

**SchedulingPanel:**
- Two-column layout (desktop)
- Calendar grid + Time slots list

**CalendarGrid:**
- Month/year header with navigation
- Day labels (SUN-SAT)
- 7-column grid for days
- States: available, unavailable, selected, past
- Loading skeleton
- API-driven availability

**TimeSlotsList:**
- Date header with time format toggle (12h/24h)
- Time slot buttons in pairs
- Booking form modal:
  - Company name
  - Email
  - Platform (Teams/Meet/Zoom)
- Verification code input
- Success confirmation

---

## Page Structure

### 1. Home Page (app/page.tsx)
**Components Order:**
1. ChatwootWidget
2. ScrollAnimations
3. HeroSection
4. TrustedBrands
5. BenefitsSection
6. BuildAIApps
7. PrebuiltTools
8. AdditionalFeatures
9. OneSubscription
10. Pricing
11. Resources
12. FAQ
13. CallToAction
14. Newsletter
15. Footer (outside main)

### 2. Templates Page (app/templates/page.tsx)
**Components:**
- Search input (full width)
- Template grid (3 columns)

**Features:**
- Real-time search filtering
- Loading skeleton (6 items)
- Template cards with:
  - Logo image
  - Name, description
  - Tags

**API Integration:**
- Fetches from /api/templates
- Caches in component state

### 3. Schedule Page (app/schedule/page.tsx)
**Components:**
- SchedulingPanel

### 4. Legal Pages
- `/terms` - Terms of Service
- `/privacy` - Privacy Policy
- `/dcma` - DCMA Content Takedown

---

## Interactive Behaviors

### Theme Switching
- Toggle: Header button (sun/moon icons)
- Storage: localStorage key "theme"
- Transition: smooth color transitions
- System preference detection

### Mobile Menu
- Toggle: Hamburger icon click
- Animation: max-height transition (500ms)
- Auto-close: Escape key, link click
- Body scroll lock when open

### Form Interactions
- Newsletter:
  - Email validation (required, format)
  - Loading state (spinner)
  - Success: Green message + position number
  - Error: Red message
- Schedule booking:
  - Date selection with validation
  - Time slot selection
  - Form modal with validation
  - Verification code (6-digit)
  - Success confirmation modal

### Video Modal
- Open: "Watch video" button click
- Close: X button click, backdrop click, Escape
- Body scroll lock when open
- YouTube controls: disabled
- Autoplay: enabled

### Hover Effects
- Buttons: scale-[1.03] to [1.05]
- Cards: scale-[1.02]
- Links: translate-x-1 or translate-y-1
- Images: scale animation
- Social icons: scale-110

### Scroll Animations
- Trigger: 80-90% into viewport
- Effect: reveal-up class
- Stagger: 0.2s delay between siblings
- Dashboard: perspective transform

---

## Animations & Effects

### CSS Animations
| Animation | Property | Duration | Easing |
|-----------|----------|----------|--------|
| reveal-up | opacity, transform | 0.8s | ease-out |
| fadeIn | opacity | 0.3s | ease |
| pulse | opacity | 2s | ease-in-out infinite |
| spin | transform: rotate | 1s | linear infinite |
| slide | transform | 10s | ease-in-out infinite |

### GSAP Animations
- ScrollTrigger for scroll-based reveals
- Dashboard 3D perspective transform
- Staggered card animations

### Transition Properties
- Default: 0.3s ease
- Buttons: 0.3s
- Cards: 0.3s
- Mobile menu: 0.5s ease-out
- Theme: smooth

### Special Effects
1. **Hero Gradient:** Purple blur effect (120px circle)
2. **Animated Border:** Sliding gradient on dashboard
3. **Gradient Text:** Linear gradient with text-clip
4. **Grid Pattern:** CSS radial-gradient dots
5. **Shine Effect:** Button gradient slide on hover

---

## Responsive Breakpoints

### Tailwind Breakpoints
| Breakpoint | Width | Prefix | Adjustments |
|------------|-------|--------|-------------|
| xs | < 640px | - | Mobile |
| sm | >= 640px | sm: | Large phones |
| md | >= 768px | md: | Tablets |
| lg | >= 1024px | lg: | Laptops |
| xl | >= 1280px | xl: | Desktops |
| 2xl | >= 1536px | 2xl: | Large screens |

### Mobile Adaptations
- Single column layouts
- Reduced font sizes
- Touch-friendly tap targets (min 44px)
- Hamburger menu
- Hidden sidebars
- Adjusted spacing
- Full-width buttons
- Stacked flex containers

---

## Accessibility Guidelines

### Keyboard Navigation
- Skip to content link
- Focus visible states (ring)
- Escape key closes modals/menus
- Tab order follows DOM

### Screen Readers
- Semantic HTML (header, main, footer, nav, section)
- ARIA labels on interactive elements
- Alt text on images
- Button states announced

### Visual
- Color contrast (minimum 4.5:1)
- Focus indicators
- No information conveyed by color alone
- Resizable text support

---

## Iconography

### Icon Library
- Bootstrap Icons (loaded via CDN)
- Lucide React (for UI elements)

### Common Icons Used
- Navigation: bi-list, bi-x
- Theme: Sun, Moon (lucide)
- Social: bi-github, bi-discord, bi-instagram, bi-facebook, bi-tiktok, bi-envelope, bi-twitter-x, bi-linkedin
- Features: bi-code-square, bi-file-earmark-lock2-fill, bi-cloud-arrow-up-fill, bi-bar-chart-line-fill, bi-diagram-3-fill, bi-lightning-fill
- Actions: bi-arrow-right, bi-arrow-up-right, bi-play-circle-fill, bi-plus, bi-chevron-down

---

## Environment Configuration

### Environment Variables
```
NEXT_PUBLIC_APP_NAME=Hawiyat
NEXT_PUBLIC_URL=https://hawiyat.org
NEXT_PUBLIC_APP_URL=https://app.hawiyat.org
NEXT_PUBLIC_DOCS_URL=https://docs.hawiyat.org
NEXT_PUBLIC_BLOG_URL=https://blog.hawiyat.org
NEXT_PUBLIC_CHATWOOT_TOKEN=<chatwoot-token>
NEXT_PUBLIC_ENTERPRISE_SCHEDULE_URL=https://hawiyat.org/schedule
GEMINI_API_KEY=<gemini-api-key>
```

---

## File Structure Summary

```
/app
  /page.tsx              - Main landing page
  /layout.tsx            - Root layout with fonts, theme
  /globals.css           - Global styles, CSS variables
  /templates/page.tsx    - Templates showcase
  /schedule/page.tsx     - Booking scheduling
  /terms/page.tsx       - Terms of service
  /privacy/page.tsx     - Privacy policy
  /dcma/page.tsx        - DCMA takedown
  /api/...              - API routes

/components
  /header.tsx           - Main navigation header
  /footer.tsx           - Site footer
  /hero-section.tsx    - Hero with AI playground
  /ai-playground.tsx   - Interactive AI chat demo
  /trusted-brands.tsx  - Social proof logos
  /benefits-section.tsx - Core benefits cards
  /build-ai-apps.tsx   - SaaS launch section
  /prebuilt-tools.tsx  - Tool cards grid
  /additional-features.tsx - Feature grid
  /one-subscription.tsx - Pricing comparison
  /pricing.tsx          - Plan cards
  /testimonials.tsx    - User testimonials
  /resources.tsx        - Blog/articles
  /faq.tsx             - FAQ accordion
  /call-to-action.tsx  - Final CTA
  /newsletter.tsx      - Email signup
  /chatwoot-widget.tsx - Live chat button
  /scroll-animations.tsx - GSAP scroll effects
  /video-modal.tsx      - YouTube embed modal
  /theme-provider.tsx   - Theme context

/components/schedule/
  /scheduling-panel.tsx  - Main scheduler
  /calendar-grid.tsx     - Date picker
  /time-slots-list.tsx  - Time selection

/components/ui/          - shadcn/ui components

/lib
  /utils.ts             - Helper functions
  /auth.ts              - Auth utilities
  /email-utils.ts       - Email helpers
  /date-utils.ts        - Date formatting

/public
  /logos/              - Template logos
  /trust/              - Trust/partner logos
  /oneSub/             - Subscription comparison images
  /assets/images/      - Article images
  /logo.svg            - Main logo
  /dots.svg            - Background pattern
```

---

*Document Version: 1.0*  
*Last Updated: April 2026*  
*Project: Hawiyat Website - Algeria's First Autonomous Deployment Platform*
