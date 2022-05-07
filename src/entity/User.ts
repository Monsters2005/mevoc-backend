import { Entity, Column } from 'typeorm';
import { AppEntity } from './AppEntity';

@Entity()
export class User extends AppEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  avatar: string;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  dob: Date;

  @Column()
  nativeLang: string;

  @Column()
  learningLang: string;

  @Column()
  location: string;
}
