import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../customer/repositories/customer.repository';
import { checkPassword } from 'src/utils/password';
import { CustomerEntity } from '../customer/entities/customer.entity';
import { YesNoEnum } from 'src/config/enums/yesno';
import { SubVSolSenderService } from 'src/third-party/sub-v-sol-sender/sub-v-sol-sender.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly cRepo: CustomerRepository,
    private readonly vsolSenderSerivce: SubVSolSenderService,
  ) {}

  async isExistingCustomer(no: number): Promise<boolean> {
    return await this.cRepo.exists({ where: { no: no, isDel: YesNoEnum.NO } });
  }

  async login(id: string, password: string): Promise<CustomerEntity | Error> {
    try {
      const customer = await this.cRepo.getItem({
        where: {
          id: id,
        },
      });
      if (!customer) throw new Error('customer does not exist');
      if (!checkPassword(password, customer.password))
        throw new Error('incorrect password');
      customer.toJson();
      const cust002 = await this.vsolSenderSerivce.HP_CUST_002(
        customer.id,
        customer.stage,
      );
      if (cust002 instanceof Error)
        throw new Error('[vsol-admin] - id not found');
      return customer;
    } catch (error) {
      return error;
    }
  }
}
