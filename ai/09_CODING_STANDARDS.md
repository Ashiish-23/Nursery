======================================================================
FILE: 09_CODING_STANDARDS.md
LOCATION: /.ai/09_CODING_STANDARDS.md
======================================================================

# 09_CODING_STANDARDS.md — Universal Code Conventions

> **DOCUMENT STATUS:** Standard (Priority 5 - Code Mechanics)
> **SCOPE:** Entire Workspace (React, React Native, NestJS, Prisma)
> **AUTHORITY:** Dictates naming, typing, formatting, and clean code practices.

## 1. CORE PHILOSOPHY
- Quality Over Speed: Code MUST be readable, maintainable, predictable, and production-ready.
- Single Responsibility Principle (SRP): Functions, classes, and components MUST have exactly one primary responsibility.
- Composition Over Inheritance: Prefer composing small, reusable functions and hooks over deep class hierarchies.

## 2. STRICT NAMING CONVENTIONS
- Variables, Functions, Hooks, Services: `camelCase` (e.g., `currentStock`, `validateInventory()`, `useProducts`, `auth.service.ts`).
- Classes, Interfaces, Enums, UI Components: `PascalCase` (e.g., `AuthService`, `ProductInterface`, `OrderStatus`, `ProductCard.tsx`).
- Constants, Environment Variables: `UPPER_SNAKE_CASE` (e.g., `MAX_IMAGES`, `JWT_EXPIRATION`).
- Database Tables & Columns: `snake_case` (e.g., `species_categories`, `is_primary`).

## 3. TYPESCRIPT & TYPE SAFETY
### ALWAYS (Mandates):
- Enable and enforce strict typing (`strict: true`).
- Use `interface` for object shapes and component props.
- Use `enum` or union types for fixed distinct values.
- Use `readonly` for immutable properties and arrays.

### NEVER (Forbidden):
- NEVER use the `any` type. (Use `unknown` if truly dynamic, then narrow the type).
- NEVER use `@ts-ignore` or `@ts-nocheck` to suppress compiler errors.
- NEVER leave TypeScript compilation warnings unresolved.

## 4. CLEAN CODE MECHANICS
- Magic Values: NEVER hardcode raw numbers or string keys in logic (e.g., `if (stock > 10)`). Extract them to descriptive constants (e.g., `if (stock > LOW_STOCK_THRESHOLD)`).
- Comments: Code MUST explain itself via clear naming. Use comments ONLY to explain "Why" a decision was made, NEVER "What" the code is doing. NEVER leave commented-out/dead code in the repository.
- File Size: Avoid files exceeding 500 lines. Split massive files into logical sub-modules.
- Function Size: Prefer functions under 30 lines. Extract complex inline logic into private helper methods.

## 5. ARCHITECTURE & BUSINESS LOGIC ENFORCEMENT
- Controllers: Responsible ONLY for HTTP request/response handling and DTO validation.
- Services: Responsible ONLY for core business logic, domain invariants, and database transactions.
- Repositories/Prisma: Responsible ONLY for data access.
- UI Components: Responsible ONLY for presentation. NEVER place business logic or direct database queries inside UI code.

## 6. ERROR HANDLING & LOGGING
- Explicit Handling: ALWAYS handle errors explicitly. NEVER swallow exceptions with empty `catch` blocks.
- Meaningful Messages: Throw exact, descriptive errors. NEVER use generic fallbacks like "Something went wrong".
- Logging Constraints: Log meaningful domain events (Auth failures, Order creation). NEVER log passwords, JWTs, API keys, or sensitive PII.

## 7. IMPORTS & DEPENDENCIES
Organize imports in this strict top-to-bottom order:
1. Framework & Core libraries (e.g., `react`, `@nestjs/common`)
2. Third-party NPM packages
3. Internal absolute imports (`@/features/...`)
4. Relative imports (`./components/...`)
5. Explicit Type imports (`import type { ... }`)
Remove all unused imports before committing.

## 8. SECURITY & ENVIRONMENT
- Environment Secrets: NEVER hardcode API keys, DB URLs, or secrets in source code. They belong exclusively in `.env`.
- Zero Trust: NEVER trust client-side data. The Backend MUST re-validate all inputs, ownership, and permissions.
- Escaping: ALWAYS escape output where required to prevent XSS.

## 9. AI CODE GENERATION DIRECTIVES
When generating code, the AI Assistant MUST:
- Generate clean, production-ready code that passes strict TypeScript compilation.
- Reuse existing utilities, UI primitives, and services whenever possible instead of reinventing them.
- NEVER generate placeholder implementations, fake mock logic, or `// TODO` stubs.
- NEVER trade readability and maintainability for "clever" one-liners.
- Delete any duplicated logic and refactor into shared helpers.