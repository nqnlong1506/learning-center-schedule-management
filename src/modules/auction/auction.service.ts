import { Injectable } from '@nestjs/common';
import { AuctionEntity } from './entities/auction.entity';
import { AuctionRepository } from './repositories/auction.repository';
import { StockRepository } from '../stock/repositories/stock.repository';
import { CustomerRepository } from '../customer/repositories/customer.repository';
import { CustomerStageEnum } from '../customer/enums';
import { SubVSolSenderService } from 'src/third-party/sub-v-sol-sender/sub-v-sol-sender.service';
import { AuctionStatusEnum } from './config';

@Injectable()
export class AuctionService {
  constructor(
    private readonly auctionRepo: AuctionRepository,
    private readonly stockRepo: StockRepository,
    private readonly customerRepo: CustomerRepository,

    // services
    private readonly vsolSender: SubVSolSenderService,
  ) {}

  async post(auction: AuctionEntity, customerNo: number): Promise<any | Error> {
    const key = await this.auctionRepo.startTransaction();
    try {
      const product = await this.stockRepo.getItem({
        where: { VIN: auction.vin },
      });
      if (!product) throw new Error('product not found');
      const customer = await this.customerRepo.getItem({
        where: { no: customerNo },
      });
      if (!customer) throw new Error('customer not found');

      console.log('customer', customer);
      const entity = new AuctionEntity();
      entity.vin = product.VIN;
      entity.stockId = product.id;
      entity.carRegNo = product.CAR_REG_NO;
      entity.vendorNo = customer.no;
      entity.vendor = customer;
      entity.status = AuctionStatusEnum.WAITING;
      entity.auctionDate = new Date();
      entity.price = auction.price;
      if (product.AUT_HIEST_PRI < auction.price) {
        product.AUT_HIEST_PRI = auction.price;
        await this.stockRepo.createEntity(product, key);
      }
      const create = await this.auctionRepo.createEntity(entity, key);
      if (customer.stage === CustomerStageEnum.AUCTION) {
        console.log('send auction');
        const auc001 = await this.vsolSender.AU_AUCT_001(create);
        if (auc001 instanceof Error) throw auc001;
      }
      if (customer.stage === CustomerStageEnum.EXPORT) {
        console.log('send export');
        const exp001 = await this.vsolSender.EX_EXP_001(create);
        if (exp001 instanceof Error) throw exp001;
      }
      await this.auctionRepo.commitTransaction(key);
      return create;
    } catch (error) {
      await this.auctionRepo.rollbackTransaction(key);
      return error;
    }
  }
}
