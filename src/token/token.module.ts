import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/User';
import { UsersModule } from 'src/users/users.module';
import { TokenService } from './token.service';

@Module({
  providers: [TokenService],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || 'SECRET',
      signOptions: {
        expiresIn: process.env.JWT_ACCESS_SECRET_EXPIRES || '15m',
      },
    }),
    TypeOrmModule.forFeature([User]),
    forwardRef(() => UsersModule),
  ],
  exports: [TokenService, TokenModule],
})
export class TokenModule {}
