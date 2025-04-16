import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

export class HP_CT_002Dto {
  @ValidateNested()
  @Type(() => HP_CT_002_STOCK_Dto)
  STOCK: HP_CT_002_STOCK_Dto;

  @ValidateNested()
  @Type(() => HP_CT_002_CUST_Dto)
  CUST: HP_CT_002_CUST_Dto;

  @ValidateNested()
  @Type(() => HP_CT_002_WARRANTY_Dto)
  WARRANTY: HP_CT_002_WARRANTY_Dto;
}
export class HP_CT_002_STOCK_Dto {
  @IsString()
  VIN: string;

  @IsString()
  CAR_REG_NO: string;

  @IsString()
  CONT_NO: string;

  @IsString()
  STAT_CD: string;
}
export class HP_CT_002_CUST_Dto {
  @IsNumber()
  CUST_ID: number;

  @IsString()
  CAR_OW: string;

  @IsString()
  CON_NM: string;

  @IsString()
  CON_REGNUM: string;

  @IsString()
  CON_EMAIL: string;

  @IsString()
  CON_HP_NO: string;

  @IsString()
  CON_ZIP_NO: string;

  @IsString()
  CON_ADDR: string;

  @IsString()
  CON_ADDR_DETAIL: string;
}
export class HP_CT_002_WARRANTY_Dto {
  @IsString()
  VIN: string;

  @IsString()
  SEL_EW: string;
}
