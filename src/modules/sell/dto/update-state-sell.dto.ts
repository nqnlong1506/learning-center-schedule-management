import { IsEnum, IsNumber, IsString } from 'class-validator';
import { SellStatusEnum } from '../enums';

export class UpdateStateSellDTO {
  @IsEnum(SellStatusEnum)
  @IsString()
  status: SellStatusEnum;

  @IsNumber()
  id: number;
}
