Status: FROZEN
Version: 1.0.0
Owner: SasyaVana Core Team
Document Type: Engineering Handbook
Audience:
- Developers
- Architects
- AI Assistants
- Contributors

Last Updated: 2026

Dependencies: None

Related Documents:
- 01_PROJECT_VISION.md
- 02_PRODUCT_ROADMAP.md
- 03_COMPLETION_GATES.md
- architecture/DOMAIN_MODEL.md
- architecture/ENGINEERING_PRINCIPLES.md
- architecture/SYSTEM_ARCHITECTURE.md

---

# SasyaVana Engineering Handbook

---

# Purpose

This handbook defines the engineering standards, development methodology, architecture philosophy, and software engineering practices for the SasyaVana platform.

Every contributor—human or AI—must treat this document as the primary engineering reference before writing code.

This document is intentionally technology-independent wherever possible. It explains how the platform is engineered rather than how individual features are implemented.

---

# About SasyaVana

SasyaVana is a production-oriented digital marketplace connecting buyers, verified nurseries, businesses, landscapers, institutions, and government organizations.

The objective is not merely to sell plants.

The platform is designed to become a trusted ecosystem for discovering, purchasing, managing, and maintaining living plants while supporting retail and wholesale commerce.

Unlike traditional e-commerce platforms, SasyaVana must solve problems unique to living products, including inventory freshness, plant care, localized delivery, nursery verification, and agricultural workflows.

---

# Engineering Philosophy

SasyaVana follows an Architecture-First Engineering methodology.

Business Requirements

↓

Architecture

↓

Database

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

Documentation

↓

Completed Feature

Business requirements always drive architecture.

Architecture always drives implementation.

Implementation must never redefine architecture.

---

# Engineering Mindset

Every engineering decision must prioritize:

• Correctness before speed.

• Maintainability before cleverness.

• Simplicity before complexity.

• Scalability before convenience.

• Explicit implementation over hidden behavior.

• Long-term reliability over short-term shortcuts.

The platform is expected to evolve for years.

Every line of code should support that objective.

---

# AI Collaboration Policy

Artificial Intelligence is a development accelerator.

AI is **not** the system architect.

AI may:

- Generate implementation code.
- Improve readability.
- Refactor repetitive code.
- Suggest optimizations.
- Produce documentation.
- Generate tests.

AI must never:

- Redesign the architecture.
- Invent database schemas.
- Modify business rules.
- Introduce breaking changes.
- Remove validation.
- Bypass security.

If architectural information is missing, the AI must ask for clarification instead of making assumptions.

---

# Technology Stack

## Mobile

React Native

Expo SDK

Expo Router

TypeScript

React Query

React Hook Form

NativeWind

---

## Backend

NestJS

Prisma ORM

PostgreSQL

JWT Authentication

REST APIs

---

## Future Platform Services

Redis

BullMQ

Meilisearch

MinIO

PostGIS

Docker

CI/CD

Monitoring

Logging

---

# Development Workflow

Every feature follows the exact same lifecycle.

1. Business Analysis

2. Business Rules

3. Domain Design

4. Database Design

5. API Contracts

6. Backend Implementation

7. Frontend Logic

8. User Interface

9. Testing

10. Documentation

11. Review

12. Completion

No feature may skip any stage.

---

# Documentation Standards

Documentation is considered part of the implementation.

Every completed feature must include:

Business documentation

Architecture updates

Database updates

API documentation

Completion checklist

Documentation must always reflect the actual implementation.

Documentation must never become outdated.

---

# Architecture Principles

The following principles are frozen.

## Guest First

Users may browse products without authentication.

Authentication is required only for protected operations.

---

## Backend is the Source of Truth

The frontend never determines:

Prices

Inventory

Permissions

Verification status

Order state

The backend validates every operation.

---

## Platform-Owned Master Catalog

Botanical information belongs to the platform.

Nurseries never create plant species.

Nurseries create listings linked to existing platform species.

---

## Seller-Owned Listings

Each nursery owns:

Price

Inventory

Images

Availability

Delivery options

The botanical information remains platform-owned.

---

## Immutable Inventory Ledger

Inventory is never edited directly.

Every inventory change creates a new ledger entry.

The complete inventory history must always remain auditable.

---

## Atomic Checkout

Checkout either succeeds completely or fails completely.

Partial checkout is never allowed.

---

## Orders are Immutable

Orders never change identity.

Only their status changes through approved state transitions.

---

## Domain Ownership

Each business domain owns exactly one source of truth.

No domain directly modifies another domain's data.

Communication occurs through services or defined contracts.

---

# Quality Standards

Every module must satisfy:

Clean Architecture

Strong validation

Consistent naming

Error handling

Transaction safety

Documentation

Unit testing

Integration testing

Review

---

# Security Standards

Never trust client input.

Validate every request.

Authorize every protected action.

Protect sensitive information.

Audit important actions.

Log security events.

Use least-privilege principles.

---

# Performance Standards

Avoid unnecessary database queries.

Design proper indexes.

Use transactions correctly.

Prepare for caching.

Optimize API responses.

Prevent N+1 query problems.

Build for scalability.

---

# Coding Standards

Business logic belongs in services.

Controllers remain thin.

Validation belongs in DTOs.

Database access belongs in Prisma services.

Avoid duplicated logic.

Prefer explicit implementations.

Follow consistent naming conventions.

Every module should remain independent.

---

# Git Workflow

Every completed feature must:

Pass testing.

Update documentation.

Complete review.

Be committed with meaningful commit messages.

Leave the repository in a deployable state.

---

# Definition of Done

A feature is complete only if:

Business rules implemented.

Architecture respected.

Database finalized.

Backend completed.

Frontend completed.

Validation completed.

Testing passed.

Documentation updated.

Review completed.

Only then may development continue.

---

# Current Development Phase

Current Status

Authentication completed.

Current Milestone

Platform Catalog Foundation.

The Platform Catalog must be completed before beginning Guest Marketplace development.

---

# Official Roadmap

Phase 1

Platform Foundation

Identity

Platform Catalog

Seller Listings

Inventory

Guest Marketplace

---

Phase 2

Commerce

Cart

Wishlist

Checkout

Orders

Addresses

Fulfillment

---

Phase 3

Seller Operations

Seller Dashboard

Inventory Management

Order Processing

Analytics

---

Phase 4

Wholesale

B2B

RFQs

Projects

Quotations

---

Phase 5

Platform Intelligence

Plant Care

Recommendations

Notifications

Artificial Intelligence

---

# Engineering Rules

Rule 1

Business requirements drive architecture.

Architecture drives implementation.

Implementation never drives architecture.

Rule 2

One completed feature at a time.

Rule 3

No temporary hacks.

Rule 4

No undocumented business logic.

Rule 5

Every architectural decision must be intentional.

Rule 6

Backend integrity is never sacrificed for frontend convenience.

Rule 7

Documentation evolves together with code.

Rule 8

Every completed feature leaves the project in a better state than before.

---

# Developer Oath

Every feature begins with understanding before implementation.

Every database change reflects a business requirement.

Every API protects the integrity of the platform.

Every screen represents a stable backend.

Every commit improves the project.

Documentation and implementation evolve together.

No feature is considered complete until it has been designed, implemented, tested, reviewed, documented, and approved.

---

# Long-Term Vision

SasyaVana is engineered as a long-term platform rather than a short-term academic project.

Every engineering decision should support future scalability, maintainability, and reliability while preserving clean architecture and strong business integrity.

The goal is to build software that remains understandable, extensible, and production-ready as the platform grows.