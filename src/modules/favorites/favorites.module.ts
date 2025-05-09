import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesEntity } from './entities/favorites.entity';
import { FavoritesRepository } from './repositories/favorites.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FavoritesEntity])],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository],
})
export class FavoritesModule {}
