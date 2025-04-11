import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './repositories/customer.repository';

@Injectable()
export class CustomerService {
  constructor(private readonly cRepo: CustomerRepository) {}

  async viewByNo(no: number): Promise<any | Error> {
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
}
