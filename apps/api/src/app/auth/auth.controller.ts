import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service'; // adjust import if needed
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService
  ) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.usersService.findByUsername(body.username);

    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user);
  }
}
