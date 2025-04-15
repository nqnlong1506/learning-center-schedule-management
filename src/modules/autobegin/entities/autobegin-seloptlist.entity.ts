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

@Entity('autobegins_seloptlist')
export class AutobeginSeloptListEntity {
  @IsNumber()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  // @ManyToOne(() => ProductEntity, (product) => product.seloptList)
  // @JoinColumn({ name: 'product_id' })
  // product: ProductEntity;

  @ManyToOne(() => AutobeginEntity, (autobegin) => autobegin.seloptList)
  @JoinColumn({ name: 'autobegin_id' })
  autobegin: AutobeginEntity;

  @IsString()
  @Column({ name: 'otpname', type: 'varchar', length: 255, nullable: true })
  name: string;

  @IsNumber()
  @Column({ name: 'otpprice', type: 'int', nullable: true })
  price: number;

  @Transform(({ value }) => (value ? new Date(value) : value), {
    toClassOnly: true,
  })
  @IsDate()
  @CreateDateColumn({ name: 'reg_date', type: 'timestamp', nullable: true })
  regDate: Date;
}
