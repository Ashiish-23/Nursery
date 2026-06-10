# Sprint 1 Implementation - Auth & Users Modules

## Overview

Sprint 1 implements the Authentication and Users modules for the SasyaVana marketplace platform. This includes user registration, login, and role-based access control using JWT (JSON Web Tokens) and Bcrypt password hashing.

## Architecture

```
┌─────────────────────────────────────────────┐
│         HTTP Requests (REST API)            │
├─────────────────────────────────────────────┤
│    Auth Controller    │    Users Controller  │
├─────────────────────────────────────────────┤
│    Auth Service       │    Users Service     │
├─────────────────────────────────────────────┤
│      JWT Strategy & Guard                   │
├─────────────────────────────────────────────┤
│         Prisma ORM (Database Layer)         │
├─────────────────────────────────────────────┤
│      PostgreSQL Database                    │
└─────────────────────────────────────────────┘
```

## Files Created

### 1. Core Infrastructure

#### `src/core/config/config.service.ts`

- Handles environment-based configuration
- Provides JWT secret, expiry time, and other settings
- Returns typed configuration values

**Key Methods:**

- `getJwtSecret()`: Returns JWT secret from environment
- `getJwtExpiresIn()`: Returns token expiry in seconds (default: 86400 = 24 hours)
- `getDatabaseUrl()`: Returns database connection URL
- `getPort()`: Returns application port
- `getEnvironment()`: Returns environment (development/production)

#### `src/core/database/prisma.service.ts`

- Extends PrismaClient for type-safe database access
- Manages database connection lifecycle
- Implements `OnModuleInit` to connect on app startup
- Implements `OnModuleDestroy` to disconnect on app shutdown

#### `src/core/core.module.ts` (Updated)

- Exports PrismaService and ConfigService globally
- Makes core infrastructure available to all modules

### 2. Authentication Module

#### DTOs (Data Transfer Objects)

**`src/modules/auth/dto/register.dto.ts`**

- Validates registration request payload
- Fields: full_name, mobile_number, email (optional), password, role
- Uses `class-validator` for validation

```typescript
{
  full_name: string;
  mobile_number: string;
  email?: string;
  password: string; // Min 8 characters
  role: 'B2C_BUYER' | 'B2B_BUYER' | 'NURSERY_SELLER';
}
```

**`src/modules/auth/dto/login.dto.ts`**

- Validates login request payload
- Fields: mobile_number, password

```typescript
{
  mobile_number: string;
  password: string;
}
```

**`src/modules/auth/dto/login-response.dto.ts`**

- Represents successful authentication response
- Contains JWT token and user information

```typescript
{
  access_token: string;
  user: {
    id: string;
    full_name: string;
    mobile_number: string;
    email?: string;
    role: string;
    account_status: string;
  };
}
```

#### Services

**`src/modules/auth/auth.service.ts`**

- Handles authentication business logic
- Implements registration and login flows

**Key Methods:**

- `register(registerDto)`: Creates new user and returns JWT token
  - Validates mobile number uniqueness
  - Validates email uniqueness (if provided)
  - Hashes password using bcrypt
  - Sets account_status to ACTIVE
  - Returns JWT token and user info
- `login(loginDto)`: Authenticates user and returns JWT token
  - Validates mobile number and password
  - Compares hashed password using bcrypt
  - Returns JWT token on success
  - Throws UnauthorizedException on failure

- `validateToken(payload)`: Validates JWT token payload
  - Called by JWT Strategy during authentication

#### Strategies

**`src/modules/auth/strategies/jwt.strategy.ts`**

- Passport.js strategy for JWT validation
- Extracts JWT from Authorization header (Bearer token)
- Validates token signature and expiry
- Calls `validate()` to attach user to request object

**Validation Flow:**

1. Extract token from "Authorization: Bearer <token>" header
2. Verify token signature using JWT_SECRET
3. Check token expiry
4. Load user from database
5. Attach user to request object

#### Guards

**`src/modules/auth/guards/jwt-auth.guard.ts`**

- Route protection guard for JWT-protected endpoints
- Extends Passport's AuthGuard
- Supports @Public() decorator for unprotected routes

**Usage:**

```typescript
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile() { }
```

#### Controller

