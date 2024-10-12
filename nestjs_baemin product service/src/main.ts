import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:1234@localhost:5672'],
      queue: 'food_queue',
      queueOptions: {
        durable: false
      }

    }
  });

  await app.listen(/*8079*/);

  // app.enableCors()

  // SwaggerModule.setup("/swagger", app, SwaggerModule.createDocument(app, new DocumentBuilder().setTitle("NestJS bài tập").build()))

}
bootstrap();
