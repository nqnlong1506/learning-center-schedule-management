import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { StockService } from './stock.service';
import { Response } from 'express';
import { CurrentCustomer } from 'src/decorators/current-customer.decorator';
import { AuctionStatusEnumMapping } from '../auction/config';

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

  @Get('view')
  async get(
    @CurrentCustomer() customer: any,
    @Query() query: Record<string, string>,
    @Res() res: Response,
  ) {
    try {
      const stock = await this.stockServices.get(query, Number(customer['no']));

      if (!stock) {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'Stock not found',
        });
      }

      return res.status(HttpStatus.OK).json({
        success: true,
        data: stock,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Get('my-bidding')
  async mystocks(
    @CurrentCustomer() customer: any,
    @Query() query: { status: string },
    @Res() res: Response,
  ) {
    try {
      if (!query?.status)
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'status not found',
        });

      const list = await this.stockServices.myStocks(
        Number(customer['no']),
        AuctionStatusEnumMapping[query?.status] ||
          AuctionStatusEnumMapping['waiting'],
      );

      if (!list) {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'Stock not found',
        });
      }

      return res.status(HttpStatus.OK).json({
        success: true,
        data: list,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Get('view-stock/:id')
  async getView(
    @CurrentCustomer() customer: any,
    @Param() param: { id: number },
    @Res() res: Response,
  ) {
    try {
      const stock = await this.stockServices.getView(
        Number(param.id),
        Number(customer['no']),
      );

      if (!stock) {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'Stock not found',
        });
      }

      return res.status(HttpStatus.OK).json({
        success: true,
        data: stock,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}
