import { Module } from '@nestjs/common';
import { VSolReceiverController } from './v-sol-receiver.controller';
import { VSolReceiverService } from './v-sol-receiver.service';

@Module({
  controllers: [VSolReceiverController],
  providers: [VSolReceiverService],
})
export class VSolReceiverModule {}
