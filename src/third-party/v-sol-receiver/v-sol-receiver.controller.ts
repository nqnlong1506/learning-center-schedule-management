import { Controller, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { APIResponse } from 'src/config/api';

@Controller('v-sol-receiver')
export class VSolReceiverController {
  @Post('HP_CUST_001')
  async HP_CUST_001(@Req() req: Request, @Res() res: Response) {
    const response: APIResponse = {
      success: true,
      data: undefined,
      message: `[HP_CUST_001] api.`,
    };
    return res.json(response);
  }
}
