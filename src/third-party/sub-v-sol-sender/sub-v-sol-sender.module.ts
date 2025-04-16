import { Module } from '@nestjs/common';
import { SubVSolSenderService } from './sub-v-sol-sender.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [SubVSolSenderService],
  exports: [SubVSolSenderService],
})
export class SubVSolSenderModule {}
