import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';



@Module({
  imports: [
    CoreModule,
    SharedModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
