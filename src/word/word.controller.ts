import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Word } from 'src/entity/Word';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { WordService } from './word.service';

@Controller('word')
export class WordController {
  constructor(private wordsService: WordService) {}

  @Get('/:id')
  @ApiResponse({ status: 200, type: Word })
  getWordById(@Param('id') id: number) {
    return this.wordsService.getWordById(id);
  }

  @Post('/')
  @ApiResponse({ status: 201, type: Word })
  createWord(@Body() dto: CreateWordDto) {
    return this.wordsService.createWord(dto);
  }

  @Put('/:id')
  @ApiResponse({ status: 200, type: Word })
  editWord(@Param('id') id: number, @Body() dto: UpdateWordDto) {
    return this.wordsService.updateWord(id, dto);
  }
}
