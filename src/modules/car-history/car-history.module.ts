import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarHistoryEntity } from './entities/car-history.entity';
import { CarHistoryController } from './controllers/car-history.controller';
import { CarHistoryService } from './services/car-history.service';
import { CarHistoryRepository } from './repositories/car-history.repository';
@Module({
  imports: [TypeOrmModule.forFeature([CarHistoryEntity])],
  controllers: [CarHistoryController],
  providers: [CarHistoryService, CarHistoryRepository],
  exports: [CarHistoryService],
})
export class CarHistoryModule {}
