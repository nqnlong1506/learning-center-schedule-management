import { IsDate, IsNumber, IsString } from 'class-validator';
// import { ProductEntity } from 'src/modules/product/entities/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  // OneToOne,
  // JoinColumn,
  OneToMany,
} from 'typeorm';
import { AutobeginMileagePriceEntity } from './autobegin-mileageprice.entity';
import { AutobeginOptionTableEntity } from './autobegin-option-table.entity';
import { AutobeginRepairListEntity } from './autobegin-repairlist.entity';
import { AutobeginOptlistTableEntity } from './autobegin-oplist-table.entity';
import { AutobeginUsedPriceEntity } from './autobegin-usedprice.entity';
import { AutobeginSeloptListEntity } from './autobegin-seloptlist.entity';
import { Transform } from 'class-transformer';

@Entity('crm_autobegins')
export class AutobeginEntity {
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  // @OneToOne(() => ProductEntity, (product) => product.autobegin)
  // @JoinColumn({ name: 'product_id' })
  // product: ProductEntity;

  @IsNumber()
  @Column({ name: 'car_length', type: 'int', nullable: true })
  carLength: number;

  @IsNumber()
  @Column({ name: 'car_width', type: 'int', nullable: true })
  carWidth: number;

  @IsNumber()
  @Column({ name: 'car_height', type: 'int', nullable: true })
  carHeight: number;

  @IsNumber()
  @Column({ name: 'wheel_base', type: 'int', nullable: true })
  wheelBase: number;

  @IsString()
  @Column({ name: 'carnum', type: 'varchar', length: 255, nullable: true })
  carnum: string;

  @IsString()
  @Column({ name: 'regname', type: 'varchar', length: 255, nullable: true })
  regname: string;

