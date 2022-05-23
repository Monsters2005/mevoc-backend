import { Length } from 'class-validator';
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from 'src/constants/password-length';

export class ChangePasswordDto {
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, {
    message: `Password should be at least ${MIN_PASSWORD_LENGTH} characters long`,
  })
  readonly current_password: string;

  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, {
    message: `Password should be at least ${MIN_PASSWORD_LENGTH} characters long`,
  })
  readonly password: string;

  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, {
    message: `Password should be at least ${MIN_PASSWORD_LENGTH} characters long`,
  })
  readonly confirm_password: string;
}
