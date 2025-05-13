import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

export class HP_CT_003Dto {
  @ValidateNested()
  @Type(() => HP_CT_003_STOCK_Dto)
  STOCK: HP_CT_003_STOCK_Dto;
}
export class HP_CT_003_STOCK_Dto {
  @IsString()
  VIN: string;

  @IsString()
  CAR_REG_NO: string;

  // @IsString()
  // CONT_NO: string;

  @IsString()
  OWNER: string;

  @IsString()
  CLASSNAME: string;

  @IsString()
  MODELNAME: string;

  @IsString()
  SERIESNO: string;

  @IsString()
  FIRSTDATE: string;

  @IsString()
  FUEL: string;

  @IsString()
  TRANS: string;

  @IsString()
  YEAR: string;

  @IsString()
  COLOR: string;

  @IsString()
  STAT_CD: string;

  @IsString()
  MILEAGE: string;

  @IsString()
  DIR_CAR_IMG: string;

  @IsString()
  EVAL_ZIP_NO: string;

  @IsString()
  EVAL_ADDR: string;

  @IsString()
  EVAL_ADDR_DE: string;

  @IsString()
  SAL_PE: string;
}
