import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollectionModule } from './modules/collection/collection.module';
import { ReservoirApiService } from './reservoir-api.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionEntity } from './modules/collection/entities/collection.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CollectionModule,
    UserModule,
    AuthModule, 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [CollectionEntity, User],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ReservoirApiService],
})
export class AppModule {}
