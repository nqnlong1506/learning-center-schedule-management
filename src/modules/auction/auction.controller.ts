import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { AuctionEntity } from './entities/auction.entity';
import { Response } from 'express';
import { APIResponse } from 'src/config/api';
import { CurrentCustomer } from 'src/decorators/current-customer.decorator';

@Controller('auction')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Post()
  async postAuction(
    @CurrentCustomer() customer: any,
    @Body() auction: AuctionEntity,
    @Res() res: Response,
  ) {
    const post = await this.auctionService.post(auction, customer['no']);
    if (post instanceof Error) {
      console.log('checking error', post.message);
      const response: APIResponse = {
        success: false,
        data: undefined,
        message: `[auction-post] ${post.message}.`,
      };
      return res.json(response);
    }
    const response: APIResponse = {
      success: true,
      data: undefined,
      message: `[auction-post] success.`,
    };
    return res.json(response);
  }
}
