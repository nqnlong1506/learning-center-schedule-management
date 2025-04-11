import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { CustomerRepository } from './repositories/customer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
  exports: [CustomerRepository],
})
export class CustomerModule {}
