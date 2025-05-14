import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities';
import { UserRole } from '@my-monorepo/data';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(user: User): Promise<{ access_token: string; user_id: string }> {
    // Prevent login for non-admins without an organization
    if (user.role !== UserRole.Admin && !user.organizationId) {
      throw new UnauthorizedException('User must belong to an organization');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      permissions: user.permissions, // Optional array or enum list
      organizationId: user.organizationId || null,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user_id: user.id,
    };
  }
}
