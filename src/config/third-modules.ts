import { AuctionModule } from 'src/modules/auction/auction.module';
import { KakaoModule } from 'src/third-party/kakao/kakao.module';
import { SubVSolReceiverModule } from 'src/third-party/sub-v-sol-receiver/sub-v-sol-receiver.module';
import { SubVSolSenderModule } from 'src/third-party/sub-v-sol-sender/sub-v-sol-sender.module';
import { VSolReceiverModule } from 'src/third-party/v-sol-receiver/v-sol-receiver.module';
import { VSolSenderModule } from 'src/third-party/v-sol-sender/v-sol-sender.module';

export const ThirdModules = [
  KakaoModule,
  VSolSenderModule,
  VSolReceiverModule,
  SubVSolReceiverModule,
  SubVSolSenderModule,
  AuctionModule,
];
