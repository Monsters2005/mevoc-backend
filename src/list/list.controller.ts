import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { List } from 'src/entity/List';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListService } from './list.service';

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @Get('/:userId')
  @ApiResponse({ status: 200, type: [List] })
  getListsById(@Param('userId') userId: number) {
    return this.listService.getListsByUserId(userId);
  }

  @Get('/:listId')
  @ApiResponse({ status: 200, type: List })
  getListById(@Param('listId') listId: number) {
    return this.listService.getListById(listId);
  }

  @Post('/')
  @ApiResponse({ status: 200, type: List })
  createList(@Body() dto: CreateListDto) {
    return this.listService.createList(dto);
  }

  @Put('/:id')
  @ApiResponse({ status: 201, type: List })
  updateList(@Body() dto: UpdateListDto, @Param('id') id: number) {
    return this.listService.updateList(id, dto);
  }

  @Delete('/:id')
  @ApiResponse({ status: 200 })
  deleteList(@Param() id: number) {
    return this.listService.deleteList(id);
  }
}
