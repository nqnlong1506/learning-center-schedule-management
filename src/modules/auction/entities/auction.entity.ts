import { VendorEntity } from 'src/modules/vendor/entities/vendor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuctionStatusEnum } from '../config';

@Entity('auction')
export class AuctionEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  no: number;

  @Column({ name: 'car_reg_no', type: 'varchar', length: 20 })
  carRegNo: string;

  @Column({ name: 'auct_saved_date', type: 'timestamp' })
  auctionDate: Date;

  @Column({ name: 'vendor_id', type: 'int' })
  vendorId: number;

  @ManyToOne(() => VendorEntity, (vendor) => vendor.id)
  @JoinColumn({ name: 'vendor_id' })
  vendor: VendorEntity;

  @Column({ type: 'enum', enum: AuctionStatusEnum })
  status: AuctionStatusEnum;

  @Column({ type: 'int' })
  price: number;
}
