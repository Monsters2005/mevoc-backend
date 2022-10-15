import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { AppEntity } from './AppEntity';
import { User } from './User';
import { Word } from './Word';

@Entity()
export class List extends AppEntity {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Word, (word) => word.listId)
  words: Word[];

  @Column({ nullable: true })
  progress: number;

  @Column({ nullable: false })
  learningLang: string;

  @ManyToOne(() => User, (user) => user.lists)
  userId: number;
}
