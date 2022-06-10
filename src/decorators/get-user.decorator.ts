import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestUser } from 'src/auth/auth.service';

export const GetUser = createParamDecorator(
  (_, ctx: ExecutionContext): RequestUser => {
    const req = ctx.switchToHttp().getRequest();

    return req.user;
  },
);
