import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarHistoryEntity } from '../entities/car-history.entity';
import { BaseRepository } from 'src/repository/base.repository';
import { DataSource, EntityManager, QueryRunner, Repository } from 'typeorm';
// import { UpdateCRMAttachmentDto } from '../dto/car-history/update-car-history.dto';

@Injectable()
export class CarHistoryRepository extends BaseRepository<CarHistoryEntity> {
  constructor(
    @InjectRepository(CarHistoryEntity)
    private readonly carHistoryRepository: Repository<CarHistoryEntity>,
    dataSource: DataSource,
  ) {
    super(carHistoryRepository, dataSource);
  }

  async get(where: Record<string, any>): Promise<any> {
    console.log(where);
    const result = await this.carHistoryRepository.findOne({ where: where });
    return result;
  }

  async getDataFromCarHistory(where: Record<string, any>): Promise<any> {
    console.log(where);
    const result = await this.carHistoryRepository.findOne({ where: where });
    return result;
  }

}
