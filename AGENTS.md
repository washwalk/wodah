# Wodah Agent Guidelines (AGENTS.md)

This document provides guidelines for agentic coding agents (like AI assistants) working on the Wodah project. Wodah is a Multi-Tenant Landing Page Engine built with Astro, React, TypeScript, and Supabase. Follow these rules to maintain consistency, quality, and functionality.

## Overview
- **Framework**: Astro (static site generator) with React components for interactivity
- **Language**: TypeScript for type safety
- **Styling**: Inline styles for simplicity (no CSS frameworks yet)
- **Data**: Niche-specific content in JSON files (`content/`)
- **Deployment**: Vercel with Supabase for database
- **Purpose**: Generate landing pages for multiple niches from data-driven templates

## Build/Lint/Test Commands

### Build Commands
- **Full Build**: `npm run build` - Generates static site in `dist/`, creates pages for all niches
- **Development Server**: `npm run dev` - Starts hot-reload dev server at http://localhost:4321
- **Preview Build**: `npm run preview` - Serves built site locally for testing
- **Clean Build**: `rm -rf dist && npm run build` - Removes old build artifacts before rebuilding

### Lint/Typecheck Commands
- **Type Check**: `npx astro check` - Runs TypeScript type checking across all files
- **ESLint**: Not configured yet; run `npx eslint .` if added later
- **Prettier**: Not configured; use `npx prettier --check .` or `--write .` for formatting
- **Full Check**: `npm run build && npx astro check` - Ensures build passes and types are correct

### Test Commands
- **Test Framework**: None configured yet (Jest recommended for future)
- **Run All Tests**: `npm test` (not set up; will run Jest when added)
- **Run Single Test**: `npm test -- <test-file>` (e.g., `npm test src/components/Hero.test.tsx`)
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
- `src/pages/`: Astro pages (e.g., `[slug].astro` for dynamic routes)
- `src/components/`: React components (`.tsx`)
- `src/types.ts`: Global type definitions
- `content/`: JSON data for niches
- `public/`: Static assets (images, favicons)
- `src/pages/api/`: API routes (`.ts` for serverless functions)
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

### Pages (Astro)
- **Frontmatter**: Use `---` for script logic
- **Imports**: Import components at top
- **Props**: Access via `Astro.props`
- **Dynamic Routes**: Use `[slug].astro` for parameterized routes
- **Static Generation**: Use `getStaticPaths` for dynamic routes
- **SEO**: Include `<title>`, meta tags in `<head>`

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

### Database (Supabase)
- **Client Creation**: Initialize in functions, not globally (for env vars)
- **Queries**: Use `.from()`, `.select()`, `.insert()` methods
- **Error Checking**: Always check `error` from Supabase responses
- **Security**: Use RLS policies; never expose API keys in client code
- **Migrations**: Use Supabase dashboard; document schema changes

### Git and Collaboration
- **Commits**: Use descriptive messages; follow conventional commits if adopted
- **Branches**: Feature branches for new work; PRs for reviews
- **PR Guidelines**: Include description, link issues; ensure tests pass
- **Code Reviews**: Check for style, logic, security
- **Issues**: Reference in commits/PRs

### Performance
- **Static First**: Maximize static generation; minimize client JS
- **Images**: Optimize with tools like Sharp; use lazy loading
- **Bundle Size**: Monitor with `npm run build`; tree-shake unused code
- **Caching**: Leverage Astro's built-in optimizations

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
- Always run `npm run build && npx astro check` before committing
- Test changes locally with `npm run dev`
- Refer to existing code for patterns (e.g., component structure in `src/components/`)
- For questions, check Astro docs or existing issues

This file should be updated as the project evolves. Last updated: [Current Date]</content>
<parameter name="filePath">AGENTS.md