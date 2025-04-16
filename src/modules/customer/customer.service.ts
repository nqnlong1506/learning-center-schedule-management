import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './repositories/customer.repository';
import { CustomerEntity } from './entities/customer.entity';
import { VSolSenderService } from 'src/third-party/v-sol-sender/v-sol-sender.service';
import { SubVSolSenderService } from 'src/third-party/sub-v-sol-sender/sub-v-sol-sender.service';

@Injectable()
export class CustomerService {
  constructor(
    // repositories
    private readonly cRepo: CustomerRepository,

    // services
    private readonly vsolService: VSolSenderService,
    private readonly senderService: SubVSolSenderService,
  ) {}

  async viewByNo(no: number): Promise<CustomerEntity | Error> {
    try {
      const customer = await this.cRepo.getItem({
        where: { no: no },
      });
      if (!customer) throw new Error('customer not found');
      return customer;
    } catch (error) {
      return error;
    }
  }

  async post(body: CustomerEntity): Promise<any | Error> {
    const exist = await this.cRepo.exists({ where: { id: body.id } });
    if (exist) {
      return new Error('customer already existed');
    }
    const key = await this.cRepo.startTransaction();
    try {
      const entity = CustomerEntity.toCreateEntity(body);
      const create = await this.cRepo.createEntity(entity, key);

      const send = await this.senderService.HP_CUST_001(create);
      if (send instanceof Error) throw send;

      await this.cRepo.commitTransaction(key);
      return create;
    } catch (error) {
      console.log('error', error?.message);
      await this.cRepo.rollbackTransaction(key);
      return error;
    }
  }
}
