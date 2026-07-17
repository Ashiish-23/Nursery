export interface AuthUser {
  id: string;
  full_name: string;
  mobile_number: string;
  email?: string;
  role: string;
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
  role: string;
}

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