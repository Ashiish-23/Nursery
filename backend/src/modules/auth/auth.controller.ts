import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from '../../common/decorators/public.decorator';

/**
 * AuthController
 *
 * Handles authentication endpoints.
 *
 * Responsibilities:
 * - User registration
 * - User login
 * - Authentication health check
 * - Returning authenticated user information
 *
 * Business logic must remain inside AuthService.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Health Check
   *
   * Used to verify that the authentication service
   * is reachable.
   */
  @Public()
  @Get('ping')
  ping() {
    return {
      message: 'Auth service is up and running',
    };
  }

  /**
   * Register a new user.
   *
   * Returns:
   * - JWT Access Token
   * - Authenticated User
   */
  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Authenticate an existing user.
   *
   * Returns:
   * - JWT Access Token
   * - Authenticated User
   */
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * Returns the currently authenticated user.
   *
   * NOTE:
   * This endpoint will later evolve into
   * GET /auth/me
   * once the Identity & Session Context module
   * is fully implemented.
   */
  @Get('profile')
  getProfile(@Req() req: Request & { user: Record<string, unknown> }) {
    return req.user;
  }
}
