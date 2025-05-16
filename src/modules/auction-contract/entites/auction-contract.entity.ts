import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuctionContractStatusEnum } from '../config';
import { AuctionEntity } from 'src/modules/auction/entities/auction.entity';

@Entity('auction_contract')
export class AuctionContractEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  no: number;

  @Column({ type: 'varchar', length: 20 })
  code: string;

  @Column({ name: 'auction_no', type: 'int' })
  auctionNo: number;

  @OneToOne(() => AuctionEntity, (auction) => auction.no)
  @JoinColumn({ name: 'auction_no' })
  auction: AuctionEntity;

  @Column({ type: 'enum', enum: AuctionContractStatusEnum })
  status: AuctionContractStatusEnum;

  @Column({ name: 'reg_date', type: 'timestamp' })
  registerAt: Date;

  @Column({ name: 'success_date', type: 'timestamp' })
  successAt: Date;

  @Column({ name: 'failed_date', type: 'timestamp' })
  failedAt: Date;
}
