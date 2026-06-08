# API Architecture

## REST API Design

The backend provides a RESTful API with the following characteristics:

- **Base URL**: `/api/v1`
- **Authentication**: JWT Bearer tokens
- **Response Format**: JSON
- **Error Format**: Standard error objects with code and message

## API Prefix Structure

All API endpoints follow this structure:

```
/api/v1/{module}/{resource}/{action}
```

## Module-Based API Organization

```
/api/v1/auth
├── POST   /register          [Register new user]
├── POST   /login             [User login]
├── POST   /refresh-token     [Refresh JWT token]
└── POST   /logout            [Logout user]

/api/v1/users
├── GET    /profile           [Get current user profile]
├── PUT    /profile           [Update profile]
└── GET    /:id              [Get user by ID]

/api/v1/products
├── GET    /                  [List products with filters]
├── GET    /:id              [Get product details]
├── POST   /                  [Create product (nursery)]
├── PUT    /:id              [Update product]
└── DELETE /:id              [Archive product]

/api/v1/inventory
├── GET    /                  [Get inventory levels]
├── POST   /add-stock         [Add stock to inventory]
├── POST   /reduce-stock      [Reduce stock (after order fulfillment)]
└── GET    /transactions      [Get inventory transaction history]

/api/v1/orders
├── GET    /                  [List user orders]
├── GET    /:id              [Get order details]
├── POST   /                  [Create order from cart]
└── PUT    /:id/status       [Update order status]

/api/v1/rfq
├── GET    /                  [List RFQs]
├── GET    /:id              [Get RFQ details]
├── POST   /                  [Create RFQ]
├── POST   /:id/respond      [Submit quote response]
└── PUT    /:id/status       [Update RFQ status]
```

## One Action One Purpose

Following the principle of "One Action One Purpose", each endpoint does exactly one thing:

- ✓ POST `/api/v1/inventory/add-stock` - Add stock only
- ✓ POST `/api/v1/inventory/reduce-stock` - Reduce stock only
- ✗ PUT `/api/v1/inventory/:id` - Don't allow generic updates

- ✓ POST `/api/v1/products/:id/archive` - Archive product only
- ✗ PUT `/api/v1/products/:id` - Don't allow arbitrary updates

## Response Format

### Success Response
```json
{
  "status": "success",
  "data": { /* response data */ },
  "meta": { /* pagination, timestamps, etc */ }
}
```

### Error Response
```json
{
  "status": "error",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request",
    "details": [ /* field-level errors */ ]
  }
}
```

## Authentication

All endpoints except `/auth/register` and `/auth/login` require JWT authentication:

```
Authorization: Bearer <JWT_TOKEN>
```

## Role-Based Access Control

Endpoints are protected by role guards:

```
@Roles(Role.ADMIN, Role.NURSERY_OWNER)
@Get('/:id')
getProduct(@Param('id') id: string) {}
```

---

## Next Steps

1. Define complete endpoint specifications
2. Create OpenAPI/Swagger documentation
3. Implement API endpoints following this structure
4. Add comprehensive error handling

---

**Status**: Architecture defined, endpoints to be implemented
