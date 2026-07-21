======================================================================
FILE: 03_FRONTEND_STANDARDS.md
LOCATION: /.ai/03_FRONTEND_STANDARDS.md
======================================================================

# 03_FRONTEND_STANDARDS.md — React 19 Web Engineering Standards

> **DOCUMENT STATUS:** Standard (Priority 3 - Web Frontend Tasks)
> **SCOPE:** Web Application (`/frontend-web`)
> **AUTHORITY:** Governed by `01_PROJECT_OVERVIEW.md` & `02_DOMAIN_INVARIANTS.md`

## 1. TECH STACK & ECOSYSTEM SPECIFICATIONS
- Core Framework: React 19 (Functional Components Only)
- Language: TypeScript 5.x (Strict Mode Enforced)
- Build System: Vite
- Routing Engine: React Router v7
- Server State Management: TanStack Query (v5)
- HTTP Transport: Axios (Wrapped inside Typed Service Layer)
- Form Engine & Validation: React Hook Form + Zod
- Styling Architecture: Tailwind CSS (Mobile-First Paradigm)
- Path Alias: `@/*` maps directly to `src/*`

## 2. DIRECTORY & FOLDER STRUCTURE
All Web Frontend files MUST strictly adhere to this exact directory topology. AI Assistants MUST NEVER invent new top-level directories under `src/`.
- `src/app/` - Application wrappers, global providers
- `src/assets/` - Static image assets, SVGs, fonts
- `src/features/<feature>/components/` - Feature-specific UI components
- `src/features/<feature>/hooks/` - Feature-specific custom hooks
- `src/features/<feature>/services/` - Feature-specific API calls
- `src/features/<feature>/types/` - Feature-specific TypeScript definitions
- `src/pages/` - Route page components (view orchestrators)
- `src/routes/` - React Router v7 route definitions & guards
- `src/services/` - Core shared API HTTP clients
- `src/shared/layouts/` - Page shells (Header, Footer, MainLayout)
- `src/shared/ui/` - Atomic UI primitives (Button, Modal, Card, Spinner)
- `src/shared/hooks/` - Generic utility hooks
- `src/shared/utils/` - Pure helper functions
- `src/shared/types/` - Global shared TypeScript contracts
- `src/shared/constants/` - System-wide constants & config keys
- `src/styles/` - Global Tailwind CSS imports
- `src/App.tsx` - Root component wrapper
- `src/main.tsx` - Application entry point & DOM mount

## 3. COMPONENT ARCHITECTURAL CATEGORIZATION
- Single Responsibility: One component equals one responsibility. Components MUST remain small. Business logic belongs in hooks or services.
- Shared UI Components (`src/shared/ui/`): Pure presentational primitives with ZERO domain knowledge. MUST be highly reusable.
- Layout Components (`src/shared/layouts/`): Application layout frames. Manage structural page grids and top-level navigation slots.
- Feature Components (`src/features/<feature>/components/`): Domain-aware UI blocks. MUST reside strictly within their respective feature directory. NEVER put feature-specific components inside `src/shared/`.

## 4. REACT 19 & TYPESCRIPT CODING RULES
### ALWAYS (Mandates):
- Functional Paradigm: Use functional components exclusively.
- Props Definition: Every component MUST declare an explicit named interface for its props (e.g., `interface ButtonProps`).
- Component Exports: Use default exports for main components.

### NEVER (Forbidden):
- NEVER use Class Components.
- NEVER use the `any` type.
- NEVER use `React.FC` or `React.FunctionComponent` typings unless explicitly required by a third-party library.
- NEVER use inline `style={{ ... }}` attributes. All styling MUST use Tailwind CSS classes.
- NEVER import React globally (`import React from 'react'`); React 19 auto-transforms JSX.

## 5. STATE MANAGEMENT & API NETWORKING LAWS
- Local View State: Use `useState` strictly for local UI toggles (e.g., modals, active tabs).
- Server State: MUST use TanStack Query (`useQuery`, `useMutation`) for server-side data fetching and caching.
- Global Client State: Keep to an absolute minimum. DO NOT introduce Redux unless explicitly approved.
- API Network Layer: Direct `fetch()` calls are strictly FORBIDDEN. All HTTP requests MUST use Axios instances encapsulated inside dedicated service files. 
- URL Construction: UI Components MUST NEVER construct raw API URLs or handle Axios configs directly.

## 6. ROUTING, FORMS, AND UX PIPELINES
- Routing Protocol: Use React Router v7. Navigation MUST use `<Link to="...">` or `useNavigate()`. Native `<a>` tags and `window.location` mutations are FORBIDDEN for internal routing.
- Form Handling: All forms MUST be built using `react-hook-form` coupled with `Zod` schema resolvers. Uncontrolled forms are prohibited.
- Validation Parity: Validation MUST exist on both the Client (Zod) and the Backend. The Backend remains authoritative.
- Mandatory Async Component States: Every async data-driven view MUST explicitly render 4 distinct user states: Loading, Error, Empty, and Success. NEVER leave blank screens.
- Error Handling: NEVER ignore errors. Display meaningful UI boundaries. DO NOT expose raw backend errors directly to the user.

## 7. STYLING & ACCESSIBILITY (A11Y)
- Tailwind Only: NEVER write custom CSS unless explicitly approved. Tailwind is imported globally; NEVER import Tailwind inside individual components.
- Responsive Design: Strictly Mobile First. Breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`. Every page MUST be responsive.
- Accessibility: Every page MUST include semantic HTML, `aria-label` where appropriate, keyboard accessibility, and visible focus states. NEVER sacrifice accessibility for aesthetics.

## 8. FILE NAMING & IMPORT ORDER CONVENTIONS
### File Naming Conventions:
- Components: `PascalCase.tsx` (e.g., `ProductCard.tsx`)
- Hooks: `camelCase.ts` (e.g., `useProducts.ts`)
- Types: `feature.types.ts` (e.g., `product.types.ts`)
- Services: `feature.service.ts` (e.g., `product.service.ts`)
- Constants: `feature.constants.ts` (e.g., `product.constants.ts`)

### Strict Import Ordering:
1. React & Framework Libraries
2. Third-Party NPM Modules
3. Absolute Internal Imports (`@/*`)
4. Relative Imports
5. Explicit Type-Only Imports

## 9. SECURITY & PERFORMANCE
- Authorization: Frontend NEVER performs authorization decisions, NEVER trusts client data, and NEVER stores secrets (use environment variables only).
- Performance: Prefer lazy loading, route-level code splitting, and memoize ONLY when necessary. Avoid premature optimization.

## 10. AI CODE GENERATION DIRECTIVES
When generating Web Frontend code, the AI MUST:
- Generate exactly ONE file per prompt.
- Output production-ready, 100% type-safe TypeScript.
- Build clean architecture with reusable components.
- NEVER explain generated code (output code only).
- NEVER generate additional unrequested files.
- NEVER invent requirements, add placeholder business logic, or create mock APIs.