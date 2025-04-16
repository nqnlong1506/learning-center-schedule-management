import { Injectable } from '@nestjs/common';
import { CustomerDTO } from './dto/customer';
import { CustomerEntity } from 'src/modules/customer/entities/customer.entity';
import { CustomerRepository } from 'src/modules/customer/repositories/customer.repository';

@Injectable()
export class SubVSolReceiverService {
  constructor(private readonly cRepo: CustomerRepository) {}

  async HP_CUST_001(body: CustomerDTO): Promise<CustomerEntity | Error> {
    try {
      const customer = body.no
        ? await this.cRepo.getItem({ where: { no: Number(body.no) } })
        : new CustomerEntity();
      if (!customer) throw new Error('customer does not exist.');

      customer.id = body.customerID;
      customer.type = body.type;
      customer.name = body.name;
      customer.mobilephone = body.phone;
      customer.birthdate = body.birthDate;
      customer.email = body.email;
      customer.postalCode = body.zipNo;
      customer.address = body.address;
      customer.addressDetail = body.addressDetail;
      customer.informationFormAgreed = body.informationFormAgreed;
      customer.smsReceive = body.smsReceived;
      customer.emailReceive = body.emailReceived;
      customer.phoneReceive = body.phoneReceived;
      customer.representativeName = body.representativeName;
      customer.businessNo = body.businessNo;
      customer.corporationNo = body.corporationNo;

      const post = await this.cRepo.createEntity(customer);
      return post;
    } catch (error) {
      return error;
    }
  }
}
