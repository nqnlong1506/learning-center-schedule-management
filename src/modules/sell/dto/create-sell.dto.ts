import { PartialType, OmitType } from '@nestjs/mapped-types';
import { SellEntity } from '../entities/sell.entity';
import { IsOptional, IsString } from 'class-validator';

export class CreateSellDTO extends PartialType(
  OmitType(SellEntity, ['id', 'sellerNo', 'autoPrice'] as const),
) {
  @IsOptional()
  @IsString()
  seriesNo?: string;
}
