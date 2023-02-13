import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from 'src/entity/List';
import { Word } from 'src/entity/Word';
import { ListService } from 'src/list/list.service';
import { getRepository, Repository } from 'typeorm';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word) private wordsRepository: Repository<Word>,
    private listService: ListService,
  ) {}

  async getWordById(id: number) {
    return await this.wordsRepository.findOne({ id });
  }

  async getWordsByListId(id: number) {
    return await this.wordsRepository.find({
      where: { listId: id },
    });
  }

  async createWord(dto: CreateWordDto, listId: number) {
    const word = this.wordsRepository.create({ ...dto, listId });
    await getRepository(Word).save(word);

    return word;
  }

  async updateWord(id: number, dto: UpdateWordDto) {
    const word = await this.getWordById(id);

    if (!word) {
      throw new HttpException('Word not found', 404);
    }

    return await this.wordsRepository.save({ id, ...dto });
  }
}
