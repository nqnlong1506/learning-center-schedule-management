import { Injectable } from '@nestjs/common';
import { SubVSolSenderService } from 'src/third-party/sub-v-sol-sender/sub-v-sol-sender.service';

@Injectable()
export class ProductGroupService {
  constructor(private readonly vssendSerivce: SubVSolSenderService) {}

  async getList(upperId: number): Promise<any | Error> {
    const data = await this.vssendSerivce.PG_PRG_001(upperId);
    if (data instanceof Error) return new Error('can not get data from admin');
    return data;
  }
}