  @IsString()
  @Column({ name: 'vin', type: 'varchar', length: 255, nullable: true })
  vin: string;

  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : value), {
    toClassOnly: true,
  })
  @Column({
    name: 'firstdate',
    type: 'date',
    nullable: true,
  })
  firstDate: Date;

  @IsString()
  @Column({
    name: 'year',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '연식',
  })
  year: string;

  @IsString()
  @Column({ name: 'cho', type: 'varchar', length: 255, nullable: true })
  cho: string;

  @IsString()
  @Column({ name: 'makername', type: 'varchar', length: 255, nullable: true })
  makername: string;

  @IsString()
  @Column({ name: 'classname', type: 'varchar', length: 255, nullable: true })
  classname: string;

  @IsString()
  @Column({ name: 'modelname', type: 'varchar', length: 255, nullable: true })
  modelname: string;

  @IsString()
  @Column({ name: 'seriesname1', type: 'varchar', length: 255, nullable: true })
  seriesname1: string;

  @IsString()
  @Column({ name: 'seriesname2', type: 'varchar', length: 255, nullable: true })
  seriesname2: string;

  @IsString()
  @Column({ name: 'seriesname', type: 'varchar', length: 255, nullable: true })
  seriesname: string;

  @IsString()
  @Column({ name: 'cargubun', type: 'varchar', length: 255, nullable: true })
  cargubun: string;

  @IsString()
  @Column({ name: 'shapegubun', type: 'varchar', length: 255, nullable: true })
  shapegubun: string;

  @IsString()
  @Column({ name: 'makerno', type: 'varchar', length: 255, nullable: true })
  makerno: string;

  @IsString()
  @Column({ name: 'classno', type: 'varchar', length: 255, nullable: true })
  classno: string;

  @IsString()
  @Column({ name: 'modelno', type: 'varchar', length: 255, nullable: true })
  modelno: string;

  @IsString()
  @Column({ name: 'seriesno1', type: 'varchar', length: 255, nullable: true })
  seriesno1: string;

  @IsString()
  @Column({ name: 'seriesno2', type: 'varchar', length: 255, nullable: true })
  seriesno2: string;

  @IsString()
  @Column({ name: 'seriesno', type: 'varchar', length: 255, nullable: true })
  seriesno: string;

  @IsString()
  @Column({ name: 'cargubunno', type: 'varchar', length: 255, nullable: true })
  cargubunno: string;

  @IsString()
  @Column({
    name: 'shapegubunno',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  shapegubunno: string;

  @IsString()
  @Column({ name: 'modelimage', type: 'varchar', length: 255, nullable: true })
  modelimage: string;

  @IsString()
  @Column({ name: 'usegubun', type: 'varchar', length: 255, nullable: true })
  usegubun: string;

  @IsNumber()
  @Column({ name: 'displacement', type: 'int', nullable: true })
  displacement: number;

  @IsString()
  @Column({ name: 'fuel', type: 'varchar', length: 255, nullable: true })
  fuel: string;

  @IsString()
  @Column({ name: 'gearbox', type: 'varchar', length: 255, nullable: true })
  gearbox: string;

  @IsString()
  @Column({ name: 'color', type: 'varchar', length: 255, nullable: true })
  color: string;

  @IsString()
  @Column({ name: 'stdmileage', type: 'varchar', length: 255, nullable: true })
  stdmileage: string;

  @IsNumber()
  @Column({ name: 'newprice', type: 'int', nullable: true })
  newprice: number;

  @IsString()
  @Column({ name: 'vin_gear', type: 'varchar', length: 255, nullable: true })
  vinGear: string;

  @IsString()
  @Column({ name: 'fueltank', type: 'varchar', length: 255, nullable: true })
  fueltank: string;

  @IsString()
  @Column({ name: 'carmakename', type: 'varchar', length: 255, nullable: true })
  carmakeName: string;

  @IsString()
  @Column({
    name: 'carmakeprice',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  carmakeprice: string;

  @IsString()
  @Column({ name: 'seating', type: 'varchar', length: 255, nullable: true })
  seating: string;

  @IsString()
  @Column({ name: 'g_year', type: 'varchar', length: 255, nullable: true })
  gYear: string;

  @IsString()
  @Column({ name: 'g_mileage', type: 'varchar', length: 255, nullable: true })
  gMileage: string;

  @IsString()
  @Column({ name: 'g2_year', type: 'varchar', length: 255, nullable: true })
  g2Year: string;

  @IsString()
  @Column({ name: 'g2_mileage', type: 'varchar', length: 255, nullable: true })
  g2Mileage: string;

  @IsString()
  @Column({ name: 'g3_year', type: 'varchar', length: 255, nullable: true })
  g3Year: string;

  @IsString()
  @Column({ name: 'ts_key', type: 'varchar', length: 255, nullable: true })
  tsKey: string;

  @IsString()
  @Column({ name: 'modellist', type: 'varchar', length: 255, nullable: true })
  modellist: string;

  @IsDate()
  @CreateDateColumn({
    name: 'reg_date',
    type: 'timestamp',
  })
  regDate: Date;

  @IsString()
  @Column({ name: 'owner', type: 'varchar', length: 255, nullable: true })
  owner: string;

  @IsString()
  @Column({ name: 'option_memo', type: 'text', nullable: true })
  optionMemo: string;

  @OneToMany(() => AutobeginMileagePriceEntity, (abmb) => abmb.autobegin)
  mileageprice: AutobeginMileagePriceEntity[];

  @OneToMany(() => AutobeginOptionTableEntity, (abot) => abot.autobegin)
  optionTable: AutobeginOptionTableEntity[];

  @OneToMany(
    () => AutobeginOptlistTableEntity,
    (abotable) => abotable.autobegin,
  )
  optList: AutobeginOptlistTableEntity[];

  @OneToMany(() => AutobeginSeloptListEntity, (absl) => absl.autobegin)
  seloptList: AutobeginSeloptListEntity[];

  @OneToMany(() => AutobeginRepairListEntity, (abrl) => abrl.autobegin)
  repairList: AutobeginRepairListEntity[];

  @OneToMany(() => AutobeginUsedPriceEntity, (abup) => abup.autobegin)
  usedprice: AutobeginUsedPriceEntity[];
}
