import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from 'src/entity/List';
import { Wordpack } from 'src/entity/Wordpack';
import { CreateListDto } from 'src/list/dto/create-list.dto';
import { ListService } from 'src/list/list.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class WordpackService {
  constructor(
    @InjectRepository(Wordpack)
    private wordpackRepository: Repository<Wordpack>,
    private userService: UsersService,
    private listService: ListService,
  ) {}

  async getAllWordpacks(id: number): Promise<Wordpack[]> {
    const lang = await this.getUserLearnLang(id);
    return this.wordpackRepository[lang].find();
  }

  async getWordpackById(userId: number, id: number): Promise<Wordpack> {
    const lang = await this.getUserLearnLang(userId);

    return this.wordpackRepository[lang].findOne(id);
  }

  async getUserLearnLang(id: number) {
    const user = await this.userService.findOne(id);

    return user.learningLang;
  }

  private async transformToList(wordpack: Wordpack) {
    const newWordpack = JSON.parse(JSON.stringify(wordpack));

    const formatWords = wordpack.words.map((el, i) => {
      el['dateLearned'] = null;
      el['id'] = i++;
      el['list'] = wordpack.id;
    });

    const listModel: CreateListDto = {
      name: newWordpack.name,
      words: newWordpack.words,
      progress: 0,
    };

    const list = await this.listService.createList(listModel);
  }

  async addWordpack(userId: number, id: number) {
    const user = await this.userService.findOne(userId);
    const wordpack = await this.getWordpackById(userId, id);
    const newList = this.transformToList(wordpack);
  }
}
