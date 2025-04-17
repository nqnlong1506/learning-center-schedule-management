import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { SellService } from './sell.service';
import { SellEntity } from './entities/sell.entity';
import { Request, Response } from 'express';
import { APIResponse } from 'src/config/api';

@Controller('sell')
export class SellController {
  constructor(private readonly sellService: SellService) {}

  @Post()
  async post(@Body() body: SellEntity, @Res() res: Response) {
    const post = await this.sellService.post(body);
    if (post instanceof Error) {
      const response: APIResponse = {
        success: false,
        data: undefined,
        message: `[sell - post] ${post.message}.`,
      };
      return res.json(response);
    }
    const response: APIResponse = {
      success: true,
      data: post,
      message: '[sell - post] api.',
    };
    return res.json(response);
  }

  @Post('update/:id')
  async update(
    @Body() body: SellEntity,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { id } = req.params;
    if (!id || !Number(id)) {
      const response: APIResponse = {
        success: false,
        data: undefined,
        message: `[sell - update] invalid id params.`,
      };
      return res.json(response);
    }
    const update = await this.sellService.update(Number(id), body);
    if (update instanceof Error) {
      const response: APIResponse = {
        success: false,
        data: undefined,
        message: `[sell - update] ${update.message}.`,
      };
      return res.json(response);
    }
    const response: APIResponse = {
      success: true,
      data: body,
      message: '[sell - update] api.',
    };
    return res.json(response);
  }
}
