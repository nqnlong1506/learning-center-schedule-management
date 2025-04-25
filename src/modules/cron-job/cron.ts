import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronJob {
  constructor() {} // private readonly tokenService: TokenService,

  @Cron(CronExpression.EVERY_MINUTE)
  async runEveryMinute() {
    console.log('Run every minute');
  }

  // @Cron(CronExpression.EVERY_HOUR)
  // async runEveryHour() {
  //   try {
  //     await this.tokenService.deleteExpiredTokens();
  //     await this.authService.deleteExpiredRefreshTokens();
  //     console.log('Run every hour');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deleteExpiredTokens() {
    console.log('Run every day at midnight');
  }
}
