# Authentication Quick Reference

## Files Overview

### Core Services
- **[services/api.ts](services/api.ts)** - Axios instance with JWT interceptors
- **[services/auth-storage.ts](services/auth-storage.ts)** - Secure token and user storage

### Screens
- **[app/register.tsx](app/register.tsx)** - Register screen (7 fields, validation, JWT save)
- **[app/login.tsx](app/login.tsx)** - Login screen (2 fields, validation, JWT save)

### Components
- **[components/form/text-input.tsx](components/form/text-input.tsx)** - Reusable input with validation
- **[components/form/button.tsx](components/form/button.tsx)** - Button with loading state
- **[components/form/role-selection.tsx](components/form/role-selection.tsx)** - Role picker
- **[components/form/alert.tsx](components/form/alert.tsx)** - Animated alerts

### Hooks
- **[hooks/use-auth.ts](hooks/use-auth.ts)** - Auth state & navigation logic

### Theme
- **[constants/theme.ts](constants/theme.ts)** - Colors, spacing, fonts

## Common Tasks

### Check if User is Authenticated

```typescript
import { authStorage } from '@/services/auth-storage';

const isAuth = await authStorage.isAuthenticated();
```

### Get Current User

```typescript
import { authStorage } from '@/services/auth-storage';

const user = await authStorage.getUser();
console.log(user.fullName); // John Doe
```

### Make API Request (JWT Auto-Added)

```typescript
import { api } from '@/services/api';

const response = await api.get('/user/profile');
// JWT token automatically added to headers
```

### Logout

```typescript
import { authApi } from '@/services/api';

await authApi.logout(); // Clears token and user
```

### Use Auth in Component

```typescript
import { useAuth } from '@/hooks/use-auth';

export function MyComponent() {
  const { isLoading, user, isSignedIn } = useAuth();
  
  if (isLoading) return <ActivityIndicator />;
  
  if (!isSignedIn) return <Text>Not logged in</Text>;
  
  return <Text>Welcome {user?.fullName}</Text>;
}
```

### Handle Form Submission

```typescript
const onSubmit = async (data) => {
  try {
    setIsLoading(true);
    const response = await authApi.register(data);
    
    // Save token
    await authStorage.saveToken(response.accessToken);
    
    // Save user
    await authStorage.saveUser(response.user);
    
    // Navigate
    router.replace('/(tabs)/');
  } catch (error) {
    setAlert({
      type: 'error',
      title: 'Error',
      message: error.response?.data?.message || 'Failed',
    });
  } finally {
    setIsLoading(false);
  }
};
```

## Password Requirements

- Minimum 8 characters
- Must have uppercase letter (A-Z)
- Must have lowercase letter (a-z)
- Must have number (0-9)

Example: `MyPassword123`

## Mobile Number Format

- Indian format only
- 10 digits total
- Must start with 6, 7, 8, or 9
- Example: `9876543210`

## Role Values

- `B2C_BUYER` - Individual buyer
- `B2B_BUYER` - Business buyer
- `NURSERY_SELLER` - Plant seller

## API Response Format

### Success Response

```json
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

### Error Response

```json
{
  "message": "Invalid credentials",
  "statusCode": 401
}
```

## Component Props

### TextInput

```typescript
<TextInput
  label="Email"
  placeholder="Enter email"
  value={value}
  onChangeText={onChange}
  error={errorMessage}
  keyboardType="email-address"
  required
/>
```

### Button

```typescript
<Button
  title="Submit"
  onPress={handlePress}
  loading={isLoading}
  disabled={isLoading}
  variant="primary" // "primary" | "secondary" | "danger"
  size="lg" // "sm" | "md" | "lg"
/>
```

### Alert

```typescript
<Alert
  type="success" // "success" | "error" | "warning" | "info"
  title="Success"
  message="Operation completed"
  visible={showAlert}
  onDismiss={() => setShowAlert(false)}
  duration={4000}
/>
```

## Debugging

### Check Stored Token

```typescript
import { authStorage } from '@/services/auth-storage';

const token = await authStorage.getToken();
console.log('Token:', token);
```

### Check API Configuration

```typescript
import { api } from '@/services/api';

console.log('Base URL:', api.defaults.baseURL);
console.log('Headers:', api.defaults.headers);
```

### Monitor API Calls

Add to [services/api.ts](services/api.ts):

```typescript
api.interceptors.request.use((config) => {
  console.log('API Request:', config.url, config.data);
  return config;
});

api.interceptors.response.use((response) => {
  console.log('API Response:', response.status, response.data);
  return response;
});
```

## Testing Credentials (Example)

- Mobile: `9876543210`
- Password: `TestPass123`
- Role: `B2C_BUYER`

## Environment Setup

1. Copy `.env.local.example` to `.env.local`
2. Update `EXPO_PUBLIC_API_URL` to your backend URL
3. Restart dev server: `npm start`

## Installation

```bash
cd mobile
npm install
npm start

# On separate terminal
npm run android
# or
npm run ios
```

## Next Steps

- [ ] Test with backend
- [ ] Add password recovery
- [ ] Implement refresh tokens
- [ ] Add biometric login
- [ ] Create auth context for app-wide state
- [ ] Add analytics tracking
- [ ] Test on iOS and Android devices
