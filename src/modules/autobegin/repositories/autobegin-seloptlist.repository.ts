import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { DataSource, Repository } from 'typeorm';
import { AutobeginSeloptListEntity } from '../entities/autobegin-seloptlist.entity';

@Injectable()
export class AutobeginSeloptListRepository extends BaseRepository<AutobeginSeloptListEntity> {
  constructor(
    @InjectRepository(AutobeginSeloptListEntity)
    private readonly autobeginSeloptListRepository: Repository<AutobeginSeloptListEntity>,
    dataSource: DataSource,
  ) {
    super(autobeginSeloptListRepository, dataSource);
  }
}
