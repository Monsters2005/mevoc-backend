import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  // @Get()
  // getOne() {
  //   return this.usersService.findOne();
  // }

  // @Post()
  // create() {
  //   return this.usersService.create();
  // }

  // @Put()
  // update() {
  //   return this.usersService.update();
  // }

  // @Delete()
  // delete() {
  //   return this.usersService.delete();
  // }
}
