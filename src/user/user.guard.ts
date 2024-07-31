import {
  Injectable,
  CanActivate,
  ExecutionContext,
  mixin,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private role: string[],
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = this.role.includes(user?.role);
    if (!hasRole) {
      if (user) {
        throw new HttpException(
          { message: 'Unauthorized user role' },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return hasRole;
  }
}

export function RolesGuardFactory(role: string[]): any {
  @Injectable()
  class RoleGuard extends RolesGuard {
    constructor(reflector: Reflector) {
      super(role, reflector);
    }
  }

  return mixin(RoleGuard);
}
