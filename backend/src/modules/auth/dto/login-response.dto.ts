import type { UserRole } from '../../identity/enums/identity.enums';
/**
 * LoginResponseDto
 * Response DTO for login and registration
 * Contains JWT token and user information
 */
export class LoginResponseDto {
  access_token!: string;
  user!: {
    id: string;
    full_name: string;
    mobile_number: string;
    email?: string;
    role: UserRole;
    account_status: string;
  };
}
