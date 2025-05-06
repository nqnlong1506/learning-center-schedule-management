import { Transform, Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

function transformDate(value: any) {
  if (typeof value === 'string' && value.length === 8) {
    const year = parseInt(value.substring(0, 4), 10);
    const month = parseInt(value.substring(4, 6), 10) - 1;
    const day = parseInt(value.substring(6, 8), 10);
    return new Date(year, month, day);
  }
  return value;
}
export class HP_ST_001_STOCK_Dto {
  @IsString()
  VIN: string;

  @IsString()
  CAR_REG_NO: string;

  @IsString()
  OWNER: string;

  @IsString()
  MODELNAME: string;

  @IsString()
  CHO: string;

  @IsString()
  @Transform(({ value }) => transformDate(value))
  FIRSTDATE: Date;

  @IsString()
  PUR_CDT: string;

  @IsString()
  @Transform(({ value }) => transformDate(value))
  AUT_CADT: Date;

  @IsString()
  AUT_TIME_STA: string;

  @IsString()
  AUT_TIME_END: string;

  //BRAND

  @IsNumber()
  MILEAGE: number;

  @IsString()
  FUEL: string;

  @IsString()
  TRANS: string;

  @IsString()
  COLOR: string;

  @IsString()
  YEAR: string;

  @IsNumber()
  NEWPRICE: number;

  @IsNumber()
  CAR_ADP: number;

  @IsNumber()
  CAR_ADP_HD: number;

  @IsNumber()
  CAR_ADP_MF: number;

  @IsNumber()
  CAR_ADP_MC: number;

  @IsNumber()
  CAR_ADP_TAF: number;

  @IsNumber()
  CAR_ADP_RF: number;

  @IsNumber()
  CAR_ADP_PIF: number;

  //LIS_TYP
  @IsString()
  LIS_TYP: string;

  @IsString()
  MNW_NO_PE: string;

  @IsString()
  MNW_NO_MI: string;

  @IsString()
  MNW_EN_PE: string;

  @IsString()
  MNW_EN_MI: string;

  @IsString()
  MNW_GA_PE: string;

  @IsString()
  MNW_GA_MI: string;

  @IsString()
  DIR_CAR_IMG: string;

  @IsString()
  TAX_CAR: string;

  @IsString()
  MAN_EX: string;

  @IsString()
  CAR_FEAT: string;

  @IsString()
  CAR_PRO: string;

  @IsString()
  CAR_VIS: string;

  @IsString()
  REP_NM: string;

  @IsString()
  REP_PIC: string;

  @IsString()
  REP_PHONE: string;

  @IsString()
  REP_HIS: string;

  @IsString()
  EVALUATION_COMM: string;
}
export class HP_ST_001_WARRANTY_Dto {
  @IsString()
  MAN_CD: string;

  @IsString()
  MAN_NM: string;

  @IsString()
  MOD_CD: string;

  @IsString()
  MOD_NM: string;

  @IsString()
  DETA_CD: string;

  @IsString()
  DETA_NM: string;

  @IsString()
  PROD_CD: string;

  @IsString()
  PROD_NM: string;

  @IsString()
  TYPE_CD: string;

  @IsString()
  TYPE_NM: string;

  @IsString()
  SALE_PRI: string;
}
export class HP_ST_001Dto {
  @ValidateNested()
  @Type(() => HP_ST_001_STOCK_Dto)
  STOCK: HP_ST_001_STOCK_Dto;

  @ValidateNested()
  @Type(() => HP_ST_001_WARRANTY_Dto)
  WARRANTY: HP_ST_001_WARRANTY_Dto[];
}
