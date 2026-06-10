import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../../../common/decorators/public.decorator';
import { Reflector } from '@nestjs/core';

/**
 * JwtAuthGuard
 * Guard to protect routes that require JWT authentication
 * Can be used with @UseGuards(JwtAuthGuard) decorator
 * Allows public routes marked with @Public() decorator
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
