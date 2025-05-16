import { Injectable } from '@nestjs/common';
import { CustomerDTO } from './dto/customer';
import { CustomerEntity } from 'src/modules/customer/entities/customer.entity';
import { CustomerRepository } from 'src/modules/customer/repositories/customer.repository';
import { SellDTO } from './dto/sell';
import { SellRepository } from 'src/modules/sell/repositories/sell.repository';
import { SellEntity } from 'src/modules/sell/entities/sell.entity';
import { CustomerStageEnum } from 'src/modules/customer/enums';
import { VendorEntity } from 'src/modules/vendor/entities/vendor.entity';
import { AuctionRepository } from 'src/modules/auction/repositories/auction.repository';
import { AuctionStatusEnum } from 'src/modules/auction/config';
import { StockRepository } from 'src/modules/stock/repositories/stock.repository';
import { AuctionContractStatusEnum } from 'src/modules/auction-contract/config';
import { AuctionContractEntity } from 'src/modules/auction-contract/entites/auction-contract.entity';
import { AuctionContractRepository } from 'src/modules/auction-contract/repositories/auction-contract.repository';
import { passwordCrypt } from 'src/utils/password';
// import { passwordCrypt } from 'src/utils/password';

@Injectable()
export class SubVSolReceiverService {
  constructor(
    private readonly cRepo: CustomerRepository,
    private readonly sRepo: SellRepository,
    private readonly stockRepo: StockRepository,
    private readonly aRepo: AuctionRepository,
    private readonly acRepo: AuctionContractRepository,
  ) {}

  async HP_CUST_001(body: CustomerDTO): Promise<CustomerEntity | Error> {
    try {
      const customer = body.no
        ? await this.cRepo.getItem({ where: { no: Number(body.no) } })
        : new CustomerEntity();
      if (!customer) throw new Error('customer does not exist.');

      customer.id = body.customerID;
      customer.password = passwordCrypt(body.customerPW);
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

  async AU_EX_CT_001(
    vin: string,
    id: string,
    price: number,
    saleCode: string,
  ): Promise<void | Error> {
    const key = await this.aRepo.startTransaction();
    try {
      console.log('checking here', vin, id, price, saleCode);
      const product = await this.stockRepo.getItem({ where: { VIN: vin } });
      if (!product) throw new Error('product not found');
      const vendor = await this.cRepo.getItem({ where: { id: id } });
      if (!vendor) throw new Error('vendor not found');
      const auction = await this.aRepo.getItem({
        where: {
          stockId: product.id,
          price: price,
          vendorNo: vendor.no,
        },
      });
      if (!auction) throw new Error('auction not found');
      await this.aRepo.updateEntities(
        { vin: vin },
        { status: AuctionStatusEnum.FAILED },
        key,
      );
      auction.status = AuctionStatusEnum.SUCCESS;
      const update = await this.aRepo.createEntity(auction, key);
      const contract = new AuctionContractEntity();
      contract.auctionNo = update.no;
      contract.code = saleCode;
      contract.status = AuctionContractStatusEnum.IN_PROGRESS;
      await this.acRepo.createEntity(contract, key);
      await this.aRepo.commitTransaction(key);
    } catch (error) {
      console.log('error', error);
      await this.aRepo.rollbackTransaction(key);
      return error;
    }
  }

  async AU_EX_CT_002(
    saleCode: string,
    state: AuctionContractStatusEnum,
  ): Promise<void | Error> {
    const key = await this.acRepo.startTransaction();
    try {
      console.log('checking here', saleCode, state);
      const contract = await this.acRepo.getItem({ where: { code: saleCode } });
      contract.status = state;
      if (state === AuctionContractStatusEnum.SUCCESS) {
        const auction = await this.aRepo.getItem({
          where: { no: contract.auctionNo },
        });
        if (auction) {
          auction.status = AuctionStatusEnum.CONTRACT_SUCCESS;
          await this.aRepo.createEntity(auction, key);
        }
        contract.successAt = new Date();
      }
      if (state === AuctionContractStatusEnum.FAILED) {
        contract.failedAt = new Date();
      }
      await this.acRepo.createEntity(contract, key);
      await this.aRepo.commitTransaction(key);
    } catch (error) {
      console.log('error', error);
      await this.acRepo.rollbackTransaction(key);
      return error;
    }
  }
}
