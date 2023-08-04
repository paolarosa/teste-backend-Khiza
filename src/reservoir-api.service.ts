import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReservoirApiService {
  private readonly baseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('BASE_URL');
  }

  async getCollectionData(collectionId: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/collections/${collectionId}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Falha ao obter dados da API');
    }
  }
}