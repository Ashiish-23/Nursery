# Project Vision

SasyaVana is a production-oriented nursery marketplace platform.

Every engineering decision must prioritize:

- Scalability
- Maintainability
- Security
- Performance
- Data Integrity

The backend is the source of truth.

Business rules always come before implementation.

# Engineering Principles

One Module = One Business Domain

One File = One Responsibility

One Function = One Job

One Layer = One Responsibility

Dependencies always flow downward.

Avoid duplicated business logic.

Prefer explicit code over clever code.

# Backend Architecture

Controller

↓

Service

↓

Prisma

↓

Database

# Frontend Architecture

UI

↓

Provider

↓

Service

↓

API

↓

Backend

