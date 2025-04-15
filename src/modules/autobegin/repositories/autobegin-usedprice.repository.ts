import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { DataSource, Repository } from 'typeorm';
import { AutobeginUsedPriceEntity } from '../entities/autobegin-usedprice.entity';

@Injectable()
export class AutobeginUsedPriceRepository extends BaseRepository<AutobeginUsedPriceEntity> {
  constructor(
    @InjectRepository(AutobeginUsedPriceEntity)
    private readonly autobeginUsedPriceRepository: Repository<AutobeginUsedPriceEntity>,
    dataSource: DataSource,
  ) {
    super(autobeginUsedPriceRepository, dataSource);
  }
}
