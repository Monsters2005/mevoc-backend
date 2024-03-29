import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from 'src/constants/password-length';

export class SignInUserDto {
  @IsNotEmpty({ message: 'Should not be empty' })
  @IsEmail({}, { message: 'Not valid email' })
  readonly email: string;

  @IsNotEmpty({ message: 'Should not be empty' })
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, {
    message: `Password should be at least ${MIN_PASSWORD_LENGTH} characters long`,
  })
  readonly password: string;

  readonly token?: string;
}
