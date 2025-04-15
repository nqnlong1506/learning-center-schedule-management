import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { DataSource, Repository } from 'typeorm';
import { AutobeginMileagePriceEntity } from '../entities/autobegin-mileageprice.entity';

@Injectable()
export class AutobeginMileagePriceRepository extends BaseRepository<AutobeginMileagePriceEntity> {
  constructor(
    @InjectRepository(AutobeginMileagePriceEntity)
    private readonly autobeginMileagePriceRepository: Repository<AutobeginMileagePriceEntity>,
    dataSource: DataSource,
  ) {
    super(autobeginMileagePriceRepository, dataSource);
  }
}
