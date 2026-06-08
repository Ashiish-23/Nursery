# SasyaVana - Nursery Marketplace Platform

## Project Overview
SasyaVana is a cross-platform B2C + B2B nursery marketplace application built using React Native (Expo), NestJS, and PostgreSQL.

The platform connects buyers, businesses, landscapers, government organizations, and nursery owners in a unified ecosystem for purchasing plants, saplings, seeds, and nursery products.

The application supports:

- B2C retail purchasing
- B2B bulk purchasing
- RFQ (Request for Quotation) workflows
- Multi-nursery marketplace operations
- Inventory management
- Product verification workflows
- Nursery KYC verification
- Order management
- Future logistics and payment integrations

---

## Technology Stack

### Mobile Application

- React Native
- Expo
- Expo Router
- TypeScript
- TanStack Query
- Axios
- React Hook Form
- Zod

### Backend

- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Bcrypt Password Hashing

### Storage
Phase 1:

- Local file storage

Phase 2:

- MinIO or AWS S3

---

## Core Engineering Principles

### Schema First
No frontend or backend development before database schema is finalized.

### Dependency First
Tables and modules are created in dependency order.

### Module by Module Development
Complete one module fully before moving to the next.

### Business Rules Before Coding
Business workflows must be discussed and finalized before implementation.

### Immutable Audit Trails
Critical history tables are append-only.

Examples:

- inventory_transactions
- future payment ledgers
- future order status history

### One Action One Purpose
Every button performs a single business action.

Examples:

- Add Stock
- Reduce Stock
- Archive Product
- Move To Cart

No generic edit workflows for critical operations.

---

## Marketplace Architecture

### Product Ownership
One Nursery
→ Many Products

One Product
→ One Inventory Record

One Product
→ Many Product Images

### Inventory Rules
Inventory is the source of truth.

Inventory changes must always generate inventory_transactions records.

Inventory transactions are append-only.

No updates.

No deletes.

Stock can never be reduced below reserved quantity.

### Wishlist Rules

- Unique (user_id, product_id)
- No stock reservation
- Archived products remain visible
- Future support for "Notify When Back In Stock"

### Cart Rules

- One active cart per user
- Multiple nurseries allowed
- No stock reservation in cart
- Quantity validated on add-to-cart and checkout

### Address Rules

- Multiple addresses per user
- Exactly one default address
- Recipient name auto-filled from user profile but editable
- Delivery mobile number may differ from account number
- Latitude/longitude stored
- Coordinates captured through GPS or map selection
- Address required before checkout/payment

### Product Image Rules

- Minimum 3 images
- Maximum 12 images
- Admin review workflow
- Product visibility controlled through approval process

### RFQ Rules

- Multi-nursery RFQ model
- One RFQ may contain multiple requested products
- Multiple nurseries can respond
- Partial fulfillment allowed
- Buyer can cancel RFQ
- No negotiation
- No quote revisions
- Inventory not reserved during RFQ

### Order Architecture
master_orders
→ orders
→ order_items

One checkout creates:

Master Order
→ Multiple Nursery Orders

Customer pays once.

Each nursery fulfills independently.

Address snapshots stored in orders.

Price snapshots stored in order_items.

---

## Database Modules Completed

- roles
- users
- nursery_profiles
- kyc_documents
- categories
- products
- inventory
- inventory_transactions
- product_images
- user_addresses
- wishlist_items
- carts
- cart_items
- rfqs
- rfq_items
- rfq_responses

---

## Development Roadmap

### Phase 1
Authentication

- Login
- Registration
- JWT Auth
- Role Selection

### Phase 2
Product Catalog

- Categories
- Products
- Product Details
- Search

### Phase 3
Wishlist

### Phase 4
Cart

### Phase 5
RFQ

### Phase 6
Orders

### Phase 7
Payments

### Phase 8
Notifications

### Phase 9
Reviews & Ratings

### Phase 10
Logistics & Delivery Tracking

---

## Quality Goal
Build SasyaVana as a production-grade marketplace similar in architecture to Amazon Marketplace, Flipkart Marketplace, IndiaMART RFQ systems, and modern quick-commerce applications while maintaining strict engineering discipline and auditability.
# Sasyavana
