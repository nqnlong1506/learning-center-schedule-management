import { Module } from '@nestjs/common';
import { AuctionContractController } from './auction-contract.controller';
import { AuctionContractService } from './auction-contract.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionContractEntity } from './entites/auction-contract.entity';
import { AuctionContractRepository } from './repositories/auction-contract.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuctionContractEntity])],
  controllers: [AuctionContractController],
  providers: [AuctionContractService, AuctionContractRepository],
  exports: [AuctionContractService, AuctionContractRepository],
})
export class AuctionContractModule {}
