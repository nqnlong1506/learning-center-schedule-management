import { Module } from '@nestjs/common';
import { StockModule } from 'src/modules/stock/stock.module';
import { VSolReceiverController } from './v-sol-receiver.controller';
import { VSolReceiverService } from './v-sol-receiver.service';
import { BuyModule } from 'src/modules/buy/buy.module';

@Module({
  imports: [StockModule, BuyModule],
  controllers: [VSolReceiverController],
  providers: [VSolReceiverService],
})
export class VSolReceiverModule {}
