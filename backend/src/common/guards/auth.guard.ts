import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from '../services/security/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const publicDecorator = this.reflector.getAllAndMerge('public', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (publicDecorator.length) return true;

    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    if (!authorization) throw new UnauthorizedException();

    const user = await this.tokenService.verify(authorization);

    if (!user.isConfirmed)
      throw new UnauthorizedException('Confirm you email first');

    request.user = user;
    return true;
  }
}
