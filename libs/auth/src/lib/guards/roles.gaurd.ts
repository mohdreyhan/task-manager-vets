import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '@my-monorepo/data';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Step 1: Read the roles set by @Roles() decorator
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [
        context.getHandler(), // method
        context.getClass(), // controller
      ]
    );

    if (!requiredRoles) return true; // If no roles required, allow access

    // Step 2: Get the user from the request (injected by JwtStrategy)
    const { user } = context.switchToHttp().getRequest();

    // Step 3: Check if user's role is allowed
    return requiredRoles.includes(user.role);
  }
}
