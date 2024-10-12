import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { error } from 'console';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('login')
  @ApiBody({
    description: 'User login credentials',
    type: CreateUserDto, // Define a DTO for the request body
  })
  // @ApiResponse({ status: 200, description: 'Login successful' })
  // @ApiResponse({ status: 404, description: 'User not found' })
  // @ApiResponse({ status: 401, description: 'Invalid password' })
  async login(@Body() loginDto: CreateUserDto) {
    const { email, password } = loginDto;
    const result = await this.userService.login(email, password);
    if (!result) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
    return result;
  }
}
