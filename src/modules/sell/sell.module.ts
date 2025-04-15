import { Module } from '@nestjs/common';
import { SellController } from './sell.controller';
import { SellService } from './sell.service';
import { SellEntity } from './entities/sell.entitiy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellRepository } from './repositories/sell.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SellEntity])],
  controllers: [SellController],
  providers: [SellService, SellRepository],
})
export class SellModule {}
