import { Body, Injectable, HttpException, HttpStatus  } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService
  ) {}


  async create(createUserDto: CreateUserDto) {
    await this.prismaService.users.create({
      data: createUserDto,
    })
    return 'This action adds a new user';
  }

  async findAll() {

    return await this.prismaService.users.findMany();
  }

  
  async findOne(id: number) {
    return await this.prismaService.users.findUnique({ where: { id } });
    
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.prismaService.food.update({
      data: updateUserDto,
      where: {
        id
      }
    })
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    await this.prismaService.users.delete({
      where:{id}
    })
    return `This action removes a #${id} user`;
  }


  async login(@Body() email, @Body() password){
    const findUser = await this.prismaService.users.findFirst({
      where:{email: email}
    })

    if (!findUser){
      return {message: 'User not found', status: 404}
    } else {
        const passwordCheck = findUser.password
        if (passwordCheck === password){

          const token = await this.jwtService.signAsync(
            { userId: findUser.id },
            { expiresIn: "15m", secret: "BAI_MAT" }
          );
          
          return {message: 'Login successful', status: 200, token}
        } else {
          throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
        }
    }
  }


  



  
}
