import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from 'src/entity/List';
import { User } from 'src/entity/User';
import { getRepository, Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List) private listRepository: Repository<List>,
  ) {}

  async getAllLists(): Promise<List[]> {
    return await this.listRepository.find();
  }

  getListsByUserId(userId: number) {
    return this.listRepository.find({
      where: {
        userId,
      },
      relations: ['words'],
    });
  }

  async getListById(id: number): Promise<List> {
    return await this.listRepository.findOne({ userId: id });
  }

  async createList(dto: CreateListDto): Promise<List> {
    const list = this.listRepository.create(dto);
    const user = await getRepository(User).find({
      where: {
        id: dto.userId,
      },
    });

    await getRepository(List).save({ user: user, ...list });
    //  await dataSource
    //    .createQueryBuilder()
    //    .update(User)
    //    .set({ firstName: 'Timber', lastName: 'Saw' })
    //    .where('id = :id', { id: 1 })
    //    .execute();

    return list;
  }

  async updateList(id: number, dto: Partial<UpdateListDto>): Promise<List> {
    const list = await this.getListById(id);
    console.log('here', list);

    if (!list) {
      throw new HttpException('List not found', 404);
    }

    return this.listRepository.save({ id, ...dto });
  }

  async deleteList(id: number): Promise<void> {
    await this.listRepository.softDelete(id);
  }
}
