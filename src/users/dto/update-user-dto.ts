import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Should not be empty' })
  id: number;

  @IsNotEmpty({ message: 'Should not be empty' })
  @IsEmail({}, { message: 'Not valid email' })
  email: string;

  @IsNotEmpty({ message: 'Should not be empty' })
  @IsString({ message: 'Should be a string' })
  firstName: string;

  @IsNotEmpty({ message: 'Should not be empty' })
  @IsString({ message: 'Should be a string' })
  lastName: string;

  @IsNotEmpty({ message: 'Should not be empty' })
  @IsString({ message: 'Should be a string' })
  username: string;

  @IsString({ message: 'Should be a string' })
  avatar: string;

  @IsNotEmpty({ message: 'Should not be empty' })
  @IsString({ message: 'Should be a string' })
  dob: Date;

  @IsNotEmpty({ message: 'Should not be empty' })
  @IsString({ message: 'Should be a string' })
  location: string;

  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'Не должно быть пустым' })
  phoneNumber: string;

  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'Не должно быть пустым' })
  langLearning: string;

  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'Не должно быть пустым' })
  langNative: string;
}
