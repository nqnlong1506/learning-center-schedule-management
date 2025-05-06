import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerEntity as Customer } from 'src/modules/customer/entities/customer.entity';
@Entity('vendor')
export class VendorEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'cust_no', unique: true })
  customerNo: number;

  @OneToOne(() => Customer, (customer) => customer.no)
  @JoinColumn({ name: 'cust_no' })
  customer: Customer;

  @Column({
    type: 'text',
    nullable: true,
  })
  memo: string;

  @Column({
    name: 'representative_number',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  representativeNumber: string;

  @Column({
    name: 'bank_account',
    type: 'text',
    nullable: true,
  })
  bankAccount: string;

  // non-columns:
  bankName: string;
  accountName: string;
  accountId: string;

  toEntity(): void {
    this.bankAccount =
      this.bankName && this.accountName && this.accountId
        ? [this.bankName, this.accountName, this.accountId].join('|')
        : undefined;
  }

  parse(): void {
    this.bankName = '';
    this.accountName = '';
    this.accountId = '';
    if (this.bankAccount && this.bankAccount !== '') {
      const bankStrs = this.bankAccount.split('|');

      this.bankName = bankStrs[0];
      this.accountName = bankStrs[1];
      this.accountId = bankStrs[2];

      this.bankAccount = undefined;
    } else {
      this.bankAccount = '';
    }
  }
}
