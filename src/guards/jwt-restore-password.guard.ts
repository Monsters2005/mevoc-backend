import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request, AuthHeader } from 'src/auth/auth.header';
import { UNAUTHORIZED_ERROR_MESSAGE } from 'src/constants/error-messages';

@Injectable()
export class JwtRestorePasswordGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      return this.validateRequest(request);
    } catch (err) {
      throw new UnauthorizedException({
        message: UNAUTHORIZED_ERROR_MESSAGE,
        statusCode: 401,
      });
    }
  }

  validateRequest(request: Request) {
    const authHeader = new AuthHeader(request);
    const token = authHeader.getValidToken();

    if (!token) {
      throw new UnauthorizedException({
        message: UNAUTHORIZED_ERROR_MESSAGE,
        statusCode: 401,
      });
    }

    const user = this.jwtService.verify(token, {
      secret: process.env.JWT_RESTORE_SECRET,
    });

    request.user = user;

    return true;
  }
}
