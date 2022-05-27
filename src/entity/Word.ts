
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AppEntity } from './AppEntity';
import { List } from './List';


@Entity()
export class Word extends AppEntity {
  @PrimaryGeneratedColumn({ type: 'number' })
  id: number;

  @Column({ type: 'string', nullable: false })
  wordNative: string;

  @Column({ type: 'string', nullable: false })
  wordLearning: string;

  @Column({ type: 'string' })
  dateLearned: null | string;

  @ManyToOne(() => List, (list) => list.words)
  list: List;

}
