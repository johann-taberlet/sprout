# Sprout

A modern, internationalized Next.js template with authentication using Supabase, based on a feature-first architecture.

## Features

- 🔐 **Authentication** - Complete authentication system with Supabase
- 🌐 **Internationalization** - Multi-language support using next-intl
- 🎨 **UI Components** - Beautiful UI components using ShadCN
- 🏗️ **Feature-First Architecture** - Organized by features for better maintainability
- 🔄 **State Management** - Clean state management with React hooks
- 📱 **Responsive Design** - Mobile-friendly layout
- 🔍 **TypeScript** - Full type safety

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/sprout.git
cd sprout
```

2. Install dependencies

```bash
npm install
# or
yarn
# or
pnpm install
```

3. Environment setup

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials.

4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## Project Structure

```
/src
  /app                   # Next.js app directory
    /[locale]            # Locale-based routes
  /features              # Feature-based organization
    /auth                # Authentication feature
      /components        # Auth-specific components
      /i18n              # Auth-specific translations
      /pages             # Auth page components
    /core                # Core utilities and components
      /components        # Shared UI components
      /i18n              # Core translations
      /lib               # Utility functions
    /current-user        # Current user management
      /components        # User-specific components
      /hooks             # User data hooks
    /profile             # User profile feature
```

## Internationalization

This template supports English and French out of the box. Add more languages by:

1. Creating translation files in each feature's `/i18n` directory
2. Adding the locale to `src/features/core/i18n/routing.ts`

## Authentication Flow

The authentication is handled through Supabase:

- Login with email/password
- Registration with email verification
- Protected routes middleware
- User profile management

## UI Components

We use ShadCN UI components, which are built on top of Radix UI:

```bash
# Add more components
npx shadcn-ui@latest add [component-name]
```

## License

MIT
