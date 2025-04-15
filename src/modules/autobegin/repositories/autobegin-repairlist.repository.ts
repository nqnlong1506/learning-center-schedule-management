import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { DataSource, Repository } from 'typeorm';
import { AutobeginRepairListEntity } from '../entities/autobegin-repairlist.entity';

@Injectable()
export class AutobeginRepairListRepository extends BaseRepository<AutobeginRepairListEntity> {
  constructor(
    @InjectRepository(AutobeginRepairListEntity)
    private readonly autobeginRepairListRepository: Repository<AutobeginRepairListEntity>,
    dataSource: DataSource,
  ) {
    super(autobeginRepairListRepository, dataSource);
  }
}
