import { Injectable } from '@nestjs/common';
import { transporter } from 'src/core/transporter';
import { getConfirmEmailTemplate } from './templates/confirm-email';
import { getRestorePasswordTemplate } from './templates/restore-password';

export interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}

@Injectable()
export class MailService {
  async sendEmail(
    options: EmailOptions,
    callback: (err: any, success: any) => void,
  ) {
    transporter.sendEmail(options, callback);
  }

  getConfirmationEmailOptions(email: string, confirmed_hash: string) {
    return {
      from: 'mevoc@gmail.com',
      to: email,
      subject: 'Email confirmation Mevowc',
      text: 'Confirm that fucking bullshit ',
      html: getConfirmEmailTemplate(confirmed_hash),
    };
  }

  getForgotPasswordEmailOptions(email: string, restoreToken: string) {
    return {
      from: 'mevoc@gmail.com',
      to: email,
      subject: 'Mevoc password reset',
      text: 'Some random shit that will be changed later',
      html: getRestorePasswordTemplate(restoreToken),
    };
  }

  emailCallback(err: any, success: any) {
    if (err) {
      throw err;
    }
  }
}
