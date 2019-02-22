import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ErrorsModule } from './errors/errors.module';

import { UserSchema } from '../core/schemas/user.schema';
import { TokenSchema } from '../core/schemas/token.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'User', schema: UserSchema},
      {name: 'Token', schema: TokenSchema},
    ]),
    ErrorsModule,
  ],
  providers: [
  ],
  exports: [
    MongooseModule,
    ErrorsModule,
  ],
})

export class SharedModule {
}
