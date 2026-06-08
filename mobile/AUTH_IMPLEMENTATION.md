# SasyaVana Mobile Auth Implementation

## Overview

Production-ready React Native authentication screens for SasyaVana using Expo Router, React Hook Form, Zod validation, and expo-secure-store.

## Features

### ✅ Implemented

- **Register Screen**
  - Full Name validation
  - 10-digit mobile number validation (Indian format: 6-9 followed by 9 digits)
  - Optional email with format validation
  - Role selection (B2C Buyer, B2B Buyer, Nursery Seller)
  - Password validation (min 8 chars, uppercase, lowercase, number)
  - Password confirmation matching
  - Form validation using React Hook Form + Zod
  - Loading state with disabled form
  - Success/error alerts with auto-dismiss
  - Direct API integration with NestJS backend
  - JWT token storage using expo-secure-store
  - Auto-navigation to home on success

- **Login Screen**
  - Mobile number validation
  - Password validation
  - Form validation with React Hook Form + Zod
  - Loading state with disabled form
  - Success/error alerts
  - JWT token storage and retrieval
  - Auto-navigation to home on success

- **API Layer** (`services/api.ts`)
  - Axios instance with configurable base URL
  - Request interceptor that adds JWT token to all requests
  - Response interceptor that handles 401 errors
  - Typed auth API methods (register, login, logout)
  - Proper error handling

- **Auth Storage** (`services/auth-storage.ts`)
  - Secure token storage using expo-secure-store
  - User info persistence
  - Clear all auth data on logout
  - Authentication status checking
  - Type-safe user object storage

- **Form Components**
  - Reusable TextInput with label, error, and required indicator
  - Button component with loading state, variants, and sizes
  - RoleSelection component with radio-style options
  - Alert component with animations and auto-dismiss

