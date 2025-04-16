import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { APIStatus } from 'src/config/api';
import { HP_CT_001Dto } from '../dto/HP_CT_001.dto';

@Injectable()
export class VSolSenderService {
  constructor(private readonly httpService: HttpService) {}
  V_SOL_URL =
    (process.env.V_SOL_BASE_URL_DEV || 'http://localhost:3000') + '/api';

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

      const response = await axios.post(
        this.V_SOL_URL + '/homepage/hp-ct-001',
        postData,
      );
      return true;

      // const res = response.data;
      // return this.handleHomepageResponse(DATA, res);
    } catch (error) {
      console.error('Error sending HP_CT_001:', error);
      throw error;
    }
  }
}
