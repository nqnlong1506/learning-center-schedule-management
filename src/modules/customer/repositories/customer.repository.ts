import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';

@Injectable()
export class CustomerRepository extends BaseRepository<CustomerEntity> {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly repo: Repository<CustomerEntity>,
    dataSource: DataSource,
  ) {
    super(repo, dataSource);
  }
}
