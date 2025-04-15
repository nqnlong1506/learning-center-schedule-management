import { Injectable } from '@nestjs/common';
import { SellEntity } from './entities/sell.entitiy';

@Injectable()
export class SellService {
  async post(body: SellEntity): Promise<SellEntity | Error> {
    try {
      const entity = SellEntity.toCreateEntity(body);
      // send admin to create purchase
      // receiver contract no from admin
      // create contract in homepages
      console.log('test service', entity);
    } catch (error) {
      return error;
    }
  }
}