- **Theme**
  - Plant marketplace green colors (#2D5F3F primary)
  - Dark mode support
  - Consistent spacing and border radius system
  - Mobile-first design

## Installation

### 1. Install Dependencies

Dependencies have been added to `package.json`. Install with:

```bash
cd mobile
npm install
# or
yarn install
```

New packages added:
- `react-hook-form` - Form state management
- `zod` - Schema validation
- `@hookform/resolvers` - Connect Zod to React Hook Form
- `expo-secure-store` - Secure token storage

### 2. Environment Configuration

Create `.env.local` in the mobile directory:

```env
EXPO_PUBLIC_API_URL=http://10.41.110.104:3000
```

Or update in [services/api.ts](services/api.ts):

```typescript
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.41.110.104:3000';
```

## Project Structure

```
mobile/
├── app/
│   ├── login.tsx           # Login screen
│   ├── register.tsx        # Register screen
│   └── (tabs)/            # Main app navigation
├── components/
│   └── form/
│       ├── index.ts        # Exports all form components
│       ├── text-input.tsx  # Reusable text input
│       ├── button.tsx      # Reusable button
│       ├── role-selection.tsx  # Role selection component
│       └── alert.tsx       # Alert/notification component
├── services/
│   ├── api.ts             # Axios API instance with interceptors
│   └── auth-storage.ts    # Secure token/user storage
└── constants/
    └── theme.ts           # Colors, spacing, fonts, border radius
```

## API Integration

### Register Endpoint

```typescript
POST /auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "mobileNumber": "9876543210",
  "email": "john@example.com",  // optional
  "password": "SecurePass123",
  "role": "B2C_BUYER" | "B2B_BUYER" | "NURSERY_SELLER"
}

Response:
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "mobileNumber": "9876543210",
    "fullName": "John Doe",
    "role": "B2C_BUYER"
  }
}
```

### Login Endpoint

```typescript
POST /auth/login
Content-Type: application/json

{
  "mobileNumber": "9876543210",
  "password": "SecurePass123"
}

Response:
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "mobileNumber": "9876543210",
    "fullName": "John Doe",
    "role": "B2C_BUYER"
  }
}
```

## Usage Examples

### Using Auth API

```typescript
import { authApi } from '@/services/api';
import { authStorage } from '@/services/auth-storage';

// Register
const registerResponse = await authApi.register({
  fullName: 'John Doe',
  mobileNumber: '9876543210',
  email: 'john@example.com',
  password: 'SecurePass123',
  role: 'B2C_BUYER',
});

// Login
const loginResponse = await authApi.login({
  mobileNumber: '9876543210',
  password: 'SecurePass123',
});

// Logout
await authApi.logout();
```

### Using Auth Storage

```typescript
import { authStorage } from '@/services/auth-storage';

// Save token
await authStorage.saveToken('token_here');

// Get token
const token = await authStorage.getToken();

// Check authentication
const isAuthenticated = await authStorage.isAuthenticated();

// Get user
const user = await authStorage.getUser();

// Clear all
await authStorage.clearAll();
```

### Using Form Components

```typescript
import { TextInput, Button, Alert } from '@/components/form';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
});

export function MyForm() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Email"
            value={value}
            onChangeText={onChange}
            error={errors.email?.message}
            required
          />
        )}
      />
      <Button
        title="Submit"
        onPress={handleSubmit(onSubmit)}
        variant="primary"
        size="lg"
      />
    </>
  );
}
```

## Validation Rules

### Mobile Number
- Must be 10 digits
- Must start with 6, 7, 8, or 9 (Indian format)
- Pattern: `/^[6-9]\d{9}$/`

### Email
- Valid email format (optional for registration)
- Pattern: Standard email regex

### Password
- Minimum 8 characters
- Must contain uppercase letter
- Must contain lowercase letter
- Must contain number

### Full Name
- Minimum 2 characters
- Maximum 100 characters

### Confirm Password
- Must match password field

## Error Handling

All API calls are wrapped with try-catch and display user-friendly error messages:

```typescript
try {
  const response = await authApi.login(data);
  // Success
} catch (error: any) {
  const errorMessage =
    error.response?.data?.message ||
    error.message ||
    'Operation failed. Please try again.';
  
  setAlert({
    type: 'error',
    title: 'Error',
    message: errorMessage,
  });
}
```

## Navigation Flow

### Register Screen
```
/register
  ↓ (on success)
  /(tabs)/ (home)
  ↓ (login link)
/login
```

### Login Screen
```
/login
  ↓ (on success)
  /(tabs)/ (home)
  ↓ (register link)
/register
```

## Secure Storage

Tokens are stored in secure platform-specific storage:
- **iOS**: Keychain
- **Android**: Keystore

Tokens are automatically added to all API requests via the request interceptor.

## Dark Mode Support

All components support both light and dark modes automatically using React Native's `useColorScheme()` hook.

Update theme colors in [constants/theme.ts](constants/theme.ts).

## Testing

### Manual Testing Checklist

- [ ] Register with valid data → Success message + navigate home
- [ ] Register with invalid mobile → Show error message
- [ ] Register with mismatched passwords → Show error message
- [ ] Login with valid credentials → Success message + navigate home
- [ ] Login with invalid credentials → Show error message
- [ ] Form disables during loading
- [ ] Keyboard avoidance works on both iOS and Android
- [ ] Alerts auto-dismiss after 4 seconds
- [ ] Dark mode theme works
- [ ] Token is stored securely
- [ ] Subsequent API calls include JWT token

## Known Limitations

- Password recovery (coming soon)
- Social login (coming soon)
- OTP verification (coming soon)

## Next Steps

1. Test with actual NestJS backend
2. Implement password recovery flow
3. Add OTP-based verification
4. Implement logout functionality
5. Add user profile screen
6. Implement refresh token logic
7. Add biometric authentication

## Production Checklist

- [ ] Update API base URL to production
- [ ] Test all error scenarios
- [ ] Verify secure storage works on device
- [ ] Test with real backend
- [ ] Add analytics tracking
- [ ] Implement error logging
- [ ] Test on both iOS and Android
- [ ] Optimize bundle size
- [ ] Add app signing certificates
