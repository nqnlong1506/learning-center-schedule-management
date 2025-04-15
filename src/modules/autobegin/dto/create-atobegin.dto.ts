import { OmitType } from '@nestjs/mapped-types';
import { AutobeginEntity } from '../entities/autobegin.entity';

export class CreateAutoBeginDto extends OmitType(AutobeginEntity, [
  'id',
] as const) {}
