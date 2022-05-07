import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/User';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({ id });
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
}
