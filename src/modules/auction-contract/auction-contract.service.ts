import { Injectable } from '@nestjs/common';
import { AuctionContractRepository } from './repositories/auction-contract.repository';

@Injectable()
export class AuctionContractService {
  constructor(private readonly acRepo: AuctionContractRepository) {}

  async createContract() {}
}
