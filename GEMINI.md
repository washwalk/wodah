# Wodah Agent Guidelines (AGENTS.md)

This document provides guidelines for agentic coding agents (like AI assistants) working on the Wodah project. Wodah is a Multi-Tenant Landing Page Factory built with Next.js, React, TypeScript, and Turborepo. Follow these rules to maintain consistency, quality, and functionality.

## Overview
- **Framework**: Next.js with App Router, Turborepo monorepo
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **Data**: Real-time APIs for prediction markets (Polymarket, Kalshi)
- **Deployment**: Vercel with separate services for each app
- **Purpose**: Build and deploy specialized landing pages for trading tools

## Build/Lint/Test Commands

### Build Commands
- **Full Build**: `npm run build` - Builds all apps and packages
- **Development Server**: `npm run dev` - Starts development servers for all apps
- **Preview Build**: `npm run preview` - Serves built apps locally for testing
- **Clean Build**: `rm -rf node_modules && npm install && npm run build` - Full clean rebuild

### Lint/Typecheck Commands
- **Type Check**: `npm run typecheck` - Runs TypeScript type checking across all workspaces
- **ESLint**: `npm run lint` - Runs ESLint for code quality
- **Prettier**: Not configured; use `npx prettier --check .` or `--write .` for formatting
- **Full Check**: `npm run build && npm run typecheck` - Ensures build passes and types are correct

### Test Commands
- **Test Framework**: None configured yet (Jest recommended for future)
- **Run All Tests**: `npm test` (not set up; will run Jest when added)
- **Run Single Test**: `npm test -- <test-file>` (e.g., `npm test apps/main-site/__tests__/Hero.test.tsx`)
- **Watch Mode**: `npm run test:watch` (configure in package.json for continuous testing)
- **Coverage**: `npm run test:coverage` (generate coverage reports)
- **E2E Tests**: Use Playwright or Cypress; run `npx playwright test` for UI tests

### Other Useful Commands
- **Install Dependencies**: `npm install` (use `npm ci` in CI)
- **Update Dependencies**: `npm update` (check for breaking changes)
- **Audit Security**: `npm audit` or `npm audit fix`
- **Git Hooks**: No pre-commit hooks yet; consider adding Husky for linting/tests

## Code Style Guidelines

### General Principles
- **Consistency**: Match existing patterns in the codebase
- **Simplicity**: Prefer straightforward solutions; avoid over-engineering
- **Readability**: Code should be self-documenting; add comments only for complex logic
- **Performance**: Optimize for static generation; minimize client-side JS
- **Security**: Never commit secrets; validate inputs; use HTTPS

### File Structure
- `apps/`: Individual Next.js applications (e.g., main-site, arb-tracker)
- `packages/`: Shared packages (e.g., ui, api)
- `apps/*/src/pages/`: Next.js pages (e.g., `page.tsx` for routes)
- `apps/*/src/components/`: React components (`.tsx`)
- `apps/*/src/types.ts`: App-specific type definitions
- `packages/ui/`: Shared UI components
- `packages/api/`: Shared API utilities
- `apps/*/public/`: Static assets (images, favicons)
- `apps/*/src/pages/api/`: API routes (`.ts` for serverless functions)
- `wodah.config.ts`: Global config (env vars)

### Imports and Modules
- **Imports**: Use named imports for libraries (`import { createClient } from '@supabase/supabase-js'`)
- **Default Exports**: Components export default (`export default Hero`)
- **Relative Paths**: Prefer relative imports (`../components/Hero`)
- **No Unused Imports**: Remove unused imports; lint will catch
- **Import Order**: Standard library > third-party > local modules

### TypeScript
- **Strict Mode**: Enabled via `astro/tsconfigs/strict`
- **Interfaces**: Define props/interfaces for all components and functions
- **Type Annotations**: Explicitly type function parameters and returns
- **Union Types**: Use for variant props (e.g., `string | number`)
- **Generics**: Use for reusable types (e.g., `Array<T>`)
- **Avoid `any`**: Use specific types; `unknown` for truly unknown values
- **Optional Props**: Use `?` for optional interface properties

