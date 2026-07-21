======================================================================
FILE: 08_API_CONVENTIONS.md
LOCATION: /.ai/08_API_CONVENTIONS.md
======================================================================

# 08_API_CONVENTIONS.md — REST API Contracts & Routing

> **DOCUMENT STATUS:** Standard (Priority 4 - API Contracts)
> **SCOPE:** NestJS Controllers, DTOs, Web/Mobile Network Clients
> **AUTHORITY:** Governed by `01_PROJECT_OVERVIEW.md` & `06_BACKEND_STANDARDS.md`

## 1. RESTFUL ARCHITECTURE & ROUTING
- Standard: APIs MUST adhere to strict RESTful design principles. RPC-style endpoints (e.g., `/getProducts`, `/deleteUser`) are strictly FORBIDDEN.
- Resource Naming: ALWAYS use plural nouns for resources (e.g., `/products`, `/orders`, `/categories`). NEVER use verbs in resource paths.
- Versioning: ALL endpoints MUST be versioned using URL prefixes (e.g., `/api/v1/products`). Do not break existing clients without bumping the version.
- Nesting Limit: Avoid deeply nested URLs. Limit nesting to one or two levels (e.g., `/nurseries/:id/products`).

## 2. THE GLOBAL RESPONSE ENVELOPE
ALL API responses MUST evaluate into a standardized JSON envelope. The backend is the single source of truth; clients rely on this exact contract.

### Success / Single Resource
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": { ... }
}

### Collection / Pagination
{
  "success": true,
  "data": [ ... ],
  "pagination": { "page": 1, "limit": 20, "total": 150, "totalPages": 8 }
}

### Error / Failure
{
  "success": false,
  "message": "Validation failed.",
  "errors": [ ... ]
}

## 3. HTTP METHODS & STATUS CODES
### Allowed Methods:
- `GET`: Read resources (Idempotent).
- `POST`: Create new resources.
- `PATCH`: Partial updates.
- `PUT`: Replace entire resources (Use sparingly).
- `DELETE`: Archive/Soft-delete resources (Idempotent where possible).

### Required Status Codes:
- `200 OK`: Successful request.
- `201 Created`: Resource successfully created.
- `204 No Content`: Successful request with no body returned.
- `400 Bad Request`: Input/DTO validation failure.
- `401 Unauthorized`: Missing or invalid JWT token.
- `403 Forbidden`: Authenticated, but lacks required role/ownership.
- `404 Not Found`: Resource does not exist.
- `409 Conflict`: Data state conflict (e.g., duplicate email).
- `422 Unprocessable Entity`: Business rule or domain invariant violation.
- `500 Internal Server Error`: Unexpected server exception.

## 4. PAGINATION, FILTERING & SORTING
- Collections: ALL collection endpoints MUST support pagination (`page`, `limit`), sorting (`sort`, `order=asc|desc`), and filtering. NEVER return unbounded datasets.
- Filtering: Support query parameter filtering (e.g., `?status=ACTIVE&category=plants&minPrice=100`).
- Searching: Use the `?search=` query parameter for case-insensitive keyword searches.

## 5. DATA FORMATS & PAYLOADS
- Validation: Every request body MUST be validated using explicit DTOs. NEVER accept unvalidated JSON.
- Dates: ALWAYS use ISO-8601 timestamps in UTC (e.g., `2026-07-21T14:30:00Z`). NEVER return locale-specific date formats.
- Money: ALWAYS return monetary values as strict Decimals, not floating-point numbers.
- Booleans: Return actual `true`/`false` boolean types, not strings ("Yes"/"No").
- Enums: Return exact uppercase Enum string values (e.g., `ACTIVE`, `ARCHIVED`).
- File Uploads: Use `multipart/form-data`. Endpoints MUST return only file metadata (`id`, `fileName`, `url`), NEVER internal storage paths.

## 6. SECURITY & ERROR HANDLING
- Authentication: Protected endpoints MUST require a JWT (`Authorization: Bearer <token>`).
- Authorization: The Backend MUST re-validate Roles, Ownership, and Permissions. NEVER rely on frontend authorization flags.
- Safe Errors: Return meaningful, user-safe error messages. NEVER expose stack traces, SQL errors, Prisma exceptions, or internal architecture details to the client.

## 7. AI CODE GENERATION DIRECTIVES
When generating API Controllers, Services, or API Clients, the AI Assistant MUST:
- Strictly enforce the global response envelope for every controller return.
- Map correct HTTP status codes to NestJS Exceptions.
- Document every endpoint comprehensively using Swagger/OpenAPI decorators.
- NEVER break existing API contracts or introduce inconsistent endpoint naming.
- NEVER expose raw Prisma models directly to the API response.