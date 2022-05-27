import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Word } from 'src/entity/Word';
import { Repository } from 'typeorm';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word) private wordsRepository: Repository<Word>,
  ) {}

  async getWordById(id: number) {
    return await this.wordsRepository.findOne({ id });
  }

  async createWord(dto: CreateWordDto) {
    return this.wordsRepository.create(dto);
  }

  async updateWord(id: number, dto: UpdateWordDto) {
    const word = await this.getWordById(id);

    if (!word) {
      throw new HttpException('Word not found', 404);
    }

    return await this.wordsRepository.save({ id, ...dto });
  }
}
