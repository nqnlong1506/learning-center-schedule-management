import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { AuctionContractEntity } from '../entites/auction-contract.entity';

@Injectable()
export class AuctionContractRepository extends BaseRepository<AuctionContractEntity> {
  constructor(
    @InjectRepository(AuctionContractEntity)
    private readonly repo: Repository<AuctionContractEntity>,
    dataSource: DataSource,
  ) {
    super(repo, dataSource);
  }
}
