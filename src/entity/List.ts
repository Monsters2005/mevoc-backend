import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AppEntity } from './AppEntity';
import { Word } from './Word';

@Entity()
export class List extends AppEntity {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Word, (word) => word.list)
  words: Word[];

  @Column({})
  progress: number;

  @Column({ nullable: false })
  learningLang: string;
}
