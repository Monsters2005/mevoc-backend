import { IsNotEmpty, Length } from 'class-validator';
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from 'src/constants/password-length';

export class RestorePasswordDto {
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, {
    message: `Password should be at least ${MIN_PASSWORD_LENGTH} characters long`,
  })
  @IsNotEmpty({ message: 'Should not be empty' })
  readonly password: string;

  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, {
    message: `Password should be at least ${MIN_PASSWORD_LENGTH} characters long`,
  })
  @IsNotEmpty({ message: 'Should not be empty' })
  readonly confirm_password: string;
}
