import { ApiProperty } from '@nestjs/swagger';
import { DataType } from 'sequelize-typescript';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AppEntity } from './AppEntity';

@Entity()
export class User extends AppEntity {
  @PrimaryGeneratedColumn({ type: 'number' })
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ unique: true, nullable: false })
  phone: string;

  @Column({})
  avatar: string;

  @Column({})
  username: string;

  @Column({})
  name: string;

  @Column({})
  lastname: string;

  @Column({})
  dob: Date;

  @Column({})
  nativeLang: string;

  @Column({})
  learningLang: string;

  @Column({})
  location: string;

  @Column({ default: '', nullable: false })
  refreshToken: string;

  @Column({ type: 'boolean' })
  confirmed: boolean;

  @Column({})
  confirmed_hash: string;
}
