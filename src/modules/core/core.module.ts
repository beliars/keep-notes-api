import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';

const SERVICES = [
  AuthService,
  UsersService,
];

@Global()
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-rest', {
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

export class CoreModule {
}
