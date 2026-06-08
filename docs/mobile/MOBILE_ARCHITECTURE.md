# Mobile App Architecture

## File-Based Routing with Expo Router

The mobile app uses Expo Router's file-based routing system, similar to Next.js.

```
app/
├── (auth)/
│   └── [authentication screens]
├── (home)/
│   └── [main app layout with bottom tabs]
├── catalog/
│   ├── index.tsx      [product list]
│   ├── [id].tsx       [product details]
│   └── search.tsx     [search functionality]
├── cart/
│   ├── index.tsx      [cart list]
│   └── checkout.tsx   [checkout flow]
├── wishlist/
│   └── index.tsx      [wishlist items]
├── rfq/
│   ├── index.tsx      [RFQ list]
│   ├── create.tsx     [create RFQ]
│   └── [id].tsx       [RFQ details]
├── orders/
│   ├── index.tsx      [orders list]
│   └── [id].tsx       [order details]
└── account/
    ├── index.tsx      [profile]
    ├── addresses.tsx  [address management]
    └── settings.tsx   [user settings]
```

## Source Organization

```
src/
├── components/        [reusable UI components]
├── hooks/            [custom React hooks]
├── screens/          [screen-level components]
├── services/
│   └── api/          [API client services]
├── store/            [state management]
├── types/            [TypeScript types]
└── utils/            [utility functions]
```

## Architecture Patterns

### Screens vs Components
- **Screens**: Page-level components, connected to routing
- **Components**: Reusable UI elements

### Services
- **API Service**: Axios-based HTTP client with interceptors
- Handles JWT token injection
- Centralized error handling
- Type-safe request/response

### State Management
- TanStack Query for server state
- Zustand for client state (preferences, filters)

### Validation
- React Hook Form for form handling
- Zod for schema validation

---

## Next Steps

1. Define TypeScript types for domain models
2. Create API service client
3. Build reusable components
4. Implement authentication flow
5. Build catalog screens

---

**Status**: Architecture defined, implementation to follow
