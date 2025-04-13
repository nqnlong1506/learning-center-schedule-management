import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { StockEntity } from '../entities/stock.entity';

@Injectable()
export class StockRepository extends BaseRepository<StockEntity> {
  constructor(
    @InjectRepository(StockEntity)
    private readonly stockRepository: Repository<StockEntity>,
    dataSource: DataSource,
  ) {
    super(stockRepository, dataSource);
  }
}
