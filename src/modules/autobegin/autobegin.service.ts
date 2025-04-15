import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { AutobeginRepository } from './repositories/autobegin.repository';
import { CreateAutoBeginDto } from './dto/create-atobegin.dto';
import { AutobeginEntity } from './entities/autobegin.entity';
import { convertToCamelCase, recursiveParseJson } from 'src/utils/helper';
import { AutobeginMileagePriceRepository } from './repositories/autobegin-mileageprice.repository';
import { AutobeginOptlistTableRepository } from './repositories/autobegin-oplist-table.repository';
import { AutobeginOptionTableRepository } from './repositories/autobegin-option-table.repository';
import { AutobeginRepairListRepository } from './repositories/autobegin-repairlist.repository';
import { AutobeginSeloptListRepository } from './repositories/autobegin-seloptlist.repository';
import { AutobeginUsedPriceRepository } from './repositories/autobegin-usedprice.repository';
export type AutobeginQuery = {
  carNum?: string;
  owner?: string;
  mode?: 'search' | 'detail';
  seriesno?: string;
  ts_key?: string;
};
@Injectable()
export class AutobeginService {
  constructor(
    private readonly httpService: HttpService,
    private readonly autobeginRepository: AutobeginRepository,
    private readonly autobeginMileagePriceRepository: AutobeginMileagePriceRepository,
    private readonly autobeginOptlistTableRepository: AutobeginOptlistTableRepository,
    private readonly autobeginOptionTableRepository: AutobeginOptionTableRepository,
    private readonly autobeginRepairListRepository: AutobeginRepairListRepository,
    private readonly autobeginSeloptListRepository: AutobeginSeloptListRepository,
    private readonly autobeginUsedPriceRepository: AutobeginUsedPriceRepository,
  ) {}

  async search(query: AutobeginQuery): Promise<any> {
    try {
      const response = await this.searchCar(query);

      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  async searchCar(query: AutobeginQuery): Promise<any> {
    // carName = '68도5899';
    // owner = '김윤수';
    try {
      const data = {
        key: process.env.AUTOBEGINS_KEY || '',
        mode: 'search',
        ...query,
      };

      const searchParams = new URLSearchParams(
        Object.entries(data).reduce(
          (acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
          },
          {} as Record<string, string>,
        ),
      );

      const url = `${process.env.AUTOBEGINS_URL}?${searchParams.toString()}`;
      console.log('Request URL:', url);
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      return response;
    } catch (error: any) {
      console.error('Error occurred:', error.message);
      throw error;
    }
  }

  // async createAutobegin(data: any, keyTrans?: string): Promise<any> {
  //   const key = keyTrans ?? (await this.autobeginRepository.startTransaction());
  //   try {
  //     let {
  //       usedprice,
  //       mileageprice,
  //       repairlist,
  //       tsKey,
  //       modellist,
  //       seloptlist,
  //       product,
  //       cardata,
  //     } = data;

  //     cardata = convertToCamelCase(cardata);

  //     const autobeginData = Object.assign(new CreateAutoBeginDto(), {
  //       ...cardata,
  //       optionMemo: cardata?.optionMemo
  //         ? JSON.stringify(cardata.optionMemo)
  //         : null,
  //       repairlist: repairlist ? JSON.stringify(repairlist) : null,
  //       tsKey: tsKey ? JSON.stringify(tsKey) : null,
  //       modellist: modellist ? JSON.stringify(modellist) : null,
  //       product: product,
  //     });

  //     const autobegin = await this.autobeginRepository.createEntity(
  //       autobeginData,
  //       key,
  //     );

  //     if (Array.isArray(cardata?.optlist)) {
  //       for (let item of cardata.optlist) {
  //         await this.autobeginOptlistTableRepository.createEntity(
  //           {
  //             autobegin: autobegin,
  //             product: product,
  //             price: item.price,
  //             name: item.name,
  //           },
  //           key,
  //         );
  //       }
  //     }

  //     if (Array.isArray(cardata?.optionTable)) {
  //       for (let item of cardata.optionTable) {
  //         await this.autobeginOptionTableRepository.createEntity(
  //           {
  //             autobegin: autobegin,
  //             product: product,
  //             optionKey1: item.optionKey1,
  //             optionKey2: item.optionKey2,
  //             optionKey3: item.optionKey3,
  //             optionFlag: item.optionFlag,
  //           },
  //           key,
  //         );
  //       }
  //     }

  //     if (Array.isArray(usedprice)) {
  //       for (let item of usedprice) {
  //         await this.autobeginUsedPriceRepository.createEntity(
  //           {
  //             autobegin: autobegin,
  //             product: product,
  //             price: item.price,
  //             stdym: item.stdym,
  //             rate: item.rate,
  //             rvalue: item.rvalue,
  //           },
  //           key,
  //         );
  //       }
  //     }

  //     if (Array.isArray(mileageprice)) {
  //       for (let item of mileageprice) {
  //         await this.autobeginMileagePriceRepository.createEntity(
  //           {
  //             autobegin: autobegin,
  //             product: product,
  //             price: item.price,
  //             mileage: item.mileage,
  //           },
  //           key,
  //         );
  //       }
  //     }

  //     if (Array.isArray(seloptlist)) {
  //       for (let item of seloptlist) {
  //         await this.autobeginSeloptListRepository.createEntity(
  //           {
  //             autobegin: autobegin,
  //             product: product,
  //             price: item.optprice,
  //             name: item.optname,
  //           },
  //           key,
  //         );
  //       }
  //     }

  //     if (!keyTrans) await this.autobeginRepository.commitTransaction(key);
  //   } catch (error: any) {
  //     if (!keyTrans) await this.autobeginRepository.rollbackTransaction(key);

  //     throw error;
  //   }
  // }
  // async getPriceInformation(productId: number): Promise<any> {
  //   const data = await this.autobeginRepository.findOne({
  //     where: {
  //       product: { id: productId },
  //     },
  //     relations: {
  //       mileageprice: true,
  //       usedprice: true,
  //     },
  //   });
  //   if (!data) {
  //     throw Error('No data found');
  //   }
  //   const { mileageprice, usedprice } = data;

  //   return {
  //     mileageprice: mileageprice,
  //     usedprice: usedprice,
  //   };
  // }

  async get(where: Record<string, any>): Promise<any> {
    try {
      const result = await this.autobeginRepository.getItem({
        where,
      });

      return recursiveParseJson(result);
    } catch (error) {
      throw error;
    }
  }
}
