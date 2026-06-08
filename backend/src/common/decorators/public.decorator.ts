import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Public Decorator
 * 
 * Marks a route as public (no authentication required)
 * Should be used with JwtAuthGuard
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
