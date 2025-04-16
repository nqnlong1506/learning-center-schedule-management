import { SellStatusEnum } from 'src/modules/sell/enums';

export const SellStatusMapping = {
  [SellStatusEnum.FAILED]: 'failed',
  [SellStatusEnum.REGISTERED]: 'registered',
  [SellStatusEnum.ESTIMATE_QUOTE]: 'first_quote',
  // [SellStatusEnum.INSPECTION]: 'inspection',
  [SellStatusEnum.FINAL_ESTIMATE]: 'final_quote',
  [SellStatusEnum.COMPLETE]: 'success',
};
