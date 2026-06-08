import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '../../../core/config/config.service';
import { UsersService } from '../../users/users.service';

/**
 * JwtStrategy
 * 
 * Passport strategy for JWT authentication
 * Validates and extracts JWT tokens from requests
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getJwtSecret(),
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      return null;
    }
    return { userId: payload.sub, mobileNumber: payload.mobile_number, role: payload.role };
  }
}
