# AGENTS.md

# SasyaVana AI Development Guide

---

# Project Overview

SasyaVana is a production-oriented, enterprise-grade nursery marketplace platform.

This is NOT an academic CRUD project.

Every architectural and implementation decision must prioritize:

- Scalability
- Maintainability
- Security
- Data Integrity
- User Experience
- Performance
- Offline Reliability
- Developer Experience

The objective is to build a marketplace comparable in engineering quality to Amazon, Flipkart, Blinkit and Zepto while solving problems unique to nurseries, landscaping businesses and agriculture.

---

# Technology Stack

## Backend

- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication

---

## Web Application (Current Development)

- React 19
- Vite
- TypeScript
- React Router v7
- Axios
- React Hook Form
- Zod
- TanStack Query
- Tailwind CSS

The Web application is the PRIMARY frontend during Phase 1.

All authentication, catalog, commerce and administration features must first be completed on the Web application before being implemented in the Mobile application.

---

## Mobile Application (Phase 2)

- React Native
- Expo SDK 56
- Expo Router
- TypeScript

The Mobile application must reuse the same backend APIs and business rules already proven in the Web application.

The Mobile app is never allowed to introduce different business rules.

---

## Future Infrastructure

- Redis
- BullMQ
- MinIO
- Meilisearch
- PostGIS
- Docker

---

# Current Development Status

Backend Authentication
✅ Complete

Frontend Web Authentication
🚧 In Progress

Frontend Mobile
⏳ Not Started

Current Sprint

Finish the complete Web Authentication module before beginning Platform Catalog frontend development.

Current Priority

1. Complete Web Authentication
2. Complete Platform Catalog
3. Continue remaining marketplace modules
4. Build Mobile using the same backend

---

# Frozen Architecture

The architecture is considered FROZEN.

AI assistants MUST NOT

- redesign architecture
- introduce different architectural patterns
- replace existing technologies
- redesign database relationships
- redesign module boundaries

Implementation improvements are welcome.

Architectural changes require explicit approval.

---

# Engineering Philosophy

Every feature follows this sequence

Business Rules

↓

Domain Design

↓

Database Design

↓

API Contracts

↓

Backend Implementation

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

UI is ALWAYS the final layer.

---

# Frontend Architecture

The frontend follows exactly the same engineering discipline as the backend.

Every file has ONE responsibility.

Architecture

UI

↓

Provider

↓

Service

↓

API

↓

Backend

Dependencies always flow downward.

Never bypass layers.

---

# One File = One Responsibility

Every file exists to solve exactly one problem.

Examples

auth-storage.ts

Responsible ONLY for storing and retrieving authentication tokens.

Never performs login.

Never performs API requests.

Never manages React state.

---

api.ts

Responsible ONLY for HTTP communication.

Never stores tokens.

Never performs navigation.

Never manages authentication state.

---

auth.service.ts

Responsible ONLY for backend authentication requests.

Never accesses browser storage directly.

Never updates React Context.

Never renders UI.

---

AuthProvider.tsx

Responsible ONLY for authentication state.

Never performs Axios requests directly.

Never accesses browser storage directly.

Never contains UI.

---

LoginForm.tsx

Responsible ONLY for rendering and validating the login form.

Never stores JWT.

Never manages global authentication state.

---

# React Development Rules

Pages

↓

Compose Components

Components

↓

Render UI only

Providers

↓

Manage application state

Services

↓

Backend communication

Shared

↓

Infrastructure

Utilities

↓

Pure reusable logic

No business logic inside components.

No HTTP requests inside components.

No browser storage access outside infrastructure utilities.

---

# Backend Principles

Backend remains the source of truth.

Never trust frontend validation.

Always validate input.

Always enforce business rules on the server.

Use transactions where required.

Protect data integrity.

---

# Marketplace Principles

Guest-first marketplace.

Authentication must never interrupt browsing.

Guest cart exists locally.

Guest cart merges after login.

Checkout is atomic.

Inventory is reserved only during checkout.

Orders are immutable.

Inventory ledger is immutable.

Platform governs the ecosystem.

Sellers govern their own businesses.

Every domain owns its own data.

---

# Coding Standards

Prefer explicit code over clever code.

Keep functions focused.

Avoid duplicated business logic.

Prefer composition over unnecessary abstraction.

Strong TypeScript typing.

No any unless explicitly justified.

Small functions.

Readable code.

Production-ready code only.

---

# AI Collaboration Workflow

ChatGPT responsibilities

- Architecture
- Business Rules
- Design Reviews
- Code Reviews
- Engineering Decisions
- Long-term consistency

Local Qwen responsibilities

- Implement individual files
- Generate boilerplate
- CRUD
- React components
- DTOs
- Services
- Utility functions

Developer responsibilities

- Compile
- Test
- Verify
- Integrate
- Commit

Workflow

ChatGPT

↓

Prompt

↓

Qwen

↓

Implementation

↓

Developer

↓

Compile

↓

ChatGPT Review

↓

Patch

↓

Commit

Never regenerate an entire file for small mistakes.

Patch existing code whenever possible.

---

# AI Rules

AI assistants MUST

Respect the frozen architecture.

Never invent missing files.

Never invent APIs.

Never invent routes.

Never redesign modules.

Never redesign business rules.

Implement only the requested file.

Use existing project conventions.

Ask for clarification instead of making assumptions.

---

# Definition of Done

A feature is complete only when

- Business rules implemented
- Database complete
- APIs implemented
- Backend tested
- Frontend completed
- Edge cases handled
- Security reviewed
- Performance acceptable
- Documentation updated

Compilation alone does NOT mean completion.

---

# Long-Term Goal

SasyaVana should support tens of thousands of users, multiple nurseries, wholesale buyers and administrators while maintaining clean architecture, strong data integrity, secure transactions and excellent developer experience.

Every engineering decision should support this vision.