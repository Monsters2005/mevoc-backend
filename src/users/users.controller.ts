import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestUser } from 'src/auth/auth.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/entity/User';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
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

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getCurrent(@GetUser() user: RequestUser) {
    return this.usersService.findOne(user.id);
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
