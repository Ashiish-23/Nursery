======================================================================
FILE: 11_DEVELOPMENT_WORKFLOW.md
LOCATION: /.ai/11_DEVELOPMENT_WORKFLOW.md
======================================================================

# 11_DEVELOPMENT_WORKFLOW.md — Software Development Lifecycle & Git Strategies

> **DOCUMENT STATUS:** Standard (Priority 7 - Workflow Mechanics)
> **SCOPE:** Governs Human Developers and AI Assistants (ChatGPT, Qwen, Cline, Cursor).
> **AUTHORITY:** Dictates the exact step-by-step process for building features, fixing bugs, and committing code.

## 1. DEVELOPMENT PHILOSOPHY
- Architecture First: Every implementation MUST preserve the existing architecture, domain invariants, and code quality. Working software is important, but structural correctness is paramount.
- Incremental Execution: Build incrementally. Complete one feature entirely before starting another.
- Focused Changes: Keep changes focused and atomic. NEVER mix unrelated changes (e.g., refactoring a auth module while building a cart feature).

## 2. THE STANDARD DEVELOPMENT LIFECYCLE (10 PHASES)
Every new feature MUST be executed in this exact sequence. AI Assistants MUST NEVER skip phases.

1. Requirements & Constraints: Understand the business objective and verify it against `02_DOMAIN_INVARIANTS.md`.
2. Architectural Review: Identify existing modules and dependencies. Reuse existing architecture whenever possible.
3. Database Schema (If required): Design tables, relations, and indexes. ALL database changes MUST be executed via Prisma Migrations.
4. Business Rules: Define validation, permissions, and ownership logic. Place this logic EXCLUSIVELY in Backend Services.
5. API Contracts: Define endpoints, Request/Response DTOs, and HTTP status codes BEFORE writing implementation logic.
6. Backend Implementation Order:
   `DTOs` $\rightarrow$ `Services` $\rightarrow$ `Controllers` $\rightarrow$ `Guards` $\rightarrow$ `Validation`
7. Frontend Implementation Order:
   `Services (Axios)` $\rightarrow$ `Hooks` $\rightarrow$ `Components` $\rightarrow$ `Pages` $\rightarrow$ `Routing` $\rightarrow$ `UX States` (Loading/Error)
8. Testing & Verification: Verify edge cases, permissions, responsiveness, and accessibility (A11Y).
9. Code Review: Verify type safety, naming conventions, and security.
10. Atomic Commit: Commit code using small, descriptive, atomic messages.

## 3. AI-ASSISTED DEVELOPMENT WORKFLOW
The standard AI-Human loop for SasyaVana is:
`Requirements` $\rightarrow$ `Arch Review` $\rightarrow$ `Optimized Prompt (w/ Context)` $\rightarrow$ `AI Code Gen` $\rightarrow$ `Local Compile` $\rightarrow$ `Human Review` $\rightarrow$ `Git Commit`

### Context Loading Protocol (CRITICAL)
Before asking an AI to generate code, you MUST load the relevant context files from the `.ai/` directory as defined in `.clinerules`. NEVER prompt for code generation without injecting the rules first.

### AI Generation Constraints
- Generate ONE file at a time unless explicitly requested.
- Avoid speculative implementations. Do not guess what the next file should be.
- Human developers remain ultimately responsible for architectural decisions.

## 4. BUG FIX PROTOCOL
When fixing bugs:
1. Understand the exact cause before writing code.
2. Fix the ROOT CAUSE, never patch symptoms with workaround hacks.
3. Verify related functionality to prevent regressions.

## 5. REFACTORING PROTOCOL
Refactoring MUST:
- Preserve existing behavior exactly as it was.
- Improve readability, maintainability, and reduce duplication.
- NEVER introduce new features or bug fixes simultaneously.

## 6. DEPENDENCY MANAGEMENT
Before adding a new NPM package, verify:
- An existing internal solution is unavailable.
- The package has long-term community support and security.
- The impact on bundle size is justified.
- Avoid unnecessary dependencies (e.g., do not add `lodash` if a native ES6 method works).

## 7. ARCHITECTURE FREEZE (LOCKED ZONES)
The following elements require explicit engineering approval before modification. AI Assistants MUST NEVER modify these independently:
- Project architecture & Folder structure
- Database schema & Domain invariants
- API payload conventions & Global error envelopes
- Authentication & Authorization flows

## 8. DEFINITION OF DONE (QUALITY GATES)
Code is considered complete ONLY when:
- Requirements are satisfied and standards are followed.
- Domain invariants remain unviolated.
- The build succeeds with ZERO TypeScript or linting errors. (Passing compilation alone does not indicate completion).
- Security and ownership checks are verified.
- The code is production-ready and requires minimal future rework.