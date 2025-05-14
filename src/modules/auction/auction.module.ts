import { forwardRef, Module } from '@nestjs/common';
import { AuctionController } from './auction.controller';
import { AuctionService } from './auction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionEntity } from './entities/auction.entity';
import { AuctionRepository } from './repositories/auction.repository';
import { StockModule } from '../stock/stock.module';
import { CustomerModule } from '../customer/customer.module';
import { SubVSolSenderModule } from 'src/third-party/sub-v-sol-sender/sub-v-sol-sender.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuctionEntity]),
    CustomerModule,
    forwardRef(() => StockModule),
    SubVSolSenderModule,
  ],
  controllers: [AuctionController],
  providers: [AuctionService, AuctionRepository],
  exports: [AuctionRepository],
})
export class AuctionModule {}
