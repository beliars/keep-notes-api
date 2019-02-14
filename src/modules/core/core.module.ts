import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../auth/auth.service';

const SERVICES = [
  AuthService,
];

@Global()
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-rest'),
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
