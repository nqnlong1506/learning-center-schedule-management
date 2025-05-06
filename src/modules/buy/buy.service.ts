import { Injectable } from '@nestjs/common';
import { BuyRepository } from './repositories/stock.repository';
import { HP_CT_001Dto } from 'src/third-party/dto/HP_CT_001.dto';
import { VSolSenderService } from 'src/third-party/v-sol-sender/v-sol-sender.service';
import { Not } from 'typeorm';

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
    customer: any;
  }): Promise<any> {
    try {
      const {
        page,
        pageSize,
        orderBy,
        orderDirection,
        whereCondition,
        customer,
      } = query;
      console.log('whereCondition', whereCondition);
      const numberPage = pageSize;
      const queryBuilder = this.buyRepository.createQueryBuilder('buy');
      queryBuilder.leftJoinAndSelect('buy.stock', 'stock');
      queryBuilder.andWhere('buy.buyerNo = :buyerNo', {
        buyerNo: customer.no,
      });
      if (orderBy) {
        queryBuilder.orderBy(`buy.${orderBy}`, orderDirection || 'ASC');
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
  async get(id: number, customer): Promise<any> {
    try {
      const data = await this.buyRepository.findOne({
        where: { id, isDel: false, buyerNo: customer.no },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async create(
    data: any,
    customerBuy: any,
    keyTrans?: string,
  ): Promise<any> {
    const key = keyTrans ?? (await this.buyRepository.startTransaction());
    try {
      const checkVin = await this.buyRepository.findOne({
        where: { vin: data.vin, isDel: false },
      });
      if (checkVin) {
        throw new Error('The car has been sold to someone else.');
      }
      const buy = await this.buyRepository.createEntity(
        { ...data, buyerNo: customerBuy.no },
        key,
      );
      //send HP_CT_001
      const dataSend: HP_CT_001Dto = {
        STOCK: {
          VIN: data?.vin,
          CAR_REG_NO: data?.carRegNo,
          STAT_CD: '01',
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
      const dataResponse = await this.vSolSenderService.handleHPCT001(dataSend);
      console.log('dataResponse CT001', dataResponse);
      if (dataResponse?.IF_RST_CD == '00') {
        await this.buyRepository.updateEntity(
          { id: buy.id },
          {
            contNo: dataResponse.CONT_NO,
            virtlAcctNo: dataResponse.VIRTL_ACCT_NO,
          },
          key,
        );
      }
      if (!keyTrans) await this.buyRepository.commitTransaction(key);
      return buy;
    } catch (error) {
      if (!keyTrans) await this.buyRepository.rollbackTransaction(key);
      throw error;
    }
  }
  async update(data: any, keyTrans?: string) {
    const key = keyTrans ?? (await this.buyRepository.startTransaction());
    try {
      const { vin, ...dataUpdate } = data;

      await this.buyRepository.updateEntity(
        { vin, isDel: false },
        dataUpdate,
        key,
      );

      if (!keyTrans) await this.buyRepository.commitTransaction(key);
    } catch (error) {
      if (!keyTrans) await this.buyRepository.rollbackTransaction(key);

      throw error;
    }
  }
}
