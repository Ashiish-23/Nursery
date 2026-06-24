// Type definitions for authentication

export interface User {
  id: string;
  full_name: string;
  mobile_number: string;
  email?: string;
  role: string;
  account_status: string;
}

export type UserRole = "B2C_BUYER" | "B2B_BUYER" | "NURSERY_SELLER";

export interface RegisterRequest {
  full_name: string;
  mobile_number: string;
  email?: string;
  password: string;
  role: UserRole;
}

export interface LoginRequest {
  mobile_number: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  user: User;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

export interface FormFieldError {
  type: string;
  message: string;
}

export interface AuthUser {
  id: string;
  full_name: string;
  mobile_number: string;
  email?: string;
  role: string;
  account_status: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (
    user: AuthUser,
    token: string,
  ) => Promise<void>;

  logout: () => Promise<void>;

  restoreSession: () => Promise<void>;
}
