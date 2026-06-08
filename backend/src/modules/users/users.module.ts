import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CoreModule } from '../../core/core.module';

/**
 * Users Module
 * 
 * Handles user management:
 * - User profiles
 * - Role assignments
 * - User preferences
 * 
 * Dependencies: Auth
 * Dependents: Products, Orders, RFQ, Wishlist, Cart
 */
@Module({
  imports: [CoreModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
