import { Global, Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../auth/auth.service';

const SERVICES = [
  AuthService,
];

@Global()
@Module({
  imports: [
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
