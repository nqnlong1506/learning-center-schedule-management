import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerTypeEnum } from '../enums';
import { GenderEnum } from 'src/config/enums/gender';
import { YesNoEnum } from 'src/config/enums/yesno';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Entity('crm_customer', { orderBy: { createdAt: 'DESC' } })
export class CustomerEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: 'CUST_NO - 고객번호' })
  no: number;

  @Column({ comment: 'CUST_TP - 고객유형' })
  type: CustomerTypeEnum;

  @IsString()
  @IsNotEmpty()
  @Column({ comment: 'CUST_ID - 회원ID' })
  id: string;

  @IsString()
  @IsNotEmpty()
  @Column({ comment: 'CCUST_PW - 비밀번호' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Column({ comment: 'CUST_NM - 고객명' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: 'hp_no', comment: 'HP_NO - 휴대폰번호' })
  mobilephone: string;

  @Column({ name: 'tel_no', comment: 'TEL_NO - 전화번호' })
  telephone: string;

  @IsString()
  @IsOptional()
  @Column({ name: 'birth_date', comment: '생년월일' })
  birthdate: string;

  @IsEnum(YesNoEnum)
  @IsOptional()
  @Column({ comment: 'SEX_TP - 성별유형' })
  sex: GenderEnum;

  @Column({ name: 'is_frgnr', comment: 'FRGNR_YN - 외국인여부' })
  isForeigner: YesNoEnum;

  @IsString()
  @IsOptional()
  @Column({ comment: 'EMAIL - 이메일' })
  email: string;

  @Column({ name: 'is_del', comment: 'DEL_YN - 삭제여부' })
  isDel: YesNoEnum;

  @Column({ name: 'deleted_at', comment: 'DEL_DT - 삭제일자' })
  deletedAt: Date;

  @Column({ name: 'agreed_at', comment: 'AGRE_DT - 동의일자' })
  agreedAt: Date;

  @IsString()
  @IsOptional()
  @Column({ name: 'zip_no', comment: 'ZIP_NO - 우편번호' })
  postalCode: string;

  @IsString()
  @IsOptional()
  @Column({ comment: 'ADDR - 주소' })
  address: string;

  @IsString()
  @IsOptional()
  @Column({ name: 'address_detail', comment: 'ADDR_DETAIL - 상세주소' })
  addressDetail: string;

  @Column({ name: 'email_rcv', comment: 'EMAIL_RCV_YN - 이메일수신여부' })
  emailReceive: YesNoEnum;

  @Column({ name: 'phone_rcv', comment: 'TEL_RCV_AGRE_YN - 전화수신동의여부' })
  phoneReceive: YesNoEnum;

  @Column({ name: 'sms_rcv', comment: 'SMS_RCV_AGRE_YN - SMS수신동의여부' })
  smsReceive: YesNoEnum;

  @Column({ name: 'corp_name', comment: 'CORP_NM - 법인명' })
  corporationName: string;

  @Column({ name: 'representative_name', comment: 'REPRSNT_NM - 대표자명' })
  representativeName: string;

  @Column({ name: 'business_no', comment: 'BSNM_REG_NO - 사업자등록번호' })
  businessNo: string;

  @Column({ name: 'corp_no', comment: 'CORP_REG_NO - 법인등록번호' })
  coporationNo: string;

  @Column({
    name: 'info_form_agreed',
    comment: 'CUST_DOCS_1 - 개인정보활용동의서',
  })
  informationFormAgreed: YesNoEnum;

  @Column({ name: 'third_agreed', comment: 'THIRD_AGRE_YN - 제3자동의여부' })
  thirdAgreed: string;

  toJson(): void {}

  toCreateEntity(): CustomerEntity {
    if (this || this === undefined) {
      return undefined;
    }
    const entity = new CustomerEntity();
    entity.id = this.id;
    entity.password = this.password;
    entity.name = this.name;
    entity.mobilephone = this.mobilephone;
    entity.birthdate = this.birthdate;
    entity.sex = this.sex || GenderEnum.MALE;
    entity.email = this.email;
    entity.postalCode = this.postalCode;
    entity.address = this.address;
    entity.addressDetail = this.addressDetail;

    return entity;
  }
}
