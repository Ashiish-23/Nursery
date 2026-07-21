export interface AuthUser {
  id: string;
  full_name: string;
  mobile_number: string;
  email?: string;
  role: UserRole;
  account_status: string;
}

export interface LoginRequest {
  mobile_number: string;
  password: string;
}
export interface RegisterRequest {
  full_name: string;
  mobile_number: string;
  email?: string;
  password: string;
  role: UserRole;
}

// Define possible user roles used across the app
// Use string literal union instead of enum to be compatible with
// "erasableSyntaxOnly" settings which disallow emitted enums.
export type UserRole = 'ADMIN' | 'USER' | 'SELLER' | 'B2C_BUYER' | 'B2B_BUYER' | 'NURSERY_SELLER';

export const UserRole = {
  ADMIN: 'ADMIN' as UserRole,
  USER: 'USER' as UserRole,
  SELLER: 'SELLER' as UserRole,
} as const;

export interface AuthResponse {
  access_token: string;
  user: AuthUser;
}
export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;

  login(data: LoginRequest): Promise<void>;
  register(data: RegisterRequest): Promise<void>;
  logout(): void;
  refreshUser(): Promise<void>;
}