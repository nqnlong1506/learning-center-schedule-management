import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { KAKAO_API_URL, KAKAO_AUTH_URL } from './config';

@Injectable()
export class KakaoService {
  constructor(private readonly httpService: HttpService) {}

  async getTokenByAuthCode(code: string): Promise<any | Error> {
    try {
      const body = {
        grant_type: 'authorization_code',
        client_id: '64b0e58415e9ab5dad56ae0bcc3e027a',
        code: code,
      };
      const { status, data } = await firstValueFrom(
        this.httpService
          .post(`${KAKAO_AUTH_URL}/oauth/token`, body, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          })
          .pipe(
            catchError((error: AxiosError) => {
              throw new Error(error.message);
            }),
          ),
      );

      if (status !== 200) {
        console.log('error data:', data);
        throw new Error('failed to get token');
      }
      // console.log('checking sending', status, data);
      return data;
    } catch (error) {
      return error;
    }
  }

  async getInfoByToken(token: string): Promise<any | Error> {
    try {
      console.log('token', token);
      const { status, data } = await firstValueFrom(
        this.httpService
          .get(`${KAKAO_API_URL}/v2/user/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .pipe(
            catchError((error: AxiosError) => {
              throw new Error(error.message);
            }),
          ),
      );

      console.log('checking sending', status, data);
      if (status !== 200) {
        console.log('error data:', data);
        throw new Error('failed to get token');
      }
      return data;
      // if (!APIStatus[status] || !data || data?.IF_RST_CD !== '00')
      //   throw new Error(data?.IF_RST_MSG || 'error');
      // console.log('[HP_CUST_001 - sender]', data);
    } catch (error) {
      return error;
    }
  }
}
