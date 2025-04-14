import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { StockService } from './stock.service';
import { Response } from 'express';

@Controller('stock')
export class StockController {
  constructor(private readonly stockServices: StockService) {}

  @Get('list')
  async gets(@Query() query: Record<string, any>, @Res() res: Response) {
    try {
      const {
        orderBy = 'id',
        orderDirection = 'DESC',
        page = 1,
        pageSize = 10,
        ...whereCondition
      } = query;
      const stocks = await this.stockServices.gets({
        whereCondition,
        orderBy,
        orderDirection: orderDirection.toUpperCase(),
        page,
        pageSize,
      });
      return res.status(HttpStatus.OK).json({ success: true, ...stocks });
    } catch (error) {
      if (!res.headersSent) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: error.message,
          success: false,
        });
      }
    }
  }
}
