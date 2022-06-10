import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AppEntity } from './AppEntity';
import { Word } from './Word';

@Entity()
export class List extends AppEntity {
  @PrimaryGeneratedColumn({ type: 'number' })
  id: number;

  @Column({ type: 'string', nullable: false })
  name: string;

  @OneToMany(() => Word, (word) => word.list)
  words: Word[];

  @Column({ type: 'number' })
  progress: number;

  @Column({ type: 'string', nullable: false })
  learningLang: string;
}
