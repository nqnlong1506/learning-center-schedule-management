import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerTypeEnum } from '../enums';
import { GenderEnum } from 'src/config/enums/gender';
import { YesNoEnum } from 'src/config/enums/yesno';

@Entity('crm_customer', { orderBy: { createdAt: 'DESC' } })
export class CustomerEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: 'CUST_NO - 고객번호' })
  no: number;

  @Column({ comment: 'CUST_TP - 고객유형' })
  type: CustomerTypeEnum;

  @Column({ comment: 'CUST_ID - 회원ID' })
  id: string;

  @Column({ comment: 'CCUST_PW - 비밀번호' })
  password: string;

  @Column({ comment: 'CUST_NM - 고객명' })
  name: string;

  @Column({ name: 'hp_no', comment: 'HP_NO - 휴대폰번호' })
  mobilephone: string;

  @Column({ name: 'tel_no', comment: 'TEL_NO - 전화번호' })
  telephone: string;

  @Column({ name: 'birth_date', comment: '생년월일' })
  birthdate: string;

  @Column({ comment: 'SEX_TP - 성별유형' })
  sex: GenderEnum;

  @Column({ comment: 'FRGNR_YN - 외국인여부' })
  isForeigner: YesNoEnum;

  @Column({ comment: 'EMAIL - 이메일' })
  email: string;

  @Column({ comment: 'DEL_YN - 삭제여부' })
  isDel: YesNoEnum;

  @Column({ comment: 'DEL_DT - 삭제일자' })
  deletedAt: Date;

  @Column({ comment: 'AGRE_DT - 동의일자' })
  agreedAt: Date;

  @Column({ comment: 'ZIP_NO - 우편번호' })
  postalCode: string;

  @Column({ comment: 'ADDR - 주소' })
  address: string;

  @Column({ comment: 'ADDR_DETAIL - 상세주소' })
  addressDetail: string;

  @Column({ comment: 'EMAIL_RCV_YN - 이메일수신여부' })
  emailReceive: YesNoEnum;

  @Column({ comment: 'TEL_RCV_AGRE_YN - 전화수신동의여부' })
  phoneReceive: YesNoEnum;

  @Column({ comment: 'SMS_RCV_AGRE_YN - SMS수신동의여부' })
  smsReceive: YesNoEnum;

  @Column({ comment: 'CORP_NM - 법인명' })
  coporationName: string;

  @Column({ comment: 'REPRSNT_NM - 대표자명' })
  representativeName: string;

  @Column({ comment: 'BSNM_REG_NO - 사업자등록번호' })
  businessNo: string;

  @Column({ comment: 'CORP_REG_NO - 법인등록번호' })
  coporationNo: string;

  @Column({ comment: 'CUST_DOCS_1 - 개인정보활용동의서' })
  informationFormAgreed: YesNoEnum;

  @Column({ comment: 'THIRD_AGRE_YN - 제3자동의여부' })
  thirdAgreed: string;

  toJson(): void {}
}
