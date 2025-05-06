import { IsEnum, IsOptional, IsString } from 'class-validator';
import { YesNoEnum } from 'src/config/enums/yesno';
import {
  CustomerStageEnum,
  CustomerTypeEnum,
} from 'src/modules/customer/enums';

export class CustomerDTO {
  @IsString()
  @IsOptional()
  no: string;

  @IsEnum(CustomerStageEnum)
  stage: CustomerStageEnum;

  @IsEnum(CustomerTypeEnum)
  type: CustomerTypeEnum;

  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  birthDate: string;

  @IsString()
  email: string;

  @IsString()
  customerID: string;

  @IsString()
  @IsOptional()
  customerPW: string;

  @IsString()
  @IsOptional()
  zipNo: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  addressDetail: string;

  @IsEnum(YesNoEnum)
  informationFormAgreed: YesNoEnum;

  @IsEnum(YesNoEnum)
  smsReceived: YesNoEnum;

  @IsEnum(YesNoEnum)
  emailReceived: YesNoEnum;

  @IsEnum(YesNoEnum)
  phoneReceived: YesNoEnum;

  @IsString()
  @IsOptional()
  representativeName: string;

  @IsString()
  @IsOptional()
  businessNo: string;

  @IsString()
  @IsOptional()
  corporationNo: string;

  @IsString()
  @IsOptional()
  memo: string;

  @IsString()
  @IsOptional()
  representativeNumber: string;

  @IsString()
  @IsOptional()
  bankAccount: string;
}
