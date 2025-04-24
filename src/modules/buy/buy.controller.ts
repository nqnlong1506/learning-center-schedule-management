import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { BuyService } from './buy.service';
import { CurrentCustomer } from 'src/decorators/current-user.decorator';

@Controller('buy')
export class BuyController {
  constructor(private readonly buyService: BuyService) {}

  // @Get('list')
  // async gets(@Query() query: Record<string, any>, @Res() res: Response) {
  //   try {
  //     const {
  //       orderBy = 'id',
  //       orderDirection = 'DESC',
  //       page = 1,
  //       pageSize = 10,
  //       ...whereCondition
  //     } = query;
  //     const stocks = await this.stockServices.gets({
  //       whereCondition,
  //       orderBy,
  //       orderDirection: orderDirection.toUpperCase(),
  //       page,
  //       pageSize,
  //     });
  //     return res.status(HttpStatus.OK).json({ success: true, ...stocks });
  //   } catch (error) {
  //     if (!res.headersSent) {
  //       return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
  //         message: error.message,
  //         success: false,
  //       });
  //     }
  //   }
  // }
  @Post()
  async gets(
    @Body() body: Record<string, any>,
    @CurrentCustomer() user: any,
    @Res() res: Response,
  ) {
    try {
      console.log('user12312313', user);
      const buy = await this.buyService.create(body, user);
      return res.status(HttpStatus.OK).json({ success: true, ...buy });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
        success: false,
      });
    }
  }
  @Get('test')
  async test(@Res() res: Response) {
    try {
      console.log('test');
      return '12312312';
      // const buy = await this.buyService.create(body);
      // return res.status(HttpStatus.OK).json({ success: true, ...buy });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
        success: false,
      });
    }
  }
}
