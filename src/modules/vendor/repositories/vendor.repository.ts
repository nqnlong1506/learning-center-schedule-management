import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { VendorEntity } from '../entities/vendor.entity';

@Injectable()
export class VendorRepository extends BaseRepository<VendorEntity> {
  constructor(
    @InjectRepository(VendorEntity)
    private readonly repo: Repository<VendorEntity>,
    dataSource: DataSource,
  ) {
    super(repo, dataSource);
  }
}
