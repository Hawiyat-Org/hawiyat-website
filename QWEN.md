# Hawiyat Website Project

## Project Overview

Hawiyat is an all-in-one platform for developers to deploy, manage, and scale applications globally with serverless functions, managed databases, CI/CD, and edge networking. The website serves as the main landing page and marketing portal for the platform, featuring information about the services, pricing, and a waitlist signup.

The project is built using:
- **Next.js 14** (App Router)
- **React 18** 
- **TypeScript**
- **Tailwind CSS** for styling
- **Prisma** ORM with PostgreSQL database
- **ShadCN/UI** components
- **Radix UI** primitives
- **NextAuth.js** for authentication
- **GSAP** for animations

## Key Features

1. **Landing Page**: Hero section, benefits, AI tools showcase, pricing plans, testimonials
2. **Waitlist Signup**: Email collection with Prisma database storage
3. **Authentication**: NextAuth.js with user, session, and account management
4. **Responsive Design**: Mobile-first approach with dark/light mode support
5. **Animations**: GSAP-powered scroll animations and transitions
6. **Multilingual Support**: English and French locale options

## Directory Structure

```
hawiyat-website/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (waitlist, chat, schedule, templates)
│   ├── dcma/              # DCMA compliance pages
│   ├── privacy/           # Privacy policy pages
│   ├── schedule/          # Schedule-related pages
│   ├── templates/         # Template pages
│   ├── terms/             # Terms of service pages
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and Prisma client
├── prisma/                # Prisma schema and migrations
├── public/                # Static assets
├── styles/                # Additional style files
```

## Database Schema

The project uses PostgreSQL with Prisma ORM. Key models include:

- **Waitlist**: Stores email signups with IP address and user agent
- **User**: Authentication user data
- **Account**: OAuth account information
- **Session**: User session management
- **VerificationToken**: Email verification tokens

## Building and Running

### Prerequisites
- Node.js 18+
- pnpm package manager
- PostgreSQL database

### Development Setup

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
# Copy .env.example to .env and fill in your values
cp .env.example .env
```

3. Set up the database:
```bash
# Generate Prisma client
pnpm prisma generate

# Push schema to database
pnpm prisma db push
```

4. Run the development server:
```bash
pnpm dev
```

5. Visit `http://localhost:3000` to see the application

### Production Build

1. Build the application:
```bash
pnpm build
```

2. Start the production server:
```bash
pnpm start
```

### Key Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production (includes Prisma generation)
- `pnpm start` - Start production server
- `pnpm lint` - Run Next.js linting

## Environment Variables

- `DATABASE_URL` - PostgreSQL database connection string
- `NEXTAUTH_URL` - NextAuth.js base URL
- `NEXTAUTH_SECRET` - NextAuth.js secret key
- `NEXT_PUBLIC_APP_NAME` - Application name
- `NEXT_PUBLIC_URL` - Public URL
- `NEXT_PUBLIC_APP_URL` - App URL
- `NEXT_PUBLIC_DOCS_URL` - Documentation URL
- `NEXT_PUBLIC_CHATWOOT_TOKEN` - Chatwoot widget token

## Development Conventions

- **Component Organization**: Components are organized by feature in the `components/` directory
- **Styling**: Uses Tailwind CSS with a custom design system defined in `tailwind.config.js`
- **Type Safety**: Full TypeScript support with strict mode enabled
- **Accessibility**: Includes skip links, semantic HTML, and ARIA attributes
- **Dark Mode**: System-aware dark mode using `next-themes` and Tailwind's dark mode
- **Font Loading**: Google Fonts loaded via next/font with CSS variables

## Key Components

- **Header**: Responsive navigation with mobile menu
- **HeroSection**: Main landing area with CTA
- **BenefitsSection**: Feature highlights
- **Pricing**: Subscription plans display
- **Testimonials**: Customer feedback showcase
- **FAQ**: Collapsible frequently asked questions
- **Footer**: Site navigation and contact information
- **ThemeProvider**: Dark/light mode toggle
- **LayoutWrapper**: Main layout container

## API Endpoints

- `POST /api/waitlist` - Add email to waitlist
- Other API routes in `app/api/` for chat, scheduling, and templates

## Styling System

The project uses a dual approach for styling:
- Tailwind CSS utility classes with a custom configuration
- CSS custom properties (variables) for theming in `globals.css`
- Theme-aware color system supporting light/dark modes
- Custom animations using CSS keyframes and GSAP