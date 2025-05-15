import { Injectable } from '@nestjs/common';
import { CustomerDTO } from './dto/customer';
import { CustomerEntity } from 'src/modules/customer/entities/customer.entity';
import { CustomerRepository } from 'src/modules/customer/repositories/customer.repository';
import { SellDTO } from './dto/sell';
import { SellRepository } from 'src/modules/sell/repositories/sell.repository';
import { SellEntity } from 'src/modules/sell/entities/sell.entity';
import { CustomerStageEnum } from 'src/modules/customer/enums';
import { VendorEntity } from 'src/modules/vendor/entities/vendor.entity';
// import { passwordCrypt } from 'src/utils/password';

@Injectable()
export class SubVSolReceiverService {
  constructor(
    private readonly cRepo: CustomerRepository,
    private readonly sRepo: SellRepository,
  ) {}

  async HP_CUST_001(body: CustomerDTO): Promise<CustomerEntity | Error> {
    try {
      const customer = body.no
        ? await this.cRepo.getItem({ where: { no: Number(body.no) } })
        : new CustomerEntity();
      if (!customer) throw new Error('customer does not exist.');

      customer.id = body.customerID;
      customer.password = body.customerPW;
      customer.stage = body.stage;
      customer.type = body.type;
      customer.name = body.name;
      if (body.stage !== CustomerStageEnum.GENERAL) {
        customer.mobilephone = `${body.stage}-${body.phone}`;
      } else {
        customer.mobilephone = body.phone;
      }
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
      if (body.stage !== CustomerStageEnum.GENERAL) {
        const vendor = new VendorEntity();
        vendor.memo = body.memo;
        vendor.representativeNumber = body.representativeNumber;
        vendor.bankAccount = body.bankAccount;
        customer.vendor = vendor;
      }

      const post = await this.cRepo.createEntity(customer);
      return post;
    } catch (error) {
      console.log('error', error, body);
      return error;
    }
  }

  async HP_CT_004(body: SellDTO): Promise<SellEntity | Error> {
    try {
      const contract = await this.sRepo.getItem({
        where: { contractNo: body.contractNo },
      });
      if (!contract) throw new Error('contract does not exist');
      contract.status = body.status;
      contract.quotePrice = body.quotePrice;
      contract.repName = body.repName;
      contract.repPhone = body.repPhone;
      contract.repTeam = body.repTeam;
      await this.sRepo.createEntity(contract);
      return contract;
    } catch (error) {
      return error;
    }
  }

  async HP_BO_001(body: any): Promise<void | Error> {
    try {
      console.log('[HP_BO_001 - receiver]', body);
    } catch (error) {
      return error;
    }
  }

  async HP_BO_002(body: any): Promise<void | Error> {
    try {
      console.log('[HP_BO_002 - receiver]', body);
    } catch (error) {
      return error;
    }
  }

  async HP_BO_003(body: any): Promise<void | Error> {
    try {
      console.log('[HP_BO_003 - receiver]', body);
    } catch (error) {
      return error;
    }
  }

  async HP_BO_004(body: any): Promise<void | Error> {
    try {
      console.log('[HP_BO_004 - receiver]', body);
    } catch (error) {
      return error;
    }
  }

  async EX_EXP_002(body: any): Promise<void | Error> {
    try {
      console.log('[EX_EXP_002 - receiver]', body);
    } catch (error) {
      return error;
    }
  }

  async AU_AUCT_002(body: any): Promise<void | Error> {
    try {
      console.log('[AU_AUCT_002 - receiver]', body);
    } catch (error) {
      return error;
    }
  }
}
