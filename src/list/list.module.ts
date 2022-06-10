import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from 'src/entity/List';
import { ListController } from './list.controller';
import { ListService } from './list.service';

@Module({
  imports: [TypeOrmModule.forFeature([List])],
  providers: [ListService],
  controllers: [ListController],
  exports: [ListService],
})
export class ListModule {}
