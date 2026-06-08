# SasyaVana Project Structure

## Monorepo Layout

```
sasyavana/
├── backend/                    # NestJS Application
│   ├── src/
│   │   ├── core/              # Core infrastructure
│   │   │   ├── config/        # Configuration management
│   │   │   └── database/      # Prisma client, migrations
│   │   ├── common/            # Shared utilities
│   │   │   ├── decorators/    # Custom decorators
│   │   │   ├── guards/        # Auth guards, role-based guards
│   │   │   ├── interceptors/  # HTTP interceptors
│   │   │   └── pipes/         # Validation pipes
│   │   ├── modules/           # Feature modules (ordered by dependency)
│   │   │   ├── auth/          # Authentication & JWT
│   │   │   ├── users/         # User management
│   │   │   ├── products/      # Product management
│   │   │   ├── inventory/     # Inventory management
│   │   │   ├── orders/        # Order management
│   │   │   └── rfq/           # RFQ workflows
│   │   ├── app.module.ts      # Main application module
│   │   └── main.ts            # Application entry point
│   ├── prisma/
│   │   └── schema.prisma      # Database schema (append-only, dependency-ordered)
│   ├── test/                  # E2E tests
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── mobile/                    # Expo + React Native Application
│   ├── app/                   # Expo Router file-based routing
│   │   ├── (auth)/           # Authentication screens (grouped route)
│   │   ├── (home)/           # Main app layout (grouped route)
│   │   ├── catalog/          # Product browsing
│   │   ├── cart/             # Shopping cart
│   │   ├── wishlist/         # Wishlist management
│   │   ├── rfq/              # RFQ features
│   │   ├── orders/           # Order management
│   │   └── account/          # User profile
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── screens/          # Screen components
│   │   ├── services/
│   │   │   └── api/          # API client services
│   │   ├── store/            # State management (Zustand/Redux)
│   │   ├── types/            # TypeScript types & interfaces
│   │   └── utils/            # Utility functions
│   ├── package.json
│   └── app.json
│
└── docs/                      # Documentation
    ├── architecture/          # Architecture decisions
    ├── database/              # Database schema documentation
    ├── api/                   # API documentation
    └── mobile/                # Mobile app documentation
```

## Key Design Decisions

1. **Monorepo Structure**: All services under one repository for easier coordination
2. **Modular Backend**: Feature-based modules in dependency order
3. **Expo Router**: File-based routing for mobile for scalability
4. **Prisma ORM**: Type-safe database access with automatic migrations
5. **Role-Based Architecture**: Guards and decorators for authorization

## Dependency Order

Core infrastructure must be established before feature modules:

1. Core (config, database)
2. Common (shared utilities, guards, decorators)
3. Auth (foundation for all other modules)
4. Users (depends on auth)
5. Products (depends on users for ownership)
6. Inventory (depends on products)
7. Orders (depends on products, inventory, users)
8. RFQ (depends on products, users)
