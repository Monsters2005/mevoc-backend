import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Wordpack } from 'src/entity/Wordpack';
import { WordpackService } from './wordpack.service';

@Controller('wordpack')
export class WordpackController {
  constructor(private wordpackService: WordpackService) {}

  @ApiResponse({ status: 200, type: [Wordpack] })
  @Get('/:id')
  getAll(@Param('id') userId: number) {
    return this.wordpackService.getAllWordpacks(userId);
  }

  @ApiResponse({ status: 200, type: Wordpack })
  @Get('/:userId/:id')
  getOne(@Param('userId') userId: number, @Param('id') id: number) {
    return this.wordpackService.getWordpackById(userId, id);
  }
}
