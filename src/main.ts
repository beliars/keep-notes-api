import { NestFactory } from '@nestjs/core';

import * as dotenv from 'dotenv';

import { AppModule } from './modules/app.module';
import { ErrorsInterceptor } from './modules/core/interceptors/errors.interceptor';
import { ErrorsService } from './modules/shared/errors/errors.service';

dotenv.load({path: '.env'});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
  app.useGlobalInterceptors(new ErrorsInterceptor(new ErrorsService()));
}
bootstrap();
