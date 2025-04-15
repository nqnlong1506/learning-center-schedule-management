import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutobeginController } from './autobegin.controller';
import { AutobeginService } from './autobegin.service';
import { HttpModule } from '@nestjs/axios';
import { AutobeginEntity } from './entities/autobegin.entity';
import { AutobeginRepository } from './repositories/autobegin.repository';
// import { ProductModule } from '../product/product.module';
import { AutobeginMileagePriceEntity } from './entities/autobegin-mileageprice.entity';
import { AutobeginOptlistTableEntity } from './entities/autobegin-oplist-table.entity';
import { AutobeginOptionTableEntity } from './entities/autobegin-option-table.entity';
import { AutobeginRepairListEntity } from './entities/autobegin-repairlist.entity';
import { AutobeginSeloptListEntity } from './entities/autobegin-seloptlist.entity';
import { AutobeginUsedPriceEntity } from './entities/autobegin-usedprice.entity';
import { AutobeginMileagePriceRepository } from './repositories/autobegin-mileageprice.repository';
import { AutobeginOptlistTableRepository } from './repositories/autobegin-oplist-table.repository';
import { AutobeginOptionTableRepository } from './repositories/autobegin-option-table.repository';
import { AutobeginRepairListRepository } from './repositories/autobegin-repairlist.repository';
import { AutobeginSeloptListRepository } from './repositories/autobegin-seloptlist.repository';
import { AutobeginUsedPriceRepository } from './repositories/autobegin-usedprice.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AutobeginEntity,
      AutobeginMileagePriceEntity,
      AutobeginOptlistTableEntity,
      AutobeginOptionTableEntity,
      AutobeginRepairListEntity,
      AutobeginSeloptListEntity,
      AutobeginUsedPriceEntity,
    ]),
    HttpModule,
    // forwardRef(() => ProductModule),
  ],
  controllers: [AutobeginController],
  providers: [
    AutobeginService,
    AutobeginRepository,
    AutobeginMileagePriceRepository,
    AutobeginOptlistTableRepository,
    AutobeginOptionTableRepository,
    AutobeginRepairListRepository,
    AutobeginSeloptListRepository,
    AutobeginUsedPriceRepository,
  ],
  exports: [AutobeginService, AutobeginRepository],
})
export class AutobeginModule {}
