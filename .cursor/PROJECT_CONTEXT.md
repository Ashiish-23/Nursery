# SasyaVana Project Context

## Project Overview

SasyaVana is a production-oriented marketplace platform connecting buyers, nurseries, businesses, landscapers, institutions, and government organizations.

This project is NOT an academic CRUD application.

It follows enterprise software engineering principles.

---

# Technology Stack

Frontend
- React Native
- Expo SDK 56
- Expo Router
- TypeScript

Backend
- NestJS
- Prisma ORM
- PostgreSQL

Future Services
- Redis
- BullMQ
- MinIO
- Meilisearch
- PostGIS

---

# Development Philosophy

Every feature must be completed fully before starting the next feature.

Never implement partial solutions.

Never redesign architecture without approval.

Architecture is considered frozen.

---

# Current Development Workflow

Business Rules

↓

Database Design

↓

API Contract

↓

Backend

↓

Frontend Logic

↓

UI

↓

Testing

↓

Review

↓

Complete

---

# Current Status

Authentication is completed.

Next module:

Platform Catalog Foundation.

Do NOT begin any other module until this module is completed.

---

# Core Principles

- Backend is the source of truth.
- Guest-first marketplace.
- Local guest cart.
- Atomic checkout.
- Immutable inventory ledger.
- Platform-owned master species catalog.
- Seller-owned listings.
- Orders are immutable.
- Admin governs but does not manage marketplace content.
- One feature must be fully completed before another begins.

---

# Role Responsibilities

Admin
- Verify nurseries
- Verify businesses
- Suspend users
- Moderate reports
- Governance only

Nursery
- Manage own profile
- Manage own products
- Manage inventory
- Fulfill orders

Buyer
- Browse products
- Guest cart
- Wishlist
- Checkout
- Orders

B2B
- RFQs
- Project folders
- Quotations

---

Always preserve these rules.