import { IsNotEmpty, IsString } from 'class-validator';
import { Word } from 'src/entity/Word';

export class CreateListDto {
  // @IsNotEmpty({ message: 'Should not be empty' })
  // readonly id: number;

  @IsNotEmpty({ message: 'Should not be empty' })
  @IsString({ message: 'Should be a string' })
  readonly name: string;

  readonly words: Word[] | null;

  @IsNotEmpty({ message: 'Should not be empty' })
  readonly progress: number;

  @IsNotEmpty({ message: 'Should not be empty' })
  readonly userId: number;
}
