import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { CustomerRepository } from './repositories/customer.repository';
import { VSolSenderModule } from 'src/third-party/v-sol-sender/v-sol-sender.module';
import { SubVSolSenderModule } from 'src/third-party/sub-v-sol-sender/sub-v-sol-sender.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEntity]),
    VSolSenderModule,
    SubVSolSenderModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
  exports: [CustomerRepository],
})
export class CustomerModule {}
