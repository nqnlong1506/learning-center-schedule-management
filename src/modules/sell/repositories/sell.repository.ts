import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { SellEntity } from '../entities/sell.entitiy';

@Injectable()
export class SellRepository extends BaseRepository<SellEntity> {
  constructor(
    @InjectRepository(SellEntity)
    private readonly repo: Repository<SellEntity>,
    dataSource: DataSource,
  ) {
    super(repo, dataSource);
  }
}
