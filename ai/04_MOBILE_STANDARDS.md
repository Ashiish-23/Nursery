======================================================================
FILE: 04_MOBILE_STANDARDS.md
LOCATION: /.ai/04_MOBILE_STANDARDS.md
======================================================================

# 04_MOBILE_STANDARDS.md — Expo & React Native Engineering Standards

> **DOCUMENT STATUS:** Standard (Priority 3 - Mobile Tasks)
> **SCOPE:** Mobile Application (`/mobile`)
> **AUTHORITY:** Governed by `01_PROJECT_OVERVIEW.md` & `02_DOMAIN_INVARIANTS.md`

## 1. TECH STACK & ECOSYSTEM SPECIFICATIONS
- Core Framework: React Native
- Platform & Tooling: Expo SDK
- Language: TypeScript (Strict Mode Enforced)
- Routing Engine: Expo Router
- Styling Architecture: NativeWind
- Server State Management: TanStack Query
- HTTP Transport: Axios
- Form Engine & Validation: React Hook Form + Zod
- Authentication Storage: Expo SecureStore

## 2. DIRECTORY & FOLDER STRUCTURE
All Mobile Frontend files MUST strictly adhere to this exact directory topology. AI Assistants MUST NEVER invent new top-level directories.
- `app/` - Expo Router file-based routing configuration and screens
- `components/` - Shared, highly reusable UI primitives
- `features/` - Domain-driven feature modules (e.g., `features/cart/components`)
- `hooks/` - Global and shared custom hooks
- `services/` - Core API network clients (Axios)
- `constants/` - System-wide configuration and design tokens
- `types/` - Global TypeScript definitions
- `utils/` - Pure helper functions
- `assets/` - Static images, fonts, and icons

## 3. MOBILE ARCHITECTURE PHILOSOPHY
- Client-Only Authority: The mobile app is strictly a presentation, navigation, and hardware interface layer.
- Source of Truth: The backend remains the absolute single source of truth.
- FORBIDDEN: The mobile app MUST NEVER implement business rules, calculate inventory, or make standalone authorization decisions.

## 4. UI, STYLING & NAVIGATION RULES
- Expo Router Only: ALWAYS use Expo Router (Stack, Tabs, Nested Routes) for navigation. Custom or third-party navigation implementations are FORBIDDEN.
- Styling Protocol: ALWAYS use NativeWind. NEVER use React Native `StyleSheet`, inline styles, or mixed styling systems unless absolutely necessary for complex animations.
- Safe Area Handling: ALWAYS respect device safe areas using `SafeAreaView` or Expo safe area utilities. Avoid hardcoded padding for notches.
- List Rendering: ALWAYS use `FlatList` (or `SectionList` for grouped data) for collections. NEVER render long datasets inside a `ScrollView`.
- Images: Prefer `expo-image` for optimized loading, caching, and placeholder support.

## 5. NETWORKING, STATE & OFFLINE BEHAVIOR
- Network Layer: ALWAYS use Axios. Base URLs MUST be injected via `EXPO_PUBLIC_API_URL`. NEVER hardcode API URLs.
- Async UX States: EVERY network request must explicitly handle 4 states: Loading, Success, Error, and Offline.
- Offline Gracefulness: Cache server data using TanStack Query. NEVER assume network availability. The app MUST fail gracefully and display meaningful offline messages.
- Form Validation: Validate locally using Zod for UX, but treat the Backend validation as authoritative.

## 6. HARDWARE PERMISSIONS & DEVICE FEATURES
- Just-in-Time Permissions: Request device permissions (Camera, Location, Notifications) ONLY when immediately required by a user action.
- Contextual Explanations: ALWAYS explain why a permission is required BEFORE triggering the OS prompt.
- Graceful Denials: ALWAYS handle denied permissions gracefully. The app MUST NOT crash if a user refuses camera access.

## 7. SECURITY & STORAGE
- Sensitive Storage: ALWAYS store sensitive data (JWTs, Refresh Tokens) using `Expo SecureStore`. NEVER expose tokens in console logs.
- Non-Sensitive Storage: Use `AsyncStorage` ONLY for non-sensitive user preferences (e.g., theme, onboarding status). NEVER store secrets in `AsyncStorage`.
- Environment Variables: Public configuration uses `EXPO_PUBLIC_*`. NEVER embed API keys, secrets, or backend passwords inside the mobile bundle.

## 8. AI CODE GENERATION DIRECTIVES
When generating Mobile Frontend code, the AI Assistant MUST:
- Generate exactly ONE file per prompt.
- Output production-ready, strictly typed Expo-compatible code.
- Use NativeWind for all styling.
- NEVER generate inline styles, duplicate components, or placeholder implementations.
- NEVER invent business logic or bypass backend validation.