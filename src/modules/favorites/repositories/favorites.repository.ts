import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { FavoritesEntity } from '../entities/favorites.entity';

@Injectable()
export class FavoritesRepository extends BaseRepository<FavoritesEntity> {
  constructor(
    @InjectRepository(FavoritesEntity)
    private readonly repo: Repository<FavoritesEntity>,
    dataSource: DataSource,
  ) {
    super(repo, dataSource);
  }
}
