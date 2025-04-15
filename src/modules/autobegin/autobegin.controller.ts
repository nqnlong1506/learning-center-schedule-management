import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AutobeginQuery, AutobeginService } from './autobegin.service';
import { MISSING_FIELD } from 'src/config/exceptions/exception';

@Controller('autobegin')
export class AutobeginController {
  constructor(private readonly autobeginService: AutobeginService) {}

  @Get('search')
  async get(@Query() query: AutobeginQuery, @Res() res: Response) {
    try {
      /**
       * carNum = '68도5899'
       * owner = '김윤수'
       * mode = 'search'
       * ts_key = '09d37891f016bee68b9e6330cccc7770'
       * seriesno = '40269'
       */
      const { carNum, owner, mode, ts_key, seriesno } = query;

      if (
        (mode === 'search' && !carNum && !owner) ||
        (mode === 'detail' && !ts_key && !seriesno)
      ) {
        return res.status(HttpStatus.OK).json({
          message: MISSING_FIELD,
          success: false,
        });
      }

      const data = await this.autobeginService.search(query);

      return res.status(HttpStatus.OK).json({ success: true, data: data });
    } catch (error) {
      return res.status(HttpStatus.OK).json({
        message: error.message,
        success: false,
      });
    }
  }

  // @Get('price/:product_id')
  // async getPriceInformation(
  //   @Param('product_id') productId: number,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     const data = await this.autobeginService.getPriceInformation(productId);
  //     return res.status(HttpStatus.OK).json({ success: true, data });
  //   } catch (error) {
  //     return res.status(HttpStatus.OK).json({
  //       message: error.message,
  //       success: false,
  //     });
  //   }
  // }

  @Get('get-by-carnum/:carnum')
  async getByCarNum(@Param('carnum') carnum: string, @Res() res: Response) {
    try {
      const result = await this.autobeginService.get({
        carnum: carnum,
      });

      return res.status(HttpStatus.OK).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.OK).json({
        message: error.message,
        success: false,
      });
    }
  }

  @Get('product/:productId')
  async getByProduct(
    @Param('productId') productId: number,
    @Res() res: Response,
  ) {
    try {
      const result = await this.autobeginService.get({
        product: { id: productId },
      });

      return res.status(HttpStatus.OK).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.OK).json({
        message: error.message,
        success: false,
      });
    }
  }
}
