======================================================================
FILE: 06_BACKEND_STANDARDS.md
LOCATION: /.ai/06_BACKEND_STANDARDS.md
======================================================================

# 06_BACKEND_STANDARDS.md — NestJS & Prisma Backend Standards

> **DOCUMENT STATUS:** Standard (Priority 3 - Backend Tasks)
> **SCOPE:** Backend API Gateway (`/backend`)
> **AUTHORITY:** Governed by `01_PROJECT_OVERVIEW.md` & `02_DOMAIN_INVARIANTS.md`

## 1. TECH STACK & ECOSYSTEM SPECIFICATIONS
- Core Framework: NestJS
- Language: TypeScript (Strict Mode)
- Database & ORM: PostgreSQL + Prisma ORM
- Authentication: JWT, Bcrypt
- Validation: `class-validator`, `class-transformer`
- API Documentation: Swagger / OpenAPI 3.0

## 2. MODULAR MONOLITH ARCHITECTURE
Every feature MUST be encapsulated within a cohesive NestJS module. NEVER combine unrelated domains.
- Folder Structure: `src/modules/<feature>/`
- Expected Files: `module.ts`, `controller.ts`, `service.ts`, `dto/`, `entities/`, `guards/`, `constants/`
- Module Isolation: Modules MUST communicate through injected Services. NEVER access another module's database tables directly.
- Dependency Injection (DI): ALWAYS use NestJS DI (e.g., `constructor(private readonly service: ProductService)`). NEVER manually instantiate classes using `new`.

## 3. LAYER RESPONSIBILITIES (STRICT BOUNDARIES)
### Controllers
- Responsibility: HTTP routing, request/response mapping, parameter parsing, and applying Guard/Swagger decorators.
- FORBIDDEN: Controllers MUST NEVER contain business logic, complex data transformations, or access Prisma directly.

### Services
- Responsibility: Core business rules, domain invariants, cross-module coordination, and database transactions.
- FORBIDDEN: Services MUST NEVER access HTTP `Request` or `Response` objects directly (keep them transport-agnostic).

### DTOs (Data Transfer Objects)
- Responsibility: Strictly define and validate inbound payloads (Create, Update, Filter, Paginate).
- Mandates: Validate every DTO property using `class-validator`. Transform payloads using `class-transformer`. NEVER expose raw Prisma models directly to the frontend.

## 4. DATABASE & PRISMA STANDARDS
- Prisma Client: Database access belongs ONLY inside services.
- Transactions: ALWAYS use `prisma.$transaction` when multiple database writes must succeed or fail together (e.g., Checkout, Order Creation, Inventory Updates, RFQs). NEVER allow partial updates.
- Raw SQL: Prefer Prisma's type-safe query builder. NEVER write raw SQL unless solving a performance bottleneck Prisma cannot handle.
- Soft Deletes: Business records MUST generally be archived (soft-deleted) instead of permanently deleted to preserve historical integrity.
- Query Performance: Avoid N+1 query problems. Use Prisma `include` and `select` carefully to avoid loading excessive relations over the network.

## 5. AUTHENTICATION, AUTHORIZATION & SECURITY
- Single Source of Truth: The backend MUST re-validate all Auth, Ownership, Permissions, and Business Rules. NEVER trust frontend validation or client-side inventory calculations.
- JWT Protocol: Protected routes MUST use `JwtAuthGuard`. NEVER trust frontend authentication state.
- Authorization: Implement Role, Permission, and Ownership checks using dedicated Guards or Interceptors. DO NOT clutter controllers with authorization logic.
- Secrets Management: NEVER hardcode JWT secrets, API keys, or DB URLs. Rely strictly on `@nestjs/config` (`ConfigModule`) and environment variables.

## 6. EXCEPTION HANDLING & LOGGING
- HTTP Exceptions: ALWAYS throw standard NestJS HTTP Exceptions (e.g., `BadRequestException`, `UnauthorizedException`, `NotFoundException`). Avoid generic `Error` objects.
- User-Safe Messages: Error messages MUST be clear, consistent, and user-safe. NEVER expose stack traces, Prisma engine errors, or internal implementation details.
- Logging Rules: Log important business events, auth failures, and security exceptions. NEVER log passwords, JWTs, API keys, or sensitive personal information (PII).

## 7. API DESIGN & DATA FLOW
- Pagination & Filtering: ALL collection endpoints (GET arrays) MUST support `page`, `limit`, `sorting`, and `filtering`. Avoid returning unbounded datasets.
- File Uploads: Handled via `Multer`. Business logic MUST remain storage-independent (Phase 1: Local $\rightarrow$ Phase 2: MinIO/S3).
- Audit Trails: Highly critical actions (Product creation, Inventory changes, Payment events) MUST leave an immutable audit trail.

## 8. AI CODE GENERATION DIRECTIVES
When generating Backend code, the AI Assistant MUST:
- Generate exactly ONE file per prompt.
- Output production-ready, strictly typed NestJS code.
- Apply comprehensive `class-validator` decorators to all DTOs.
- Preserve clean module separation and Dependency Injection patterns.
- NEVER generate placeholder implementations, duplicate validation, or bypass the service layer.