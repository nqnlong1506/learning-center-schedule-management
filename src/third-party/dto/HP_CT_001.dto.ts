import { Transform, Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

function transformDate(value: any) {
  if (typeof value === 'string' && value.length === 8) {
    const year = parseInt(value.substring(0, 4), 10);
    const month = parseInt(value.substring(4, 6), 10) - 1;
    const day = parseInt(value.substring(6, 8), 10);
    return new Date(year, month, day);
  }
  return value;
}

export class HP_CT_001Dto {
  @ValidateNested()
  @Type(() => HP_CT_001_STOCK_Dto)
  STOCK: HP_CT_001_STOCK_Dto;

  @ValidateNested()
  @Type(() => HP_CT_001_CUST_Dto)
  CUST: HP_CT_001_CUST_Dto;

  @ValidateNested()
  @Type(() => HP_CT_001_WARRANTY_Dto)
  WARRANTY: HP_CT_001_WARRANTY_Dto;
}
export class HP_CT_001_STOCK_Dto {
  @IsString()
  VIN: string;

  @IsString()
  CAR_REG_NO: string;

  // @IsString()
  // CONT_NO: string;

  @IsString()
  STAT_CD: string;

  @IsString()
  DE_ME: string;

  @IsString()
  DE_ZIP_NO: string;

  @IsString()
  DE_ADDR: string;

  @IsString()
  DE_ADDR_DETAIL: string;

  @IsString()
  @Transform(({ value }) => transformDate(value))
  DE_DAT: string;

  // @IsString()
  // DE_ME: string;

  @IsString()
  RE_NM: string;

  @IsString()
  RE_AC: string;

  @IsString()
  RE_BA: string;

  @IsString()
  PA_ME: string;

  @IsString()
  FIPA_ME: string;

  @IsString()
  SEL_EW: string;

  @IsString()
  PA_STA: string;

  @IsString()
  FIPA_STA: string;
}
export class HP_CT_001_CUST_Dto {
  @IsString()
  CUST_TP: string;

  @IsString()
  CUST_NM: string;

  @IsString()
  CUST_REGNUM: string;

  @IsString()
  EMAIL: string;

  @IsString()
  HP_NO: string;

  @IsString()
  ZIP_NO: string;

  @IsString()
  ADDR: string;

  @IsString()
  ADDR_DETAIL: string;
}
export class HP_CT_001_WARRANTY_Dto {
  @IsString()
  VIN: string;

  @IsString()
  SEL_EW: string;
}
