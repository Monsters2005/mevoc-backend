import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entity/User';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiResponse({ status: 200, type: [User] })
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: User })
  getOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 201, type: User })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: User })
  update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
