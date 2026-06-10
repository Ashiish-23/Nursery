import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { CoreModule } from '../../core/core.module';

/**
 * Auth Module
 * Handles authentication and authorization:
 * - JWT-based authentication
 * - Login/Registration
 * - Role-based access control
 * - Auth guards and decorators
 * Dependencies: Common, Core, Users
 * Dependents: All other modules
 */
@Module({
  imports: [CoreModule, PassportModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
