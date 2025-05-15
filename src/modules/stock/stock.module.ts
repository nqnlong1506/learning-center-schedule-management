import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from './entities/stock.entity';
import { StockRepository } from './repositories/stock.repository';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { AuctionModule } from '../auction/auction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StockEntity]),
    forwardRef(() => AuctionModule),
  ],
  controllers: [StockController],
  providers: [StockService, StockRepository],
  exports: [StockService, StockRepository],
})
export class StockModule {}
