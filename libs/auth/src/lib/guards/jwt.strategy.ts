import { UserRole } from '@my-monorepo/data';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'qwerty123', // replace with env variable in production
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      username: payload.username,
      role: payload.role as UserRole,
      permissions: payload.permissions ?? [],
      organizationId: payload.organizationId ?? null,
    };
  }
}
