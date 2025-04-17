import { Module } from '@nestjs/common';
import { SellController } from './sell.controller';
import { SellService } from './sell.service';
import { SellEntity } from './entities/sell.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellRepository } from './repositories/sell.repository';
import { SubVSolSenderModule } from 'src/third-party/sub-v-sol-sender/sub-v-sol-sender.module';

@Module({
  imports: [TypeOrmModule.forFeature([SellEntity]), SubVSolSenderModule],
  controllers: [SellController],
  providers: [SellService, SellRepository],
  exports: [SellRepository],
})
export class SellModule {}
