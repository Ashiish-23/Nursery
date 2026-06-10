import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import * as bcrypt from 'bcrypt';

/**
 * UsersService
 * Manages user-related database operations
 * Handles user creation, retrieval, and validation
 */
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new user
   * Hashes password using bcrypt
   */
  async createUser(
    full_name: string,
    mobile_number: string,
    email: string | undefined,
    password: string,
    roleId: string,
  ) {
    // Check if mobile number already exists
    const existingUser = await this.prisma.users.findUnique({
      where: { mobile_number },
    });

    if (existingUser) {
      throw new BadRequestException('Mobile number already registered');
    }

    // Check if email is provided and already exists
    if (email) {
      const existingEmail = await this.prisma.users.findUnique({
        where: { email },
      });

      if (existingEmail) {
        throw new BadRequestException('Email already registered');
      }
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.users.create({
      data: {
        full_name,
        mobile_number,
        email: email || null,
        password_hash,
        role_id: roleId,
        account_status: 'ACTIVE',
      },
      include: {
        roles: true,
      },
    });

    return user;
  }

  /**
   * Find user by mobile number
   */
  async findByMobileNumber(mobile_number: string) {
    const user = await this.prisma.users.findUnique({
      where: { mobile_number },
      include: {
        roles: true,
      },
    });

    return user;
  }

  /**
   * Find user by ID
   */
  async findById(id: string) {
    const user = await this.prisma.users.findUnique({
      where: { id },
      include: {
        roles: true,
      },
    });

    return user;
  }

  /**
   * Verify password
   */
  async verifyPassword(
    password: string,
    password_hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, password_hash);
  }

  /**
   * Get role by name
   */
  async getRoleByName(roleName: string) {
    const role = await this.prisma.roles.findUnique({
      where: { role_name: roleName },
    });

    if (!role) {
      throw new NotFoundException(`Role ${roleName} not found`);
    }

    return role;
  }

  /**
   * Get all roles
   */
  async getAllRoles() {
    return this.prisma.roles.findMany();
  }
}
