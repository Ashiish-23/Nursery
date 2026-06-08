# Database Schema Design

## Schema First Principle

All database schema must be finalized and approved **before** any backend or frontend development begins.

This document is a placeholder for the complete Prisma schema definition.

## Current Schema Structure

See [backend/prisma/schema.prisma](../../backend/prisma/schema.prisma) for the authoritative schema definition.

## Dependency Order

The schema follows strict dependency ordering:

```
1. Roles (foundational)
2. Users (depends on roles)
3. Nursery Profiles (depends on users)
4. KYC Documents (depends on nursery profiles)
5. Categories (independent)
6. Products (depends on nursery profiles, categories)
7. Inventory (depends on products)
8. Inventory Transactions (depends on inventory) [APPEND-ONLY]
9. Product Images (depends on products)
10. User Addresses (depends on users)
11. Wishlist Items (depends on users, products)
12. Carts (depends on users)
13. Cart Items (depends on carts, products)
14. RFQs (depends on users)
15. RFQ Items (depends on RFQs, products)
16. RFQ Responses (depends on RFQ items, nursery profiles)
17. Master Orders (depends on users)
18. Orders (depends on master orders, nursery profiles)
19. Order Items (depends on orders, products)
```

## Critical Business Rules Enforced by Schema

### Inventory Rules
- Inventory is the source of truth
- Stock can never go below reserved quantity
- All changes must create inventory_transactions
- inventory_transactions are append-only (no updates/deletes)

### Cart Rules
- One active cart per user (enforced by unique constraint on user_id)
- Multiple items from different nurseries allowed
- No stock reservation in cart

### Wishlist Rules
- Unique (user_id, product_id) constraint
- No stock reservation
- Archived products remain visible

### RFQ Rules
- Multi-nursery model (one RFQ, many responses)
- Partial fulfillment allowed
- No negotiation (responses are final quotes)
- Inventory not reserved during RFQ

### Order Architecture
- One checkout → one master order → multiple orders (one per nursery)
- Address snapshots stored in orders table
- Price snapshots stored in order_items table

## Next Steps

1. Complete all table definitions
2. Define all relationships and constraints
3. Create migration files
4. Validate with stakeholders
5. Begin backend development

---

**Status**: Schema structure defined, tables to be added
