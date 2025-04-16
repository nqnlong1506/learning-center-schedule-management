import { Body, Controller, Post, Res } from '@nestjs/common';
import { CustomerDTO } from './dto/customer';
import { Response } from 'express';
import { SubVSolReceiverService } from './sub-v-sol-receiver.service';
import { ThirdAPIResponse } from 'src/config/api';

@Controller('sub-v-sol-receiver')
export class SubVSolReceiverController {
  constructor(private readonly rcvService: SubVSolReceiverService) {}

  @Post('hp_cust_001')
  async HP_CUST_001(@Body() body: CustomerDTO, @Res() res: Response) {
    const cust001 = await this.rcvService.HP_CUST_001(body);
    if (cust001 instanceof Error) {
      const response: ThirdAPIResponse = {
        IF_RST_CD: '99',
        IF_RST_MSG: 'FAILED',
      };
      return res.json(response);
    }
    const response: ThirdAPIResponse = {
      IF_RST_CD: '00',
      IF_RST_MSG: 'SUCCESS',
      CUST_NO: cust001.no,
    };
    return res.json(response);
  }
}
