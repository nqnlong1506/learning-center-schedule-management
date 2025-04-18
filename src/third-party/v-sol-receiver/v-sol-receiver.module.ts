import { Module } from '@nestjs/common';
import { StockModule } from 'src/modules/stock/stock.module';
import { VSolReceiverController } from './v-sol-receiver.controller';
import { VSolReceiverService } from './v-sol-receiver.service';
import { BuyModule } from 'src/modules/buy/buy.module';
import { CarHistoryModule } from 'src/modules/car-history/car-history.module';
import { AutobeginModule } from 'src/modules/autobegin/autobegin.module';

@Module({
  imports: [StockModule, BuyModule, CarHistoryModule, AutobeginModule],
  controllers: [VSolReceiverController],
  providers: [VSolReceiverService],
})
export class VSolReceiverModule {}
