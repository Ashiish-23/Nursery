import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

/**
 * RegisterDto
 * Data Transfer Object for user registration
 * Validates registration request payload
 */
export class RegisterDto {
  @IsNotEmpty({ message: 'Full name is required' })
  @IsString()
  full_name!: string;

  @IsNotEmpty({ message: 'Mobile number is required' })
  @IsString()
  mobile_number!: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;

  @IsNotEmpty({ message: 'Role is required' })
  @IsString()
  role!: 'B2C_BUYER' | 'B2B_BUYER' | 'NURSERY_SELLER';
}
