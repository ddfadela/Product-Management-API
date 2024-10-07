import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config/config';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongodbUri, {
      dbName: config.dbName,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
