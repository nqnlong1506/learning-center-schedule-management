import { IsDate, IsNumber, IsString } from 'class-validator';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AutobeginEntity } from './autobegin.entity';
import { Transform } from 'class-transformer';

@Entity('crm_autobegins_repair_list')
export class AutobeginRepairListEntity {
  @IsNumber()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  // @ManyToOne(() => ProductEntity, (product) => product.repairList)
  // @JoinColumn({ name: 'product_id' })
  // product: ProductEntity;

  @ManyToOne(() => AutobeginEntity, (autobegin) => autobegin.repairList)
  @JoinColumn({ name: 'autobegin_id' })
  autobegin: AutobeginEntity;

  @IsString()
  @Column({ name: 'date', type: 'varchar', length: 255, nullable: true })
  date: string;

  @IsString()
  @Column({ name: 'km', type: 'int', nullable: true })
  km: number;

  @IsString()
  @Column({ name: 'content', type: 'text', nullable: true })
  content: string;

  @IsString()
  @Column({ name: 'carname', type: 'varchar', length: 255, nullable: true })
  carname: string;

  @Transform(({ value }) => (value ? new Date(value) : value), {
    toClassOnly: true,
  })
  @IsDate()
  @CreateDateColumn({ name: 'reg_date', type: 'timestamp', nullable: true })
  regDate: Date;

  private parsedContent: any;

  private decodeUnicode(input: string): string {
    return input.replace(/\\u[\dA-F]{4}/gi, (match) => {
      return String.fromCharCode(parseInt(match.replace('\\u', ''), 16));
    });
  }

  @AfterLoad()
  parseContent() {
    if (this.content) {
      try {
        const parsedArray = JSON.parse(this.content);
        this.parsedContent = parsedArray.map((item: string) => {
          const correctedUnicode = item.replace(/u([0-9a-fA-F]{4})/g, '\\u$1');
          return this.decodeUnicode(correctedUnicode);
        });
      } catch (error) {
        console.error('Error parsing content:', error);
        this.parsedContent = this.content;
      }
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  stringifyContent() {
    if (Array.isArray(this.parsedContent)) {
      this.content = JSON.stringify(
        this.parsedContent.map((item: string) => {
          return item
            .split('')
            .map((char) => {
              const charCode = char.charCodeAt(0);
              return charCode > 127
                ? `\\u${charCode.toString(16).padStart(4, '0')}`
                : char;
            })
            .join('');
        }),
      );
    }
  }
}
