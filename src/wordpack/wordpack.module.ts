import { Module } from '@nestjs/common';
import { WordpackService } from './wordpack.service';

@Module({
  providers: [WordpackService]
})
export class WordpackModule {}
