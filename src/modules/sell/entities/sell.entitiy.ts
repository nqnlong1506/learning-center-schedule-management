import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SellPEEnum, SellStatusEnum } from '../enums';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity('sells')
export class SellEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 20, comment: 'VIN -	차대번호' })
  vin: string;

  @IsString()
  @IsNotEmpty()
  @Column({
    name: 'car_reg_no',
    type: 'varchar',
    length: 10,
    comment: 'CAR_REG_NO - 차량번호',
  })
  carRegNo: string;

  @Column({
    name: 'cont_no',
    type: 'varchar',
    length: 20,
    comment: 'CONT_NO -	계약번호',
  })
  contractNo: string;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 20, comment: 'OWNER -	소유주명' })
  owner: string;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 50, comment: 'CLASSNAME -	모델명' })
  classname: string;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 50, comment: 'MODELNAME -	상세모델' })
  modelname: string;

  @IsString()
  @IsNotEmpty()
  @Column({
    name: 'first_date',
    type: 'timestamp',
    comment: 'FIRSTDATE -	최초등록일',
  })
  firstDate: Date;

  @IsString()
  @IsNotEmpty()
  @Column({ name: 'fuel', type: 'varchar', length: 20, comment: 'FUEL - 연료' })
  fuel: string;

  @IsString()
  @IsNotEmpty()
  @Column({
    name: 'trans',
    type: 'varchar',
    length: 10,
    comment: 'TRANS -	변속기',
  })
  trans: string;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 4, comment: 'YEAR - 연식' })
  year: string;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 10, comment: 'COLOR -	색상' })
  color: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: SellStatusEnum,
    comment: 'STAT_CD -	상태코드',
  })
  status: SellStatusEnum;

  @Column({ type: 'int', comment: 'MILEAGE -	주행거리' })
  mileage: number;

  @Column({
    name: 'img_dir',
    type: 'varchar',
    length: 255,
    comment: 'DIR_CAR_IMG -	사진 Directory',
  })
  imageDir: string;

  @Column({
    name: 'eval_regi',
    type: 'varchar',
    length: 20,
    comment: 'EVAL_REGI -	현장 평가 가능한 지역_시/도',
  })
  evalRegi: string;

  @Column({
    name: 'eval_regi_deta',
    type: 'varchar',
    length: 20,
    comment: 'EVAL_REGI_DETA - 현장 평가 가능한 지역_구/군',
  })
  evalRegiDeta: string;

  @Column({
    name: 'sell_pe',
    type: 'enum',
    enum: SellPEEnum,
    comment: 'SAL_PE - 판매가능 시기',
  })
  sellPE: SellPEEnum;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  toJson(): void {}

  static toCreateEntity(sell: SellEntity | undefined): SellEntity {
    console.log('sell checkig', sell);
    if (!sell) return undefined;

    const entity = new SellEntity();
    entity.firstDate = new Date(sell.firstDate);
    if (entity.firstDate.toString() === 'Invalid Date') {
      delete entity.firstDate;
    }
    entity.vin = sell.vin;
    entity.carRegNo = sell.carRegNo;
    entity.owner = sell.owner;
    entity.classname = sell.classname;
    entity.modelname = sell.modelname;
    entity.fuel = sell.fuel;
    entity.trans = sell.trans;
    entity.year = sell.year;
    entity.color = sell.color;
    return entity;
  }
}
