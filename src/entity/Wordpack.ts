import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AppEntity } from './AppEntity';
import { Word } from './Word';

@Entity()
export class Wordpack extends AppEntity {
  @PrimaryGeneratedColumn({ type: 'number' })
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Word, (word) => word.wordpack)
  words: Word[];

  @Column({ nullable: false })
  icon: string;
}
