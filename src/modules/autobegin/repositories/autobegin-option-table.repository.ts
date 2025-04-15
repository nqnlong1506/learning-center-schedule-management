import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { DataSource, Repository } from 'typeorm';
import { AutobeginOptionTableEntity } from '../entities/autobegin-option-table.entity';

@Injectable()
export class AutobeginOptionTableRepository extends BaseRepository<AutobeginOptionTableEntity> {
  constructor(
    @InjectRepository(AutobeginOptionTableEntity)
    private readonly autobeginOptionTableRepository: Repository<AutobeginOptionTableEntity>,
    dataSource: DataSource,
  ) {
    super(autobeginOptionTableRepository, dataSource);
  }
}
