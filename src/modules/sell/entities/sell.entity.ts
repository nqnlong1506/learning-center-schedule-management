import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SellPEEnum, SellStatusEnum } from '../enums';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

@Entity('sells')
export class SellEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @IsString()
  @IsOptional()
  @Column({ type: 'varchar', length: 20, comment: 'VIN -	차대번호' })
  vin: string;

  @IsNumber()
  @Column({ name: 'seller_no', type: 'int' })
  sellerNo: number;

  @IsString()
  @Column({
    name: 'car_reg_no',
    type: 'varchar',
    length: 20,
  })
  carRegNo: string;

  @IsString()
  @Column({
    name: 'owner',
    type: 'varchar',
    length: 20,
  })
  owner: string;

  @IsString()
  @Column({
    name: 'cont_no',
    type: 'varchar',
    length: 20,
    comment: 'CONT_NO -	계약번호',
    nullable: true,
  })
  contractNo: string;

  @IsNumber()
  @Column({
    name: 'auto_price',
    type: 'int',
    comment: 'QUOTE_PRICE - 최종견적가',
    default: 0,
  })
  autoPrice: number;

  @IsEnum(SellStatusEnum)
  @IsOptional()
  @Column({
    name: 'status',
    type: 'enum',
    enum: SellStatusEnum,
    comment: 'STAT_CD -	상태코드',
    default: SellStatusEnum.REGISTERED,
  })
  status: SellStatusEnum;

  @IsString()
  @IsOptional()
  @Column({
    name: 'eval_regi',
    type: 'varchar',
    length: 20,
    comment: 'EVAL_REGI -	현장 평가 가능한 지역_시/도',
  })
  evalRegi: string;

  @IsString()
  @IsOptional()
  @Column({
    name: 'eval_regi_deta',
    type: 'varchar',
    length: 20,
    comment: 'EVAL_REGI_DETA - 현장 평가 가능한 지역_구/군',
  })
  evalRegiDeta: string;

  @IsEnum(SellPEEnum)
  @IsOptional()
  @Column({
    name: 'sell_pe',
    type: 'enum',
    enum: SellPEEnum,
    comment: 'SAL_PE - 판매가능 시기',
  })
  sellPE: SellPEEnum;

  @Column({
    name: 'quote_price',
    type: 'int',
    comment: 'QUOTE_PRICE - 최종견적가',
  })
  quotePrice: number;

  @Column({
    name: 'rep_name',
    type: 'varchar',
    length: 50,
    comment: 'REP_NM - 담당자명',
  })
  repName: string;

  @Column({
    name: 'rep_phone',
    type: 'varchar',
    length: 50,
    comment: 'REP_PHONE - 담당자 전화번호',
  })
  repPhone: string;

  @Column({
    name: 'rep_team',
    type: 'varchar',
    length: 50,
    comment: 'REP_TEAM - 담당자 소속',
  })
  repTeam: string;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  toJson(): void {}

  static toCreateEntity(sell: SellEntity | undefined): SellEntity {
    if (!sell || !sell.vin || sell.vin === '') return undefined;
    const entity = new SellEntity();
    entity.vin = sell.vin;
    entity.status = SellStatusEnum.REGISTERED;
    entity.evalRegi = sell.evalRegi;
    entity.evalRegiDeta = sell.evalRegiDeta;
    entity.sellPE = sell.sellPE;
    return entity;
  }

  static toUpdateEntity(sell: SellEntity | undefined): SellEntity {
    const entity = new SellEntity();
    entity.contractNo = sell.contractNo;
    entity.status = sell.status ? sell.status : SellStatusEnum.REGISTERED;
    entity.evalRegi = sell.evalRegi;
    entity.evalRegiDeta = sell.evalRegiDeta;
    entity.sellPE = sell.sellPE;
    return entity;
  }
}
