import { Global, Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { AuthMiddleware } from './middlewares/auth.middleware';

const SERVICES = [
  AuthService,
  UsersService,
];

@Global()
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/keep-notes', {
      useCreateIndex: true,
      useNewUrlParser: true,
    }),
    SharedModule,
  ],
  providers: [
    ...SERVICES,
  ],
  exports: [
    ...SERVICES,
  ],
})

export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .forRoutes(
      {path: '*', method: RequestMethod.ALL},
    );
  }
}
