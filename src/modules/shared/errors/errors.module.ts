import { Global, Module } from '@nestjs/common';

import { ErrorsService } from './errors.service';

@Global()
@Module({
  components: [
    ErrorsService,
  ],
  exports: [
    ErrorsService,
  ],
})

export class ErrorsModule {
}