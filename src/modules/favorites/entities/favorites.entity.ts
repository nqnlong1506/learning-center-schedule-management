import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StockEntity } from 'src/modules/stock/entities/stock.entity';
import { YesNoEnum } from 'src/config/enums/yesno';
import { CustomerEntity } from 'src/modules/customer/entities/customer.entity';

@Entity('favorites')
export class FavoritesEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'cust_no', type: 'int' })
  customerNo: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.no)
  @JoinColumn({ name: 'cust_no' })
  customer: CustomerEntity;

  @Column({ name: 'stock_id', type: 'int' })
  stockId: number;

  @ManyToOne(() => StockEntity, (stock) => stock.id)
  @JoinColumn({ name: 'stock_id' })
  stock: StockEntity;

  @Column({ type: 'enum', enum: YesNoEnum, default: YesNoEnum.YES })
  status: YesNoEnum;

  toJson(): void {}

  static toCreateEntity(
    customer: FavoritesEntity | undefined,
  ): FavoritesEntity {
    if (!customer) {
      return undefined;
    }
    const entity = new FavoritesEntity();

    return entity;
  }
}
