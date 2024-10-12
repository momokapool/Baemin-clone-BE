import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { JwtModule } from '@nestjs/jwt';
// import { UserModule } from './user/user.module';
import { FoodModule } from './food/food.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), FoodModule,
    
    JwtModule.register({
      global: true
    }),
    //UserModule,
    FoodModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
