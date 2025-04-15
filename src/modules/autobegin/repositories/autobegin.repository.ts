import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { DataSource, Repository } from 'typeorm';
import { AutobeginEntity } from '../entities/autobegin.entity';

@Injectable()
export class AutobeginRepository extends BaseRepository<AutobeginEntity> {
  constructor(
    @InjectRepository(AutobeginEntity)
    private readonly autobeginRepository: Repository<AutobeginEntity>,
    dataSource: DataSource,
  ) {
    super(autobeginRepository, dataSource);
  }
}
