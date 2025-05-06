import { Module } from '@nestjs/common';
import { KakaoController } from './kakao.controller';
import { KakaoService } from './kakao.service';
import { KakaoModule as ThirdKakaoModule } from 'src/third-party/kakao/kakao.module';

@Module({
  imports: [ThirdKakaoModule],
  controllers: [KakaoController],
  providers: [KakaoService],
})
export class KakaoModule {}
