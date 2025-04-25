import { forwardRef, Module } from '@nestjs/common';
import { CronJob } from './cron';
import { TokenModule } from '../token/token.module';
import { AuthModule } from '../auth/auth.module';
import { KakaoScheduleModule } from '../kakao-schedule/kakao-schedule.module';
import { KakaoModule } from '../kakao/repositories/kakao.module';
import { ProductModule } from '../product/product.module';
import { AuctionModule } from '../auction/auction.module';
import { StoreInventoryModule } from '../store-inventory/store-inventory.module';

@Module({
  imports: [
    forwardRef(() => TokenModule),
    forwardRef(() => AuthModule),
    forwardRef(() => KakaoScheduleModule),
    forwardRef(() => KakaoModule),
    forwardRef(() => ProductModule),
    forwardRef(() => AuctionModule),
    forwardRef(() => StoreInventoryModule),
  ],
  providers: [CronJob],
  exports: [CronJob],
})
export class CronModule {}
