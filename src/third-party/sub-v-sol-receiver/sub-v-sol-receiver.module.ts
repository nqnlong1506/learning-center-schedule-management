import { Module } from '@nestjs/common';
import { SubVSolReceiverController } from './sub-v-sol-receiver.controller';
import { SubVSolReceiverService } from './sub-v-sol-receiver.service';
import { CustomerModule } from 'src/modules/customer/customer.module';

@Module({
  imports: [CustomerModule],
  controllers: [SubVSolReceiverController],
  providers: [SubVSolReceiverService],
})
export class SubVSolReceiverModule {}
