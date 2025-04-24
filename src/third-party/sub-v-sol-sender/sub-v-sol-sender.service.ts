import { Injectable } from '@nestjs/common';
import { CustomerEntity } from 'src/modules/customer/entities/customer.entity';
import { toCustomer } from './entities/customer';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { APIStatus } from 'src/config/api';
import { SellEntity } from 'src/modules/sell/entities/sell.entity';
import { toSell } from './entities/sell';

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

  async HP_CT_003(sell: SellEntity): Promise<void | Error> {
    try {
      const body = toSell(sell);
      const { status, data } = await firstValueFrom(
        this.httpService
          .post(`${this.V_SOL_URL}/hp_ct_003`, body, {
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
      console.log('[HP_CT_003 - sender]', data);
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
}
