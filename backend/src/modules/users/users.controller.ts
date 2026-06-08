import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

/**
 * UsersController
 * Handles user-related endpoints
 * Provides endpoints for retrieving user information
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('roles/all')
  async getAllRoles() {
    return this.usersService.getAllRoles();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.findById(id);

    if (!user) {
      return { message: 'User not found' };
    }

    return {
      id: user.id,
      full_name: user.full_name,
      mobile_number: user.mobile_number,
      email: user.email,
      role_id: user.role_id,
      account_status: user.account_status,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
