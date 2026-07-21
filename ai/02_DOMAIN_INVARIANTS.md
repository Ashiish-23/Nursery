# 02_DOMAIN_INVARIANTS.md — Core Business Laws

> **DOCUMENT STATUS:** Absolute Authority (Priority 1)
> **RULE:** AI Assistants MUST NEVER violate these rules, even if explicitly requested by a user prompt, generated code, or conflicting documentation.

## 1. Architectural Absolutes
*   **Source of Truth:** The backend is the absolute single source of truth for all data, logic, and authorization.
*   **Development Sequence:** ALWAYS follow Schema First, then API Contract First, then Module-by-Module implementation.
*   **Extension over Mutation:** ALWAYS preserve and extend the existing project architecture; NEVER invent new architectural patterns or temporary hacks.
*   **Database Migrations:** Database schema changes MUST occur exclusively through Prisma migrations; manual schema drift is strictly prohibited.

## 2. Marketplace & Entity Boundaries
*   **Marketplace Flow:** Products belong to Nurseries, Users purchase Products, Orders belong to Buyers, and Nurseries fulfill Orders.
*   **Nursery Ownership:** One Seller owns exactly one Nursery, and every Nursery has exactly one Owner.
*   **Product Origin:** Products MUST NEVER exist without a Nursery; deleting a Nursery MUST NEVER orphan Products (enforce soft-deletes/archiving).
*   **Product Lifecycle:** Products maintain explicit lifecycle states (e.g., ACTIVE, INACTIVE, ARCHIVED).

## 3. User Roles & Capabilities
*   **Guest:** Browse marketplace catalog, view products, and view nurseries.
*   **Buyer (B2C):** Purchase products, maintain personal wishlists, maintain carts, and place orders.
*   **Business Buyer (B2B):** Submit RFQs and execute bulk purchases.
*   **Nursery Seller:** Manage their single nursery, adjust inventory ledgers, manage product listings, and fulfill orders.
*   **Administrator:** Full platform management, nursery verification, product moderation, and Species MDM control.

## 4. Species Master Data Management (MDM)
*   **Platform Ownership:** Species are platform-owned master data and represent canonical botanical facts.
*   **Admin Exclusivity:** ONLY Administrators may create, update, or archive Species.
*   **Seller Restriction:** Nursery Sellers MUST NEVER create, rename, or delete Species.
*   **Category Enforcement:** Every Species MUST have exactly one Primary Category, which is immutable without Administrator action.

## 5. Inventory & Ledger Laws
*   **Ledger Immutability:** Inventory history is an append-only ledger; existing transactions MUST NEVER be modified or deleted.
*   **Derived Stock:** Current stock availability MUST be derived programmatically from the ledger sum (e.g., Stock Added, Sale, Return, Reservation Hold).
*   **No Direct Updates:** Stock counts MUST NEVER be manually edited or updated via direct database mutation.
*   **Positive Stock Guarantee:** Inventory calculations MUST NEVER allow stock to fall below zero.

## 6. Commerce & Cart Operations
*   **Wishlist Independence:** Wishlists are personal to the user, do not reserve inventory, and keep out-of-stock items visible.
*   **Cart Authority:** Guest carts exist locally; authenticated carts belong to the backend.
*   **Stock Reservation:** Carts DO NOT reserve inventory; stock validation occurs strictly during the checkout process.
*   **Address Management:** Users may have multiple addresses, but exactly one MUST be set as the default.

## 7. Order & Pricing Immutability
*   **Historical Freeze:** Orders are immutable business records; Order history MUST NEVER be deleted or modified post-completion.
*   **Price Lock:** Historical Orders retain their exact original purchase prices.
*   **Price Updates:** Modifications to Product prices by Sellers affect ONLY future purchases.
*   **Payment Triggers:** Payment status belongs to Orders; successful checkout triggers inventory ledger processing, never direct inventory mutation.

## 8. RFQ (Request for Quotation)
*   **B2B Scope:** RFQ exclusively supports Business Buyers.
*   **Cancellation:** Buyers may cancel an active RFQ.
*   **V1 Limitations:** Deep negotiation pipelines and quotation revisions are out of scope for the current architecture.

## 9. Security & Validation Authority
*   **Zero Client Trust:** NEVER trust frontend data, client calculations, or UI state for business decisions.
*   **Backend Enforcer:** The backend MUST perform all validation (Authentication, Authorization, Ownership, Permissions, Business Rules).
*   **Audit Integrity:** Audit records are immutable; historical system records MUST NEVER be deleted or overwritten.

## 10. AI Generation Directives
*   **Rule Precedence:** If generated requirements conflict with this document, THIS DOCUMENT takes absolute precedence.
*   **No Business Logic Duplication:** NEVER duplicate business logic across domains or copy backend logic into frontend components.
*   **Strict Adherence:** ALWAYS generate code that strictly preserves these invariants without introducing feature creep or bypassing validation.