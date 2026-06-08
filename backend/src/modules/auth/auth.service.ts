import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

/**
 * AuthService
 * 
 * Handles authentication logic
 * Manages user registration and login
 * Generates JWT tokens
 */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Register a new user
   */
  async register(registerDto: RegisterDto) {
    const { full_name, mobile_number, email, password, role } = registerDto;

    // Get role ID
    const roleData = await this.usersService.getRoleByName(role);

    // Create user
    const user = await this.usersService.createUser(
      full_name,
      mobile_number,
      email,
      password,
      roleData.id,
    );

    // Generate JWT token
    const access_token = this.jwtService.sign({
      sub: user.id,
      mobile_number: user.mobile_number,
      role: roleData.role_name,
    });

    return {
      access_token,
      user: {
        id: user.id,
        full_name: user.full_name,
        mobile_number: user.mobile_number,
        email: user.email || undefined,
        role: roleData.role_name,
        account_status: user.account_status,
      },
    };
  }

  /**
   * Login user with mobile number and password
   */
  async login(loginDto: LoginDto) {
    const { mobile_number, password } = loginDto;

    // Find user by mobile number
    const user = await this.usersService.findByMobileNumber(mobile_number);

    if (!user) {
      throw new UnauthorizedException('Invalid mobile number or password');
    }

    // Verify password
    const isPasswordValid = await this.usersService.verifyPassword(
      password,
      user.password_hash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid mobile number or password');
    }

    // Generate JWT token
    const access_token = this.jwtService.sign({
      sub: user.id,
      mobile_number: user.mobile_number,
      role: user.roles.role_name,
    });

    return {
      access_token,
      user: {
        id: user.id,
        full_name: user.full_name,
        mobile_number: user.mobile_number,
        email: user.email || undefined,
        role: user.roles.role_name,
        account_status: user.account_status,
      },
    };
  }

  /**
   * Validate JWT token and get user
   */
  async validateToken(payload: any) {
    return this.usersService.findById(payload.sub);
  }
}
