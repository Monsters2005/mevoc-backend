import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entity/User';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  private logger = new Logger(UsersService.name);

  async createUser(dto: CreateUserDto) {
    const user = this.userRepository.create(dto);
    await getRepository(User).save(user);

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }

  async update(id: number, dto: Partial<User>): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return await this.userRepository.save({ id, ...dto });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.softDelete(id);
  }

  async getUserByConfirmedHash(confirmedHash: string) {
    const user = await this.userRepository.findOne({
      where: { confirmed_hash: confirmedHash },
    });

    if (!user) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
