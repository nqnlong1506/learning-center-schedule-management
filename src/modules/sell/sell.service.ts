import { Injectable } from '@nestjs/common';
import { SellEntity } from './entities/sell.entity';
import { SellRepository } from './repositories/sell.repository';
import { formatNumber } from './config';
import { SubVSolSenderService } from 'src/third-party/sub-v-sol-sender/sub-v-sol-sender.service';

@Injectable()
export class SellService {
  constructor(
    private readonly sRepo: SellRepository,

    // services
    private readonly sender: SubVSolSenderService,
  ) {}

  async getById(id: number): Promise<SellEntity | Error> {
    const sell = await this.sRepo.getItem({ where: { id: id } });
    if (!sell) return new Error('sell does not exist');
    return sell;
  }

  async post(body: SellEntity): Promise<SellEntity | Error> {
    const key = await this.sRepo.startTransaction();
    try {
      const entity = SellEntity.toCreateEntity(body);
      const create = await this.sRepo.createEntity(entity, key);
      create.contractNo = `KMG-P-${formatNumber(create.id)}`;
      await this.sRepo.createEntity(create, key);

      const send = await this.sender.HP_CT_003(create);
      if (send instanceof Error) throw send;

      await this.sRepo.commitTransaction(key);
      return create;
    } catch (error) {
      console.log('error', error);
      await this.sRepo.rollbackTransaction(key);
      return error;
    }
  }

  async update(id: number, body: SellEntity): Promise<SellEntity | Error> {
    // return body;
    const sell = await this.sRepo.getItem({ where: { id: id } });
    if (!sell) return new Error('sell doest not exist');
    const key = await this.sRepo.startTransaction();
    try {
      let issend = false;

      sell.evalRegi = body.evalRegi;
      sell.evalRegiDeta = body.evalRegiDeta;
      sell.sellPE = body.sellPE;
      if (body.status && sell.status !== body.status) {
        sell.status = body.status;
        issend = true;
      }
      const update = await this.sRepo.createEntity(sell, key);
      await this.sRepo.createEntity(update, key);

      if (issend) {
        const send = await this.sender.HP_CT_003(update);
        if (send instanceof Error) throw send;
      }

      await this.sRepo.commitTransaction(key);
      return update;
    } catch (error) {
      console.log('error', error);
      await this.sRepo.rollbackTransaction(key);
      return error;
    }
  }
}
