import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config/config';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongodbUri, {
      dbName: config.dbName,
    }),
    UsersModule,
    AuthModule
  ],
  controllers:  [],
  providers: [],
})
export class AppModule {}
