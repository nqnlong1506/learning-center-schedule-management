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

@Entity('autobegins_option_table')
export class AutobeginOptionTableEntity {
  @IsNumber()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => AutobeginEntity, (autobegin) => autobegin.optionTable)
  @JoinColumn({ name: 'autobegin_id' })
  autobegin: AutobeginEntity;

  @IsNumber()
  @Column({ name: 'optionKey1', type: 'int', nullable: true })
  optionKey1: number;

  @IsNumber()
  @Column({ name: 'optionKey2', type: 'int', nullable: true })
  optionKey2: number;

  @IsNumber()
  @Column({ name: 'optionKey3', type: 'int', nullable: true })
  optionKey3: number;

  @IsNumber()
  @Column({ name: 'optionFlag', type: 'varchar', length: 255, nullable: true })
  optionFlag: number;

  @Transform(({ value }) => (value ? new Date(value) : value), {
    toClassOnly: true,
  })
  @IsDate()
  @CreateDateColumn({ name: 'reg_date', type: 'timestamp', nullable: true })
  regDate: Date;
}
