import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from 'src/entity/Word';

@Module({
  providers: [WordService],
  controllers: [WordController],
  imports: [TypeOrmModule.forFeature([Word])],
  exports: [WordService, WordModule],
})
export class WordModule {}
