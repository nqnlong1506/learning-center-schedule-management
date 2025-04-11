import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './repositories/customer.repository';
import { CustomerEntity } from './entities/customer.entity';
import { VSolSenderService } from 'src/third-party/v-sol-sender/v-sol-sender.service';

@Injectable()
export class CustomerService {
  constructor(
    // repositories
    private readonly cRepo: CustomerRepository,

    // services
    private readonly vsolService: VSolSenderService,
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
    const key = await this.cRepo.startTransaction();
    console.log(key);
    try {
      const exist = await this.cRepo.exists({ where: { id: body.id } });
      if (exist) {
        throw new Error('customer already existed');
      }
      const entity = CustomerEntity.toCreateEntity(body);
      const create = await this.cRepo.createEntity(entity, key);
      await this.cRepo.rollbackTransaction(key);

      // await this.vsolService.HP_CUST_001(create);

      await this.cRepo.commitTransaction(key);
      return create;
    } catch (error) {
      console.log('post error', error);
      return error;
    }
  }

  // async postTest(body: CustomerEntity): Promise<any | Error> {
  //   const queryRunner = this.dataSource.createQueryRunner();

  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     await queryRunner.manager.save(users[0]);
  //     await queryRunner.manager.save(users[1]);

  //     await queryRunner.commitTransaction();
  //   } catch (err) {
  //     // since we have errors lets rollback the changes we made
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     // you need to release a queryRunner which was manually instantiated
  //     await queryRunner.release();
  //   }
  // }
}
