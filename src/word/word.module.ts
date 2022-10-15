import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from 'src/entity/Word';
import { ListModule } from 'src/list/list.module';
import { forwardRef } from '@nestjs/common/utils';
@Module({
  providers: [WordService],
  controllers: [WordController],
  imports: [TypeOrmModule.forFeature([Word]), ListModule],
  exports: [WordService, WordModule],
})
export class WordModule {}
