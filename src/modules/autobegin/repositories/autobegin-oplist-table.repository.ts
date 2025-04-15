import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { DataSource, Repository } from 'typeorm';
import { AutobeginOptlistTableEntity } from '../entities/autobegin-oplist-table.entity';

@Injectable()
export class AutobeginOptlistTableRepository extends BaseRepository<AutobeginOptlistTableEntity> {
  constructor(
    @InjectRepository(AutobeginOptlistTableEntity)
    private readonly autobeginOptlistTableRepository: Repository<AutobeginOptlistTableEntity>,
    dataSource: DataSource,
  ) {
    super(autobeginOptlistTableRepository, dataSource);
  }
}
