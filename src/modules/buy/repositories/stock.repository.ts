import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { BuyEntity } from '../entities/buy.entity';

@Injectable()
export class BuyRepository extends BaseRepository<BuyEntity> {
  constructor(
    @InjectRepository(BuyEntity)
    private readonly buyRepository: Repository<BuyEntity>,
    dataSource: DataSource,
  ) {
    super(buyRepository, dataSource);
  }
}
