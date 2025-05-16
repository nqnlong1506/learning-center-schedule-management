import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuctionStatusEnum } from '../config';
import { IsNumber, IsString } from 'class-validator';
import { CustomerEntity } from 'src/modules/customer/entities/customer.entity';
import { StockEntity } from 'src/modules/stock/entities/stock.entity';
import { AuctionContractEntity } from 'src/modules/auction-contract/entites/auction-contract.entity';

@Entity('auction')
export class AuctionEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  no: number;

  @IsString()
  @Column({ name: 'vin', type: 'varchar', length: 100 })
  vin: string;

  @Column({ name: 'stock_id' })
  stockId: number;

  @ManyToOne(() => StockEntity, (stock) => stock.id)
  @JoinColumn({ name: 'stock_id' })
  stock: StockEntity;

  @Column({ name: 'car_reg_no', type: 'varchar', length: 20 })
  carRegNo: string;

  @Column({ name: 'auct_saved_date', type: 'timestamp' })
  auctionDate: Date;

  @Column({ name: 'vendor_no', type: 'int' })
  vendorNo: number;

  @ManyToOne(() => CustomerEntity, (vendor) => vendor.no)
  @JoinColumn({ name: 'vendor_no' })
  vendor: CustomerEntity;

  @Column({ type: 'enum', enum: AuctionStatusEnum })
  status: AuctionStatusEnum;

  @IsNumber()
  @Column({ type: 'int' })
  price: number;

  @OneToOne(() => AuctionContractEntity, (auction) => auction.auctionNo)
  contract: AuctionContractEntity;
}
