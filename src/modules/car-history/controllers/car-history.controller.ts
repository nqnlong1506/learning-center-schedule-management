import { Controller, Get, Post, Param, Res, HttpStatus } from '@nestjs/common';
import { CarHistoryService } from '../services/car-history.service';
import { Response } from 'express';

@Controller('carhistory')
export class CarHistoryController {
  constructor(private readonly carHistoryService: CarHistoryService) {}

  @Get(':car_rep_no')
  async get(@Param('car_rep_no') carRegNo: string, @Res() res: Response) {
    try {
      const data = await this.carHistoryService.get({ r002: carRegNo });
      return res.status(HttpStatus.OK).json({ success: true, data: data });
    } catch (error) {
      return res.status(HttpStatus.OK).json({
        message: error.message,
        success: false,
      });
    }
  }
  @Post(':car_rep_no')
  async create(@Param('car_rep_no') carRegNo: string, @Res() res: Response) {
    try {
      const data = await this.carHistoryService.create(carRegNo);
      return res.status(HttpStatus.OK).json({ success: true, data: data });
    } catch (error) {
      return res.status(HttpStatus.OK).json({
        message: error.message,
        success: false,
      });
    }
  }

  @Get('/thirdparty/:car_rep_no')
  async getDataFromCarHistory(
    @Param('car_rep_no') carRegNo: string,
    @Res() res: Response,
  ) {
    try {
      const data = await this.carHistoryService.getDataFrom3rd(carRegNo);
      return res.status(HttpStatus.OK).json({ success: true, data: data });
    } catch (error) {
      return res.status(HttpStatus.OK).json({
        message: error.message,
        success: false,
      });
    }
  }
}
