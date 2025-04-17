import { SellEntity } from 'src/modules/sell/entities/sell.entity';
import { SellStatusMapping } from '../config';
export interface Sell {
  contractNo: string;
  vin: string;
  state: string;
}

export function toSell(s: SellEntity): Sell {
  if (!s) throw new Error('sell is undefined');
  return {
    contractNo: s.contractNo,
    vin: s.vin,
    state: SellStatusMapping[s.status] || 'registered',
  };
}
