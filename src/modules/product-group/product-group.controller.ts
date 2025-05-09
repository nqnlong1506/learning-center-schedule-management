import { Controller, Get, Req, Res } from '@nestjs/common';
import { ProductGroupService } from './product-group.service';
import { Request, Response } from 'express';
import { APIResponse } from 'src/config/api';

@Controller('product-group')
export class ProductGroupController {
  constructor(private readonly pgService: ProductGroupService) {}

  @Get('list')
  async getList(@Req() req: Request, @Res() res: Response) {
    const { upperId, isCount = '0' } = req.query;
    if (upperId && Number(upperId) !== 0 && !Number(upperId)) {
      const reponse: APIResponse = {
        success: false,
        data: undefined,
        message: `[product - group] invalid uppoerId`,
      };
      return res.json(reponse);
    }
    const list = await this.pgService.getList(
      Number(upperId || 0),
      isCount.toString() === '1',
    );
    if (list instanceof Error) {
      const reponse: APIResponse = {
        success: false,
        data: undefined,
        message: `[product - group] ${list.message}`,
      };
      return res.json(reponse);
    }
    const reponse: APIResponse = {
      success: true,
      data: list,
      message: `[product - group] list by upper`,
    };
    return res.json(reponse);
  }
}
