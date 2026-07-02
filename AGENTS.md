# AGENTS.md

# SasyaVana AI Development Guide

## Project Overview

SasyaVana is a production-oriented, enterprise-grade nursery marketplace platform.

This repository is **NOT** an academic CRUD project.

Every architectural decision must prioritize:

* Scalability
* Maintainability
* Security
* Data Integrity
* User Experience
* Offline Reliability

The objective is to build a marketplace comparable in engineering quality to Amazon, Flipkart, Blinkit, and Zepto while solving problems unique to the nursery and agricultural ecosystem.

---

# Technology Stack

## Mobile

* React Native
* Expo SDK 56
* Expo Router
* TypeScript

## Backend

* NestJS
* Prisma ORM
* PostgreSQL

## Future Infrastructure

* Redis
* BullMQ
* MinIO
* Meilisearch
* PostGIS
* Docker

---

# Architecture Status

The architecture is considered **FROZEN**.

Do NOT redesign the architecture.

Do NOT introduce new patterns without approval.

Do NOT change database relationships without approval.

Do NOT replace existing technologies.

---

# Engineering Philosophy

The project follows a strict inside-out engineering approach.

Business Rules

↓

Domain Design

↓

Database Design

↓

API Contracts

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

Completed Feature

The UI is always the last layer.

---

# Core Marketplace Principles

* Guest-first marketplace.
* Backend is the source of truth.
* Authentication should never interrupt product discovery.
* Guest cart exists locally.
* Guest cart merges into authenticated cart.
* Checkout is atomic.
* Inventory is reserved only during checkout.
* Orders are immutable.
* Inventory transactions are immutable.
* Admin governs the platform but does NOT manage seller businesses.
* Every domain owns its own data.
* Platform integrity is enforced by backend rules, never by frontend assumptions.

---

# Domain Ownership

## Identity & Trust

Users

Authentication

Roles

Verification

KYC

Account lifecycle

---

## Catalog

Platform-owned master species catalog.

Scientific names.

Care metadata.

Plant information.

Only the platform owns this data.

---

## Taxonomy

Categories

Tags

Plant classifications

Multilingual names

---

## Seller

Nursery profile

Seller listings

Pricing

Offers

---

## Inventory

Stock

Reservations

Inventory ledger

Availability

---

## Commerce

Wishlist

Cart

Checkout

Orders

Returns

---

## Fulfillment

Delivery

Shipping

Zones

Tracking

---

## Finance

Payments

Commission

Ledger

Payouts

Invoices

---

## Wholesale

B2B

RFQs

Projects

Quotations

---

## Platform Services

Notifications

SMS

OTP

Search

Storage

Queues

---

## Administration

Governance

Moderation

Approvals

Reports

Suspensions

---

# Development Rules

Every feature follows this sequence:

1. Business Rules
2. Database Design
3. API Design
4. Backend Implementation
5. Frontend Logic
6. UI
7. Testing
8. Review
9. Completion

Do not skip steps.

---

# Definition of Done

A feature is NOT complete because it compiles.

A feature is complete only when:

* Business rules implemented
* Database complete
* Backend complete
* APIs tested
* Frontend complete
* Edge cases handled
* Security reviewed
* Performance acceptable
* Documentation updated

---

# Coding Standards

* Prefer explicit code over clever code.
* Keep functions focused.
* Avoid duplicated business logic.
* Use transactions where required.
* Never trust client input.
* Validate everything.
* Use Prisma transactions for critical operations.
* Follow NestJS best practices.
* Keep modules independent.

---

# AI Assistant Responsibilities

When generating code:

* Respect the frozen architecture.
* Never generate placeholder business logic.
* Never bypass validation.
* Never redesign modules.
* Ask for clarification instead of making assumptions.
* Optimize for maintainability.
* Explain significant architectural changes before suggesting them.

The AI should behave like a senior software engineer working under an established architecture, not as the architect itself.

---

# Current Development Status

Authentication is completed.

The next milestone is:

Platform Catalog Foundation.

No future feature should begin until the Platform Catalog module is completed and reviewed.

---

# Long-Term Goal

SasyaVana should be capable of supporting tens of thousands of users and multiple nurseries while maintaining clean architecture, strong data integrity, secure transactions, and excellent developer experience.

Every decision should support this long-term vision.
