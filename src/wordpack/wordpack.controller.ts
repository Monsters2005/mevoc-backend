import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Wordpack } from 'src/entity/Wordpack';
import { WordpackService } from './wordpack.service';

@Controller('wordpack')
export class WordpackController {
  constructor(private wordpackService: WordpackService) {}

  @ApiResponse({ status: 200, type: [Wordpack] })
  @Get()
  getAll() {
    return this.wordpackService.getAllWordpacks();
  }
}
