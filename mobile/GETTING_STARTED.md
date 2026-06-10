# 🚀 Getting Started Checklist

## Pre-Setup ✓

- [ ] Node.js 18+ installed
- [ ] React Native development environment set up
- [ ] Expo CLI installed: `npm install -g expo-cli`
- [ ] Backend running on http://10.41.110.104:3000 (or configured URL)

## Installation ✓

- [ ] Run `cd mobile && npm install`
- [ ] Verify no critical errors in npm output
- [ ] All 26 new dependencies installed successfully

## Configuration ✓

- [ ] Copy `.env.local.example` to `.env.local`
- [ ] Update `EXPO_PUBLIC_API_URL` if backend is on different host/port
- [ ] For local development, use: `http://10.41.110.104:3000`

## File Structure Verification ✓

- [ ] `app/register.tsx` exists and has 260+ lines
- [ ] `app/login.tsx` exists and has 210+ lines
- [ ] `services/api.ts` has request/response interceptors
- [ ] `services/auth-storage.ts` uses expo-secure-store
- [ ] `components/form/index.ts` exports all form components
- [ ] `hooks/use-auth.ts` has useAuth and useAuthNavigation
- [ ] `types/auth.ts` has TypeScript interfaces
- [ ] `constants/theme.ts` has plant-themed colors

## Start Development Server ✓

```bash
npm start
```

Expected output:

```
► Select a platform to open:
  › iOS
  ❯ Android
    Web
    All
```

## Test on Device/Emulator ✓

### iOS

```bash
npm run ios
```

- [ ] App opens in iOS simulator
- [ ] Register screen loads without errors
- [ ] Login screen loads without errors
- [ ] Theme colors look correct

### Android

```bash
npm run android
```

- [ ] App opens in Android emulator
- [ ] Register screen loads without errors
- [ ] Login screen loads without errors
- [ ] Theme colors look correct

### Web (Optional)

```bash
npm run web
```

- [ ] Runs in browser
- [ ] Form displays correctly
- [ ] Can fill and submit forms

## Test Registration Flow ✓

- [ ] Enter valid full name (John Doe)
- [ ] Enter valid mobile number (9876543210)
- [ ] Enter optional email (john@example.com)
- [ ] Select a role (B2C_BUYER, B2B_BUYER, or NURSERY_SELLER)
- [ ] Enter password (MyPassword123)
- [ ] Confirm password (MyPassword123)
- [ ] Submit form
- [ ] Loading spinner appears
- [ ] Success alert shows (or error if backend not ready)
- [ ] Form disables during submission
- [ ] Navigation to home occurs on success

## Test Login Flow ✓

- [ ] Navigate to login via "Already have account" button
- [ ] Enter valid mobile number (9876543210)
- [ ] Enter password (MyPassword123)
- [ ] Submit form
- [ ] Loading spinner appears
- [ ] Success alert shows (or error if invalid credentials)
- [ ] Navigation to home occurs on success

## Test Validation ✓

- [ ] Leave mobile number empty → Shows error "Invalid mobile number"
- [ ] Enter 9-digit number → Shows error "Invalid mobile number"
- [ ] Enter password with only letters → Shows error about numbers
- [ ] Enter mismatched passwords → Shows error "Passwords do not match"
- [ ] Leave email blank → Works fine (optional)
- [ ] Enter invalid email format → Shows error

## Test Dark Mode ✓

- [ ] Toggle device dark mode
- [ ] App theme changes automatically
- [ ] Colors are readable in both modes
- [ ] Form components look good in dark mode

## Test Error Handling ✓

- [ ] Backend returns error → Display error message
- [ ] Network timeout → Show timeout error
- [ ] Invalid credentials → Show "Invalid credentials" error
- [ ] Alerts auto-dismiss after 4 seconds

## Test Loading States ✓

- [ ] Button shows spinner during submission
- [ ] Form inputs disabled during submission
- [ ] Button text changes during loading
- [ ] User can't double-submit

## Verify Type Safety ✓

```bash
npm run lint
```

- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] No missing type definitions

## Documentation Review ✓

- [ ] Read AUTH_IMPLEMENTATION.md
- [ ] Read AUTH_QUICK_REFERENCE.md
- [ ] Read IMPLEMENTATION_COMPLETE.md
- [ ] Understand API requirements

## Performance Optimization ✓

- [ ] Bundle size is reasonable
- [ ] No memory leaks in loading
- [ ] Animations are smooth
- [ ] Form submission is fast

## Backend Integration ✓

- [ ] Backend has POST /auth/register endpoint
- [ ] Backend has POST /auth/login endpoint
- [ ] Backend returns JWT access token
- [ ] Backend returns user object with id, email, mobileNumber, fullName, role
- [ ] Backend validates mobile number format
- [ ] Backend validates password strength
- [ ] Backend returns proper error messages

## Security Check ✓

- [ ] JWT token stored in secure storage (not localStorage)
- [ ] Token not logged to console
- [ ] Passwords not stored locally
- [ ] HTTPS required for production
- [ ] API base URL configurable via environment

## Production Readiness ✓

- [ ] All features tested
- [ ] No console errors or warnings
- [ ] Error handling implemented
- [ ] Loading states visible
- [ ] Forms validate correctly
- [ ] Navigation works
- [ ] Theme is professional
- [ ] Documentation is complete

## Deployment Prep ✓

- [ ] Update API_URL for production
- [ ] Remove debug logging
- [ ] Enable minification
- [ ] Test on real devices
- [ ] Create signing certificates
- [ ] Set up app signing
- [ ] Plan rollout strategy

---

## 📝 Notes for Developers

### Debugging Tips

- Open React DevTools: Press 'D' in Expo CLI
- View logs: Open browser console or terminal output
- Profile performance: Use React Profiler in DevTools
- Check API calls: Use browser network tab (web) or interceptor logs

### Common Issues

If registration/login fails:

1. Verify backend is running: `curl http://10.41.110.104:3000/health`
2. Check API URL in `.env.local`
3. Verify endpoint paths: `/auth/register` and `/auth/login`
4. Check backend response format matches expected structure
5. View backend logs for errors

### Quick Commands

```bash
npm start                 # Start dev server
npm run ios              # Run on iOS
npm run android          # Run on Android
npm run web              # Run on web
npm run lint             # Check for issues
npm install              # Install dependencies
npm update               # Update packages
```

### File Structure Quick Navigation

```
Register Logic      → app/register.tsx
Login Logic         → app/login.tsx
API Calls          → services/api.ts
Token Storage      → services/auth-storage.ts
Form Components    → components/form/
Auth Hooks         → hooks/use-auth.ts
Types              → types/auth.ts
Theme/Colors       → constants/theme.ts
```

---

## ✅ All Set!

You now have a production-ready authentication system for SasyaVana.

**Next**: Test with your backend and make any adjustments needed for your specific API format.

**Questions?** Check AUTH_QUICK_REFERENCE.md or AUTH_IMPLEMENTATION.md.

Happy coding! 🌿
