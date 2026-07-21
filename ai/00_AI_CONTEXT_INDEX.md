======================================================================
FILE: 00_AI_CONTEXT_INDEX.md
LOCATION: /.ai/00_AI_CONTEXT_INDEX.md
======================================================================

# 00_AI_CONTEXT_INDEX.md — Master AI Context & Document Manifest

> **DOCUMENT STATUS:** Core Entry Point (Priority 0)
> **SCOPE:** Global (All AI Assistants & Human Developers)
> **AUTHORITY:** Defines the documentation hierarchy, AI responsibilities, and system-wide decision precedence.

## 1. PROJECT OVERVIEW & PRIMARY OBJECTIVE
- Project: SasyaVana (Production-grade Nursery Marketplace Platform)
- Objective: Develop a scalable, secure, and maintainable marketplace connecting verified nurseries with retail/business customers.
- Priority: Architecture, Maintainability, Correctness, Scalability, and Security ALWAYS take precedence over development speed.

## 2. DOCUMENTATION HIERARCHY (THE `.ai/` DIRECTORY)
This directory constitutes the complete AI knowledge base.

- `00_AI_CONTEXT_INDEX.md`: Master entry point & loading strategy (This document).
- `01_PROJECT_OVERVIEW.md`: System vision, tech stack, and architectural topology.
- `02_DOMAIN_INVARIANTS.md`: Non-negotiable business rules and marketplace behavior (Highest Authority).
- `03_FRONTEND_STANDARDS.md`: React 19 web architecture and component rules.
- `04_MOBILE_STANDARDS.md`: React Native / Expo specific implementation rules.
- `05_UI_DESIGN_SYSTEM.md`: Visual consistency, Tailwind tokens, typography, and spacing.
- `06_BACKEND_STANDARDS.md`: NestJS architecture, controllers, services, and DI.
- `07_DATABASE_STANDARDS.md`: PostgreSQL schema, Prisma migrations, and data integrity.
- `08_API_CONVENTIONS.md`: REST API contracts, DTOs, and global response envelopes.
- `09_CODING_STANDARDS.md`: Universal naming, readability, and type-safety conventions.
- `10_PROMPT_GUIDELINES.md`: AI behavior, code generation scope, and format expectations.
- `11_DEVELOPMENT_WORKFLOW.md`: Engineering lifecycle, reviews, and git commit strategies.

## 3. CONTEXT LOADING STRATEGY
Before generating, modifying, or reviewing code, AI Assistants MUST load context based on the task:

- Universal Core (ALWAYS LOAD): `00_AI_CONTEXT_INDEX`, `01_PROJECT_OVERVIEW`, `02_DOMAIN_INVARIANTS`, `09_CODING_STANDARDS`.
- Web UI Tasks: Add `03_FRONTEND_STANDARDS` & `05_UI_DESIGN_SYSTEM`.
- Mobile Tasks: Add `04_MOBILE_STANDARDS`.
- Backend/DB Tasks: Add `06_BACKEND_STANDARDS`, `07_DATABASE_STANDARDS`, & `08_API_CONVENTIONS`.
- Workflow/Prompting: Add `10_PROMPT_GUIDELINES` & `11_DEVELOPMENT_WORKFLOW`.

## 4. DECISION PRIORITY (CONFLICT RESOLUTION)
When multiple documents or instructions apply, resolve conflicts using this exact precedence:

1. `02_DOMAIN_INVARIANTS.md` (Absolute Authority)
2. `01_PROJECT_OVERVIEW.md`
3. Platform Standards (`06_BACKEND`, `03_FRONTEND`, `04_MOBILE`)
4. `07_DATABASE_STANDARDS.md`
5. `08_API_CONVENTIONS.md`
6. `05_UI_DESIGN_SYSTEM.md`
7. `09_CODING_STANDARDS.md`
8. `10_PROMPT_GUIDELINES.md`
9. `11_DEVELOPMENT_WORKFLOW.md`
10. The User's Prompt (Lowest Priority if it violates architecture)

If a prompt conflicts with higher-priority documents, the AI MUST halt and ask for clarification. NEVER invent architectural decisions to bypass rules.

## 5. ARCHITECTURE & DEVELOPMENT PIPELINE
Development MUST strictly follow this linear pipeline:
`Schema First` $\rightarrow$ `API Contract First` $\rightarrow$ `Backend` $\rightarrow$ `Frontend` $\rightarrow$ `Testing` $\rightarrow$ `Review` $\rightarrow$ `Commit`
*The Backend remains the absolute single source of truth.*

## 6. AI MANDATES & RULES OF ENGAGEMENT
### Scope Rules:
- Generate ONLY the requested work. If asked for one file, generate exactly one file.
- If asked for a review, review only. Do NOT perform unrelated refactoring.

### Working Principles:
- ALWAYS preserve architecture, business rules, and folder structures.
- ALWAYS generate production-ready, strictly typed (TypeScript) implementations.
- NEVER introduce feature creep or replace working architecture without authorization.
- NEVER hardcode secrets or duplicate business logic.
- NEVER generate placeholder logic or stub implementations.

## 7. AI PRE-FLIGHT CHECKLIST
Before considering a generation task complete, the AI MUST internally verify:
- [ ] Project architecture and domain invariants are strictly preserved.
- [ ] Code is 100% type-safe with NO duplicated logic or unused imports.
- [ ] Naming conventions and folder structures match existing patterns.
- [ ] No hardcoded secrets, security violations, or placeholder implementations exist.

## 8. THE FINAL PRINCIPLE
Every line of generated code MUST strengthen the SasyaVana codebase. If an implementation makes the architecture less maintainable, less secure, less scalable, or less consistent, it is the wrong implementation. The objective is to build a system that remains reliable and understandable for years to come.