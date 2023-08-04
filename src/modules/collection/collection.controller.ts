import { Controller, Get, Post, Param, Body, NotFoundException,ConflictException, InternalServerErrorException, Query, UseGuards } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('collection')
export class CollectionController {
  constructor(private collectionService: CollectionService) {}

  @Get(':id')
  async getCollectionById(@Param('id') id: string) {
    try {
      const collection = await this.collectionService.getCollectionById(id);
      return collection;
    } catch (error) {
      throw new NotFoundException('Coleção não encontrada');
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createCollection(@Body() collectionData: any) {
    const { name } = collectionData;
    const nameExists = await this.collectionService.checkIfCollectionNameExists(name);
    if (nameExists) {
      throw new ConflictException('Nome da coleção já existe');
    }
    return this.collectionService.create(collectionData);
  }

  @Post('sync')
  @UseGuards(AuthGuard('jwt'))
  async syncCollections() {
    await this.collectionService.syncCollections();
    return { message: 'Collections synced successfully.' };
  }

  @Get()
  async getCollections(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    try {
      const collections = await this.collectionService.getCollectionsByDate(
        startDate,
        endDate,
      );
      return collections;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao obter as coleções por data',
      );
    }
  }

  @Get()
  async getCollectionStatistics() {
    try {
      const averageFloorSale30 = await this.collectionService.getAverageFloorSale30Days();
      const minFloorSale30 = await this.collectionService.getMinFloorSale30Days();
      const maxFloorSale30 = await this.collectionService.getMaxFloorSale30Days();

      return {
        averageFloorSale30,
        minFloorSale30,
        maxFloorSale30 ,
      };
    } catch (error) {
      throw new InternalServerErrorException('Erro ao obter estatísticas das coleções');
    } 
  } 
}


