import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '../../../core/config/config.service';
import { UsersService } from '../../users/users.service';
import { UserRole } from '../../identity/enums/identity.enums';

/**
 * JWT Payload
 * Current authentication payload.
 *
 * NOTE:
 * This payload will be extended later with:
 * - account_status
 * - onboarding_status
 * - token_version
 */
interface JwtPayload {
  sub: string;
  mobile_number: string;
  role: UserRole;
}

/**
 * JwtStrategy
 *
 * Validates incoming JWT access tokens and attaches the authenticated
 * user object to the request.
 *
 * This strategy only validates authentication.
 * Authorization and permission checks are handled separately.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getJwtSecret(),
    });
  }

  /**
   * Validates whether the account is allowed to access protected routes.
   */
  private validateAccountStatus(accountStatus: string): void {
    if (accountStatus !== 'ACTIVE') {
      throw new UnauthorizedException(
        'Your account is not active. Please contact support.',
      );
    }
  }

  /**
   * Validate JWT payload.
   *
   * Called automatically by Passport after the JWT signature
   * has been successfully verified.
   */
  async validate(payload: JwtPayload) {
    const user = await this.usersService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Invalid authentication token.');
    }

    // Ensure the account is still active.
    this.validateAccountStatus(user.account_status);

    return {
      id: user.id,
      full_name: user.full_name,
      mobile_number: user.mobile_number,
      email: user.email,
      role: user.roles.role_name,
      account_status: user.account_status,
    };
  }
}
