import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AppEntity } from './AppEntity';

type WordpackWord = {
  wordLearning: string;
  wordNative: string;
};

@Entity()
export class Wordpack extends AppEntity {
  @PrimaryGeneratedColumn({ type: 'number' })
  id: number;

  @Column({ type: 'string', nullable: false })
  name: string;

  @Column({ type: 'array', nullable: false })
  words: WordpackWord[];

  @Column({ type: 'string', nullable: false })
  icon: string;
}
