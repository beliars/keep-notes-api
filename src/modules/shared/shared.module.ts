import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from '../core/schemas/user.schema';
import { ErrorsModule } from './errors/errors.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'User', schema: UserSchema},
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