**`src/modules/auth/auth.controller.ts`**

- Exposes authentication endpoints
- Validates request DTOs

**Endpoints:**

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

#### Module

**`src/modules/auth/auth.module.ts` (Updated)**

- Imports JwtModule with async configuration
- Configures JWT signing options from ConfigService
- Registers AuthService, JwtStrategy
- Imports UsersModule for user operations
- Exports AuthService for other modules

### 3. Users Module

#### Services

**`src/modules/users/users.service.ts`**

- Manages user database operations
- Handles password hashing and verification

**Key Methods:**

- `createUser()`: Creates new user with hashed password
  - Validates mobile number uniqueness
  - Validates email uniqueness (if provided)
  - Hashes password using bcrypt (salt rounds: 10)
  - Creates user with ACTIVE status
- `findByMobileNumber()`: Retrieves user by mobile number
- `findById()`: Retrieves user by ID
- `verifyPassword()`: Compares plain password with hash
- `getRoleByName()`: Retrieves role by name
- `getAllRoles()`: Returns all available roles

#### Controller

**`src/modules/users/users.controller.ts`**

- Provides user information endpoints
- Protected by JwtAuthGuard

**Endpoints:**

- `GET /users/:id` - Get user by ID (protected)
- `GET /users/roles/all` - Get all available roles (public)

#### Module

**`src/modules/users/users.module.ts` (Updated)**

- Registers UsersService and UsersController
- Exports UsersService for other modules

### 4. Common Utilities

#### Decorators

**`src/common/decorators/public.decorator.ts`**

- Marks routes as public (no authentication required)
- Used with @Public() on controller methods
- Overrides global JwtAuthGuard

**Usage:**

```typescript
@Public()
@Post('register')
register() { }
```

**`src/common/decorators/get-user.decorator.ts`**

- Extracts authenticated user from request
- Used on route handler parameters

**Usage:**

```typescript
@Get('profile')
getProfile(@GetUser() user: any) { }
```

**`src/common/decorators/index.ts`**

- Exports all decorators

### 5. Database & Configuration

#### `prisma/seed.ts`

- Database seed script
- Creates three roles: B2C_BUYER, B2B_BUYER, NURSERY_SELLER
- Idempotent - only creates roles if they don't exist

**Run seed:**

```bash
npm run seed
```

#### `.env`

Environment variables for development:

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for signing tokens
- `JWT_EXPIRES_IN`: Token expiry in seconds (86400 = 24 hours)
- `NODE_ENV`: development/production
- `PORT`: Application port

### 6. Application Setup

#### `src/main.ts` (Updated)

- Global validation pipe with whitelist and transform options
- Rejects unknown properties in request bodies
- Automatically transforms objects to DTO classes

#### `src/app.module.ts` (Updated)

- Registers global JwtAuthGuard
- All routes protected by default
- Public routes override with @Public() decorator

## API Endpoints

### Authentication Endpoints

#### 1. Register User

```http
POST /auth/register
Content-Type: application/json

{
  "full_name": "John Doe",
  "mobile_number": "9876543210",
  "email": "john@example.com",
  "password": "SecurePass123",
  "role": "B2C_BUYER"
}
```

**Response (201 Created):**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "full_name": "John Doe",
    "mobile_number": "9876543210",
    "email": "john@example.com",
    "role": "B2C_BUYER",
    "account_status": "ACTIVE"
  }
}
```

**Validation Errors (400 Bad Request):**

- Mobile number already registered
- Email already registered
- Password less than 8 characters
- Role not in allowed values

#### 2. Login User

```http
POST /auth/login
Content-Type: application/json

{
  "mobile_number": "9876543210",
  "password": "SecurePass123"
}
```

**Response (200 OK):**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "full_name": "John Doe",
    "mobile_number": "9876543210",
    "email": "john@example.com",
    "role": "B2C_BUYER",
    "account_status": "ACTIVE"
  }
}
```

**Error Response (401 Unauthorized):**

```json
{
  "message": "Invalid mobile number or password"
}
```

### Users Endpoints

#### 1. Get User Profile

```http
GET /users/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer <access_token>
```

