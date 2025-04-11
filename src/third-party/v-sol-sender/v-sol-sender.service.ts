import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { SuccessStatus } from 'src/config/api';

@Injectable()
export class VSolSenderService {
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
    if (!SuccessStatus[status] || !data || !data.success)
      throw new Error(data?.message || 'error');
  }
}
