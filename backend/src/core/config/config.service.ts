import { Injectable } from '@nestjs/common';

/**
 * ConfigService
 *
 * Handles environment-based configuration
 * Provides typed access to configuration values
 */
@Injectable()
export class ConfigService {
  getJwtSecret(): string {
    return process.env.JWT_SECRET || 'your-secret-key-change-in-production';
  }

  getJwtExpiresIn(): string {
    return process.env.JWT_EXPIRES_IN || '86400'; // 24 hours in seconds
  }

  getDatabaseUrl(): string {
    return process.env.DATABASE_URL || '';
  }

  getPort(): number {
    return parseInt(process.env.PORT || '3000', 10);
  }

  getEnvironment(): string {
    return process.env.NODE_ENV || 'development';
  }
}
