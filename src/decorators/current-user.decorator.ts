import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/entity/User';
import { getRepository } from 'typeorm';

export const CurrentUser = createParamDecorator(
  async (data: any, ctx: ExecutionContext): Promise<User> => {
    const request = ctx.switchToHttp().getRequest();
    if (!request['user']) {
      console.log(
        'Current user can be accessed only from authenticated routes.',
      );
      return null;
    }

    return getRepository(User).findOne({
      where: {
        apiUserUuid: request['user'].uuid,
      },
    });
  },
);
