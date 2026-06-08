import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './database/prisma.service';
import { ConfigService } from './config/config.service';

/**
 * Core Module
 * 
 * Provides core infrastructure:
 * - Prisma database client
 * - Configuration management
 * - Environment validation
 * - JWT configuration
 * 
 * This module should be imported globally in AppModule
 */
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      signOptions: { 
        expiresIn: parseInt(process.env.JWT_EXPIRES_IN || '86400') 
      },
    }),
  ],
  providers: [PrismaService, ConfigService],
  exports: [PrismaService, ConfigService, JwtModule],
})
export class CoreModule {}
