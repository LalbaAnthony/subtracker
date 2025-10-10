# 🧮 - SubTracker

<img src="https://raw.githubusercontent.com/LalbaAnthony/subtracker/main/github/assets/screenshots/dashboard.png" alt="Dashboard Screenshot" width="600"/>

## 🚀 - Quick Start

```bash
# Copy the example environment file
cp .env.example .env

# Setup prisma
prisma generate
npx prisma migrate dev --name init

# Install dependencies and run the development server
npm i ; npm run dev
```

## 🛠️ - Tech Stack

- **Next.js**: Framework for building server-rendered React applications.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **Prisma**: ORM for database access and management.
- **SQLite**: Lightweight, file-based relational database.
- **Tailwind CSS**: Utility-first CSS framework for styling.

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

## 📦 - .env

Update the environment variables as needed.

```env
DATABASE_URL="file:./database.db"           # SQLite database file (used by Prisma)           
BETTER_AUTH_SECRET=please_change_me         # Secret key for authentication
NEXT_PUBLIC_APP_URL=http://localhost:3000   # Public URL of the application
```

## 📝 - Features

- **Subscription Management**: Create, read, update, and delete subscriptions.
- **Dashboard**: View upcoming payments and subscription summaries.
- **Responsive Design**: Mobile-friendly layout using Tailwind CSS.
- **Server Components**: Efficient data fetching with Next.js Server Components.
- **Server Actions**: Handle form submissions and actions on the server side.
- **CRUD Operations**: Full CRUD functionality for managing subscriptions.