### Naming Conventions
- **Variables/Functions**: camelCase (`heroImage`, `handleSubmit`)
- **Components**: PascalCase (`Hero`, `BenefitGrid`)
- **Files**: kebab-case for pages (`[slug].astro`), PascalCase for components (`Hero.tsx`)
- **Constants**: UPPER_SNAKE_CASE (`PRIMARY_COLOR`)
- **Types/Interfaces**: PascalCase (`HeroProps`, `WodahNiche`)
- **Enums**: PascalCase with values in UPPER_SNAKE_CASE
- **Event Handlers**: `handle<Event>` or `on<Event>` (`handleCtaClick`)
- **CSS Classes**: kebab-case (`hero-content`)

### Formatting
- **Indentation**: 2 spaces (match existing code)
- **Line Length**: 80-100 characters max
- **Semicolons**: Always use
- **Quotes**: Single quotes for strings (`'string'`), double for JSX props
- **Braces**: Same line for functions, new line for classes/interfaces
- **Trailing Commas**: Always in objects/arrays
- **Whitespace**: Single blank line between functions; no trailing whitespace

### Components (React)
- **Functional Components**: Use arrow functions or `const Component = () => {}`
- **Props Destructuring**: Destructure props at function start
- **State**: Use `useState` for local state; avoid complex state management
- **Effects**: Use `useEffect` sparingly; prefer derived state
- **Events**: Use arrow functions for handlers to avoid binding
- **Styling**: Inline styles for now; use objects (`style={{ color: 'red' }}`)
- **Client Directives**: Add `client:load` for interactive components in Astro

### Pages (Next.js)
- **App Router**: Use `app/` directory for routing
- **Page Components**: Export default function from `page.tsx`
- **Metadata**: Export `metadata` object for SEO
- **Dynamic Routes**: Use `[slug]` folders for parameterized routes
- **Static Generation**: Use `generateStaticParams` for dynamic routes
- **SEO**: Export metadata object or use Head component

### API Routes
- **Structure**: Export HTTP method functions (`POST`, `GET`)
- **Request Handling**: Destructure `{ request }` from params
- **Validation**: Check required fields; return 400 for bad requests
- **Error Handling**: Wrap in `try-catch`; log errors; return appropriate status codes
- **Responses**: Use `Response` with JSON; set headers for CORS if needed
- **Database**: Use Supabase client; handle errors from queries

### Error Handling
- **Try-Catch**: Wrap async operations (API calls, file reads)
- **Logging**: Use `console.error` for errors; avoid `console.log` in production
- **User Feedback**: Return user-friendly error messages in APIs
- **Fallbacks**: Provide defaults for missing data (e.g., placeholder images)
- **Validation**: Validate inputs early; throw descriptive errors

### Database (Redis)
- **Client Creation**: Use Upstash Redis or local Redis client
- **Queries**: Use `get`, `set`, `keys`, `zadd` methods for caching and data storage
- **Error Checking**: Handle connection errors and timeouts
- **Security**: Use secure connections; never expose connection strings in client code
- **Data Expiration**: Set TTL on keys for temporary data

### Git and Collaboration
- **Commits**: Use descriptive messages; follow conventional commits if adopted
- **Branches**: Feature branches for new work; PRs for reviews
- **PR Guidelines**: Include description, link issues; ensure tests pass
- **Code Reviews**: Check for style, logic, security
- **Issues**: Reference in commits/PRs

### Performance
- **Static First**: Maximize static generation; minimize client-side JS
- **Images**: Optimize with tools like Sharp; use lazy loading
- **Bundle Size**: Monitor with `npm run build`; tree-shake unused code
- **Caching**: Leverage Next.js's built-in optimizations

### Accessibility
- **Semantic HTML**: Use proper tags (`<section>`, `<article>`)
- **Alt Text**: Add `alt` to images
- **Keyboard Nav**: Ensure interactive elements are keyboard-accessible
- **Contrast**: Use high-contrast colors

### Future Enhancements
- Add testing framework (Jest + Testing Library)
- Set up ESLint/Prettier for consistent formatting
- Implement CI/CD with GitHub Actions
- Add internationalization for multi-language support

## Cursor/Copilot Rules
No Cursor rules (`.cursor/rules/` or `.cursorrules`) or Copilot rules (`.github/copilot-instructions.md`) found. If added, integrate them here.

## Final Notes
- Always run `npm run build && npm run typecheck` before committing
- Test changes locally with `npm run dev`
- Refer to existing code for patterns (e.g., component structure in `apps/*/components/`)
- For questions, check Next.js docs or existing issues

This file should be updated as the project evolves. Last updated: [Current Date]</content>
<parameter name="filePath">AGENTS.md