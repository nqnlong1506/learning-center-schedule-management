import { Injectable } from '@nestjs/common';
import { SellEntity } from './entities/sell.entity';
import { SellRepository } from './repositories/sell.repository';
import { SubVSolSenderService } from 'src/third-party/sub-v-sol-sender/sub-v-sol-sender.service';
import { CreateSellDTO } from './dto/create-sell.dto';
import { SellStatusEnum } from './enums';
import { UpdateStateSellDTO } from './dto/update-state-sell.dto';
import { Equal } from 'typeorm';

@Injectable()
export class SellService {
  constructor(
    private readonly sRepo: SellRepository,

    // services
    private readonly sender: SubVSolSenderService,
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
      const queryBuilder = this.sRepo.createQueryBuilder('sells');
      queryBuilder.andWhere('sells.sellerNo = :sellerNo', {
        sellerNo: customer.no,
      });
      if (orderBy) {
        queryBuilder.orderBy(`sells.${orderBy}`, orderDirection || 'ASC');
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

  async getById(id: number): Promise<SellEntity | Error> {
    const sell = await this.sRepo.getItem({ where: { id: id } });
    if (!sell) return new Error('sell does not exist');
    return sell;
  }

  async post(body: CreateSellDTO, customer: any): Promise<SellEntity | Error> {
    const key = await this.sRepo.startTransaction();
    try {
      const data = body as SellEntity;
      data.sellerNo = customer.no;
      console.log('data', data);
      const create = await this.sRepo.createEntity(data, key);

      const dataResponse = await this.sender.HP_CT_003(create, body.seriesNo);
      console.log('dataResponse', dataResponse);
      if (dataResponse?.IF_RST_CD == '00') {
        await this.sRepo.updateEntity(
          { id: create.id },
          {
            contractNo: dataResponse.CONT_NO,
            autoPrice: dataResponse.AUTO_PRICE,
          },
          key,
        );
      } else {
        throw new Error(dataResponse?.IF_RST_MSG || 'error');
      }
      await this.sRepo.commitTransaction(key);
      return create;
    } catch (error) {
      console.log('error', error);
      await this.sRepo.rollbackTransaction(key);
      return error;
    }
  }

  async updateState(data: UpdateStateSellDTO): Promise<SellEntity | Error> {
    const key = await this.sRepo.startTransaction();
    try {
      const { id, status } = data;
      const sell = await this.sRepo.findOne({ where: { id: Equal(id) } });
      if (!sell) return new Error('sell doest not exist');
      let update: any;

      if (
        status == SellStatusEnum.REGISTERED &&
        sell.status == SellStatusEnum.ESTIMATE_QUOTE
      ) {
        update = await this.sRepo.updateEntity({ id }, { status }, key);
      }

      if (
        status == SellStatusEnum.COMPLETE &&
        sell.status == SellStatusEnum.FINAL_ESTIMATE
      ) {
        update = await this.sRepo.updateEntity({ id }, { status }, key);
        await this.sender.HP_CT_003(update);
      }

      await this.sRepo.commitTransaction(key);
      return update;
    } catch (error) {
      await this.sRepo.rollbackTransaction(key);
      throw error;
    }
  }

  async update(id: number, body: SellEntity): Promise<SellEntity | Error> {
    // return body;
    const sell = await this.sRepo.getItem({ where: { id: id } });
    if (!sell) return new Error('sell doest not exist');
    const key = await this.sRepo.startTransaction();
    try {
      let issend = false;

      sell.evalRegi = body.evalRegi;
      sell.evalRegiDeta = body.evalRegiDeta;
      sell.sellPE = body.sellPE;
      if (body.status && sell.status !== body.status) {
        sell.status = body.status;
        issend = true;
      }
      const update = await this.sRepo.createEntity(sell, key);
      await this.sRepo.createEntity(update, key);

      if (issend) {
        const send = await this.sender.HP_CT_003(update);
        if (send instanceof Error) throw send;
      }

      await this.sRepo.commitTransaction(key);
      return update;
    } catch (error) {
      console.log('error', error);
      await this.sRepo.rollbackTransaction(key);
      return error;
    }
  }
}
