import { ApiProperty } from '@nestjs/swagger';
import { DataType } from 'sequelize-typescript';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AppEntity } from './AppEntity';

@Entity()
export class User extends AppEntity {
  @PrimaryGeneratedColumn({ type: 'number' })
  id: number;

  @Column({ type: 'string', unique: true, nullable: false })
  email: string;

  @Column({ type: 'string', nullable: false })
  password: string;

  @Column({ type: 'string', unique: true, nullable: false })
  phone: string;

  @Column({ type: 'string' })
  avatar: string;

  @Column({ type: 'string' })
  username: string;

  @Column({ type: 'string' })
  name: string;

  @Column({ type: 'string' })
  lastname: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column({ type: 'string' })
  nativeLang: string;

  @Column({ type: 'string' })
  learningLang: string;

  @Column({ type: 'string' })
  location: string;

  @Column({ type: 'string', default: '', nullable: false })
  refreshToken: string;

  @Column({ type: 'boolean' })
  confirmed: boolean;

  @Column({ type: 'string' })
  confirmed_hash: string;
}
