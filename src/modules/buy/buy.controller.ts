import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { BuyService } from './buy.service';
import { CurrentCustomer } from 'src/decorators/current-customer.decorator';

@Controller('buy')
export class BuyController {
  constructor(private readonly buyService: BuyService) {}

  @Get('list')
  async listGet(
    @Query() query: Record<string, any>,
    @CurrentCustomer() customer: any,
    @Res() res: Response,
  ) {
    try {
      const {
        orderBy = 'id',
        orderDirection = 'DESC',
        page = 1,
        // pageSize = 3,
        ...whereCondition
      } = query;
      const pageSize = 3;
      const buy = await this.buyService.gets({
        whereCondition,
        orderBy,
        orderDirection: orderDirection.toUpperCase(),
        page,
        pageSize,
        customer,
      });
      return res.status(HttpStatus.OK).json({ success: true, ...buy });
    } catch (error) {
      if (!res.headersSent) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: error.message,
          success: false,
        });
      }
    }
  }

  @Get('view/:id')
  async view(
    @Param('id') id: number,
    @CurrentCustomer() customer: any,
    @Res() res: Response,
  ) {
    try {
      const buy = await this.buyService.get(id, customer);
      return res.status(HttpStatus.OK).json({ success: true, ...buy });
    } catch (error) {
      if (!res.headersSent) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: error.message,
          success: false,
        });
      }
    }
  }

  @Post()
  async gets(
    @Body() body: Record<string, any>,
    @CurrentCustomer() customer: any,
    @Res() res: Response,
  ) {
    try {
      const buy = await this.buyService.create(body, customer);
      return res.status(HttpStatus.OK).json({ success: true, data: buy });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
        success: false,
      });
    }
  }

  @Put()
  async update(@Body() body: Record<string, any>, @Res() res: Response) {
    try {
      await this.buyService.update(body);
      return res.status(HttpStatus.OK).json({ success: true });
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
