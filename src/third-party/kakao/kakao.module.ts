import { Module } from '@nestjs/common';
import { KakaoService } from './kakao.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [KakaoService],
  exports: [KakaoService],
})
export class KakaoModule {}
