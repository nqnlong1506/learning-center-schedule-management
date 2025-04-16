import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { APIStatus } from 'src/config/api';
import { HP_CT_001Dto } from '../dto/HP_CT_001.dto';

@Injectable()
export class VSolSenderService {
  private url = process.env.V_SOL_BASE_URL_DEV || 'localhost:3000';
  constructor(private readonly httpService: HttpService) {}
  V_SOL_URL = process.env.V_SOL_BASE_URL_DEV || 'localhost:3000';

  async HP_CUST_001(body: any): Promise<void> {
    console.log('sending to v-sol...');
    if (typeof body !== 'object') {
      throw new Error('sending v-sol invalid body');
    }
    const { status, data } = await firstValueFrom(
      this.httpService
        .post(`${this.V_SOL_URL}/ping`, body, {
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
    console.log('sending status:', status);
    if (!APIStatus[status] || !data || !data.success)
      throw new Error(data?.message || 'error');
  }

  async handleHPCT001(DATA: HP_CT_001Dto): Promise<any> {
    try {
      // const token = await this.getToken();
      // const HEADER = this.createHeader('HP_ST_001', token, '');
      const HEADER = '';

      const postData = {
        HEADER,
        DATA,
      };

      const response = await axios.post(this.url + 'crm/hp-st-001', postData, {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
      });
      console.log('response:', response.data);
      return true;

      // const res = response.data;
      // return this.handleHomepageResponse(DATA, res);
    } catch (error) {
      throw error;
    }
  }
}
