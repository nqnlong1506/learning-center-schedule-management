import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { CustomerStageEnum } from 'src/modules/customer/enums';
import { StockEntity } from 'src/modules/stock/entities/stock.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('buy')
export class BuyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @Column({ name: 'buyer_no', type: 'int' })
  buyerNo: number;

  @Column({ name: 'cust_dis', type: 'enum', enum: CustomerStageEnum })
  custDis: CustomerStageEnum;

  @Column({ name: 'cont_dis', type: 'varchar', length: 2 })
  contDis: string;

  @IsString()
  @Column({ name: 'vin', type: 'varchar', length: 100, nullable: true })
  vin: string;

  @IsString()
  @Column({ name: 'car_reg_no', type: 'varchar', length: 100, nullable: true })
  carRegNo: string;

  @IsString()
  @Column({ name: 'cont_no', type: 'varchar', length: 100, nullable: true })
  contNo: string;

  @IsString()
  @Column({
    name: 'virtl_acct_no',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  virtlAcctNo: string;

  @IsString()
  @Column({ name: 'stat_cd', type: 'varchar', length: 100, nullable: true })
  statCd: string;

  @IsString()
  @Column({ name: 'de_me', type: 'varchar', length: 100, nullable: true })
  deMe: string;

  @IsString()
  @Column({ name: 'de_zip_no', type: 'varchar', length: 100, nullable: true })
  deZipNo: string;

  @IsString()
  @Column({ name: 'de_addr', type: 'varchar', length: 100, nullable: true })
  deAddr: string;

  @IsString()
  @Column({
    name: 'de_addr_detail',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  deAddrDetail: string;

  @IsString()
  @Column({ name: 'de_dat', type: 'varchar', length: 100, nullable: true })
  deDat: string;

  // @IsString()
  // @Column({ name: 'rep_his', type: 'varchar', length: 100, nullable: true })
  // DE_ME: string;

  @IsString()
  @Column({ name: 're_nm', type: 'varchar', length: 100, nullable: true })
  reNm: string;

  @IsString()
  @Column({ name: 're_ac', type: 'varchar', length: 100, nullable: true })
  reAc: string;

  @IsString()
  @Column({ name: 're_ba', type: 'varchar', length: 100, nullable: true })
  reBa: string;

  @IsString()
  @Column({ name: 'pa_me', type: 'varchar', length: 100, nullable: true })
  paMe: string;

  @IsString()
  @Column({ name: 'fipa_me', type: 'varchar', length: 100, nullable: true })
  fipaMe: string;

  @IsString()
  @Column({ name: 'sel_ew', type: 'varchar', length: 100, nullable: true })
  selEw: string;

  @IsString()
  @Column({ name: 'pa_sta', type: 'varchar', length: 100, nullable: true })
  paSta: string;

  @IsString()
  @Column({ name: 'fipa_sta', type: 'varchar', length: 100, nullable: true })
  fipaSta: string;

  @IsBoolean()
  @Column({ name: 'is_del', type: 'boolean', default: false })
  isDel: boolean;

  @UpdateDateColumn({ name: 'last_updated', type: 'timestamp' })
  updatedAt: Date;

  @IsDate()
  @CreateDateColumn({ name: 'reg_date', type: 'timestamp', nullable: true })
  regDate: Date;

  @OneToOne(() => StockEntity, (s) => s.VIN)
  @JoinColumn({ name: 'vin', referencedColumnName: 'VIN' })
  stock: StockEntity;
}
