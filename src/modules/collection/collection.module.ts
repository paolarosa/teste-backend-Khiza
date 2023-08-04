import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { ReservoirApiService } from '../../reservoir-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionEntity } from './entities/collection.entity';
import { CollectionController } from './collection.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([CollectionEntity]),
    ConfigModule.forRoot(),
  ],
  providers: [CollectionService, ReservoirApiService],
  controllers: [CollectionController],
})
export class CollectionModule {}
