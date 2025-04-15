import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyController } from './buy.controller';
import { BuyEntity } from './entities/buy.entity';
import { BuyService } from './buy.service';
import { BuyRepository } from './repositories/stock.repository';
import { VSolSenderModule } from 'src/third-party/v-sol-sender/v-sol-sender.module';

@Module({
  imports: [TypeOrmModule.forFeature([BuyEntity]), VSolSenderModule],
  controllers: [BuyController],
  providers: [BuyService, BuyRepository],
  exports: [BuyService, BuyRepository],
})
export class BuyModule {}
