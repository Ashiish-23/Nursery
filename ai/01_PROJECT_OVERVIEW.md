# SasyaVana Project Overview

## Project Name

SasyaVana

---

# Project Type

Production-grade Nursery Marketplace Platform

Supports:

- B2C Marketplace
- B2B Marketplace
- Nursery Sellers
- Landscapers
- Government Organizations (Future)
- Institutional Buyers (Future)

---

# Primary Goal

Build India's most reliable, scalable and production-ready online nursery marketplace.

The platform connects verified nursery sellers with retail and business customers while maintaining accurate inventory, trusted product information and secure transactions.

---

# Technology Stack

## Web

- React 19
- TypeScript
- Vite
- React Router v7
- Tailwind CSS
- TanStack Query
- Axios

## Mobile

- React Native
- Expo SDK
- Expo Router
- NativeWind
- TypeScript

## Backend

- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Bcrypt
- Swagger

## Storage

Phase 1

- Local Storage

Phase 2

- MinIO
- AWS S3

---

# Architecture Principles

MUST

- Schema First
- API Contract First
- Module-by-Module Development
- Production-Oriented Design
- Clean Architecture
- Separation of Concerns
- Single Responsibility Principle
- Immutable Audit Trails
- Atomic Database Transactions

NEVER

- Feature Creep
- Temporary Hacks
- Quick Fixes
- Duplicate Business Logic
- Hardcoded Values
- Direct Database Access from Frontend

---

# User Roles

Guest

- Browse products
- Browse nurseries
- Search products
- View categories

Buyer

- Retail customer
- Wishlist
- Cart
- Checkout
- Orders

Business Buyer

- Bulk purchases
- RFQ
- Quotations

Nursery Seller

- Manage nursery
- Manage inventory
- Manage products
- Process orders

Administrator

- Platform management
- User verification
- Nursery verification
- Product moderation
- Reports

---

# Marketplace Model

Products belong to Nurseries.

Users purchase Products.

Inventory belongs to Products.

Orders belong to Buyers.

Nurseries fulfill Orders.

---

# Development Philosophy

Every feature is developed in the following order.

1. Database Design
2. Business Rules
3. API Contracts
4. Backend Implementation
5. Frontend Integration
6. Testing
7. Review
8. Refactoring

---

# Code Generation Philosophy

AI must generate:

- One file at a time
- Production-ready code
- Strict TypeScript
- Reusable components
- Maintainable architecture

AI MUST NOT

- Guess requirements
- Invent new architecture
- Modify unrelated files
- Skip validation
- Ignore existing standards

---

# Frontend Applications

Two independent applications exist.

Web

- React
- Vite

Mobile

- React Native
- Expo

Each application follows its own standards while sharing the same backend APIs.

---

# Backend Responsibilities

The backend is the single source of truth.

Responsibilities include:

- Authentication
- Authorization
- Validation
- Business Rules
- Inventory Management
- Orders
- Payments
- Notifications
- File Management

Frontend applications never implement business rules.

---

# Database

Database engine:

PostgreSQL

ORM:

Prisma

All schema changes must be implemented through Prisma migrations.

---

# Security

Always validate:

- Authentication
- Authorization
- Input Validation
- Ownership
- Business Rules

Passwords must always be hashed.

JWT authentication is mandatory for protected APIs.

---

# Quality Goals

Every generated code file should be:

- Readable
- Maintainable
- Scalable
- Testable
- Secure
- Production Ready

Code quality is always preferred over speed.

---

# Project Status

Architecture is considered stable.

Future development should extend the existing architecture instead of replacing it.

Business rules defined in DOMAIN_INVARIANTS.md are authoritative and must never be violated.