import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wordpack } from 'src/entity/Wordpack';
import { ListModule } from 'src/list/list.module';
import { UsersModule } from 'src/users/users.module';
import { WordpackController } from './wordpack.controller';
import { WordpackService } from './wordpack.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wordpack]), UsersModule, ListModule],
  providers: [WordpackService],
  controllers: [WordpackController],
  exports: [WordpackService, WordpackModule],
})
export class WordpackModule {}
