import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthHeader, Request } from 'src/auth/auth.header';
import { AuthService, RequestUser } from 'src/auth/auth.service';
import { UNAUTHORIZED_ERROR_MESSAGE } from 'src/constants/error-messages';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = new AuthHeader(request);
    const token = authHeader.getValidToken();

    if (!token) {
      throw new UnauthorizedException({
        message: UNAUTHORIZED_ERROR_MESSAGE,
        statusCode: 401,
      });
    }

    request.user = this.jwtService.decode(token) as RequestUser;

    const result = await AuthService.checkToken(token);

    if (!result) {
      return false;
    }

    return result;
  }
}
