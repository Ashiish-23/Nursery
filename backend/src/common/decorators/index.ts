/**
 * Common Decorators
 * 
 * Shared decorators for cross-cutting concerns:
 * - @Roles(): Define required roles for endpoints
 * - @Public(): Mark endpoints that don't require authentication
 * - @GetUser(): Extract user from request context
 */

export { GetUser } from './get-user.decorator';
export { Public } from './public.decorator';

