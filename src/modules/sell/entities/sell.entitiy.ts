import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SellPEEnum, SellStatusEnum } from '../enums';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

@Entity('sells')
export class SellEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 20, comment: 'VIN -	차대번호' })
  vin: string;

  @Column({
    name: 'cont_no',
    type: 'varchar',
    length: 20,
    comment: 'CONT_NO -	계약번호',
  })
  contractNo: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: SellStatusEnum,
    comment: 'STAT_CD -	상태코드',
  })
  status: SellStatusEnum;

  @IsString()
  @Column({
    name: 'eval_regi',
    type: 'varchar',
    length: 20,
    comment: 'EVAL_REGI -	현장 평가 가능한 지역_시/도',
  })
  evalRegi: string;

  @IsString()
  @Column({
    name: 'eval_regi_deta',
    type: 'varchar',
    length: 20,
    comment: 'EVAL_REGI_DETA - 현장 평가 가능한 지역_구/군',
  })
  evalRegiDeta: string;

  @IsEnum(SellPEEnum)
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
    if (!sell) return undefined;
    const entity = new SellEntity();
    entity.vin = sell.vin;
    entity.status = SellStatusEnum.REGISTERED;
    entity.evalRegi = sell.evalRegi;
    entity.evalRegiDeta = sell.evalRegiDeta;
    entity.sellPE = sell.sellPE;
    return entity;
  }
}
