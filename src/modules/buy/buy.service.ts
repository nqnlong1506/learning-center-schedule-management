import { Injectable } from '@nestjs/common';
import { BuyRepository } from './repositories/stock.repository';
import { HP_CT_001Dto } from 'src/third-party/dto/HP_CT_001.dto';
import { VSolSenderService } from 'src/third-party/v-sol-sender/v-sol-sender.service';

@Injectable()
export class BuyService {
  constructor(
    private readonly buyRepository: BuyRepository,
    private readonly vSolSenderService: VSolSenderService,
  ) {}
  async gets(query: {
    orderBy: string;
    orderDirection: 'ASC' | 'DESC';
    page: number;
    pageSize: number;
    whereCondition: Record<string, any>;
  }): Promise<any> {
    try {
      const { page, pageSize, orderBy, orderDirection, whereCondition } = query;
      console.log('whereCondition', whereCondition);
      const numberPage = pageSize;
      const queryBuilder = this.buyRepository.createQueryBuilder('stock');
      if (orderBy) {
        queryBuilder.orderBy(`stock.${orderBy}`, orderDirection || 'ASC');
      }
      queryBuilder.take(numberPage).skip((page - 1) * numberPage);
      const [data, totalCount] = await queryBuilder.getManyAndCount();
      const totalPages = Math.ceil(totalCount / pageSize);
      return {
        data,
        attrs: {
          totalCount,
          totalPages,
          currentPage: Number(page),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  public async create(data: any, keyTrans?: string): Promise<any> {
    const key = keyTrans ?? (await this.buyRepository.startTransaction());
    try {
      await this.buyRepository.createEntity(data, key);
      //send HP_CT_001
      const dataSend: HP_CT_001Dto = {
        STOCK: {
          VIN: data?.vin,
          CAR_REG_NO: data?.carRegNo,
          CONT_NO: data?.contNo,
          STAT_CD: data?.statCd,
          DE_ME: data?.deMe,
          DE_ZIP_NO: data?.deZipNo,
          DE_ADDR: data?.deAddr,
          DE_ADDR_DETAIL: data?.deAddrDetail,
          DE_DAT: data?.deDat,
          RE_NM: data?.reNm,
          RE_AC: data?.reAc,
          RE_BA: data?.reBa,
          PA_ME: data?.paMe,
          FIPA_ME: data?.fipaMe,
          SEL_EW: data?.selEw,
          PA_STA: data?.paSta,
          FIPA_STA: data?.fipaSta,
        },
        CUST: data.cust,
        WARRANTY: data.warranty,
      };
      await this.vSolSenderService.handleHPCT001(dataSend);
      if (!keyTrans) await this.buyRepository.commitTransaction(key);
      return true;
    } catch (error) {
      if (!keyTrans) await this.buyRepository.rollbackTransaction(key);
      throw error;
    }
  }
}
