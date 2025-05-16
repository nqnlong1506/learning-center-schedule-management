import { Module } from '@nestjs/common';
import { SubVSolReceiverController } from './sub-v-sol-receiver.controller';
import { SubVSolReceiverService } from './sub-v-sol-receiver.service';
import { CustomerModule } from 'src/modules/customer/customer.module';
import { SellModule } from 'src/modules/sell/sell.module';
import { AuctionModule } from 'src/modules/auction/auction.module';
import { StockModule } from 'src/modules/stock/stock.module';
import { AuctionContractModule } from 'src/modules/auction-contract/auction-contract.module';

@Module({
  imports: [
    CustomerModule,
    SellModule,
    AuctionModule,
    StockModule,
    AuctionContractModule,
  ],
  controllers: [SubVSolReceiverController],
  providers: [SubVSolReceiverService],
})
export class SubVSolReceiverModule {}
