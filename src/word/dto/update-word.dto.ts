import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateWordDto {
  @IsNotEmpty({ message: 'Should not be empty' })
  readonly id: number;

  @IsNotEmpty({ message: 'Should not be empty' })
  @IsString({ message: 'Should be a string' })
  readonly wordNative: string;

  @IsNotEmpty({ message: 'Should not be empty' })
  @IsString({ message: 'Should be a string' })
  readonly wordLearning: string;

  @IsNotEmpty({ message: 'Should not be empty' })
  readonly dateLearned: string | null;
}
