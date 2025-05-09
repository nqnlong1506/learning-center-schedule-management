import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from './repositories/favorites.repository';
import { FavoritesEntity } from './entities/favorites.entity';
import { YesNoEnum } from 'src/config/enums/yesno';

@Injectable()
export class FavoritesService {
  constructor(private readonly fRepo: FavoritesRepository) {}

  async post(input: {
    id?: number;
    customerNo?: number;
    stockId?: number;
    status: YesNoEnum;
  }): Promise<any | Error> {
    const { id, customerNo, stockId, status } = input;
    try {
      if (id) {
        const favor = await this.fRepo.getItem({ where: { id: id } });
        if (!favor) throw new Error('entity not found');
        favor.status = status;
        return await this.fRepo.createEntity(favor);
      }

      const favor = new FavoritesEntity();
      favor.customerNo = customerNo;
      favor.stockId = stockId;
      favor.status = status;
      return await this.fRepo.createEntity(favor);
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }
}
