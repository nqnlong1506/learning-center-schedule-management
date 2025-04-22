import {
  Controller,
  Post,
  Req,
  Res,
  Body,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { APIResponse, HpAPIResponse } from 'src/config/api';
import { LogPath } from 'src/decorators/log-message.decorator';
import { HP_ST_001Dto } from '../dto/HP_ST_001.dto';
import { HomepageLog } from '../service/homepage-log.service';
import { VSolReceiverService } from './v-sol-receiver.service';

@Controller('v-sol-receiver')
export class VSolReceiverController {
  constructor(private readonly vSolReceiverService: VSolReceiverService) {}

  @Post('token')
  async token(@Body() body) {
    // Generate token from CRM and send back to Trade
    // return this.vSolReceiverService.getToken(body.id, body.secret);
  }

  @Post('HP_CUST_001')
  async HP_CUST_001(@Req() req: Request, @Res() res: Response) {
    const response: APIResponse = {
      success: true,
      data: undefined,
      message: `[HP_CUST_001] api.`,
    };
    return res.json(response);
  }

  @Post('hp_st_001')
  @LogPath('HP_ST_001')
  @UseInterceptors(HomepageLog)
  // @UseGuards(TradeAuthGuard)
  async hp_st_001(
    @Body()
    body: any,
    @Res() res: Response,
  ) {
    try {
      console.log('hp_st_001', body);
      await this.vSolReceiverService.createStock(body.DATA);
      const response: HpAPIResponse = {
        IF_RST_MSG: true,
        IF_RST_CD: '00',
      };
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.OK).json({
        IF_RST_MSG: false,
        IF_RST_CD: '00',
      } as HpAPIResponse);
    }
  }

  @Post('hp_ct_002')
  @LogPath('HP_CT_002')
  @UseInterceptors(HomepageLog)
  // @UseGuards(TradeAuthGuard)
  async hp_ct_002(
    @Body()
    body: any,
    @Res() res: Response,
  ) {
    try {
      await this.vSolReceiverService.updateBuy(body.DATA);
      const response: HpAPIResponse = {
        IF_RST_MSG: true,
        IF_RST_CD: '00',
      };
      return res.json(response);
    } catch (error) {
      return res.status(HttpStatus.OK).json({
        IF_RST_MSG: false,
        IF_RST_CD: '00',
      } as HpAPIResponse);
    }
  }
}
