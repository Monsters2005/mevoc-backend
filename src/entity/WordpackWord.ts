import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AppEntity } from './AppEntity';
import { List } from './List';
import { Wordpack } from './Wordpack';

@Entity()
export class WordpackWord extends AppEntity {
  @PrimaryGeneratedColumn({ type: 'number' })
  id: number;

  @Column({ nullable: false })
  wordNative: string;

  @Column({ nullable: false })
  wordLearning: string;
}
