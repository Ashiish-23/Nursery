======================================================================
FILE: 10_PROMPT_GUIDELINES.md
LOCATION: /.ai/10_PROMPT_GUIDELINES.md
======================================================================

# 10_PROMPT_GUIDELINES.md — AI Assistant Behavior & Generation Rules

> **DOCUMENT STATUS:** Standard (Priority 6 - AI Agent Operations)
> **SCOPE:** Governs all AI tools (Cline, Continue, Cursor, Qwen, Copilot, ChatGPT).
> **AUTHORITY:** Dictates exactly HOW the AI should interpret prompts and format its output.

## 1. THE "NO CHATTER" RULE (OUTPUT FORMAT)
- CODE ONLY: Unless explicitly asked to explain, generate the requested code ONLY.
- NO PREAMBLE: Do not start with "Here is the code..." or "I have generated..."
- NO EPILOGUE: Do not summarize what you just did at the end of the response.

## 2. SCOPE & SURGICAL PRECISION
- Single File Execution: If asked to generate or modify one file, generate EXACTLY ONE FILE. Do not generate associated tests, CSS, or sibling files unless explicitly requested.
- Isolation: Modify ONLY the requested file. Do not silently refactor unrelated code.
- Assume Nothing: Do not assume requirements or invent new features. If critical information is missing, make the smallest reasonable assumption that preserves existing architecture, or STOP and ask for clarification.

## 3. ARCHITECTURAL PRESERVATION
- Extend, Don't Replace: ALWAYS extend the existing architecture. NEVER redesign existing modules or replace working implementations.
- Reuse Over Reinvention: Before generating new code, ALWAYS check if a shared utility, component, service, or hook already exists. Prefer consistency over novelty.
- No New Patterns: NEVER introduce a new architectural pattern (e.g., Redux, GraphQL) without explicit human authorization.

## 4. CODE QUALITY & COMPLETENESS
- Production-Ready: Generated code MUST be strictly typed, readable, and production-ready. NEVER generate prototype-quality code.
- No Placeholders: NEVER leave `// TODO: implement this` stubs. NEVER generate mock APIs or placeholder business logic. Generate the complete implementation.
- Error Handling: NEVER swallow errors. Handle them explicitly without exposing sensitive backend stack traces to the frontend.

## 5. PLATFORM-SPECIFIC BOUNDARIES
- React Web: MUST use Functional Components, Tailwind CSS, TanStack Query, React Hook Form + Zod, and React Router v7. NEVER use class components, inline CSS, or raw `fetch()`.
- NestJS Backend: Controllers handle routing/validation ONLY. Services handle business logic ONLY. NEVER put business logic in Controllers.
- Database: ALWAYS use Prisma schema and migrations. NEVER generate manual SQL migrations.

## 6. BUSINESS LOGIC & SECURITY COMPLIANCE
- Follow the Invariants: Business rules belong in `02_DOMAIN_INVARIANTS.md`. NEVER invent business logic or bypass established workflows.
- Zero Trust: ALWAYS assume frontend data is malicious. Validate input, ownership, and permissions exclusively on the backend.
- Secret Management: NEVER hardcode credentials or secrets.

## 7. CONFLICT RESOLUTION (PRECEDENCE)
If user instructions conflict with project standards, the AI MUST resolve the conflict using this exact hierarchy:
1. `02_DOMAIN_INVARIANTS.md` (Absolute Authority)
2. `01_PROJECT_OVERVIEW.md`
3. Platform Standards (`03_FRONTEND`, `06_BACKEND`, etc.)
4. `05_UI_DESIGN_SYSTEM.md`
5. `09_CODING_STANDARDS.md`
6. The User's Prompt

## 8. SUCCESS CRITERIA
The AI's task is considered successful ONLY if it:
1. Solves the requested prompt accurately.
2. Generates code that integrates cleanly with the existing repository.
3. Requires zero manual correction for syntax or architectural violations.