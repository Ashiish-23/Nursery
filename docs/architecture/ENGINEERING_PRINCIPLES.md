# SasyaVana Engineering Principles

This document outlines the core engineering principles that guide all development in the SasyaVana project.

## 1. Schema First

**Principle**: No frontend or backend development before the database schema is finalized.

**Why**: 
- Database schema is the contract between frontend and backend
- Schema changes late in development require massive refactoring
- Clear schema forces discussions about business rules before coding

**Execution**:
- Finalize all database tables and relationships first
- Discuss and document business rules implied by schema
- Get stakeholder approval on schema
- Only then begin backend/frontend development

## 2. Dependency First

**Principle**: Tables and modules are created in strict dependency order.

**Why**:
- Prevents circular dependencies
- Makes testing and development linear
- Clear order reduces debugging complexity

**Execution**:
- Map out all table dependencies
- Create core tables first (roles, users)
- Then dependent tables in order
- Backend modules follow same order as tables

**Current Order**:
```
Roles -> Users -> Nursery Profiles -> KYC Documents
Categories (independent)
Products (depends on Users, Categories)
Inventory (depends on Products)
Inventory Transactions (depends on Inventory)
Product Images (depends on Products)
User Addresses (depends on Users)
Wishlist Items (depends on Users, Products)
Carts (depends on Users)
Cart Items (depends on Carts, Products)
RFQs (depends on Users)
RFQ Items (depends on RFQs, Products)
RFQ Responses (depends on RFQ Items, Nursery Profiles)
Master Orders (depends on Users)
Orders (depends on Master Orders, Nursery Profiles)
Order Items (depends on Orders, Products)
```

## 3. Module by Module Development

**Principle**: Complete one module fully before moving to the next.

**Why**:
- Prevents half-implemented features
- Clear completion criteria
- Easier code review and testing

**Definition of Complete**:
- ✓ Database schema finalized
- ✓ Backend service/repository layer complete
- ✓ Backend API endpoints complete
- ✓ Mobile screens/components complete
- ✓ E2E tests passing
- ✓ Business rules validated

## 4. Business Rules Before Coding

**Principle**: Business workflows must be discussed and finalized before implementation.

**Why**:
- Prevents rework due to misunderstood requirements
- Forces clarity on edge cases
- Reduces decision-making during development

**Execution**:
- Document workflow diagrams
- List all business rules
- Identify edge cases
- Get stakeholder sign-off
- Then code

**Examples**:
- Inventory: "Stock can never be reduced below reserved quantity"
- Cart: "One active cart per user, multiple nurseries allowed"
- RFQ: "No negotiation, no quote revisions"
- Orders: "Customer pays once, each nursery fulfills independently"

## 5. Immutable Audit Trails

**Principle**: Critical history tables are append-only.

**Why**:
- Maintains audit trail for regulatory compliance
- Prevents accidental or malicious data changes
- Makes debugging easier

**Which Tables**:
- `inventory_transactions` - ALL stock changes
- `order_status_history` - (future) all order status changes
- `payment_ledger` - (future) all payment records

**Implementation**:
- No UPDATE or DELETE operations
- Only INSERT for history
- Partition by date for performance
- Use timestamps for chronological ordering

## 6. One Action One Purpose

**Principle**: Every button performs exactly one business action.

**Why**:
- Clear user intent
- Easier to audit
- Prevents unintended side effects
- Simpler undo/redo

**What This Means**:
- ✗ "Edit Product" (could change anything)
- ✓ "Add Stock", "Reduce Stock", "Archive Product"
- ✗ "Manage Inventory" (ambiguous)
- ✓ "Move To Cart", "Add To Wishlist"

**Implementation**:
- One API endpoint per action
- No generic update endpoints for critical operations
- Each action has its own business logic
- Each action has its own audit trail

---

## Summary

These principles work together to create a maintainable, auditable, production-grade marketplace:

1. **Schema First** → Clear requirements before coding
2. **Dependency First** → Clean architecture, no circular deps
3. **Module by Module** → Measurable progress, complete features
4. **Business Rules First** → Fewer misunderstandings
5. **Immutable Audit Trails** → Regulatory compliance, debugging
6. **One Action One Purpose** → Clear intent, easier auditing

Follow these principles rigorously. They are not suggestions; they are the foundation of SasyaVana's architecture.
