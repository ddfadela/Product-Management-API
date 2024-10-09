import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config/config';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongodbUri, {
      dbName: config.dbName,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    CategoriesModule
  ],
  controllers:  [],
  providers: [],
})
export class AppModule {}
