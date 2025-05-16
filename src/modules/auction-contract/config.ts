export enum AuctionContractStatusEnum {
  IN_PROGRESS = '01',
  SUCCESS = '02',
  // DELIVERIED = '03',
  FAILED = '04',
}

export const ContractStatusMapping = {
  '01': AuctionContractStatusEnum.IN_PROGRESS,
  '02': AuctionContractStatusEnum.SUCCESS,
  '04': AuctionContractStatusEnum.FAILED,
};
