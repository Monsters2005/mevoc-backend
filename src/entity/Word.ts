import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AppEntity } from './AppEntity';

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
}
