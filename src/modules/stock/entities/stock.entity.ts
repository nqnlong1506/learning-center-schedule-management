import { IsDate, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('stock')
export class StockEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column({ name: 'vin', type: 'varchar', length: 100, nullable: true })
  VIN: string;

  @IsString()
  @Column({ name: 'car_reg_no', type: 'varchar', length: 100, nullable: true })
  CAR_REG_NO: string;

  @IsString()
  @Column({ name: 'modelname', type: 'varchar', length: 100, nullable: true })
  MODELNAME: string;

  @IsString()
  @Column({ name: 'cho', type: 'varchar', length: 100, nullable: true })
  CHO: string;

  @IsDate()
  @Column({ name: 'firstdate', type: 'date', nullable: true })
  FIRSTDATE: Date;

  @IsDate()
  @Column({ name: 'pur_cdt', type: 'date', nullable: true })
  PUR_CDT: Date;

  @IsDate()
  @Column({ name: 'aut_cadt', type: 'date', nullable: true })
  AUT_CADT: Date;

  @IsNumber()
  @Column({ name: 'mileage', type: 'int', nullable: true })
  MILEAGE: number;

  @IsString()
  @Column({ name: 'fuel', type: 'varchar', length: 100, nullable: true })
  FUEL: string;

  @IsString()
  @Column({ name: 'trans', type: 'varchar', length: 100, nullable: true })
  TRANS: string;

  @IsString()
  @Column({ name: 'color', type: 'varchar', length: 100, nullable: true })
  COLOR: string;

  @IsString()
  @Column({ name: 'year', type: 'varchar', length: 100, nullable: true })
  YEAR: string;
  @IsNumber()
  @Column({ name: 'newprice', type: 'int', nullable: true })
  NEWPRICE: number;

  @IsString()
  @Column({ name: 'car_adp', type: 'varchar', length: 100, nullable: true })
  CAR_ADP: string;

  @IsString()
  @Column({ name: 'mnw_no_pe', type: 'varchar', length: 100, nullable: true })
  MNW_NO_PE: string;

  @IsString()
  @Column({ name: 'mnw_no_mi', type: 'varchar', length: 100, nullable: true })
  MNW_NO_MI: string;

  @IsString()
  @Column({ name: 'mnw_en_pe', type: 'varchar', length: 100, nullable: true })
  MNW_EN_PE: string;

  @IsString()
  @Column({ name: 'mnw_en_mi', type: 'varchar', length: 100, nullable: true })
  MNW_EN_MI: string;

  @IsString()
  @Column({ name: 'mnw_ga_pe', type: 'varchar', length: 100, nullable: true })
  MNW_GA_PE: string;

  @IsString()
  @Column({ name: 'mnw_ga_mi', type: 'varchar', length: 100, nullable: true })
  MNW_GA_MI: string;

  @IsString()
  @Column({ name: 'dir_car_img', type: 'varchar', length: 100, nullable: true })
  DIR_CAR_IMG: string;

  @IsString()
  @Column({ name: 'tax_car', type: 'varchar', length: 100, nullable: true })
  TAX_CAR: string;

  @IsString()
  @Column({ name: 'man_ex', type: 'varchar', length: 100, nullable: true })
  MAN_EX: string;

  @IsString()
  @Column({ name: 'car_feat', type: 'varchar', length: 100, nullable: true })
  CAR_FEAT: string;

  @IsString()
  @Column({ name: 'car_pro', type: 'varchar', length: 100, nullable: true })
  CAR_PRO: string;

  @IsString()
  @Column({ name: 'rep_nm', type: 'varchar', length: 100, nullable: true })
  REP_NM: string;

  @IsString()
  @Column({ name: 'rep_pic', type: 'varchar', length: 100, nullable: true })
  REP_PIC: string;

  @IsString()
  @Column({ name: 'rep_phone', type: 'varchar', length: 100, nullable: true })
  REP_PHONE: string;

  @IsString()
  @Column({ name: 'rep_his', type: 'varchar', length: 100, nullable: true })
  REP_HIS: string;

  @IsString()
  @Column({
    name: 'evaluation_comm',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  EVALUATION_COMM: string;

  @IsDate()
  @CreateDateColumn({ name: 'reg_date', type: 'timestamp', nullable: true })
  regDate: Date;
}
