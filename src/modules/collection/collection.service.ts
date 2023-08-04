import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservoirApiService } from '../../reservoir-api.service';
import { CollectionEntity } from '../collection/entities/collection.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';
import axios from 'axios';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(CollectionEntity)
    private collectionRepository: Repository<CollectionEntity>,
    private readonly reservoirApiService: ReservoirApiService,
  ) {}

  async getCollectionById(id: string): Promise<CollectionEntity> {
    try {
      const collection = await this.collectionRepository.findOne({ where: { id } });
      if (!collection) {
        throw new NotFoundException('Coleção não encontrada');
      }
      return collection;
    } catch (error) {
      throw new NotFoundException('Coleção não encontrada');
    }
  }

  async getCollectionsByDate(startDate?: string, endDate?: string) {
    const query = this.collectionRepository.createQueryBuilder('collection');

    if (startDate) {
      const startDateTime = new Date(startDate);
      query.andWhere('collection.createdAt >= :startDate', {
        startDate: startDateTime.toISOString(),
      });
    }

    if (endDate) {
      const endDateTime = new Date(endDate);
      endDateTime.setDate(endDateTime.getDate() + 1); 
      query.andWhere('collection.createdAt < :endDate', {
        endDate: endDateTime.toISOString(),
      });
    }

    return query.getMany();
  }

  async create(collectionData: CreateCollectionDto) {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    const collection = this.collectionRepository.create({
      ...collectionData,
      createdAt: formattedDate,
      floorSale1Day: collectionData.floorSale1Day || 0,
      floorSale7Days: collectionData.floorSale7Days || 0,
      floorSale30Days: collectionData.floorSale30Days || 0,
      floorSaleChange1Day: collectionData.floorSaleChange1Day || 0,
      floorSaleChange7Days: collectionData.floorSaleChange7Days || 0,
    });

    return await this.collectionRepository.save(collection);
  }

  async checkIfCollectionNameExists(name: string): Promise<boolean> {
    const collection = await this.collectionRepository.findOne({ where: { name } });
    return !!collection;
  }

  async syncCollections() {
    try {
      const collections = await this.collectionRepository.find();

      for (const collection of collections) {
        const collectionData = await this.fetchCollectionDataFromApi(
          collection.id,
        );
        await this.updateCollectionData(collection, collectionData);
      }
    }catch (error) {
      console.error('Error during synchronization:', error);
    }
  
  }
  private async fetchCollectionDataFromApi(id: string) {
    const response = await axios.get(`https://api.reservoir.tools/collections/v6?id=${id}`);
    return response.data;
  }
  
  private async updateCollectionData(
    collection: CollectionEntity,
    newData: any,
  ) {
    collection.slug = newData.slug;
    collection.name = newData.name;
    collection.image = newData.image;
    collection.floorSaleChange30Days = newData.floorSaleChange?.['30day'];

    await this.collectionRepository.save(collection);
  }

  async getAverageFloorSale30Days(): Promise<string> {
    const collections = await this.collectionRepository.find();
    const totalFloorSaleChange30Days = collections.reduce((total, collection) => {
      return total + (collection.floorSaleChange30Days || 0);
    }, 0);
    const averageFloorSaleChange30Days = totalFloorSaleChange30Days / collections.length;
    return (averageFloorSaleChange30Days * 100).toFixed(2) + "%";
  }

  async getMinFloorSale30Days(): Promise<string> {
    const collections = await this.collectionRepository.find();
    const minFloorSaleChange30Days = collections.reduce((min, collection) => {
      return Math.min(min, collection.floorSaleChange30Days || 0);
    }, Infinity);
    return (minFloorSaleChange30Days * 100).toFixed(2) + "%";
  }

  async getMaxFloorSale30Days(): Promise<string> {
    const collections = await this.collectionRepository.find();
    const maxFloorSaleChange30Days = collections.reduce((max, collection) => {
      return Math.max(max, collection.floorSaleChange30Days || 0);
    }, -Infinity);
    return (maxFloorSaleChange30Days * 100).toFixed(2) + "%";
  }
}
