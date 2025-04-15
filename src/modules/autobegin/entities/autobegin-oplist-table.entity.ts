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

@Entity('crm_autobegins_optlist_table')
export class AutobeginOptlistTableEntity {
  @IsNumber()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  // @ManyToOne(() => ProductEntity, (product) => product.optList)
  // @JoinColumn({ name: 'product_id' })
  // product: ProductEntity;

  @ManyToOne(() => AutobeginEntity, (autobegin) => autobegin.optList)
  @JoinColumn({ name: 'autobegin_id' })
  autobegin: AutobeginEntity;

  @IsString()
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: true })
  name: string;

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
