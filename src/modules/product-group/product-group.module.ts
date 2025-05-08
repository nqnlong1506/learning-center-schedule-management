import { Module } from '@nestjs/common';
import { ProductGroupController } from './product-group.controller';
import { ProductGroupService } from './product-group.service';
import { SubVSolSenderModule } from 'src/third-party/sub-v-sol-sender/sub-v-sol-sender.module';

@Module({
  imports: [SubVSolSenderModule],
  controllers: [ProductGroupController],
  providers: [ProductGroupService],
})
export class ProductGroupModule {}
