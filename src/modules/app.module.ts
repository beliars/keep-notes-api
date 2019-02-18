import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorsInterceptor } from './core/interceptors/errors.interceptor';



@Module({
  imports: [
    CoreModule,
    SharedModule,
    AuthModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule {}
