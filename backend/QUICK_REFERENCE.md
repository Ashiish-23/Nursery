# Sprint 1 - Quick Reference Guide

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Seed database with roles
npm run seed

# 3. Start development server
npm run start:dev

# 4. Build for production
npm run build

# 5. Run production build
npm run start:prod
```

---

## 📋 API Endpoints - Quick Reference

### Authentication Endpoints (Public)

#### 1. Register New User
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

Response: 201 Created
{
  "access_token": "eyJhbGc...",
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

**Validation Rules:**
- `full_name`: Required, non-empty string
- `mobile_number`: Required, unique, string
- `email`: Optional, unique if provided, valid email format
- `password`: Required, minimum 8 characters
- `role`: Required, one of: B2C_BUYER, B2B_BUYER, NURSERY_SELLER

**Error Responses:**
- 400: Mobile number already registered
- 400: Email already registered
- 400: Invalid email format
- 400: Password too short
- 400: Missing required fields

---

#### 2. Login User
```http
POST /auth/login
Content-Type: application/json

{
  "mobile_number": "9876543210",
  "password": "SecurePass123"
}

Response: 200 OK
{
  "access_token": "eyJhbGc...",
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

**Error Responses:**
- 401: Invalid mobile number or password
- 400: Missing required fields

---

### Users Endpoints

#### 1. Get User Profile (Protected)
```http
GET /users/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer eyJhbGc...

Response: 200 OK
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
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Error Responses:**
- 401: Unauthorized (missing or invalid token)
- 404: User not found

---

#### 2. Get All Roles (Public)
```http
GET /users/roles/all

Response: 200 OK
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

---

## 🔐 Authentication

### JWT Token Format
- **Algorithm**: HS256
- **Expiry**: 24 hours (86400 seconds)
- **Header**: `Authorization: Bearer <token>`
- **Claims**: sub (user ID), mobile_number, role

### How to Use Token

**Option 1: Authorization Header**
```bash
curl -X GET http://localhost:3000/users/user-id \
  -H "Authorization: Bearer eyJhbGc..."
```

**Option 2: Using cURL with token variable**
```bash
TOKEN="eyJhbGc..."
curl -X GET http://localhost:3000/users/user-id \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🔍 Testing Examples

### Register a New User
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Alice Smith",
    "mobile_number": "9123456789",
    "email": "alice@example.com",
    "password": "Alice@Pass123",
    "role": "B2C_BUYER"
  }'
```

### Login and Save Token
```bash
# Login and extract token
RESPONSE=$(curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "mobile_number": "9876543210",
    "password": "SecurePass123"
  }')

TOKEN=$(echo $RESPONSE | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
echo "Token: $TOKEN"
```

### Get User Profile with Token
```bash
curl -X GET http://localhost:3000/users/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer $TOKEN"
```

### Get Available Roles
```bash
curl -X GET http://localhost:3000/users/roles/all
```

---

## 📁 Key Files Location

| Category | File Path | Purpose |
|----------|-----------|---------|
| **Auth Service** | `src/modules/auth/auth.service.ts` | Registration & Login logic |
| **Auth Controller** | `src/modules/auth/auth.controller.ts` | Auth endpoints |
| **JWT Strategy** | `src/modules/auth/strategies/jwt.strategy.ts` | Token validation |
| **Auth Guard** | `src/modules/auth/guards/jwt-auth.guard.ts` | Route protection |
| **Auth DTOs** | `src/modules/auth/dto/` | Request/Response schemas |
| **Users Service** | `src/modules/users/users.service.ts` | User operations |
| **Users Controller** | `src/modules/users/users.controller.ts` | User endpoints |
| **Prisma Service** | `src/core/database/prisma.service.ts` | Database access |
| **Config Service** | `src/core/config/config.service.ts` | Environment config |
| **Decorators** | `src/common/decorators/` | Custom decorators |
| **Database Seed** | `prisma/seed.ts` | Role initialization |
| **Environment** | `.env` | Configuration variables |

---

## ⚙️ Environment Variables

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/database_name"

# JWT
JWT_SECRET="your-super-secret-key-here"
JWT_EXPIRES_IN="86400"  # 24 hours in seconds

# App
NODE_ENV="development"  # or "production"
PORT="3000"
API_PREFIX="/api/v1"

# Storage
UPLOAD_FOLDER="./uploads"
```

---

## 🔑 Available Roles

| Role | Description | Use Case |
|------|-------------|----------|
| **B2C_BUYER** | Individual retail buyer | End consumers buying plants |
| **B2B_BUYER** | Business bulk buyer | Companies/landscapers buying in bulk |
| **NURSERY_SELLER** | Nursery owner/seller | Nurseries selling plants |

---

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Seed database with initial roles
npm run seed

# Start development server (with hot reload)
npm run start:dev

# Start production server
npm start

# Build for production
npm run build

# Run tests
npm run test

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e

# Format code
npm run format

# Lint code
npm run lint
```

---

## 🔄 Common Workflows

### 1. Register and Login
```bash
# Step 1: Register
RESPONSE=$(curl -s -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Test User",
    "mobile_number": "9999999999",
    "email": "test@example.com",
    "password": "TestPass123",
    "role": "B2C_BUYER"
  }')

TOKEN=$(echo $RESPONSE | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

# Step 2: Extract user ID
USER_ID=$(echo $RESPONSE | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

# Step 3: Get user profile
curl -X GET http://localhost:3000/users/$USER_ID \
  -H "Authorization: Bearer $TOKEN"
```

### 2. Test All Endpoints
```bash
# 1. Get available roles
echo "=== Get Roles ==="
curl -X GET http://localhost:3000/users/roles/all | jq .

# 2. Register user
echo "=== Register User ==="
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{...}' | jq .

# 3. Login
echo "=== Login ==="
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{...}' | jq .
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module"
**Solution**: Run `npm install` to install dependencies

### Issue: "Connection refused" (Database)
**Solution**: 
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Verify database credentials

### Issue: "Invalid token"
**Solution**:
- Verify JWT_SECRET matches in .env
- Check token hasn't expired (24 hours)
- Ensure token format: "Bearer <token>"

### Issue: "Mobile number already registered"
**Solution**:
- Use a different mobile number
- Or login with existing credentials

### Issue: Application doesn't start
**Solution**:
```bash
# Clean and rebuild
rm -rf dist/
npm run build
npm start
```

---

## 📊 Database Schema Quick View

### roles table
```sql
id (UUID, PK)
role_name (VARCHAR, UNIQUE)
description (TEXT)
```

### users table
```sql
id (UUID, PK)
full_name (VARCHAR, NOT NULL)
mobile_number (VARCHAR, UNIQUE, NOT NULL)
email (VARCHAR, UNIQUE)
password_hash (VARCHAR, NOT NULL)
role_id (UUID, FK)
account_status (ENUM: ACTIVE, SUSPENDED, BANNED, DEACTIVATED)
verification_status (ENUM: NOT_REQUIRED, PENDING, UNDER_REVIEW, APPROVED, REJECTED)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

---

## 🎯 Next Steps (Sprint 2+)

- [ ] Implement Products Module
- [ ] Implement Inventory Management
- [ ] Implement Cart & Wishlist
- [ ] Implement Orders Module
- [ ] Implement RFQ Module
- [ ] Add email verification
- [ ] Add OTP verification
- [ ] Add password reset
- [ ] Add refresh tokens
- [ ] Add rate limiting
- [ ] Add logging/monitoring
- [ ] Add API documentation (Swagger)

---

## 📚 Documentation

- **Full Implementation Guide**: [SPRINT_1_IMPLEMENTATION.md](./SPRINT_1_IMPLEMENTATION.md)
- **Summary**: [SPRINT_1_SUMMARY.md](./SPRINT_1_SUMMARY.md)
- **File List**: [SPRINT_1_FILES.md](./SPRINT_1_FILES.md)

---

## ✅ Verification Checklist

Before deploying to production:

- [ ] All dependencies installed
- [ ] Environment variables configured
- [ ] Database migrated and seeded
- [ ] Application builds without errors
- [ ] All endpoints tested
- [ ] JWT tokens generated successfully
- [ ] Password hashing working correctly
- [ ] Database connections stable
- [ ] Error handling implemented
- [ ] Security headers configured
- [ ] Logging enabled
- [ ] Rate limiting configured
- [ ] CORS configured (if needed)

---

## 🎓 Learning Resources

### JWT (JSON Web Tokens)
- https://jwt.io/
- https://tools.ietf.org/html/rfc7519

### Bcrypt
- https://bcrypt.online/ (for testing)
- Documentation: bcrypt npm package

### NestJS
- https://docs.nestjs.com/

### Prisma ORM
- https://www.prisma.io/docs/

### Passport.js
- https://www.passportjs.org/

---

**Sprint 1 - Auth & Users Implementation Complete** ✅

**Status**: Ready for Testing and Integration

**Last Updated**: 2026-06-06
