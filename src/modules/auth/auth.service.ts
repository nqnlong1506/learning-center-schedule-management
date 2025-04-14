import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../customer/repositories/customer.repository';
import { checkPassword } from 'src/utils/password';
import { CustomerEntity } from '../customer/entities/customer.entity';

@Injectable()
export class AuthService {
  constructor(private readonly cRepo: CustomerRepository) {}

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

      return customer;
    } catch (error) {
      return error;
    }
  }
}
