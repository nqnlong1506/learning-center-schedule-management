import { Injectable } from '@nestjs/common';
import { CustomerEntity } from 'src/modules/customer/entities/customer.entity';
import { toCustomer } from './entities/customer';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import axios, { AxiosError } from 'axios';
import { APIStatus } from 'src/config/api';
import { SellEntity } from 'src/modules/sell/entities/sell.entity';
import { AuctionEntity } from 'src/modules/auction/entities/auction.entity';
import { HP_CT_003Dto } from '../dto/HP_CT_003.dto';
import { CustomerStageEnum } from 'src/modules/customer/enums';

@Injectable()
export class SubVSolSenderService {
  constructor(private readonly httpService: HttpService) {}
  V_SOL_URL =
    process.env.V_SOL_BASE_URL_DEV + '/api/h-p-receiver' || 'localhost:3000';

  async HP_CUST_001(customer: CustomerEntity): Promise<void | Error> {
    try {
      const body = toCustomer(customer);
      console.log('body', body);
      const { status, data } = await firstValueFrom(
        this.httpService
          .post(`${this.V_SOL_URL}/hp_cust_001`, body, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .pipe(
            catchError((error: AxiosError) => {
              throw new Error(error.message);
            }),
          ),
      );
      if (!APIStatus[status] || !data || data?.IF_RST_CD !== '00')
        throw new Error(data?.IF_RST_MSG || 'error');
      console.log('[HP_CUST_001 - sender]', data);
    } catch (error) {
      return error;
    }
  }

  async HP_CUST_002(
    id: string,
    stage: CustomerStageEnum,
  ): Promise<void | Error> {
    try {
      const { status, data } = await firstValueFrom(
        this.httpService
          .post(
            `${this.V_SOL_URL}/hp_cust_002`,
            { id, stage },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          .pipe(
            catchError((error: AxiosError) => {
              throw new Error(error.message);
            }),
          ),
      );
      if (!APIStatus[status] || !data || data?.IF_RST_CD !== '00')
        throw new Error(data?.IF_RST_MSG || 'error');
      console.log('[HP_CUST_002 - sender]', data);
    } catch (error) {
      return error;
    }
  }

  async HP_CT_003(sell: SellEntity, seriesNo?: string): Promise<any> {
    try {
      const DATA: HP_CT_003Dto = {
        STOCK: {
          VIN: sell.vin,
          CAR_REG_NO: sell.carRegNo,
          OWNER: sell.owner,
          CLASSNAME: '',
          MODELNAME: '',
          SERIESNO: seriesNo ?? '',
          FIRSTDATE: '',
          FUEL: '',
          TRANS: '',
          YEAR: '',
          COLOR: '',
          STAT_CD: sell.status,
          MILEAGE: '',
          DIR_CAR_IMG: '',
          EVAL_ZIP_NO: '',
          EVAL_ADDR: '',
          EVAL_ADDR_DE: '',
          SAL_PE: '',
        },
      };
      const HEADER = '';

      const postData = {
        HEADER,
        DATA,
      };
      console.log('postData', postData);
      const response = await axios.post(
        `${this.V_SOL_URL}/hp_ct_003`,
        postData,
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async HP_BO_005(): Promise<void | Error> {
    try {
      const body = {};
      const { status, data } = await firstValueFrom(
        this.httpService
          .post(`${this.V_SOL_URL}/hp_bo_005`, body, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .pipe(
            catchError((error: AxiosError) => {
              throw new Error(error.message);
            }),
          ),
      );
      if (!APIStatus[status] || !data || data?.IF_RST_CD !== '00')
        throw new Error(data?.IF_RST_MSG || 'error');
      console.log('[HP_BO_005 - sender]', data);
    } catch (error) {
      return error;
    }
  }

  async EX_EXP_001(auction: AuctionEntity): Promise<void | Error> {
    try {
      const body = {
        customerId: auction.vendor.id,
        vin: auction.vin,
        price: auction.price,
        stage: auction.vendor.stage,
      };
      console.log('url', this.V_SOL_URL, body);
      const { status, data } = await firstValueFrom(
        this.httpService
          .post(`${this.V_SOL_URL}/ex_exp_001`, body, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .pipe(
            catchError((error: AxiosError) => {
              throw new Error(error.message);
            }),
          ),
      );
      if (!APIStatus[status] || !data || data?.IF_RST_CD !== '00')
        throw new Error(data?.IF_RST_MSG || 'error');
      console.log('[EX_EXP_001 - sender]', data);
    } catch (error) {
      console.log('[EX_EXP_001 - sender]', error);
      return new Error('[EX_EXP_001 - sender] failed.');
    }
  }

  async AU_AUCT_001(auction: AuctionEntity): Promise<void | Error> {
    try {
      const body = {
        customerId: auction.vendor.id,
        vin: auction.vin,
        price: auction.price,
        stage: auction.vendor.stage,
      };
      const { status, data } = await firstValueFrom(
        this.httpService
          .post(`${this.V_SOL_URL}/au_auct_001`, body, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .pipe(
            catchError((error: AxiosError) => {
              throw new Error(error.message);
            }),
          ),
      );
      if (!APIStatus[status] || !data || data?.IF_RST_CD !== '00')
        throw new Error(data?.IF_RST_MSG || 'error');
      console.log('[AU_AUCT_001 - sender]', data);
    } catch (error) {
      return error;
    }
  }

  async PG_PRG_001(upperId: number): Promise<any | Error> {
    try {
      const { status, data } = await firstValueFrom(
        this.httpService
          .post(
            `${this.V_SOL_URL}/pg_prg_001`,
            { upperId },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          .pipe(
            catchError((error: AxiosError) => {
              throw new Error(error.message);
            }),
          ),
      );
      if (!APIStatus[status] || !data || data?.IF_RST_CD !== '00')
        throw new Error(data?.IF_RST_MSG || 'error');
      console.log('[PG_PRG_001 - sender]', status);
      return data;
    } catch (error) {
      return error;
    }
  }

  async PG_PRG_002(upperId: number, isCount: boolean): Promise<any | Error> {
    try {
      const { status, data } = await firstValueFrom(
        this.httpService
          .post(
            `${this.V_SOL_URL}/pg_prg_002`,
            { upperId, isCount },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          .pipe(
            catchError((error: AxiosError) => {
              throw new Error(error.message);
            }),
          ),
      );
      if (!APIStatus[status] || !data || data?.IF_RST_CD !== '00')
        throw new Error(data?.IF_RST_MSG || 'error');
      console.log('[PG_PRG_001 - sender]', status);
      return data;
    } catch (error) {
      return error;
    }
  }
}
