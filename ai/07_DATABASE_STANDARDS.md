======================================================================
FILE: 07_DATABASE_STANDARDS.md
LOCATION: /.ai/07_DATABASE_STANDARDS.md
======================================================================

# 07_DATABASE_STANDARDS.md — PostgreSQL & Prisma Database Standards

> **DOCUMENT STATUS:** Standard (Priority 3 - Database & Schema)
> **SCOPE:** PostgreSQL, Prisma ORM, Prisma Migrations
> **AUTHORITY:** Governed by `01_PROJECT_OVERVIEW.md` & `02_DOMAIN_INVARIANTS.md`

## 1. DATABASE PHILOSOPHY & WORKFLOW
- Source of Truth: The PostgreSQL database is the absolute authoritative source of persisted data. Data Integrity ALWAYS takes precedence over application convenience.
- Schema First: Development MUST follow this exact order: 
  `Schema` $\rightarrow$ `Migration` $\rightarrow$ `Prisma Client` $\rightarrow$ `DTOs` $\rightarrow$ `Services` $\rightarrow$ `Controllers`. NEVER implement features before the schema is finalized.
- Normalization: Prefer Third Normal Form (3NF). Denormalize ONLY when explicitly justified by measured performance bottlenecks.

## 2. STRICT NAMING CONVENTIONS
- Tables: Plural, `snake_case` (e.g., `users`, `products`, `nursery_profiles`, `inventory_transactions`).
- Columns: `snake_case` (e.g., `first_name`, `reserved_quantity`).
- Primary Keys: ALWAYS named `id`.
- Foreign Keys: `singular_table_name_id` (e.g., `user_id`, `nursery_id`).
- Indexes: `idx_table_column` (e.g., `idx_products_species`).
- Constraints: `uq_table_column` (Unique), `fk_table_ref` (Foreign Key), `chk_rule` (Check).

## 3. KEYS, RELATIONS & CONSTRAINTS
- UUIDs Only: Every business table MUST use `UUID` for its primary key. NEVER use auto-incrementing integers for business entities.
- Foreign Key Enforcement: ALWAYS enforce relationships at the database level. NEVER store orphaned foreign identifiers without explicit FK constraints.
- Junction Tables: Many-to-Many (M:N) relationships MUST use dedicated junction tables (e.g., `product_categories`) with composite unique constraints.
- Database Constraints: Enforce business-critical rules at the database level using `UNIQUE`, `CHECK`, and `NOT NULL` constraints to prevent bad data regardless of application logic.

## 4. DATA TYPES & COLUMN RULES
- Non-Nullable Default: Columns MUST be `NOT NULL` by default. Allow `NULL` ONLY when the business domain genuinely permits missing data.
- Monetary Values: NEVER store money using floating-point types (`Float` or `Double`). ALWAYS use `Decimal` with appropriate precision.
- Timestamps: Every business table MUST include `created_at` and `updated_at` (stored in UTC). Default values should be handled by the database, not the application.
- Enums over Booleans: Use Booleans ONLY for binary true/false states. If a state has a workflow (e.g., Status), ALWAYS use database Enums (e.g., `OrderStatus`, `ProductStatus`).
- File References: Store metadata ONLY (`file_name`, `file_path`, `mime_type`). NEVER store binary blobs in PostgreSQL.

## 5. DATA IMMUTABILITY & LIFECYCLE
- Append-Only Ledgers: Tables like `inventory_transactions`, `audit_logs`, and `payment_history` are strictly append-only. Existing records MUST NEVER be modified or deleted.
- Soft Deletes: Business records MUST be archived instead of permanently deleted. Use `deleted_at` or a status Enum (e.g., `ARCHIVED`) to preserve historical integrity.
- Auditability: Important business events (Orders, Payments, Verifications) MUST remain traceable forever.

## 6. MIGRATIONS & PRISMA OPERATIONS
- Prisma Migrate: ALL schema changes MUST be executed via `Prisma Migrate`. NEVER manually alter the production database schema.
- Transactions: ALWAYS use Prisma transactions (`prisma.$transaction`) when writing to multiple tables that must succeed or fail together (e.g., Checkout, Inventory Updates).
- Synchronization: The `schema.prisma` file is the single source of truth. Schema and database state MUST remain perfectly synchronized.

## 7. PERFORMANCE & INDEXING
- Targeted Indexing: Create indexes for Foreign Keys, and frequently filtered, sorted, or searched columns. Avoid over-indexing.
- Query Efficiency: Avoid `SELECT *` behavior. Select only the necessary fields.
- Pagination: Always paginate large datasets. NEVER execute unbounded queries against primary business tables.

## 8. AI CODE GENERATION DIRECTIVES
When generating Prisma schema or database logic, the AI Assistant MUST:
- Preserve schema integrity and respect all existing foreign keys and constraints.
- Generate valid Prisma schema syntax and follow the exact naming conventions.
- NEVER generate raw SQL migrations unless specifically instructed.
- NEVER drop production tables, remove historical data columns, or disable constraints.
- NEVER introduce schema drift by inventing new columns without updating the `schema.prisma` file.