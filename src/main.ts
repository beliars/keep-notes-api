import { NestFactory } from '@nestjs/core';

import * as dotenv from 'dotenv';

import { AppModule } from './modules/app.module';

dotenv.load({path: '.env'});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
