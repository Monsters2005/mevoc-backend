import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { TokenModule } from 'src/token/token.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MailService,
    forwardRef(() => UsersModule),
    forwardRef(() => TokenModule),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || 'SECRET',
      signOptions: {
        expiresIn: process.env.JWT_ACCESS_SECRET_EXPIRES || '15m',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, MailService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
