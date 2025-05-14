import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CustomerModule } from '../customer/customer.module';
import { JwtModule } from '@nestjs/jwt';
import { KakaoModule } from './modules/kakao/kakao.module';
import { NaverModule } from './modules/naver/naver.module';
import { RouterModule } from '@nestjs/core';
import { SubVSolSenderModule } from 'src/third-party/sub-v-sol-sender/sub-v-sol-sender.module';

@Module({
  imports: [
    CustomerModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    KakaoModule,
    NaverModule,
    RouterModule.register([
      {
        path: 'auth',
        module: this,
        children: [
          {
            path: 'kakao',
            module: KakaoModule,
          },
          {
            path: 'naver',
            module: NaverModule,
          },
        ],
      },
    ]),
    SubVSolSenderModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
