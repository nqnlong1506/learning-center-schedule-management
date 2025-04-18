import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { SellStatusEnum } from 'src/modules/sell/enums';

export class SellDTO {
  @IsString()
  @IsNotEmpty()
  contractNo: string;

  @IsEnum(SellStatusEnum)
  status: SellStatusEnum;

  @IsNumber()
  @IsOptional()
  quotePrice: number;

  @IsString()
  @IsOptional()
  repName: string;

  @IsString()
  @IsOptional()
  repPhone: string;

  @IsString()
  @IsOptional()
  repTeam: string;
}
