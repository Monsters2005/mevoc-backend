import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { AuthHeader, Request } from 'src/auth/auth.header';
import { UNAUTHORIZED_ERROR_MESSAGE } from 'src/constants/error-messages';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      return this.validateRequest(request);
    } catch (e) {
      throw new UnauthorizedException({
        message: UNAUTHORIZED_ERROR_MESSAGE,
        statusCode: 401,
      });
    }
  }

  validateRequest(request: Request): boolean {
    const authHeader = new AuthHeader(request);
    const token = authHeader.getValidToken();

    if (!token) {
      throw new UnauthorizedException({
        message: UNAUTHORIZED_ERROR_MESSAGE,
        statusCode: 401,
      });
    }

    const user = this.jwtService.verify(token);

    request.user = user;

    return true;
  }
}
