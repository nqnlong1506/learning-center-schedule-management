import { Module } from '@nestjs/common';
import { VSolSenderService } from './v-sol-sender.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [VSolSenderService],
  exports: [VSolSenderService],
})
export class VSolSenderModule {}
