import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AppEntity } from './AppEntity';
import { List } from './List';

@Entity()
export class User extends AppEntity {
  @PrimaryGeneratedColumn({ type: 'number' })
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  dob: Date;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  nativeLang: string;

  @Column({ nullable: true })
  learningLang: string;

  @Column({ nullable: true })
  location: string;

  @Column({ default: '', nullable: false })
  refreshToken: string;

  @Column({ type: 'boolean', nullable: true })
  confirmed: boolean;

  @Column({ nullable: true })
  confirmed_hash: string;

  @Column({ nullable: true })
  theme: string;

  @Column({ nullable: true })
  accentColor: string;

  @Column({ nullable: true })
  textSize: string;

  @Column({ nullable: true })
  textColor: string;

  @OneToMany(() => List, (list) => list.userId)
  lists: List[];
}
