import { Module } from '@nestjs/common';
import { SellController } from './sell.controller';
import { SellService } from './sell.service';
import { SellEntity } from './entities/sell.entitiy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellRepository } from './repositories/sell.repository';
import { SubVSolSenderModule } from 'src/third-party/sub-v-sol-sender/sub-v-sol-sender.module';

@Module({
  imports: [TypeOrmModule.forFeature([SellEntity]), SubVSolSenderModule],
  controllers: [SellController],
  providers: [SellService, SellRepository],
})
export class SellModule {}
