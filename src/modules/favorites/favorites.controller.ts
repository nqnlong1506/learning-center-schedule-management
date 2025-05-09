import { Controller, Post, Req, Res } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Request, Response } from 'express';
import { APIResponse } from 'src/config/api';
import { CurrentCustomer } from 'src/decorators/current-customer.decorator';
import { YesNoEnum } from 'src/config/enums/yesno';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favorService: FavoritesService) {}

  @Post()
  async post(
    @CurrentCustomer() customer: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { id, stockId, status = YesNoEnum.NO } = req.body;
    if (!id || !stockId) {
      const response: APIResponse = {
        success: false,
        data: undefined,
        message: `[favorites-post] invalid body.`,
      };
      return res.json(response);
    }
    const create = await this.favorService.post({
      id,
      customerNo: customer.no,
      stockId,
      status: status === YesNoEnum.YES ? YesNoEnum.YES : YesNoEnum.NO,
    });
    if (create instanceof Error) {
      const response: APIResponse = {
        success: false,
        data: undefined,
        message: `[favorites-post] ${create.message}.`,
      };
      return res.json(response);
    }
    const reponse: APIResponse = {
      success: true,
      data: undefined,
      message: '[favorites-post] api.',
    };
    return res.json(reponse);
  }
}
