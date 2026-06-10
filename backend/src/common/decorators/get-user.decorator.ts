import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * GetUser Decorator
 *
 * Extracts user from the request context
 * Can be used in route handlers: @GetUser() user: any
 */
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
