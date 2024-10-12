import { Body, Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { PrismaService } from 'prisma/prims.service';

@Injectable()
export class FoodService {

  constructor(
    private prismaService: PrismaService
  ) {}

  async create(createFoodDto: CreateFoodDto) {
    await this.prismaService.food.create({
      data: createFoodDto
    })
    return 'This action adds a new food';
  }

  async findAll() {
    return await this.prismaService.food.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.food.findFirst({
      where: {
        id
      }
    });
  }

  async update(id: number, updateFoodDto: UpdateFoodDto) {
    await this.prismaService.food.update({
      data: updateFoodDto,
      where: {
        id
      }
    })
    return `This action updates a #${id} food`;
  }

  async remove(id: number) {
    await this.prismaService.food.delete({
      where:{id}
    })
    return `This action removes a #${id} food`;
  }


  async search(keyword){

    const result = await this.prismaService.food.findMany({
      where: {
        OR: [
          { name: { contains: keyword, mode: 'insensitive' } },
          { description: { contains: keyword, mode: 'insensitive' } },
        ],
      },
    })

    return result
  }  
}
