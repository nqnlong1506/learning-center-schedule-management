import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { SellStatusEnum } from '../enums';

export class UpdateStateSellDTO {
  @IsNotEmpty()
  @IsEnum(SellStatusEnum)
  @IsString()
  status: SellStatusEnum;

  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsBoolean()
  isDisabled: boolean;
}
