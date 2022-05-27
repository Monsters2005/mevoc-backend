import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wordpack } from 'src/entity/Wordpack';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class WordpackService {
  constructor(
    @InjectRepository(Wordpack)
    private wordpackRepository: Repository<Wordpack>,
    private readonly userService: UsersService,
  ) {}

  async getAllWordpacks(): Promise<Wordpack[]> {
    //get current user
    //get user's learning language
    //depending on language return corresponding wordpacks
    return this.wordpackRepository.find();
  }

  async getWordpackById(id: number): Promise<Wordpack> {
    return this.wordpackRepository.findOne(id);
  }
}
