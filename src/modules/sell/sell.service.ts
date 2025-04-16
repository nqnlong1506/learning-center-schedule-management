import { Injectable } from '@nestjs/common';
import { SellEntity } from './entities/sell.entitiy';
import { SellRepository } from './repositories/sell.repository';
import { formatNumber } from './config';
import { SubVSolSenderService } from 'src/third-party/sub-v-sol-sender/sub-v-sol-sender.service';
import { SellStatusEnum } from './enums';

@Injectable()
export class SellService {
  constructor(
    private readonly sRepo: SellRepository,

    // services
    private readonly sender: SubVSolSenderService,
  ) {}

  async post(body: SellEntity): Promise<SellEntity | Error> {
    const key = await this.sRepo.startTransaction();
    try {
      // create contract in homepages
      // const entity = SellEntity.toCreateEntity(body);
      const entity = new SellEntity();
      entity.vin = body.vin;
      entity.status = SellStatusEnum.REGISTERED;
      entity.evalRegi = body.evalRegi;
      entity.evalRegiDeta = body.evalRegiDeta;
      entity.sellPE = body.sellPE;
      const create = await this.sRepo.createEntity(entity, key);
      console.log('chaksd1231131');
      create.contractNo = `KMG-P-${formatNumber(create.id)}`;
      console.log('qua day chua');
      await this.sRepo.createEntity(entity, key);
      console.log('qua day chua roi');
      // send admin to create purchase
      await this.sender.HP_CT_003(create);
      // receiver contract no from admin
      console.log('test service', create);
      await this.sRepo.commitTransaction(key);
      return create;
    } catch (error) {
      await this.sRepo.rollbackTransaction(key);
      return error;
    }
  }
}
