import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from 'src/entity/List';
import { Repository } from 'typeorm';
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

  async getListById(id: number): Promise<List> {
    return await this.listRepository.findOne({ id });
  }

  async createList(dto: CreateListDto): Promise<List> {
    return this.listRepository.create(dto);
  }

  async updateList(id: number, dto: UpdateListDto): Promise<List> {
    const list = await this.getListById(id);

    if (!list) {
      throw new HttpException('List not found', 404);
    }

    return this.listRepository.save({ id, ...dto });
  }

  async deleteList(id: number): Promise<void> {
    await this.listRepository.softDelete(id);
  }
}
