# 🧮 - SubTrack

## 🚀 - Quick Start

```bash
# Copy the example environment file
cp .env.example .env

# Setup prisma
npx prisma migrate dev --name init

# Install dependencies and run the development server
npi i ; npm run dev
```

## 🏗️ - Structure

```sh
📦 Project Root
├── .env                     # Environment variables for local development
├── .env.example             # Example environment file for reference
├── .gitignore               # Git ignore rules
├── 📂 .next                 # Next.js build output and cache
├── 📂 api                   # API client definitions
├── 📂 app                   # Next.js app directory
│   ├── 📂 (pages)           # Pages directory
│   │   ├── 📂 dashboard     # Dashboard page
│   │   │   └── page.tsx     # Dashboard page component
│   │   ├── 📂 subscriptions # Subscriptions page
│   │   │   └── page.tsx     # Subscriptions page component
│   ├── 📂 api               # API route handlers
│   │   ├── 📂 subscriptions
│   │   │   ├── [id]/route.ts # Subscription-specific API routes
│   │   │   └── route.ts      # Subscriptions API routes
│   │   └── 📂 types         # Types API route
│   │       └── route.ts     # Types API handler
├── 📂 components            # React components
│   ├── 📂 subscriptions     # Subscription-related components
│   ├── 📂 ui                # UI components (e.g., buttons, inputs)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── skeleton.tsx
├── 📂 lib                   # Shared libraries
├── 📂 services              # Business logic services
├── 📂 utils                 # Utility functions
│   ├── api.ts               # API client utility
│   └── pagination.ts        # Pagination utility
├── 📂 prisma                # Prisma ORM configuration
├── 📂 public                # Public assets
├── README.md                # Project documentation
├── TODO.md                  # Task tracking and notes
├── next.config.ts           # Next.js configuration
├── package.json             # Project dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```