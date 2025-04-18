import { IsDate, IsNumber } from 'class-validator';
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

@Entity('autobegins_mileage_price')
export class AutobeginMileagePriceEntity {
  @IsNumber()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => AutobeginEntity, (autobegin) => autobegin.mileageprice)
  @JoinColumn({ name: 'autobegin_id' })
  autobegin: AutobeginEntity;

  @IsNumber()
  @Column({ name: 'mileage', type: 'int', nullable: true })
  mileage: number;

  @IsNumber()
  @Column({ name: 'price', type: 'int', nullable: true })
  price: number;

  @Transform(({ value }) => (value ? new Date(value) : value), {
    toClassOnly: true,
  })
  @IsDate()
  @CreateDateColumn({ name: 'reg_date', type: 'timestamp', nullable: true })
  regDate: Date;
}
