import { Injectable } from '@nestjs/common';
import { SubVSolSenderService } from 'src/third-party/sub-v-sol-sender/sub-v-sol-sender.service';

@Injectable()
export class ProductGroupService {
  constructor(private readonly vssendSerivce: SubVSolSenderService) {}

  async getList(upperId: number, isCount: boolean): Promise<any | Error> {
    if (!isCount) {
      const data = await this.vssendSerivce.PG_PRG_001(upperId);
      if (data instanceof Error)
        return new Error('can not get data from admin');
      return data;
    } else {
      const data = await this.vssendSerivce.PG_PRG_002(upperId, isCount);
      if (data instanceof Error)
        return new Error('can not get data from admin');
      return data;
    }
  }
}
