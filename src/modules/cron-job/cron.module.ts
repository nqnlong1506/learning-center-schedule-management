import { Module } from '@nestjs/common';
import { CronJob } from './cron';

@Module({
  imports: [
    // forwardRef(() => TokenModule),
    // forwardRef(() => AuthModule),
    // forwardRef(() => KakaoScheduleModule),
    // forwardRef(() => KakaoModule),
    // forwardRef(() => ProductModule),
    // forwardRef(() => AuctionModule),
    // forwardRef(() => StoreInventoryModule),
  ],
  providers: [CronJob],
  exports: [CronJob],
})
export class CronModule {}
