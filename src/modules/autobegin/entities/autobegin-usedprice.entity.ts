import { IsDate, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AutobeginEntity } from './autobegin.entity';
import { Transform } from 'class-transformer';

@Entity('autobegins_used_price')
export class AutobeginUsedPriceEntity {
  @IsNumber()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  // @ManyToOne(() => ProductEntity, (product) => product.usedprice)
  // @JoinColumn({ name: 'product_id' })
  // product: ProductEntity;

  @ManyToOne(() => AutobeginEntity, (autobegin) => autobegin.usedprice)
  @JoinColumn({ name: 'autobegin_id' })
  autobegin: AutobeginEntity;

  @IsString()
  @Column({ name: 'sdtym', type: 'varchar', length: 255, nullable: true })
  stdym: string;

  @IsNumber()
  @Column({ name: 'price', type: 'int', nullable: true })
  price: number;

  @IsNumber()
  @Column({ name: 'rate', type: 'double', nullable: true })
  rate: number;

  @IsNumber()
  @Column({ name: 'rvalue', type: 'double', nullable: true })
  rvalue: number;

  @Transform(({ value }) => (value ? new Date(value) : value), {
    toClassOnly: true,
  })
  @IsDate()
  @CreateDateColumn({ name: 'reg_date', type: 'timestamp', nullable: true })
  regDate: Date;
}
