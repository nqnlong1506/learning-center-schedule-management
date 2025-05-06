import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { AuctionEntity } from '../entities/auction.entity';

@Injectable()
export class AuctionRepository extends BaseRepository<AuctionEntity> {
  constructor(
    @InjectRepository(AuctionEntity)
    private readonly repo: Repository<AuctionEntity>,
    dataSource: DataSource,
  ) {
    super(repo, dataSource);
  }
}
