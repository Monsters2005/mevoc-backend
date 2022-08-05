import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
  providers: [MailService],
  exports: [MailService, MailModule],
  imports: [AuthService],
  controllers: [MailController],
})
export class MailModule {}
