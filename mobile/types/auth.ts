// Type definitions for authentication

export interface User {
  id: string;
  email?: string;
  mobileNumber: string;
  fullName: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export type UserRole = "B2C_BUYER" | "B2B_BUYER" | "NURSERY_SELLER";

export interface RegisterRequest {
  fullName: string;
  mobileNumber: string;
  email?: string;
  password: string;
  role: UserRole;
}

export interface LoginRequest {
  mobileNumber: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
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
