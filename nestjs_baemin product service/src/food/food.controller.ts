import { Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodService.create(createFoodDto);
  }


  //get all
  @MessagePattern("GET-ALL-FOOD/PRODUCT")
  findAll() {
    return this.foodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodService.update(+id, updateFoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodService.remove(+id);
  }


  //fix thanh messagepattern (fix het luon ae)
  @MessagePattern("SEARCH-FOOD/PRODUCT")
  async search(@Payload() keyword) {
    const result = await this.foodService.search(keyword)
    if (result.length == 0) {
      return { message: 'No result found' };
    } else {
      return result;
    }
  }
  
}
