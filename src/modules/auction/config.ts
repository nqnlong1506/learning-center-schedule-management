export enum AuctionStatusEnum {
  FAILED = '01',
  WAITING = '02',
  SUCCESS = '03',
  CONTRACT_SUCCESS = '04',
}

export const AuctionStatusEnumMapping = {
  failed: AuctionStatusEnum.FAILED,
  waiting: AuctionStatusEnum.WAITING,
  success: AuctionStatusEnum.SUCCESS,
  contract_success: AuctionStatusEnum.CONTRACT_SUCCESS,
};