**Response (200 OK):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "full_name": "John Doe",
  "mobile_number": "9876543210",
  "email": "john@example.com",
  "roles": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "role_name": "B2C_BUYER",
    "description": "Individual retail buyer"
  },
  "account_status": "ACTIVE",
  "verification_status": "NOT_REQUIRED",
  "created_at": "2024-01-15T10:30:00Z"
}
```

#### 2. Get All Roles

```http
GET /users/roles/all
```

**Response (200 OK):**

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "role_name": "B2C_BUYER",
    "description": "Individual retail buyer"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "role_name": "B2B_BUYER",
    "description": "Business bulk buyer"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440003",
    "role_name": "NURSERY_SELLER",
    "description": "Nursery or seller"
  }
]
```

## Security Features

### 1. Password Security

- **Hashing Algorithm**: Bcrypt with salt rounds 10
- **Strength**: Resistant to rainbow table attacks
- **Comparison**: Constant-time comparison to prevent timing attacks

### 2. JWT Security

- **Signing Algorithm**: HS256
- **Expiry**: 24 hours (86400 seconds)
- **Storage**: Recommend storing in secure HTTP-only cookie
- **Transmission**: Authorization header with Bearer scheme

### 3. Data Validation

- **Request Validation**: class-validator DTOs
- **Type Safety**: TypeScript strict mode
- **Whitelist**: Unknown properties rejected

### 4. Error Handling

- **Generic Messages**: Don't reveal if mobile number exists
- **Consistent Responses**: Standard error format
- **Logging**: Can be added for security audits

## Database Schema

### users table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  mobile_number VARCHAR(15) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role_id UUID NOT NULL REFERENCES roles(id),
  account_status account_status_enum DEFAULT 'ACTIVE',
  verification_status verification_status_enum DEFAULT 'NOT_REQUIRED',
  mobile_verified BOOLEAN DEFAULT false,
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### roles table

```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY,
  role_name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT
);
```

## Testing

### Manual Testing with cURL

**Register:**

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "John Doe",
    "mobile_number": "9876543210",
    "email": "john@example.com",
    "password": "SecurePass123",
    "role": "B2C_BUYER"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "mobile_number": "9876543210",
    "password": "SecurePass123"
  }'
```

**Get User (with token):**

```bash
curl -X GET http://localhost:3000/users/<user-id> \
  -H "Authorization: Bearer <access_token>"
```

## Development Setup

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Installation

```bash
cd backend
npm install
npm run seed
npm run start:dev
```

### Environment Setup

```bash
cp .env.example .env
# Edit .env with your PostgreSQL credentials and JWT secret
```

## Future Enhancements

### Phase 2

- [ ] Email verification workflow
- [ ] Mobile number verification (OTP)
- [ ] Password reset functionality
- [ ] Role-based authorization decorators
- [ ] Two-factor authentication
- [ ] Rate limiting for login attempts
- [ ] Account locking after failed attempts
- [ ] Audit logging

### Phase 3

- [ ] OAuth 2.0 integration (Google, Apple)
- [ ] Refresh token mechanism
- [ ] Token revocation (logout)
- [ ] Session management
- [ ] API key authentication for mobile apps

## Troubleshooting

### JWT Token Issues

**"Invalid token" error:**

- Check JWT_SECRET matches between sign and verify
- Verify token not expired (default 24 hours)
- Ensure Authorization header format is "Bearer <token>"

### Database Connection Issues

**"Connection refused" error:**

- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Check database credentials

### Validation Errors

**"Unknown property" errors:**

- Only send fields defined in DTOs
- Check field names match exactly
- Verify data types match DTO definitions

## Dependencies

### Production

- `@nestjs/common`: NestJS core utilities
- `@nestjs/core`: NestJS framework
- `@nestjs/jwt`: JWT support
- `@nestjs/passport`: Passport.js integration
- `@prisma/client`: Prisma ORM client
- `bcrypt`: Password hashing
- `class-validator`: Request validation
- `class-transformer`: DTO transformations
- `passport`: Authentication middleware
- `passport-jwt`: JWT strategy

### Development

- `@types/bcrypt`: TypeScript types for bcrypt
- `@types/passport-jwt`: TypeScript types for passport-jwt
- `typescript`: TypeScript compiler
- `ts-node`: TypeScript runtime

## License

UNLICENSED
