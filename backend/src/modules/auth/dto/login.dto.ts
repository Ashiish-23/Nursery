import { IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * LoginDto
 * Data Transfer Object for user login
 * Validates login request payload
 */
export class LoginDto {
  @IsNotEmpty({ message: 'Mobile number is required' })
  @IsString()
  mobile_number!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;
}
