import { IsDate, IsString } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';

@Entity('car_history')
export class CarHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @OneToOne(() => ProductEntity, (product) => product.carHistory)
  // product: ProductEntity;

  // @OneToOne(
  //   () => PurchaseProductEntity,
  //   (purchaseProduct) => purchaseProduct.carRegNo,
  // )
  // @JoinColumn({ name: 'r002', referencedColumnName: 'carRegNo' })
  // purchaseProduct: PurchaseProductEntity;

  @IsString()
  @Column({ name: 'r000', type: 'varchar', length: 100, nullable: true })
  r000: string;

  @IsString()
  @Column({ name: 'r001', type: 'varchar', length: 100 })
  r001: string;

  @IsString()
  @Unique('uniq_car_history_r002', ['r002'])
  @Column({ name: 'r002', type: 'varchar', length: 100, unique: true })
  r002: string;

  @IsString()
  @Column({ name: 'r003', type: 'varchar', length: 100, nullable: true })
  r003: string;

  @IsString()
  @Column({ name: 'r004', type: 'varchar', length: 100, nullable: true })
  r004: string;

  @IsString()
  @Column({ name: 'r005', type: 'varchar', length: 100, nullable: true })
  r005: string;

  @IsString()
  @Column({ name: 'r101', type: 'varchar', length: 100, nullable: true })
  r101: string;

  @IsString()
  @Column({ name: 'r102', type: 'varchar', length: 100, nullable: true })
  r102: string;

  @IsString()
  @Column({ name: 'r103', type: 'varchar', length: 100, nullable: true })
  r103: string;

  @IsString()
  @Column({ name: 'r104', type: 'varchar', length: 100, nullable: true })
  r104: string;

  @IsString()
  @Column({ name: 'r105', type: 'varchar', length: 100, nullable: true })
  r105: string;

  @IsString()
  @Column({ name: 'r106', type: 'varchar', length: 100, nullable: true })
  r106: string;

  @IsString()
  @Column({ name: 'r107', type: 'varchar', length: 100, nullable: true })
  r107: string;

  @IsString()
  @Column({ name: 'r108', type: 'varchar', length: 100, nullable: true })
  r108: string;

  @IsString()
  @Column({ name: 'r111', type: 'varchar', length: 100, nullable: true })
  r111: string;

  @IsString()
  @Column({ name: 'r112', type: 'varchar', length: 100, nullable: true })
  r112: string;

  @IsString()
  @Column({ name: 'r113', type: 'text', nullable: true })
  r113: string;

  @IsString()
  @Column({ name: 'r201', type: 'varchar', length: 100, nullable: true })
  r201: string;

  @IsString()
  @Column({ name: 'r202', type: 'text', nullable: true })
  r202: string;

  @IsString()
  @Column({ name: 'r203', type: 'text', nullable: true })
  r203: string;

  @IsString()
  @Column({ name: 'r204', type: 'varchar', length: 100, nullable: true })
  r204: string;

  @IsString()
  @Column({ name: 'r205', type: 'text', nullable: true })
  r205: string;

  @IsString()
  @Column({ name: 'r301', type: 'varchar', length: 100, nullable: true })
  r301: string;

  @IsString()
  @Column({ name: 'r302', type: 'varchar', length: 100, nullable: true })
  r302: string;

  @IsString()
  @Column({ name: 'r303', type: 'varchar', length: 100, nullable: true })
  r303: string;

  @IsString()
  @Column({ name: 'r401', type: 'varchar', length: 100, nullable: true })
  r401: string;

  @IsString()
  @Column({ name: 'r402', type: 'varchar', length: 100, nullable: true })
  r402: string;

  @IsString()
  @Column({ name: 'r403', type: 'varchar', length: 100, nullable: true })
  r403: string;

  @IsString()
  @Column({ name: 'r404', type: 'varchar', length: 100, nullable: true })
  r404: string;

  @IsString()
  @Column({ name: 'r405', type: 'varchar', length: 100, nullable: true })
  r405: string;

  @IsString()
  @Column({ name: 'r406', type: 'text', nullable: true })
  r406: string;

  @IsString()
  @Column({ name: 'r407', type: 'varchar', length: 100, nullable: true })
  r407: string;

  @IsString()
  @Column({ name: 'r408', type: 'text', nullable: true })
  r408: string;

  @IsString()
  @Column({ name: 'r409', type: 'varchar', length: 100, nullable: true })
  r409: string;

  @IsString()
  @Column({ name: 'r410', type: 'text', nullable: true })
  r410: string;

  @IsString()
  @Column({ name: 'r501', type: 'varchar', length: 100, nullable: true })
  r501: string;

  @IsString()
  @Column({ name: 'r502', type: 'text', nullable: true })
  r502: string;

  @IsString()
  @Column({ name: 'r510', type: 'varchar', length: 100, nullable: true })
  r510: string;

  @IsString()
  @Column({ name: 'r511', type: 'text', nullable: true })
  r511: string;

  @IsString()
  @Column({ name: 'r601', type: 'varchar', length: 100, nullable: true })
  r601: string;

  @IsString()
  @Column({ name: 'r602', type: 'text', nullable: true })
  r602: string;

  @IsString()
  @Column({ name: 'r701', type: 'varchar', length: 100, nullable: true })
  r701: string;

  @IsDate()
  @CreateDateColumn({ name: 'reg_date', type: 'timestamp', nullable: true })
  regDate: Date;

  @IsString()
  @Column({
    name: 'error_message',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  errorMessage: string;
}
